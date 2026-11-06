export const sortingSelectionContent = {
  "sort-bubble-sort": `## Problem statement

Sort an integer array in ascending order using bubble sort. Return a new array and leave the input unchanged.

## Example

\`[5, 1, 4, 2]\` returns \`[1, 2, 4, 5]\`.

## Brute-force approach: selection sort

Repeatedly locate the smallest value in the unsorted suffix and put it next.

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;

public class Solution {
    public static int[] sortBruteForce(int[] values) {
        int[] a = values.clone();
        for (int i = 0; i < a.length; i++) {
            int minimum = i;
            for (int j = i + 1; j < a.length; j++) {
                if (a[j] < a[minimum]) minimum = j;
            }
            int temp = a[i]; a[i] = a[minimum]; a[minimum] = temp;
        }
        return a;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n) for the returned copy

## Optimized approach: bubble sort with early exit

Swap adjacent out-of-order values. If a full pass makes no swaps, the array is already sorted.

\`\`\`java
public class Solution {
    public static int[] bubbleSort(int[] values) {
        int[] a = values.clone();
        for (int end = a.length - 1; end > 0; end--) {
            boolean swapped = false;
            for (int i = 0; i < end; i++) {
                if (a[i] > a[i + 1]) {
                    int temp = a[i]; a[i] = a[i + 1]; a[i + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
        return a;
    }
}
\`\`\`

- **Time:** O(n²) worst case, O(n) best case
- **Extra space:** O(n) for the returned copy`,

  "sort-selection-sort": `## Problem statement

Return a new copy of an integer array sorted in ascending order using selection sort.

## Example

\`[64, 25, 12, 22, 11]\` returns \`[11, 12, 22, 25, 64]\`.

## Brute-force approach: bubble sort

Repeatedly compare adjacent values and swap any inverted pair.

\`\`\`java
public class Solution {
    public static int[] sortBruteForce(int[] values) {
        int[] a = values.clone();
        for (int end = a.length - 1; end > 0; end--) {
            for (int i = 0; i < end; i++) {
                if (a[i] > a[i + 1]) {
                    int temp = a[i]; a[i] = a[i + 1]; a[i + 1] = temp;
                }
            }
        }
        return a;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n) for the returned copy

## Optimized approach: selection sort

At each index, find the smallest remaining value and swap it into its final position.

\`\`\`java
public class Solution {
    public static int[] selectionSort(int[] values) {
        int[] a = values.clone();
        for (int i = 0; i < a.length - 1; i++) {
            int minimum = i;
            for (int j = i + 1; j < a.length; j++) {
                if (a[j] < a[minimum]) minimum = j;
            }
            if (minimum != i) {
                int temp = a[i]; a[i] = a[minimum]; a[minimum] = temp;
            }
        }
        return a;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n) for the returned copy`,

  "sort-insertion-sort": `## Problem statement

Return a new copy of an integer array sorted in ascending order using insertion sort.

## Example

\`[5, 2, 4, 6, 1, 3]\` returns \`[1, 2, 3, 4, 5, 6]\`.

## Brute-force approach: selection sort

Selection sort makes a full scan for the next smallest value on every pass.

\`\`\`java
public class Solution {
    public static int[] sortBruteForce(int[] values) {
        int[] a = values.clone();
        for (int i = 0; i < a.length; i++) {
            int minimum = i;
            for (int j = i + 1; j < a.length; j++) {
                if (a[j] < a[minimum]) minimum = j;
            }
            int temp = a[i]; a[i] = a[minimum]; a[minimum] = temp;
        }
        return a;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n) for the returned copy

## Optimized approach: insertion sort

Grow a sorted prefix by shifting larger prefix values right to make room for the next value.

\`\`\`java
public class Solution {
    public static int[] insertionSort(int[] values) {
        int[] a = values.clone();
        for (int i = 1; i < a.length; i++) {
            int value = a[i], j = i;
            while (j > 0 && a[j - 1] > value) {
                a[j] = a[j - 1];
                j--;
            }
            a[j] = value;
        }
        return a;
    }
}
\`\`\`

- **Time:** O(n²) worst case, O(n) best case
- **Extra space:** O(n) for the returned copy`,

  "sort-merge-sort": `## Problem statement

Return a new array containing the input values in ascending order using merge sort.

## Example

\`[38, 27, 43, 3, 9, 82, 10]\` returns \`[3, 9, 10, 27, 38, 43, 82]\`.

## Brute-force approach: insertion sort

Insert every value into its sorted position in the growing prefix.

\`\`\`java
public class Solution {
    public static int[] sortBruteForce(int[] values) {
        int[] a = values.clone();
        for (int i = 1; i < a.length; i++) {
            int value = a[i], j = i;
            while (j > 0 && a[j - 1] > value) { a[j] = a[j - 1]; j--; }
            a[j] = value;
        }
        return a;
    }
}
\`\`\`

- **Time:** O(n²) worst case
- **Extra space:** O(n) for the returned copy

## Optimized approach: divide, sort, and merge

Recursively sort each half, then merge the two sorted ranges into one auxiliary array.

\`\`\`java
public class Solution {
    public static int[] mergeSort(int[] values) {
        int[] result = values.clone();
        int[] buffer = new int[result.length];
        sort(result, buffer, 0, result.length);
        return result;
    }

    private static void sort(int[] a, int[] buffer, int start, int end) {
        if (end - start < 2) return;
        int middle = start + (end - start) / 2;
        sort(a, buffer, start, middle);
        sort(a, buffer, middle, end);
        int left = start, right = middle, out = start;
        while (left < middle && right < end) {
            buffer[out++] = a[left] <= a[right] ? a[left++] : a[right++];
        }
        while (left < middle) buffer[out++] = a[left++];
        while (right < end) buffer[out++] = a[right++];
        System.arraycopy(buffer, start, a, start, end - start);
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n), including the output and merge buffer`,

  "sort-quicksort": `## Problem statement

Return a new array sorted in ascending order using quicksort. Handle duplicate values efficiently.

## Example

\`[10, 7, 8, 9, 1, 5]\` returns \`[1, 5, 7, 8, 9, 10]\`.

## Brute-force approach: insertion sort

\`\`\`java
public class Solution {
    public static int[] sortBruteForce(int[] values) {
        int[] a = values.clone();
        for (int i = 1; i < a.length; i++) {
            int value = a[i], j = i;
            while (j > 0 && a[j - 1] > value) { a[j] = a[j - 1]; j--; }
            a[j] = value;
        }
        return a;
    }
}
\`\`\`

- **Time:** O(n²) worst case
- **Extra space:** O(n) for the returned copy

## Optimized approach: randomized three-way quicksort

Partition into values smaller than, equal to, and larger than a random pivot. The equal section needs no further sorting.

\`\`\`java
import java.util.concurrent.ThreadLocalRandom;

public class Solution {
    public static int[] quickSort(int[] values) {
        int[] result = values.clone();
        sort(result, 0, result.length - 1);
        return result;
    }

    private static void sort(int[] a, int low, int high) {
        if (low >= high) return;
        int pivot = a[ThreadLocalRandom.current().nextInt(low, high + 1)];
        int less = low, current = low, greater = high;
        while (current <= greater) {
            if (a[current] < pivot) swap(a, less++, current++);
            else if (a[current] > pivot) swap(a, current, greater--);
            else current++;
        }
        sort(a, low, less - 1);
        sort(a, greater + 1, high);
    }

    private static void swap(int[] a, int i, int j) {
        int temp = a[i]; a[i] = a[j]; a[j] = temp;
    }
}
\`\`\`

- **Time:** O(n log n) expected, O(n²) worst case
- **Extra space:** O(n) output; O(log n) expected recursion, O(n) worst case`,

  "sort-counting-sort": `## Problem statement

Sort an integer array whose values lie in a known, manageable range. Return a new sorted array.

## Example

\`[4, 2, 2, 8, 3, 3, 1]\` returns \`[1, 2, 2, 3, 3, 4, 8]\`.

## Brute-force approach: comparison sort

\`\`\`java
import java.util.Arrays;

public class Solution {
    public static int[] sortBruteForce(int[] values) {
        int[] result = values.clone();
        Arrays.sort(result);
        return result;
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n) for the returned copy

## Optimized approach: count each value

Store one frequency per value in the input range, then write each value its counted number of times.

\`\`\`java
public class Solution {
    public static int[] countingSort(int[] values, int minimum, int maximum) {
        if (minimum > maximum) throw new IllegalArgumentException("Invalid range");
        long range = (long) maximum - minimum + 1;
        if (range > 10_000_000) throw new IllegalArgumentException("Range is too large");
        int[] counts = new int[(int) range];
        for (int value : values) {
            if (value < minimum || value > maximum) throw new IllegalArgumentException("Value outside range");
            counts[value - minimum]++;
        }
        int[] result = new int[values.length];
        int index = 0;
        for (int i = 0; i < counts.length; i++) {
            while (counts[i]-- > 0) result[index++] = i + minimum;
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n + r), where r is the range size
- **Extra space:** O(n + r), including output and frequencies`,

  "sort-custom-comparator": `## Problem statement

Sort a list of strings by increasing length, then lexicographically for equal lengths.

## Example

\`["pear", "a", "fig", "kiwi"]\` returns \`["a", "fig", "kiwi", "pear"]\`.

## Brute-force approach: comparator-based insertion sort

Shift preceding strings while the comparator says they belong after the current value.

\`\`\`java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Solution {
    public static List<String> sortBruteForce(List<String> input) {
        Comparator<String> order = Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder());
        List<String> result = new ArrayList<>(input);
        for (int i = 1; i < result.size(); i++) {
            String value = result.get(i);
            int j = i;
            while (j > 0 && order.compare(result.get(j - 1), value) > 0) {
                result.set(j, result.get(j - 1));
                j--;
            }
            result.set(j, value);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n²) comparisons
- **Extra space:** O(n) for the returned list

## Optimized approach: use the library sort with a comparator

Java's stable list sort applies the explicit ordering rule in O(n log n) comparisons.

\`\`\`java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Solution {
    public static List<String> sortByCustomOrder(List<String> input) {
        List<String> result = new ArrayList<>(input);
        result.sort(Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()));
        return result;
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n)`,

  "sort-employees-salary-id": `## Problem statement

Sort employees by salary ascending, then employee ID ascending. Employee IDs are unique.

## Example

Employees \`(id=7, salary=5000)\`, \`(id=3, salary=4000)\`, \`(id=2, salary=5000)\` sort as IDs \`[3, 2, 7]\`.

## Brute-force approach: stable insertion sort

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    record Employee(int id, int salary) {}

    private static int compare(Employee a, Employee b) {
        int bySalary = Integer.compare(a.salary(), b.salary());
        return bySalary != 0 ? bySalary : Integer.compare(a.id(), b.id());
    }

    public static List<Employee> sortBruteForce(List<Employee> employees) {
        List<Employee> result = new ArrayList<>(employees);
        for (int i = 1; i < result.size(); i++) {
            Employee value = result.get(i);
            int j = i;
            while (j > 0 && compare(result.get(j - 1), value) > 0) {
                result.set(j, result.get(j - 1));
                j--;
            }
            result.set(j, value);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n) for the returned list

## Optimized approach: sort with a comparator

Use lexicographic comparator composition, comparing salary first and ID only when salaries tie.

\`\`\`java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Solution {
    record Employee(int id, int salary) {}

    public static List<Employee> sortEmployees(List<Employee> employees) {
        List<Employee> result = new ArrayList<>(employees);
        result.sort(Comparator.comparingInt(Employee::salary).thenComparingInt(Employee::id));
        return result;
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n)`,

  "sort-kth-largest": `## Problem statement

Return the k-th largest value by sorted order. Duplicate values occupy separate ranks. Require 1 <= k <= n.

## Example

\`[3, 2, 1, 5, 6, 4]\`, k = 2 returns 5.

## Brute-force approach: sort a copy

\`\`\`java
import java.util.Arrays;

public class Solution {
    public static int kthLargestBruteForce(int[] values, int k) {
        if (k < 1 || k > values.length) throw new IllegalArgumentException("Invalid k");
        int[] sorted = values.clone();
        Arrays.sort(sorted);
        return sorted[sorted.length - k];
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n) for the copy

## Optimized approach: quickselect

Partition around a pivot until the target sorted index is in the equal-to-pivot range.

\`\`\`java
import java.util.concurrent.ThreadLocalRandom;

public class Solution {
    public static int findKthLargest(int[] values, int k) {
        if (k < 1 || k > values.length) throw new IllegalArgumentException("Invalid k");
        int[] a = values.clone();
        int target = a.length - k, low = 0, high = a.length - 1;
        while (low <= high) {
            int pivot = a[ThreadLocalRandom.current().nextInt(low, high + 1)];
            int less = low, current = low, greater = high;
            while (current <= greater) {
                if (a[current] < pivot) swap(a, less++, current++);
                else if (a[current] > pivot) swap(a, current, greater--);
                else current++;
            }
            if (target < less) high = less - 1;
            else if (target > greater) low = greater + 1;
            else return a[target];
        }
        throw new IllegalStateException("Selection failed");
    }

    private static void swap(int[] a, int i, int j) {
        int temp = a[i]; a[i] = a[j]; a[j] = temp;
    }
}
\`\`\`

- **Time:** O(n) expected, O(n²) worst case
- **Extra space:** O(n) for the copy; O(1) auxiliary`,

  "sort-kth-smallest": `## Problem statement

Return the k-th smallest value by sorted order. Duplicate values occupy separate ranks. Require 1 <= k <= n.

## Example

\`[7, 10, 4, 3, 20, 15]\`, k = 3 returns 7.

## Brute-force approach: sort a copy

\`\`\`java
import java.util.Arrays;

public class Solution {
    public static int kthSmallestBruteForce(int[] values, int k) {
        if (k < 1 || k > values.length) throw new IllegalArgumentException("Invalid k");
        int[] sorted = values.clone();
        Arrays.sort(sorted);
        return sorted[k - 1];
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n) for the copy

## Optimized approach: quickselect

Use three-way partitioning; narrow the search to the section containing zero-based rank k-1.

\`\`\`java
import java.util.concurrent.ThreadLocalRandom;

public class Solution {
    public static int kthSmallest(int[] values, int k) {
        if (k < 1 || k > values.length) throw new IllegalArgumentException("Invalid k");
        int[] a = values.clone();
        int target = k - 1, low = 0, high = a.length - 1;
        while (low <= high) {
            int pivot = a[ThreadLocalRandom.current().nextInt(low, high + 1)];
            int less = low, current = low, greater = high;
            while (current <= greater) {
                if (a[current] < pivot) swap(a, less++, current++);
                else if (a[current] > pivot) swap(a, current, greater--);
                else current++;
            }
            if (target < less) high = less - 1;
            else if (target > greater) low = greater + 1;
            else return a[target];
        }
        throw new IllegalStateException("Selection failed");
    }

    private static void swap(int[] a, int i, int j) {
        int temp = a[i]; a[i] = a[j]; a[j] = temp;
    }
}
\`\`\`

- **Time:** O(n) expected, O(n²) worst case
- **Extra space:** O(n) for the copy; O(1) auxiliary`,

  "sort-top-k-frequent": `## Problem statement

Return the k most frequent integers, ordered by descending frequency and then ascending value. Require 0 <= k <= number of distinct values.

## Example

\`[1, 1, 1, 2, 2, 3]\`, k = 2 returns \`[1, 2]\`.

## Brute-force approach: count and sort all distinct values

\`\`\`java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {
    public static int[] topKBruteForce(int[] values, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : values) counts.merge(value, 1, Integer::sum);
        if (k < 0 || k > counts.size()) throw new IllegalArgumentException("Invalid k");
        List<Integer> keys = new ArrayList<>(counts.keySet());
        keys.sort(Comparator.<Integer>comparingInt(counts::get).reversed().thenComparingInt(x -> x));
        return keys.subList(0, k).stream().mapToInt(Integer::intValue).toArray();
    }
}
\`\`\`

- **Time:** O(n + u log u), where u is the number of distinct values
- **Extra space:** O(u)

## Optimized approach: bounded priority queue

Keep only k values, with the least desirable candidate at the heap root.

\`\`\`java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class Solution {
    public static int[] topKFrequent(int[] values, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : values) counts.merge(value, 1, Integer::sum);
        if (k < 0 || k > counts.size()) throw new IllegalArgumentException("Invalid k");
        Comparator<Integer> leastPreferred = Comparator.<Integer>comparingInt(counts::get)
                .thenComparing((a, b) -> Integer.compare(b, a));
        PriorityQueue<Integer> heap = new PriorityQueue<>(leastPreferred);
        for (int value : counts.keySet()) {
            heap.add(value);
            if (heap.size() > k) heap.remove();
        }
        List<Integer> result = new ArrayList<>(heap);
        result.sort(Comparator.<Integer>comparingInt(counts::get).reversed().thenComparingInt(x -> x));
        return result.stream().mapToInt(Integer::intValue).toArray();
    }
}
\`\`\`

- **Time:** O(n + u log k + k log k)
- **Extra space:** O(u + k)`,

  "sort-top-k-stream": `## Problem statement

After each new integer arrives, report the k largest values seen so far in descending order. If fewer than k values have arrived, report all of them. Duplicate values count separately.

## Example

Stream \`[4, 1, 7, 3]\`, k = 2 yields \`[[4], [4, 1], [7, 4], [7, 4]]\`.

## Brute-force approach: sort each received prefix

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<List<Integer>> topKStreamBruteForce(int[] stream, int k) {
        if (k < 0) throw new IllegalArgumentException("k must be non-negative");
        List<List<Integer>> snapshots = new ArrayList<>();
        int[] seen = new int[stream.length];
        for (int i = 0; i < stream.length; i++) {
            seen[i] = stream[i];
            int[] sorted = Arrays.copyOf(seen, i + 1);
            Arrays.sort(sorted);
            List<Integer> top = new ArrayList<>();
            for (int j = sorted.length - 1; j >= Math.max(0, sorted.length - k); j--) top.add(sorted[j]);
            snapshots.add(top);
        }
        return snapshots;
    }
}
\`\`\`

- **Time:** O(n² log n) across all prefixes
- **Extra space:** O(n + nk) including snapshots

## Optimized approach: maintain a min-heap of size k

The heap contains the largest k values seen so far; sort a copy only when producing each snapshot.

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;

public class Solution {
    public static List<List<Integer>> topKStream(int[] stream, int k) {
        if (k < 0) throw new IllegalArgumentException("k must be non-negative");
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        List<List<Integer>> snapshots = new ArrayList<>();
        for (int value : stream) {
            if (k > 0) {
                heap.add(value);
                if (heap.size() > k) heap.remove();
            }
            List<Integer> top = new ArrayList<>(heap);
            top.sort(Collections.reverseOrder());
            snapshots.add(top);
        }
        return snapshots;
    }
}
\`\`\`

- **Time:** O(n log k + n*k log k) including ordered snapshots
- **Extra space:** O(k + n*k) including snapshots`,

  "sort-running-median": `## Problem statement

After each integer arrives, return the median of all values seen so far. For an even count, use the average of the two middle values.

## Example

Stream \`[5, 15, 1, 3]\` yields medians \`[5.0, 10.0, 5.0, 4.0]\`.

## Brute-force approach: sort each prefix

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<Double> mediansBruteForce(int[] stream) {
        List<Double> medians = new ArrayList<>();
        int[] seen = new int[stream.length];
        for (int i = 0; i < stream.length; i++) {
            seen[i] = stream[i];
            int[] sorted = Arrays.copyOf(seen, i + 1);
            Arrays.sort(sorted);
            int n = sorted.length;
            medians.add(n % 2 == 1 ? (double) sorted[n / 2]
                    : ((long) sorted[n / 2 - 1] + sorted[n / 2]) / 2.0);
        }
        return medians;
    }
}
\`\`\`

- **Time:** O(n² log n) across all prefixes
- **Extra space:** O(n) for each sorted prefix and the output

## Optimized approach: two heaps

Keep the lower half in a max-heap and upper half in a min-heap; rebalance so the lower side has at most one extra value.

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;

public class Solution {
    public static List<Double> runningMedians(int[] stream) {
        PriorityQueue<Integer> lower = new PriorityQueue<>(Collections.reverseOrder());
        PriorityQueue<Integer> upper = new PriorityQueue<>();
        List<Double> result = new ArrayList<>();
        for (int value : stream) {
            if (lower.isEmpty() || value <= lower.peek()) lower.add(value);
            else upper.add(value);
            if (lower.size() > upper.size() + 1) upper.add(lower.remove());
            else if (upper.size() > lower.size()) lower.add(upper.remove());
            double median = lower.size() > upper.size()
                    ? lower.peek() : ((long) lower.peek() + upper.peek()) / 2.0;
            result.add(median);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n), including heaps and returned medians`,

  "sort-merge-overlapping-intervals": `## Problem statement

Merge all overlapping closed intervals. Two intervals that meet at an endpoint overlap. Return intervals sorted by start.

## Example

\`[[1, 3], [2, 6], [8, 10], [10, 12]]\` returns \`[[1, 6], [8, 12]]\`.

## Brute-force approach: repeatedly merge a pair

Scan pairs until no two intervals overlap, then sort the result.

\`\`\`java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Solution {
    public static int[][] mergeBruteForce(int[][] intervals) {
        List<int[]> current = new ArrayList<>();
        for (int[] interval : intervals) {
            if (interval.length != 2 || interval[0] > interval[1]) throw new IllegalArgumentException("Invalid interval");
            current.add(interval.clone());
        }
        boolean changed;
        do {
            changed = false;
            outer: for (int i = 0; i < current.size(); i++) {
                for (int j = i + 1; j < current.size(); j++) {
                    int[] a = current.get(i), b = current.get(j);
                    if (a[0] <= b[1] && b[0] <= a[1]) {
                        a[0] = Math.min(a[0], b[0]); a[1] = Math.max(a[1], b[1]);
                        current.remove(j); changed = true; break outer;
                    }
                }
            }
        } while (changed);
        current.sort(Comparator.comparingInt(a -> a[0]));
        return current.toArray(int[][]::new);
    }
}
\`\`\`

- **Time:** O(n³) worst case
- **Extra space:** O(n)

## Optimized approach: sort and sweep

After sorting by start, each interval either extends the current merged interval or starts a new one.

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Solution {
    public static int[][] merge(int[][] intervals) {
        if (intervals.length == 0) return new int[0][2];
        int[][] sorted = Arrays.stream(intervals).map(int[]::clone).toArray(int[][]::new);
        for (int[] interval : sorted) {
            if (interval.length != 2 || interval[0] > interval[1]) throw new IllegalArgumentException("Invalid interval");
        }
        Arrays.sort(sorted, Comparator.comparingInt(a -> a[0]));
        List<int[]> result = new ArrayList<>();
        for (int[] interval : sorted) {
            if (result.isEmpty() || interval[0] > result.get(result.size() - 1)[1]) {
                result.add(interval);
            } else {
                int[] last = result.get(result.size() - 1);
                last[1] = Math.max(last[1], interval[1]);
            }
        }
        return result.toArray(int[][]::new);
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n), including sorted copy and result`,

  "sort-insert-interval": `## Problem statement

Insert a new interval into a sorted list of pairwise non-overlapping closed intervals, merging overlaps. Intervals that share an endpoint overlap.

## Example

Intervals \`[[1, 2], [5, 7], [8, 10]]\`, new interval \`[2, 6]\` returns \`[[1, 7], [8, 10]]\`.

## Brute-force approach: append then merge all

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Solution {
    public static int[][] insertBruteForce(int[][] intervals, int[] added) {
        if (added.length != 2 || added[0] > added[1]) throw new IllegalArgumentException("Invalid interval");
        int[][] all = Arrays.copyOf(intervals, intervals.length + 1);
        all[intervals.length] = added.clone();
        Arrays.sort(all, Comparator.comparingInt(a -> a[0]));
        List<int[]> result = new ArrayList<>();
        for (int[] interval : all) {
            int[] copy = interval.clone();
            if (result.isEmpty() || copy[0] > result.get(result.size() - 1)[1]) result.add(copy);
            else result.get(result.size() - 1)[1] = Math.max(result.get(result.size() - 1)[1], copy[1]);
        }
        return result.toArray(int[][]::new);
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n)

## Optimized approach: process the three regions

Copy intervals before the new range, merge all overlaps into it, then append the remaining intervals.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static int[][] insert(int[][] intervals, int[] added) {
        if (added.length != 2 || added[0] > added[1]) throw new IllegalArgumentException("Invalid interval");
        List<int[]> result = new ArrayList<>();
        int i = 0;
        while (i < intervals.length && intervals[i][1] < added[0]) result.add(intervals[i++].clone());
        int start = added[0], end = added[1];
        while (i < intervals.length && intervals[i][0] <= end) {
            start = Math.min(start, intervals[i][0]);
            end = Math.max(end, intervals[i][1]);
            i++;
        }
        result.add(new int[] {start, end});
        while (i < intervals.length) result.add(intervals[i++].clone());
        return result.toArray(int[][]::new);
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n) for the returned intervals`,

  "sort-minimum-meeting-rooms": `## Problem statement

Given non-empty meeting intervals \`[start, end)\`, return the minimum number of rooms required. A meeting ending at time t does not overlap one starting at t.

## Example

\`[[0, 30], [5, 10], [15, 20]]\` returns 2.

## Brute-force approach: count overlaps at each start

The maximum overlap occurs at a meeting start. Count intervals active at each start time.

\`\`\`java
public class Solution {
    public static int minRoomsBruteForce(int[][] meetings) {
        int maximum = 0;
        for (int[] meeting : meetings) {
            if (meeting.length != 2 || meeting[0] >= meeting[1]) throw new IllegalArgumentException("Invalid meeting");
            int active = 0;
            for (int[] other : meetings) {
                if (other[0] <= meeting[0] && meeting[0] < other[1]) active++;
            }
            maximum = Math.max(maximum, active);
        }
        return maximum;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: sort start and end times

When the next start is before the earliest end, allocate a room; otherwise reuse a room that has become free.

\`\`\`java
import java.util.Arrays;

public class Solution {
    public static int minMeetingRooms(int[][] meetings) {
        int n = meetings.length;
        int[] starts = new int[n], ends = new int[n];
        for (int i = 0; i < n; i++) {
            if (meetings[i].length != 2 || meetings[i][0] >= meetings[i][1]) throw new IllegalArgumentException("Invalid meeting");
            starts[i] = meetings[i][0]; ends[i] = meetings[i][1];
        }
        Arrays.sort(starts); Arrays.sort(ends);
        int rooms = 0, maximum = 0, endIndex = 0;
        for (int start : starts) {
            if (endIndex < n && start >= ends[endIndex]) { rooms--; endIndex++; }
            rooms++;
            maximum = Math.max(maximum, rooms);
        }
        return maximum;
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n)`,

  "sort-maximum-concurrent-meetings": `## Problem statement

Given non-empty meeting intervals \`[start, end)\`, return the maximum number happening at the same time. An ending meeting is not active at its end time.

## Example

\`[[1, 5], [2, 6], [5, 8]]\` returns 2.

## Brute-force approach: count overlaps at each start

\`\`\`java
public class Solution {
    public static int maxConcurrentBruteForce(int[][] meetings) {
        int maximum = 0;
        for (int[] meeting : meetings) {
            if (meeting.length != 2 || meeting[0] >= meeting[1]) throw new IllegalArgumentException("Invalid meeting");
            int active = 0;
            for (int[] other : meetings) {
                if (other[0] <= meeting[0] && meeting[0] < other[1]) active++;
            }
            maximum = Math.max(maximum, active);
        }
        return maximum;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: sweep sorted events

Process end events before start events at equal times to preserve half-open interval semantics.

\`\`\`java
import java.util.Arrays;

public class Solution {
    public static int maxConcurrentMeetings(int[][] meetings) {
        int n = meetings.length;
        int[][] events = new int[2 * n][2];
        for (int i = 0; i < n; i++) {
            if (meetings[i].length != 2) throw new IllegalArgumentException("Invalid meeting");
            int start = meetings[i][0], end = meetings[i][1];
            if (start >= end) throw new IllegalArgumentException("Invalid meeting");
            events[2 * i] = new int[] {start, 1};
            events[2 * i + 1] = new int[] {end, -1};
        }
        Arrays.sort(events, (a, b) -> a[0] != b[0]
                ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
        int active = 0, maximum = 0;
        for (int[] event : events) {
            active += event[1];
            maximum = Math.max(maximum, active);
        }
        return maximum;
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n)`,

  "sort-minimum-train-platforms": `## Problem statement

Given train arrival and departure times, find the minimum platforms needed. A train arriving at the same time another departs needs a separate platform.

## Example

Arrivals \`[900, 940, 950, 1100, 1500, 1800]\`, departures \`[910, 1200, 1120, 1130, 1900, 2000]\` return 3.

## Brute-force approach: count trains present at each arrival

\`\`\`java
public class Solution {
    public static int platformsBruteForce(int[] arrivals, int[] departures) {
        if (arrivals.length != departures.length) throw new IllegalArgumentException("Length mismatch");
        int maximum = 0;
        for (int arrival : arrivals) {
            int active = 0;
            for (int i = 0; i < arrivals.length; i++) {
                if (arrivals[i] <= arrival && departures[i] >= arrival) active++;
            }
            maximum = Math.max(maximum, active);
        }
        return maximum;
    }

}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: sort arrival and departure arrays

If the next arrival is no later than the earliest departure, allocate a platform; otherwise release a platform first.

\`\`\`java
import java.util.Arrays;

public class Solution {
    public static int minPlatforms(int[] arrivals, int[] departures) {
        if (arrivals.length != departures.length) throw new IllegalArgumentException("Length mismatch");
        int n = arrivals.length;
        int[] a = arrivals.clone(), d = departures.clone();
        for (int i = 0; i < n; i++) if (a[i] > d[i]) throw new IllegalArgumentException("Invalid train time");
        Arrays.sort(a); Arrays.sort(d);
        int arriving = 0, departing = 0, active = 0, maximum = 0;
        while (arriving < n) {
            if (departing == n || a[arriving] <= d[departing]) {
                active++; maximum = Math.max(maximum, active); arriving++;
            } else {
                active--; departing++;
            }
        }
        return maximum;
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n) for sorted copies`,

  "sort-minimum-interval-removals": `## Problem statement

Given closed intervals, remove the fewest intervals so the remaining intervals do not overlap. Intervals that share an endpoint overlap.

## Example

\`[[1, 2], [2, 3], [3, 4], [1, 3]]\` returns 2.

## Brute-force approach: enumerate retained subsets

Try each subset, keep only pairwise non-overlapping subsets, and maximize the number retained.

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;

public class Solution {
    public static int removalsBruteForce(int[][] intervals) {
        if (intervals.length >= 31) throw new IllegalArgumentException("Brute-force example supports fewer than 31 intervals");
        int[][] sorted = Arrays.stream(intervals).map(int[]::clone).toArray(int[][]::new);
        for (int[] interval : sorted) if (interval.length != 2 || interval[0] > interval[1]) throw new IllegalArgumentException("Invalid interval");
        Arrays.sort(sorted, Comparator.comparingInt(a -> a[0]));
        return intervals.length - search(sorted, 0, Integer.MIN_VALUE, false);
    }

    private static int search(int[][] a, int index, int lastEnd, boolean hasLast) {
        if (index == a.length) return 0;
        int best = search(a, index + 1, lastEnd, hasLast);
        if (!hasLast || a[index][0] > lastEnd) {
            best = Math.max(best, 1 + search(a, index + 1, a[index][1], true));
        }
        return best;
    }
}
\`\`\`

- **Time:** O(2^n)
- **Extra space:** O(n) recursion

## Optimized approach: keep the earliest-ending compatible intervals

Sort by end time and greedily retain an interval only if its start is strictly after the last retained end.

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;

public class Solution {
    public static int eraseOverlapIntervals(int[][] intervals) {
        int[][] sorted = Arrays.stream(intervals).map(int[]::clone).toArray(int[][]::new);
        for (int[] interval : sorted) if (interval.length != 2 || interval[0] > interval[1]) throw new IllegalArgumentException("Invalid interval");
        Arrays.sort(sorted, Comparator.comparingInt(a -> a[1]));
        int kept = 0, lastEnd = 0;
        boolean hasLast = false;
        for (int[] interval : sorted) {
            if (!hasLast || interval[0] > lastEnd) {
                kept++; lastEnd = interval[1]; hasLast = true;
            }
        }
        return intervals.length - kept;
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n) for sorted copy`,

  "sort-maximum-non-overlap": `## Problem statement

Given closed intervals, return the maximum number of pairwise non-overlapping intervals. Intervals sharing an endpoint overlap.

## Example

\`[[1, 2], [2, 3], [3, 4], [1, 3]]\` returns 2.

## Brute-force approach: enumerate retained subsets

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;

public class Solution {
    public static int maxNonOverlappingBruteForce(int[][] intervals) {
        if (intervals.length >= 31) throw new IllegalArgumentException("Brute-force example supports fewer than 31 intervals");
        int[][] sorted = Arrays.stream(intervals).map(int[]::clone).toArray(int[][]::new);
        for (int[] interval : sorted) if (interval.length != 2 || interval[0] > interval[1]) throw new IllegalArgumentException("Invalid interval");
        Arrays.sort(sorted, Comparator.comparingInt(a -> a[0]));
        return search(sorted, 0, Integer.MIN_VALUE, false);
    }

    private static int search(int[][] a, int index, int lastEnd, boolean hasLast) {
        if (index == a.length) return 0;
        int best = search(a, index + 1, lastEnd, hasLast);
        if (!hasLast || a[index][0] > lastEnd) {
            best = Math.max(best, 1 + search(a, index + 1, a[index][1], true));
        }
        return best;
    }
}
\`\`\`

- **Time:** O(2^n)
- **Extra space:** O(n) recursion

## Optimized approach: earliest finishing time first

Sort by end time and select each interval whose start is strictly after the last selected end.

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;

public class Solution {
    public static int maxNonOverlapping(int[][] intervals) {
        int[][] sorted = Arrays.stream(intervals).map(int[]::clone).toArray(int[][]::new);
        for (int[] interval : sorted) if (interval.length != 2 || interval[0] > interval[1]) throw new IllegalArgumentException("Invalid interval");
        Arrays.sort(sorted, Comparator.comparingInt(a -> a[1]));
        int count = 0, lastEnd = 0;
        boolean hasLast = false;
        for (int[] interval : sorted) {
            if (!hasLast || interval[0] > lastEnd) {
                count++; lastEnd = interval[1]; hasLast = true;
            }
        }
        return count;
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n) for sorted copy`
};
