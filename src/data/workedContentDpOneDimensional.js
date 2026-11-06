const worked = (statement, example, brute, bruteTime, bruteSpace, optimized, optimizedTime, optimizedSpace) => `## Problem statement

${statement}

## Example

${example}

## Brute-force approach

${brute.description}

\`\`\`java
${brute.code}
\`\`\`

- **Time:** ${bruteTime}
- **Extra space:** ${bruteSpace}

## Optimized approach

${optimized.description}

\`\`\`java
${optimized.code}
\`\`\`

- **Time:** ${optimizedTime}
- **Extra space:** ${optimizedSpace}`;

const solution = (body) => `public class Solution {
${body}
}`;

export const dpOneDimensionalContent = {
  "climbing-stairs": worked(
    "Count ways to climb n stairs by taking either 1 or 2 steps. n is nonnegative; assume the answer fits in long.",
    "For n = 4, there are 5 ways.",
    { description: "Recursively choose the first step size.", code: solution(`    public static long ways(int n) {
        if (n < 0) return 0;
        if (n <= 1) return 1;
        return ways(n - 1) + ways(n - 2);
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Keep only the previous two Fibonacci-style counts.", code: solution(`    public static long ways(int n) {
        if (n < 0) return 0;
        long oneBack = 1, twoBack = 1;
        for (int step = 2; step <= n; step++) {
            long current = oneBack + twoBack;
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }`) },
    "O(n)", "O(1)"
  ),
  "min-cost-climbing-stairs": worked(
    "Given the cost of each stair, reach the top by starting at index 0 or 1 and taking one or two steps. Pay the cost of each stepped-on stair; the top is beyond the last index.",
    "For [10,15,20], the minimum cost is 15.",
    { description: "Try both step sizes from each position and recurse until the top.", code: solution(`    public static long minimumCost(int[] cost) {
        return Math.min(visit(cost, 0), visit(cost, 1));
    }
    private static long visit(int[] cost, int i) {
        if (i >= cost.length) return 0;
        return cost[i] + Math.min(visit(cost, i + 1), visit(cost, i + 2));
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Scan backward, retaining the best cost from the next two indices.", code: solution(`    public static long minimumCost(int[] cost) {
        long next = 0, nextTwo = 0;
        for (int i = cost.length - 1; i >= 0; i--) {
            long current = cost[i] + Math.min(next, nextTwo);
            nextTwo = next;
            next = current;
        }
        return Math.min(next, nextTwo);
    }`) },
    "O(n)", "O(1)"
  ),
  "house-robber": worked(
    "Choose non-adjacent houses to maximize the sum of nonnegative amounts. Return 0 for an empty list.",
    "[2,7,9,3,1] returns 12.",
    { description: "At every house, choose to skip it or rob it and skip its neighbor.", code: solution(`    public static long rob(int[] a) {
        return choose(a, 0);
    }
    private static long choose(int[] a, int i) {
        if (i >= a.length) return 0;
        return Math.max(choose(a, i + 1), a[i] + choose(a, i + 2));
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Maintain the best total through the previous house and the house before it.", code: solution(`    public static long rob(int[] a) {
        long twoBack = 0, oneBack = 0;
        for (int x : a) {
            long current = Math.max(oneBack, twoBack + x);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }`) },
    "O(n)", "O(1)"
  ),
  "house-robber-ii": worked(
    "Houses form a circle, so the first and last are adjacent. Maximize the sum of non-adjacent nonnegative amounts; an empty input returns 0.",
    "[2,3,2] returns 3.",
    { description: "Enumerate all subsets and reject any containing adjacent circular indices.", code: solution(`    public static long rob(int[] a) {
        return enumerate(a, 0, false, false);
    }
    private static long enumerate(int[] a, int i, boolean firstTaken, boolean previousTaken) {
        if (i == a.length) return 0;
        long best = enumerate(a, i + 1, firstTaken, false);
        boolean last = i == a.length - 1;
        if (!previousTaken && !(last && firstTaken)) {
            long suffix = enumerate(a, i + 1, firstTaken || i == 0, true);
            best = Math.max(best, a[i] + suffix);
        }
        return best;
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "A valid solution excludes either the first or the last house. Solve the two resulting linear ranges.", code: solution(`    public static long rob(int[] a) {
        if (a.length == 0) return 0;
        if (a.length == 1) return a[0];
        return Math.max(linear(a, 0, a.length - 2), linear(a, 1, a.length - 1));
    }
    private static long linear(int[] a, int left, int right) {
        long twoBack = 0, oneBack = 0;
        for (int i = left; i <= right; i++) {
            long current = Math.max(oneBack, twoBack + a[i]);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }`) },
    "O(n)", "O(1)"
  ),
  "maximum-sum-non-adjacent-elements": worked(
    "Find the maximum sum of a subset with no adjacent indices. Values may be negative; choosing no elements is allowed, so the answer is at least 0.",
    "[2,1,4,9] returns 11.",
    { description: "Branch on skipping or taking each index; taking skips its successor.", code: solution(`    public static long maximumSum(int[] a) {
        return choose(a, 0);
    }
    private static long choose(int[] a, int i) {
        if (i >= a.length) return 0;
        return Math.max(choose(a, i + 1), a[i] + choose(a, i + 2));
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Roll the best totals for the previous two prefixes.", code: solution(`    public static long maximumSum(int[] a) {
        long twoBack = 0, oneBack = 0;
        for (int x : a) {
            long current = Math.max(oneBack, twoBack + x);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }`) },
    "O(n)", "O(1)"
  ),
  "frog-jump-minimum-energy": worked(
    "A frog starts at stone 0 and may jump one or two indices. A jump costs the absolute height difference. Return the minimum energy; fewer than two stones cost 0.",
    "Heights [10,20,30,10] gives 20.",
    { description: "Recursively try the one- and two-stone jumps.", code: solution(`    public static long minimumEnergy(int[] h) {
        if (h.length < 2) return 0;
        return visit(h, h.length - 1);
    }
    private static long visit(int[] h, int i) {
        if (i == 0) return 0;
        long best = visit(h, i - 1) + Math.abs((long) h[i] - h[i - 1]);
        if (i > 1) best = Math.min(best,
                visit(h, i - 2) + Math.abs((long) h[i] - h[i - 2]));
        return best;
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Compute each stone's best energy from the previous one or two.", code: solution(`    public static long minimumEnergy(int[] h) {
        if (h.length < 2) return 0;
        long twoBack = 0, oneBack = Math.abs((long) h[1] - h[0]);
        for (int i = 2; i < h.length; i++) {
            long current = Math.min(oneBack + Math.abs((long) h[i] - h[i - 1]),
                    twoBack + Math.abs((long) h[i] - h[i - 2]));
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }`) },
    "O(n)", "O(1)"
  ),
  "frog-jump-k-distances": worked(
    "A frog starts at stone 0 and may jump from 1 through k indices forward, where k is positive. Cost is the absolute height difference. Return the minimum energy.",
    "Heights [10,30,40,50,20], k = 3 gives 30.",
    { description: "Try every allowed jump recursively.", code: solution(`    public static long minimumEnergy(int[] h, int k) {
        if (h.length < 2) return 0;
        return visit(h, k, h.length - 1);
    }
    private static long visit(int[] h, int k, int i) {
        if (i == 0) return 0;
        long best = Long.MAX_VALUE;
        for (int d = 1; d <= k && d <= i; d++)
            best = Math.min(best, visit(h, k, i - d) + Math.abs((long) h[i] - h[i - d]));
        return best;
    }`) },
    "O(k^n) upper bound", "O(n) recursion stack",
    { description: "For each stone, inspect up to k prior stones and keep the minimum accumulated energy.", code: solution(`    public static long minimumEnergy(int[] h, int k) {
        if (h.length < 2) return 0;
        long[] dp = new long[h.length];
        for (int i = 1; i < h.length; i++) {
            dp[i] = Long.MAX_VALUE;
            for (int d = 1; d <= k && d <= i; d++)
                dp[i] = Math.min(dp[i], dp[i - d] + Math.abs((long) h[i] - h[i - d]));
        }
        return dp[h.length - 1];
    }`) },
    "O(nk)", "O(n)"
  ),
  "decode-ways": worked(
    "Count decodings of a digit string where 1..26 map to A..Z. A leading or embedded zero must be part of a valid 10 or 20 pair. Empty input has 0 decodings.",
    "\"226\" has 3 decodings.",
    { description: "At each index, use one digit if nonzero and a two-digit code if it lies from 10 through 26.", code: solution(`    public static long count(String s) {
        if (s.isEmpty()) return 0;
        return visit(s, 0);
    }
    private static long visit(String s, int i) {
        if (i == s.length()) return 1;
        if (s.charAt(i) == '0') return 0;
        long ways = visit(s, i + 1);
        if (i + 1 < s.length()) {
            int value = (s.charAt(i) - '0') * 10 + s.charAt(i + 1) - '0';
            if (value <= 26) ways += visit(s, i + 2);
        }
        return ways;
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Use the number of decodings for the previous one and two prefixes.", code: solution(`    public static long count(String s) {
        if (s.isEmpty()) return 0;
        long twoBack = 1, oneBack = s.charAt(0) == '0' ? 0 : 1;
        for (int i = 1; i < s.length(); i++) {
            long current = 0;
            if (s.charAt(i) != '0') current += oneBack;
            int pair = (s.charAt(i - 1) - '0') * 10 + s.charAt(i) - '0';
            if (pair >= 10 && pair <= 26) current += twoBack;
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }`) },
    "O(n)", "O(1)"
  ),
  "word-break": worked(
    "Return whether a string can be segmented into one or more dictionary words. Dictionary words are nonempty; an empty input is segmentable.",
    "\"leetcode\" with [\"leet\",\"code\"] returns true.",
    { description: "Try every dictionary word beginning at the current position.", code: solution(`    public static boolean canBreak(String s, Set<String> words) {
        return visit(s, words, 0);
    }
    private static boolean visit(String s, Set<String> words, int start) {
        if (start == s.length()) return true;
        for (int end = start + 1; end <= s.length(); end++)
            if (words.contains(s.substring(start, end)) && visit(s, words, end)) return true;
        return false;
    }`) .replace("public class Solution {", "import java.util.Set;\n\npublic class Solution {") },
    "Exponential in string length", "O(n) recursion stack",
    { description: "Let dp[i] indicate whether the prefix ending at i can be segmented; test earlier split points.", code: `import java.util.Set;

public class Solution {
    public static boolean canBreak(String s, Set<String> words) {
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int end = 1; end <= s.length(); end++)
            for (int start = 0; start < end; start++)
                if (dp[start] && words.contains(s.substring(start, end))) {
                    dp[end] = true;
                    break;
                }
        return dp[s.length()];
    }
}` },
    "O(n²) substring checks (plus substring construction)", "O(n) DP, excluding temporary substring allocations"
  ),
  "maximum-subarray-kadane": worked(
    "Find the largest sum of a nonempty contiguous subarray. The input must be nonempty; values may be negative.",
    "[-2,1,-3,4,-1,2,1,-5,4] returns 6.",
    { description: "Enumerate every start and extend the subarray to every possible end.", code: solution(`    public static long maximumSum(int[] a) {
        long best = Long.MIN_VALUE;
        for (int i = 0; i < a.length; i++) {
            long sum = 0;
            for (int j = i; j < a.length; j++) {
                sum += a[j];
                best = Math.max(best, sum);
            }
        }
        return best;
    }`) },
    "O(n²)", "O(1)",
    { description: "At each position, either extend the previous best-ending subarray or start anew.", code: solution(`    public static long maximumSum(int[] a) {
        if (a.length == 0) throw new IllegalArgumentException("Input must be nonempty");
        long ending = a[0], best = a[0];
        for (int i = 1; i < a.length; i++) {
            ending = Math.max(a[i], ending + a[i]);
            best = Math.max(best, ending);
        }
        return best;
    }`) },
    "O(n)", "O(1)"
  ),
  "maximum-product-subarray": worked(
    "Find the maximum product of a nonempty contiguous subarray. The input must be nonempty; values may be negative or zero.",
    "[2,3,-2,4] returns 6.",
    { description: "Enumerate all subarrays while accumulating their products.", code: solution(`    public static long maximumProduct(int[] a) {
        if (a.length == 0) throw new IllegalArgumentException("Input must be nonempty");
        long best = Long.MIN_VALUE;
        for (int i = 0; i < a.length; i++) {
            long product = 1;
            for (int j = i; j < a.length; j++) {
                product *= a[j];
                best = Math.max(best, product);
            }
        }
        return best;
    }`) },
    "O(n²)", "O(1)",
    { description: "Track both maximum and minimum products ending here, since a negative can swap their roles.", code: solution(`    public static long maximumProduct(int[] a) {
        if (a.length == 0) throw new IllegalArgumentException("Input must be nonempty");
        long maxEnd = a[0], minEnd = a[0], best = a[0];
        for (int i = 1; i < a.length; i++) {
            long x = a[i];
            if (x < 0) {
                long temp = maxEnd;
                maxEnd = minEnd;
                minEnd = temp;
            }
            maxEnd = Math.max(x, maxEnd * x);
            minEnd = Math.min(x, minEnd * x);
            best = Math.max(best, maxEnd);
        }
        return best;
    }`) },
    "O(n)", "O(1)"
  ),
  "longest-increasing-subsequence": worked(
    "Return the length of a strictly increasing subsequence; elements need not be adjacent.",
    "[10,9,2,5,3,7,101,18] returns 4.",
    { description: "For each position, recursively choose a later element greater than the last selected value.", code: solution(`    public static int length(int[] a) {
        return visit(a, 0, -1);
    }
    private static int visit(int[] a, int i, int previous) {
        if (i == a.length) return 0;
        int best = visit(a, i + 1, previous);
        if (previous < 0 || a[i] > a[previous])
            best = Math.max(best, 1 + visit(a, i + 1, i));
        return best;
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Maintain the smallest possible tail for an increasing subsequence of each length. Binary search replaces a tail.", code: solution(`    public static int length(int[] a) {
        int[] tails = new int[a.length];
        int size = 0;
        for (int x : a) {
            int lo = 0, hi = size;
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (tails[mid] < x) lo = mid + 1;
                else hi = mid;
            }
            tails[lo] = x;
            if (lo == size) size++;
        }
        return size;
    }`) },
    "O(n log n)", "O(n)"
  ),
  "number-of-ways-to-reach-target-score": worked(
    "Given question types (count, points), count ways to reach target by answering from 0 through count questions of each type. Types are independent and order does not matter. Assume the answer fits in long.",
    "Types [[6,1],[3,2],[2,3]], target 6 gives 7.",
    { description: "Choose an allowed count for each type and recurse on the remaining score.", code: solution(`    public static long ways(int[][] types, int target) {
        return visit(types, 0, target);
    }
    private static long visit(int[][] t, int i, int left) {
        if (left == 0) return 1;
        if (i == t.length) return 0;
        long total = 0;
        for (int count = 0; count <= t[i][0] && count * t[i][1] <= left; count++)
            total += visit(t, i + 1, left - count * t[i][1]);
        return total;
    }`) },
    "Product of all allowed per-type counts", "O(number of types) recursion depth",
    { description: "Process each type once and update sums downward so it is used at most its specified count.", code: solution(`    public static long ways(int[][] types, int target) {
        if (target < 0) return 0;
        long[] dp = new long[target + 1];
        dp[0] = 1;
        for (int[] type : types) {
            int count = type[0], points = type[1];
            if (count < 0 || points <= 0) throw new IllegalArgumentException("Invalid type");
            for (int repeat = 0; repeat < count; repeat++)
                for (int sum = target; sum >= points; sum--)
                    dp[sum] += dp[sum - points];
        }
        return dp[target];
    }`) },
    "O(target·sum(counts))", "O(target)"
  ),
  "minimum-jumps-to-reach-end": worked(
    "Each nonnegative array value is the maximum forward jump from that index. Return the fewest jumps to reach the final index, or -1 if unreachable. Empty and one-element inputs need 0 jumps.",
    "[2,3,1,1,4] returns 2.",
    { description: "Try every reachable next index recursively and choose the smallest number of jumps.", code: solution(`    public static int minimumJumps(int[] a) {
        if (a.length <= 1) return 0;
        int answer = visit(a, 0);
        return answer >= 1_000_000_000 ? -1 : answer;
    }
    private static int visit(int[] a, int i) {
        if (i >= a.length - 1) return 0;
        int best = 1_000_000_000;
        for (int next = i + 1; next < a.length && next <= (long) i + a[i]; next++)
            best = Math.min(best, 1 + visit(a, next));
        return best;
    }`) },
    "Exponential", "O(n) recursion stack",
    { description: "Expand reachable index ranges greedily. Each range boundary marks the farthest reach with one more jump.", code: solution(`    public static int minimumJumps(int[] a) {
        if (a.length <= 1) return 0;
        int jumps = 0, end = 0, farthest = 0;
        for (int i = 0; i < a.length - 1; i++) {
            if (a[i] < 0) throw new IllegalArgumentException("Jumps must be nonnegative");
            farthest = Math.max(farthest, (int) Math.min(a.length - 1L, (long) i + a[i]));
            if (i == end) {
                if (farthest == end) return -1;
                jumps++;
                end = farthest;
                if (end == a.length - 1) return jumps;
            }
        }
        return -1;
    }`) },
    "O(n)", "O(1)"
  ),
  "perfect-squares-minimum-count": worked(
    "Return the fewest perfect-square numbers that sum to nonnegative n. For n = 0, return 0.",
    "For n = 12, the answer is 3 (4 + 4 + 4).",
    { description: "Try every square no greater than the remaining value.", code: solution(`    public static int minimumCount(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be nonnegative");
        if (n == 0) return 0;
        int best = n;
        for (int x = 1; x * x <= n; x++)
            best = Math.min(best, 1 + minimumCount(n - x * x));
        return best;
    }`) },
    "Exponential in n", "O(n) recursion stack",
    { description: "For every value, try each square and retain the minimum count.", code: solution(`    public static int minimumCount(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be nonnegative");
        int[] dp = new int[n + 1];
        for (int value = 1; value <= n; value++) {
            dp[value] = value;
            for (int x = 1; x <= value / x; x++)
                dp[value] = Math.min(dp[value], 1 + dp[value - x * x]);
        }
        return dp[n];
    }`) },
    "O(n√n)", "O(n)"
  )
};
