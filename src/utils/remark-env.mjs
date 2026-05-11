const envTypes = [
  'definition',
  'theorem',
  'proof',
  'example',
  'remark',
  'axiom',
  'corollary',
  'lemma',
];

const beginRegex = new RegExp(`\\\\begin\\{(${envTypes.join('|')})\\}(?:\\[([^\\]]*)\\])?`);

const escapeHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const getNodeText = (node) => {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (node.type === 'inlineCode') return node.value || '';
  if (node.type === 'inlineMath' || node.type === 'math') return node.value || '';
  if (node.type === 'break') return '\n';
  if (node.children) return node.children.map(getNodeText).join('');
  return '';
};

const isEmptyParagraph = (node) => {
  if (node?.type !== 'paragraph') return false;
  return (node.children || []).every((child) => {
    if (child.type !== 'text') return false;
    return (child.value || '').trim() === '';
  });
};

const removeTextRange = (node, start, end) => {
  if (!node) return node;

  if (node.type === 'text') {
    const value = node.value || '';
    const localStart = Math.max(0, start);
    const localEnd = Math.min(value.length, end);

    if (localStart >= localEnd) return node;

    return {
      ...node,
      value: `${value.slice(0, localStart)}${value.slice(localEnd)}`,
    };
  }

  if (!node.children) return node;

  let offset = 0;
  const children = [];

  (node.children || []).forEach((child) => {
    const text = getNodeText(child);
    const childStart = offset;
    const childEnd = offset + text.length;
    offset = childEnd;

    if (childEnd <= start || childStart >= end) {
      children.push(child);
    } else {
      const nextChild = removeTextRange(
        child,
        start - childStart,
        end - childStart
      );

      if (nextChild?.type === 'text') {
        if ((nextChild.value || '') !== '') {
          children.push(nextChild);
        }
      } else if (nextChild?.children) {
        if (nextChild.children.length > 0 || nextChild.type === 'paragraph') {
          children.push(nextChild);
        }
      } else if (nextChild) {
        children.push(nextChild);
      }
    }
  });

  return { ...node, children };
};

const removeMarkerText = (node, marker) => {
  if (!node || marker === '') return node;

  if (node.type === 'text') {
    return {
      ...node,
      value: (node.value || '').split(marker).join(''),
    };
  }

  if (!node.children) return node;

  return {
    ...node,
    children: node.children.map((child) => removeMarkerText(child, marker)),
  };
};

const findInParagraph = (node, regex) => {
  if (node?.type !== 'paragraph') return null;
  const text = getNodeText(node);
  const match = regex.exec(text);
  regex.lastIndex = 0;

  return match ? { text, match } : null;
};

const makeHtmlNode = (value) => ({ type: 'html', value });

const cleanupEnvMarkers = (node) => {
  if (!node) return node;

  if (node.type === 'text') {
    let value = node.value || '';

    envTypes.forEach((envType) => {
      value = value.split(`\\end{${envType}}`).join('');
      value = value.split(`\\begin{${envType}}`).join('');
    });

    return {
      ...node,
      value,
    };
  }

  if (!node.children) return node;

  return {
    ...node,
    children: node.children
      .map(cleanupEnvMarkers)
      .filter((child) => !(child.type === 'text' && (child.value || '') === '')),
  };
};

const cleanupTreeEnvMarkers = (node) => {
  if (!node || node.type === 'html') return node;

  if (node.type === 'text') {
    return cleanupEnvMarkers(node);
  }

  if (!node.children) return node;

  return {
    ...node,
    children: node.children
      .map(cleanupTreeEnvMarkers)
      .filter((child) => !(child.type === 'text' && (child.value || '') === '')),
  };
};

export default function remarkEnv() {
  return (tree) => {
    if (!tree?.children) return;

    const nodes = tree.children;
    const envs = [];

    for (let i = 0; i < nodes.length; i += 1) {
      const begin = findInParagraph(nodes[i], beginRegex);

      if (begin) {
        const envType = begin.match[1];
        const title = begin.match[2] || '';
        const beginMarker = begin.match[0];
        const beginStart = begin.match.index;
        const beginEnd = beginStart + begin.match[0].length;
        const endMarker = `\\end{${envType}}`;

        let endIdx = -1;
        let endStart = -1;
        let endEnd = -1;

        for (let j = i; endIdx === -1 && j < nodes.length; j += 1) {
          if (
            j !== i &&
            (nodes[j].type === 'heading' || nodes[j].type === 'thematicBreak')
          ) {
            break;
          }

          const nodeText = getNodeText(nodes[j]);
          const searchFrom = j === i ? beginEnd : 0;
          const found = nodeText.indexOf(endMarker, searchFrom);

          if (found !== -1) {
            endIdx = j;
            endStart = found;
            endEnd = found + endMarker.length;
          }
        }

        if (endIdx !== -1) {
          envs.push({
            startIdx: i,
            endIdx,
            envType,
            title,
            beginMarker,
            beginStart,
            beginEnd,
            endStart,
            endEnd,
          });
          i = endIdx;
        }
      }
    }

    if (envs.length === 0) return;

    const envStarts = new Map(envs.map((env) => [env.startIdx, env]));
    const envEnds = new Map(envs.map((env) => [env.endIdx, env]));
    const children = [];

    for (let i = 0; i < nodes.length; i += 1) {
      const startEnv = envStarts.get(i);
      const endEnv = envEnds.get(i);

      if (startEnv) {
        const titleHtml = startEnv.title
          ? `<div class="env-title">${escapeHtml(startEnv.title)}</div>`
          : '';
        children.push(
          makeHtmlNode(`<div class="env ${startEnv.envType}">${titleHtml}<div class="env-body">`)
        );
      }

      let node = nodes[i];

      if (startEnv) {
        node = removeTextRange(node, startEnv.beginStart, startEnv.beginEnd);
        node = removeMarkerText(node, startEnv.beginMarker);
      }

      if (endEnv) {
        node = removeTextRange(node, endEnv.endStart, endEnv.endEnd);
        node = removeMarkerText(node, `\\end{${endEnv.envType}}`);
      }

      const cleanedNode = cleanupEnvMarkers(node);

      if (!isEmptyParagraph(cleanedNode)) {
        children.push(cleanedNode);
      }

      if (endEnv) {
        children.push(makeHtmlNode('</div></div>'));
      }
    }

    tree.children = children.map(cleanupTreeEnvMarkers);
  };
}
