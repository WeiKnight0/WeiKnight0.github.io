---
title: DSU 并查集
date: 2026-02-01
lang: zh-cn
---

# 并查集（Disjoint Set Union, DSU）
并查集是一种用于管理元素所属集合的数据结构，实现为一个森林，其中每棵树表示一个集合，树中的节点表示对应集合中的元素。主要操作有：
- `find`: 查找元素所属的集合（树的根节点），用于判断两个元素是否属于同一集合
- `union`: 合并两个集合，将一个集合的根节点连接到另一个集合的根节点

## 基本实现
虽然是用树来表示集合，但并不需要显式地存储树的结构，只需要使用一个数组 `parent` 来记录每个节点的父节点即可。初始时，每个节点的父节点指向自己，表示每个节点都是一个独立的集合。

```cpp
class DSU {
public:
    int parent[N];
    int rank[N]; // 可选，用于按秩合并优化

    DSU() {
        for (int i = 0; i < N; ++i) {
            parent[i] = i; // 每个节点的父节点指向自己
        }
    }

    int find(int x); // 查找操作
    void union(int x, int y); // 合并操作
};
```

## 查找
查找操作通过递归或迭代的方式找到节点的根节点。为了优化查找效率，通常会使用路径压缩（Path Compression）技术，将查找过程中访问的节点直接连接到根节点，从而减少树的高度。

```cpp
// 不用路径压缩的查找
int DSU::find(int x) {
    if (parent[x] != x) {
        return find(parent[x]);
    }
    return x;
}

// 使用路径压缩的查找
int DSU::find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]); // 路径压缩
    }
    return parent[x];
}
```
路径压缩通过递归地将每个节点的父节点更新为根节点，从而大大减少了树的高度，提高了后续查找操作的效率。

## 合并
合并操作将两个集合连接在一起。通常会使用按秩合并（Union by Rank）技术，根据树的高度（秩）来决定将哪棵树连接到另一棵树上，从而保持树的平衡，避免树过高。

```cpp

// 不按秩合并
void DSU::union(int x, int y) {
    int rootX = find(x);
    int rootY = find(y);
    if (rootX != rootY) {
        parent[rootY] = rootX; // 将 rootY 连接到 rootX，可能导致树不平衡
    }
}

// 按秩合并
void DSU::union(int x, int y) {
    int rootX = find(x);
    int rootY = find(y);
    if (rootX != rootY) {
        // 按秩合并
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
    }
}
```

## 性能分析
使用路径压缩和按秩合并后，查找和合并操作的时间复杂度接近于常数，具体为反阿克曼函数的渐进复杂度，几乎可以视为 O(1)。这使得并查集在处理大量动态连通性问题时非常高效。