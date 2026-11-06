export const monotonicStackContent = {
  "ms-next-greater-right": `## Problem statement

For each array element, return the first greater value to its right, or -1 if none exists.

## Example

\`[4, 5, 2, 10]\` returns \`[5, 10, 10, -1]\`.

## Brute-force approach: scan to the right

\`\`\`java
public class Solution {
    public static int[] nextGreaterBruteForce(int[] values) {
        int[] result = new int[values.length];
        for (int i = 0; i < values.length; i++) {
            result[i] = -1;
            for (int j = i + 1; j < values.length; j++) if (values[j] > values[i]) { result[i] = values[j]; break; }
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n) for output

## Optimized approach: monotonic stack of unresolved indices

When a greater value arrives, it resolves all smaller values on top of the stack.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static int[] nextGreaterElement(int[] values) {
        int[] result = new int[values.length];
        java.util.Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < values.length; i++) {
            while (!stack.isEmpty() && values[stack.peek()] < values[i]) result[stack.pop()] = values[i];
            stack.push(i);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-next-greater-left": `## Problem statement

For each array element, return the nearest greater value to its left, or -1 if none exists.

## Example

\`[4, 5, 2, 10]\` returns \`[-1, -1, 5, -1]\`.

## Brute-force approach: scan left

\`\`\`java
public class Solution {
    public static int[] nextGreaterLeftBruteForce(int[] values) {
        int[] result = new int[values.length];
        for (int i = 0; i < values.length; i++) {
            result[i] = -1;
            for (int j = i - 1; j >= 0; j--) if (values[j] > values[i]) { result[i] = values[j]; break; }
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n) for output

## Optimized approach: decreasing stack

Remove values less than or equal to the current value; the remaining top is the closest greater value.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static int[] nextGreaterLeft(int[] values) {
        int[] result = new int[values.length];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < values.length; i++) {
            while (!stack.isEmpty() && stack.peek() <= values[i]) stack.pop();
            result[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(values[i]);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-next-smaller-right": `## Problem statement

For each array element, return the first smaller value to its right, or -1 if none exists.

## Example

\`[4, 8, 5, 2, 25]\` returns \`[2, 5, 2, -1, -1]\`.

## Brute-force approach: scan right

\`\`\`java
public class Solution {
    public static int[] nextSmallerBruteForce(int[] values) {
        int[] result = new int[values.length];
        for (int i = 0; i < values.length; i++) {
            result[i] = -1;
            for (int j = i + 1; j < values.length; j++) if (values[j] < values[i]) { result[i] = values[j]; break; }
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n) for output

## Optimized approach: resolve indices with an increasing stack

A smaller arriving value is the next smaller value for larger unresolved indices on the stack.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static int[] nextSmallerRight(int[] values) {
        int[] result = new int[values.length];
        java.util.Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < values.length; i++) {
            while (!stack.isEmpty() && values[stack.peek()] > values[i]) result[stack.pop()] = values[i];
            stack.push(i);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-next-smaller-left": `## Problem statement

For each array element, return the nearest smaller value to its left, or -1 if none exists.

## Example

\`[4, 8, 5, 2, 25]\` returns \`[-1, 4, 4, -1, 2]\`.

## Brute-force approach: scan left

\`\`\`java
public class Solution {
    public static int[] nextSmallerLeftBruteForce(int[] values) {
        int[] result = new int[values.length];
        for (int i = 0; i < values.length; i++) {
            result[i] = -1;
            for (int j = i - 1; j >= 0; j--) if (values[j] < values[i]) { result[i] = values[j]; break; }
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n) for output

## Optimized approach: increasing stack

Discard values greater than or equal to the current value; the remaining top is the nearest smaller value.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static int[] nextSmallerLeft(int[] values) {
        int[] result = new int[values.length];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < values.length; i++) {
            while (!stack.isEmpty() && stack.peek() >= values[i]) stack.pop();
            result[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(values[i]);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-stock-span": `## Problem statement

For each day, count consecutive previous days whose stock prices were less than or equal to today's price, including today.

## Example

\`[100, 80, 60, 70, 60, 75, 85]\` returns \`[1, 1, 1, 2, 1, 4, 6]\`.

## Brute-force approach: walk backward each day

\`\`\`java
public class Solution {
    public static int[] stockSpanBruteForce(int[] prices) {
        int[] span = new int[prices.length];
        for (int i = 0; i < prices.length; i++) {
            int j = i;
            while (j >= 0 && prices[j] <= prices[i]) j--;
            span[i] = i - j;
        }
        return span;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n) for output

## Optimized approach: stack of prior higher-price indices

Pop prices less than or equal to today's; the remaining top is the nearest previous higher price.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static int[] calculateSpan(int[] prices) {
        int[] span = new int[prices.length];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < prices.length; i++) {
            while (!stack.isEmpty() && prices[stack.peek()] <= prices[i]) stack.pop();
            span[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
            stack.push(i);
        }
        return span;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-daily-temperatures": `## Problem statement

For each day, return the number of days until a warmer temperature, or zero when no warmer day follows.

## Example

\`[73, 74, 75, 71, 69, 72, 76, 73]\` returns \`[1, 1, 4, 2, 1, 1, 0, 0]\`.

## Brute-force approach: search future days

\`\`\`java
public class Solution {
    public static int[] dailyTemperaturesBruteForce(int[] temperatures) {
        int[] result = new int[temperatures.length];
        for (int i = 0; i < temperatures.length; i++) {
            for (int j = i + 1; j < temperatures.length; j++) {
                if (temperatures[j] > temperatures[i]) { result[i] = j - i; break; }
            }
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n) for output

## Optimized approach: monotonic stack of unresolved days

When a warmer day arrives, resolve all cooler days at the top of the stack.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static int[] dailyTemperatures(int[] temperatures) {
        int[] result = new int[temperatures.length];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int day = 0; day < temperatures.length; day++) {
            while (!stack.isEmpty() && temperatures[stack.peek()] < temperatures[day]) {
                int previous = stack.pop(); result[previous] = day - previous;
            }
            stack.push(day);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-largest-rectangle-histogram": `## Problem statement

Given non-negative histogram heights, return the largest rectangular area.

## Example

\`[2, 1, 5, 6, 2, 3]\` returns 10.

## Brute-force approach: expand from each bar

Treat each bar as the limiting height and extend left and right while bars are tall enough.

\`\`\`java
public class Solution {
    public static long largestRectangleBruteForce(int[] heights) {
        long best = 0;
        for (int i = 0; i < heights.length; i++) {
            int left = i, right = i;
            while (left > 0 && heights[left - 1] >= heights[i]) left--;
            while (right + 1 < heights.length && heights[right + 1] >= heights[i]) right++;
            best = Math.max(best, (long) heights[i] * (right - left + 1));
        }
        return best;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: increasing stack of indices

When a shorter bar arrives, pop taller bars and calculate their maximal width.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static long largestRectangleArea(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>();
        long best = 0;
        for (int i = 0; i <= heights.length; i++) {
            int current = i == heights.length ? 0 : heights[i];
            while (!stack.isEmpty() && heights[stack.peek()] > current) {
                int height = heights[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                best = Math.max(best, (long) height * (i - left - 1));
            }
            stack.push(i);
        }
        return best;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-maximal-rectangle": `## Problem statement

Find the largest rectangle containing only '1' cells in a rectangular binary matrix.

## Example

\`[["1","0","1","0","0"], ["1","0","1","1","1"], ["1","1","1","1","1"], ["1","0","0","1","0"]]\` returns 6.

## Brute-force approach: test every rectangle

\`\`\`java
public class Solution {
    public static long maximalRectangleBruteForce(char[][] matrix) {
        if (matrix.length == 0) return 0;
        int rows = matrix.length, cols = matrix[0].length;
        long best = 0;
        for (int top = 0; top < rows; top++) for (int left = 0; left < cols; left++) {
            for (int bottom = top; bottom < rows; bottom++) for (int right = left; right < cols; right++) {
                boolean allOnes = true;
                for (int r = top; r <= bottom && allOnes; r++) for (int c = left; c <= right; c++) {
                    if (matrix[r][c] != '1') { allOnes = false; break; }
                }
                if (allOnes) best = Math.max(best, (long) (bottom - top + 1) * (right - left + 1));
            }
        }
        return best;
    }
}
\`\`\`

- **Time:** O(m³n³)
- **Extra space:** O(1)

## Optimized approach: histogram per row

Build consecutive-one heights for each row and apply the linear histogram algorithm.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static long maximalRectangle(char[][] matrix) {
        if (matrix.length == 0) return 0;
        int cols = matrix[0].length;
        int[] heights = new int[cols];
        long best = 0;
        for (char[] row : matrix) {
            if (row.length != cols) throw new IllegalArgumentException("Matrix must be rectangular");
            for (int c = 0; c < cols; c++) heights[c] = row[c] == '1' ? heights[c] + 1 : 0;
            best = Math.max(best, histogram(heights));
        }
        return best;
    }
    private static long histogram(int[] h) {
        Deque<Integer> stack = new ArrayDeque<>(); long best = 0;
        for (int i = 0; i <= h.length; i++) {
            int current = i == h.length ? 0 : h[i];
            while (!stack.isEmpty() && h[stack.peek()] > current) {
                int height = h[stack.pop()], left = stack.isEmpty() ? -1 : stack.peek();
                best = Math.max(best, (long) height * (i - left - 1));
            }
            stack.push(i);
        }
        return best;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(n)`,

  "ms-sum-subarray-minimums": `## Problem statement

Sum the minimum value of every non-empty subarray and return the result modulo 1,000,000,007.

## Example

\`[3, 1, 2, 4]\` returns 17.

## Brute-force approach: extend every start

\`\`\`java
public class Solution {
    public static int sumMinimaBruteForce(int[] values) {
        long sum = 0;
        for (int left = 0; left < values.length; left++) {
            int minimum = Integer.MAX_VALUE;
            for (int right = left; right < values.length; right++) {
                minimum = Math.min(minimum, values[right]); sum += minimum;
            }
        }
        return (int) (sum % 1_000_000_007);
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: count each value's subarrays

For each value, count subarrays where it is the minimum using previous strictly smaller and next smaller-or-equal boundaries.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static int sumSubarrayMins(int[] values) {
        int n = values.length, mod = 1_000_000_007;
        int[] left = new int[n], right = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && values[stack.peek()] > values[i]) stack.pop();
            left[i] = stack.isEmpty() ? i + 1 : i - stack.peek(); stack.push(i);
        }
        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && values[stack.peek()] >= values[i]) stack.pop();
            right[i] = stack.isEmpty() ? n - i : stack.peek() - i; stack.push(i);
        }
        long sum = 0;
        for (int i = 0; i < n; i++) sum = (sum + (long) values[i] * left[i] * right[i]) % mod;
        return (int) ((sum + mod) % mod);
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-sum-subarray-maximums": `## Problem statement

Sum the maximum value of every non-empty subarray. Return the exact sum as a long.

## Example

\`[1, 2, 3]\` returns 14.

## Brute-force approach: extend every start

\`\`\`java
public class Solution {
    public static long sumMaximumsBruteForce(int[] values) {
        long sum = 0;
        for (int left = 0; left < values.length; left++) {
            int maximum = Integer.MIN_VALUE;
            for (int right = left; right < values.length; right++) {
                maximum = Math.max(maximum, values[right]); sum += maximum;
            }
        }
        return sum;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: count each value's subarrays

Use previous strictly greater and next greater-or-equal boundaries to assign duplicate maxima exactly once.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static long sumSubarrayMaximums(int[] values) {
        int n = values.length;
        int[] left = new int[n], right = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && values[stack.peek()] < values[i]) stack.pop();
            left[i] = stack.isEmpty() ? i + 1 : i - stack.peek(); stack.push(i);
        }
        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && values[stack.peek()] <= values[i]) stack.pop();
            right[i] = stack.isEmpty() ? n - i : stack.peek() - i; stack.push(i);
        }
        long sum = 0;
        for (int i = 0; i < n; i++) sum += (long) values[i] * left[i] * right[i];
        return sum;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-max-min-each-window": `## Problem statement

For every window size from 1 through n, return the maximum among the minimum values of all windows of that size.

## Example

\`[10, 20, 30, 50, 10, 70, 30]\` returns \`[70, 30, 20, 10, 10, 10, 10]\`.

## Brute-force approach: inspect every window

\`\`\`java
public class Solution {
    public static int[] maxOfMinBruteForce(int[] values) {
        int n = values.length; int[] answer = new int[n];
        for (int k = 1; k <= n; k++) {
            int best = Integer.MIN_VALUE;
            for (int left = 0; left + k <= n; left++) {
                int minimum = values[left];
                for (int i = left + 1; i < left + k; i++) minimum = Math.min(minimum, values[i]);
                best = Math.max(best, minimum);
            }
            answer[k - 1] = best;
        }
        return answer;
    }
}
\`\`\`

- **Time:** O(n³)
- **Extra space:** O(n) for output

## Optimized approach: span each value can be a minimum

Find the nearest strictly smaller value on both sides; a value is a window minimum for its full span. Fill smaller sizes by suffix maxima.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class Solution {
    public static int[] maxOfMin(int[] values) {
        int n = values.length; int[] left = new int[n], right = new int[n], answer = new int[n + 1];
        Arrays.fill(answer, Integer.MIN_VALUE);
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && values[stack.peek()] >= values[i]) stack.pop();
            left[i] = stack.isEmpty() ? -1 : stack.peek(); stack.push(i);
        }
        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && values[stack.peek()] >= values[i]) stack.pop();
            right[i] = stack.isEmpty() ? n : stack.peek(); stack.push(i);
        }
        for (int i = 0; i < n; i++) {
            int width = right[i] - left[i] - 1;
            answer[width] = Math.max(answer[width], values[i]);
        }
        for (int size = n - 1; size >= 1; size--) answer[size] = Math.max(answer[size], answer[size + 1]);
        return Arrays.copyOfRange(answer, 1, n + 1);
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-trapping-rain-water": `## Problem statement

Given non-negative bar heights, return the total trapped rainwater.

## Example

\`[4, 2, 0, 3, 2, 5]\` returns 9.

## Brute-force approach: find max wall on each side

\`\`\`java
public class Solution {
    public static long trapBruteForce(int[] height) {
        long water = 0;
        for (int i = 0; i < height.length; i++) {
            int left = 0, right = 0;
            for (int j = 0; j <= i; j++) left = Math.max(left, height[j]);
            for (int j = i; j < height.length; j++) right = Math.max(right, height[j]);
            water += Math.min(left, right) - height[i];
        }
        return water;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: stack of bars

When a taller right boundary arrives, pop a basin bottom and calculate its bounded width and depth.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static long trap(int[] height) {
        Deque<Integer> stack = new ArrayDeque<>();
        long water = 0;
        for (int right = 0; right < height.length; right++) {
            while (!stack.isEmpty() && height[right] > height[stack.peek()]) {
                int bottom = stack.pop();
                if (stack.isEmpty()) break;
                int width = right - stack.peek() - 1;
                int boundedHeight = Math.min(height[right], height[stack.peek()]) - height[bottom];
                water += (long) width * boundedHeight;
            }
            stack.push(right);
        }
        return water;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-remove-digits-smallest": `## Problem statement

Given a non-negative integer string and k, remove exactly k digits to produce the smallest possible number. Strip leading zeros; return "0" if empty.

## Example

\`"1432219"\`, k = 3 returns \`"1219"\`.

## Brute-force approach: enumerate removal choices

\`\`\`java
public class Solution {
    public static String removeKdigitsBruteForce(String number, int k) {
        if (k < 0 || k > number.length() || !number.matches("\\\\d*")) throw new IllegalArgumentException();
        return choose(number, k, 0, new StringBuilder());
    }
    private static String choose(String s, int remove, int index, StringBuilder kept) {
        if (s.length() - index == remove) return normalize(kept.toString());
        if (remove == 0) return normalize(kept + s.substring(index));
        String without = choose(s, remove - 1, index + 1, kept);
        kept.append(s.charAt(index));
        String with = choose(s, remove, index + 1, kept);
        kept.setLength(kept.length() - 1);
        return compare(with, without) <= 0 ? with : without;
    }
    private static String normalize(String s) {
        String result = s.replaceFirst("^0+", "");
        return result.isEmpty() ? "0" : result;
    }
    private static int compare(String a, String b) {
        int length = Integer.compare(a.length(), b.length());
        return length != 0 ? length : a.compareTo(b);
    }
}
\`\`\`

- **Time:** O(2^n * n) worst case
- **Extra space:** O(n) recursion

## Optimized approach: monotonic increasing digit stack

Remove a previous larger digit whenever a smaller digit arrives, then remove any leftover digits from the end.

\`\`\`java
public class Solution {
    public static String removeKdigits(String number, int k) {
        if (k < 0 || k > number.length() || !number.matches("\\\\d*")) throw new IllegalArgumentException();
        StringBuilder stack = new StringBuilder();
        for (char digit : number.toCharArray()) {
            while (k > 0 && stack.length() > 0 && stack.charAt(stack.length() - 1) > digit) {
                stack.setLength(stack.length() - 1); k--;
            }
            stack.append(digit);
        }
        stack.setLength(stack.length() - k);
        int first = 0;
        while (first < stack.length() && stack.charAt(first) == '0') first++;
        return first == stack.length() ? "0" : stack.substring(first);
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-132-pattern": `## Problem statement

Determine whether there are indices i < j < k with values[i] < values[k] < values[j].

## Example

\`[3, 1, 4, 2]\` returns true using 1, 4, 2.

## Brute-force approach: enumerate triples

\`\`\`java
public class Solution {
    public static boolean find132patternBruteForce(int[] values) {
        for (int i = 0; i < values.length; i++) for (int j = i + 1; j < values.length; j++) {
            if (values[i] >= values[j]) continue;
            for (int k = j + 1; k < values.length; k++) if (values[i] < values[k] && values[k] < values[j]) return true;
        }
        return false;
    }
}
\`\`\`

- **Time:** O(n³)
- **Extra space:** O(1)

## Optimized approach: scan right to left with a decreasing stack

Track the best candidate for the "2" value; a current value below it is the required "1".

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static boolean find132pattern(int[] values) {
        Deque<Integer> stack = new ArrayDeque<>();
        int two = Integer.MIN_VALUE;
        for (int i = values.length - 1; i >= 0; i--) {
            if (values[i] < two) return true;
            while (!stack.isEmpty() && values[i] > stack.peek()) two = stack.pop();
            stack.push(values[i]);
        }
        return false;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "ms-online-stock-span": `## Problem statement

Design an online structure that accepts one stock price at a time and returns its span: consecutive previous prices less than or equal to today's price, including today.

## Example

Prices \`[100, 80, 60, 70, 60, 75, 85]\` return spans \`[1, 1, 1, 2, 1, 4, 6]\`.

## Brute-force approach: retain all prices and scan backward

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    static class StockSpanner {
        private final List<Integer> prices = new ArrayList<>();
        public int next(int price) {
            prices.add(price);
            int span = 0;
            for (int i = prices.size() - 1; i >= 0 && prices.get(i) <= price; i--) span++;
            return span;
        }
    }
}
\`\`\`

- **Time:** O(n) worst case per call
- **Extra space:** O(n)

## Optimized approach: compress dominated prices with a stack

Store price and accumulated span; pop all previous prices no greater than the current price.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    static class StockSpanner {
        private final Deque<int[]> stack = new ArrayDeque<>();
        public int next(int price) {
            int span = 1;
            while (!stack.isEmpty() && stack.peek()[0] <= price) span += stack.pop()[1];
            stack.push(new int[] {price, span});
            return span;
        }
    }
}
\`\`\`

- **Time:** O(1) amortized per call
- **Extra space:** O(n)`
};
