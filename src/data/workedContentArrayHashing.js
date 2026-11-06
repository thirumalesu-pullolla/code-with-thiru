export const arrayHashingContent = {
    "two-sum": `## Problem statement

Return the indices of two distinct array elements whose values add to the target. Exactly one answer exists.

## Example

\`[2, 7, 11, 15]\`, target \`9\` returns indices \`[0, 1]\`.

## Brute-force approach: test every pair

Try each pair of distinct indices and return the first match.

~~~java
public class Solution {
    public static int[] twoSumBruteForce(int[] values, int target) {
        for (int i = 0; i < values.length; i++) {
            for (int j = i + 1; j < values.length; j++) {
                if ((long) values[i] + values[j] == target) return new int[] {i, j};
            }
        }
        throw new IllegalArgumentException("No pair sums to target");
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1), excluding the returned indices

## Optimized approach: complement map

As each value is visited, look for its complement among earlier values. Store value-to-index entries so an element cannot pair with itself.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int[] twoSum(int[] values, int target) {
        Map<Integer, Integer> indexByValue = new HashMap<>();
        for (int i = 0; i < values.length; i++) {
            long complement = (long) target - values[i];
            if (complement >= Integer.MIN_VALUE && complement <= Integer.MAX_VALUE
                    && indexByValue.containsKey((int) complement)) {
                return new int[] {indexByValue.get((int) complement), i};
            }
            indexByValue.put(values[i], i);
        }
        throw new IllegalArgumentException("No pair sums to target");
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)`,

    "frequency-of-every-element": `## Problem statement

Return the frequency of each distinct integer in the input.

## Example

\`[2, 1, 2, -1, 1, 2]\` produces \`{-1=1, 1=2, 2=3}\`.

## Brute-force approach: count each first occurrence

For each value not seen earlier, scan the array and count its occurrences.

~~~java
import java.util.LinkedHashMap;
import java.util.Map;

public class Solution {
    public static Map<Integer, Integer> frequenciesBruteForce(int[] values) {
        Map<Integer, Integer> result = new LinkedHashMap<>();
        for (int i = 0; i < values.length; i++) {
            if (result.containsKey(values[i])) continue;
            int count = 0;
            for (int value : values) if (value == values[i]) count++;
            result.put(values[i], count);
        }
        return result;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(u) for u distinct values

## Optimized approach: update a frequency map

Increment each value's count during one pass.

~~~java
import java.util.LinkedHashMap;
import java.util.Map;

public class Solution {
    public static Map<Integer, Integer> frequencies(int[] values) {
        Map<Integer, Integer> result = new LinkedHashMap<>();
        for (int value : values) result.merge(value, 1, Integer::sum);
        return result;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u)

The linked map preserves first-appearance order if a predictable display order is useful.`,

    "first-repeating-element": `## Problem statement

Return the value whose first occurrence has the smallest index among values that appear at least twice. Return -1 if none repeats.

## Example

\`[10, 5, 3, 4, 3, 5, 6]\` returns 5: its first occurrence is earlier than the first occurrence of 3.

## Brute-force approach: search later positions

Scan left to right and check whether each value appears later.

~~~java
public class Solution {
    public static int firstRepeatingBruteForce(int[] values) {
        for (int i = 0; i < values.length; i++) {
            for (int j = i + 1; j < values.length; j++) {
                if (values[i] == values[j]) return values[i];
            }
        }
        return -1;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: count, then scan in input order

Count frequencies, then return the first value with a count greater than one.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int firstRepeating(int[] values) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int value : values) count.merge(value, 1, Integer::sum);
        for (int value : values) if (count.get(value) > 1) return value;
        return -1;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u)`,

    "first-non-repeating-element": `## Problem statement

Return the first array value whose frequency is exactly one, or -1 if every value repeats.

## Example

\`[4, 5, 1, 2, 0, 4]\` returns 5.

## Brute-force approach: count for each position

Count each candidate across the entire input, returning the first candidate with one occurrence.

~~~java
public class Solution {
    public static int firstUniqueBruteForce(int[] values) {
        for (int candidate : values) {
            int count = 0;
            for (int value : values) if (value == candidate) count++;
            if (count == 1) return candidate;
        }
        return -1;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: frequency map

Count each value once, then scan the original array to preserve its order.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int firstUnique(int[] values) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int value : values) count.merge(value, 1, Integer::sum);
        for (int value : values) if (count.get(value) == 1) return value;
        return -1;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u)`,

    "all-pairs-with-given-sum": `## Problem statement

Return all distinct value-pairs whose sum equals the target. Normalize each pair so its smaller value comes first; do not emit duplicate pairs.

## Example

\`[1, 5, 7, -1, 5]\`, target \`6\` returns \`[[-1, 7], [1, 5]]\`.

## Brute-force approach: examine every index pair

Check all pairs and use a set to suppress repeated value-pairs.

~~~java
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class Solution {
    public static List<List<Integer>> pairsBruteForce(int[] values, int target) {
        Set<String> seen = new TreeSet<>();
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < values.length; i++) {
            for (int j = i + 1; j < values.length; j++) {
                if ((long) values[i] + values[j] == target) {
                    int low = Math.min(values[i], values[j]), high = Math.max(values[i], values[j]);
                    String key = low + ":" + high;
                    if (seen.add(key)) result.add(List.of(low, high));
                }
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n² log p), where p is the number of distinct pairs
- **Extra space:** O(p)

## Optimized approach: look up complements

Keep values already seen. A matching complement yields a pair; a set of normalized keys prevents duplicate output.

~~~java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {
    public static List<List<Integer>> pairs(int[] values, int target) {
        Set<Integer> seen = new HashSet<>();
        Set<String> emitted = new HashSet<>();
        List<List<Integer>> result = new ArrayList<>();
        for (int value : values) {
            long complement = (long) target - value;
            if (complement >= Integer.MIN_VALUE && complement <= Integer.MAX_VALUE
                    && seen.contains((int) complement)) {
                int low = Math.min(value, (int) complement), high = Math.max(value, (int) complement);
                if (emitted.add(low + ":" + high)) result.add(List.of(low, high));
            }
            seen.add(value);
        }
        return result;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n + p)`,

    "all-pairs-with-given-difference": `## Problem statement

Given an integer array and non-negative \`k\`, return distinct value-pairs whose absolute difference is \`k\`. Put the smaller value first.

## Example

\`[1, 5, 3, 4, 2]\`, \`k = 2\` returns \`[[1, 3], [3, 5]]\`.

## Brute-force approach: compare every pair

Examine all distinct indices, normalize matching pairs, and suppress duplicate value-pairs.

~~~java
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class Solution {
    public static List<List<Integer>> pairsWithDifferenceBruteForce(int[] a, int k) {
        if (k < 0) throw new IllegalArgumentException("k must be non-negative");
        Set<String> emitted = new TreeSet<>();
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < a.length; i++) for (int j = i + 1; j < a.length; j++) {
            if (Math.abs((long) a[i] - a[j]) == k) {
                int low = Math.min(a[i], a[j]), high = Math.max(a[i], a[j]);
                if (emitted.add(low + ":" + high)) result.add(List.of(low, high));
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n² log p)
- **Extra space:** O(p)

## Optimized approach: set membership

Store unique input values. For each value, check whether its value plus \`k\` exists. With \`k = 0\`, only values occurring at least twice qualify.

~~~java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Solution {
    public static List<List<Integer>> pairsWithDifference(int[] a, int k) {
        if (k < 0) throw new IllegalArgumentException("k must be non-negative");
        Map<Integer, Integer> count = new HashMap<>();
        for (int value : a) count.merge(value, 1, Integer::sum);
        Set<Integer> keys = count.keySet();
        List<List<Integer>> result = new ArrayList<>();
        for (int value : keys) {
            long high = (long) value + k;
            if (high <= Integer.MAX_VALUE && keys.contains((int) high)
                    && (k != 0 || count.get(value) > 1)) {
                result.add(List.of(value, (int) high));
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u)`,

    "count-pairs-with-given-sum": `## Problem statement

Count index pairs \`(i, j)\` with \`i < j\` whose values sum to the target. Equal values at different indices form different pairs.

## Example

\`[1, 1, 1]\`, target \`2\` returns 3.

## Brute-force approach: test each pair

Visit all index pairs. A long counter handles the number of pairs for large arrays.

~~~java
public class Solution {
    public static long countPairsBruteForce(int[] values, int target) {
        long count = 0;
        for (int i = 0; i < values.length; i++) {
            for (int j = i + 1; j < values.length; j++) {
                if ((long) values[i] + values[j] == target) count++;
            }
        }
        return count;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: count prior complements

For each value, add the number of earlier values equal to its complement, then record the current value.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static long countPairs(int[] values, int target) {
        Map<Integer, Long> seen = new HashMap<>();
        long pairs = 0;
        for (int value : values) {
            long complement = (long) target - value;
            if (complement >= Integer.MIN_VALUE && complement <= Integer.MAX_VALUE) {
                pairs += seen.getOrDefault((int) complement, 0L);
            }
            seen.merge(value, 1L, Long::sum);
        }
        return pairs;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u)`,

    "group-anagrams": `## Problem statement

Group lowercase English words that have the same character counts. The order of groups does not matter; preserve input order within each group.

## Example

\`["eat", "tea", "tan", "ate"]\` groups as \`[["eat", "tea", "ate"], ["tan"]]\`.

## Brute-force approach: compare character counts

For each word, compare its 26-letter count with one representative from each existing group.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<String>> groupAnagramsBruteForce(String[] words) {
        List<List<String>> groups = new ArrayList<>();
        List<int[]> signatures = new ArrayList<>();
        for (String word : words) {
            int[] count = signature(word);
            int group = 0;
            while (group < signatures.size() && !java.util.Arrays.equals(count, signatures.get(group))) group++;
            if (group == signatures.size()) {
                signatures.add(count);
                groups.add(new ArrayList<>());
            }
            groups.get(group).add(word);
        }
        return groups;
    }

    private static int[] signature(String word) {
        int[] count = new int[26];
        for (char c : word.toCharArray()) {
            if (c < 'a' || c > 'z') throw new IllegalArgumentException("Words must be lowercase a-z");
            count[c - 'a']++;
        }
        return count;
    }
}
~~~

- **Time:** O(N · G · L), where N is word count, G groups, L average word length
- **Extra space:** O(N) for grouped output and signatures

## Optimized approach: signature-keyed map

Use the 26 character frequencies as a stable key and append each word to its matching group.

~~~java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Solution {
    public static List<List<String>> groupAnagrams(String[] words) {
        Map<String, List<String>> groups = new LinkedHashMap<>();
        for (String word : words) {
            int[] count = new int[26];
            for (char c : word.toCharArray()) {
                if (c < 'a' || c > 'z') throw new IllegalArgumentException("Words must be lowercase a-z");
                count[c - 'a']++;
            }
            String key = Arrays.toString(count);
            groups.computeIfAbsent(key, ignored -> new ArrayList<>()).add(word);
        }
        return new ArrayList<>(groups.values());
    }
}
~~~

- **Time:** O(N · L)
- **Extra space:** O(N · L) including the returned words and keys`,

    "same-elements-same-frequencies": `## Problem statement

Return whether two integer arrays contain exactly the same values with the same frequencies. Their order may differ.

## Example

\`[1, 2, 2, 3]\` and \`[2, 3, 2, 1]\` return true; \`[1, 2]\` and \`[1, 1]\` return false.

## Brute-force approach: sort copies

Equal multisets become identical after sorting.

~~~java
import java.util.Arrays;

public class Solution {
    public static boolean sameFrequenciesBruteForce(int[] a, int[] b) {
        if (a.length != b.length) return false;
        int[] left = a.clone(), right = b.clone();
        Arrays.sort(left);
        Arrays.sort(right);
        return Arrays.equals(left, right);
    }
}
~~~

- **Time:** O(n log n)
- **Extra space:** O(n)

## Optimized approach: frequency map with balance counts

Increment counts from the first array and decrement using the second. Every final count must be zero.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static boolean sameFrequencies(int[] a, int[] b) {
        if (a.length != b.length) return false;
        Map<Integer, Integer> balance = new HashMap<>();
        for (int value : a) balance.merge(value, 1, Integer::sum);
        for (int value : b) balance.merge(value, -1, Integer::sum);
        for (int count : balance.values()) if (count != 0) return false;
        return true;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u)`,

    "intersection-of-multiple-arrays": `## Problem statement

Return the distinct integers present in every array. Return an empty list when the collection is empty.

## Example

\`[[1, 2, 2, 3], [2, 3, 4], [0, 2, 3]]\` returns \`[2, 3]\`.

## Brute-force approach: test candidates from the first array

For each distinct first-array value, search every other array.

~~~java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {
    public static List<Integer> intersectionBruteForce(int[][] arrays) {
        List<Integer> result = new ArrayList<>();
        if (arrays.length == 0) return result;
        Set<Integer> candidates = new HashSet<>();
        for (int value : arrays[0]) candidates.add(value);
        for (int value : candidates) {
            boolean inAll = true;
            for (int i = 1; i < arrays.length && inAll; i++) {
                boolean found = false;
                for (int other : arrays[i]) if (other == value) { found = true; break; }
                inAll = found;
            }
            if (inAll) result.add(value);
        }
        return result;
    }
}
~~~

- **Time:** O(u · A), where u is unique values in the first array and A is total input elements
- **Extra space:** O(u) plus the result

## Optimized approach: count once per row

Use a set per array so duplicates within one array count only once, then keep values whose number of distinct appearances equals the number of arrays.

~~~java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Solution {
    public static List<Integer> intersection(int[][] arrays) {
        Map<Integer, Integer> rowsSeen = new HashMap<>();
        for (int[] row : arrays) {
            Set<Integer> unique = new HashSet<>();
            for (int value : row) unique.add(value);
            for (int value : unique) rowsSeen.merge(value, 1, Integer::sum);
        }
        List<Integer> result = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : rowsSeen.entrySet()) {
            if (entry.getValue() == arrays.length) result.add(entry.getKey());
        }
        return result;
    }
}
~~~

- **Time:** O(A) expected
- **Extra space:** O(U), where U is the number of distinct values across all arrays`,

    "longest-consecutive-sequence-hashset": `## Problem statement

Return the length of the longest consecutive value sequence in an unsorted array, without requiring the values to be adjacent in the input.

## Example

\`[100, 4, 200, 1, 3, 2]\` returns 4 for \`1, 2, 3, 4\`.

## Brute-force approach: repeatedly search the array

For each candidate, search linearly for its successor until the sequence ends.

~~~java
public class Solution {
    public static int longestBruteForce(int[] values) {
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

## Optimized approach: expand only sequence starts

Put values in a hash set. Only expand from values whose predecessor is absent, so each sequence is scanned once on average.

~~~java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static int longestConsecutive(int[] values) {
        Set<Integer> numbers = new HashSet<>();
        for (int value : values) numbers.add(value);
        int best = 0;
        for (int value : numbers) {
            if (value != Integer.MIN_VALUE && numbers.contains(value - 1)) continue;
            int length = 1;
            long next = (long) value + 1;
            while (next <= Integer.MAX_VALUE && numbers.contains((int) next)) {
                length++;
                next++;
            }
            best = Math.max(best, length);
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)`,

    "longest-zero-sum-subarray": `## Problem statement

Return the length of the longest contiguous subarray whose sum is zero.

## Example

\`[15, -2, 2, -8, 1, 7, 10, 23]\` returns 5 for \`[-2, 2, -8, 1, 7]\`.

## Brute-force approach: sum every subarray

Start at each index, extend the subarray, and track its running sum.

~~~java
public class Solution {
    public static int longestZeroSumBruteForce(int[] values) {
        int best = 0;
        for (int start = 0; start < values.length; start++) {
            long sum = 0;
            for (int end = start; end < values.length; end++) {
                sum += values[end];
                if (sum == 0) best = Math.max(best, end - start + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: remember first prefix positions

If the same prefix sum occurs at indices \`i\` and \`j\`, the subarray between them sums to zero. Keep the earliest index for each sum.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int longestZeroSum(int[] values) {
        Map<Long, Integer> firstIndex = new HashMap<>();
        firstIndex.put(0L, -1);
        long prefix = 0;
        int best = 0;
        for (int i = 0; i < values.length; i++) {
            prefix += values[i];
            Integer first = firstIndex.putIfAbsent(prefix, i);
            if (first != null) best = Math.max(best, i - first);
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)`,

    "count-subarrays-with-target-sum": `## Problem statement

Count contiguous subarrays whose sum equals a target. Values may be negative, zero, or positive.

## Example

\`[1, 1, 1]\`, target \`2\` returns 2.

## Brute-force approach: sum each subarray

For every start index, extend the end index while maintaining the sum.

~~~java
public class Solution {
    public static long countSubarraysBruteForce(int[] values, int target) {
        long answer = 0;
        for (int start = 0; start < values.length; start++) {
            long sum = 0;
            for (int end = start; end < values.length; end++) {
                sum += values[end];
                if (sum == target) answer++;
            }
        }
        return answer;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: prefix-sum frequencies

At current prefix sum \`p\`, every earlier prefix \`p - target\` starts a valid subarray ending here.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static long countSubarrays(int[] values, int target) {
        Map<Long, Long> prefixCount = new HashMap<>();
        prefixCount.put(0L, 1L);
        long prefix = 0, answer = 0;
        for (int value : values) {
            prefix += value;
            answer += prefixCount.getOrDefault(prefix - target, 0L);
            prefixCount.merge(prefix, 1L, Long::sum);
        }
        return answer;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)

Use a long prefix and result so large sums and pair counts are not truncated.`,

    "count-subarrays-divisible-by-k": `## Problem statement

Given an integer array and positive \`k\`, count contiguous subarrays whose sum is divisible by \`k\`.

## Example

\`[4, 5, 0, -2, -3, 1]\`, \`k = 5\` returns 7.

## Brute-force approach: sum all subarrays

Use a running sum for each start index and test its remainder.

~~~java
public class Solution {
    public static long countDivisibleBruteForce(int[] values, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        long count = 0;
        for (int start = 0; start < values.length; start++) {
            long sum = 0;
            for (int end = start; end < values.length; end++) {
                sum += values[end];
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

Equal prefix remainders mean the difference between those prefixes is divisible by \`k\`. Normalize negative remainders with \`floorMod\`.

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

    "longest-equal-zero-one-subarray": `## Problem statement

Given a binary array, return the longest contiguous subarray with equal numbers of zeros and ones.

## Example

\`[0, 1, 0]\` returns 2 for either \`[0, 1]\` or \`[1, 0]\`.

## Brute-force approach: count zeros and ones in each range

For every range, count both values and retain its length when the counts match.

~~~java
public class Solution {
    public static int longestBalancedBruteForce(int[] values) {
        int best = 0;
        for (int start = 0; start < values.length; start++) {
            int balance = 0;
            for (int end = start; end < values.length; end++) {
                balance += values[end] == 1 ? 1 : -1;
                if (balance == 0) best = Math.max(best, end - start + 1);
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: replace zero with minus one

With zero treated as -1 and one as +1, equal counts have sum zero. Store the first index for each prefix balance.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int longestBalanced(int[] values) {
        Map<Integer, Integer> firstIndex = new HashMap<>();
        firstIndex.put(0, -1);
        int balance = 0, best = 0;
        for (int i = 0; i < values.length; i++) {
            balance += values[i] == 1 ? 1 : -1;
            Integer first = firstIndex.putIfAbsent(balance, i);
            if (first != null) best = Math.max(best, i - first);
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)`,

    "longest-equal-zero-one-two-subarray": `## Problem statement

Given an array containing only 0, 1, and 2, return the longest contiguous subarray in which all three counts are equal.

## Example

\`[0, 1, 2, 0, 1, 2]\` returns 6.

## Brute-force approach: count each value per subarray

Extend each start position and track the three frequencies.

~~~java
public class Solution {
    public static int longestEqual012BruteForce(int[] values) {
        int best = 0;
        for (int start = 0; start < values.length; start++) {
            int[] count = new int[3];
            for (int end = start; end < values.length; end++) {
                count[values[end]]++;
                if (count[0] == count[1] && count[1] == count[2]) {
                    best = Math.max(best, end - start + 1);
                }
            }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: store two prefix differences

For equal counts, both \`count(0) - count(1)\` and \`count(1) - count(2)\` are zero. Repeated difference pairs bound a balanced subarray.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int longestEqual012(int[] values) {
        Map<String, Integer> firstIndex = new HashMap<>();
        firstIndex.put("0,0", -1);
        int zero = 0, one = 0, two = 0, best = 0;
        for (int i = 0; i < values.length; i++) {
            if (values[i] == 0) zero++;
            else if (values[i] == 1) one++;
            else if (values[i] == 2) two++;
            else throw new IllegalArgumentException("Only 0, 1, and 2 are allowed");
            String state = (zero - one) + "," + (one - two);
            Integer first = firstIndex.putIfAbsent(state, i);
            if (first != null) best = Math.max(best, i - first);
        }
        return best;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)`,

    "minimum-window-substring": `## Problem statement

Given strings \`s\` and \`t\`, return the shortest substring of \`s\` containing every character in \`t\` with its required multiplicity. Return an empty string if no such window exists.

## Example

\`s = "ADOBECODEBANC"\`, \`t = "ABC"\` returns \`"BANC"\`.

## Brute-force approach: test every substring

Check each possible substring and compare its character counts with the requirement.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static String minWindowBruteForce(String s, String t) {
        if (t.isEmpty()) return "";
        Map<Character, Integer> need = counts(t);
        String best = "";
        for (int left = 0; left < s.length(); left++) {
            Map<Character, Integer> window = new HashMap<>();
            for (int right = left; right < s.length(); right++) {
                window.merge(s.charAt(right), 1, Integer::sum);
                if (covers(window, need)) {
                    if (best.isEmpty() || right - left + 1 < best.length()) {
                        best = s.substring(left, right + 1);
                    }
                    break;
                }
            }
        }
        return best;
    }

    private static Map<Character, Integer> counts(String value) {
        Map<Character, Integer> result = new HashMap<>();
        for (char c : value.toCharArray()) result.merge(c, 1, Integer::sum);
        return result;
    }

    private static boolean covers(Map<Character, Integer> window, Map<Character, Integer> need) {
        for (Map.Entry<Character, Integer> entry : need.entrySet()) {
            if (window.getOrDefault(entry.getKey(), 0) < entry.getValue()) return false;
        }
        return true;
    }
}
~~~

- **Time:** O(n² · u), where u is the number of required distinct characters
- **Extra space:** O(u + alphabet size)

## Optimized approach: sliding window

Expand the right edge until all required counts are met. Then shrink from the left while the window remains valid.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static String minWindow(String s, String t) {
        if (t.isEmpty() || s.length() < t.length()) return "";
        Map<Character, Integer> need = new HashMap<>(), window = new HashMap<>();
        for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
        int formed = 0, required = need.size(), left = 0, bestStart = 0, bestLength = Integer.MAX_VALUE;
        for (int right = 0; right < s.length(); right++) {
            char added = s.charAt(right);
            window.merge(added, 1, Integer::sum);
            if (need.containsKey(added) && window.get(added).intValue() == need.get(added).intValue()) formed++;
            while (formed == required) {
                int length = right - left + 1;
                if (length < bestLength) { bestLength = length; bestStart = left; }
                char removed = s.charAt(left++);
                if (need.containsKey(removed)
                        && window.get(removed).intValue() == need.get(removed).intValue()) formed--;
                window.put(removed, window.get(removed) - 1);
            }
        }
        return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
    }
}
~~~

- **Time:** O(|s| + |t|) expected
- **Extra space:** O(u), for distinct characters in the maps`,

    "isomorphic-strings": `## Problem statement

Return whether two strings of equal length are isomorphic: each character in the first must map consistently to one character in the second, and two different characters cannot map to the same character.

## Example

\`"egg"\` and \`"add"\` return true; \`"foo"\` and \`"bar"\` return false.

## Brute-force approach: verify all character pairs

For each pair of positions, the characters must be equal in the first string exactly when their partners are equal in the second.

~~~java
public class Solution {
    public static boolean isIsomorphicBruteForce(String a, String b) {
        if (a.length() != b.length()) return false;
        for (int i = 0; i < a.length(); i++) {
            for (int j = 0; j < i; j++) {
                if ((a.charAt(i) == a.charAt(j)) != (b.charAt(i) == b.charAt(j))) return false;
            }
        }
        return true;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: maintain a bijection

Track mappings in both directions. A conflict in either map violates consistency or one-to-one mapping.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static boolean isIsomorphic(String a, String b) {
        if (a.length() != b.length()) return false;
        Map<Character, Character> forward = new HashMap<>(), reverse = new HashMap<>();
        for (int i = 0; i < a.length(); i++) {
            char x = a.charAt(i), y = b.charAt(i);
            if ((forward.containsKey(x) && forward.get(x) != y)
                    || (reverse.containsKey(y) && reverse.get(y) != x)) return false;
            forward.put(x, y);
            reverse.put(y, x);
        }
        return true;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(u), distinct characters in the inputs`,

    "word-pattern": `## Problem statement

Determine whether a character pattern maps one-to-one to the words in a space-separated sentence. The sentence uses single spaces; an empty pattern matches an empty sentence.

## Example

\`pattern = "abba"\`, \`sentence = "dog cat cat dog"\` returns true.

## Brute-force approach: compare earlier pairs

Split into words, then ensure equal pattern characters correspond exactly to equal words at every pair of positions.

~~~java
public class Solution {
    public static boolean followsPatternBruteForce(String pattern, String sentence) {
        String[] words = sentence.isEmpty() ? new String[0] : sentence.split(" ", -1);
        if (pattern.length() != words.length) return false;
        for (int i = 0; i < words.length; i++) {
            for (int j = 0; j < i; j++) {
                if ((pattern.charAt(i) == pattern.charAt(j)) != words[i].equals(words[j])) return false;
            }
        }
        return true;
    }
}
~~~

- **Time:** O(n² · L), where L is average word length
- **Extra space:** O(n · L) for split words

## Optimized approach: two maps

Map each pattern character to a word and each word back to a character. This enforces a bijection.

~~~java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static boolean followsPattern(String pattern, String sentence) {
        String[] words = sentence.isEmpty() ? new String[0] : sentence.split(" ", -1);
        if (pattern.length() != words.length) return false;
        Map<Character, String> forward = new HashMap<>();
        Map<String, Character> reverse = new HashMap<>();
        for (int i = 0; i < words.length; i++) {
            char key = pattern.charAt(i);
            if ((forward.containsKey(key) && !forward.get(key).equals(words[i]))
                    || (reverse.containsKey(words[i]) && reverse.get(words[i]) != key)) return false;
            forward.put(key, words[i]);
            reverse.put(words[i], key);
        }
        return true;
    }
}
~~~

- **Time:** O(n · L) expected
- **Extra space:** O(n · L)`,

    "top-k-frequent-elements": `## Problem statement

Return the \`k\` values with the highest frequencies. Break frequency ties by choosing smaller values first. Assume \`0 <= k <=\` the number of distinct values.

## Example

\`[1, 1, 1, 2, 2, 3]\`, \`k = 2\` returns \`[1, 2]\`.

## Brute-force approach: count, then sort all distinct values

Count values, then sort by descending frequency and ascending value.

~~~java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {
    public static int[] topKBruteForce(int[] values, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int value : values) count.merge(value, 1, Integer::sum);
        List<Integer> keys = new ArrayList<>(count.keySet());
        keys.sort(Comparator.<Integer>comparingInt(count::get).reversed().thenComparingInt(x -> x));
        if (k < 0 || k > keys.size()) throw new IllegalArgumentException("Invalid k");
        return keys.subList(0, k).stream().mapToInt(Integer::intValue).toArray();
    }
}
~~~

- **Time:** O(n + u log u)
- **Extra space:** O(u)

## Optimized approach: bounded min-heap

Keep only the best \`k\` values in a min-heap. The heap root is the weakest retained candidate: lower frequency first, and larger value first on a tie.

~~~java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class Solution {
    public static int[] topK(int[] values, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int value : values) count.merge(value, 1, Integer::sum);
        if (k < 0 || k > count.size()) throw new IllegalArgumentException("Invalid k");
        Comparator<Integer> weakestFirst = Comparator
                .comparingInt((Integer value) -> count.get(value))
                .thenComparing(Comparator.reverseOrder());
        PriorityQueue<Integer> heap = new PriorityQueue<>(weakestFirst);
        for (int value : count.keySet()) {
            heap.offer(value);
            if (heap.size() > k) heap.poll();
        }
        List<Integer> result = new ArrayList<>(heap);
        result.sort(Comparator.<Integer>comparingInt(count::get).reversed().thenComparingInt(x -> x));
        return result.stream().mapToInt(Integer::intValue).toArray();
    }
}
~~~

- **Time:** O(n + u log k + k log k)
- **Extra space:** O(u + k) for the frequency map and heap`,
};
