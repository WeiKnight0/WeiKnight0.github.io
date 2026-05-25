---
title: Interval DP 区间DP
date: 2025-10-08
lang: zh-cn
---

# 区间DP的基本概念
区间DP是一类特殊的动态规划问题，通常用于解决涉及区间划分或区间合并的问题。区间DP的核心思想是将问题划分为若干个子区间，通过解决这些子区间的问题来构建整个区间的问题的解。

## 题目
### 题目描述
将 $n$ 堆石子绕圆形操场排放，现要将石子有序地合并成一堆。规定每次只能选相邻的两堆合并成新的一堆，并将新的一堆的石子数记做该次合并的得分。

请编写一个程序，读入堆数 $n$ 及每堆的石子数，并进行如下计算：

1. 选择一种合并石子的方案，使得做 $n-1$ 次合并得分总和最大。
2. 选择一种合并石子的方案，使得做 $n-1$ 次合并得分总和最小。

### 输入格式：
输入第一行一个整数 $n$，表示有 $n$ 堆石子。  
第二行 $n$ 个整数，表示每堆石子的数量。

### 输出格式：
输出共两行：  
第一行为合并得分总和最小值，  
第二行为合并得分总和最大值。

## 分析
区间DP的通常套路就是对一个数组进行区间划分，枚举区间内的每个位置作为划分点，然后通过子区间的结果来构建当前区间的结果。
以最大化为例：
1. **定义状态**：  
    定义状态 `dp[i][j]` 表示将区间 `[i, j]` 内的石子合并成一堆所能得到的最大得分总和，其中 `0 <= i <= j < n`。
2. **状态转移方程**：  
    对于每个区间 `[i, j]`，我们枚举所有可能的划分点 `k`，将其分为左右两个非空子区间 `[i, k]` 和 `[k+1, j]`，然后通过这两个子区间的结果来更新当前区间的结果。具体地，状态转移方程为：
    $$dp[i][j] = \max_{k \in [i, j-1]} (dp[i][k] + dp[k+1][j] + \text{sum}(i, j))$$
    其中，`sum(i, j)` 表示区间 `[i, j]` 内所有石子数量的总和。
3. **边界条件**：  
    对于长度为1的区间，即 `dp[i][i]`，其值为0，因为不需要合并。
4. **答案的表示**：  
    最终的结果就是 `dp[0][n-1]`，表示将整个区间合并成一堆所能得到的最大得分总和。
注意，为了方便计算`sum(i, j)`，我们使用前缀和优化。

## 代码实现
```cpp
#include <bits/stdc++.h>

using namespace std;

#define MAXN 100

int N = 0;
int a[2 * MAXN];
int s[2 * MAXN + 1];
int dp1[2 * MAXN][2 * MAXN]; // dp[i][j] = \max_{k \in [i, j-1]} (dp[i][k] + dp[k+1][j] + \text{sum}(i, j))
int dp2[2 * MAXN][2 * MAXN];

int main() {
    cin >> N;
    for (int i = 0; i < N; i++) {
        cin >> a[i];
        a[N + i] = a[i];
    }
    // 前缀和
    s[0] = 0;
    for (int i = 0; i < 2 * N; i++) {
        s[i + 1] = a[i] + s[i];
    }
    for (int i = 0; i < 2 * N; i++) {
        for (int j = 0; j < 2 * N; j++) {
            if (i == j) {
                dp1[i][j] = 0;
                dp2[i][j] = 0;
            } else {
                dp1[i][j] = 0;
                dp2[i][j] = INT_MAX;
            }
        }
    }

    for (int l = 2; l <= N; l++) {
        for (int i = 0; i + l <= 2 * N; i++) {
            int j = i + l - 1;
            for (int k = i; k < j; k++) {
                int cost = s[j + 1] - s[i];
                dp1[i][j] = max(dp1[i][j], dp1[i][k] + dp1[k + 1][j] + cost);
                dp2[i][j] = min(dp2[i][j], dp2[i][k] + dp2[k + 1][j] + cost);
            }
        }
    }
    int min_ans = INT_MAX;
    int max_ans = 0;
    for (int i = 0; i < N; i++) {
        min_ans = min(min_ans, dp2[i][N + i - 1]);
        max_ans = max(max_ans, dp1[i][N + i - 1]);
    }
    cout << min_ans << endl << max_ans;
    return 0;
}
```

## 关键点
1. 能这样直接套用状态转移方程吗？
```cpp
for(int i=0;i<N;i++){
    for(int j=i;j<N;j++){
        for(int k=i;k<j;k++){
            dp1[i][j]=max(dp1[i][j], dp1[i][k]+dp1[k+1][j]+s[j+1]-s[i]);
            dp2[i][j]=min(dp2[i][j], dp2[i][k]+dp2[k+1][j]+s[j+1]-s[i]);
        }
    }
}
```
不能！因为$k+1>i$，所以`dp[k+1][j]`可能还没有被计算出来就被使用了。
正确做法：
```cpp
for(int l=2;l<=N;l++){ // 枚举区间长度
    for(int i=0;i+l<=N;i++){ // 枚举区间起点
        int j=i+l-1; // 计算区间终点
        for(int k=i;k<j;k++){ // 枚举划分点
            dp1[i][j]=max(dp1[i][j], dp1[i][k]+dp1[k+1][j]+s[j+1]-s[i]);
            dp2[i][j]=min(dp2[i][j], dp2[i][k]+dp2[k+1][j]+s[j+1]-s[i]);
        }
    }
}
```
2. 由于是环形的，所以我们将**数组复制一遍**，变成线性问题，然后枚举起点。
3. 注意前缀和的计算。