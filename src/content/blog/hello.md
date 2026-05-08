---
title: 用 Markdown 管理博客
description: 博客内容现在可以直接写在 src/content/blog 下的 Markdown 文件里。
date: 2026-05-08
tags:
  - Astro
  - Markdown
  - Blog
draft: false
---

这是一篇由 Astro Content Collections 渲染的博客文章。

以后新增文章时，只需要在 `src/content/blog/` 下面创建一个新的 `.md` 文件：

```md
---
title: 新文章标题
description: 列表页显示的摘要
date: 2026-05-08
tags:
  - 标签
draft: false
---

正文写在这里。
```

文件名会成为访问路径。例如 `my-note.md` 会生成：

`/zh-cn/real/blog/my-note/`

如果暂时不想发布，把 `draft` 改成 `true` 即可。
