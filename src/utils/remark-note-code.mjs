const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const visit = (node, visitor, parent, index) => {
  if (!node || typeof node !== 'object') {
    return;
  }

  visitor(node, parent, index);

  if (Array.isArray(node.children)) {
    node.children.forEach((child, childIndex) => visit(child, visitor, node, childIndex));
  }
};

const renderCode = (value, lang) => {
  const language = lang || 'text';
  const lines = value.replace(/\n$/, '').split('\n');
  const gutter = lines
    .map((_, index) => `<span class="line">${index + 1}</span>`)
    .join('');
  const code = lines
    .map((line) => `<span class="line">${escapeHtml(line) || ' '}</span>`)
    .join('');

  return `<figure class="highlight ${escapeHtml(language)}"><table><tbody><tr><td class="gutter"><pre>${gutter}</pre></td><td class="code"><pre>${code}</pre></td></tr></tbody></table></figure>`;
};

export default function remarkNoteCode() {
  return (tree, file) => {
    const filename = file.history[0]?.replace(/\\/g, '/') ?? '';

    if (!filename.includes('/src/content/notes/')) {
      return;
    }

    visit(tree, (node, parent, index) => {
      if (node.type !== 'code' || !parent || typeof index !== 'number') {
        return;
      }

      parent.children[index] = {
        type: 'html',
        value: renderCode(node.value, node.lang),
      };
    });
  };
}
