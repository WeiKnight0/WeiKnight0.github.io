---
title: 1534 Count Good Triplets
date: 2025-07-30 11:29:12
lang: en
---

# Link: [https://leetcode.cn/problems/count-good-triplets/description/](https://leetcode.cn/problems/count-good-triplets/description/)

## Description
Given an array of integers `arr`, and three integers `a`, `b` and `c`. You need to find the number of good triplets.

A triplet `(arr[i], arr[j], arr[k])` is **good** if the following conditions are true:

- `0 <= i < j < k < arr.length`
- `|arr[i] - arr[j]| <= a`
- `|arr[j] - arr[k]| <= b`
- `|arr[i] - arr[k]| <= c`
Where `|x|` denotes the absolute value of `x`.

Return *the number of good triplets*.

```
Example 1:
Input: arr = [3,0,1,1,9,7], a = 7, b = 2, c = 3
Output: 4
Explanation: There are 4 good triplets: [(3,0,1), (3,0,1), (3,1,1), (0,1,1)].
```
```
Example 2:
Input: arr = [1,1,2,2,3], a = 0, b = 0, c = 1
Output: 0
Explanation: No triplet satisfies all conditions.
```

Constraints:

- `3 <= arr.length <= 100`
- `0 <= arr[i] <= 1000`
- `0 <= a, b, c <= 1000`

## Solution

If the `arr` array is sorted, we can use the method of **traversing the middle and enumerating both ends** to solve the problem. However, in this case, the array is unsorted and cannot be sorted. Therefore, we need to use the **index array**: create an array `idx` and sort it according to the values of `arr`. This is very useful when **we want to keep the original array unchanged but need to know the order of elements after sorting**.

Template:

```cpp
// C++20 ver
std::vector<int> idx(arr.size());
std::ranges::iota(idx, 0);
std::ranges::sort(idx, {}, [&](int i) { return arr[i]; });
// C++11/14/17 ver
std::vector<int> idx(arr.size());
std::iota(idx.begin(), idx.end(), 0);
std::sort(idx.begin(), idx.end(), [&](int i, int j) {
    return arr[i] < arr[j];
});
```

```python
idx = sorted(range(len(arr)), key=lambda i: arr[i])
```

```java
Integer[] idx = new Integer[arr.length];
Arrays.setAll(idx, i -> i);
Arrays.sort(idx, (i, j) -> arr[i] - arr[j]);
```

After creating the index array, we can iterate through it to find all `i, j, k` that satisfy the first two conditions.

Now, we need to find those that meet the third condition, which is `|arr[i] - arr[k]| <= c`. We can put all `arr[i]` and `arr[k]` into two separate arrays. **For each element `x` in the `arr[i]` array, calculate the number of elements in the `arr[k]` array that satisfy `x - c <= arr[k] <= x + c`**.

Since both arrays are sorted, we can use the **same-direction two-pointer method** for each `x` to solve this. Referring to the idea of prefix sums, we find the positions that are **just not `<= x + c`** and **just not `< x - c`** each time, and then subtract these two positions to get the count.

---

```cpp
class Solution
{
public:
    int countGoodTriplets(vector<int> &arr, int a, int b, int c)
    {
        int n = arr.size();
        vector<int> idx(n);
        ranges::iota(idx, 0);
        ranges::sort(idx, {}, [&](int i)
                     { return arr[i]; });

        int ans = 0;
        for (int j = 0; j < n; j++)
        {
            int aj = arr[j];
            vector<int> ai, ak;
            for (int i : idx)
            {
                // traversal in idx, not in 0~j-1
                if (i < j && abs(arr[i] - aj) <= a)
                {
                    ai.push_back(arr[i]);
                }
            }
            for (int k : idx)
            {
                // traversal in idx, not in j+1~end
                if (j < k && abs(arr[k] - aj) <= b)
                {
                    ak.push_back(arr[k]);
                }
            }
            int p1 = 0, p2 = 0;
            for (int x : ai)
            {
                while (p1 < ak.size() && ak[p1] < x - c)
                    p1++;
                while (p2 < ak.size() && ak[p2] <= x + c)
                    p2++;
                ans += p2 - p1;
            }
        }
        return ans;
    }
};
```

