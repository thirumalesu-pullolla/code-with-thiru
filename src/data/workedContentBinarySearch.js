export const binarySearchContent = {
  "bs-iterative": `## Problem statement

Given a sorted integer array and a target, return its index or -1 when absent.

## Example

\`[-4, 0, 3, 8, 12]\`, target 8 returns 3.

## Brute-force approach: scan the array

\`\`\`java
public class Solution {
    public static int searchBruteForce(int[] values, int target) {
        for (int i = 0; i < values.length; i++) {
            if (values[i] == target) return i;
        }
        return -1;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: iterative binary search

At each step, discard the half that cannot contain the target.

\`\`\`java
public class Solution {
    public static int search(int[] values, int target) {
        int low = 0, high = values.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (values[mid] == target) return mid;
            if (values[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-recursive": `## Problem statement

Given a sorted integer array and a target, return its index using recursive binary search, or -1 if absent.

## Example

\`[1, 4, 7, 9]\`, target 7 returns 2.

## Brute-force approach: scan the array

\`\`\`java
public class Solution {
    public static int searchBruteForce(int[] values, int target) {
        for (int i = 0; i < values.length; i++) {
            if (values[i] == target) return i;
        }
        return -1;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: recursive binary search

Each recursive call keeps only the half that can still contain the target.

\`\`\`java
public class Solution {
    public static int search(int[] values, int target) {
        return search(values, target, 0, values.length - 1);
    }

    private static int search(int[] values, int target, int low, int high) {
        if (low > high) return -1;
        int mid = low + (high - low) / 2;
        if (values[mid] == target) return mid;
        return values[mid] < target
                ? search(values, target, mid + 1, high)
                : search(values, target, low, mid - 1);
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(log n) for the call stack`,

  "bs-first-occurrence": `## Problem statement

Given a sorted array that may contain duplicates, return the first index of target, or -1 if it is absent.

## Example

\`[1, 2, 2, 2, 5]\`, target 2 returns 1.

## Brute-force approach: scan from the start

\`\`\`java
public class Solution {
    public static int firstBruteForce(int[] values, int target) {
        for (int i = 0; i < values.length; i++) {
            if (values[i] == target) return i;
        }
        return -1;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: lower bound

Find the first position whose value is at least target, then verify equality.

\`\`\`java
public class Solution {
    public static int firstOccurrence(int[] values, int target) {
        int low = 0, high = values.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (values[mid] < target) low = mid + 1;
            else high = mid;
        }
        return low < values.length && values[low] == target ? low : -1;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-last-occurrence": `## Problem statement

Given a sorted array that may contain duplicates, return the last index of target, or -1 if it is absent.

## Example

\`[1, 2, 2, 2, 5]\`, target 2 returns 3.

## Brute-force approach: scan the array

\`\`\`java
public class Solution {
    public static int lastBruteForce(int[] values, int target) {
        int result = -1;
        for (int i = 0; i < values.length; i++) {
            if (values[i] == target) result = i;
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: upper bound

Find the first value greater than target; the previous index is the last match.

\`\`\`java
public class Solution {
    public static int lastOccurrence(int[] values, int target) {
        int low = 0, high = values.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (values[mid] <= target) low = mid + 1;
            else high = mid;
        }
        int candidate = low - 1;
        return candidate >= 0 && values[candidate] == target ? candidate : -1;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-count-occurrences": `## Problem statement

Count the occurrences of target in a sorted array.

## Example

\`[1, 2, 2, 2, 5]\`, target 2 returns 3.

## Brute-force approach: count matches

\`\`\`java
public class Solution {
    public static int countBruteForce(int[] values, int target) {
        int count = 0;
        for (int value : values) if (value == target) count++;
        return count;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: subtract lower from upper bound

The range between the first value at least target and first value greater than target contains all matches.

\`\`\`java
public class Solution {
    public static int countOccurrences(int[] values, int target) {
        return bound(values, target, false) - bound(values, target, true);
    }

    private static int bound(int[] values, int target, boolean strict) {
        int low = 0, high = values.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (values[mid] < target || (strict && values[mid] == target)) low = mid + 1;
            else high = mid;
        }
        return low;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-lower-upper-bound": `## Problem statement

For a sorted array, return the lower bound (first index with value at least target) and upper bound (first index with value greater than target). Either index may equal the array length.

## Example

\`[1, 2, 2, 4]\`, target 2 returns lower bound 1 and upper bound 3.

## Brute-force approach: scan for both positions

\`\`\`java
public class Solution {
    public static int[] boundsBruteForce(int[] values, int target) {
        int lower = values.length, upper = values.length;
        for (int i = 0; i < values.length; i++) {
            if (lower == values.length && values[i] >= target) lower = i;
            if (values[i] > target) { upper = i; break; }
        }
        return new int[] {lower, upper};
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: two binary searches

Use the same half-open search interval, changing only the comparison for each bound.

\`\`\`java
public class Solution {
    public static int[] bounds(int[] values, int target) {
        return new int[] {bound(values, target, false), bound(values, target, true)};
    }

    private static int bound(int[] values, int target, boolean strict) {
        int low = 0, high = values.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (values[mid] < target || (strict && values[mid] == target)) low = mid + 1;
            else high = mid;
        }
        return low;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-insertion-position": `## Problem statement

Return the target's index in a sorted array, or the index where it should be inserted to preserve order.

## Example

\`[1, 3, 5, 6]\`, target 2 returns 1.

## Brute-force approach: find the first value not less than target

\`\`\`java
public class Solution {
    public static int insertionBruteForce(int[] values, int target) {
        for (int i = 0; i < values.length; i++) {
            if (values[i] >= target) return i;
        }
        return values.length;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: lower bound

The lower-bound index is exactly where target belongs.

\`\`\`java
public class Solution {
    public static int searchInsert(int[] values, int target) {
        int low = 0, high = values.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (values[mid] < target) low = mid + 1;
            else high = mid;
        }
        return low;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-floor-ceiling": `## Problem statement

In a sorted array, find the greatest value at most target (floor) and the smallest value at least target (ceiling). Return null for a missing side.

## Example

\`[1, 3, 5, 7]\`, target 4 returns floor 3 and ceiling 5.

## Brute-force approach: inspect all values

\`\`\`java
public class Solution {
    public static Integer[] floorCeilingBruteForce(int[] values, int target) {
        Integer floor = null, ceiling = null;
        for (int value : values) {
            if (value <= target) floor = value;
            if (value >= target && ceiling == null) ceiling = value;
        }
        return new Integer[] {floor, ceiling};
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: find the insertion boundary

The first value at least target is the ceiling; the preceding value is the floor. An exact match is both.

\`\`\`java
public class Solution {
    public static Integer[] floorCeiling(int[] values, int target) {
        int low = 0, high = values.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (values[mid] < target) low = mid + 1;
            else high = mid;
        }
        Integer ceiling = low < values.length ? values[low] : null;
        Integer floor = low < values.length && values[low] == target
                ? values[low] : (low > 0 ? values[low - 1] : null);
        return new Integer[] {floor, ceiling};
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-first-last-position": `## Problem statement

Return the first and last indices of target in a sorted array, or \`[-1, -1]\` if absent.

## Example

\`[1, 2, 2, 2, 5]\`, target 2 returns \`[1, 3]\`.

## Brute-force approach: scan the array

\`\`\`java
public class Solution {
    public static int[] rangeBruteForce(int[] values, int target) {
        int first = -1, last = -1;
        for (int i = 0; i < values.length; i++) {
            if (values[i] == target) {
                if (first == -1) first = i;
                last = i;
            }
        }
        return new int[] {first, last};
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: lower and upper bounds

If lower bound does not contain target, it is absent; otherwise the prior index to upper bound is its last position.

\`\`\`java
public class Solution {
    public static int[] searchRange(int[] values, int target) {
        int first = bound(values, target, false);
        if (first == values.length || values[first] != target) return new int[] {-1, -1};
        return new int[] {first, bound(values, target, true) - 1};
    }

    private static int bound(int[] values, int target, boolean strict) {
        int low = 0, high = values.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (values[mid] < target || (strict && values[mid] == target)) low = mid + 1;
            else high = mid;
        }
        return low;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-search-rotated": `## Problem statement

Search a target in a rotated sorted array of distinct values. Return its index or -1.

## Example

\`[4, 5, 6, 7, 0, 1, 2]\`, target 0 returns 4.

## Brute-force approach: scan the array

\`\`\`java
public class Solution {
    public static int searchBruteForce(int[] values, int target) {
        for (int i = 0; i < values.length; i++) {
            if (values[i] == target) return i;
        }
        return -1;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: find the sorted half

At least one half is sorted. Check whether target lies in that half and discard the other.

\`\`\`java
public class Solution {
    public static int search(int[] values, int target) {
        int low = 0, high = values.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (values[mid] == target) return mid;
            if (values[low] <= values[mid]) {
                if (values[low] <= target && target < values[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (values[mid] < target && target <= values[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return -1;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-minimum-rotated": `## Problem statement

Find the minimum value in a rotated strictly increasing array. The array is non-empty.

## Example

\`[4, 5, 6, 1, 2, 3]\` returns 1.

## Brute-force approach: find the drop

\`\`\`java
public class Solution {
    public static int minimumBruteForce(int[] values) {
        int minimum = values[0];
        for (int value : values) minimum = Math.min(minimum, value);
        return minimum;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: compare with the right endpoint

The minimum lies left of mid when mid is greater than the rightmost value; otherwise it is at mid or to its left.

\`\`\`java
public class Solution {
    public static int findMinimum(int[] values) {
        if (values.length == 0) throw new IllegalArgumentException("Array must not be empty");
        int low = 0, high = values.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (values[mid] > values[high]) low = mid + 1;
            else high = mid;
        }
        return values[low];
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-rotation-count": `## Problem statement

For a rotated strictly increasing array, return the number of left rotations. An unrotated array has count zero.

## Example

\`[4, 5, 1, 2, 3]\` returns 2.

## Brute-force approach: locate the minimum

\`\`\`java
public class Solution {
    public static int rotationsBruteForce(int[] values) {
        int minimumIndex = 0;
        for (int i = 1; i < values.length; i++) {
            if (values[i] < values[minimumIndex]) minimumIndex = i;
        }
        return minimumIndex;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: binary-search the minimum index

For distinct values, the index of the minimum equals the number of left rotations.

\`\`\`java
public class Solution {
    public static int rotationCount(int[] values) {
        if (values.length == 0) return 0;
        int low = 0, high = values.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (values[mid] > values[high]) low = mid + 1;
            else high = mid;
        }
        return low;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-nearly-sorted": `## Problem statement

In an array where each value is at most one position from its sorted location, return the target index or -1.

## Example

\`[10, 3, 40, 20, 50, 80, 70]\`, target 40 returns 2.

## Brute-force approach: scan the array

\`\`\`java
public class Solution {
    public static int searchBruteForce(int[] values, int target) {
        for (int i = 0; i < values.length; i++) {
            if (values[i] == target) return i;
        }
        return -1;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: check adjacent positions

The target can only be at mid or one position to either side of its expected sorted location.

\`\`\`java
public class Solution {
    public static int searchNearlySorted(int[] values, int target) {
        int low = 0, high = values.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (values[mid] == target) return mid;
            if (mid > low && values[mid - 1] == target) return mid - 1;
            if (mid < high && values[mid + 1] == target) return mid + 1;
            if (values[mid] < target) low = mid + 2;
            else high = mid - 2;
        }
        return -1;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-peak-element": `## Problem statement

Return an index of a peak: its value is greater than its immediate neighbors. Treat missing neighbors as negative infinity. Assume adjacent values differ.

## Example

\`[1, 2, 3, 1]\` returns index 2.

## Brute-force approach: inspect neighbors

\`\`\`java
public class Solution {
    public static int peakBruteForce(int[] values) {
        for (int i = 0; i < values.length; i++) {
            boolean leftOk = i == 0 || values[i] > values[i - 1];
            boolean rightOk = i == values.length - 1 || values[i] > values[i + 1];
            if (leftOk && rightOk) return i;
        }
        return -1;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: follow the rising slope

If the next value is larger, a peak exists to the right; otherwise a peak is at mid or to its left.

\`\`\`java
public class Solution {
    public static int findPeakElement(int[] values) {
        if (values.length == 0) return -1;
        int low = 0, high = values.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (values[mid] < values[mid + 1]) low = mid + 1;
            else high = mid;
        }
        return low;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-peak-2d-matrix": `## Problem statement

Find a matrix cell strictly greater than its horizontal and vertical neighbors. A missing neighbor at an edge is ignored. Assume a rectangular matrix with distinct values.

## Example

\`[[1, 4, 3], [2, 9, 5]]\` returns coordinates \`[1, 1]\`.

## Brute-force approach: check each cell

\`\`\`java
public class Solution {
    public static int[] peakBruteForce(int[][] a) {
        int rows = a.length, cols = a[0].length;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if ((r == 0 || a[r][c] > a[r - 1][c])
                        && (r == rows - 1 || a[r][c] > a[r + 1][c])
                        && (c == 0 || a[r][c] > a[r][c - 1])
                        && (c == cols - 1 || a[r][c] > a[r][c + 1])) return new int[] {r, c};
            }
        }
        return new int[] {-1, -1};
    }
}
\`\`\`

- **Time:** O(rows * cols)
- **Extra space:** O(1)

## Optimized approach: binary-search columns

Choose the maximum cell in the middle column. It already dominates vertical neighbors; compare horizontal neighbors to choose which half contains a peak.

\`\`\`java
public class Solution {
    public static int[] findPeakGrid(int[][] a) {
        if (a.length == 0 || a[0].length == 0) return new int[] {-1, -1};
        int low = 0, high = a[0].length - 1;
        while (low <= high) {
            int col = low + (high - low) / 2;
            int row = 0;
            for (int r = 1; r < a.length; r++) if (a[r][col] > a[row][col]) row = r;
            boolean leftHigher = col > 0 && a[row][col - 1] > a[row][col];
            boolean rightHigher = col + 1 < a[0].length && a[row][col + 1] > a[row][col];
            if (!leftHigher && !rightHigher) return new int[] {row, col};
            if (rightHigher) low = col + 1;
            else high = col - 1;
        }
        return new int[] {-1, -1};
    }
}
\`\`\`

- **Time:** O(rows * log cols)
- **Extra space:** O(1)`,

  "bs-integer-square-root": `## Problem statement

For non-negative integer n, return floor(sqrt(n)) without a built-in square-root function.

## Example

n = 27 returns 5.

## Brute-force approach: increase the candidate

Use long multiplication so candidate squared does not overflow an int.

\`\`\`java
public class Solution {
    public static int sqrtBruteForce(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be non-negative");
        int x = 0;
        while ((long) (x + 1) * (x + 1) <= n) x++;
        return x;
    }
}
\`\`\`

- **Time:** O(sqrt(n))
- **Extra space:** O(1)

## Optimized approach: binary search the answer

Find the greatest x for which x squared is at most n.

\`\`\`java
public class Solution {
    public static int mySqrt(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be non-negative");
        int low = 0, high = Math.min(n, 46340), answer = 0;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if ((long) mid * mid <= n) { answer = mid; low = mid + 1; }
            else high = mid - 1;
        }
        return answer;
    }
}
\`\`\`

- **Time:** O(log n)
- **Extra space:** O(1)`,

  "bs-kth-root": `## Problem statement

Given non-negative n and positive k, return the greatest integer x such that x^k is at most n.

## Example

n = 30, k = 3 returns 3.

## Brute-force approach: test candidates

Stop multiplying as soon as the product exceeds n to avoid overflow.

\`\`\`java
public class Solution {
    public static long kthRootBruteForce(long n, int k) {
        if (n < 0 || k <= 0) throw new IllegalArgumentException();
        long answer = 0;
        for (long x = 1; x <= n; x++) {
            if (!powerAtMost(x, k, n)) break;
            answer = x;
        }
        return answer;
    }

    private static boolean powerAtMost(long x, int k, long n) {
        long product = 1;
        for (int i = 0; i < k; i++) {
            if (product > n / x) return false;
            product *= x;
        }
        return true;
    }
}
\`\`\`

- **Time:** O(answer * k)
- **Extra space:** O(1)

## Optimized approach: binary search the root

The predicate x^k <= n is monotone, so binary-search its largest true value.

\`\`\`java
public class Solution {
    public static long kthRoot(long n, int k) {
        if (n < 0 || k <= 0) throw new IllegalArgumentException();
        long low = 0, high = n;
        while (low < high) {
            long mid = low + (high - low) / 2 + 1;
            if (powerAtMost(mid, k, n)) low = mid;
            else high = mid - 1;
        }
        return low;
    }

    private static boolean powerAtMost(long x, int k, long n) {
        long product = 1;
        for (int i = 0; i < k; i++) {
            if (x != 0 && product > n / x) return false;
            product *= x;
        }
        return true;
    }
}
\`\`\`

- **Time:** O(k log n)
- **Extra space:** O(1)`,

  "bs-median-two-sorted": `## Problem statement

Given two sorted arrays, return the median of their combined values in O(log(min(m, n))) time. At least one array is non-empty.

## Example

\`[1, 3]\` and \`[2]\` return 2.0.

## Brute-force approach: merge then select

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static double medianBruteForce(int[] a, int[] b) {
        List<Integer> merged = new ArrayList<>();
        int i = 0, j = 0;
        while (i < a.length || j < b.length) {
            if (j == b.length || (i < a.length && a[i] <= b[j])) merged.add(a[i++]);
            else merged.add(b[j++]);
        }
        int n = merged.size();
        if (n == 0) throw new IllegalArgumentException("Both arrays are empty");
        return n % 2 == 1 ? merged.get(n / 2)
                : ((long) merged.get(n / 2 - 1) + merged.get(n / 2)) / 2.0;
    }
}
\`\`\`

- **Time:** O(m + n)
- **Extra space:** O(m + n)

## Optimized approach: binary-search a partition

Choose cuts that put half the values on the left and ensure the left maximums do not exceed the right minimums.

\`\`\`java
public class Solution {
    public static double findMedianSortedArrays(int[] a, int[] b) {
        if (a.length > b.length) return findMedianSortedArrays(b, a);
        if (a.length + b.length == 0) throw new IllegalArgumentException("Both arrays are empty");
        int m = a.length, n = b.length, low = 0, high = m;
        while (low <= high) {
            int cutA = low + (high - low) / 2, cutB = (m + n + 1) / 2 - cutA;
            int leftA = cutA == 0 ? Integer.MIN_VALUE : a[cutA - 1];
            int rightA = cutA == m ? Integer.MAX_VALUE : a[cutA];
            int leftB = cutB == 0 ? Integer.MIN_VALUE : b[cutB - 1];
            int rightB = cutB == n ? Integer.MAX_VALUE : b[cutB];
            if (leftA <= rightB && leftB <= rightA) {
                int leftMax = Math.max(leftA, leftB), rightMin = Math.min(rightA, rightB);
                return (m + n) % 2 == 1 ? leftMax : ((long) leftMax + rightMin) / 2.0;
            }
            if (leftA > rightB) high = cutA - 1;
            else low = cutA + 1;
        }
        throw new IllegalArgumentException("Inputs must be sorted");
    }
}
\`\`\`

- **Time:** O(log(min(m, n)))
- **Extra space:** O(1)`,

  "bs-kth-two-sorted": `## Problem statement

Given two sorted arrays and one-based k, return the k-th smallest value in their combined sorted order.

## Example

\`[2, 3, 6, 7, 9]\`, \`[1, 4, 8, 10]\`, k = 5 returns 6.

## Brute-force approach: merge only through k

\`\`\`java
public class Solution {
    public static int kthBruteForce(int[] a, int[] b, int k) {
        if (k < 1 || k > a.length + b.length) throw new IllegalArgumentException("Invalid k");
        int i = 0, j = 0, value = 0;
        for (int rank = 1; rank <= k; rank++) {
            if (j == b.length || (i < a.length && a[i] <= b[j])) value = a[i++];
            else value = b[j++];
        }
        return value;
    }
}
\`\`\`

- **Time:** O(k)
- **Extra space:** O(1)

## Optimized approach: binary-search the partition

Choose how many of the first k values come from the shorter array, then validate the partition boundaries.

\`\`\`java
public class Solution {
    public static int kthElement(int[] a, int[] b, int k) {
        if (a.length > b.length) return kthElement(b, a, k);
        if (k < 1 || k > a.length + b.length) throw new IllegalArgumentException("Invalid k");
        int low = Math.max(0, k - b.length), high = Math.min(k, a.length);
        while (low <= high) {
            int cutA = low + (high - low) / 2, cutB = k - cutA;
            int leftA = cutA == 0 ? Integer.MIN_VALUE : a[cutA - 1];
            int rightA = cutA == a.length ? Integer.MAX_VALUE : a[cutA];
            int leftB = cutB == 0 ? Integer.MIN_VALUE : b[cutB - 1];
            int rightB = cutB == b.length ? Integer.MAX_VALUE : b[cutB];
            if (leftA <= rightB && leftB <= rightA) return Math.max(leftA, leftB);
            if (leftA > rightB) high = cutA - 1;
            else low = cutA + 1;
        }
        throw new IllegalArgumentException("Inputs must be sorted");
    }
}
\`\`\`

- **Time:** O(log(min(m, n, k)))
- **Extra space:** O(1)`,

  "bs-allocate-books": `## Problem statement

Assign each of n books, in order, to exactly m students using contiguous non-empty ranges. Minimize the maximum pages assigned to one student. Return -1 if m > n; page counts are non-negative.

## Example

\`[12, 34, 67, 90]\`, m = 2 returns 113.

## Brute-force approach: try every capacity

Check each possible maximum page count and choose the first that allows at most m groups.

\`\`\`java
public class Solution {
    public static long allocateBruteForce(int[] pages, int students) {
        if (students <= 0) throw new IllegalArgumentException("students must be positive");
        if (students > pages.length) return -1;
        long low = 0, high = 0;
        for (int page : pages) { if (page < 0) throw new IllegalArgumentException(); high += page; low = Math.max(low, page); }
        for (long cap = low; cap <= high; cap++) if (groups(pages, cap) <= students) return cap;
        return -1;
    }

    private static int groups(int[] pages, long cap) {
        int count = 1; long sum = 0;
        for (int page : pages) { if (sum + page > cap) { count++; sum = 0; } sum += page; }
        return count;
    }
}
\`\`\`

- **Time:** O((sum - maxPage + 1) * n)
- **Extra space:** O(1)

## Optimized approach: binary-search the capacity

Feasibility is monotone: if capacity C works, every larger capacity also works.

\`\`\`java
public class Solution {
    public static long allocateBooks(int[] pages, int students) {
        if (students <= 0) throw new IllegalArgumentException("students must be positive");
        if (students > pages.length) return -1;
        long low = 0, high = 0;
        for (int page : pages) { if (page < 0) throw new IllegalArgumentException(); high += page; low = Math.max(low, page); }
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (groups(pages, mid) <= students) high = mid;
            else low = mid + 1;
        }
        return low;
    }

    private static int groups(int[] pages, long cap) {
        int count = 1; long sum = 0;
        for (int page : pages) { if (sum + page > cap) { count++; sum = 0; } sum += page; }
        return count;
    }
}
\`\`\`

- **Time:** O(n log(sum of pages))
- **Extra space:** O(1)`,

  "bs-split-array-largest-sum": `## Problem statement

Split a non-negative integer array into exactly m non-empty contiguous parts, minimizing the largest part sum. Return -1 if m is invalid.

## Example

\`[7, 2, 5, 10, 8]\`, m = 2 returns 18.

## Brute-force approach: enumerate cut positions

Try every set of m-1 cuts and track the smallest possible largest segment sum.

\`\`\`java
public class Solution {
    public static long splitBruteForce(int[] a, int m) {
        if (m < 1 || m > a.length) return -1;
        return search(a, m, 0, 0);
    }

    private static long search(int[] a, int parts, int start, long currentMax) {
        if (parts == 1) {
            long sum = 0;
            for (int i = start; i < a.length; i++) sum += a[i];
            return Math.max(currentMax, sum);
        }
        long answer = Long.MAX_VALUE, sum = 0;
        for (int end = start; end <= a.length - parts; end++) {
            sum += a[end];
            answer = Math.min(answer, search(a, parts - 1, end + 1, Math.max(currentMax, sum)));
        }
        return answer;
    }
}
\`\`\`

- **Time:** O(C(n-1, m-1) * n)
- **Extra space:** O(m) recursion

## Optimized approach: binary-search the largest sum

For a candidate cap, greedily form contiguous groups. The required group count never increases as the cap grows.

\`\`\`java
public class Solution {
    public static long splitArray(int[] a, int m) {
        if (m < 1 || m > a.length) return -1;
        long low = 0, high = 0;
        for (int value : a) { if (value < 0) throw new IllegalArgumentException("Values must be non-negative"); low = Math.max(low, value); high += value; }
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (groups(a, mid) <= m) high = mid;
            else low = mid + 1;
        }
        return low;
    }

    private static int groups(int[] a, long cap) {
        int count = 1; long sum = 0;
        for (int value : a) { if (sum + value > cap) { count++; sum = 0; } sum += value; }
        return count;
    }
}
\`\`\`

- **Time:** O(n log(sum of values))
- **Extra space:** O(1)`,

  "bs-aggressive-cows": `## Problem statement

Given distinct stall positions and at least two cows, place all cows so the minimum distance between any two is maximized. Return -1 if placement is impossible.

## Example

Stalls \`[1, 2, 4, 8, 9]\`, k = 3 returns 3.

## Brute-force approach: try all distances

Sort positions and test candidate minimum distances from largest to smallest.

\`\`\`java
import java.util.Arrays;

public class Solution {
    public static long maxDistanceBruteForce(int[] stalls, int cows) {
        if (cows < 2 || cows > stalls.length) return -1;
        int[] p = stalls.clone(); Arrays.sort(p);
        for (long distance = (long) p[p.length - 1] - p[0]; distance >= 0; distance--) {
            if (canPlace(p, cows, distance)) return distance;
        }
        return -1;
    }

    private static boolean canPlace(int[] p, int cows, long distance) {
        int placed = 1, last = 0;
        for (int i = 1; i < p.length; i++) if ((long) p[i] - p[last] >= distance) { placed++; last = i; }
        return placed >= cows;
    }
}
\`\`\`

- **Time:** O(n log n + range * n)
- **Extra space:** O(n) for the sorted copy

## Optimized approach: binary-search the distance

Greedy placement checks if a distance is feasible; feasibility is monotone as distance decreases.

\`\`\`java
import java.util.Arrays;

public class Solution {
    public static long maxDistance(int[] stalls, int cows) {
        if (cows < 2 || cows > stalls.length) return -1;
        int[] p = stalls.clone(); Arrays.sort(p);
        long low = 0, high = (long) p[p.length - 1] - p[0];
        while (low < high) {
            long mid = low + (high - low + 1) / 2;
            if (canPlace(p, cows, mid)) low = mid;
            else high = mid - 1;
        }
        return low;
    }

    private static boolean canPlace(int[] p, int cows, long distance) {
        int placed = 1, last = 0;
        for (int i = 1; i < p.length; i++) if ((long) p[i] - p[last] >= distance) { placed++; last = i; }
        return placed >= cows;
    }
}
\`\`\`

- **Time:** O(n log n + n log(range))
- **Extra space:** O(n) for the sorted copy`,

  "bs-minimum-eating-speed": `## Problem statement

Given positive pile sizes and h hours, find the minimum integer speed that finishes all piles within h hours. Koko eats from at most one pile per hour.

## Example

\`[3, 6, 7, 11]\`, h = 8 returns 4.

## Brute-force approach: test each speed

\`\`\`java
public class Solution {
    public static int minSpeedBruteForce(int[] piles, int h) {
        int max = 0;
        for (int pile : piles) { if (pile <= 0) throw new IllegalArgumentException(); max = Math.max(max, pile); }
        for (int speed = 1; speed <= max; speed++) if (hours(piles, speed) <= h) return speed;
        return -1;
    }

    private static long hours(int[] piles, int speed) {
        long total = 0;
        for (int pile : piles) total += (pile + (long) speed - 1) / speed;
        return total;
    }
}
\`\`\`

- **Time:** O(n * maxPile)
- **Extra space:** O(1)

## Optimized approach: binary-search the speed

The hours required only decrease as eating speed increases.

\`\`\`java
public class Solution {
    public static int minEatingSpeed(int[] piles, int h) {
        int low = 1, high = 0;
        for (int pile : piles) { if (pile <= 0) throw new IllegalArgumentException(); high = Math.max(high, pile); }
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (hours(piles, mid) <= h) high = mid;
            else low = mid + 1;
        }
        return hours(piles, low) <= h ? low : -1;
    }

    private static long hours(int[] piles, int speed) {
        long total = 0;
        for (int pile : piles) total += (pile + (long) speed - 1) / speed;
        return total;
    }
}
\`\`\`

- **Time:** O(n log(maxPile))
- **Extra space:** O(1)`,

  "bs-ship-capacity-days": `## Problem statement

Given package weights in order and a positive number of days, find the minimum ship capacity that delivers all packages within those days.

## Example

\`[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\`, days = 5 returns 15.

## Brute-force approach: test capacities

Try each capacity from the heaviest package to the sum of all weights.

\`\`\`java
public class Solution {
    public static long capacityBruteForce(int[] weights, int days) {
        long low = 0, high = 0;
        for (int w : weights) { if (w <= 0) throw new IllegalArgumentException(); low = Math.max(low, w); high += w; }
        for (long cap = low; cap <= high; cap++) if (neededDays(weights, cap) <= days) return cap;
        return -1;
    }

    private static int neededDays(int[] w, long cap) {
        int days = 1; long load = 0;
        for (int x : w) { if (load + x > cap) { days++; load = 0; } load += x; }
        return days;
    }
}
\`\`\`

- **Time:** O(n * sum(weights))
- **Extra space:** O(1)

## Optimized approach: binary-search capacity

Larger capacity cannot require more shipping days, so feasibility is monotone.

\`\`\`java
public class Solution {
    public static long shipWithinDays(int[] weights, int days) {
        if (days <= 0) throw new IllegalArgumentException("days must be positive");
        long low = 0, high = 0;
        for (int w : weights) { if (w <= 0) throw new IllegalArgumentException(); low = Math.max(low, w); high += w; }
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (neededDays(weights, mid) <= days) high = mid;
            else low = mid + 1;
        }
        return low;
    }

    private static int neededDays(int[] w, long cap) {
        int count = 1; long load = 0;
        for (int x : w) { if (load + x > cap) { count++; load = 0; } load += x; }
        return count;
    }
}
\`\`\`

- **Time:** O(n log(sum(weights)))
- **Extra space:** O(1)`,

  "bs-smallest-divisor-threshold": `## Problem statement

Given positive integers and a threshold, find the smallest positive divisor for which the sum of rounded-up quotients is at most the threshold.

## Example

\`[1, 2, 5, 9]\`, threshold = 6 returns 5.

## Brute-force approach: try each divisor

\`\`\`java
public class Solution {
    public static int smallestDivisorBruteForce(int[] values, int threshold) {
        int max = 0;
        for (int value : values) { if (value <= 0) throw new IllegalArgumentException(); max = Math.max(max, value); }
        for (int divisor = 1; divisor <= max; divisor++) if (sum(values, divisor) <= threshold) return divisor;
        return -1;
    }

    private static long sum(int[] values, int divisor) {
        long total = 0;
        for (int value : values) total += (value + (long) divisor - 1) / divisor;
        return total;
    }
}
\`\`\`

- **Time:** O(n * maxValue)
- **Extra space:** O(1)

## Optimized approach: binary-search the divisor

The quotient sum is non-increasing as the divisor gets larger.

\`\`\`java
public class Solution {
    public static int smallestDivisor(int[] values, int threshold) {
        if (values.length == 0) return -1;
        int low = 1, high = 0;
        for (int value : values) { if (value <= 0) throw new IllegalArgumentException(); high = Math.max(high, value); }
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (sum(values, mid) <= threshold) high = mid;
            else low = mid + 1;
        }
        return sum(values, low) <= threshold ? low : -1;
    }

    private static long sum(int[] values, int divisor) {
        long total = 0;
        for (int value : values) total += (value + (long) divisor - 1) / divisor;
        return total;
    }
}
\`\`\`

- **Time:** O(n log(maxValue))
- **Extra space:** O(1)`
};
