---
title: Prefix Sum and Differential 前缀和与差分
date: 2025-10-7
lang: zh-cn
---

# 一维前缀和

前缀和可以简单理解为「数列的前 $n$ 项的和」，是一种重要的预处理方式。
给定数组$a_i$，$0 \le i \le n$，则其前缀和：
$$
S_i=\begin{cases}
    0 & i=0 \\
    a_0+a_1+\cdots+a_{i-1} & 1 \le i \le n \\
    \end{cases}
$$
前缀和数组$S$的长度为$n+1$，其中$S[0]=0$，$S[i]$表示$a$数组前$i$个元素的和。这样我们可以在$O(1)$的时间内计算出任意区间$[l,r)$的和：
$$
\sum_{i=l}^{r-1} a_i = S[r]-S[l]
$$
模板C++

```cpp
int n;                // Array size.
std::vector<int> a;   // Array. (indexed from 1)
std::vector<int> ps;  // Prefix sum array.

// Calculate prefix sum.
void prefix_sum() {
  ps = a;
  // Or simply:
  // std::partial_sum(a.begin(), a.end(), ps.begin());
  for (int i = 1; i <= n; ++i) {
    ps[i] += ps[i - 1];
  }
}
// Query sum of elements in [l, r].
int query(int l, int r) { return ps[r] - ps[l - 1]; }
```
# 一维差分

对于区间修改，差分数组可以将时间复杂度从$O(n)$降到$O(1)$。给定数组$a_i$，$0 \le i < n$，则其差分数组$b_i$定义为：
$$
b_i = 
\begin{cases}
    a_0 & i=0 \\
    a_i - a_{i-1} & 1 \le i < n
\end{cases}
$$
差分数组$b$的长度为$n$，其中$b[0]=a[0]$，$b[i]$表示$a[i]$与$a[i-1]$的差值。这样我们可以在$O(1)$的时间内将区间$[l,r]$的每个元素增加$x$：
```cpp
b[l] += x;
b[r + 1] -= x;
```
模板C++

```cpp
int n;                // Array size.
std::vector<int> a;   // Array. (indexed from 0)
std::vector<int> diff; // Difference array.
// Calculate difference array.
void difference() {
  diff = a;
  for (int i = n - 1; i > 0; --i) {
    diff[i] -= diff[i - 1];
  }
}
// Range update: add x to elements in [l, r].
void range_update(int l, int r, int x) {
  diff[l] += x;
  if (r + 1 < n) {
    diff[r + 1] -= x;
  }
}
```
使用的时候，需要注意边界条件，尤其是$r$是否为数组的最后一个元素。因此，差分数组通常会比原数组多一个元素，且最后一个元素初始化为0。

# 二维前缀和
二维前缀和是前缀和的扩展，适用于二维数组。给定二维数组$a_{i,j}$，$0 \le i < n$，$0 \le j < m$，则其二维前缀和$S_{i,j}$定义为：
$$
S_{i,j} = \sum_{x=0}^{i-1} \sum_{y=0}^{j-1} a_{x,y}
$$
$S_{i,j}$表示从矩阵左上角$(0,0)$到$(i-1,j-1)$的子矩阵的和。
我们可以将其改写成递推形式：
$$
S_{i+1, j+1} = a_{i,j} + S_{i,j+1} + S_{i+1,j} - S_{i,j}
$$

二维前缀和数组$S$的大小为$(n+1) \times (m+1)$，其中$S[0][j]=0$和$S[i][0]=0$。这样我们可以在$O(1)$的时间内计算出任意子矩阵$(x_1,y_1)$到$(x_2,y_2)$的和：
$$
\sum_{i=x_1}^{x_2-1} \sum_{j=y_1}^{y_2-1} a_{i,j} = S[x_2][y_2] - S[x_1][y_2] - S[x_2][y_1] + S[x_1][y_1]
$$
模板C++

```cpp
#define N 100
#define M 100
int n, m;                // Matrix size.
int a[N][M];            // Matrix. (indexed from 1)
int ps[N + 1][M + 1];   // Prefix sum matrix.
// Calculate prefix sum.
void prefix_sum() {
  for (int i = 1; i <= n; ++i) {
    for (int j = 1; j <= m; ++j) {
      ps[i][j] = a[i][j] + ps[i - 1][j] + ps[i][j - 1] - ps[i - 1][j - 1];
    }
  }
}
// Query sum of submatrix [(x1, y1), (x2, y2)].
int query(int x1, int y1, int x2, int y2) {
  return ps[x2][y2] - ps[x1 - 1][y2] - ps[x2][y1 - 1] + ps[x1 - 1][y1 - 1];
}
```
# 二维差分
二维差分是差分数组的扩展，适用于二维数组。通常采用逐维度计算一维差分的方式来实现。
对于二维差分的区域更新方法，要想将子矩阵$(x_1,y_1)$到$(x_2,y_2)$的每个元素增加$x$，可以进行如下操作：
$$
\begin{cases}
  b[x_1][y_1] \leftarrow b[x_1][y_1] + x \\
  b[x_1][y_2 + 1] \leftarrow b[x_1][y_2 + 1] - x \\
  b[x_2 + 1][y_1] \leftarrow b[x_2 + 1][y_1] - x \\
  b[x_2 + 1][y_2 + 1] \leftarrow b[x_2 + 1][y_2 + 1] + x \\
\end{cases}
$$
模板C++

```cpp
int n, m;
std::vector<std::vector<int>> diff, a;

// Add v to each element from [x1, y1] to [x2, y2].
void add(int x1, int y1, int x2, int y2, int v) {
  diff[x1][y1] += v;
  if (x2 < n) diff[x2 + 1][y1] -= v;
  if (y2 < m) diff[x1][y2 + 1] -= v;
  if (x2 < n && y2 < m) diff[x2 + 1][y2 + 1] += v;
}

// Execute this after all modifications and before all queries.
void prefix_sum() {
  a = diff;

  for (int i = 1; i <= n; ++i)
    for (int j = 1; j <= m; ++j) a[i][j] += a[i - 1][j];

  for (int i = 1; i <= n; ++i)
    for (int j = 1; j <= m; ++j) a[i][j] += a[i][j - 1];
}
```

# 树上前缀和
树上前缀和是前缀和在树结构上的应用。对于树上前缀和，主要分为点权和边权两种情况。

## 点权前缀和
点权前缀和是指计算从根节点到某个节点的路径上所有节点的权值之和。有递推关系：
$$
sum[u] = w[u] + sum[fa[u]]
$$
其中$sum[u]$表示从根节点到节点$u$的路径上所有节点的权值之和，$w[u]$表示节点$u$的权值，$fa[u]$表示节点$u$的父节点。可以通过DFS遍历树来实现。

预处理完成后，可以在$O(1)$的时间内计算出节点$u$到节点$v$路径上所有节点的权值之和：
$$
\sum_{x \in path(u,v)} w[x] = sum[u] + sum[v] - sum[lca(u,v)] - sum[parent[lca(u,v)]]
$$
其中$lca(u,v)$表示节点$u$和节点$v$的最近公共祖先。

## 边权前缀和
边权前缀和是指计算从根节点到某个节点的路径上所有边的权值之和。可以假设边权存储在离根远的结点上，根结点处存储的权值是0。此时，节点$u$到节点$v$路径上所有边的权值之和可以表示为：
$$
\sum_{e \in path(u,v)} w[e] = sum[u] + sum[v] - 2 \times sum[lca(u,v)]
$$

## 子树和
子树和是指计算以某个节点为根的子树中所有节点的权值之和。可以通过DFS遍历树来实现。

# 树上差分
树上差分是差分数组在树结构上的应用。对于树上差分，一般分为点权和边权两种情况。点权差分可以通过树的DFS序列来实现，而边权差分则需要将边权转化为点权。
树上差分的差分数组的产生通常通过 **逐步更新权值** 的方式实现。

## 点权差分
如果要对结点$u$到结点$v$路径上的所有结点增加$x$，可以通过以下步骤实现：
1. 找到$u$和$v$的最近公共祖先$lca(u,v)$。
2. 对**差分数组**进行如下操作：
  $$
  \begin{cases}
    diff[u] \leftarrow diff[u] + x \\
    diff[v] \leftarrow diff[v] + x \\
    diff[lca(u,v)] \leftarrow diff[lca(u,v)] - x \\
    \text{if } lca(u,v) \neq \text{root}: \\
    \quad diff[parent[lca(u,v)]] \leftarrow diff[parent[lca(u,v)]] - x
  \end{cases}
  $$
3. 最后通过一次DFS计算出每个节点的最终值。

## 边权差分
边权差分可以将边权转化为点权来处理。通常，我们可以将每条边的权值加到其远离根的节点上，并令根节点的权值为0，然后使用点权差分的方法进行处理。
需要注意的是，边权差分在处理边权更新时，仍然需要找到路径的最近公共祖先，但由于公共祖先代表的边不在路径上，因此更新操作会有所不同。
假设要对路径$u$到$v$上的所有边增加$x$，可以通过以下步骤实现：
1. 找到$u$和$v$的最近公共祖先$lca(u,v)$。
2. 对**差分数组**进行如下操作：
  $$
  \begin{cases}
    diff[u] \leftarrow diff[u] + x \\
    diff[v] \leftarrow diff[v] + x \\
    diff[lca(u,v)] \leftarrow diff[lca(u,v)] - 2x \\
  \end{cases}
  $$
3. 最后通过一次DFS计算出每个节点的最终值。

模板C++

```cpp
const int N = 1e5 + 10;
const int LOG = 20; // For LCA
vector<int> g[N];  // Adjacency list for the tree
int w[N];          // Node weights
int diff[N];      // Difference array
int parent[N];     // Parent node
int sum[N];        // Final values after applying differences
int depth[N];      // Depth of each node
int fa[N][LOG]; // Ancestor table for LCA
int n;             // Number of nodes

// Preprocess for LCA
void dfs_lca(int u, int p) {
  parent[u] = p;
  depth[u] = (p == -1) ? 0 : depth[p] + 1;
  fa[u][0] = p;
  for (int i = 1; i < LOG; ++i) {
    if (fa[u][i - 1] != -1)
      fa[u][i] = fa[fa[u][i - 1]][i - 1];
    else
      fa[u][i] = -1;
  }
  for (int v : g[u]) {
    if (v != p) {
      dfs_lca(v, u);
    }
  }
}
```
```cpp
// Find LCA of u and v
int lca(int u, int v) {
  if (depth[u] < depth[v]) swap(u, v);
  for (int i = LOG - 1; i >= 0; --i) {
    if (fa[u][i] != -1 && depth[fa[u][i]] >= depth[v]) {
      u = fa[u][i];
    }
  }
  if (u == v) return u;
  for (int i = LOG - 1; i >= 0; --i) {
    if (fa[u][i] != fa[v][i]) {
      u = fa[u][i];
      v = fa[v][i];
    }
  }
  return parent[u];
}
```
```cpp
// Range update: add x to all nodes on the path from u to v
void range_update(int u, int v, int x) {
  int ancestor = lca(u, v);
  diff[u] += x;
  diff[v] += x;
  diff[ancestor] -= x;
  if (parent[ancestor] != -1) {
    diff[parent[ancestor]] -= x;
  }
}
```
```cpp
// DFS to apply the differences and compute final values
void apply_differences(int u, int p) {
  sum[u] = w[u] + diff[u];
  for (int v : g[u]) {
    if (v != p) {
      apply_differences(v, u);
      sum[u] += sum[v]; // If you want to accumulate values from children
    }
  }
}
```

# 参考
 - [前缀和与差分 - OI Wiki](https://oi-wiki.org/basic/prefix-sum/)