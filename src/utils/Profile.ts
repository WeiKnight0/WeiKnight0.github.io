export const Profile = {
  name: 'WEIKNIGHT',
  handle: 'WeiKnight',
  tagline: 'A Wolf Programmer from China',
  location: 'Nanjing, Jiangsu Province, China',
  school: 'Southeast University, China',
  github: 'https://github.com/WeiKnight0',
  bilibili: 'https://space.bilibili.com/',
  avatar: 'https://avatars.githubusercontent.com/u/84631479?v=4',
  techStack: ['Astro', 'React', 'TypeScript', 'Tailwind CSS'],
  repos: [
    {
      name: 'Homepage',
      description: 'Personal homepage combining portfolio pages and fictional archive pages.',
      href: 'https://github.com/WeiKnight0/WeiKnight0.github.io',
    },
    {
      name: 'Real Archive',
      description: 'Projects, resume, notes, and technical writing.',
      href: '/real/',
    },
    {
      name: 'Fiction Archive',
      description: 'Original characters, worldbuilding, stories, and commissions.',
      href: '/fiction/',
    },
  ],
} as const;
