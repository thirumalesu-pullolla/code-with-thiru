export const twoPointersContent = {
    "tp-two-sum-sorted": `## Problem statement

Given a sorted integer array and target, return the zero-based indices of two distinct values that sum to the target, or an empty array if none exists.

## Example

\`[1, 2, 4, 6, 8]\`, target \`10\` returns \`[1, 4]\`.

## Brute-force approach: inspect every pair

Try each pair of distinct indices.

~~~java
public class Solution {
    public static int[] twoSumBruteForce(int[] values, int target) {
        for (int i = 0; i < values.length; i++) {
            for (int j = i + 1; j < values.length; j++) {
                if ((long) values[i] + values[j] == target) return new int[] {i, j};
            }
        }
        return new int[0];
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1), excluding the result

## Optimized approach: move two pointers

If the sum is too small, move the left pointer up; if too large, move the right pointer down.

~~~java
public class Solution {
    public static int[] twoSum(int[] values, int target) {
        int left = 0, right = values.length - 1;
        while (left < right) {
            long sum = (long) values[left] + values[right];
            if (sum == target) return new int[] {left, right};
            if (sum < target) left++;
            else right--;
        }
        return new int[0];
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "tp-two-sum-ii": `## Problem statement

Given a sorted array and target, return one-based indices of two distinct values that sum to the target. Exactly one solution exists.

## Example

\`[2, 7, 11, 15]\`, target \`9\` returns \`[1, 2]\`.

## Brute-force approach: try every pair

Check all ordered index pairs and convert the matching indices to one-based numbering.

~~~java
public class Solution {
    public static int[] twoSumBruteForce(int[] values, int target) {
        for (int i = 0; i < values.length; i++) {
            for (int j = i + 1; j < values.length; j++) {
                if ((long) values[i] + values[j] == target) return new int[] {i + 1, j + 1};
            }
        }
        throw new IllegalArgumentException("No solution exists");
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1), excluding output

## Optimized approach: sorted-array pointers

Start at both ends and move the pointer that can bring the sum toward the target.

~~~java
public class Solution {
    public static int[] twoSum(int[] values, int target) {
        int left = 0, right = values.length - 1;
        while (left < right) {
            long sum = (long) values[left] + values[right];
            if (sum == target) return new int[] {left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        throw new IllegalArgumentException("No solution exists");
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "tp-three-sum": `## Problem statement

Return all unique triplets of values whose sum is zero. The order of triplets does not matter.

## Example

\`[-1, 0, 1, 2, -1, -4]\` returns \`[[-1, -1, 2], [-1, 0, 1]]\`.

## Brute-force approach: enumerate triples

Check all triples and store each sorted value triplet once.

~~~java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class Solution {
    public static List<List<Integer>> threeSumBruteForce(int[] values) {
        Set<String> seen = new TreeSet<>();
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < values.length; i++)
            for (int j = i + 1; j < values.length; j++)
                for (int k = j + 1; k < values.length; k++)
                    if ((long) values[i] + values[j] + values[k] == 0) {
                        int[] triple = {values[i], values[j], values[k]};
                        Arrays.sort(triple);
                        if (seen.add(Arrays.toString(triple))) result.add(List.of(triple[0], triple[1], triple[2]));
                    }
        return result;
    }
}
~~~

- **Time:** O(n³ log r), where r is the number of unique results
- **Extra space:** O(r)

## Optimized approach: sort and use two pointers

Sort a copy, fix one value, then find pairs for its negation. Skip equal values to avoid duplicate triplets.

~~~java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<List<Integer>> threeSum(int[] values) {
        int[] a = values.clone();
        Arrays.sort(a);
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < a.length - 2; i++) {
            if (i > 0 && a[i] == a[i - 1]) continue;
            int left = i + 1, right = a.length - 1;
            while (left < right) {
                long sum = (long) a[i] + a[left] + a[right];
                if (sum == 0) {
                    result.add(List.of(a[i], a[left], a[right]));
                    int low = a[left], high = a[right];
                    while (left < right && a[left] == low) left++;
                    while (left < right && a[right] == high) right--;
                } else if (sum < 0) left++;
                else right--;
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(n) for sorting copy, excluding output`,

    "tp-four-sum": `## Problem statement

Return all unique quadruplets whose values sum to a target.

## Example

\`[1, 0, -1, 0, -2, 2]\`, target \`0\` returns \`[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]\`.

## Brute-force approach: enumerate four indices

Check each index quadruple, sort its values, and suppress duplicate combinations.

~~~java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class Solution {
    public static List<List<Integer>> fourSumBruteForce(int[] values, int target) {
        Set<String> seen = new TreeSet<>();
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < values.length; i++) for (int j = i + 1; j < values.length; j++)
            for (int k = j + 1; k < values.length; k++) for (int m = k + 1; m < values.length; m++) {
                if ((long) values[i] + values[j] + values[k] + values[m] == target) {
                    int[] q = {values[i], values[j], values[k], values[m]};
                    Arrays.sort(q);
                    if (seen.add(Arrays.toString(q))) result.add(List.of(q[0], q[1], q[2], q[3]));
                }
            }
        return result;
    }
}
~~~

- **Time:** O(n⁴ log r)
- **Extra space:** O(r) for unique results

## Optimized approach: sort and reduce to two pointers

Fix two values, then search the remaining sorted suffix with two pointers. Skip repeated fixed and endpoint values.

~~~java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<List<Integer>> fourSum(int[] values, int target) {
        int[] a = values.clone();
        Arrays.sort(a);
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < a.length - 3; i++) {
            if (i > 0 && a[i] == a[i - 1]) continue;
            for (int j = i + 1; j < a.length - 2; j++) {
                if (j > i + 1 && a[j] == a[j - 1]) continue;
                int left = j + 1, right = a.length - 1;
                while (left < right) {
                    long sum = (long) a[i] + a[j] + a[left] + a[right];
                    if (sum == target) {
                        result.add(List.of(a[i], a[j], a[left], a[right]));
                        int low = a[left], high = a[right];
                        while (left < right && a[left] == low) left++;
                        while (left < right && a[right] == high) right--;
                    } else if (sum < target) left++;
                    else right--;
                }
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n³)
- **Extra space:** O(n) for the sorted copy, excluding output`,

    "tp-zero-sum-triplets": `## Problem statement

Return all unique triplets whose values sum to zero. This is the same zero-target triplet requirement as Three Sum.

## Example

\`[-2, 0, 1, 1, 2]\` returns \`[[-2, 0, 2], [-2, 1, 1]]\`.

## Brute-force approach: enumerate triples

Test every triple of indices and add a normalized value triplet only once.

~~~java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class Solution {
    public static List<List<Integer>> zeroTripletsBruteForce(int[] a) {
        Set<String> unique = new TreeSet<>();
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < a.length; i++) for (int j = i + 1; j < a.length; j++)
            for (int k = j + 1; k < a.length; k++) if ((long) a[i] + a[j] + a[k] == 0) {
                int[] t = {a[i], a[j], a[k]};
                Arrays.sort(t);
                if (unique.add(Arrays.toString(t))) result.add(List.of(t[0], t[1], t[2]));
            }
        return result;
    }
}
~~~

- **Time:** O(n³ log r)
- **Extra space:** O(r)

## Optimized approach: sort and sweep

Sort a copy, fix the first value, and move two pointers according to the current sum. Skip duplicates.

~~~java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<List<Integer>> zeroTriplets(int[] values) {
        int[] a = values.clone();
        Arrays.sort(a);
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i + 2 < a.length; i++) {
            if (i > 0 && a[i] == a[i - 1]) continue;
            int left = i + 1, right = a.length - 1;
            while (left < right) {
                long sum = (long) a[i] + a[left] + a[right];
                if (sum == 0) {
                    result.add(List.of(a[i], a[left], a[right]));
                    int x = a[left], y = a[right];
                    while (left < right && a[left] == x) left++;
                    while (left < right && a[right] == y) right--;
                } else if (sum < 0) left++;
                else right--;
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(n), excluding output`,

    "tp-triplet-target-sum": `## Problem statement

Return whether three distinct array elements sum to a target.

## Example

\`[1, 4, 6, 8]\`, target \`11\` returns true for \`1 + 4 + 6\`.

## Brute-force approach: enumerate triples

Try every three distinct positions.

~~~java
public class Solution {
    public static boolean hasTripletBruteForce(int[] values, int target) {
        for (int i = 0; i < values.length; i++)
            for (int j = i + 1; j < values.length; j++)
                for (int k = j + 1; k < values.length; k++)
                    if ((long) values[i] + values[j] + values[k] == target) return true;
        return false;
    }
}
~~~

- **Time:** O(n³)
- **Extra space:** O(1)

## Optimized approach: sort and search pairs

Sort a copy, fix one value, and search the remaining suffix with inward-moving pointers.

~~~java
import java.util.Arrays;

public class Solution {
    public static boolean hasTriplet(int[] values, int target) {
        int[] a = values.clone();
        Arrays.sort(a);
        for (int i = 0; i < a.length - 2; i++) {
            int left = i + 1, right = a.length - 1;
            while (left < right) {
                long sum = (long) a[i] + a[left] + a[right];
                if (sum == target) return true;
                if (sum < target) left++;
                else right--;
            }
        }
        return false;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(n) for the copy`,

    "tp-container-most-water": `## Problem statement

Given non-negative heights, choose two lines that contain the most water. The area is width times the shorter height.

## Example

\`[1, 8, 6, 2, 5, 4, 8, 3, 7]\` returns 49.

## Brute-force approach: evaluate every pair

Calculate the area for each pair of lines.

~~~java
public class Solution {
    public static long maxAreaBruteForce(int[] height) {
        long best = 0;
        for (int left = 0; left < height.length; left++)
            for (int right = left + 1; right < height.length; right++)
                best = Math.max(best, (long) (right - left) * Math.min(height[left], height[right]));
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: discard the shorter side

The shorter line limits area. Moving the taller side inward only reduces width without improving that limiting height, so move the shorter side.

~~~java
public class Solution {
    public static long maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        long best = 0;
        while (left < right) {
            best = Math.max(best, (long) (right - left) * Math.min(height[left], height[right]));
            if (height[left] < height[right]) left++;
            else right--;
        }
        return best;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "tp-trapping-rain-water": `## Problem statement

Given non-negative bar heights, return the total units of rainwater trapped after raining.

## Example

\`[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]\` returns 6.

## Brute-force approach: find both boundary maxima

For each bar, scan left and right for the tallest walls. Water above it is the smaller wall minus its height.

~~~java
public class Solution {
    public static long trappedBruteForce(int[] height) {
        long water = 0;
        for (int i = 0; i < height.length; i++) {
            int leftMax = 0, rightMax = 0;
            for (int j = 0; j <= i; j++) leftMax = Math.max(leftMax, height[j]);
            for (int j = i; j < height.length; j++) rightMax = Math.max(rightMax, height[j]);
            water += Math.max(0, Math.min(leftMax, rightMax) - height[i]);
        }
        return water;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: two pointers and boundary maxima

Process the side with the smaller known maximum; that maximum is the limiting wall for the current position.

~~~java
public class Solution {
    public static long trappedWater(int[] height) {
        int left = 0, right = height.length - 1, leftMax = 0, rightMax = 0;
        long water = 0;
        while (left <= right) {
            if (leftMax <= rightMax) {
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left++];
            } else {
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right--];
            }
        }
        return water;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "tp-remove-duplicates-sorted": `## Problem statement

Compact a sorted array in place so each distinct value appears once in order. Return the number of distinct values; the suffix is ignored.

## Example

\`[0, 0, 1, 1, 2]\` becomes prefix \`[0, 1, 2]\`; return 3.

## Brute-force approach: collect unique values

Use an insertion-ordered set and copy its values back.

~~~java
import java.util.LinkedHashSet;
import java.util.Set;

public class Solution {
    public static int removeDuplicatesBruteForce(int[] values) {
        Set<Integer> unique = new LinkedHashSet<>();
        for (int value : values) unique.add(value);
        int write = 0;
        for (int value : unique) values[write++] = value;
        return write;
    }
}
~~~

- **Time:** O(n) expected
- **Extra space:** O(n)

## Optimized approach: read/write pointers

The sorted order makes each duplicate adjacent to its previous copy. Write only when a new value appears.

~~~java
public class Solution {
    public static int removeDuplicates(int[] values) {
        if (values.length == 0) return 0;
        int write = 1;
        for (int read = 1; read < values.length; read++) {
            if (values[read] != values[write - 1]) values[write++] = values[read];
        }
        return write;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "tp-remove-specified-element": `## Problem statement

Remove every occurrence of a value in place and return the new length. The remaining elements may be in any order.

## Example

\`[3, 2, 2, 3]\`, remove \`3\`, returns length 2 with prefix \`[2, 2]\`.

## Brute-force approach: copy retained values

Write each value not equal to the target into a temporary array, then copy the retained prefix back.

~~~java
public class Solution {
    public static int removeElementBruteForce(int[] values, int target) {
        int[] kept = new int[values.length];
        int size = 0;
        for (int value : values) if (value != target) kept[size++] = value;
        System.arraycopy(kept, 0, values, 0, size);
        return size;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: overwrite from both ends

When the left pointer finds a removable value, replace it with the rightmost unchecked value.

~~~java
public class Solution {
    public static int removeElement(int[] values, int target) {
        int left = 0, right = values.length;
        while (left < right) {
            if (values[left] == target) values[left] = values[--right];
            else left++;
        }
        return left;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

This method does not preserve the order of retained values.`,

    "tp-reverse-character-array": `## Problem statement

Reverse a character array in place using constant extra space.

## Example

\`['h', 'e', 'l', 'l', 'o']\` becomes \`['o', 'l', 'l', 'e', 'h']\`.

## Brute-force approach: build a reversed copy

Read from the end into a temporary array, then copy it back.

~~~java
public class Solution {
    public static void reverseBruteForce(char[] values) {
        char[] reversed = new char[values.length];
        for (int i = 0; i < values.length; i++) reversed[i] = values[values.length - 1 - i];
        System.arraycopy(reversed, 0, values, 0, values.length);
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: swap inward

Swap symmetric positions until the pointers meet.

~~~java
public class Solution {
    public static void reverse(char[] values) {
        int left = 0, right = values.length - 1;
        while (left < right) {
            char temporary = values[left];
            values[left++] = values[right];
            values[right--] = temporary;
        }
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "tp-valid-palindrome": `## Problem statement

Return whether a string is a palindrome after ignoring non-alphanumeric ASCII characters and letter case.

## Example

\`"A man, a plan, a canal: Panama"\` returns true.

## Brute-force approach: normalize into a new string

Keep only letters and digits, lowercase them, then compare the normalized string with its reverse.

~~~java
public class Solution {
    public static boolean isPalindromeBruteForce(String text) {
        StringBuilder clean = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (Character.isLetterOrDigit(c)) clean.append(Character.toLowerCase(c));
        }
        return clean.toString().contentEquals(clean.reverse());
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: skip characters with two pointers

Move inward past ignored characters and compare lowercase characters directly.

~~~java
public class Solution {
    public static boolean isPalindrome(String text) {
        int left = 0, right = text.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(text.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(text.charAt(right))) right--;
            if (Character.toLowerCase(text.charAt(left++))
                    != Character.toLowerCase(text.charAt(right--))) return false;
        }
        return true;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "tp-valid-palindrome-one-deletion": `## Problem statement

Return whether a string can be made a palindrome by deleting at most one character.

## Example

\`"abca"\` returns true by deleting either \`b\` or \`c\`; \`"abc"\` returns false.

## Brute-force approach: try each deletion

First test the original string, then build and test each string with one character removed.

~~~java
public class Solution {
    public static boolean validAfterOneDeletionBruteForce(String text) {
        if (isPalindrome(text, -1)) return true;
        for (int removed = 0; removed < text.length(); removed++) {
            if (isPalindrome(text, removed)) return true;
        }
        return false;
    }

    private static boolean isPalindrome(String text, int skipped) {
        int left = 0, right = text.length() - 1;
        while (left < right) {
            if (left == skipped) left++;
            if (right == skipped) right--;
            if (left < right && text.charAt(left++) != text.charAt(right--)) return false;
        }
        return true;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: skip one side at the first mismatch

Move inward while characters match. At the first mismatch, the only possibilities are deleting the left or right character.

~~~java
public class Solution {
    public static boolean validPalindrome(String text) {
        int left = 0, right = text.length() - 1;
        while (left < right && text.charAt(left) == text.charAt(right)) {
            left++;
            right--;
        }
        return isPalindrome(text, left + 1, right) || isPalindrome(text, left, right - 1);
    }

    private static boolean isPalindrome(String text, int left, int right) {
        while (left < right) {
            if (text.charAt(left++) != text.charAt(right--)) return false;
        }
        return true;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "tp-pair-closest-target": `## Problem statement

Given a sorted array with at least two values and a target, return a pair whose sum has the smallest absolute difference from the target.

## Example

\`[1, 3, 4, 7, 10]\`, target \`15\` returns \`[4, 10]\`.

## Brute-force approach: inspect every pair

Try all pairs, comparing differences in \`long\` to avoid overflow.

~~~java
public class Solution {
    public static int[] closestPairBruteForce(int[] values, int target) {
        if (values.length < 2) throw new IllegalArgumentException("At least two values are required");
        int[] best = {values[0], values[1]};
        long difference = Long.MAX_VALUE;
        for (int i = 0; i < values.length; i++) for (int j = i + 1; j < values.length; j++) {
            long current = Math.abs((long) values[i] + values[j] - target);
            if (current < difference) { difference = current; best = new int[] {values[i], values[j]}; }
        }
        return best;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(1), excluding result

## Optimized approach: move endpoints by sum

The sorted order tells which pointer to move: a low sum needs a larger left value; a high sum needs a smaller right value.

~~~java
public class Solution {
    public static int[] closestPair(int[] values, int target) {
        if (values.length < 2) throw new IllegalArgumentException("At least two values are required");
        int left = 0, right = values.length - 1;
        int[] best = {values[left], values[right]};
        long difference = Long.MAX_VALUE;
        while (left < right) {
            long sum = (long) values[left] + values[right];
            long current = Math.abs(sum - target);
            if (current < difference) { difference = current; best = new int[] {values[left], values[right]}; }
            if (sum < target) left++;
            else right--;
        }
        return best;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "tp-smallest-difference-arrays": `## Problem statement

Given two sorted integer arrays, return one value from each with the smallest absolute difference. Use \`long\` for the difference.

## Example

\`[1, 3, 15, 20]\` and \`[8, 19, 23, 24]\` return \`[20, 19]\`.

## Brute-force approach: compare every cross-array pair

Examine all pairs and retain the smallest difference.

~~~java
public class Solution {
    public static int[] smallestDifferenceBruteForce(int[] a, int[] b) {
        if (a.length == 0 || b.length == 0) throw new IllegalArgumentException("Arrays must be non-empty");
        int[] best = {a[0], b[0]};
        long difference = Long.MAX_VALUE;
        for (int x : a) for (int y : b) {
            long current = Math.abs((long) x - y);
            if (current < difference) { difference = current; best = new int[] {x, y}; }
        }
        return best;
    }
}
~~~

- **Time:** O(nm)
- **Extra space:** O(1), excluding result

## Optimized approach: advance the smaller value

At each pair, the smaller value is the only one that can move toward a closer match, so advance its array pointer.

~~~java
public class Solution {
    public static int[] smallestDifference(int[] a, int[] b) {
        if (a.length == 0 || b.length == 0) throw new IllegalArgumentException("Arrays must be non-empty");
        int i = 0, j = 0;
        int[] best = {a[0], b[0]};
        long difference = Long.MAX_VALUE;
        while (i < a.length && j < b.length) {
            long current = Math.abs((long) a[i] - b[j]);
            if (current < difference) { difference = current; best = new int[] {a[i], b[j]}; }
            if (a[i] < b[j]) i++;
            else j++;
        }
        return best;
    }
}
~~~

- **Time:** O(n + m)
- **Extra space:** O(1)`,

    "tp-merge-sorted-arrays-in-place": `## Problem statement

Merge the first \`m\` sorted values in array \`a\` with the \`n\` values in sorted array \`b\`. Array \`a\` has capacity for all \`m + n\` results.

## Example

\`a = [1, 3, 5, 0, 0, 0], m = 3\`; \`b = [2, 4, 6]\` becomes \`[1, 2, 3, 4, 5, 6]\`.

## Brute-force approach: merge into a temporary array

Build a separate sorted result, then copy it into \`a\`.

~~~java
public class Solution {
    public static void mergeBruteForce(int[] a, int m, int[] b, int n) {
        int[] result = new int[m + n];
        int i = 0, j = 0, write = 0;
        while (i < m && j < n) result[write++] = a[i] <= b[j] ? a[i++] : b[j++];
        while (i < m) result[write++] = a[i++];
        while (j < n) result[write++] = b[j++];
        System.arraycopy(result, 0, a, 0, result.length);
    }
}
~~~

- **Time:** O(m + n)
- **Extra space:** O(m + n)

## Optimized approach: merge backward

Write the largest remaining value from the end of \`a\`. This avoids overwriting its unread prefix.

~~~java
public class Solution {
    public static void merge(int[] a, int m, int[] b, int n) {
        int i = m - 1, j = n - 1, write = m + n - 1;
        while (j >= 0) {
            if (i >= 0 && a[i] > b[j]) a[write--] = a[i--];
            else a[write--] = b[j--];
        }
    }
}
~~~

- **Time:** O(m + n)
- **Extra space:** O(1)`,

    "tp-sorted-squares": `## Problem statement

Given a non-decreasing integer array, return the squares in non-decreasing order. Use \`long\` so squaring any int is safe.

## Example

\`[-4, -1, 0, 3, 10]\` returns \`[0, 1, 9, 16, 100]\`.

## Brute-force approach: square then sort

Square every value, then sort the resulting array.

~~~java
import java.util.Arrays;

public class Solution {
    public static long[] sortedSquaresBruteForce(int[] values) {
        long[] result = new long[values.length];
        for (int i = 0; i < values.length; i++) result[i] = (long) values[i] * values[i];
        Arrays.sort(result);
        return result;
    }
}
~~~

- **Time:** O(n log n)
- **Extra space:** O(n) for the returned array

## Optimized approach: fill from the largest square

The largest absolute values are at one of the two ends. Compare them and fill the result from right to left.

~~~java
public class Solution {
    public static long[] sortedSquares(int[] values) {
        long[] result = new long[values.length];
        int left = 0, right = values.length - 1;
        for (int write = values.length - 1; write >= 0; write--) {
            long a = (long) values[left] * values[left];
            long b = (long) values[right] * values[right];
            if (a > b) { result[write] = a; left++; }
            else { result[write] = b; right--; }
        }
        return result;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n) for output`,

    "tp-partition-around-pivot": `## Problem statement

Rearrange values so numbers smaller than the pivot come first, equal values next, and larger values last. The order within groups does not matter.

## Example

\`[9, 2, 7, 2, 5]\`, pivot \`5\` may become \`[2, 2, 5, 7, 9]\`.

## Brute-force approach: build three groups

Collect values into less-than, equal-to, and greater-than groups, then write them back.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static void partitionBruteForce(int[] values, int pivot) {
        List<Integer> low = new ArrayList<>(), equal = new ArrayList<>(), high = new ArrayList<>();
        for (int value : values) {
            if (value < pivot) low.add(value);
            else if (value == pivot) equal.add(value);
            else high.add(value);
        }
        int write = 0;
        for (int value : low) values[write++] = value;
        for (int value : equal) values[write++] = value;
        for (int value : high) values[write++] = value;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: Dutch National Flag pointers

Maintain boundaries for low and high groups while scanning the unknown region once.

~~~java
public class Solution {
    public static void partition(int[] values, int pivot) {
        int low = 0, current = 0, high = values.length - 1;
        while (current <= high) {
            if (values[current] < pivot) swap(values, low++, current++);
            else if (values[current] > pivot) swap(values, current, high--);
            else current++;
        }
    }

    private static void swap(int[] a, int i, int j) {
        int temporary = a[i]; a[i] = a[j]; a[j] = temporary;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)`,

    "tp-unique-triplets-target": `## Problem statement

Return all unique triplets whose values sum to a target. The input may contain duplicates.

## Example

\`[1, 0, -1, 0, -2, 2]\`, target \`0\` returns \`[[-2, 0, 2], [-1, 0, 1]]\`.

## Brute-force approach: enumerate triples

Check all triples of indices and store each sorted value triple once.

~~~java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class Solution {
    public static List<List<Integer>> tripletsBruteForce(int[] a, int target) {
        Set<String> seen = new TreeSet<>();
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < a.length; i++) for (int j = i + 1; j < a.length; j++)
            for (int k = j + 1; k < a.length; k++)
                if ((long) a[i] + a[j] + a[k] == target) {
                    int[] t = {a[i], a[j], a[k]};
                    Arrays.sort(t);
                    if (seen.add(Arrays.toString(t))) result.add(List.of(t[0], t[1], t[2]));
                }
        return result;
    }
}
~~~

- **Time:** O(n³ log r)
- **Extra space:** O(r)

## Optimized approach: sort and two-pointer search

Fix one value and search the remaining range for pairs summing to \`target - fixed\`. Skip duplicates at each level.

~~~java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<List<Integer>> triplets(int[] values, int target) {
        int[] a = values.clone();
        Arrays.sort(a);
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i + 2 < a.length; i++) {
            if (i > 0 && a[i] == a[i - 1]) continue;
            int left = i + 1, right = a.length - 1;
            while (left < right) {
                long sum = (long) a[i] + a[left] + a[right];
                if (sum == target) {
                    result.add(List.of(a[i], a[left], a[right]));
                    int x = a[left], y = a[right];
                    while (left < right && a[left] == x) left++;
                    while (left < right && a[right] == y) right--;
                } else if (sum < target) left++;
                else right--;
            }
        }
        return result;
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(n) for sorted copy, excluding output`,

    "tp-backspace-string-compare": `## Problem statement

Compare two strings after applying backspaces, where \`#\` removes the previous character if one exists.

## Example

\`"ab#c"\` and \`"ad#c"\` are equal after processing, so return true.

## Brute-force approach: build processed strings

Use a stack-like builder to apply each backspace, then compare results.

~~~java
public class Solution {
    private static String process(String text) {
        StringBuilder result = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (c == '#') {
                if (result.length() > 0) result.deleteCharAt(result.length() - 1);
            } else result.append(c);
        }
        return result.toString();
    }

    public static boolean backspaceCompareBruteForce(String a, String b) {
        return process(a).equals(process(b));
    }
}
~~~

- **Time:** O(n + m)
- **Extra space:** O(n + m)

## Optimized approach: compare from right to left

Walk backward while counting pending backspaces. Compare only characters that survive, without constructing processed strings.

~~~java
public class Solution {
    public static boolean backspaceCompare(String a, String b) {
        int i = a.length() - 1, j = b.length() - 1;
        while (true) {
            i = previousVisible(a, i);
            j = previousVisible(b, j);
            if (i < 0 || j < 0) return i == j;
            if (a.charAt(i--) != b.charAt(j--)) return false;
        }
    }

    private static int previousVisible(String text, int index) {
        int skipped = 0;
        while (index >= 0) {
            if (text.charAt(index) == '#') { skipped++; index--; }
            else if (skipped > 0) { skipped--; index--; }
            else return index;
        }
        return index;
    }
}
~~~

- **Time:** O(n + m)
- **Extra space:** O(1)`,
};
