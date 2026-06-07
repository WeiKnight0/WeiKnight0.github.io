---
title: Backtracking 回溯算法
date: 2026-02-01
lang: zh-cn
---

# 回溯介绍
原问题和子问题相似，且子问题的解可以直接构成原问题的解，且子问题之间没有重复的部分，那么就可以使用回溯算法来解决。

回溯三问：
用 `path` 数组记录路径上的字母 
1. 当前操作是什么？==> 枚举 `path[i]` 的值
2. 子问题（**当前问题**）是什么？==> 构造 `>= i` 的部分
3. 下一个子问题是什么？==> `>= i + 1` 的部分
由此构造 `dfs(i)` 函数，表示构造 `>= i` 的部分，在 `dfs(i)` 中枚举 `path[i]` 的值，并递归调用 `dfs(i+1)` 来构造 `>= i + 1` 的部分。

# 子集型回溯
每个元素可以选择要或者不要，构成一个二叉树，每条路径表示一个子集。

## 例题
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
## 代码模板
```cpp
// 思路一：每个元素可以选择要或者不要，构成一个二叉树，路径的终点表示一个子集。
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        if(n == 0){
            return {};
        }

        vector<vector<int>> ans;
        vector<int> path;
        auto dfs=[&](this auto& dfs, int i)->void{
            if(i==n){
                ans.push_back(path);
                return;
            }
            // 不选
            dfs(i+1);

            //选
            path.push_back(nums[i]);
            dfs(i+1);
            path.pop_back();
        };

        dfs(0);
        return ans;
    }
};
```
```cpp
// 思路二：枚举第一个数、第二个数、第三个数...，构成一个多叉树，路径的每个节点表示一个子集。
// 当前操作：枚举下标 j >= i 的数，加入path
// 子问题/当前问题：构造 >= i 的部分
// 下一个子问题：构造 >= j + 1 的部分
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        if(n == 0) return {};
        
        vector<vector<int>> ans;
        vector<int> path;
        auto dfs = [&](this auto& dfs, int i)->void{
            ans.push_back(path);
            if(i == n) return;

            for(int j = i; j < n; j++){
                path.push_back(nums[j]);
                dfs(j + 1);
                path.pop_back();
            }
        };
        dfs(0);
        return ans;
    }
};
```

# 组合型回溯
每个元素可以选择要或者不要，构成一个二叉树，每条路径表示一个组合。

相比于子集型回溯，组合型回溯要求路径上的元素满足某些条件（如子集元素数为某个值，或者和为某个值），因此在递归过程中可以进行剪枝，提前终止不满足条件的路径，从而提高效率。

设 `path` 最终需要的长度为 `k`，**倒序枚举**，当 `path` 长度达到 `k` 时，说明已经找到结果；若递归过程需要从 `[1, i]` 中选择元素加入 `path`，则当 `i < k - path.size()` 时，说明剩余元素不足以填满 `path`，可以提前剪枝。

## 例题
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。

对于给定的输入，保证和为 target 的不同组合数少于 150 个。

## 代码模板
```cpp
// 当前操作：选择要或者不要 candidates[i]
// 子问题/当前问题：构造 >= i 的部分，满足和为 t 的条件
// 下一个子问题：若选，构造 >= i 的部分，满足和为 t 的条件；若不选，构造 >= i + 1 的部分，满足和为 t 的条件
class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        int n = candidates.size();

        vector<vector<int>> ans;
        vector<int> path;
        auto dfs = [&](this auto& dfs, int i, int t){
            if(t==0){
                ans.push_back(path);
                return;
            }
            if(i==n || t<0){
                return;
            }

            dfs(i+1, t); // 不选 candidates[i]
            path.push_back(candidates[i]);
            dfs(i, t-candidates[i]); // 选 candidates[i]，由于可以重复选，所以下一个子问题仍然是构造 >= i 的部分
            path.pop_back();
        };
        dfs(0, target);
        return ans;
    }
};
```