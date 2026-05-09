---
title: Binary Search 二分查找
date: 2025-10-07
lang: zh-cn
---

# Binary Search 二分查找
二分查找（Binary Search）是一种在有序数组中查找特定元素的高效算法。它通过反复将搜索区间减半来快速定位目标元素的位置。二分查找的时间复杂度为 $O(\log n)$，远优于线性查找的 $O(n)$。

核心介绍视频：[二分查找 红蓝染色法](https://www.bilibili.com/video/BV1AP41137w7)

对于二分查找的实现，主要有三种区间划分方式，每种方式又分为第一个 大于等于、大于、小于等于、小于 `target`四种情况。
下面给出大于等于的代码。其余情况可以转化成大于等于。
## 情况1：`[left, right]` 左闭右闭区间
```cpp
// 在arr[0..n-1]中查找第一个大于等于target的元素下标（lower_bound），找不到返回-1
int binary_search_lower_bound(int arr[], int n, int target) {
    int left = 0, right = n - 1; // [left, right]
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] < target) {
            left = mid + 1;    // [mid+1, right]
        } else {
            right = mid - 1;   // [left, mid-1]
        }
    }
    if (left == n){ // 如果找不到，最终left一定在数组外面
        return -1;
    }
    return left;
}
```
## 情况2：`[left, right)` 左闭右开区间
```cpp
// 在arr[0..n-1]中查找第一个大于等于target的元素下标，找不到返回-1
int binary_search_lower_bound(int arr[], int n, int target) {
    int left = 0, right = n; // [left, right)
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] < target) {
            left = mid + 1; // 搜索右半部分 [mid+1, right)
        } else {
            right = mid; // 搜索左半部分 [left, mid)
        }
    }
    if (left == n){
        return -1;
    }
    return left; // 也可以return right
}
```
## 情况3：`(left, right)` 左开右开区间
```cpp
// 在arr[0..n-1]中查找第一个大于等于target的元素下标（lower_bound），找不到返回-1
int binary_search_lower_bound(int arr[], int n, int target) {
    int left = -1, right = n; // (left, right)
    
    while (left + 1 < right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] < target) {
            left = mid; // 搜索右半部分 (mid, right)
        } else {
            right = mid; // 搜索左半部分 (left, mid)
        }
    }
    if (right == n) {
        return -1; // 没有不小于target的元素
    }
    return right;
}
```
总结表格：
| 情况                         | 初始条件                      | 状态更新`arr[mid] < target` | 状态更新`arr[mid] >= target` | 最终状态                | 返回值              | 未找到时的返回值 |
| -------------------------- | ------------------------- | ------------------------- | -------------------------- | ------------------- | ---------------- | -------------- |
| **`[left, right]`** 左闭右闭 | `left = 0, right = n - 1` | `left = mid + 1`          | `right = mid - 1`          | `left > right`      | `left`           | `left == n`    |
| **`[left, right)`** 左闭右开 | `left = 0, right = n`     | `left = mid + 1`          | `right = mid`              | `left == right`     | `left` 或 `right` | `left == right == n`    |
| **`(left, right)`** 左开右开  | `left = -1, right = n`    | `left = mid`              | `right = mid`              | `left + 1 == right` | `right`          | `right == n`   |

其他情况的转化（一般都是整数）：
1. 大于：转化成大于等于`target+1`
2. 小于：先算出大于等于`target`，左边的那个数就是小于的
3. 小于等于：先算出大于`target`，左边的那个数就是小于的

# STL中的二分查找
在 C++ STL 中，二分查找相关的函数主要有 `std::lower_bound` 和 `std::upper_bound`。这些函数都要求输入的范围是有序的。
- `lower_bound(first, last, num)`：返回第一个 **不小于（大于等于）** 目标值的元素位置。
- `upper_bound(first, last, num)`：返回第一个 **大于** 目标值的元素位置。
注意，这两个函数返回的是指针或迭代器；此外，如果目标值不存在，`lower_bound` 返回的是第一个大于目标值的位置。
两个函数的输入均为 **左闭右开区间** `[first, last)`。
```cpp
int arr[] = {1, 2, 2, 3, 4};
int n = 5;
int* lower = std::lower_bound(arr, arr + n, 2); // 指向第一个2的位置
int* upper = std::upper_bound(arr, arr + n, 2); // 指向第一个大于2的位置（即3的位置）
```
```cpp
// 查找第一个不小于target的元素下标
int lower_bound_search(int arr[], int n, int target) {
    int* it = std::lower_bound(arr, arr + n, target);
    if (it != arr + n && *it == target) {
        return it - arr;
    }
    return -1;
}
```
```cpp
// 查找第一个大于target的元素的前一个下标（即最后一个等于target的元素下标）
int upper_bound_search(int arr[], int n, int target) {
    int* it = std::upper_bound(arr, arr + n, target);
    if (it != arr && *(it - 1) == target) {
        return (it - 1) - arr;
    }
    return -1;
}
```
此外，还有 `std::binary_search` 函数，用于判断一个元素是否存在于有序范围内。
```cpp
bool is_exist(int arr[], int n, int target) {
    return std::binary_search(arr, arr + n, target);
}
```

# 二分答案
当问题的答案具有**单调性**、有明确的`check()`函数、答案范围明确（一般是闭区间`[left, right]`）时，就可以尝试二分答案。

主要分为以下两种情况：
- 找最大值的`true`，`check()`随`x`增大从`true`变为`false`
代码示例：
```cpp
int binary_search_max(int left, int right) { // [left, right]
    while (left <= right) {
        int mid = left + (right - left + 1) / 2; // 向上取整
        if (check(mid)) { // check()随x增大从true变为false
            left = mid + 1; // [mid, right]
        } else {
            right = mid - 1; // [left, mid-1]
        }
    }
    return right;
}
```
- 找最小值，`check()`随`x`增大从`false`变为`true`
代码示例：
```cpp
int binary_search_min(int left, int right) { // [left, right]
    while (left <= right) {
        int mid = left + (right - left) / 2; // 向下取整
        if (check(mid)) { // check()随x增大从false变为true
            right = mid - 1; // [left, mid]
        } else {
            left = mid + 1; // [mid+1, right]
        }
    }
    return left;
}
```
总结表格：
| 问题类型 | check(x) 单调性 | 目标答案 | 状态更新 | 循环结束时状态 | 返回值 |
|---------|----------------|----------|----------|----------------|---------|
| **最大化问题**<br>(找最大的可行x) | `[T, T, ..., T, F, F, ..., F]`<br>x增大从true变false | 最后一个true | `if(check(mid)) l=mid+1;`<br>`else r=mid-1;` | `l` → 第一个false<br>`r` → 最后一个true | **`r`** |
| **最小化问题**<br>(找最小的可行x) | `[F, F, ..., F, T, T, ..., T]`<br>x增大从false变true | 第一个true | `if(check(mid)) r=mid-1;`<br>`else l=mid+1;` | `l` → 第一个true<br>`r` → 最后一个false | **`l`** |



