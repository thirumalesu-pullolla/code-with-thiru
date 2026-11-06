const worked = (problem, example, bruteIdea, bruteCode, bruteTime, bruteSpace, optimizedIdea, optimizedCode, optimizedTime, optimizedSpace) =>
  `## Problem statement

${problem}

## Example

${example}

## Brute-force approach

${bruteIdea}

\`\`\`java
${bruteCode}
\`\`\`

- **Time:** ${bruteTime}
- **Extra space:** ${bruteSpace}

## Optimized approach

${optimizedIdea}

\`\`\`java
${optimizedCode}
\`\`\`

- **Time:** ${optimizedTime}
- **Extra space:** ${optimizedSpace}`;

export const greedyContent = {
  "activity-selection": worked(
    "Given equal-length start and finish arrays, return the maximum number of mutually non-overlapping activities. An activity may start when another finishes.",
    "`start = [1, 3, 0, 5, 8, 5]`, `finish = [2, 4, 6, 7, 9, 9]` returns `4`.",
    "Enumerate all subsets and keep the largest compatible subset.",
    String.raw`public class Solution {
    public static int maximumActivities(int[] start, int[] finish) {
        int n = start.length, best = 0;
        if (n > 25) throw new IllegalArgumentException("brute force limited to 25");
        for (int mask = 0; mask < (1 << n); mask++) {
            int count = 0; boolean valid = true;
            for (int i = 0; i < n && valid; i++) if ((mask & (1 << i)) != 0) {
                for (int j = i + 1; j < n; j++) if ((mask & (1 << j)) != 0 &&
                    !(finish[i] <= start[j] || finish[j] <= start[i])) { valid = false; break; }
                count++;
            }
            if (valid) best = Math.max(best, count);
        }
        return best;
    }
}`,
    "O(2^n n²)", "O(1)",
    "Sort by finish time and repeatedly take the next activity that starts at or after the last finish.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int maximumActivities(int[] start, int[] finish) {
        if (start.length != finish.length) throw new IllegalArgumentException();
        int n = start.length; int[][] a = new int[n][2];
        for (int i = 0; i < n; i++) { a[i][0] = start[i]; a[i][1] = finish[i]; }
        Arrays.sort(a, (x, y) -> Integer.compare(x[1], y[1]));
        int count = 0, end = Integer.MIN_VALUE;
        for (int[] x : a) if (x[0] >= end) { count++; end = x[1]; }
        return count;
    }
}`,
    "O(n log n)", "O(n) for sorting copy"
  ),
  "fractional-knapsack": worked(
    "Given positive item weights and values and a non-negative capacity, return the maximum value when any item may be split.",
    "`weights = [10, 20, 30]`, `values = [60, 100, 120]`, capacity `50` returns `240.0`.",
    "Enumerate every subset of whole items and every possible next fractional item. An optimum has whole items plus at most one partial item.",
    String.raw`public class Solution {
    public static double maxValue(int[] w, int[] v, int cap) {
        int n = w.length; if (n > 25) throw new IllegalArgumentException();
        double best = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            long used = 0, value = 0;
            for (int i = 0; i < n; i++) if ((mask & (1 << i)) != 0) { used += w[i]; value += v[i]; }
            if (used > cap) continue;
            best = Math.max(best, value);
            for (int i = 0; i < n; i++) if ((mask & (1 << i)) == 0 && w[i] > 0) {
                best = Math.max(best, value + (double) v[i] * Math.min(w[i], cap - used) / w[i]);
            }
        }
        return best;
    }
}`,
    "O(2^n n)", "O(1)",
    "Sort by value-to-weight ratio descending and take each item whole or take the remaining fraction.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static double maxValue(int[] w, int[] v, int cap) {
        int n = w.length; Integer[] ids = new Integer[n];
        for (int i = 0; i < n; i++) ids[i] = i;
        Arrays.sort(ids, (a, b) -> Double.compare((double)v[b] / w[b], (double)v[a] / w[a]));
        double total = 0;
        for (int i : ids) {
            if (cap == 0) break;
            int take = Math.min(cap, w[i]); total += (double)v[i] * take / w[i]; cap -= take;
        }
        return total;
    }
}`,
    "O(n log n)", "O(n)"
  ),
  "job-sequencing-deadlines": worked(
    "Each unit-time job has a deadline and profit. Schedule jobs in integer slots starting at 1, before or on their deadlines, to maximize profit. Return the maximum profit.",
    "`deadlines = [2, 1, 2, 1, 3]`, `profits = [100, 19, 27, 25, 15]` returns `142`.",
    "Try every assignment of each job to an available slot up to its deadline, or skip it.",
    String.raw`public class Solution {
    private static long dfs(int i, int[] d, int[] p, boolean[] used) {
        if (i == d.length) return 0;
        long best = dfs(i + 1, d, p, used);
        for (int t = 1; p[i] > 0 && t <= d[i] && t < used.length; t++) if (!used[t]) {
            used[t] = true; best = Math.max(best, p[i] + dfs(i + 1, d, p, used)); used[t] = false;
        }
        return best;
    }
    public static long maxProfit(int[] d, int[] p) {
        if (d.length != p.length) throw new IllegalArgumentException();
        int max = 0; for (int x : d) max = Math.max(max, x);
        return dfs(0, d, p, new boolean[Math.min(max, d.length) + 1]);
    }
}`,
    "O((n + 1)^n) upper bound", "O(n + min(n, maxDeadline))",
    "Sort jobs by descending profit and place each in the latest still-free slot no later than its deadline.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static long maxProfit(int[] d, int[] p) {
        if (d.length != p.length) throw new IllegalArgumentException();
        int n = d.length; int[][] jobs = new int[n][2];
        for (int i = 0; i < n; i++) { jobs[i][0] = p[i]; jobs[i][1] = d[i]; }
        Arrays.sort(jobs, (a, b) -> Integer.compare(b[0], a[0]));
        boolean[] used = new boolean[n + 1]; long total = 0;
        for (int[] j : jobs) if (j[0] > 0) for (int t = Math.min(n, j[1]); t >= 1; t--)
            if (!used[t]) { used[t] = true; total += j[0]; break; }
        return total;
    }
}`,
    "O(n log n + n²)", "O(n)"
  ),
  "assign-cookies": worked(
    "Each child has a minimum accepted cookie size and each cookie has a size. Assign each cookie to at most one child and maximize satisfied children.",
    "`greed = [1, 2, 3]`, `cookies = [1, 1]` returns `2`.",
    "For every child, try leaving them unsatisfied or assigning any unused cookie that meets their need.",
    String.raw`public class Solution {
    private static int dfs(int i, int[] g, int[] s, boolean[] used) {
        if (i == g.length) return 0;
        int best = dfs(i + 1, g, s, used);
        for (int j = 0; j < s.length; j++) if (!used[j] && s[j] >= g[i]) {
            used[j] = true; best = Math.max(best, 1 + dfs(i + 1, g, s, used)); used[j] = false;
        }
        return best;
    }
    public static int maximumSatisfied(int[] greed, int[] cookies) {
        return dfs(0, greed, cookies, new boolean[cookies.length]);
    }
}`,
    "O((m + 1)^n)", "O(n + m)",
    "Sort both arrays and give the smallest adequate remaining cookie to the least-demanding child.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int maximumSatisfied(int[] greed, int[] cookies) {
        int[] g = greed.clone(), s = cookies.clone(); Arrays.sort(g); Arrays.sort(s);
        int i = 0, j = 0;
        while (i < g.length && j < s.length) { if (s[j] >= g[i]) i++; j++; }
        return i;
    }
}`,
    "O(n log n + m log m)", "O(n + m) for sorted copies"
  ),
  "jump-game": worked(
    "Each array value is the maximum forward jump from that index. Return whether the last index is reachable from index zero. An empty array is not reachable.",
    "`[2, 3, 1, 1, 4]` returns `true`; `[3, 2, 1, 0, 4]` returns `false`.",
    "Mark every index reachable from any already-reachable index.",
    String.raw`public class Solution {
    public static boolean canReach(int[] a) {
        if (a.length == 0) return false;
        boolean[] reach = new boolean[a.length]; reach[0] = true;
        for (int i = 0; i < a.length; i++) if (reach[i])
            for (int j = i + 1; j < a.length && (long)j <= (long)i + a[i]; j++) reach[j] = true;
        return reach[a.length - 1];
    }
}`,
    "O(n²)", "O(n)",
    "Maintain the farthest index reachable so far; a gap beyond it is unreachable.",
    String.raw`public class Solution {
    public static boolean canReach(int[] a) {
        if (a.length == 0) return false;
        long farthest = 0;
        for (int i = 0; i < a.length && i <= farthest; i++)
            farthest = Math.max(farthest, (long)i + a[i]);
        return farthest >= a.length - 1;
    }
}`,
    "O(n)", "O(1)"
  ),
  "jump-game-ii": worked(
    "Each value is the maximum forward jump. Return the minimum jumps to reach the last index, or -1 if impossible. The one-element array needs zero jumps.",
    "`[2, 3, 1, 1, 4]` returns `2`.",
    "Use dynamic programming: for every reachable index, relax every index it can reach.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int minJumps(int[] a) {
        if (a.length == 0) return -1;
        int[] dp = new int[a.length]; Arrays.fill(dp, Integer.MAX_VALUE); dp[0] = 0;
        for (int i = 0; i < a.length; i++) if (dp[i] != Integer.MAX_VALUE)
            for (int j = i + 1; j < a.length && (long)j <= (long)i + a[i]; j++)
                dp[j] = Math.min(dp[j], dp[i] + 1);
        return dp[a.length - 1] == Integer.MAX_VALUE ? -1 : dp[a.length - 1];
    }
}`,
    "O(n²)", "O(n)",
    "Scan the reachable interval layer by layer. Each layer is the set of indices reachable in the current number of jumps.",
    String.raw`public class Solution {
    public static int minJumps(int[] a) {
        if (a.length == 0) return -1;
        int jumps = 0, end = 0; long farthest = 0;
        for (int i = 0; i < a.length - 1; i++) {
            if (i > farthest) return -1;
            farthest = Math.max(farthest, (long)i + a[i]);
            if (i == end) {
                if (farthest == end) return -1;
                jumps++; end = (int)Math.min(farthest, a.length - 1);
                if (end == a.length - 1) return jumps;
            }
        }
        return 0;
    }
}`,
    "O(n)", "O(1)"
  ),
  "gas-station": worked(
    "For equal-length circular gas and cost arrays, return a valid starting station index or -1. Assume gas and costs are non-negative.",
    "`gas = [1, 2, 3, 4, 5]`, `cost = [3, 4, 5, 1, 2]` returns `3`.",
    "Simulate the complete trip from every possible start.",
    String.raw`public class Solution {
    public static int startIndex(int[] gas, int[] cost) {
        if (gas.length != cost.length) throw new IllegalArgumentException();
        int n = gas.length;
        for (int s = 0; s < n; s++) {
            long fuel = 0; int j = 0;
            while (j < n) { int i = (s + j) % n; fuel += gas[i] - (long)cost[i]; if (fuel < 0) break; j++; }
            if (j == n) return s;
        }
        return -1;
    }
}`,
    "O(n²)", "O(1)",
    "If total net fuel is non-negative, a solution exists. When a running trip from the current candidate fails, skip all starts through that station.",
    String.raw`public class Solution {
    public static int startIndex(int[] gas, int[] cost) {
        if (gas.length != cost.length) throw new IllegalArgumentException();
        long total = 0, tank = 0; int start = 0;
        for (int i = 0; i < gas.length; i++) {
            long delta = gas[i] - (long)cost[i]; total += delta; tank += delta;
            if (tank < 0) { start = i + 1; tank = 0; }
        }
        return total < 0 || start == gas.length ? -1 : start;
    }
}`,
    "O(n)", "O(1)"
  ),
  "candy-distribution": worked(
    "Give every child at least one candy. A child with a higher rating than an adjacent child must receive more candies. Return the minimum total.",
    "`ratings = [1, 0, 2]` returns `5`.",
    "Start with one candy each and repeatedly raise any child whose candies do not satisfy a neighbor constraint. Values only increase, reaching the component-wise minimum valid assignment.",
    String.raw`public class Solution {
    public static long minimumCandies(int[] r) {
        int n = r.length; long[] c = new long[n]; java.util.Arrays.fill(c, 1);
        boolean changed;
        do {
            changed = false;
            for (int i = 1; i < n; i++) if (r[i] > r[i-1] && c[i] <= c[i-1]) { c[i] = c[i-1] + 1; changed = true; }
            for (int i = n - 2; i >= 0; i--) if (r[i] > r[i+1] && c[i] <= c[i+1]) { c[i] = c[i+1] + 1; changed = true; }
        } while (changed);
        long sum = 0; for (long x : c) sum += x; return sum;
    }
}`,
    "O(n²) worst case", "O(n)",
    "A left-to-right pass enforces rising slopes; a right-to-left pass enforces falling slopes. Sum the larger requirement at each position.",
    String.raw`public class Solution {
    public static long minimumCandies(int[] r) {
        int n = r.length; if (n == 0) return 0;
        int[] left = new int[n]; java.util.Arrays.fill(left, 1);
        for (int i = 1; i < n; i++) if (r[i] > r[i-1]) left[i] = left[i-1] + 1;
        long sum = left[n-1]; int right = 1;
        for (int i = n - 2; i >= 0; i--) {
            right = r[i] > r[i+1] ? right + 1 : 1;
            sum += Math.max(left[i], right);
        }
        return sum;
    }
}`,
    "O(n)", "O(n)"
  ),
  "partition-labels": worked(
    "Split a string into the maximum number of contiguous parts so each character occurs in at most one part. Return the part lengths.",
    "`\"ababcbacadefegdehijhklij\"` returns `[9, 7, 8]`.",
    "From each partition start, extend its end until every character inside has no occurrence beyond the end.",
    String.raw`import java.util.ArrayList;
import java.util.List;
public class Solution {
    public static List<Integer> partitionLengths(String s) {
        List<Integer> out = new ArrayList<>(); int start = 0;
        while (start < s.length()) {
            int end = start;
            for (int i = start; i <= end; i++) end = Math.max(end, s.lastIndexOf(s.charAt(i)));
            out.add(end - start + 1); start = end + 1;
        }
        return out;
    }
}`,
    "O(n²)", "O(n) for output",
    "Record each character's last occurrence. A partition closes when the scan reaches the furthest last occurrence of all characters seen so far.",
    String.raw`import java.util.ArrayList;
import java.util.List;
public class Solution {
    public static List<Integer> partitionLengths(String s) {
        int[] last = new int[Character.MAX_VALUE + 1];
        for (int i = 0; i < s.length(); i++) last[s.charAt(i)] = i;
        List<Integer> out = new ArrayList<>(); int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            end = Math.max(end, last[s.charAt(i)]);
            if (i == end) { out.add(end - start + 1); start = i + 1; }
        }
        return out;
    }
}`,
    "O(n + alphabet size)", "O(alphabet size + output)"
  ),
  "non-overlapping-intervals": worked(
    "Remove the fewest intervals so the remainder do not overlap. Intervals that touch at an endpoint are non-overlapping.",
    "`[[1,2], [2,3], [3,4], [1,3]]` requires `1` removal.",
    "Enumerate subsets, retain the largest compatible subset, and subtract its size from the total.",
    String.raw`public class Solution {
    public static int minimumRemovals(int[][] a) {
        int n = a.length; if (n > 25) throw new IllegalArgumentException();
        int best = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            boolean ok = true; int count = Integer.bitCount(mask);
            for (int i = 0; i < n && ok; i++) if ((mask & (1 << i)) != 0)
                for (int j = i + 1; j < n; j++) if ((mask & (1 << j)) != 0 &&
                    a[i][0] < a[j][1] && a[j][0] < a[i][1]) { ok = false; break; }
            if (ok) best = Math.max(best, count);
        }
        return n - best;
    }
}`,
    "O(2^n n²)", "O(1)",
    "Keep the maximum number of intervals by sorting on end time and selecting each interval whose start is at least the previous end.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int minimumRemovals(int[][] a) {
        int[][] x = a.clone(); Arrays.sort(x, (p, q) -> Integer.compare(p[1], q[1]));
        int kept = 0; long end = Long.MIN_VALUE;
        for (int[] v : x) if (v[0] >= end) { kept++; end = v[1]; }
        return a.length - kept;
    }
}`,
    "O(n log n)", "O(n) for sorted copy"
  ),
  "minimum-arrows-burst-balloons": worked(
    "Each closed interval is a balloon. Return the fewest x-coordinates whose points lie in every interval.",
    "`[[10,16], [2,8], [1,6], [7,12]]` returns `2`.",
    "Any optimal arrow can be moved to an endpoint of a balloon without losing coverage. Enumerate subsets of all endpoints and find the smallest covering set.",
    String.raw`public class Solution {
    public static int minimumArrows(int[][] a) {
        int n = a.length; if (n == 0) return 0;
        if (n > 15) throw new IllegalArgumentException();
        long[] points = new long[2*n];
        for (int i=0;i<n;i++) { points[2*i]=a[i][0]; points[2*i+1]=a[i][1]; }
        int best=n;
        for (int mask=1; mask<(1<<(2*n)); mask++) {
            int count=Integer.bitCount(mask); if (count>=best) continue;
            boolean all=true;
            for (int[] v:a) { boolean hit=false; for(int j=0;j<2*n;j++)
                if((mask&(1<<j))!=0 && points[j]>=v[0] && points[j]<=v[1]) { hit=true; break; }
                if(!hit) { all=false; break; } }
            if(all) best=count;
        }
        return best;
    }
}`,
    "O(2^(2n) n²)", "O(n)",
    "Sort balloons by right endpoint. Shoot at the right endpoint of the first unburst balloon.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int minimumArrows(int[][] a) {
        if (a.length == 0) return 0;
        int[][] x=a.clone(); Arrays.sort(x,(p,q)->Integer.compare(p[1],q[1]));
        int arrows=0; long point=Long.MIN_VALUE;
        for(int[] v:x) if(point<v[0]) { arrows++; point=v[1]; }
        return arrows;
    }
}`,
    "O(n log n)", "O(n) for sorted copy"
  ),
  "best-time-buy-sell-stock": worked(
    "Given daily prices, choose one buy day and a later sell day to maximize profit. Return zero if no profitable trade exists.",
    "`[7, 1, 5, 3, 6, 4]` returns `5`.",
    "Check every valid buy/sell pair.",
    String.raw`public class Solution {
    public static long maxProfit(int[] p) {
        long best=0;
        for(int i=0;i<p.length;i++) for(int j=i+1;j<p.length;j++)
            best=Math.max(best,(long)p[j]-p[i]);
        return best;
    }
}`,
    "O(n²)", "O(1)",
    "Track the minimum earlier price and the best profit seen at each sell day.",
    String.raw`public class Solution {
    public static long maxProfit(int[] p) {
        if(p.length<2) return 0;
        int low=p[0]; long best=0;
        for(int i=1;i<p.length;i++) { best=Math.max(best,(long)p[i]-low); low=Math.min(low,p[i]); }
        return best;
    }
}`,
    "O(n)", "O(1)"
  ),
  "best-time-buy-sell-stock-ii": worked(
    "Given daily prices, maximize profit with any number of transactions while holding at most one share at a time.",
    "`[7, 1, 5, 3, 6, 4]` returns `7`.",
    "Recursively choose to buy, sell, or skip on each day, never holding more than one share.",
    String.raw`public class Solution {
    private static long dfs(int i, boolean hold, int[] p) {
        if(i==p.length) return 0;
        long best=dfs(i+1,hold,p);
        if(hold) best=Math.max(best,(long)p[i]+dfs(i+1,false,p));
        else best=Math.max(best,-(long)p[i]+dfs(i+1,true,p));
        return best;
    }
    public static long maxProfit(int[] p) { return dfs(0,false,p); }
}`,
    "O(2^n)", "O(n) recursion stack",
    "Every positive day-to-day price increase can be collected as part of a transaction.",
    String.raw`public class Solution {
    public static long maxProfit(int[] p) {
        long total=0;
        for(int i=1;i<p.length;i++) if(p[i]>p[i-1]) total+=(long)p[i]-p[i-1];
        return total;
    }
}`,
    "O(n)", "O(1)"
  ),
  "minimum-railway-platforms": worked(
    "Given arrivals and departures, return the fewest platforms needed. Arrival at the same time as another train's departure requires separate platforms.",
    "`arrivals = [900, 940, 950, 1100, 1500, 1800]`, `departures = [910, 1200, 1120, 1130, 1900, 2000]` returns `3`.",
    "For every arrival, count trains whose arrival is no later and whose departure is no earlier.",
    String.raw`public class Solution {
    public static int platforms(int[] a, int[] d) {
        int best=0;
        for(int time:a) { int active=0;
            for(int j=0;j<a.length;j++) if(a[j]<=time && d[j]>=time) active++;
            best=Math.max(best,active);
        }
        return best;
    }
}`,
    "O(n²)", "O(1)",
    "Sort arrival and departure times. Process arrivals first on ties because equal-time trains need separate platforms.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int platforms(int[] a, int[] d) {
        if(a.length!=d.length) throw new IllegalArgumentException();
        int[] x=a.clone(), y=d.clone(); Arrays.sort(x); Arrays.sort(y);
        int i=0,j=0,active=0,best=0;
        while(i<x.length) {
            if(j==y.length || x[i]<=y[j]) { active++; best=Math.max(best,active); i++; }
            else { active--; j++; }
        }
        return best;
    }
}`,
    "O(n log n)", "O(n)"
  ),
  "huffman-coding": worked(
    "Given non-negative symbol frequencies, return the minimum total encoded cost (frequency times code length) for a binary prefix code.",
    "`frequencies = [5, 9, 12, 13, 16, 45]` returns `224`.",
    "Try every possible pair of frequencies as the next merge. Merging a pair adds their sum to the eventual weighted path length.",
    String.raw`import java.util.Arrays;
public class Solution {
    private static long dfs(long[] a, int n) {
        if(n<=1) return 0;
        long best=Long.MAX_VALUE;
        for(int i=0;i<n;i++) for(int j=i+1;j<n;j++) {
            long sum=a[i]+a[j]; long[] b=new long[n-1]; int k=0;
            for(int t=0;t<n;t++) if(t!=i && t!=j) b[k++]=a[t];
            b[k]=sum; best=Math.min(best,sum+dfs(b,n-1));
        }
        return best;
    }
    public static long minimumCost(long[] f) { return dfs(f.clone(),f.length); }
}`,
    "O(n · ∏[j=2..n] binom(j, 2))", "O(n²) recursion/copy space",
    "Repeatedly merge the two least frequent nodes. A single symbol needs no bits and has cost zero.",
    String.raw`import java.util.PriorityQueue;
public class Solution {
    public static long minimumCost(long[] f) {
        PriorityQueue<Long> q=new PriorityQueue<>();
        for(long x:f) { if(x<0) throw new IllegalArgumentException(); q.add(x); }
        long cost=0;
        while(q.size()>1) { long sum=q.remove()+q.remove(); cost+=sum; q.add(sum); }
        return cost;
    }
}`,
    "O(n log n)", "O(n)"
  ),
  "minimum-coins-canonical-system": worked(
    "For a canonical coin denomination system (one where taking the largest usable denomination repeatedly is always optimal), find the minimum coins for a non-negative amount. Return -1 if impossible. Denominations must be positive.",
    "`coins = [1, 5, 10, 25]`, amount `63` returns `6`.",
    "Use dynamic programming to compute the minimum number of coins for every amount up to the target.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int minimumCoins(int[] coins, int amount) {
        if(amount<0) throw new IllegalArgumentException("non-negative amount required");
        for(int c:coins) if(c<=0) throw new IllegalArgumentException("positive denominations required");
        int[] dp=new int[amount+1]; Arrays.fill(dp,amount+1); dp[0]=0;
        for(int x=1;x<=amount;x++) for(int c:coins) if(c<=x) dp[x]=Math.min(dp[x],dp[x-c]+1);
        return dp[amount]>amount ? -1 : dp[amount];
    }
}`,
    "O(amount · numberOfCoins)", "O(amount)",
    "Because the denomination system is explicitly assumed canonical, repeatedly take the largest denomination no greater than the remaining amount.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int minimumCoins(int[] coins, int amount) {
        if(amount<0) throw new IllegalArgumentException("non-negative amount required");
        int[] c=coins.clone(); Arrays.sort(c); int count=0;
        for(int x:c) if(x<=0) throw new IllegalArgumentException("positive denominations required");
        for(int i=c.length-1;i>=0;i--) {
            count+=amount/c[i]; amount%=c[i];
        }
        return amount==0 ? count : -1;
    }
}`,
    "O(m log m)", "O(m) for sorted copy"
  ),
  "queue-reconstruction-by-height": worked(
    "Each person is `[height, k]`, where k is the number of people at least as tall who stand before them. Return a valid reconstructed queue.",
    "`[[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]` returns a queue satisfying all pairs.",
    "Enumerate permutations and return the first whose preceding-person counts match.",
    String.raw`import java.util.Arrays;
public class Solution {
    private static boolean valid(int[][] a) {
        for(int i=0;i<a.length;i++) { int count=0;
            for(int j=0;j<i;j++) if(a[j][0]>=a[i][0]) count++;
            if(count!=a[i][1]) return false;
        }
        return true;
    }
    private static boolean permute(int[][] a,int i) {
        if(i==a.length) return valid(a);
        for(int j=i;j<a.length;j++) { int[] t=a[i];a[i]=a[j];a[j]=t;
            if(permute(a,i+1)) return true;
            t=a[i];a[i]=a[j];a[j]=t;
        } return false;
    }
    public static int[][] reconstruct(int[][] people) {
        int[][] a=new int[people.length][]; for(int i=0;i<a.length;i++) a[i]=people[i].clone();
        if(!permute(a,0)) throw new IllegalArgumentException("no valid queue"); return a;
    }
}`,
    "O(n! · n²)", "O(n) recursion plus copied result",
    "Sort by height descending, then k ascending. Insert each person at index k among the already placed people.",
    String.raw`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
public class Solution {
    public static int[][] reconstruct(int[][] people) {
        int[][] a=new int[people.length][]; for(int i=0;i<a.length;i++) a[i]=people[i].clone();
        Arrays.sort(a,(x,y)->x[0]!=y[0]?Integer.compare(y[0],x[0]):Integer.compare(x[1],y[1]));
        List<int[]> q=new ArrayList<>();
        for(int[] p:a) { if(p[1]<0 || p[1]>q.size()) throw new IllegalArgumentException(); q.add(p[1],p); }
        return q.toArray(new int[0][]);
    }
}`,
    "O(n²)", "O(n)"
  ),
  "maximum-units-on-truck": worked(
    "Each box type gives `[quantity, unitsPerBox]`; load at most truckSize boxes and maximize units.",
    "`types = [[1,3], [2,2], [3,1]]`, truckSize `4` returns `8`.",
    "Use 0/1 knapsack over box types and capacities; each available box contributes its units.",
    String.raw`public class Solution {
    public static long maximumUnits(int[][] types,int capacity) {
        long[] dp=new long[capacity+1];
        for(int[] t:types) for(int b=capacity;b>=1;b--)
            for(int q=1;q<=t[0] && q<=b;q++) dp[b]=Math.max(dp[b],dp[b-q]+(long)q*t[1]);
        return dp[capacity];
    }
}`,
    "O(capacity · total available boxes)", "O(capacity)",
    "Take boxes in descending units-per-box order, taking as many as fit from each type.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static long maximumUnits(int[][] types,int capacity) {
        int[][] a=types.clone(); Arrays.sort(a,(x,y)->Integer.compare(y[1],x[1]));
        long total=0;
        for(int[] t:a) { int take=Math.min(capacity,t[0]); total+=(long)take*t[1]; capacity-=take; if(capacity==0) break; }
        return total;
    }
}`,
    "O(n log n)", "O(n)"
  ),
  "lemonade-change": worked(
    "Lemonade costs $5. Customers pay in order with $5, $10, or $20 bills. Return whether exact change can be given to each customer.",
    "`[5, 5, 5, 10, 20]` returns `true`.",
    "Explore every valid way to give change for each bill, including both $10+$5 and three $5 bills for a $20.",
    String.raw`public class Solution {
    private static boolean dfs(int i,int f,int t,int[] b) {
        if(i==b.length) return true;
        if(b[i]==5) return dfs(i+1,f+1,t,b);
        if(b[i]==10) return f>0 && dfs(i+1,f-1,t+1,b);
        if(b[i]!=20) return false;
        return (t>0 && f>0 && dfs(i+1,f-1,t-1,b)) ||
               (f>=3 && dfs(i+1,f-3,t,b));
    }
    public static boolean canGiveChange(int[] bills) { return dfs(0,0,0,bills); }
}`,
    "O(2^n)", "O(n) recursion",
    "Track $5 and $10 bills. For a $20, prefer one $10 plus one $5, preserving three $5 bills for future $10 customers.",
    String.raw`public class Solution {
    public static boolean canGiveChange(int[] bills) {
        int f=0,t=0;
        for(int b:bills) {
            if(b==5) f++;
            else if(b==10) { if(f==0)return false; f--; t++; }
            else if(b==20) { if(t>0 && f>0) { t--; f--; } else if(f>=3) f-=3; else return false; }
            else return false;
        }
        return true;
    }
}`,
    "O(n)", "O(1)"
  ),
  "minimum-refueling-stops": worked(
    "A vehicle starts at position 0 with initial fuel and must reach target. Each station is `[position, fuel]`; return the minimum stops or -1. Stations are sorted by position and fuel is measured in distance units.",
    "`target = 100`, startFuel `10`, stations `[[10,60],[20,30],[30,30],[60,40]]` returns `2`.",
    "At every station, recursively decide whether to stop and add its fuel or pass it. Track maximum reachable distance; this exhaustively considers all stop sets.",
    String.raw`public class Solution {
    private static int dfs(int i,long reach,int target,int[][] s) {
        if(reach>=target) return 0;
        if(i==s.length || s[i][0]>reach) return Integer.MAX_VALUE/2;
        int skip=dfs(i+1,reach,target,s);
        int take=dfs(i+1,reach+s[i][1],target,s);
        return Math.min(skip,take>=Integer.MAX_VALUE/2?take:take+1);
    }
    public static int minStops(int target,int fuel,int[][] stations) {
        return dfs(0,(long)fuel,target,stations)>=Integer.MAX_VALUE/2 ? -1 : dfs(0,(long)fuel,target,stations);
    }
}`,
    "O(2^n)", "O(n) recursion",
    "As the route advances, add every reachable station's fuel to a max-heap. When the destination is not yet reachable, refuel from the largest available supply.",
    String.raw`import java.util.PriorityQueue;
public class Solution {
    public static int minStops(int target,int fuel,int[][] stations) {
        PriorityQueue<Integer> q=new PriorityQueue<>((a,b)->Integer.compare(b,a));
        long reach=fuel; int stops=0;
        for(int[] s:stations) {
            while(reach<s[0]) { if(q.isEmpty()) return -1; reach+=q.remove(); stops++; }
            q.add(s[1]);
        }
        while(reach<target) { if(q.isEmpty()) return -1; reach+=q.remove(); stops++; }
        return stops;
    }
}`,
    "O(n log n)", "O(n)"
  )
};
