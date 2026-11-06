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

export const dpGridsContent = {
  "unique-paths": worked(
    "Count paths from the top-left to the bottom-right of an m by n grid, moving only right or down. Assume positive dimensions and an answer that fits in long.",
    "For a 3 by 3 grid, the answer is 6.",
    { description: "Try both legal moves recursively. The recursion repeats many subproblems.", code: solution(`    public static long paths(int m, int n) {
        if (m <= 0 || n <= 0) return 0;
        if (m == 1 || n == 1) return 1;
        return paths(m - 1, n) + paths(m, n - 1);
    }`) },
    "O(2^(m+n))", "O(m+n) recursion stack",
    { description: "The number of paths is a binomial coefficient. Compute its multiplicative form using the smaller dimension.", code: solution(`    public static long paths(int m, int n) {
        if (m <= 0 || n <= 0) return 0;
        int k = Math.min(m - 1, n - 1);
        int total = m + n - 2;
        long answer = 1;
        for (int i = 1; i <= k; i++)
            answer = answer * (total - k + i) / i;
        return answer;
    }`) },
    "O(min(m,n))", "O(1)"
  ),
  "unique-paths-ii": worked(
    "Count right/down paths through a rectangular grid where 1 is blocked and 0 is open. Return 0 for an empty grid; assume the count fits in long.",
    "For [[0,0,0],[0,1,0],[0,0,0]], the answer is 2.",
    { description: "Explore both moves, returning zero on obstacles and at boundaries.", code: solution(`    public static long count(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) return 0;
        return visit(grid, 0, 0);
    }
    private static long visit(int[][] g, int r, int c) {
        if (r >= g.length || c >= g[0].length || g[r][c] == 1) return 0;
        if (r == g.length - 1 && c == g[0].length - 1) return 1;
        return visit(g, r + 1, c) + visit(g, r, c + 1);
    }`) },
    "O(2^(m+n))", "O(m+n) recursion stack",
    { description: "Keep one row of counts. Each open cell receives paths from above and from its left.", code: solution(`    public static long count(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) return 0;
        int n = grid[0].length;
        long[] dp = new long[n];
        dp[0] = grid[0][0] == 0 ? 1 : 0;
        for (int[] row : grid) {
            for (int c = 0; c < n; c++) {
                if (row[c] == 1) dp[c] = 0;
                else if (c > 0) dp[c] += dp[c - 1];
            }
        }
        return dp[n - 1];
    }`) },
    "O(mn)", "O(n)"
  ),
  "minimum-path-sum": worked(
    "Find the minimum sum of a top-left to bottom-right path, moving only right or down. Grid entries may be negative; return 0 for an empty grid.",
    "For [[1,3,1],[1,5,1],[4,2,1]], the minimum sum is 7.",
    { description: "Enumerate all paths and return the cheaper continuation.", code: solution(`    public static long minSum(int[][] g) {
        if (g.length == 0 || g[0].length == 0) return 0;
        return visit(g, 0, 0);
    }
    private static long visit(int[][] g, int r, int c) {
        if (r == g.length - 1 && c == g[0].length - 1) return g[r][c];
        long down = r + 1 < g.length ? visit(g, r + 1, c) : Long.MAX_VALUE / 4;
        long right = c + 1 < g[0].length ? visit(g, r, c + 1) : Long.MAX_VALUE / 4;
        return g[r][c] + Math.min(down, right);
    }`) },
    "O(2^(m+n))", "O(m+n) recursion stack",
    { description: "Use one row of dynamic programming values, updating left to right.", code: solution(`    public static long minSum(int[][] g) {
        if (g.length == 0 || g[0].length == 0) return 0;
        int n = g[0].length;
        long[] dp = new long[n];
        for (int r = 0; r < g.length; r++) {
            for (int c = 0; c < n; c++) {
                if (r == 0 && c == 0) dp[c] = g[r][c];
                else if (r == 0) dp[c] = dp[c - 1] + g[r][c];
                else if (c == 0) dp[c] += g[r][c];
                else dp[c] = g[r][c] + Math.min(dp[c], dp[c - 1]);
            }
        }
        return dp[n - 1];
    }`) },
    "O(mn)", "O(n)"
  ),
  "triangle-minimum-path-sum": worked(
    "Starting at the triangle's apex, choose an adjacent cell in the next row until the bottom. Return the minimum path sum; an empty triangle returns 0.",
    "For [[2],[3,4],[6,5,7],[4,1,8,3]], the minimum is 11.",
    { description: "Try both child positions recursively.", code: solution(`    public static long minimum(List<List<Integer>> t) {
        if (t.isEmpty()) return 0;
        return visit(t, 0, 0);
    }
    private static long visit(List<List<Integer>> t, int r, int c) {
        long value = t.get(r).get(c);
        if (r == t.size() - 1) return value;
        return value + Math.min(visit(t, r + 1, c), visit(t, r + 1, c + 1));
    }`) .replace("public class Solution {", "import java.util.List;\n\npublic class Solution {") },
    "O(2^n)", "O(n) recursion stack",
    { description: "Fold upward from the bottom row; each value becomes the best of its two children plus its own value.", code: `import java.util.List;

public class Solution {
    public static long minimum(List<List<Integer>> t) {
        if (t.isEmpty()) return 0;
        long[] dp = new long[t.get(t.size() - 1).size()];
        for (int c = 0; c < dp.length; c++) dp[c] = t.get(t.size() - 1).get(c);
        for (int r = t.size() - 2; r >= 0; r--)
            for (int c = 0; c <= r; c++)
                dp[c] = t.get(r).get(c) + Math.min(dp[c], dp[c + 1]);
        return dp[0];
    }
}` },
    "O(n²) total cells", "O(n) for bottom row"
  ),
  "maximum-falling-path-sum": worked(
    "From any cell in the first row, move to the next row in the same column or a diagonal column. Return the maximum sum; return 0 for an empty matrix.",
    "For [[1,2,3],[4,5,6],[7,8,9]], the maximum is 18.",
    { description: "Try each first-row starting point and recursively explore the three legal next columns.", code: solution(`    public static long maximum(int[][] a) {
        if (a.length == 0 || a[0].length == 0) return 0;
        long best = Long.MIN_VALUE;
        for (int c = 0; c < a[0].length; c++) best = Math.max(best, visit(a, 0, c));
        return best;
    }
    private static long visit(int[][] a, int r, int c) {
        if (c < 0 || c >= a[0].length) return Long.MIN_VALUE / 4;
        if (r == a.length - 1) return a[r][c];
        return a[r][c] + Math.max(visit(a, r + 1, c),
                Math.max(visit(a, r + 1, c - 1), visit(a, r + 1, c + 1)));
    }`) },
    "O(3^m n) upper bound", "O(m) recursion stack",
    { description: "Store the previous row's best totals; invalid diagonals are simply omitted.", code: solution(`    public static long maximum(int[][] a) {
        if (a.length == 0 || a[0].length == 0) return 0;
        int n = a[0].length;
        long[] dp = new long[n];
        for (int c = 0; c < n; c++) dp[c] = a[0][c];
        for (int r = 1; r < a.length; r++) {
            long[] next = new long[n];
            for (int c = 0; c < n; c++) {
                long best = dp[c];
                if (c > 0) best = Math.max(best, dp[c - 1]);
                if (c + 1 < n) best = Math.max(best, dp[c + 1]);
                next[c] = a[r][c] + best;
            }
            dp = next;
        }
        long answer = Long.MIN_VALUE;
        for (long value : dp) answer = Math.max(answer, value);
        return answer;
    }`) },
    "O(mn)", "O(n)"
  ),
  "cherry-pickup": worked(
    "Two robots start at the top-left and top-right cells, move down one row per step, and may shift columns by -1, 0, or 1. Maximize collected values; a cell occupied by both robots is counted once. Return 0 for an empty grid.",
    "For [[3,1,1],[2,5,1],[1,5,5],[2,1,1]], the maximum is 24.",
    { description: "Try all nine pairs of next moves at every row. Memoization is omitted to show the direct recurrence.", code: solution(`    public static long collect(int[][] g) {
        if (g.length == 0 || g[0].length == 0) return 0;
        return visit(g, 0, 0, g[0].length - 1);
    }
    private static long visit(int[][] g, int r, int c1, int c2) {
        if (c1 < 0 || c2 < 0 || c1 >= g[0].length || c2 >= g[0].length)
            return Long.MIN_VALUE / 4;
        long gain = g[r][c1] + (c1 == c2 ? 0 : g[r][c2]);
        if (r == g.length - 1) return gain;
        long best = Long.MIN_VALUE / 4;
        for (int d1 = -1; d1 <= 1; d1++)
            for (int d2 = -1; d2 <= 1; d2++)
                best = Math.max(best, visit(g, r + 1, c1 + d1, c2 + d2));
        return gain + best;
    }`) },
    "O(9^m)", "O(m) recursion stack",
    { description: "Use a rolling two-dimensional DP indexed by both robot columns.", code: solution(`    public static long collect(int[][] g) {
        if (g.length == 0 || g[0].length == 0) return 0;
        int m = g.length, n = g[0].length;
        long[][] dp = new long[n][n];
        for (int a = 0; a < n; a++) for (int b = 0; b < n; b++)
            dp[a][b] = Long.MIN_VALUE / 4;
        dp[0][n - 1] = g[0][0] + (n == 1 ? 0 : g[0][n - 1]);
        for (int r = 1; r < m; r++) {
            long[][] next = new long[n][n];
            for (int a = 0; a < n; a++) for (int b = 0; b < n; b++)
                next[a][b] = Long.MIN_VALUE / 4;
            for (int a = 0; a < n; a++) for (int b = 0; b < n; b++) {
                if (dp[a][b] <= Long.MIN_VALUE / 8) continue;
                for (int d1 = -1; d1 <= 1; d1++) for (int d2 = -1; d2 <= 1; d2++) {
                    int x = a + d1, y = b + d2;
                    if (x >= 0 && x < n && y >= 0 && y < n) {
                        long gain = g[r][x] + (x == y ? 0 : g[r][y]);
                        next[x][y] = Math.max(next[x][y], dp[a][b] + gain);
                    }
                }
            }
            dp = next;
        }
        long answer = Long.MIN_VALUE;
        for (long[] row : dp) for (long v : row) answer = Math.max(answer, v);
        return answer;
    }`) },
    "O(mn²)", "O(n²)"
  ),
  "zero-one-knapsack": worked(
    "Given nonnegative item weights, values, and capacity, choose each item at most once to maximize value without exceeding capacity. Arrays must have equal length.",
    "Weights [1,3,4], values [15,20,30], capacity 4 gives 35.",
    { description: "For each item, branch between skipping and taking it when it fits.", code: solution(`    public static long maxValue(int[] w, int[] v, int cap) {
        return visit(w, v, w.length, cap);
    }
    private static long visit(int[] w, int[] v, int i, int cap) {
        if (i == 0) return 0;
        long best = visit(w, v, i - 1, cap);
        if (w[i - 1] <= cap)
            best = Math.max(best, v[i - 1] + visit(w, v, i - 1, cap - w[i - 1]));
        return best;
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Update capacities downward so an item cannot be reused in the same iteration.", code: solution(`    public static long maxValue(int[] w, int[] v, int cap) {
        long[] dp = new long[cap + 1];
        for (int i = 0; i < w.length; i++)
            for (int c = cap; c >= w[i]; c--)
                dp[c] = Math.max(dp[c], dp[c - w[i]] + v[i]);
        return dp[cap];
    }`) },
    "O(n·capacity)", "O(capacity)"
  ),
  "unbounded-knapsack": worked(
    "Each item may be selected any number of times. Maximize value within a nonnegative capacity; weights must be positive.",
    "Weights [2,3], values [4,5], capacity 7 gives 14.",
    { description: "At each state either skip the current type or take it and stay at that type.", code: solution(`    public static long maxValue(int[] w, int[] v, int cap) {
        return visit(w, v, w.length, cap);
    }
    private static long visit(int[] w, int[] v, int n, int cap) {
        if (n == 0) return 0;
        long best = visit(w, v, n - 1, cap);
        if (w[n - 1] <= cap)
            best = Math.max(best, v[n - 1] + visit(w, v, n, cap - w[n - 1]));
        return best;
    }`) },
    "Exponential in capacity / item choices", "O(capacity + n) stack on a branch",
    { description: "Iterate capacities upward; a just-updated state allows reuse of the current item.", code: solution(`    public static long maxValue(int[] w, int[] v, int cap) {
        long[] dp = new long[cap + 1];
        for (int i = 0; i < w.length; i++)
            for (int c = w[i]; c <= cap; c++)
                dp[c] = Math.max(dp[c], dp[c - w[i]] + v[i]);
        return dp[cap];
    }`) },
    "O(n·capacity)", "O(capacity)"
  ),
  "coin-change-minimum-coins": worked(
    "Return the fewest unlimited coins needed to make amount; return -1 if impossible. Denominations must be positive and amount nonnegative.",
    "Coins [1,2,5], amount 11 returns 3.",
    { description: "Recursively try every coin, using a large sentinel for unreachable amounts.", code: solution(`    public static int minimum(int[] coins, int amount) {
        if (amount < 0) return -1;
        int answer = visit(coins, amount);
        return answer >= 1_000_000_000 ? -1 : answer;
    }
    private static int visit(int[] coins, int left) {
        if (left == 0) return 0;
        int best = 1_000_000_000;
        for (int coin : coins) if (coin > 0 && coin <= left)
            best = Math.min(best, 1 + visit(coins, left - coin));
        return best;
    }`) },
    "Exponential in amount", "O(amount) maximum recursion depth",
    { description: "Build the minimum coin count for every smaller amount.", code: solution(`    public static int minimum(int[] coins, int amount) {
        if (amount < 0) return -1;
        int[] dp = new int[amount + 1];
        java.util.Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++)
            for (int coin : coins) if (coin > 0 && coin <= a)
                dp[a] = Math.min(dp[a], dp[a - coin] + 1);
        return dp[amount] > amount ? -1 : dp[amount];
    }`) },
    "O(amount·numberOfCoins)", "O(amount)"
  ),
  "coin-change-combinations": worked(
    "Count combinations (order does not matter) that make amount using unlimited distinct positive denominations. Assume the answer fits in long.",
    "Coins [1,2,5], amount 5 has 4 combinations.",
    { description: "For each denomination, branch on taking another coin or moving to the next denomination.", code: solution(`    public static long ways(int[] coins, int amount) {
        return visit(coins, 0, amount);
    }
    private static long visit(int[] c, int i, int left) {
        if (left == 0) return 1;
        if (i == c.length || left < 0) return 0;
        return visit(c, i, left - c[i]) + visit(c, i + 1, left);
    }`) },
    "Exponential in amount", "O(amount + numberOfCoins) recursion depth",
    { description: "Process one coin type at a time; ascending amounts allow unlimited copies and avoid order duplicates.", code: solution(`    public static long ways(int[] coins, int amount) {
        long[] dp = new long[amount + 1];
        dp[0] = 1;
        for (int coin : coins) {
            if (coin <= 0) throw new IllegalArgumentException("Coins must be positive");
            for (int a = coin; a <= amount; a++) dp[a] += dp[a - coin];
        }
        return dp[amount];
    }`) },
    "O(numberOfCoins·amount)", "O(amount)"
  ),
  "subset-sum": worked(
    "Return whether any subset of nonnegative integers sums to target. Target must be nonnegative.",
    "[3, 34, 4, 12, 5, 2], target 9 returns true.",
    { description: "Branch on including or excluding each value.", code: solution(`    public static boolean exists(int[] a, int target) {
        return visit(a, 0, target);
    }
    private static boolean visit(int[] a, int i, int left) {
        if (left == 0) return true;
        if (i == a.length || left < 0) return false;
        return visit(a, i + 1, left - a[i]) || visit(a, i + 1, left);
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Use a boolean reachability table, scanning downward to prevent reusing an element.", code: solution(`    public static boolean exists(int[] a, int target) {
        if (target < 0) return false;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int value : a) {
            if (value < 0) throw new IllegalArgumentException("Values must be nonnegative");
            for (int s = target; s >= value; s--) dp[s] |= dp[s - value];
        }
        return dp[target];
    }`) },
    "O(n·target)", "O(target)"
  ),
  "partition-equal-subset-sum": worked(
    "Determine whether nonnegative integers can be split into two subsets with equal sums. An odd total cannot be split equally.",
    "[1,5,11,5] returns true.",
    { description: "Try all include/exclude choices until one subset reaches half the total.", code: solution(`    public static boolean canPartition(int[] a) {
        long sum = 0;
        for (int x : a) sum += x;
        if ((sum & 1) != 0) return false;
        return visit(a, 0, (int) (sum / 2));
    }
    private static boolean visit(int[] a, int i, int left) {
        if (left == 0) return true;
        if (i == a.length || left < 0) return false;
        return visit(a, i + 1, left - a[i]) || visit(a, i + 1, left);
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Reduce the problem to subset-sum for half of the total.", code: solution(`    public static boolean canPartition(int[] a) {
        long total = 0;
        for (int x : a) {
            if (x < 0) throw new IllegalArgumentException("Values must be nonnegative");
            total += x;
        }
        if ((total & 1) != 0) return false;
        int target = (int) (total / 2);
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int x : a)
            for (int s = target; s >= x; s--) dp[s] |= dp[s - x];
        return dp[target];
    }`) },
    "O(n·total)", "O(total)"
  ),
  "count-subsets-with-given-sum": worked(
    "Count index-distinct subsets of nonnegative integers whose sum equals target. Assume the count fits in long; zero-valued elements create distinct choices.",
    "[0,0,1], target 1 returns 4.",
    { description: "Branch for each element, including or excluding it.", code: solution(`    public static long count(int[] a, int target) {
        return visit(a, 0, target);
    }
    private static long visit(int[] a, int i, int left) {
        if (i == a.length) return left == 0 ? 1 : 0;
        return visit(a, i + 1, left) + (a[i] <= left ? visit(a, i + 1, left - a[i]) : 0);
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Count ways per sum and scan downward for 0/1 selection. A zero doubles every reachable count.", code: solution(`    public static long count(int[] a, int target) {
        if (target < 0) return 0;
        long[] dp = new long[target + 1];
        dp[0] = 1;
        for (int x : a) {
            if (x < 0) throw new IllegalArgumentException("Values must be nonnegative");
            for (int s = target; s >= x; s--) dp[s] += dp[s - x];
        }
        return dp[target];
    }`) },
    "O(n·target)", "O(target)"
  ),
  "target-sum": worked(
    "Assign + or - to every integer and count assignments that total target. Assume the answer fits in long.",
    "[1,1,1,1,1], target 3 returns 5.",
    { description: "Explore both signs for every index.", code: solution(`    public static long count(int[] a, int target) {
        return visit(a, 0, target);
    }
    private static long visit(int[] a, int i, int left) {
        if (i == a.length) return left == 0 ? 1 : 0;
        return visit(a, i + 1, left - a[i]) + visit(a, i + 1, left + a[i]);
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Transform to subset sum: chosen-positive subset sum is (total + target)/2, when feasible.", code: solution(`    public static long count(int[] a, int target) {
        long total = 0;
        for (int x : a) {
            if (x < 0) throw new IllegalArgumentException("Values must be nonnegative");
            total += x;
        }
        long numerator = total + target;
        if (Math.abs((long) target) > total || (numerator & 1) != 0) return 0;
        int wanted = (int) (numerator / 2);
        long[] dp = new long[wanted + 1];
        dp[0] = 1;
        for (int x : a)
            for (int s = wanted; s >= x; s--) dp[s] += dp[s - x];
        return dp[wanted];
    }`) },
    "O(n·(total+target)/2)", "O((total+target)/2)"
  ),
  "minimum-subset-sum-difference": worked(
    "Split nonnegative integers into two subsets to minimize the absolute difference of their sums. Return 0 for an empty input.",
    "[1,6,11,5] has minimum difference 1.",
    { description: "Enumerate subsets and compare each sum with the remaining total.", code: solution(`    public static long minimumDifference(int[] a) {
        long total = 0;
        for (int x : a) total += x;
        return visit(a, 0, 0, total);
    }
    private static long visit(int[] a, int i, long chosen, long total) {
        if (i == a.length) return Math.abs(total - 2 * chosen);
        return Math.min(visit(a, i + 1, chosen + a[i], total),
                        visit(a, i + 1, chosen, total));
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Track reachable sums up to half the total; the largest reachable value is closest to half.", code: solution(`    public static long minimumDifference(int[] a) {
        long total = 0;
        for (int x : a) {
            if (x < 0) throw new IllegalArgumentException("Values must be nonnegative");
            total += x;
        }
        int half = (int) (total / 2);
        boolean[] dp = new boolean[half + 1];
        dp[0] = true;
        for (int x : a)
            for (int s = half; s >= x; s--) dp[s] |= dp[s - x];
        for (int s = half; s >= 0; s--)
            if (dp[s]) return total - 2L * s;
        return total;
    }`) },
    "O(n·total)", "O(total)"
  ),
  "rod-cutting": worked(
    "Given prices where price[i] is the value of a piece of length i+1, maximize revenue by cutting a rod of the given length. Pieces may repeat; prices must cover all lengths.",
    "Prices [2,5,7,8], length 4 gives 10 (two length-2 pieces).",
    { description: "Try every first cut and recursively sell the remainder.", code: solution(`    public static long maximumRevenue(int[] price, int length) {
        if (length == 0) return 0;
        long best = Long.MIN_VALUE;
        for (int cut = 1; cut <= length; cut++)
            best = Math.max(best, price[cut - 1] + maximumRevenue(price, length - cut));
        return best;
    }`) },
    "O(2^length)", "O(length) recursion stack",
    { description: "Solve lengths in ascending order; each first-cut size can be reused.", code: solution(`    public static long maximumRevenue(int[] price, int length) {
        long[] dp = new long[length + 1];
        for (int len = 1; len <= length; len++)
            for (int cut = 1; cut <= len; cut++)
                dp[len] = Math.max(dp[len], price[cut - 1] + dp[len - cut]);
        return dp[length];
    }`) },
    "O(length²)", "O(length)"
  ),
  "matrix-chain-multiplication": worked(
    "Given dimensions d[0..n], find the minimum scalar multiplications to multiply matrices A_i of size d[i-1] by d[i]. Dimensions are positive.",
    "For dimensions [10,30,5,60], the minimum cost is 4500.",
    { description: "Try every split point recursively; this intentionally recomputes intervals.", code: solution(`    public static long minimumCost(int[] d) {
        int n = d.length - 1;
        if (n < 2) return 0;
        return cost(d, 1, n);
    }
    private static long cost(int[] d, int left, int right) {
        if (left == right) return 0;
        long best = Long.MAX_VALUE;
        for (int k = left; k < right; k++)
            best = Math.min(best, cost(d, left, k) + cost(d, k + 1, right)
                    + (long) d[left - 1] * d[k] * d[right]);
        return best;
    }`) },
    "Exponential in number of matrices", "O(n) recursion stack",
    { description: "Fill interval costs by increasing chain length.", code: solution(`    public static long minimumCost(int[] d) {
        int n = d.length - 1;
        if (n < 2) return 0;
        long[][] dp = new long[n + 1][n + 1];
        for (int len = 2; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = Long.MAX_VALUE;
                for (int k = i; k < j; k++)
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j]
                            + (long) d[i - 1] * d[k] * d[j]);
            }
        return dp[1][n];
    }`) },
    "O(n³)", "O(n²)"
  ),
  "burst-balloons": worked(
    "Burst balloons in any order; bursting i earns leftValue * nums[i] * rightValue, using 1 outside the array. Return the maximum coins. Assume nonnegative values.",
    "[3,1,5,8] returns 167.",
    { description: "Choose the first balloon to burst and recursively process the resulting two sides.", code: solution(`    public static long maxCoins(int[] nums) {
        return visit(nums, 0, nums.length - 1, 1, 1);
    }
    private static long visit(int[] a, int l, int r, int left, int right) {
        if (l > r) return 0;
        long best = 0;
        for (int i = l; i <= r; i++)
            best = Math.max(best, (long) left * a[i] * right
                    + visit(a, l, i - 1, left, a[i])
                    + visit(a, i + 1, r, a[i], right));
        return best;
    }`) },
    "O(n!) or worse with repeated subproblems", "O(n) recursion stack",
    { description: "Pad with boundary ones and choose each interval's last balloon. Subintervals then become independent.", code: solution(`    public static long maxCoins(int[] nums) {
        int n = nums.length;
        long[] a = new long[n + 2];
        a[0] = a[n + 1] = 1;
        for (int i = 0; i < n; i++) a[i + 1] = nums[i];
        long[][] dp = new long[n + 2][n + 2];
        for (int len = 1; len <= n; len++)
            for (int l = 1; l + len - 1 <= n; l++) {
                int r = l + len - 1;
                for (int last = l; last <= r; last++)
                    dp[l][r] = Math.max(dp[l][r],
                            dp[l][last - 1] + a[l - 1] * a[last] * a[r + 1] + dp[last + 1][r]);
            }
        return dp[1][n];
    }`) },
    "O(n³)", "O(n²)"
  )
};
