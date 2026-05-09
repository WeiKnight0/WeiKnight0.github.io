import type { CollectionEntry } from 'astro:content';

export const getNoteDescription = (note: CollectionEntry<'notes'>) =>
  note.data.description ?? note.data.title;

export const getTopLevelNotes = (notes: CollectionEntry<'notes'>[]) =>
  notes
    .filter((note) => note.id.split('/').length === 1)
    .sort((a, b) => a.data.title.localeCompare(b.data.title));

export const getSubjectNotes = (notes: CollectionEntry<'notes'>[]) =>
  notes
    .filter((note) => note.id.split('/').length > 1)
    .reduce<Record<string, CollectionEntry<'notes'>[]>>((groups, note) => {
      const subject = note.id.split('/')[0] ?? 'Notes';

      return {
        ...groups,
        [subject]: [...(groups[subject] ?? []), note],
      };
    }, {});

export const formatSubjectName = (subject: string) =>
  subject === 'Operating-System'
    ? 'Operating System'
    : subject.replace(/-/g, ' ');

export const getNotePath = (path: string) =>
  path.replace(/\.(md|mdx)$/i, '').replace(/\/index$/i, '');

export const getNoteHref = (path: string, localePrefix = '') =>
  `${localePrefix}/real/notes/${getNotePath(path)}/`.replace(/\/+/g, '/');
