export const arrayTraversalContent = {
    "smallest-and-second-smallest-elements": `## Problem statement

Return the two smallest **distinct** values in the array. If fewer than two distinct values exist, return an empty array.

## Examples

| Input | Output |
|---|---|
| \`[4, 1, 1, -2, 3]\` | \`[-2, 1]\` |
| \`[5, 5]\` | \`[]\` |

## Brute-force approach: sort a copy

Sort without changing the caller's array, then scan from the beginning for the first value greater than the minimum.

~~~java
import java.util.Arrays;

public class Solution {
    public static int[] twoSmallestBruteForce(int[] values) {
        int[] sorted = values.clone();
        Arrays.sort(sorted);
        for (int i = 1; i < sorted.length; i++) {
            if (sorted[i] != sorted[0]) return new int[] {sorted[0], sorted[i]};
        }
        return new int[0];
    }
}
~~~

- **Time:** O(n log n)
- **Extra space:** O(n)

## Optimized approach: track two values

Maintain the smallest and second-smallest distinct values while visiting each element once. Boolean flags avoid sentinel bugs with arbitrary integer values.

~~~java
public class Solution {
    public static int[] twoSmallest(int[] values) {
        int first = 0, second = 0;
        boolean hasFirst = false, hasSecond = false;
        for (int value : values) {
            if (!hasFirst || value < first) {
                if (hasFirst && value != first) {
                    second = first;
                    hasSecond = true;
                }
                first = value;
                hasFirst = true;
            } else if (value != first && (!hasSecond || value < second)) {
                second = value;
                hasSecond = true;
            }
        }
        return hasSecond ? new int[] {first, second} : new int[0];
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1), excluding the two-value result`,

    "check-array-sorted": `## Problem statement

Return whether an integer array is sorted in non-decreasing order. Equal adjacent values are allowed.

## Examples

| Input | Output |
|---|---|
| \`[-3, 0, 0, 7]\` | \`true\` |
| \`[1, 4, 2]\` | \`false\` |

## Brute-force approach: compare with a sorted copy

Sort a copy and compare it with the original. This is straightforward, but does extra work and allocates memory.

~~~java
import java.util.Arrays;

public class Solution {
    public static boolean isSortedBruteForce(int[] values) {
        int[] copy = values.clone();
        Arrays.sort(copy);
        return Arrays.equals(values, copy);
    }
}
~~~

- **Time:** O(n log n)
- **Extra space:** O(n)

## Optimized approach: inspect adjacent pairs

In a sorted array, no element is greater than its successor. Stop at the first inversion.

~~~java
public class Solution {
    public static boolean isSorted(int[] values) {
        for (int i = 1; i < values.length; i++) {
            if (values[i - 1] > values[i]) return false;
        }
        return true;
    }
}
~~~

- **Time:** O(n), O(1) if already invalid at the first pair
- **Extra space:** O(1)`,

    "remove-duplicates-sorted-array": `## Problem statement

Given a sorted array, compact its distinct values into the beginning of the same array in their original order. Return the number of distinct values; values after that prefix do not matter.

## Example

Input \`[1, 1, 2, 2, 3]\` becomes prefix \`[1, 2, 3]\`; return 3.

## Brute-force approach: collect unique values

Use an insertion-ordered set, then copy its values back into the array.

~~~java
import java.util.LinkedHashSet;
import java.util.Set;

public class Solution {
    public static int deduplicateBruteForce(int[] values) {
        Set<Integer> unique = new LinkedHashSet<>();
        for (int value : values) unique.add(value);
        int index = 0;
        for (int value : unique) values[index++] = value;
        return index;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)

## Optimized approach: read and write pointers

The sorted order puts duplicates next to each other. Keep one copy whenever the current value differs from the last written value.

~~~java
public class Solution {
    public static int deduplicate(int[] values) {
        if (values.length == 0) return 0;
        int write = 1;
        for (int read = 1; read < values.length; read++) {
            if (values[read] != values[write - 1]) {
                values[write++] = values[read];
            }
        }
        return write;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "move-zeroes-to-end": `## Problem statement

Move every zero to the end of the array while preserving the order of non-zero values. Modify the input array in place.

## Example

\`[0, 1, 0, 3, 12]\` becomes \`[1, 3, 12, 0, 0]\`.

## Brute-force approach: build a temporary array

Copy non-zero values first, then fill the remaining positions with zero.

~~~java
import java.util.Arrays;

public class Solution {
    public static void moveZeroesBruteForce(int[] values) {
        int[] result = new int[values.length];
        int next = 0;
        for (int value : values) if (value != 0) result[next++] = value;
        System.arraycopy(result, 0, values, 0, values.length);
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: stable compaction

Copy each non-zero to the next write position, then clear the suffix. This preserves order and avoids an auxiliary array.

~~~java
import java.util.Arrays;

public class Solution {
    public static void moveZeroes(int[] values) {
        int write = 0;
        for (int value : values) {
            if (value != 0) values[write++] = value;
        }
        Arrays.fill(values, write, values.length, 0);
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "move-negative-numbers-to-one-side": `## Problem statement

Rearrange the array so negative numbers appear before non-negative numbers. Relative order within either group does not need to be preserved.

## Example

\`[3, -1, 0, -7, 4]\` may become \`[-7, -1, 0, 3, 4]\`.

## Brute-force approach: partition into two lists

Collect negative and non-negative values separately, then copy them back.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static void partitionBruteForce(int[] values) {
        List<Integer> negative = new ArrayList<>();
        List<Integer> other = new ArrayList<>();
        for (int value : values) {
            (value < 0 ? negative : other).add(value);
        }
        int index = 0;
        for (int value : negative) values[index++] = value;
        for (int value : other) values[index++] = value;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: two pointers

Move the left pointer past negatives and the right pointer past non-negatives. Swap values when both pointers find a misplaced value.

~~~java
public class Solution {
    public static void partition(int[] values) {
        int left = 0, right = values.length - 1;
        while (left <= right) {
            while (left <= right && values[left] < 0) left++;
            while (left <= right && values[right] >= 0) right--;
            if (left < right) {
                int temporary = values[left];
                values[left++] = values[right];
                values[right--] = temporary;
            }
        }
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

Zero belongs to the non-negative partition.`,

    "left-rotate-array-one-position": `## Problem statement

Rotate an array left by one position: its first element becomes the last. An empty array remains empty.

## Example

\`[1, 2, 3, 4]\` becomes \`[2, 3, 4, 1]\`.

## Brute-force approach: shift each element

Save the first value, shift every following value left, and store the saved value at the end.

~~~java
public class Solution {
    public static void rotateLeftBruteForce(int[] values) {
        if (values.length < 2) return;
        int first = values[0];
        for (int i = 1; i < values.length; i++) values[i - 1] = values[i];
        values[values.length - 1] = first;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: array copy operation

Use the runtime's bulk-copy implementation to shift the contiguous range, retaining the first value.

~~~java
public class Solution {
    public static void rotateLeft(int[] values) {
        if (values.length < 2) return;
        int first = values[0];
        System.arraycopy(values, 1, values, 0, values.length - 1);
        values[values.length - 1] = first;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

Both approaches are asymptotically optimal because every moved element must change position.`,

    "rotate-array-by-k-positions": `## Problem statement

Rotate an array left by a non-negative \`k\` positions. Values of \`k\` greater than the array length are allowed.

## Example

\`[1, 2, 3, 4, 5]\`, \`k = 2\` becomes \`[3, 4, 5, 1, 2]\`.

## Brute-force approach: copy from rotated indices

Write each source element into its destination in a new array, then copy the result back.

~~~java
public class Solution {
    public static void rotateLeftBruteForce(int[] values, int k) {
        if (k < 0) throw new IllegalArgumentException("k must be non-negative");
        int n = values.length;
        if (n == 0) return;
        int shift = k % n;
        int[] result = new int[n];
        for (int i = 0; i < n; i++) result[i] = values[(i + shift) % n];
        System.arraycopy(result, 0, values, 0, n);
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: reverse three ranges

Reverse the first \`k\` elements, reverse the rest, then reverse the whole array. Normalize \`k\` first.

~~~java
public class Solution {
    private static void reverse(int[] a, int left, int right) {
        while (left < right) {
            int temporary = a[left];
            a[left++] = a[right];
            a[right--] = temporary;
        }
    }

    public static void rotateLeft(int[] values, int k) {
        if (k < 0) throw new IllegalArgumentException("k must be non-negative");
        int n = values.length;
        if (n == 0) return;
        int shift = k % n;
        reverse(values, 0, shift - 1);
        reverse(values, shift, n - 1);
        reverse(values, 0, n - 1);
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "missing-number-from-one-to-n": `## Problem statement

An array contains distinct numbers from 1 through \`n\`, with exactly one number missing. The array length is \`n - 1\`. Return the missing number.

## Example

\`[1, 2, 4, 5]\` represents 1 through 5 with 3 missing; return 3.

## Brute-force approach: search for each expected value

For each value from 1 through \`n\`, scan the array for it. Return the first value not found.

~~~java
public class Solution {
    public static int missingNumberBruteForce(int[] values) {
        int n = values.length + 1;
        for (int expected = 1; expected <= n; expected++) {
            boolean found = false;
            for (int value : values) if (value == expected) found = true;
            if (!found) return expected;
        }
        throw new IllegalArgumentException("Input must contain one missing value");
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: XOR

XOR all values from 1 through \`n\` and every array value. Matching values cancel, leaving only the missing number.

~~~java
public class Solution {
    public static int missingNumber(int[] values) {
        int n = values.length + 1;
        int missing = 0;
        for (int value = 1; value <= n; value++) missing ^= value;
        for (int value : values) missing ^= value;
        return missing;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

XOR avoids the possible overflow of the arithmetic sum formula.`,

    "find-duplicate-number": `## Problem statement

The array has \`n + 1\` values, each in the range 1 through \`n\`. At least one value appears more than once. Return a duplicate without modifying the array and using constant extra space.

## Example

\`[1, 3, 4, 2, 2]\` returns 2.

## Brute-force approach: compare every pair

Check all pairs and return as soon as two equal values are found.

~~~java
public class Solution {
    public static int findDuplicateBruteForce(int[] values) {
        for (int i = 0; i < values.length; i++) {
            for (int j = i + 1; j < values.length; j++) {
                if (values[i] == values[j]) return values[i];
            }
        }
        throw new IllegalArgumentException("A duplicate is required");
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: Floyd cycle detection

Treat each value as the next index in a linked structure. The duplicate creates a cycle entrance. Use Floyd's slow/fast pointers to find that entrance without modifying the input.

~~~java
public class Solution {
    public static int findDuplicate(int[] values) {
        int slow = values[0], fast = values[0];
        do {
            slow = values[slow];
            fast = values[values[fast]];
        } while (slow != fast);
        slow = values[0];
        while (slow != fast) {
            slow = values[slow];
            fast = values[fast];
        }
        return slow;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

This solution relies on the stated value range and array length constraints.`,

    "find-all-duplicate-elements": `## Problem statement

Return each distinct integer that occurs more than once. The result order follows the first duplicate encounter while scanning left to right.

## Example

\`[4, 2, 4, 3, 2, 2]\` returns \`[4, 2]\`.

## Brute-force approach: count each value

For each first occurrence, count matching values across the array. Add it when the count exceeds one.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> duplicatesBruteForce(int[] values) {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < values.length; i++) {
            boolean seenEarlier = false;
            for (int j = 0; j < i; j++) if (values[j] == values[i]) seenEarlier = true;
            if (seenEarlier) continue;
            int count = 0;
            for (int value : values) if (value == values[i]) count++;
            if (count > 1) result.add(values[i]);
        }
        return result;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(k) for the returned k duplicates

## Optimized approach: track seen and reported values

One set records values seen once; a second set ensures each duplicate is emitted only once.

~~~java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {
    public static List<Integer> duplicates(int[] values) {
        Set<Integer> seen = new HashSet<>();
        Set<Integer> reported = new HashSet<>();
        List<Integer> result = new ArrayList<>();
        for (int value : values) {
            if (!seen.add(value) && reported.add(value)) result.add(value);
        }
        return result;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)

If the problem guarantees values in a compact range, a frequency array can replace the sets.`,

    "find-elements-appearing-once": `## Problem statement

Return the values that occur exactly once, preserving their order in the input.

## Example

\`[4, 2, 4, 3, 2, 5]\` returns \`[3, 5]\`.

## Brute-force approach: count every value

For each element, count equal values throughout the array. Keep it only when its count is one.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> uniqueValuesBruteForce(int[] values) {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < values.length; i++) {
            int count = 0;
            for (int value : values) if (value == values[i]) count++;
            if (count == 1) result.add(values[i]);
        }
        return result;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(k) for the returned values

## Optimized approach: frequency map

Count values in one pass, then scan the original array to preserve input order.

~~~java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {
    public static List<Integer> uniqueValues(int[] values) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : values) counts.merge(value, 1, Integer::sum);
        List<Integer> result = new ArrayList<>();
        for (int value : values) {
            if (counts.get(value) == 1) result.add(value);
        }
        return result;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)`,

    "most-frequent-element": `## Problem statement

Return the value with the highest frequency. If multiple values tie, return the smallest tied value. The input is non-empty.

## Example

\`[4, 2, 4, 2, 7]\` returns 2: both 2 and 4 occur twice, and 2 is smaller.

## Brute-force approach: count each distinct value

Count occurrences for each first-seen candidate and keep the best frequency, applying the tie rule.

~~~java
public class Solution {
    public static int mostFrequentBruteForce(int[] values) {
        int bestValue = values[0], bestCount = 0;
        for (int i = 0; i < values.length; i++) {
            boolean earlier = false;
            for (int j = 0; j < i; j++) if (values[j] == values[i]) earlier = true;
            if (earlier) continue;
            int count = 0;
            for (int value : values) if (value == values[i]) count++;
            if (count > bestCount || (count == bestCount && values[i] < bestValue)) {
                bestValue = values[i];
                bestCount = count;
            }
        }
        return bestValue;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: count with a map

Build frequencies in one pass, then select the largest count and smallest value on ties.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int mostFrequent(int[] values) {
        if (values.length == 0) throw new IllegalArgumentException("Input must not be empty");
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : values) counts.merge(value, 1, Integer::sum);
        int bestValue = values[0], bestCount = 0;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            int value = entry.getKey(), count = entry.getValue();
            if (count > bestCount || (count == bestCount && value < bestValue)) {
                bestValue = value;
                bestCount = count;
            }
        }
        return bestValue;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u), where u is the number of distinct values`,

    "majority-element": `## Problem statement

Return the value occurring more than \`floor(n / 2)\` times, or report that no majority exists.

## Example

\`[2, 1, 2, 2]\` returns 2; \`[1, 2, 3]\` has no majority.

## Brute-force approach: count candidates

Try each value and count its occurrences. Return the first value whose count exceeds half the array length.

~~~java
public class Solution {
    public static Integer majorityBruteForce(int[] values) {
        for (int candidate : values) {
            int count = 0;
            for (int value : values) if (value == candidate) count++;
            if (count > values.length / 2) return candidate;
        }
        return null;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: Boyer-Moore voting with verification

Pair different values against each other; a true majority cannot be fully cancelled. Verify the final candidate because a majority is not guaranteed.

~~~java
public class Solution {
    public static Integer majority(int[] values) {
        int candidate = 0, balance = 0;
        for (int value : values) {
            if (balance == 0) candidate = value;
            balance += value == candidate ? 1 : -1;
        }
        int count = 0;
        for (int value : values) if (value == candidate) count++;
        return count > values.length / 2 ? candidate : null;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "leaders-in-array": `## Problem statement

An element is a leader when it is greater than or equal to every element to its right. Return leaders in their original left-to-right order. The final element is always a leader.

## Example

\`[16, 17, 4, 3, 5, 2]\` returns \`[17, 5, 2]\`.

## Brute-force approach: scan the suffix

For each position, compare its value with every value to its right.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> leadersBruteForce(int[] values) {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < values.length; i++) {
            boolean leader = true;
            for (int j = i + 1; j < values.length; j++) {
                if (values[j] > values[i]) { leader = false; break; }
            }
            if (leader) result.add(values[i]);
        }
        return result;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(k) for k returned leaders

## Optimized approach: maintain the right-side maximum

Scan right to left. A value at least as large as the maximum seen so far is a leader; reverse the collected list for the requested order.

~~~java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Solution {
    public static List<Integer> leaders(int[] values) {
        List<Integer> result = new ArrayList<>();
        int maximum = Integer.MIN_VALUE;
        for (int i = values.length - 1; i >= 0; i--) {
            if (values[i] >= maximum) {
                result.add(values[i]);
                maximum = values[i];
            }
        }
        Collections.reverse(result);
        return result;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(k) for the result`,

    "equilibrium-index": `## Problem statement

Return the first index where the sum of values strictly to the left equals the sum strictly to the right. Return -1 if no such index exists.

## Example

For \`[1, 3, 5, 2, 2]\`, index 2 is balanced: left sum 4 and right sum 4.

## Brute-force approach: sum each side

For each index, calculate the left and right sums directly.

~~~java
public class Solution {
    public static int equilibriumBruteForce(int[] values) {
        for (int i = 0; i < values.length; i++) {
            long left = 0, right = 0;
            for (int j = 0; j < i; j++) left += values[j];
            for (int j = i + 1; j < values.length; j++) right += values[j];
            if (left == right) return i;
        }
        return -1;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: total and running left sum

Compute the total once. At each index, the right sum is \`total - left - values[i]\`.

~~~java
public class Solution {
    public static int equilibriumIndex(int[] values) {
        long total = 0;
        for (int value : values) total += value;
        long left = 0;
        for (int i = 0; i < values.length; i++) {
            if (left == total - left - values[i]) return i;
            left += values[i];
        }
        return -1;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

Use \`long\` sums to reduce overflow risk.`,

    "maximum-later-difference": `## Problem statement

Find the maximum \`values[j] - values[i]\` with \`j > i\`. Return an empty optional if no positive difference exists.

## Example

\`[7, 1, 5, 3, 6, 4]\` returns 5 from \`6 - 1\`.

## Brute-force approach: examine every pair

Try every valid buy/sell pair and retain the largest positive difference.

~~~java
import java.util.OptionalInt;

public class Solution {
    public static OptionalInt maxDifferenceBruteForce(int[] values) {
        int best = 0;
        for (int i = 0; i < values.length; i++) {
            for (int j = i + 1; j < values.length; j++) {
                best = Math.max(best, values[j] - values[i]);
            }
        }
        return best > 0 ? OptionalInt.of(best) : OptionalInt.empty();
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: remember the minimum so far

At each later position, subtract the smallest earlier value. Update that minimum after evaluating the current position.

~~~java
import java.util.OptionalInt;

public class Solution {
    public static OptionalInt maxDifference(int[] values) {
        if (values.length < 2) return OptionalInt.empty();
        int minimum = values[0], best = 0;
        for (int i = 1; i < values.length; i++) {
            best = Math.max(best, values[i] - minimum);
            minimum = Math.min(minimum, values[i]);
        }
        return best > 0 ? OptionalInt.of(best) : OptionalInt.empty();
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

The subtraction of two int values fits in a Java \`int\` only if inputs cannot span the full int range; use \`long\` for unrestricted extremes.`,

    "maximum-consecutive-ones": `## Problem statement

Given a binary array, return the length of its longest contiguous run of ones.

## Example

\`[1, 1, 0, 1, 1, 1]\` returns 3.

## Brute-force approach: expand from each start

For every index containing one, count consecutive ones to its right.

~~~java
public class Solution {
    public static int longestOnesBruteForce(int[] values) {
        int best = 0;
        for (int start = 0; start < values.length; start++) {
            int end = start;
            while (end < values.length && values[end] == 1) end++;
            best = Math.max(best, end - start);
        }
        return best;
    }
}
~~~

- **Time:** O(n²) in the worst case
- **Extra space:** O(1)

## Optimized approach: one pass

Count the current run, reset it at zero, and retain the longest run seen.

~~~java
public class Solution {
    public static int longestOnes(int[] values) {
        int current = 0, best = 0;
        for (int value : values) {
            if (value == 1) {
                current++;
                best = Math.max(best, current);
            } else {
                current = 0;
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "union-of-two-sorted-arrays": `## Problem statement

Given two sorted integer arrays, return all values in their sorted union with duplicates removed.

## Example

\`[1, 2, 2, 5]\` and \`[2, 3, 5]\` produce \`[1, 2, 3, 5]\`.

## Brute-force approach: concatenate, sort, and compact

Copy both arrays into one array, sort it, and keep only values different from the last output value.

~~~java
import java.util.Arrays;

public class Solution {
    public static int[] unionBruteForce(int[] a, int[] b) {
        int[] all = new int[a.length + b.length];
        System.arraycopy(a, 0, all, 0, a.length);
        System.arraycopy(b, 0, all, a.length, b.length);
        Arrays.sort(all);
        int size = 0;
        for (int value : all) {
            if (size == 0 || all[size - 1] != value) all[size++] = value;
        }
        return Arrays.copyOf(all, size);
    }
}
~~~

- **Time:** O((n + m) log(n + m))
- **Extra space:** O(n + m)

## Optimized approach: merge with two pointers

The inputs are already sorted. Advance the pointer holding the smaller value, skip duplicates, and append each next distinct value.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static int[] union(int[] a, int[] b) {
        List<Integer> result = new ArrayList<>();
        int i = 0, j = 0;
        while (i < a.length || j < b.length) {
            int value;
            if (j == b.length || (i < a.length && a[i] <= b[j])) value = a[i++];
            else value = b[j++];
            if (result.isEmpty() || result.get(result.size() - 1) != value) result.add(value);
        }
        return result.stream().mapToInt(Integer::intValue).toArray();
    }
}
~~~

- **Time:** O(n + m)
- **Extra space:** O(u) for u distinct output values`,

    "intersection-of-two-arrays": `## Problem statement

Return distinct values that appear in both arrays. This version does not require sorted inputs; output order follows the first array.

## Example

\`[4, 2, 4, 1]\` and \`[2, 2, 4]\` produce \`[4, 2]\`.

## Brute-force approach: compare each pair

For each value in the first array, search the second array, and avoid adding the same result twice.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> intersectionBruteForce(int[] a, int[] b) {
        List<Integer> result = new ArrayList<>();
        for (int value : a) {
            boolean inB = false, alreadyAdded = false;
            for (int other : b) if (other == value) inB = true;
            for (int added : result) if (added == value) alreadyAdded = true;
            if (inB && !alreadyAdded) result.add(value);
        }
        return result;
    }
}
~~~

- **Time:** O(nm + u²)
- **Extra space:** O(u) for the result

## Optimized approach: hash membership

Put values from the second array into a set. Scan the first array and add a value once when it exists in the set.

~~~java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {
    public static List<Integer> intersection(int[] a, int[] b) {
        Set<Integer> inB = new HashSet<>();
        for (int value : b) inB.add(value);
        Set<Integer> added = new HashSet<>();
        List<Integer> result = new ArrayList<>();
        for (int value : a) {
            if (inB.contains(value) && added.add(value)) result.add(value);
        }
        return result;
    }
}
~~~

- **Time:** O(n + m) expected
- **Extra space:** O(m + u)`,

    "merge-two-sorted-arrays": `## Problem statement

Merge two arrays sorted in non-decreasing order into a new sorted array. Preserve all duplicate values.

## Example

\`[1, 2, 4]\` and \`[1, 3, 5]\` produce \`[1, 1, 2, 3, 4, 5]\`.

## Brute-force approach: concatenate and sort

Copy both inputs into one array and sort it.

~~~java
import java.util.Arrays;

public class Solution {
    public static int[] mergeBruteForce(int[] a, int[] b) {
        int[] result = new int[a.length + b.length];
        System.arraycopy(a, 0, result, 0, a.length);
        System.arraycopy(b, 0, result, a.length, b.length);
        Arrays.sort(result);
        return result;
    }
}
~~~

- **Time:** O((n + m) log(n + m))
- **Extra space:** O(n + m)

## Optimized approach: merge pointers

Because both inputs are sorted, repeatedly append the smaller next value, then append whichever array remains.

~~~java
public class Solution {
    public static int[] merge(int[] a, int[] b) {
        int[] result = new int[a.length + b.length];
        int i = 0, j = 0, write = 0;
        while (i < a.length && j < b.length) {
            result[write++] = a[i] <= b[j] ? a[i++] : b[j++];
        }
        while (i < a.length) result[write++] = a[i++];
        while (j < b.length) result[write++] = b[j++];
        return result;
    }
}
~~~

- **Time:** O(n + m)
- **Extra space:** O(n + m) for the returned array`,

    "alternating-positive-negative-array": `## Problem statement

Rearrange the array so non-negative and negative values alternate, beginning with a non-negative value. Preserve relative order within each sign group where possible. Append any unpaired values at the end. Zero is non-negative.

## Example

\`[3, -2, 5, -7, 8]\` becomes \`[3, -2, 5, -7, 8]\`.

## Brute-force approach: partition into ordered lists

Collect positive and negative values separately, interleave pairs beginning with a positive, then append the remaining values.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static int[] alternateBruteForce(int[] values) {
        List<Integer> positive = new ArrayList<>(), negative = new ArrayList<>();
        for (int value : values) (value >= 0 ? positive : negative).add(value);
        int[] result = new int[values.length];
        int write = 0, pairs = Math.min(positive.size(), negative.size());
        for (int i = 0; i < pairs; i++) {
            result[write++] = positive.get(i);
            result[write++] = negative.get(i);
        }
        for (int i = pairs; i < positive.size(); i++) result[write++] = positive.get(i);
        for (int i = pairs; i < negative.size(); i++) result[write++] = negative.get(i);
        return result;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: place values at alternating indices

When positives and negatives are balanced, store positive values at even indices and negatives at odd indices in a result array.

~~~java
public class Solution {
    public static int[] alternate(int[] values) {
        int[] result = new int[values.length];
        int positive = 0, negative = 1;
        for (int value : values) {
            if (value >= 0 && positive < values.length) {
                result[positive] = value;
                positive += 2;
            } else if (value <= 0 && negative < values.length) {
                result[negative] = value;
                negative += 2;
            } else {
                int index = positive < values.length ? positive : negative;
                result[index] = value;
                if (index == positive) positive += 2;
                else negative += 2;
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n) for the result

The second method is most direct when the counts differ by at most one; the list-based method is safer when arbitrary counts must be preserved and extras appended.`,

    "sort-zero-one-two": `## Problem statement

Sort an array containing only 0, 1, and 2 in non-decreasing order, without comparison sorting.

## Example

\`[2, 0, 2, 1, 1, 0]\` becomes \`[0, 0, 1, 1, 2, 2]\`.

## Brute-force approach: count each value

Count zeros, ones, and twos, then overwrite the array in order.

~~~java
public class Solution {
    public static void sortColorsBruteForce(int[] values) {
        int[] count = new int[3];
        for (int value : values) {
            if (value < 0 || value > 2) throw new IllegalArgumentException("Only 0, 1, and 2 are allowed");
            count[value]++;
        }
        int index = 0;
        for (int color = 0; color <= 2; color++) {
            for (int i = 0; i < count[color]; i++) values[index++] = color;
        }
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1), since the count array has fixed size

## Optimized approach: Dutch National Flag

Maintain regions for zeros, ones, unknowns, and twos. The middle pointer advances only when the current value is placed.

~~~java
public class Solution {
    public static void sortColors(int[] values) {
        int low = 0, middle = 0, high = values.length - 1;
        while (middle <= high) {
            if (values[middle] == 0) {
                swap(values, low++, middle++);
            } else if (values[middle] == 1) {
                middle++;
            } else if (values[middle] == 2) {
                swap(values, middle, high--);
            } else {
                throw new IllegalArgumentException("Only 0, 1, and 2 are allowed");
            }
        }
    }

    private static void swap(int[] a, int i, int j) {
        int temporary = a[i]; a[i] = a[j]; a[j] = temporary;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

This solution is one pass; values swapped in from the right must still be examined.`,

    "next-permutation": `## Problem statement

Rearrange the array into the next lexicographically greater permutation. If none exists, rearrange it into ascending order. Modify in place.

## Example

\`[1, 2, 3]\` becomes \`[1, 3, 2]\`; \`[3, 2, 1]\` becomes \`[1, 2, 3]\`.

## Brute-force approach: generate permutations

Generate every permutation, sort them lexicographically, and choose the next one after the input. This is practical only for tiny arrays because the number of permutations is factorial.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static int[] nextPermutationBruteForce(int[] values) {
        int[] original = values.clone();
        List<int[]> permutations = new ArrayList<>();
        generate(values, 0, permutations);
        int[] best = null;
        for (int[] candidate : permutations) {
            if (compare(candidate, original) > 0
                    && (best == null || compare(candidate, best) < 0)) best = candidate;
        }
        if (best == null) {
            java.util.Arrays.sort(values);
        } else {
            System.arraycopy(best, 0, values, 0, values.length);
        }
        return values;
    }

    private static void generate(int[] a, int index, List<int[]> result) {
        if (index == a.length) {
            result.add(a.clone());
            return;
        }
        for (int i = index; i < a.length; i++) {
            swap(a, index, i);
            generate(a, index + 1, result);
            swap(a, index, i);
        }
    }

    private static int compare(int[] a, int[] b) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] != b[i]) return Integer.compare(a[i], b[i]);
        }
        return 0;
    }

    private static void reverse(int[] a, int left, int right) {
        while (left < right) swap(a, left++, right--);
    }

    private static void swap(int[] a, int i, int j) {
        int temporary = a[i]; a[i] = a[j]; a[j] = temporary;
    }
}
~~~

- **Time:** O(n · n!) for full enumeration
- **Extra space:** O(n · n!) to store all permutations

## Optimized approach: pivot and successor

Find the rightmost ascent, swap its left value with the smallest greater value to its right, then reverse the suffix.

~~~java
public class Solution {
    public static void nextPermutation(int[] a) {
        int pivot = a.length - 2;
        while (pivot >= 0 && a[pivot] >= a[pivot + 1]) pivot--;
        if (pivot >= 0) {
            int successor = a.length - 1;
            while (a[successor] <= a[pivot]) successor--;
            swap(a, pivot, successor);
        }
        reverse(a, pivot + 1, a.length - 1);
    }

    private static void reverse(int[] a, int left, int right) {
        while (left < right) swap(a, left++, right--);
    }

    private static void swap(int[] a, int i, int j) {
        int temporary = a[i]; a[i] = a[j]; a[j] = temporary;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

The brute-force implementation is intended only for tiny arrays because it materializes every permutation; the optimized method is the practical solution.`,

    "previous-permutation": `## Problem statement

Rearrange the array into the previous lexicographically smaller permutation. If no smaller permutation exists, rearrange it into descending order. Modify in place.

## Example

\`[1, 3, 2]\` becomes \`[1, 2, 3]\`; \`[1, 2, 3]\` becomes \`[3, 2, 1]\`.

## Brute-force approach: enumerate and compare

Generate every permutation and choose the greatest one that is lexicographically smaller than the input. This takes factorial time and is useful only for very small arrays.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static int[] previousPermutationBruteForce(int[] values) {
        int[] original = values.clone();
        List<int[]> permutations = new ArrayList<>();
        generate(values, 0, permutations);
        int[] best = null;
        for (int[] candidate : permutations) {
            if (compare(candidate, original) < 0
                    && (best == null || compare(candidate, best) > 0)) best = candidate;
        }
        if (best == null) {
            java.util.Arrays.sort(values);
            reverse(values, 0, values.length - 1);
        } else {
            System.arraycopy(best, 0, values, 0, values.length);
        }
        return values;
    }

    private static void generate(int[] a, int index, List<int[]> result) {
        if (index == a.length) {
            result.add(a.clone());
            return;
        }
        for (int i = index; i < a.length; i++) {
            swap(a, index, i);
            generate(a, index + 1, result);
            swap(a, index, i);
        }
    }

    private static int compare(int[] a, int[] b) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] != b[i]) return Integer.compare(a[i], b[i]);
        }
        return 0;
    }

    private static void reverse(int[] a, int left, int right) {
        while (left < right) swap(a, left++, right--);
    }

    private static void swap(int[] a, int i, int j) {
        int temporary = a[i]; a[i] = a[j]; a[j] = temporary;
    }
}
~~~

- **Time:** O(n · n!) for full enumeration
- **Extra space:** O(n · n!) if all permutations are stored

## Optimized approach: rightmost descent

Find the rightmost position where the value is greater than its successor. Swap it with the largest smaller value in the suffix, then reverse the suffix to make it descending.

~~~java
public class Solution {
    public static void previousPermutation(int[] a) {
        int pivot = a.length - 2;
        while (pivot >= 0 && a[pivot] <= a[pivot + 1]) pivot--;
        if (pivot >= 0) {
            int predecessor = a.length - 1;
            while (a[predecessor] >= a[pivot]) predecessor--;
            swap(a, pivot, predecessor);
        }
        reverse(a, pivot + 1, a.length - 1);
    }

    private static void reverse(int[] a, int left, int right) {
        while (left < right) swap(a, left++, right--);
    }

    private static void swap(int[] a, int i, int j) {
        int temporary = a[i]; a[i] = a[j]; a[j] = temporary;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "longest-consecutive-sequence": `## Problem statement

Return the length of the longest run of consecutive integer values in an unsorted array. The values do not need to be adjacent in the input.

## Example

\`[100, 4, 200, 1, 3, 2]\` returns 4 for the sequence 1, 2, 3, 4.

## Brute-force approach: extend every start

For each value, repeatedly search the array for the next consecutive value.

~~~java
public class Solution {
    public static int longestConsecutiveBruteForce(int[] values) {
        int best = 0;
        for (int start : values) {
            int length = 1;
            long next = (long) start + 1;
            while (next <= Integer.MAX_VALUE && contains(values, (int) next)) {
                length++;
                next++;
            }
            best = Math.max(best, length);
        }
        return best;
    }

    private static boolean contains(int[] values, int target) {
        for (int value : values) if (value == target) return true;
        return false;
    }
}
~~~

- **Time:** O(n²) worst case
- **Extra space:** O(1)

## Optimized approach: start only at sequence beginnings

Put values in a set. Extend a run only when its predecessor is absent, so each consecutive value is visited once on average.

~~~java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static int longestConsecutive(int[] values) {
        Set<Integer> numbers = new HashSet<>();
        for (int value : values) numbers.add(value);
        int best = 0;
        for (int value : numbers) {
            if (value == Integer.MIN_VALUE || !numbers.contains(value - 1)) {
                int length = 1;
                long next = (long) value + 1;
                while (next <= Integer.MAX_VALUE && numbers.contains((int) next)) {
                    length++;
                    next++;
                }
                best = Math.max(best, length);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)`,

    "maximum-product-of-two-elements": `## Problem statement

Given at least two integers, return the maximum product of values at two distinct positions. The values may be negative.

## Example

\`[-10, -3, 2, 4]\` returns 30 from \`-10 * -3\`.

## Brute-force approach: try every pair

Use \`long\` for products so multiplying two int values does not overflow.

~~~java
public class Solution {
    public static long maxProductBruteForce(int[] values) {
        if (values.length < 2) throw new IllegalArgumentException("At least two values are required");
        long best = Long.MIN_VALUE;
        for (int i = 0; i < values.length; i++) {
            for (int j = i + 1; j < values.length; j++) {
                best = Math.max(best, (long) values[i] * values[j]);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: track two smallest and two largest

The maximum product is either the two largest values or the two most negative values. Track both pairs in one pass.

~~~java
public class Solution {
    public static long maxProduct(int[] values) {
        if (values.length < 2) throw new IllegalArgumentException("At least two values are required");
        long largest = Long.MIN_VALUE, secondLargest = Long.MIN_VALUE;
        long smallest = Long.MAX_VALUE, secondSmallest = Long.MAX_VALUE;
        for (int value : values) {
            if (value > largest) { secondLargest = largest; largest = value; }
            else if (value > secondLargest) secondLargest = value;
            if (value < smallest) { secondSmallest = smallest; smallest = value; }
            else if (value < secondSmallest) secondSmallest = value;
        }
        return Math.max(largest * secondLargest, smallest * secondSmallest);
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "product-of-array-except-self": `## Problem statement

For each index, return the product of every array value except the value at that index. Do not use division. Assume each result fits in a Java \`long\`.

## Example

\`[1, 2, 3, 4]\` returns \`[24, 12, 8, 6]\`.

## Brute-force approach: multiply all other positions

For every output position, multiply all input values except the one at that index.

~~~java
public class Solution {
    public static long[] productExceptSelfBruteForce(int[] values) {
        long[] result = new long[values.length];
        for (int i = 0; i < values.length; i++) {
            long product = 1;
            for (int j = 0; j < values.length; j++) {
                if (i != j) product *= values[j];
            }
            result[i] = product;
        }
        return result;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1) auxiliary, excluding output

## Optimized approach: prefix and suffix products

Store the product of values to the left of each index, then multiply by a running product from the right. No division is used.

~~~java
public class Solution {
    public static long[] productExceptSelf(int[] values) {
        long[] result = new long[values.length];
        long prefix = 1;
        for (int i = 0; i < values.length; i++) {
            result[i] = prefix;
            prefix *= values[i];
        }
        long suffix = 1;
        for (int i = values.length - 1; i >= 0; i--) {
            result[i] *= suffix;
            suffix *= values[i];
        }
        return result;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1) auxiliary, excluding the output array

Zeros work naturally: one zero leaves only that position with a non-zero product; two or more zeros make every result zero.`,
};
