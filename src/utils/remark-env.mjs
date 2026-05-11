const envTypes = [
  'definition', 'theorem', 'proof', 'example',
  'remark', 'axiom', 'corollary', 'lemma',
];

const beginRegex = new RegExp(`\\\\begin\\{(${envTypes.join('|')})\\}(?:\\[([^\\]]*)\\])?`);
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function processInline(text) {
  let out = escapeHtml(text);
  out = out.replace(/\$([^$]+)\$/g, '<span class="math-inline">$$$1$$</span>');
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\n/g, '<br/>\n');
  return out;
}

function getNodeText(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (node.type === 'inlineCode') return node.value || '';
  if (node.type === 'inlineMath' || node.type === 'math') return `$${node.value || ''}$`;
  if (node.type === 'strong') {
    const inner = (node.children || []).map(getNodeText).join('');
    return `**${inner}**`;
  }
  if (node.type === 'emphasis') {
    const inner = (node.children || []).map(getNodeText).join('');
    return `*${inner}*`;
  }
  if (node.type === 'link') return (node.children || []).map(getNodeText).join('');
  if (node.type === 'break') return '\n';
  if (node.type === 'listItem') return `- ${(node.children || []).map(getNodeText).join('')}\n`;
  if (node.type === 'list') return (node.children || []).map(getNodeText).join('');
  if (node.type === 'blockquote') return `> ${(node.children || []).map(getNodeText).join('')}`;
  if (node.type === 'heading') return '';
  if (node.type === 'code') return '';
  if (node.children) return node.children.map(getNodeText).join('');
  return '';
}

export default function remarkEnv() {
  return (tree) => {
    if (!tree?.children) return;

    // Step 1: Collect all text with node indices
    const nodes = [];
    for (let i = 0; i < tree.children.length; i += 1) {
      nodes.push({ type: tree.children[i].type, text: getNodeText(tree.children[i]) });
    }

    // Step 2: Find all environments
    const envs = [];
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node.type === 'paragraph') {
        const beginMatch = beginRegex.exec(node.text);
        if (beginMatch) {
          const envType = beginMatch[1];
          const title = beginMatch[2] || '';
          const endMarker = `\\end{${envType}}`;

          // Scan forward for end marker. Some compact environments parse as a
          // single paragraph containing both begin and end markers.
          let lastIdx = node.text.indexOf(endMarker, beginMatch.index + beginMatch[0].length) === -1 ? -1 : i;
          for (let j = i + 1; lastIdx === -1 && j < nodes.length; j += 1) {
            if (nodes[j].type === 'heading' || nodes[j].type === 'thematicBreak') break;
            if (nodes[j].text.includes(endMarker)) {
              lastIdx = j;
              break;
            }
          }

          if (lastIdx !== -1) {
            envs.push({ startIdx: i, endIdx: lastIdx, envType, title, beginMatch });
          }
        }
      }
    }

    if (envs.length === 0) return;

    // Step 3: Build replacement map (env index → HTML)
    const replacements = new Map();
    envs.forEach((env) => {
      const texts = [];
      for (let k = env.startIdx; k <= env.endIdx; k += 1) {
        texts.push(nodes[k].text);
      }
      const fullText = texts.join('\n\n');

      const titleHtml = env.title
        ? `<div class="env-title">${processInline(env.title)}</div>`
        : '';

      const bodyStart = env.beginMatch[0].length;
      const endIdx = fullText.lastIndexOf(`\\end{${env.envType}}`);
      const body = fullText.substring(bodyStart, endIdx).trim();

      const html = `<div class="env ${env.envType}">${titleHtml}<div class="env-body">${processInline(body)}</div></div>`;
      replacements.set(env.startIdx, { html, lastIdx: env.endIdx });
    });

    // Step 4: Rebuild tree
    const newChildren = [];
    const removed = new Set();
    envs.forEach((env) => {
      for (let k = env.startIdx; k <= env.endIdx; k += 1) removed.add(k);
    });

    for (let i = 0; i < tree.children.length; i += 1) {
      if (removed.has(i)) {
        if (replacements.has(i)) {
          newChildren.push({ type: 'html', value: replacements.get(i).html });
        }
      } else {
        newChildren.push(tree.children[i]);
      }
    }

    tree.children = newChildren;
  };
}
