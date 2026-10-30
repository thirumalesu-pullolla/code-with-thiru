---
id: second-largest-element
title: Find the Second Largest Element in an Array
topicId: arrays
patternId: traversal
difficulty: Easy
description: Find the second-largest distinct value in an integer array.
---

# Find the Second Largest Element in an Array

## Problem Statement

Given an integer array, find the **second-largest distinct element**.

If the array does not contain at least two distinct values, return `-1`.

For this exercise, assume all array elements are non-negative integers.

## Example 1

**Input:** `[10, 5, 20, 8, 20]`

**Output:** `10`

**Explanation:** The largest distinct value is 20, and the second-largest distinct value is 10.

## Example 2

**Input:** `[5, 5, 5]`

**Output:** `-1`

**Explanation:** There is no second distinct value.

## Constraints

- Array length is at least 1.
- All elements are non-negative integers.
- Duplicate values are allowed.

## Approach 1 — Brute Force

### Explanation

1. Create a copy of the array.
2. Sort the copy in ascending order.
3. Store the largest element.
4. Traverse backward until a smaller element is found.
5. Return `-1` if no such element exists.

### Java Code

```java
import java.util.Arrays;

public class Solution {

    public static int secondLargest(int[] arr) {
        int[] copy = arr.clone();

        Arrays.sort(copy);

        int largest = copy[copy.length - 1];

        for (int i = copy.length - 2; i >= 0; i--) {
            if (copy[i] < largest) {
                return copy[i];
            }
        }

        return -1;
    }
}
```

### Complexity

- **Time:** O(n log n)
- **Extra Space:** O(n)

## Approach 2 — Optimized

### Explanation

We can solve this problem in one traversal.

Maintain two variables:

- `largest`: Largest value found so far.
- `second`: Second-largest distinct value found so far.

When a new largest value is found, the previous largest becomes the second largest.

Otherwise, update the second-largest value only if the current number is smaller than the largest but greater than the current second largest.

### Java Code

```java
public class Solution {

    public static int secondLargest(int[] arr) {
        int largest = -1;
        int second = -1;

        for (int num : arr) {
            if (num > largest) {
                second = largest;
                largest = num;
            } else if (num < largest && num > second) {
                second = num;
            }
        }

        return second;
    }
}
```

### Complexity

- **Time:** O(n)
- **Extra Space:** O(1)

## Dry Run

Input: `[10, 5, 20, 8, 20]`

| Current Element | Largest | Second Largest |
|---|---|---|
| 10 | 10 | -1 |
| 5 | 10 | 5 |
| 20 | 20 | 10 |
| 8 | 20 | 10 |
| 20 | 20 | 10 |

**Final Answer:** `10`

## Interview Follow-up

### Can we solve this in one traversal?

Yes. We maintain the largest and second-largest distinct values during a single traversal.

### What happens if all elements are equal?

We return `-1`, because a second-largest distinct value does not exist.

### Does this implementation work for negative integers?

The optimized version uses `-1` as a sentinel and assumes non-negative values. For arbitrary signed integers, use a nullable result or a separate boolean flag to represent whether a second-largest value exists.
