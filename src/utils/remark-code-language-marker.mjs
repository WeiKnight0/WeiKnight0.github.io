const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const visit = (node, visitor) => {
  if (!node || typeof node !== 'object') {
    return;
  }

  visitor(node);

  if (Array.isArray(node.children)) {
    node.children.forEach((child) => visit(child, visitor));
  }
};

export default function remarkCodeLanguageMarker() {
  return (tree, file) => {
    const filename = file.history[0]?.replace(/\\/g, '/') ?? '';

    if (!filename.includes('/src/content/notes/') && !filename.includes('/src/content/blog/')) {
      return;
    }

    visit(tree, (node) => {
      if (!Array.isArray(node.children)) {
        return;
      }

      node.children = node.children.flatMap((child) => {
        if (child.type !== 'code') {
          return [child];
        }

        const language = child.lang === 'assembly'
          ? 'asm'
          : child.lang === 'text' || !child.lang
            ? 'plaintext'
            : child.lang;
        child.lang = language;

        return [
          {
            type: 'html',
            value: `<span class="note-code-language" data-language="${escapeHtml(language)}"></span>`,
          },
          child,
        ];
      });
    });
  };
}
