export const slidingWindowContent = {
  "sw-maximum-sum-size-k": `## Problem statement

Given an integer array and positive k, return the maximum sum among contiguous windows of exactly k elements. Return an empty optional if k is larger than the array.

## Example

\`[2, 1, 5, 1, 3, 2]\`, k = 3 returns 9.

## Brute-force approach: sum each window

~~~java
import java.util.OptionalLong;

public class Solution {
    public static OptionalLong maxWindowBruteForce(int[] a, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        if (k > a.length) return OptionalLong.empty();
        long best = Long.MIN_VALUE;
        for (int left = 0; left + k <= a.length; left++) {
            long sum = 0;
            for (int i = left; i < left + k; i++) sum += a[i];
            best = Math.max(best, sum);
        }
        return OptionalLong.of(best);
    }
}
~~~

- **Time:** O(nk)
- **Extra space:** O(1), excluding the optional result

## Optimized approach: rolling sum

Subtract the value leaving the window and add the value entering it.

~~~java
import java.util.OptionalLong;

public class Solution {
    public static OptionalLong maxWindowSum(int[] a, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        if (k > a.length) return OptionalLong.empty();
        long sum = 0;
        for (int i = 0; i < k; i++) sum += a[i];
        long best = sum;
        for (int right = k; right < a.length; right++) {
            sum += a[right] - (long) a[right - k];
            best = Math.max(best, sum);
        }
        return OptionalLong.of(best);
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

  "sw-first-negative-size-k": `## Problem statement

For each window of size k, return its first negative number, or zero if it has none.

## Example

\`[12, -1, -7, 8, -15, 30, 16, 28]\`, k = 3 returns \`[-1, -1, -7, -15, -15, 0]\`.

## Brute-force approach: scan every window

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> firstNegativeBruteForce(int[] a, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        List<Integer> result = new ArrayList<>();
        for (int left = 0; left + k <= a.length; left++) {
            int first = 0;
            for (int i = left; i < left + k; i++) {
                if (a[i] < 0) { first = a[i]; break; }
            }
            result.add(first);
        }
        return result;
    }
}
~~~

- **Time:** O(nk)
- **Extra space:** O(w) for w output windows

## Optimized approach: queue negative indices

The queue stays in input order; remove expired indices and read the first remaining negative.

~~~java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {
    public static List<Integer> firstNegative(int[] a, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        Deque<Integer> negatives = new ArrayDeque<>();
        List<Integer> result = new ArrayList<>();
        for (int right = 0; right < a.length; right++) {
            if (a[right] < 0) negatives.addLast(right);
            int left = right - k + 1;
            while (!negatives.isEmpty() && negatives.peekFirst() < left) negatives.removeFirst();
            if (left >= 0) result.add(negatives.isEmpty() ? 0 : a[negatives.peekFirst()]);
        }
        return result;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n) including output`,

  "sw-maximum-every-window": `## Problem statement

Return the maximum value in each contiguous window of size k.

## Example

\`[1, 3, -1, -3, 5, 3, 6, 7]\`, k = 3 returns \`[3, 3, 5, 5, 6, 7]\`.

## Brute-force approach: scan each window

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> maximaBruteForce(int[] a, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        List<Integer> out = new ArrayList<>();
        for (int left = 0; left + k <= a.length; left++) {
            int max = a[left];
            for (int i = left + 1; i < left + k; i++) max = Math.max(max, a[i]);
            out.add(max);
        }
        return out;
    }
}
~~~

- **Time:** O(nk)
- **Extra space:** O(w) for output

## Optimized approach: monotonic deque

Keep indices in decreasing value order. Expired indices leave the front; smaller values leave the back.

~~~java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {
    public static List<Integer> maxSlidingWindow(int[] a, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        Deque<Integer> q = new ArrayDeque<>();
        List<Integer> out = new ArrayList<>();
        for (int right = 0; right < a.length; right++) {
            while (!q.isEmpty() && q.peekFirst() <= right - k) q.removeFirst();
            while (!q.isEmpty() && a[q.peekLast()] <= a[right]) q.removeLast();
            q.addLast(right);
            if (right >= k - 1) out.add(a[q.peekFirst()]);
        }
        return out;
    }
}
~~~

- **Time:** O(n), as each index enters and leaves once
- **Extra space:** O(k), excluding output`,

  "sw-longest-unique-substring": `## Problem statement

Return the length of the longest substring with no repeated characters.

## Example

\`"abcabcbb"\` returns 3.

## Brute-force approach: grow a set from each start

~~~java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static int longestUniqueBruteForce(String s) {
        int best = 0;
        for (int left = 0; left < s.length(); left++) {
            Set<Character> seen = new HashSet<>();
            for (int right = left; right < s.length(); right++) {
                if (!seen.add(s.charAt(right))) break;
                best = Math.max(best, right - left + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²) expected
- **Extra space:** O(u)

## Optimized approach: last-seen positions

When a character repeats, move the window start just past its previous position.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int longestUnique(String s) {
        Map<Character, Integer> last = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            Integer previous = last.put(s.charAt(right), right);
            if (previous != null) left = Math.max(left, previous + 1);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u)`,

  "sw-longest-at-most-k-distinct": `## Problem statement

Given a string and non-negative k, return the longest substring containing at most k distinct characters.

## Example

\`"araaci"\`, k = 2 returns 4.

## Brute-force approach: try every start

~~~java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static int longestAtMostKBruteForce(String s, int k) {
        int best = 0;
        for (int left = 0; left < s.length(); left++) {
            Set<Character> chars = new HashSet<>();
            for (int right = left; right < s.length(); right++) {
                chars.add(s.charAt(right));
                if (chars.size() > k) break;
                best = Math.max(best, right - left + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²) expected
- **Extra space:** O(u)

## Optimized approach: count characters in a window

Shrink from the left until the map contains at most k keys.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int longestAtMostK(String s, int k) {
        if (k < 0) throw new IllegalArgumentException("k must be non-negative");
        Map<Character, Integer> count = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            count.merge(s.charAt(right), 1, Integer::sum);
            while (count.size() > k) {
                char c = s.charAt(left++);
                count.compute(c, (key, n) -> n == 1 ? null : n - 1);
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u)`,

  "sw-longest-two-distinct": `## Problem statement

Return the length of the longest substring containing at most two distinct characters.

## Example

\`"ccaabbb"\` returns 5.

## Brute-force approach: grow each substring

~~~java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static int longestTwoBruteForce(String s) {
        int best = 0;
        for (int left = 0; left < s.length(); left++) {
            Set<Character> chars = new HashSet<>();
            for (int right = left; right < s.length(); right++) {
                chars.add(s.charAt(right));
                if (chars.size() > 2) break;
                best = Math.max(best, right - left + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²) expected
- **Extra space:** O(1) for the bounded set

## Optimized approach: keep two character counts

Shrink the window whenever its character map contains a third key.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int longestTwoDistinct(String s) {
        Map<Character, Integer> count = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            count.merge(s.charAt(right), 1, Integer::sum);
            while (count.size() > 2) {
                char c = s.charAt(left++);
                count.compute(c, (key, n) -> n == 1 ? null : n - 1);
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(1)`,

  "sw-minimum-window-substring": `## Problem statement

Return the shortest substring of s containing every character in t with its required multiplicity. Return an empty string if no such window exists.

## Example

\`s = "ADOBECODEBANC"\`, \`t = "ABC"\` returns \`"BANC"\`.

## Brute-force approach: test every start and end

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static String minWindowBruteForce(String s, String t) {
        if (t.isEmpty()) return "";
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
        String best = "";
        for (int left = 0; left < s.length(); left++) {
            Map<Character, Integer> window = new HashMap<>();
            for (int right = left; right < s.length(); right++) {
                window.merge(s.charAt(right), 1, Integer::sum);
                boolean valid = true;
                for (var entry : need.entrySet())
                    if (window.getOrDefault(entry.getKey(), 0) < entry.getValue()) valid = false;
                if (valid) {
                    if (best.isEmpty() || right - left + 1 < best.length()) best = s.substring(left, right + 1);
                    break;
                }
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²u), where u is the number of distinct required characters
- **Extra space:** O(u)

## Optimized approach: expand and shrink

Track satisfied character frequencies, then shrink the left side while all requirements remain met.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static String minWindow(String s, String t) {
        if (t.isEmpty() || s.length() < t.length()) return "";
        Map<Character, Integer> need = new HashMap<>(), have = new HashMap<>();
        for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
        int formed = 0, left = 0, start = 0, best = Integer.MAX_VALUE;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            have.merge(c, 1, Integer::sum);
            if (need.containsKey(c) && have.get(c).intValue() == need.get(c).intValue()) formed++;
            while (formed == need.size()) {
                if (right - left + 1 < best) { best = right - left + 1; start = left; }
                char removed = s.charAt(left++);
                if (need.containsKey(removed)
                        && have.get(removed).intValue() == need.get(removed).intValue()) formed--;
                have.put(removed, have.get(removed) - 1);
            }
        }
        return best == Integer.MAX_VALUE ? "" : s.substring(start, start + best);
    }
}
~~~

- **Time:** O(|s| + |t|) expected
- **Extra space:** O(u)`,

  "sw-find-anagrams": `## Problem statement

Return starting indices of all substrings of s that are anagrams of p. Assume lowercase English letters.

## Example

\`s = "cbaebabacd"\`, \`p = "abc"\` returns \`[0, 6]\`.

## Brute-force approach: sort each candidate window

~~~java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<Integer> findAnagramsBruteForce(String s, String p) {
        List<Integer> out = new ArrayList<>();
        if (p.isEmpty() || p.length() > s.length()) return out;
        char[] target = p.toCharArray();
        Arrays.sort(target);
        for (int i = 0; i + p.length() <= s.length(); i++) {
            char[] current = s.substring(i, i + p.length()).toCharArray();
            Arrays.sort(current);
            if (Arrays.equals(target, current)) out.add(i);
        }
        return out;
    }
}
~~~

- **Time:** O(nm log m)
- **Extra space:** O(m)

## Optimized approach: fixed-size frequency window

Increment the incoming letter and decrement the outgoing letter; equal 26-count arrays indicate an anagram.

~~~java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<Integer> findAnagrams(String s, String p) {
        List<Integer> out = new ArrayList<>();
        int m = p.length();
        if (m == 0 || m > s.length()) return out;
        int[] need = new int[26], have = new int[26];
        for (int i = 0; i < m; i++) { need[p.charAt(i) - 'a']++; have[s.charAt(i) - 'a']++; }
        for (int left = 0; ; left++) {
            if (Arrays.equals(need, have)) out.add(left);
            int next = left + m;
            if (next == s.length()) break;
            have[s.charAt(left) - 'a']--;
            have[s.charAt(next) - 'a']++;
        }
        return out;
    }
}
~~~

- **Time:** O(n), for fixed alphabet size
- **Extra space:** O(1)`,

  "sw-permutation-in-string": `## Problem statement

Return whether s2 contains a substring that is a permutation of s1. Assume lowercase English letters.

## Example

\`s1 = "ab"\`, \`s2 = "eidbaooo"\` returns true.

## Brute-force approach: sort each window

~~~java
import java.util.Arrays;

public class Solution {
    public static boolean containsPermutationBruteForce(String p, String s) {
        if (p.isEmpty()) return true;
        if (p.length() > s.length()) return false;
        char[] target = p.toCharArray();
        Arrays.sort(target);
        for (int i = 0; i + p.length() <= s.length(); i++) {
            char[] window = s.substring(i, i + p.length()).toCharArray();
            Arrays.sort(window);
            if (Arrays.equals(target, window)) return true;
        }
        return false;
    }
}
~~~

- **Time:** O(nm log m)
- **Extra space:** O(m)

## Optimized approach: compare fixed-window frequencies

Maintain letter counts for a window with the same length as p.

~~~java
import java.util.Arrays;

public class Solution {
    public static boolean containsPermutation(String p, String s) {
        int m = p.length();
        if (m == 0) return true;
        if (m > s.length()) return false;
        int[] need = new int[26], have = new int[26];
        for (int i = 0; i < m; i++) { need[p.charAt(i) - 'a']++; have[s.charAt(i) - 'a']++; }
        for (int left = 0; ; left++) {
            if (Arrays.equals(need, have)) return true;
            int next = left + m;
            if (next == s.length()) return false;
            have[s.charAt(left) - 'a']--;
            have[s.charAt(next) - 'a']++;
        }
    }
}
~~~

- **Time:** O(n), for fixed alphabet size
- **Extra space:** O(1)`,

  "sw-longest-character-replacement": `## Problem statement

For an uppercase string and k, return the longest substring that can be changed to one repeated character using at most k replacements.

## Example

\`"AABABBA"\`, k = 1 returns 4.

## Brute-force approach: count each candidate window

~~~java
public class Solution {
    public static int replacementBruteForce(String s, int k) {
        int best = 0;
        for (int left = 0; left < s.length(); left++) {
            int[] count = new int[26];
            int maxFrequency = 0;
            for (int right = left; right < s.length(); right++) {
                int c = s.charAt(right) - 'A';
                if (c < 0 || c >= 26) throw new IllegalArgumentException("Only uppercase A-Z supported");
                maxFrequency = Math.max(maxFrequency, ++count[c]);
                if (right - left + 1 - maxFrequency > k) break;
                best = Math.max(best, right - left + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: sliding window

Shrink while window length minus its most frequent character count exceeds k.

~~~java
public class Solution {
    public static int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int left = 0, maxFrequency = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            int c = s.charAt(right) - 'A';
            if (c < 0 || c >= 26) throw new IllegalArgumentException("Only uppercase A-Z supported");
            maxFrequency = Math.max(maxFrequency, ++count[c]);
            while (right - left + 1 - maxFrequency > k) count[s.charAt(left++) - 'A']--;
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

The maximum frequency may be stale after shrinking, which is safe for tracking the maximum attainable length.`,

  "sw-minimum-size-subarray-sum": `## Problem statement

Given positive integers and target, return the shortest contiguous subarray with sum at least target, or zero if none exists.

## Example

\`[2, 3, 1, 2, 4, 3]\`, target 7 returns 2.

## Brute-force approach: extend every start

~~~java
public class Solution {
    public static int minLengthBruteForce(int[] a, int target) {
        int best = Integer.MAX_VALUE;
        for (int left = 0; left < a.length; left++) {
            long sum = 0;
            for (int right = left; right < a.length; right++) {
                sum += a[right];
                if (sum >= target) { best = Math.min(best, right - left + 1); break; }
            }
        }
        return best == Integer.MAX_VALUE ? 0 : best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: sliding window

Positive values let us shrink a valid window without losing a better start.

~~~java
public class Solution {
    public static int minSubArrayLen(int[] a, int target) {
        int left = 0, best = Integer.MAX_VALUE;
        long sum = 0;
        for (int right = 0; right < a.length; right++) {
            if (a[right] <= 0) throw new IllegalArgumentException("Values must be positive");
            sum += a[right];
            while (sum >= target) {
                best = Math.min(best, right - left + 1);
                sum -= a[left++];
            }
        }
        return best == Integer.MAX_VALUE ? 0 : best;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

  "sw-subarray-product-less-than-k": `## Problem statement

Count contiguous subarrays whose product is less than k. Assume array values are positive.

## Example

\`[10, 5, 2, 6]\`, k = 100 returns 8.

## Brute-force approach: multiply each range

~~~java
public class Solution {
    public static long countBruteForce(int[] a, int k) {
        long result = 0;
        for (int left = 0; left < a.length; left++) {
            long product = 1;
            for (int right = left; right < a.length; right++) {
                product *= a[right];
                if (product < k) result++;
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: maintain a product window

Shrink while product is at least k. Every suffix ending at the current right index within the remaining window is valid.

~~~java
public class Solution {
    public static long countProductLessThanK(int[] a, int k) {
        if (k <= 1) return 0;
        int left = 0;
        long product = 1, result = 0;
        for (int right = 0; right < a.length; right++) {
            if (a[right] <= 0) throw new IllegalArgumentException("Values must be positive");
            product *= a[right];
            while (product >= k) product /= a[left++];
            result += right - left + 1L;
        }
        return result;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

Guard against long overflow if input constraints allow very large products.`,

  "sw-longest-ones-with-flips": `## Problem statement

For a binary array and non-negative k, return the longest contiguous window that can become all ones by flipping at most k zeroes.

## Example

\`[1, 0, 1, 1, 0]\`, k = 1 returns 4.

## Brute-force approach: count zeroes in every range

~~~java
public class Solution {
    public static int longestOnesBruteForce(int[] a, int k) {
        int best = 0;
        for (int left = 0; left < a.length; left++) {
            int zeroes = 0;
            for (int right = left; right < a.length; right++) {
                if (a[right] == 0) zeroes++;
                if (zeroes > k) break;
                best = Math.max(best, right - left + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: at most k zeroes

Expand right and move left until the window contains at most k zeroes.

~~~java
public class Solution {
    public static int longestOnes(int[] a, int k) {
        int left = 0, zeroes = 0, best = 0;
        for (int right = 0; right < a.length; right++) {
            if (a[right] == 0) zeroes++;
            while (zeroes > k) if (a[left++] == 0) zeroes--;
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

  "sw-max-consecutive-ones-iii": `## Problem statement

Given a binary array and k, return the longest run of ones possible after flipping at most k zeroes.

## Example

\`[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0]\`, k = 2 returns 6.

## Brute-force approach: inspect each starting range

~~~java
public class Solution {
    public static int longestOnesBruteForce(int[] a, int k) {
        int best = 0;
        for (int left = 0; left < a.length; left++) {
            int zeros = 0;
            for (int right = left; right < a.length; right++) {
                if (a[right] == 0) zeros++;
                if (zeros > k) break;
                best = Math.max(best, right - left + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: sliding window with a zero budget

Keep the number of zeroes in the current window at most k.

~~~java
public class Solution {
    public static int longestOnes(int[] a, int k) {
        int left = 0, zeros = 0, best = 0;
        for (int right = 0; right < a.length; right++) {
            if (a[right] == 0) zeros++;
            while (zeros > k) {
                if (a[left++] == 0) zeros--;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

  "sw-fruit-into-baskets": `## Problem statement

Each integer represents a fruit type. Return the longest contiguous stretch containing at most two distinct types.

## Example

\`[0, 1, 2, 2]\` returns 3.

## Brute-force approach: extend each start

~~~java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static int totalFruitBruteForce(int[] a) {
        int best = 0;
        for (int left = 0; left < a.length; left++) {
            Set<Integer> types = new HashSet<>();
            for (int right = left; right < a.length; right++) {
                types.add(a[right]);
                if (types.size() > 2) break;
                best = Math.max(best, right - left + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²) expected
- **Extra space:** O(1) for the bounded set

## Optimized approach: frequency window

Shrink the left edge whenever more than two fruit types remain.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int totalFruit(int[] a) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < a.length; right++) {
            count.merge(a[right], 1, Integer::sum);
            while (count.size() > 2) {
                int x = a[left++];
                count.compute(x, (key, n) -> n == 1 ? null : n - 1);
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(1)`,

  "sw-longest-subarray-k-distinct": `## Problem statement

Given an integer array and non-negative k, return the longest contiguous subarray containing at most k distinct values.

## Example

\`[1, 2, 1, 2, 3]\`, k = 2 returns 4.

## Brute-force approach: inspect each start

~~~java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static int longestKDistinctBruteForce(int[] a, int k) {
        int best = 0;
        for (int left = 0; left < a.length; left++) {
            Set<Integer> values = new HashSet<>();
            for (int right = left; right < a.length; right++) {
                values.add(a[right]);
                if (values.size() > k) break;
                best = Math.max(best, right - left + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²) expected
- **Extra space:** O(u)

## Optimized approach: frequency map

Add values from the right and remove them from the left until at most k distinct values remain.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int longestKDistinct(int[] a, int k) {
        if (k < 0) throw new IllegalArgumentException("k must be non-negative");
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < a.length; right++) {
            count.merge(a[right], 1, Integer::sum);
            while (count.size() > k) {
                int x = a[left++];
                count.compute(x, (key, n) -> n == 1 ? null : n - 1);
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u)`,

  "sw-subarrays-exactly-k-distinct": `## Problem statement

Count contiguous subarrays containing exactly k distinct integers.

## Example

\`[1, 2, 1, 2, 3]\`, k = 2 returns 7.

## Brute-force approach: count each range's distinct values

~~~java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static long countExactlyKBruteForce(int[] a, int k) {
        long result = 0;
        for (int left = 0; left < a.length; left++) {
            Set<Integer> values = new HashSet<>();
            for (int right = left; right < a.length; right++) {
                values.add(a[right]);
                if (values.size() == k) result++;
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n²) expected
- **Extra space:** O(u)

## Optimized approach: atMost(k) - atMost(k - 1)

The difference between these counts is exactly the number of windows with k distinct values.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static long countExactlyK(int[] a, int k) {
        if (k <= 0) return 0;
        return atMost(a, k) - atMost(a, k - 1);
    }

    private static long atMost(int[] a, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0;
        long result = 0;
        for (int right = 0; right < a.length; right++) {
            count.merge(a[right], 1, Integer::sum);
            while (count.size() > k) {
                int x = a[left++];
                count.compute(x, (key, n) -> n == 1 ? null : n - 1);
            }
            result += right - left + 1L;
        }
        return result;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u)`,

  "sw-substrings-all-required": `## Problem statement

Given a string and a set of required characters, count substrings containing every distinct required character at least once.

## Example

\`"abcabc"\` with required characters \`"abc"\` has 10 such substrings.

## Brute-force approach: inspect every substring

~~~java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static long countBruteForce(String s, String required) {
        Set<Character> need = new HashSet<>();
        for (char c : required.toCharArray()) need.add(c);
        long result = 0;
        for (int left = 0; left < s.length(); left++) {
            for (int right = left; right < s.length(); right++) {
                Set<Character> have = new HashSet<>();
                for (int i = left; i <= right; i++) if (need.contains(s.charAt(i))) have.add(s.charAt(i));
                if (have.containsAll(need)) result++;
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n³)
- **Extra space:** O(u)

## Optimized approach: sliding window and count extensions

Once a window covers every required character, all longer windows with the same start also qualify. Add those extensions, then shrink left.

~~~java
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Solution {
    public static long countContaining(String s, String required) {
        Set<Character> need = new HashSet<>();
        for (char c : required.toCharArray()) need.add(c);
        if (need.isEmpty()) return 0;
        Map<Character, Integer> counts = new HashMap<>();
        int formed = 0, left = 0;
        long result = 0;
        for (int right = 0; right < s.length(); right++) {
            char added = s.charAt(right);
            if (need.contains(added)) {
                int count = counts.merge(added, 1, Integer::sum);
                if (count == 1) formed++;
            }
            while (formed == need.size()) {
                result += s.length() - right;
                char removed = s.charAt(left++);
                if (need.contains(removed)) {
                    int count = counts.get(removed) - 1;
                    if (count == 0) {
                        counts.remove(removed);
                        formed--;
                    } else {
                        counts.put(removed, count);
                    }
                }
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u)
`,

  "sw-reduce-x-to-zero": `## Problem statement

Given positive integers and x, remove values from either end until their sum is exactly x. Return the minimum number of removals, or -1 if impossible.

## Example

\`[1, 1, 4, 2, 3]\`, x = 5 returns 2.

## Brute-force approach: try every left and right removal

~~~java
public class Solution {
    public static int minOperationsBruteForce(int[] a, long x) {
        int best = Integer.MAX_VALUE, n = a.length;
        for (int left = 0; left <= n; left++) {
            long sum = 0;
            for (int i = 0; i < left; i++) sum += a[i];
            if (sum == x) best = Math.min(best, left);
            for (int right = 1; right <= n - left; right++) {
                sum += a[n - right];
                if (sum == x) best = Math.min(best, left + right);
            }
        }
        return best == Integer.MAX_VALUE ? -1 : best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: retain the longest middle subarray

Removing ends with sum x is equivalent to keeping a middle subarray summing to total-x. Positive values allow a sliding window.

~~~java
public class Solution {
    public static int minOperations(int[] a, long x) {
        long total = 0;
        for (int value : a) total += value;
        long target = total - x;
        if (target < 0) return -1;
        if (target == 0) return a.length;
        int left = 0, longest = -1;
        long sum = 0;
        for (int right = 0; right < a.length; right++) {
            if (a[right] <= 0) throw new IllegalArgumentException("Values must be positive");
            sum += a[right];
            while (sum > target) sum -= a[left++];
            if (sum == target) longest = Math.max(longest, right - left + 1);
        }
        return longest < 0 ? -1 : a.length - longest;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

  "sw-maximum-vowels-substring": `## Problem statement

Given a string and positive k, return the maximum vowel count in any substring of length k. Return zero if k exceeds the string length.

## Example

\`"abciiidef"\`, k = 3 returns 3.

## Brute-force approach: count each window

~~~java
public class Solution {
    private static boolean vowel(char c) { return "aeiouAEIOU".indexOf(c) >= 0; }

    public static int maxVowelsBruteForce(String s, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        int best = 0;
        for (int left = 0; left + k <= s.length(); left++) {
            int count = 0;
            for (int i = left; i < left + k; i++) if (vowel(s.charAt(i))) count++;
            best = Math.max(best, count);
        }
        return best;
    }
}
~~~

- **Time:** O(nk)
- **Extra space:** O(1)

## Optimized approach: rolling count

Subtract the outgoing character's contribution and add the incoming character's contribution.

~~~java
public class Solution {
    private static boolean vowel(char c) { return "aeiouAEIOU".indexOf(c) >= 0; }

    public static int maxVowels(String s, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        if (k > s.length()) return 0;
        int count = 0;
        for (int i = 0; i < k; i++) if (vowel(s.charAt(i))) count++;
        int best = count;
        for (int right = k; right < s.length(); right++) {
            if (vowel(s.charAt(right - k))) count--;
            if (vowel(s.charAt(right))) count++;
            best = Math.max(best, count);
        }
        return best;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`
};
