---
title: State DP 状压DP
date: 2025-10-17
lang: zh-cn
---

# 状压DP
状压 DP 通过将**状态集合转化为整数记录**在 DP 状态中来实现状态转移的目的。大部分题目中会利用二元状态，用$n$位二进制数表示$n$个独立二元状态的情况。

状压DP通常涉及位运算。

## 经典题目

在 $N \times N$ 的棋盘里面放 $K$ 个国王（$1 \leq N \leq 9, 1 \leq K \leq N \times N$），使他们互不攻击，共有多少种摆放方案。

国王能攻击到它上下左右，以及左上左下右上右下八个方向上附近的各一个格子，共 8 个格子。

### 定义状态
设 `dp[i][j][s]` 表示在前 `i` 行放置了 `j` 个国王，并且第 `i` 行的状态为 `s` 的方案数。
满足 `j <= count(s)`。

对于状态 `s`，用二进制的第 `k` 位表示第 `k` 列是否放置国王，1 表示放置，0 表示不放置。

例如，`s = 101` 表示在该行的第 1 列和第 3 列放置了国王。

### 状态转移方程
对于每一行 `i`，我们需要遍历所有可能的状态 `s`，并检查该状态是否合法（即没有相邻的国王）。如果合法，我们需要遍历前一行的所有状态 `p`，并检查 `s` 和 `p` 是否冲突（即没有国王互相攻击）。如果不冲突，我们可以将 `dp[i-1][j - count(s)][p]` 的值加到 `dp[i][j][s]` 中。 其中，`count(s)` 表示状态 `s` 中 1 的个数。

则状态转移方程为：

$$
dp[i][j][s] += dp[i-1][j - count(s)][p]
$$

### 初始条件
`dp[0][0][0] = 1`，表示在第 0 行放置 0 个国王且状态为 0 的方案数为 1。

### 答案的表示
答案为所有 `dp[N][K][s]` 的和，其中 `s` 为所有合法状态。即
$$
ans = \sum_{s \in \{\text{合法状态}\}} dp[N][K][s]
$$

### 代码实现
```cpp
#include <bits/stdc++.h>
using namespace std;

#define MAX_N (9 + 5)
#define MAX_K (81 + 5)
#define MAX_S (1 << 9)
#define int long long

int N, K;
int dp[MAX_N][MAX_K][MAX_S];
vector<int> state;

signed main()
{
    // cin.tie(0)->sync_with_stdio(false);

    cin >> N >> K;
    cout.flush();

    // 获取所有的行内合法性
    for (int i = 0; i < (1 << N); i++)
    {
        if (i & (i << 1))
            continue;
        state.push_back(i);
    }

    int S = state.size();

    dp[0][0][0] = 1;
    for (int i = 1; i <= N; i++)
    {
        for (int j = 0; j <= K; j++)
        {
            for (int s = 0; s < S; s++)
            {
                int st = state[s];
                int cnt = __builtin_popcount(st); //  count(s)
                if (j < cnt)
                    continue;
                for (int p = 0; p < S; p++)
                {
                    int pt = state[p];
                    if ((st & pt) || (st & (pt << 1)) || (st & (pt >> 1)))
                        continue;
                    dp[i][j][st] += dp[i - 1][j - cnt][pt];
                }
            }
        }
    }

    int ans = 0;
    for (int s = 0; s < S; s++)
    {
        ans += dp[N][K][state[s]];
    }
    cout << ans << endl;
    return 0;
}
```
