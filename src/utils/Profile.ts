export const Profile = {
  name: 'WeiKnight',
  handle: 'WeiKnight',
  tagline: 'Developer and creator building across real-world systems and fictional archives',
  location: 'China',
  school: 'Student',
  github: 'https://github.com/WeiKnight0',
  bilibili: 'https://space.bilibili.com/',
  avatar: 'https://github.com/WeiKnight0.png',
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
