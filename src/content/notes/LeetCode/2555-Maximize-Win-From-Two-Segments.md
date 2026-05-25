---
title: 2555 Maximize Win From Two Segments
date: 2025-07-29 15:28:38
lang: en
---

# Link: [https://leetcode.cn/problems/maximize-win-from-two-segments/description/](https://leetcode.com/problems/maximize-win-from-two-segments/description/)

## Description
There are some prizes on the X-axis. You are given an integer array `prizePositions` that is sorted in non-decreasing order, where `prizePositions[i]` is the position of the `i th` prize. There could be different prizes at the same position on the line. You are also given an integer `k`.

You are allowed to select two segments with integer endpoints. The length of each segment must be `k`. You will collect all prizes whose position falls within at least one of the two selected segments (including the endpoints of the segments). The two selected segments may intersect.

- For example if `k = 2`, you can choose segments `[1, 3]` and `[2, 4]`, and you will win any prize i that satisfies `1 <= prizePositions[i] <= 3` or `2 <= prizePositions[i] <= 4`.
Return *the **maximum** number of prizes you can win if you choose the two segments optimally*.

```
Example 1:
Input: prizePositions = [1,1,2,2,3,3,5], k = 2
Output: 7
Explanation: In this example, you can win all 7 prizes by selecting two segments [1, 3] and [3, 5].
```

```
Example 2:
Input: prizePositions = [1,2,3,4], k = 0
Output: 2
Explanation: For this example, one choice for the segments is [3, 3] and [4, 4], and 
you will be able to get 2 prizes. 
```

Constraints:

- `1 <= prizePositions.length <= 10^5`
- `1 <= prizePositions[i] <= 10^9`
- `0 <= k <= 10^9`
- `prizePositions` is sorted in non-decreasing order.

## Solution
Consider a single segment. If there is a prize at the right endpoint, we can shift the segment to the left without reducing the number of prizes. Therefore, we can enumerate all right endpoints and find the minimum left endpoint within a length of `k` using a **sliding window** for an easy solution. 

For two segments, we can **enumerate the second segment** and consider the **first segment**. Greedily, the two segments should not overlap. The right endpoint of the first segment must be less than or equal to the left endpoint of the second segment. Next, we need to find the maximum number of prizes that can be obtained when the right endpoint of the first segment is less than or equal to a certain point. We can use **dynamic programming** for this.

Let `dp[i+1]` represent the maximum number of prizes when the right endpoint of the first segment is less than or equal to `prizePositions[i]`. Then we have:

 $$ dp[i+1] =  \begin{cases}  dp[i], & \text{if the right endpoint < } prizePositions[i] \\ \text{all prizes in the segment} = right - left + 1, & \text{if the right endpoint = } prizePositions[i] \end{cases} = \max(\text{the two cases}) $$ 

Why is there `right - left + 1` when the right endpoint equals `prizePositions[i]`? This is because the **indices refer to the indices of `prizePositions`**. Since `prizePositions` is non-decreasing, `right - left + 1` directly gives the number of prizes. The case where the right endpoint equals `prizePositions[i]` is equivalent to the single segment scenario, which can also be solved using the sliding window method. Specifically, `dp[0] = 0`. The answer is the sum of the prizes from the two segments: `dp[left] + right - left + 1`.

---

```cpp
class Solution
{
public:
    int maximizeWin(vector<int> &prizePositions, int k)
    {
        int n = prizePositions.size();
        if (2 * k + 1 >= prizePositions[n - 1] - prizePositions[0])
        {
            return n;
            // 2 segs can fill whole prizes
        }
        int ans = 0;
        int l = 0; // left
        vector<int> dp(n + 1, 0);
        for (int r = 0; r < n; r++)
        { // right
            // sliding window
            while (prizePositions[r] - prizePositions[l] > k)
            {
                l++;
            }
            // update dp
            dp[r + 1] = max(dp[r], r - l + 1);
            ans = max(ans, dp[l] + r - l + 1);
        }
        return ans;
    }
};
```

