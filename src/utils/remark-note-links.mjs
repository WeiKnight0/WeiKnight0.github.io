const isExternalUrl = (value) => /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith('#');

const normalizePath = (path) => {
  const segments = [];

  path.split('/').forEach((segment) => {
    if (!segment || segment === '.') {
      return;
    }

    if (segment === '..') {
      segments.pop();
      return;
    }

    segments.push(segment);
  });

  return segments.join('/');
};

const stripMarkdownExtension = (path) => path.replace(/\.(md|mdx)$/i, '');

const stripIndex = (path) => path.replace(/\/index$/i, '');

const noteHref = (path) => `/real/notes/${stripIndex(stripMarkdownExtension(path))}/`;

const visit = (node, visitor) => {
  if (!node || typeof node !== 'object') {
    return;
  }

  visitor(node);

  if (Array.isArray(node.children)) {
    node.children.forEach((child) => visit(child, visitor));
  }
};

export default function remarkNoteLinks() {
  return (tree, file) => {
    const filename = file.history[0]?.replace(/\\/g, '/') ?? '';
    const marker = '/src/content/notes/';
    const markerIndex = filename.indexOf(marker);

    if (markerIndex === -1) {
      return;
    }

    const noteFile = filename.slice(markerIndex + marker.length);
    const noteDir = noteFile.includes('/') ? noteFile.split('/').slice(0, -1).join('/') : '';

    visit(tree, (node) => {
      if (node.type !== 'link' && node.type !== 'image' && node.type !== 'definition') {
        return;
      }

      if (typeof node.url !== 'string' || isExternalUrl(node.url) || node.url.startsWith('/')) {
        return;
      }

      const [rawPath, suffix = ''] = node.url.split(/(?=[?#])/);
      const resolved = normalizePath(`${noteDir}/${rawPath}`);

      if (/\.(png|jpe?g|gif|webp|svg|avif)$/i.test(rawPath)) {
        node.url = `/real/notes/${resolved}${suffix}`;
        return;
      }

      node.url = `${noteHref(resolved)}${suffix}`;
    });
  };
}
