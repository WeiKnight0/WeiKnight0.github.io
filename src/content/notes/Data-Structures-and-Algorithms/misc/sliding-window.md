---
title: Sliding Window 滑动窗口
date: 2026-02-04
lang: zh-cn
---

# Sliding Window 滑动窗口
滑动窗口是一种用于处理数组或字符串中连续子集问题的算法技术。它通过维护一个“窗口”在数据结构上滑动，以高效地计算所需的结果，而不需要重复计算。

## 定长滑动窗口
要计算长度恰好为 k 的子串中的某个属性（如和、最大值等），可以使用定长滑动窗口。

三步法：
1. **入**：下标为 $i$ 的元素进入窗口，更新相关统计量。如果窗口左端点 $i−k+1<0$，则尚未形成第一个窗口，重复第一步。
2. **更新**：若尚未形成窗口，则继续等待；当窗口形成后，更新结果。
3. **出**：下标为 $i−k+1$ 的元素离开窗口，更新相关统计量。

例：
给你字符串 s 和整数 k 。

请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。

英文中的 元音字母 为（a, e, i, o, u）。

```cpp
class Solution {
public:
    int maxVowels(string s, int k) {
        int ans = 0,cur = 0;
        int l = s.size();
        for(int i = 0;i < l; i++){
            if(s[i]=='a'||s[i]=='e'||s[i]=='i'||s[i]=='o'||s[i]=='u'){
                cur++; // 入
            }
            int left = i - k + 1;
            if(left <0){
                continue; // 尚未形成窗口
            }
            ans = max(ans, cur); // 更新结果
            char out = s[left];
            if(out == 'a'||out == 'e'||out == 'i'||out == 'o'||out == 'u'){
                cur--; // 出
            }
        }
        return ans;
    }
};
```

## 不定长滑动窗口
由于区间长度不定，因此需要使用双指针来维护窗口的左右边界。定义一个 `left` 变量，在遍历过程中不断移动 `right` 指针扩大窗口，同时根据条件移动 `left` 指针缩小窗口。

此时，“出” 可能先于 “更新”。

### 越短越合法/求最长/最大
当窗口满足条件时，尝试缩小窗口以找到更短的合法窗口；当窗口不满足条件时，扩大窗口以寻找合法窗口。

例题：给定一个字符串 `s` ，请你找出其中不含有重复字符的最长子串的长度。

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<int, int> mp;
        int n = s.size();
        int left = 0;//[left,i]
        int ans = 0;
        for(int i = 0;i < n; i++){
            mp[s[i]] += 1;
            while(mp[s[i]] > 1 && left <= i){
                mp[s[left]]--; // 这里要先更新，再移动 left 指针，要根据具体题目来决定先更新还是先移动
                left++;
            }
            ans = max(ans, i - left + 1);
        }
        return ans;
    }
};
```

### 越长越合法/求最短/最小
使用的方法是：外循环右端点扩展窗口，内循环左端点缩小窗口。每当窗口满足条件时，尝试缩小窗口以找到更长的合法窗口；当窗口不满足条件时，扩大窗口以寻找合法窗口。

例：最短且字典序最小的美丽子字符串

给你一个二进制字符串 s 和一个正整数 k 。
如果 s 的某个子字符串中 1 的个数恰好等于 k ，则称这个子字符串是一个 美丽子字符串 。
令 len 等于 最短 美丽子字符串的长度。
返回长度等于 len 且字典序 最小 的美丽子字符串。如果 s 中不含美丽子字符串，则返回一个 空 字符串。
对于相同长度的两个字符串 a 和 b ，如果在 a 和 b 出现不同的第一个位置上，a 中该位置上的字符严格大于 b 中的对应字符，则认为字符串 a 字典序 大于 字符串 b 。
例如，"abcd" 的字典序大于 "abcc" ，因为两个字符串出现不同的第一个位置对应第四个字符，而 d 大于 c 。

```cpp
class Solution {
public:
    string shortestBeautifulSubstring(string s, int k) {
        if (ranges::count(s, '1') < k)
            return "";
        string ans = s;
        int n = s.size();
        int left = 0, cnt = 0;
        for (int i = 0; i < n; i++) {
            if (s[i] == '1') {
                cnt++;
            }
            while (cnt > k || s[left] == '0') { // 出
                if (s[left] == '1')
                    cnt--;
                left++;
            }
            if (cnt == k) {
                string t = s.substr(left, i - left + 1);
                if (t.size() < ans.size() ||
                    (t.size() == ans.size() && t < ans)) {
                    ans = t;
                }
            }
        }
        return ans;
    }
};
```

## 求子数组个数
### 越短越合法
一般要写 `ans += right - left + 1`。

内层循环结束后，`[left,right]` 这个子数组是满足题目要求的。由于子数组越短，越能满足题目要求，所以除了 `[left,right]`，还有 `[left+1,right],[left+2,right],…,[right,right]` 都是满足要求的。也就是说，当右端点固定在 `right` 时，左端点在 `left,left+1,left+2,…,right` 的所有子数组都是满足要求的，这一共有 `right−left+1` 个。

例：[https://leetcode.cn/problems/subarray-product-less-than-k/description/](713. 乘积小于 K 的子数组)
给你一个整数数组 nums 和一个整数 k ，请你返回子数组内所有元素的乘积严格小于 k 的连续子数组的数目。

```cpp
class Solution {
public:
    typedef long long ll;
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k <= 1)
            return 0;
        ll cur = 1;
        int cnt = 0, left = 0, n = nums.size();
        for (int i = 0; i < n; i++) {
            cur *= nums[i];
            while (cur >= k) {
                cur /= nums[left];
                left++;
            }
            cnt += i - left + 1;
        }
        return cnt;
    }
};
```

### 越长越合法
一般要写 `ans += left`。

内层循环结束后，`[left,right]` 这个子数组是不满足题目要求的，但在退出循环之前的最后一轮循环，`[left−1,right]` 是满足题目要求的。由于子数组越长，越能满足题目要求，所以除了 `[left−1,right]`，还有 `[left−2,right]`、`[left−3,right]`、…、`[0,right]` 都是满足要求的。也就是说，当右端点固定在 `right` 时，左端点在 `0,1,2,…,left−1` 的所有子数组都是满足要求的，这一共有 `left` 个。

我们关注的是 `left−1` 的合法性，而不是 `left`。

例：[https://leetcode.cn/problems/number-of-substrings-containing-all-three-characters/description/](1358. 包含所有三种字符的子字符串数目)
给你一个字符串 s ，它只包含三种字符 a, b 和 c 。

请你返回 a，b 和 c 都 至少 出现过一次的子字符串数目。

```cpp
class Solution {
public:
    int numberOfSubstrings(string s) {
        int ans = 0, left = 0, n = s.size();
        int cnt[3]{};
        for (int i = 0; i < n; i++) {
            cnt[s[i] - 'a']++;
            while (cnt[0] && cnt[1] && cnt[2]) {
                cnt[s[left] - 'a']--;
                left++;
            }
            ans += left;
        }
        return ans;
    }
};
```

### 恰好型滑动窗口

例如，要计算有多少个元素和恰好等于 k 的子数组，可以把问题变成：

计算有多少个元素和 ≥k 的子数组。
计算有多少个元素和 >k，也就是 ≥k+1 的子数组。
答案就是元素和 ≥k 的子数组个数，减去元素和 ≥k+1 的子数组个数。这里把 > 转换成 ≥，从而可以把滑窗逻辑封装成一个函数 solve，然后用 solve(k)−solve(k+1) 计算，无需编写两份滑窗代码。

总结：「恰好」可以拆分成两个「至少」，也就是两个「越长越合法」的滑窗问题。

注：也可以把问题变成 ≤k 减去 ≤k−1，即两个「至多」。可根据题目选择合适的变形方式。

注：也可以把两个滑动窗口合并起来，维护同一个右端点 right 和两个左端点 left1 和 left2 ，这种写法叫做三指针滑动窗口。