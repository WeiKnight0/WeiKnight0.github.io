---
title: 恢复记录
description: 记录从 session diff 恢复项目后，如何继续整理内容结构。
date: 2026-05-08
tags:
  - Recovery
  - Astro
  - Content
---

这条笔记用于确认 `notes` collection 已经可以从 Markdown 渲染详情页。

接下来如果要新增笔记，只需要在 `src/content/notes/` 下创建新的 Markdown 文件：

```md
---
title: 笔记标题
description: 笔记摘要
date: 2026-05-08
tags:
  - 标签
---

笔记正文写在这里。
```

文件名会成为页面路径的一部分。
