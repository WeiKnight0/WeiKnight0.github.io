---
title: Knapsack DP 背包DP
date: 2025-10-08
lang: zh-cn
---

# 0-1 背包问题
问题描述：
Given weights and values of `n` items, put these items in a knapsack of capacity `W` to get the maximum total value in the knapsack. In other words, given two integer arrays `v[0..n-1]` and `w[0..n-1]` which represent values and weights associated with `n` items respectively. Also given an integer `W` which represents knapsack capacity, find out the maximum value subset of `v[]` such that sum of the weights of this subset is smaller than or equal to `W`. You cannot break an item, either pick the complete item or don’t pick it.

Input:
- An integer `n` representing the number of items.
- An integer `W` representing the maximum capacity of the knapsack.
- An integer array `v[0..n-1]` representing the values of the items.
- An integer array `w[0..n-1]` representing the weights of the items.

Output:
- An integer representing the maximum value that can be accommodated in the knapsack.

<br>

问题分析：
由于每个物体只有两种可能的状态（取与不取），对应二进制中的0和1，因此称为0-1背包问题。
为什么可以用动态规划来解决这个问题？因为它满足动态规划的三个基本条件：
- 最优子结构：对于前`i`个物品和容量为`j`的背包，最优解可以通过前`i-1`个物品和容量为`j`或`j-w[i]`的背包的最优解来构建。
- 无后效性：一旦选择了某个物品（放入或不放入背包），这个决策不会影响后续物品的选择。
- 子问题重叠：在计算过程中，许多子问题会被多次计算。

<br>

**问题解答**：
1. **定义状态**：
    定义状态`dp[i][j]`表示前`i`个物品（$1 \leq i \leq n$）中能够装入容量为`j`的背包的最大价值。
2. **状态转移方程**：
    对于每个物品`i`，有两种选择：
    - 不放入背包：此时最大价值为`dp[i-1][j]`
    - 放入背包：前提是当前物品的重量`w[i]`不超过当前背包容量`j`，此时最大价值为`dp[i-1][j-w[i]] + v[i]`
    因此，状态转移方程为：
    $$
    dp[i][j] = \max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])
    $$
其中`w[i]`和`v[i]`分别表示第`i`个物品的重量和价值。
3. **边界条件**：
- `dp[0][j] = 0`，表示没有物品时，背包的最大价值为0。
- `dp[i][0] = 0`，表示背包容量为0时，最大价值为0。
4. **答案的表示**：
    最终答案为`dp[n][W]`，表示前`n`个物品中能够装入容量为`W`的背包的最大价值。

**代码实现**：
```cpp
#include <bits/stdc++.h>
using namespace std;

#define MAXN (100)
#define MAXW (1000)
int dp[MAXN][MAXW]; // dp数组
int w[MAXN]; // 物品重量
int v[MAXN]; // 物品价值
int n, W; // 物品数量和背包容量

int main() {
    // 输入物品数量和背包容量
    cin >> n >> W;
    // 输入物品的重量和价值
    for (int i = 1; i <= n; i++) {
        cin >> w[i] >> v[i];
    }

    // 初始化dp数组
    memset(dp, 0, sizeof(dp));

    // 动态规划填表
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            if (j < w[i]) {
                dp[i][j] = dp[i-1][j]; // 不能放入背包
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i]); // 放入或不放入背包
            }
        }
    }

    // 输出结果
    cout << dp[n][W] << endl;
    return 0;
}
```

# 完全背包问题
**问题描述**：
Given weights and values of `n` items, put these items in a knapsack of capacity `W` to get the maximum total value in the knapsack. In other words, given two integer arrays `v[0..n-1]` and `w[0..n-1]` which represent values and weights associated with `n` items respectively. Also given an integer `W` which represents knapsack capacity, find out the maximum value subset of `v[]` such that sum of the weights of this subset is smaller than or equal to `W`. You can take an item multiple times.

Input:
- An integer `n` representing the number of items.
- An integer `W` representing the maximum capacity of the knapsack.
- An integer array `v[0..n-1]` representing the values of the items.
- An integer array `w[0..n-1]` representing the weights of the items.

Output:
- An integer representing the maximum value that can be accommodated in the knapsack.

<br>

**问题分析**：
完全背包问题与0-1背包问题类似，但每个物品可以选择多次放入背包。因此，状态转移方程需要进行调整。
2. **状态转移方程**：
    对于每个物品`i`，有两种选择：
    - 不放入背包：此时最大价值为`dp[i-1][j]`
    - 放入背包：前提是当前物品的重量`w[i]`不超过当前背包容量`j`，此时最大价值为`dp[i][j-w[i]] + v[i]`（注意这里是`dp[i][j-w[i]]`，表示可以多次选择第`i`个物品）
    因此，状态转移方程为：
$$
dp[i][j] = \max(dp[i-1][j], dp[i][j-w[i]] + v[i])
$$
其余步骤与0-1背包问题相同。

**代码实现**：
```cpp
#include <bits/stdc++.h>
using namespace std;

#define MAXN (100)
#define MAXW (1000)
int dp[MAXN][MAXW]; // dp数组
int w[MAXN]; // 物品重量
int v[MAXN]; // 物品价值
int n, W; // 物品数量和背包容量

int main() {
    // 输入物品数量和背包容量
    cin >> n >> W;
    // 输入物品的重量和价值
    for (int i = 1; i <= n; i++) {
        cin >> w[i] >> v[i];
    }

    // 初始化dp数组
    memset(dp, 0, sizeof(dp));

    // 动态规划填表
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            if (j < w[i]) {
                dp[i][j] = dp[i-1][j]; // 不能放入背包
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-w[i]] + v[i]); // 放入或不放入背包
            }
        }
    }

    // 输出结果
    cout << dp[n][W] << endl;
    return 0;
}
```

# 多重背包问题
多重背包也是 0-1 背包的一个变式。与 0-1 背包的区别在于每种物品有$k_i$个而非1个。

**状态转移方程**：
    对于每个物品`i`，可以选择放入背包$k$个：前提是当前物品的重量`w[i]`不超过当前背包容量`j`且`k < k[i]`，状态转移方程为：
$$
dp[i][j] = \max_{k=0}^{k_i}(dp[i-1][j-k*w[i]] + k*v[i])
$$
其余步骤与0-1背包问题相同。