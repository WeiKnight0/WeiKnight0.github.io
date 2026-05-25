---
title: Bitwise Operation 位运算
date: 2025-07-26
lang: zh-cn
---

# 集合论与位运算

原文：[分享｜从集合论到位运算，常见位运算技巧分类总结！by灵茶山艾府 https://leetcode.cn/discuss/post/3571304/cong-ji-he-lun-dao-wei-yun-suan-chang-ji-enve/](https://leetcode.cn/discuss/post/3571304/cong-ji-he-lun-dao-wei-yun-suan-chang-ji-enve/)

集合可以用二进制表示，二进制从低到高第 $i$ 位为 $1$ 表示 $i$ 在集合中，为 $0$ 表示 $i$ 不在集合中。例如集合 $\{0,2,3\}$ 可以用二进制数 $1101_{(2)}$  表示；反过来，二进制数 $1101_{(2)}$ 就对应着集合 $\{0,2,3\}$。

正式地说，包含非负整数的集合 $S$ 可以用如下方式「压缩」成一个数字： 
$$
f(S) = \sum_{i \in S} 2^i
$$
例如集合 $\{0, 2, 3\}$ 可以压缩成 $2^0 + 2^2 + 2^3 = 13$，也就是二进制数 $1101_{(2)}$。

## 集合与集合

| 术语       | 集合运算                           | 位运算                           |
| ---------- | ---------------------------------- | -------------------------------- |
| 交集       | $A \cap B$                         | $a \& b$                         |
| 并集       | $A \cup B$                         | $a \mid b$                       |
| 对称差     | $A \triangle B$                    | $a \oplus b$                     |
| 差         | $A \setminus B$                    | $a \& \sim b$                    |
| 差（子集） | $A \setminus B$（$B \subseteq A$） | $a - b$                          |
| 包含于     | $A \subseteq B$                    | $a \& b == a$ 或 $a \mid b == b$ |

## 集合与元素

通常会用到移位运算。

| 术语                 | 集合运算               | 位运算                     | 集合示例                          | 位运算示例                          |
|----------------------|------------------------|----------------------------|-----------------------------------|-------------------------------------|
| 空集                 | $\emptyset$          | $0$                      |                                   |                                     |
| 单元素集合           | $\{i\}$              | $1 << i$                 | $\{2\}$                         | $1 << 2 = 100$                    |
| 全集                 | $U$                  | $(1 << n) - 1$           | $\{0,1,2\}$                     | $(1 << 3) - 1 = 111$              |
| 补集                 | $\complement_U A$    | $((1 << n) - 1) \& \sim a$ | $U = \{0,1,2\}, \complement_U \{1\} = \{0,2\}$ |                                     |
| 属于                 | $i \in S$            | $(s >> i) \& 1 == 1$     | $2 \in \{1,2\}$                 | $(110 >> 2) \& 1 == 1$           |
| 不属于               | $i \notin S$         | $(s >> i) \& 1 == 0$     | $1 \notin \{0,2\}$              | $(101 >> 1) \& 1 == 0$           |
| 添加元素             | $S \cup \{i\}$       | $s \mid (1 << i)$        | $\{0,3\} \cup \{2\} = \{0,2,3\}$ | $1001 \mid (1 << 2) = 1101$       |
| 删除元素             | $S \setminus \{i\}$  | $s \& \sim (1 << i)$     | $\{0,2,3\} \setminus \{2\} = \{0,3\}$ | $1101 \& \sim (1 << 2) = 1001$    |
| 删除元素（一定在集合中） | $S \setminus \{i\}$  | $s \oplus (1 << i)$      | $\{0,2,3\} \setminus \{2\} = \{0,3\}$ | $1101 \oplus (1 << 2) = 1001$    |
|删除最小元素|          |                        | $s \& (s - 1)$           |  |

常用的库函数如下：
| 术语         | Python               | Java                          | C++                  | Go                  |
|--------------|----------------------|-------------------------------|----------------------|---------------------|
| 集合大小     | `s.bit_count()`      | `Integer.bitCount(s)`         | `__builtin_popcount(s)` | `bits.OnesCount(s)` |
| 二进制长度   | `s.bit_length()`     | `32 - Integer.numberOfLeadingZeros(s)` | `__lg(s) + 1`       | `bits.Len(s)`       |
| 集合最大元素 | `s.bit_length() - 1` | `31 - Integer.numberOfLeadingZeros(s)` | `__lg(s)`           | `bits.Len(s) - 1`   |
| 集合最小元素 | `(s & -s).bit_length() - 1` | `Integer.numberOfTrailingZeros(s)` | `__builtin_ctz(s)`  | `bits.TrailingZeros(s)` |

对于 C++ 的 `long long`，需使用相应的 `__builtin_popcountll` 等函数，即函数名后缀添加 `ll`（两个小写字母 L）。`__lg` 支持 `long long`。

## 遍历集合

```cpp
for (int i = 0; i < n; i++) {
    if ((s >> i) & 1) { // i 在 s 中
        // 处理 i 的逻辑
    }
}
```

## 枚举非空子集

```cpp
for (int sub = s; sub; sub = (sub - 1) & s) {
    // 处理 sub 的逻辑
}
```

为什么是`sub = (sub - 1) & s`？

相当于“压缩版”二进制减法。只对`s`中的非零数字进行减法。如`101001->101000->100001`

## 枚举所有子集，包括空集

```cpp
int sub = s;
do {
    // 处理 sub 的逻辑
    sub = (sub - 1) & s;
} while (sub != s); // 当sub==0后，减1得到-1，即为11111...，此时有sub&s==s
```

```python
sub = s
while True:
    # 处理 sub 的逻辑
    if sub == 0:
        break
    sub = (sub - 1) & s
```

## 枚举超集

如果 $T$ 是 $S$ 的子集，那么称 $S$ 是 $T$ 的**超集**。

```cpp
for (int s = t; s < (1 << n); s = (s + 1) | t) {
    // 处理 s 的逻辑
}
```

