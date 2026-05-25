---
title: Trie 字典树
date: 2025-10-24
lang: zh-cn
---

# Trie 的基本概念
Trie是一种用于存储字符串集合的树形数据结构。它的每个节点表示一个字符，路径从根节点到某个节点表示一个字符串的前缀。
## Trie的结构
- 根节点：表示开始节点。
- 内部节点：表示字符串的前缀。
- 叶子节点：表示最后一个字符，通常用于标记字符串的结束。
例子：
```
         (root)
        /   |   \
       a    b    c
      / \     \  |
     t   n       a
    /            |
   e             t
```
在上面的例子中，Trie存储了字符串 "ate", "an", "bat", "cat"。

另一个例子：
![](https://oi-wiki.org/string/images/trie1.png)
这个字典数用边表示字符，节点表示某种状态。例如， 1 -> 4 -> 8 -> 12 代表 `caa`。

## 实现模板
```cpp
// 大部分题Trie都是小写字母，26个字母，如果有例外再修改
struct Node {
    Node* son[26]{};// 子树入口
    bool end = false;
    // 其他需要的属性
};

void insert(string word){
    Node* cur = root;
    for(char c: word){
        int idx = c - 'a';
        if(!cur->son[idx]) // 没有子树，说明没有路
        {
            cur->son[idx] = new Node(); // 创建新节点
        }
        cur = cur->son[idx];
    }
    cur->end = true; // 最后一个节点标记为单词结尾
}

bool find(string word){
    Node* cur = root;
    for(char c: word){
        int idx = c - 'a';
        if(!cur->son[idx]) // 没有子树，说明没有路
        {
            return 0;
        }
        cur = cur->son[idx];
    }
    return cur->end; // 最后一个节点是否是单词结尾
}

bool del(string word){
    Node* cur = root;
    for(char c: word){
        int idx = c - 'a';
        if(!cur->son[idx]) // 没有子树，说明没有路
        {
            return 0;
        }
        cur = cur->son[idx];
    }
    if(cur->end) {
        cur->end = false; // 标记为非单词结尾，而非删除节点，避免影响其他单词
        return 1;
    }
    return 0; // 不是单词结尾，无法删除
}
```

## 例题：检索字符串
题目描述：给定 `n` 个名字，接着给定 `m` 次点名，每次需要回答 “名字不存在”（WRONG）、“名字重复”（REPEAT）或“名字存在”（OK）。
输入格式：
- 第一行包含整数 `n`，表示 `n` 个要插入的名字数量。
- 接下来 `n` 行，每行包含一个字符串，表示要插入的名字。
- 第 `n+2` 行包含整数 `m`，表示 `m` 次点名。
- 接下来 `m` 行，每行包含一个字符串，表示要查询的名字。

输出格式：
- 对于每次查询，输出对应的结果：“WRONG”、“REPEAT”或“OK”。

分析：直接使用 Trie 进行插入和查询操作即可。
```cpp
#include <bits/stdc++.h>
using namespace std;

typedef struct trie
{
    int next[500010][26], cnt; // 50万节点
    bool exist[500010];

    void insert(const char *s, int l)
    {
        int p = 0;
        for (int i = 0; i < l; i++)
        {
            int c = s[i] - 'a';
            if (!next[p][c])
                next[p][c] = ++cnt; // 编号
            p = next[p][c];         // 下一个字符
        }
        exist[p] = 1;
    }

    bool find(const char *s, int l)
    {
        int p = 0;
        for (int i = 0; i < l; i++)
        {
            int c = s[i] - 'a';
            if (!next[p][c])
                return 0;
            p = next[p][c];
        }
        return exist[p];
    }
} T1;

int main()
{
    cin.tie(0)->sync_with_stdio(0);
    int n;
    cin >> n;
    T1 *t = (T1 *)malloc(sizeof(T1));
    t->cnt = 0;
    memset(t->next, 0, sizeof(t->next));
    memset(t->exist, 0, sizeof(t->exist));
    for (int i = 0; i < n; i++)
    {
        string s;
        cin >> s;
        t->insert(s.c_str(), s.length());
    }

    int m;
    cin >> m;
    unordered_set<string> st;
    for (int i = 0; i < m; i++)
    {
        string s;
        cin >> s;
        if (st.find(s) != st.end())
        {
            cout << "REPEAT" << endl;
            continue;
        }
        if (t->find(s.c_str(), s.length()))
        {
            cout << "OK" << endl;
            st.insert(s);
            continue;
        }
        cout << "WRONG" << endl;
    }
    free(t);
    return 0;
}
```