---
title: String Hash 字符串哈希
date: 2025-10-23
lang: zh-cn
---

# 字符串哈希的性质
1. 在 Hash 函数值不一样的时候，两个字符串一定不一样；
2. 在 Hash 函数值一样的时候，两个字符串大概率一样，但不一定一样（哈希冲突）。

# 常用的字符串哈希方法
## 多项式 Hash
设字符串 S 的长度为 n，字符集大小为 m，选取一个大于 m 的整数 p 作为基数，选取一个大质数 M 作为模数，则字符串 S 的 Hash 值可以定义为：
$$
H(S) = (S[0] * p^{n-1} + S[1] * p^{n-2} + ... + S[n-1] * p^0) \mod M
$$
或
$$
H(S) = (S[0] * p^0 + S[1] * p^1 + ... + S[n-1] * p^{n-1}) \mod M
$$

## 滚动 Hash
滚动 Hash 允许我们在 O(1) 时间内计算字符串的子串 Hash值。假设我们有字符串 S 的 Hash 值 H(S)，要计算 S 的子串 `S[i..j]` 的 Hash 值，可以使用以下公式：
$$
H(S[i..j]) = (H(S[0..j]) - H(S[0..i-1]) * p^{j-i+1}) \mod M
$$

# Hash 冲突
Hash 冲突是指两个不同的字符串映射到相同的 Hash 值。

Hash冲突的概率：我们设 Hash 的取值空间（所有可能出现的字符串的数量）为 $d$，计算次数（要计算的字符串数量）为 $n$，则发生 Hash 冲突的概率约为：
$$
P(collision) \approx 1 - exp\left({-\frac{n(n-1)}{2d}}\right)
$$

介绍一下常见的卡Hash的规律：
## 卡大模数 Hash
出题人要卡大模数 Hash时，通常会使得：
1. $d > M$，即 Hash 的取值空间大于模数，这样会增加冲突的概率。
2. $p(n, d)$ 很大。

## 卡自然溢出 Hash
当模数很大时，上面的方法卡不了。此时会卡自然溢出Hash。这时哈希函数通常是：
$$
H(S) = S[0] * p^{n-1} + S[1] * p^{n-2} + ... + S[n-1] * p^0 \mod 2^{64}
$$
其中 $M = 2^{64}$，是`unsigned long long`的最大值加一。由于计算机的存储格式，所有的数字会自动对 $2^{64}$ 取模。
下面根据不同的 $p$ 来分析卡法：
1. 当 $p$ 为偶数时，若 $len(S) > 64$，则必然发生冲突。因为此时 $p^{len(S)-1} \equiv 0 \pmod{M}$ ，导致高位信息丢失。
2. 当 $p$ 为奇数时，我们可以构造出一些特殊的字符串来卡 Hash。此处略过。

# Hash 的改进

## 双 Hash：减少冲突
双 Hash 是指使用两个不同的 Hash 函数来计算字符串的 Hash 值，从而减少 Hash 冲突的概率。

## 多次询问 Hash：减少计算的时间复杂度
单次计算一个字符串的哈希值复杂度是 $O(n)$，但如果需要多次询问同一个字符串的不同子串的哈希值，可以预处理出前缀哈希数组，从而将每次询问的时间复杂度降低到 $O(1)$。

设字符串 S 的长度为 n，预处理前缀哈希数组 H：
$$
H[i] = (S[0] * p^0 + S[1] * p^1 + ... + S[i] * p^i) \mod M
$$
满足：
$$
H[i] = (H[i-1] + S[i] * P[i]) \mod M
$$
预处理幂数组 P：
$$
P[i] = p^i \mod M
$$
则子串 S[i..j] 的 Hash 值可以通过以下公式计算：
$$
H(S[i..j]) = (H[j] - H[i-1] * P[j-i+1]) \mod M
$$

模版：
```cpp
using ull = unsigned long long;
ull base = 131;
ull mod1 = 212370440130137957, mod2 = 1e9 + 7;

ull get_hash1(std::string s) {
  int len = s.size();
  ull ans = 0;
  for (int i = 0; i < len; i++) ans = (ans * base + (ull)s[i]) % mod1;
  return ans;
}

ull get_hash2(std::string s) {
  int len = s.size();
  ull ans = 0;
  for (int i = 0; i < len; i++) ans = (ans * base + (ull)s[i]) % mod2;
  return ans;
}

bool cmp(const std::string s, const std::string t) {
  bool f1 = get_hash1(s) != get_hash1(t);
  bool f2 = get_hash2(s) != get_hash2(t);
  return f1 || f2;
}
```