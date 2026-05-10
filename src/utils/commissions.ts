import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const commissionDir = join(process.cwd(), 'public', 'fiction', 'commissions');
const imageExtensions = new Set([
  '.avif',
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.webp',
]);

const getExtension = (filename: string) => {
  const index = filename.lastIndexOf('.');

  return index >= 0 ? filename.slice(index).toLowerCase() : '';
};

const formatTitle = (filename: string) =>
  filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const getCommissionImages = () => {
  if (!existsSync(commissionDir)) {
    return [];
  }

  return readdirSync(commissionDir, { withFileTypes: true })
    .filter(
      (entry) => entry.isFile() && imageExtensions.has(getExtension(entry.name))
    )
    .map((entry) => ({
      src: `/fiction/commissions/${entry.name}`,
      title: formatTitle(entry.name),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
};
