---
title: Monotonic Stack 单调栈
date: 2026-02-03
lang: zh-cn
---

# Monotonic Stack 单调栈
单调栈是一种特殊的栈数据结构，具有单调递增或单调递减的性质。它在解决一些特定类型的问题时非常有用，例如寻找数组中每个元素的下一个更大或更小的元素。

模板：
主要遍历方法主要有两种：从左到右和从右到左。

以每日温度(https://leetcode.cn/problems/daily-temperatures/)为例：`answer[i]` 是指对于第 i 天，下一个更高温度出现在几天后。
```cpp
// 从右到左
for(int i = n - 1; i >= 0; i --){
    int t = temperatures[i];
    while(!stk.empty() && t >= temperatures[stk.top()]){ // 关键，当前元素大于等于栈顶元素时，弹出栈顶元素；对于相等的元素只保留最靠左的那个
        stk.pop();
    }
    if(!stk.empty()) ans[i] = stk.top() - i;
    else ans[i] = 0;
    stk.push(i);
}
```

```cpp
// 从左到右
for(int i = 0; i < n; i++){
    int t = temperatures[i];
    while(!stk.empty() && t > temperatures[stk.top()]){ // 关键，当前元素大于栈顶元素时，弹出栈顶元素
        int j = stk.top();
        ans[j] = i - j;
        stk.pop();
    }
    stk.push(i);
}
```