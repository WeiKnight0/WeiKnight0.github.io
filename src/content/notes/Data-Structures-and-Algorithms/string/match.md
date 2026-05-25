---
title: String Match 字符串匹配
date: 2025-10-23
lang: zh-cn
---

# String Match 字符串匹配的KMP算法
直接讲KMP算法。BF搜索都没人用。

假设有一个文本串T和一个模式串P，我们要在T中查找P出现的位置。字符的下标从0开始。

基本思想：
```text
T = t[s] t[s+1] t[s+2] ... t[s+j-1] t[s+j] ...
P = p[0]   p[1]   p[2]   ... p[j-1] p[j]
```
此时在`p[j]`处失配。如果`p[0:j-2]`不等于`p[1:j-1]`，则`p[0:j-2]`不等于`t[s+1:s+j-1]`，所以只能将模式串P向右移动`j`位。

## next数组
定义`next[j]`为模式串P的前缀子串`P`的最长相等前后缀的长度。
即：
$$
next[j]=\begin{cases}
-1, & j=0 \\\\
k+1, & \text{其中k是满足} p[0:k] = p[j-k-1:j-1] \text{的最大值} \\\\
0, & \text{如果不存在这样的k}
\end{cases}
$$
关键：这个`next`数组同时有：当在`p[j]`处失配时，模式串P应该向右移动到`p[next[j]]`处继续匹配。

举例说明：
```text
P = A  B  A  B  C  A  B  A  B
j = 0  1  2  3  4  5  6  7  8
next[j] = -1 0 1  2  0  1  2  3  4
```
当在`p[3] = B`处失配时，`next[3] = 2`，所以模式串P应该向右移动到`p[2]`处继续匹配。
很显然，这是由于`p[0:1] = AB`和`p[2:3] = AB`相等。

## 计算next数组
```cpp
vector<int> computeNext(const string &P) {
    int length = P.size();
    vector<int> next(length);
    next[0] = -1; // 初始化
    int j = 0, k = -1; // j是当前计算的位置，k是上一个匹配成功的位置
    while (j < length - 1) {
        if(k == -1 || P[j] == P[k]) {
            // 如果找不到匹配的
            // 或者继上一次匹配后当前字符也匹配成功
            j++;
            k++;
            next[j] = k; // 更新next数组
        } else {
            k = next[k]; // 回溯，回退到上一个匹配的地方
        }
    }
    return next;
}
```
理解`k = next[k]`：假设在`p[j]`处失配，`k`表示上一次匹配成功的位置。
根据`next`数组的定义，`p[0:k-1]`和`p[j-k:j-1]`是相等的。
同时，由`next`数组定义，有`p[0:next[k]-1]`和`p[k-next[k]:k-1]`也是相等的。
最终可以得出`p[0:next[k]-1]`、`p[k-next[k]:k-1]`、`p[j-k:j-k+next[k]-1]`、`p[j-next[k]:j-1]`这四段都是相等的。

## KMP算法实现
```cpp
int KMP(const string &T, const string &P) {
    vector<int> next = computeNext(P);
    int i = 0; // T的下标
    int j = 0; // P的下标
    int tLength = T.size();
    int pLength = P.size();
    while (i < tLength && j < pLength) {
        if (j == -1 || T[i] == P[j]) {
            // j==-1表示P已经回溯到最前面了，或者当前字符匹配成功
            i++;
            j++;
        } else {
            j = next[j]; // 回溯P的位置
        }
    }
    if (j == pLength) {
        return i - j; // 找到匹配，返回起始位置
    } else {
        return -1; // 未找到匹配
    }
}
```
