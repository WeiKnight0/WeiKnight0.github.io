import ocNames from '../config/oc-names.mjs';

const names = ocNames;
const possessiveSuffix = '’s';

const replacements = [
  [/\\wkn\{\}['’‘]s/g, `${names.wkn}${possessiveSuffix}`],
  [/\\wf\{\}['’‘]s/g, `${names.wf}${possessiveSuffix}`],
  [/\\dr\{\}['’‘]s/g, `${names.dr}${possessiveSuffix}`],
  [/\{\{\s*wkn\s*\}\}['’‘]s/gi, `${names.wkn}${possessiveSuffix}`],
  [/\{\{\s*wf\s*\}\}['’‘]s/gi, `${names.wf}${possessiveSuffix}`],
  [/\{\{\s*dr\s*\}\}['’‘]s/gi, `${names.dr}${possessiveSuffix}`],
  [/\\wkn\{\}/g, names.wkn],
  [/\\wf\{\}/g, names.wf],
  [/\\dr\{\}/g, names.dr],
  [/\{\{\s*wkn\s*\}\}/gi, names.wkn],
  [/\{\{\s*wf\s*\}\}/gi, names.wf],
  [/\{\{\s*dr\s*\}\}/gi, names.dr],
];

function replaceNames(value) {
  return replacements.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    value
  );
}

function visit(node) {
  if (!node || typeof node !== 'object') {
    return;
  }

  if (
    ['text', 'inlineCode', 'code', 'html', 'yaml'].includes(node.type) &&
    typeof node.value === 'string'
  ) {
    node.value = replaceNames(node.value);
  }

  if (Array.isArray(node.children)) {
    node.children.forEach(visit);
  }
}

export default function remarkOcNames() {
  return (tree) => {
    visit(tree);
  };
}
