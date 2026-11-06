export const prefixSumsContent = {
    "ps-build-prefix-array": `## Problem statement

Build an array where each position contains the sum of input values from index 0 through that position. Use \`long\` sums.

## Example

\`[2, -1, 4]\` produces \`[2, 1, 5]\`.

## Brute-force approach: sum each prefix separately

For every index, add all values from the beginning through that index.

~~~java
public class Solution {
    public static long[] prefixBruteForce(int[] values) {
        long[] prefix = new long[values.length];
        for (int i = 0; i < values.length; i++) {
            for (int j = 0; j <= i; j++) prefix[i] += values[j];
        }
        return prefix;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(n) for the returned array

## Optimized approach: running sum

Accumulate each value once; the running total is the prefix value at that position.

~~~java
public class Solution {
    public static long[] prefixSums(int[] values) {
        long[] prefix = new long[values.length];
        long sum = 0;
        for (int i = 0; i < values.length; i++) {
            sum += values[i];
            prefix[i] = sum;
        }
        return prefix;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n) for the result`,

    "ps-range-sum-queries": `## Problem statement

For each inclusive query \`[left, right]\`, return the sum of that range. Query indices are valid and zero-based.

## Example

Array \`[2, -1, 4, 3]\`, queries \`[0, 2]\` and \`[1, 3]\` produce \`[5, 6]\`.

## Brute-force approach: scan each query

Add the requested values separately for every query.

~~~java
public class Solution {
    public static long[] rangeSumsBruteForce(int[] values, int[][] queries) {
        long[] result = new long[queries.length];
        for (int q = 0; q < queries.length; q++) {
            for (int i = queries[q][0]; i <= queries[q][1]; i++) result[q] += values[i];
        }
        return result;
    }
}
~~~

- **Time:** O(qn)
- **Extra space:** O(q) for results

## Optimized approach: prefix sums

Build a prefix array with a leading zero. A range sum is \`prefix[right + 1] - prefix[left]\`.

~~~java
public class Solution {
    public static long[] rangeSums(int[] values, int[][] queries) {
        long[] prefix = new long[values.length + 1];
        for (int i = 0; i < values.length; i++) prefix[i + 1] = prefix[i] + values[i];
        long[] result = new long[queries.length];
        for (int q = 0; q < queries.length; q++) {
            int left = queries[q][0], right = queries[q][1];
            result[q] = prefix[right + 1] - prefix[left];
        }
        return result;
    }
}
~~~

- **Time:** O(n + q)
- **Extra space:** O(n + q), including prefix and results`,

    "ps-pivot-index": `## Problem statement

Return an index where the sum of values strictly to its left equals the sum strictly to its right. Return -1 if none exists.

## Example

\`[1, 7, 3, 6, 5, 6]\` returns index 3.

## Brute-force approach: sum both sides

For each possible pivot, calculate the left and right totals.

~~~java
public class Solution {
    public static int pivotBruteForce(int[] values) {
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

## Optimized approach: total sum and running left sum

At index \`i\`, the right sum is \`total - left - values[i]\`. Scan once and return the first match.

~~~java
public class Solution {
    public static int pivotIndex(int[] values) {
        long total = 0, left = 0;
        for (int value : values) total += value;
        for (int i = 0; i < values.length; i++) {
            if (left == total - left - values[i]) return i;
            left += values[i];
        }
        return -1;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "ps-equilibrium-point": `## Problem statement

Return the first array index whose sum before it equals the sum after it, or -1 if no such index exists. The pivot value is excluded from both sums.

## Example

\`[1, 3, 5, 2, 2]\` returns index 2 because both sides sum to 4.

## Brute-force approach: recalculate side sums

Check each index by summing the values on both sides.

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

## Optimized approach: track total and left sum

Subtract the current value and left sum from the total to obtain the right sum.

~~~java
public class Solution {
    public static int equilibriumPoint(int[] values) {
        long total = 0, left = 0;
        for (int value : values) total += value;
        for (int i = 0; i < values.length; i++) {
            if (left == total - left - values[i]) return i;
            left += values[i];
        }
        return -1;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "ps-count-target-sum": `## Problem statement

Count contiguous subarrays whose sum equals a target. Negative and zero values are allowed.

## Example

\`[1, 2, 1, 2]\`, target \`3\` returns 3.

## Brute-force approach: enumerate subarrays

For each starting index, extend the range and update a running sum.

~~~java
public class Solution {
    public static long countSubarraysBruteForce(int[] values, int target) {
        long count = 0;
        for (int left = 0; left < values.length; left++) {
            long sum = 0;
            for (int right = left; right < values.length; right++) {
                sum += values[right];
                if (sum == target) count++;
            }
        }
        return count;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: prefix sum frequencies

At each prefix sum, count earlier prefixes equal to \`prefix - target\`.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static long countSubarrays(int[] values, int target) {
        Map<Long, Long> counts = new HashMap<>();
        counts.put(0L, 1L);
        long prefix = 0, result = 0;
        for (int value : values) {
            prefix += value;
            result += counts.getOrDefault(prefix - target, 0L);
            counts.merge(prefix, 1L, Long::sum);
        }
        return result;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)`,

    "ps-longest-target-sum": `## Problem statement

Return the longest contiguous subarray whose sum equals the target. Return zero if no such subarray exists.

## Example

\`[1, -1, 5, -2, 3]\`, target \`3\` returns 4 for \`[1, -1, 5, -2]\`.

## Brute-force approach: enumerate and sum

Try every start and end pair, tracking its sum.

~~~java
public class Solution {
    public static int longestTargetBruteForce(int[] values, int target) {
        int best = 0;
        for (int left = 0; left < values.length; left++) {
            long sum = 0;
            for (int right = left; right < values.length; right++) {
                sum += values[right];
                if (sum == target) best = Math.max(best, right - left + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: earliest prefix index

For current prefix \`p\`, a prior prefix \`p - target\` identifies a target-sum subarray. Keep the earliest index for each prefix to maximize its length.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int longestTargetSum(int[] values, int target) {
        Map<Long, Integer> first = new HashMap<>();
        first.put(0L, -1);
        long prefix = 0;
        int best = 0;
        for (int i = 0; i < values.length; i++) {
            prefix += values[i];
            Integer start = first.get(prefix - target);
            if (start != null) best = Math.max(best, i - start);
            first.putIfAbsent(prefix, i);
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)`,

    "ps-longest-zero-sum": `## Problem statement

Return the length of the longest contiguous subarray whose sum is zero.

## Example

\`[1, 2, -3, 3, -1, 2]\` returns 3 for \`[1, 2, -3]\`.

## Brute-force approach: test every subarray

Maintain a running sum for each starting index and retain the longest zero-sum range.

~~~java
public class Solution {
    public static int longestZeroSumBruteForce(int[] values) {
        int best = 0;
        for (int left = 0; left < values.length; left++) {
            long sum = 0;
            for (int right = left; right < values.length; right++) {
                sum += values[right];
                if (sum == 0) best = Math.max(best, right - left + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: store first prefix occurrence

When a prefix sum repeats, the values between its first and current occurrence sum to zero.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int longestZeroSum(int[] values) {
        Map<Long, Integer> first = new HashMap<>();
        first.put(0L, -1);
        long prefix = 0;
        int best = 0;
        for (int i = 0; i < values.length; i++) {
            prefix += values[i];
            Integer start = first.putIfAbsent(prefix, i);
            if (start != null) best = Math.max(best, i - start);
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)`,

    "ps-equal-zero-one-subarrays": `## Problem statement

Count contiguous subarrays of a binary array containing equal numbers of zeros and ones.

## Example

\`[0, 1, 0]\` returns 2.

## Brute-force approach: count each range

For each subarray, track the balance between ones and zeros; a zero balance contributes one valid subarray.

~~~java
public class Solution {
    public static long countBalancedBruteForce(int[] values) {
        long answer = 0;
        for (int left = 0; left < values.length; left++) {
            int balance = 0;
            for (int right = left; right < values.length; right++) {
                balance += values[right] == 1 ? 1 : -1;
                if (balance == 0) answer++;
            }
        }
        return answer;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: count repeated prefix balances

Replace zero by -1 and one by +1. Every pair of equal prefix balances bounds a balanced subarray.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static long countBalanced(int[] values) {
        Map<Integer, Long> count = new HashMap<>();
        count.put(0, 1L);
        int balance = 0;
        long answer = 0;
        for (int value : values) {
            balance += value == 1 ? 1 : -1;
            answer += count.getOrDefault(balance, 0L);
            count.merge(balance, 1L, Long::sum);
        }
        return answer;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)`,

    "ps-maximum-circular-subarray": `## Problem statement

Return the maximum sum of a non-empty subarray in a circular array. A subarray may wrap from the end to the beginning.

## Example

\`[5, -3, 5]\` returns 10 by taking the final and first 5.

## Brute-force approach: test each circular start

Try every start and extend at most n positions, wrapping indices with modulo.

~~~java
public class Solution {
    public static long maxCircularBruteForce(int[] values) {
        if (values.length == 0) throw new IllegalArgumentException("Array must not be empty");
        long best = Long.MIN_VALUE;
        for (int start = 0; start < values.length; start++) {
            long sum = 0;
            for (int length = 1; length <= values.length; length++) {
                sum += values[(start + length - 1) % values.length];
                best = Math.max(best, sum);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: Kadane for max and min

The best wrapping sum is total sum minus the minimum subarray. Compare that with the ordinary maximum subarray; if all values are negative, return the ordinary maximum.

~~~java
public class Solution {
    public static long maxCircularSubarray(int[] a) {
        if (a.length == 0) throw new IllegalArgumentException("Array must not be empty");
        long total = 0, maxEnding = a[0], maxSum = a[0], minEnding = a[0], minSum = a[0];
        total = a[0];
        for (int i = 1; i < a.length; i++) {
            long value = a[i];
            total += value;
            maxEnding = Math.max(value, maxEnding + value);
            maxSum = Math.max(maxSum, maxEnding);
            minEnding = Math.min(value, minEnding + value);
            minSum = Math.min(minSum, minEnding);
        }
        return maxSum < 0 ? maxSum : Math.max(maxSum, total - minSum);
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "ps-kadane-maximum-subarray": `## Problem statement

Return the maximum sum of any non-empty contiguous subarray.

## Example

\`[-2, 1, -3, 4, -1, 2, 1, -5, 4]\` returns 6 for \`[4, -1, 2, 1]\`.

## Brute-force approach: inspect all ranges

For every start index, maintain the sum as the end index advances.

~~~java
public class Solution {
    public static long maxSubarrayBruteForce(int[] values) {
        if (values.length == 0) throw new IllegalArgumentException("Array must not be empty");
        long best = Long.MIN_VALUE;
        for (int left = 0; left < values.length; left++) {
            long sum = 0;
            for (int right = left; right < values.length; right++) {
                sum += values[right];
                best = Math.max(best, sum);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: Kadane's algorithm

At each element, either extend the current subarray or start a new one there. Track the best sum seen.

~~~java
public class Solution {
    public static long maxSubarraySum(int[] values) {
        if (values.length == 0) throw new IllegalArgumentException("Array must not be empty");
        long ending = values[0], best = values[0];
        for (int i = 1; i < values.length; i++) {
            ending = Math.max(values[i], ending + values[i]);
            best = Math.max(best, ending);
        }
        return best;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

Initializing from the first value correctly handles arrays containing only negative numbers.`,

    "ps-minimum-length-target-sum": `## Problem statement

Given positive integers and a target, return the shortest contiguous subarray with sum at least the target. Return zero if none exists.

## Example

\`[2, 3, 1, 2, 4, 3]\`, target \`7\` returns 2 for \`[4, 3]\`.

## Brute-force approach: inspect every subarray

Extend each start position and stop when its positive sum first reaches the target.

~~~java
public class Solution {
    public static int minLengthBruteForce(int[] values, int target) {
        int best = Integer.MAX_VALUE;
        for (int left = 0; left < values.length; left++) {
            long sum = 0;
            for (int right = left; right < values.length; right++) {
                sum += values[right];
                if (sum >= target) {
                    best = Math.min(best, right - left + 1);
                    break;
                }
            }
        }
        return best == Integer.MAX_VALUE ? 0 : best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: sliding window

Expand the right edge, then shrink the left edge while the positive window still meets the target.

~~~java
public class Solution {
    public static int minSubArrayLen(int[] values, int target) {
        int left = 0, best = Integer.MAX_VALUE;
        long sum = 0;
        for (int right = 0; right < values.length; right++) {
            if (values[right] <= 0) throw new IllegalArgumentException("Values must be positive");
            sum += values[right];
            while (sum >= target) {
                best = Math.min(best, right - left + 1);
                sum -= values[left++];
            }
        }
        return best == Integer.MAX_VALUE ? 0 : best;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

The sliding-window proof depends on every value being positive.`,

    "ps-product-except-self": `## Problem statement

Return an output array where each position is the product of every input value except the value at that position. Do not use division; assume products fit in \`long\`.

## Example

\`[1, 2, 3, 4]\` returns \`[24, 12, 8, 6]\`.

## Brute-force approach: multiply all other entries

For each output index, scan all input positions except itself.

~~~java
public class Solution {
    public static long[] productBruteForce(int[] values) {
        long[] result = new long[values.length];
        for (int i = 0; i < values.length; i++) {
            long product = 1;
            for (int j = 0; j < values.length; j++) if (i != j) product *= values[j];
            result[i] = product;
        }
        return result;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1) auxiliary, excluding output

## Optimized approach: prefix and suffix products

Write the product to the left of each index, then multiply by a running product from its right.

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
- **Extra space:** O(1) auxiliary, excluding output`,

    "ps-count-divisible-by-k": `## Problem statement

Given an integer array and positive \`k\`, count contiguous subarrays whose sum is divisible by \`k\`.

## Example

\`[4, 5, 0, -2, -3, 1]\`, \`k = 5\` returns 7.

## Brute-force approach: sum all ranges

Use a running sum for each start and test whether its normalized remainder is zero.

~~~java
public class Solution {
    public static long countDivisibleBruteForce(int[] values, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        long count = 0;
        for (int left = 0; left < values.length; left++) {
            long sum = 0;
            for (int right = left; right < values.length; right++) {
                sum += values[right];
                if (Math.floorMod(sum, k) == 0) count++;
            }
        }
        return count;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: count prefix remainders

Equal prefix remainders mean the sum between them is divisible by \`k\`. Use \`floorMod\` to normalize negative sums.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static long countDivisible(int[] values, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        Map<Integer, Long> counts = new HashMap<>();
        counts.put(0, 1L);
        long prefix = 0, answer = 0;
        for (int value : values) {
            prefix += value;
            int remainder = (int) Math.floorMod(prefix, k);
            answer += counts.getOrDefault(remainder, 0L);
            counts.merge(remainder, 1L, Long::sum);
        }
        return answer;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(min(n, k))`,

    "ps-difference-array-updates": `## Problem statement

Start with an array of \`n\` zeroes. Each operation \`[left, right, delta]\` adds \`delta\` to every inclusive index from left through right. Return the final array.

## Example

For \`n = 5\`, operations \`[1, 3, 2]\` and \`[2, 4, 1]\` produce \`[0, 2, 3, 3, 1]\`.

## Brute-force approach: apply each range directly

For each operation, update every covered index.

~~~java
public class Solution {
    public static long[] applyUpdatesBruteForce(int n, int[][] updates) {
        long[] result = new long[n];
        for (int[] update : updates) {
            for (int i = update[0]; i <= update[1]; i++) result[i] += update[2];
        }
        return result;
    }
}
~~~

- **Time:** O(n + qn) for q updates
- **Extra space:** O(n) for the output

## Optimized approach: difference array

Add the delta at the range start and subtract it just after the range end. One prefix pass reconstructs every final value.

~~~java
public class Solution {
    public static long[] applyUpdates(int n, int[][] updates) {
        long[] difference = new long[n + 1];
        for (int[] update : updates) {
            difference[update[0]] += update[2];
            if (update[1] + 1 < n) difference[update[1] + 1] -= update[2];
        }
        long[] result = new long[n];
        long current = 0;
        for (int i = 0; i < n; i++) {
            current += difference[i];
            result[i] = current;
        }
        return result;
    }
}
~~~

- **Time:** O(n + q)
- **Extra space:** O(n), including result and difference arrays`,

    "ps-maximum-interval-coverage": `## Problem statement

Given inclusive integer intervals \`[start, end]\`, return the maximum number of intervals covering any one integer point. Return zero for no intervals.

## Example

\`[[1, 4], [2, 5], [7, 9]]\` returns 2.

## Brute-force approach: count coverage at every interval start

The maximum overlap occurs at some interval start. Count all intervals covering each start point.

~~~java
public class Solution {
    public static int maxCoverageBruteForce(int[][] intervals) {
        int best = 0;
        for (int[] point : intervals) {
            int count = 0;
            for (int[] interval : intervals) {
                if (interval[0] <= point[0] && point[0] <= interval[1]) count++;
            }
            best = Math.max(best, count);
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: sweep-line events

Add one event at each inclusive start and remove coverage at \`end + 1\`. Sort event coordinates and track the running coverage.

~~~java
import java.util.Map;
import java.util.TreeMap;

public class Solution {
    public static int maxCoverage(int[][] intervals) {
        Map<Long, Integer> events = new TreeMap<>();
        for (int[] interval : intervals) {
            events.merge((long) interval[0], 1, Integer::sum);
            events.merge((long) interval[1] + 1, -1, Integer::sum);
        }
        int active = 0, best = 0;
        for (int change : events.values()) {
            active += change;
            best = Math.max(best, active);
        }
        return best;
    }
}
~~~

- **Time:** O(n log n)
- **Extra space:** O(n)

Using \`long\` for \`end + 1\` avoids overflow when an endpoint is \`Integer.MAX_VALUE\`.`,
};
