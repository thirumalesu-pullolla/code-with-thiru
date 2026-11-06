export const linkedListContent = {
  "ll-reverse-iterative": `## Problem statement

Reverse a singly linked list iteratively and return its new head.

## Example

\`1 -> 2 -> 3 -> null\` becomes \`3 -> 2 -> 1 -> null\`.

## Brute-force approach: copy values in reverse order

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node reverseBruteForce(Node head) {
        List<Integer> values = new ArrayList<>();
        for (Node node = head; node != null; node = node.next) values.add(node.value);
        Node result = null;
        for (int value : values) { Node node = new Node(value); node.next = result; result = node; }
        return result;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: reverse links in one pass

Keep the previous node, redirect the current link, and advance.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node reverseList(Node head) {
        Node previous = null, current = head;
        while (current != null) {
            Node next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }
        return previous;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-reverse-recursive": `## Problem statement

Reverse a singly linked list recursively and return the new head.

## Example

\`1 -> 2 -> 3 -> null\` becomes \`3 -> 2 -> 1 -> null\`.

## Brute-force approach: collect and rebuild

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node reverseBruteForce(Node head) {
        List<Integer> values = new ArrayList<>();
        for (Node node = head; node != null; node = node.next) values.add(node.value);
        Node result = null;
        for (int value : values) { Node node = new Node(value); node.next = result; result = node; }
        return result;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: reverse during recursive unwinding

Recursively reverse the suffix, then point the next node back to the current node.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node reverseList(Node head) {
        if (head == null || head.next == null) return head;
        Node newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n) recursion stack`,

  "ll-middle-node": `## Problem statement

Return the middle node of a singly linked list. For an even-length list, return the second middle.

## Example

\`1 -> 2 -> 3 -> 4 -> null\` returns the node containing 3.

## Brute-force approach: count, then walk halfway

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node middleBruteForce(Node head) {
        int length = 0;
        for (Node node = head; node != null; node = node.next) length++;
        Node current = head;
        for (int i = 0; i < length / 2; i++) current = current.next;
        return current;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: slow and fast pointers

Move fast twice as quickly; when it reaches the end, slow is at the required middle.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node middleNode(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-detect-cycle": `## Problem statement

Determine whether a singly linked list contains a cycle.

## Example

If the tail points back to the second node, return true; a null-terminated list returns false.

## Brute-force approach: remember visited nodes

\`\`\`java
import java.util.Collections;
import java.util.IdentityHashMap;
import java.util.Set;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static boolean hasCycleBruteForce(Node head) {
        Set<Node> seen = Collections.newSetFromMap(new IdentityHashMap<>());
        for (Node node = head; node != null; node = node.next) if (!seen.add(node)) return true;
        return false;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: Floyd's tortoise and hare

Advance one pointer by one link and another by two; they meet if a cycle exists.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static boolean hasCycle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-cycle-start": `## Problem statement

Return the exact node reference where a linked-list cycle begins, or null if no cycle exists.

## Example

For \`1 -> 2 -> 3 -> 4\` with node 4 pointing to node 2, return the node containing 2.

## Brute-force approach: return the first repeated reference

\`\`\`java
import java.util.Collections;
import java.util.IdentityHashMap;
import java.util.Set;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node cycleStartBruteForce(Node head) {
        Set<Node> seen = Collections.newSetFromMap(new IdentityHashMap<>());
        for (Node node = head; node != null; node = node.next) if (!seen.add(node)) return node;
        return null;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: Floyd meeting point then reset one pointer

After the slow and fast pointers meet, move one pointer to the head; advancing both one step finds the cycle entrance.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node detectCycle(Node head) {
        Node slow = head, fast = head;
        do {
            if (fast == null || fast.next == null) return null;
            slow = slow.next;
            fast = fast.next.next;
        } while (slow != fast);
        slow = head;
        while (slow != fast) { slow = slow.next; fast = fast.next; }
        return slow;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-cycle-length": `## Problem statement

Return the number of nodes in a cycle, or zero when the list is acyclic.

## Example

A cycle containing nodes 2, 3, and 4 has length 3.

## Brute-force approach: store each node's first visit index

\`\`\`java
import java.util.IdentityHashMap;
import java.util.Map;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static int cycleLengthBruteForce(Node head) {
        Map<Node, Integer> firstSeen = new IdentityHashMap<>();
        int index = 0;
        for (Node node = head; node != null; node = node.next, index++) {
            Integer previous = firstSeen.putIfAbsent(node, index);
            if (previous != null) return index - previous;
        }
        return 0;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: meet and count one lap

After Floyd's pointers meet, walk once around the cycle to count its nodes.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static int cycleLength(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next; fast = fast.next.next;
            if (slow == fast) {
                int length = 1;
                for (Node node = slow.next; node != slow; node = node.next) length++;
                return length;
            }
        }
        return 0;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-kth-from-end": `## Problem statement

Return the k-th node from the end using one-based k, or null if k is invalid or exceeds the list length.

## Example

\`1 -> 2 -> 3 -> 4 -> null\`, k = 2 returns node 3.

## Brute-force approach: count the nodes first

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node kthFromEndBruteForce(Node head, int k) {
        if (k <= 0) return null;
        int length = 0;
        for (Node node = head; node != null; node = node.next) length++;
        if (k > length) return null;
        Node current = head;
        for (int i = 0; i < length - k; i++) current = current.next;
        return current;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: maintain a k-node gap

Advance fast k links, then move both pointers until fast reaches the end.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node kthFromEnd(Node head, int k) {
        if (k <= 0) return null;
        Node fast = head;
        for (int i = 0; i < k; i++) {
            if (fast == null) return null;
            fast = fast.next;
        }
        Node slow = head;
        while (fast != null) { slow = slow.next; fast = fast.next; }
        return slow;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-remove-kth-from-end": `## Problem statement

Remove the k-th node from the end using one-based k. Return the original head if k is invalid or exceeds the length.

## Example

\`1 -> 2 -> 3 -> 4 -> null\`, k = 2 becomes \`1 -> 2 -> 4 -> null\`.

## Brute-force approach: count then unlink

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node removeKthBruteForce(Node head, int k) {
        if (k <= 0) return head;
        int length = 0;
        for (Node node = head; node != null; node = node.next) length++;
        if (k > length) return head;
        if (k == length) return head.next;
        Node previous = head;
        for (int i = 1; i < length - k; i++) previous = previous.next;
        previous.next = previous.next.next;
        return head;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: dummy node and two pointers

Keep fast k steps ahead; when fast reaches the tail, slow is immediately before the node to remove.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node removeNthFromEnd(Node head, int k) {
        if (k <= 0) return head;
        Node dummy = new Node(0); dummy.next = head;
        Node fast = dummy, slow = dummy;
        for (int i = 0; i < k; i++) {
            fast = fast.next;
            if (fast == null) return head;
        }
        while (fast.next != null) { fast = fast.next; slow = slow.next; }
        slow.next = slow.next.next;
        return dummy.next;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-merge-two-sorted": `## Problem statement

Merge two ascending singly linked lists into one sorted list by reusing their nodes.

## Example

\`1 -> 3 -> 5\` and \`2 -> 4\` become \`1 -> 2 -> 3 -> 4 -> 5\`.

## Brute-force approach: copy values and sort

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node mergeBruteForce(Node a, Node b) {
        List<Integer> values = new ArrayList<>();
        for (Node n = a; n != null; n = n.next) values.add(n.value);
        for (Node n = b; n != null; n = n.next) values.add(n.value);
        Collections.sort(values);
        Node dummy = new Node(0), tail = dummy;
        for (int value : values) { tail.next = new Node(value); tail = tail.next; }
        return dummy.next;
    }
}
\`\`\`

- **Time:** O((m+n) log(m+n))
- **Extra space:** O(m+n)

## Optimized approach: merge with a dummy tail

Repeatedly append the smaller head node, then attach the remaining suffix.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node mergeTwoLists(Node a, Node b) {
        Node dummy = new Node(0), tail = dummy;
        while (a != null && b != null) {
            if (a.value <= b.value) { tail.next = a; a = a.next; }
            else { tail.next = b; b = b.next; }
            tail = tail.next;
        }
        tail.next = a != null ? a : b;
        return dummy.next;
    }
}
\`\`\`

- **Time:** O(m+n)
- **Extra space:** O(1)`,

  "ll-merge-k-sorted": `## Problem statement

Merge k ascending linked lists into one ascending list. Reuse the input nodes.

## Example

\`[1 -> 4 -> 5, 1 -> 3 -> 4, 2 -> 6]\` becomes \`1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6\`.

## Brute-force approach: collect values and sort

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node mergeKBruteForce(Node[] lists) {
        List<Integer> values = new ArrayList<>();
        for (Node head : lists) for (Node node = head; node != null; node = node.next) values.add(node.value);
        Collections.sort(values);
        Node dummy = new Node(0), tail = dummy;
        for (int value : values) { tail.next = new Node(value); tail = tail.next; }
        return dummy.next;
    }
}
\`\`\`

- **Time:** O(N log N), where N is the total number of nodes
- **Extra space:** O(N)

## Optimized approach: min-heap of list heads

Keep the smallest unmerged node from each non-empty list in a priority queue.

\`\`\`java
import java.util.PriorityQueue;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node mergeKLists(Node[] lists) {
        PriorityQueue<Node> heap = new PriorityQueue<>((a, b) -> Integer.compare(a.value, b.value));
        for (Node head : lists) if (head != null) heap.add(head);
        Node dummy = new Node(0), tail = dummy;
        while (!heap.isEmpty()) {
            Node node = heap.remove();
            if (node.next != null) heap.add(node.next);
            tail.next = node; tail = node;
        }
        tail.next = null;
        return dummy.next;
    }
}
\`\`\`

- **Time:** O(N log k)
- **Extra space:** O(k)`,

  "ll-palindrome": `## Problem statement

Determine whether the values in a singly linked list form a palindrome.

## Example

\`1 -> 2 -> 2 -> 1\` returns true; \`1 -> 2\` returns false.

## Brute-force approach: copy values into an array

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static boolean isPalindromeBruteForce(Node head) {
        List<Integer> values = new ArrayList<>();
        for (Node node = head; node != null; node = node.next) values.add(node.value);
        for (int left = 0, right = values.size() - 1; left < right; left++, right--) {
            if (!values.get(left).equals(values.get(right))) return false;
        }
        return true;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: reverse the second half

Compare the first half with the reversed second half, then restore the original links.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static boolean isPalindrome(Node head) {
        if (head == null || head.next == null) return true;
        Node slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) { slow = slow.next; fast = fast.next.next; }
        Node second = reverse(slow.next), a = head, b = second;
        boolean equal = true;
        while (b != null) {
            if (a.value != b.value) { equal = false; break; }
            a = a.next; b = b.next;
        }
        slow.next = reverse(second);
        return equal;
    }

    private static Node reverse(Node head) {
        Node previous = null;
        while (head != null) { Node next = head.next; head.next = previous; previous = head; head = next; }
        return previous;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-intersection": `## Problem statement

Return the node reference where two singly linked lists first intersect, or null if they do not intersect. Compare node identity, not values.

## Example

If both lists share the same node containing 8, return that node.

## Brute-force approach: compare every pair of nodes

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node intersectionBruteForce(Node a, Node b) {
        for (Node x = a; x != null; x = x.next) {
            for (Node y = b; y != null; y = y.next) if (x == y) return x;
        }
        return null;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(1)

## Optimized approach: switch heads after each list ends

Each pointer traverses both lists, aligning their remaining distance to a shared node.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node getIntersectionNode(Node a, Node b) {
        Node first = a, second = b;
        while (first != second) {
            first = first == null ? b : first.next;
            second = second == null ? a : second.next;
        }
        return first;
    }
}
\`\`\`

- **Time:** O(m+n)
- **Extra space:** O(1)`,

  "ll-add-two-numbers": `## Problem statement

Each list stores a non-negative integer in reverse digit order. Add the values and return the sum in the same representation. Digits are 0 through 9.

## Example

\`2 -> 4 -> 3\` plus \`5 -> 6 -> 4\` returns \`7 -> 0 -> 8\`.

## Brute-force approach: convert to arbitrary-precision integers

\`\`\`java
import java.math.BigInteger;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    private static BigInteger number(Node node) {
        BigInteger result = BigInteger.ZERO, place = BigInteger.ONE;
        while (node != null) {
            if (node.value < 0 || node.value > 9) throw new IllegalArgumentException("Invalid digit");
            result = result.add(place.multiply(BigInteger.valueOf(node.value)));
            place = place.multiply(BigInteger.TEN); node = node.next;
        }
        return result;
    }

    public static Node addBruteForce(Node a, Node b) {
        BigInteger sum = number(a).add(number(b));
        Node dummy = new Node(0), tail = dummy;
        do {
            BigInteger[] digit = sum.divideAndRemainder(BigInteger.TEN);
            tail.next = new Node(digit[1].intValue()); tail = tail.next; sum = digit[0];
        } while (sum.signum() > 0);
        return dummy.next;
    }
}
\`\`\`

- **Time:** O((m+n)^2) with immutable BigInteger arithmetic
- **Extra space:** O(m+n)

## Optimized approach: add digits with carry

Process each position once, carrying any sum of at least ten to the next digit.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node addTwoNumbers(Node a, Node b) {
        Node dummy = new Node(0), tail = dummy;
        int carry = 0;
        while (a != null || b != null || carry != 0) {
            int sum = carry + (a == null ? 0 : a.value) + (b == null ? 0 : b.value);
            if (sum < 0 || sum > 19) throw new IllegalArgumentException("Digits must be between 0 and 9");
            tail.next = new Node(sum % 10); tail = tail.next; carry = sum / 10;
            if (a != null) a = a.next;
            if (b != null) b = b.next;
        }
        return dummy.next;
    }
}
\`\`\`

- **Time:** O(max(m,n))
- **Extra space:** O(max(m,n)) for the result`,

  "ll-sort-list": `## Problem statement

Sort a singly linked list in ascending order in O(n log n) time.

## Example

\`4 -> 2 -> 1 -> 3\` becomes \`1 -> 2 -> 3 -> 4\`.

## Brute-force approach: copy values, sort, and write back

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node sortBruteForce(Node head) {
        List<Integer> values = new ArrayList<>();
        for (Node node = head; node != null; node = node.next) values.add(node.value);
        Collections.sort(values);
        Node dummy = new Node(0), tail = dummy;
        for (int value : values) { tail.next = new Node(value); tail = tail.next; }
        return dummy.next;
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(n)

## Optimized approach: linked-list merge sort

Split with slow/fast pointers, recursively sort each half, and merge by relinking nodes.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node sortList(Node head) {
        if (head == null || head.next == null) return head;
        Node slow = head, fast = head.next;
        while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
        Node right = slow.next; slow.next = null;
        return merge(sortList(head), sortList(right));
    }

    private static Node merge(Node a, Node b) {
        Node dummy = new Node(0), tail = dummy;
        while (a != null && b != null) {
            if (a.value <= b.value) { tail.next = a; a = a.next; }
            else { tail.next = b; b = b.next; }
            tail = tail.next;
        }
        tail.next = a != null ? a : b;
        return dummy.next;
    }
}
\`\`\`

- **Time:** O(n log n)
- **Extra space:** O(log n) recursion stack`,

  "ll-remove-duplicates-sorted": `## Problem statement

Remove repeated values from a sorted linked list, keeping the first node for each distinct value.

## Example

\`1 -> 1 -> 2 -> 3 -> 3\` becomes \`1 -> 2 -> 3\`.

## Brute-force approach: copy distinct consecutive values

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node deduplicateBruteForce(Node head) {
        Node dummy = new Node(0), tail = dummy;
        Integer previous = null;
        for (Node node = head; node != null; node = node.next) {
            if (previous == null || node.value != previous) {
                tail.next = new Node(node.value); tail = tail.next; previous = node.value;
            }
        }
        return dummy.next;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n) for copied nodes

## Optimized approach: unlink repeated neighbors

Because the list is sorted, duplicates are adjacent.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node deleteDuplicates(Node head) {
        for (Node current = head; current != null && current.next != null;) {
            if (current.value == current.next.value) current.next = current.next.next;
            else current = current.next;
        }
        return head;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-remove-duplicates-unsorted": `## Problem statement

Remove repeated values from an unsorted singly linked list while preserving each value's first occurrence.

## Example

\`3 -> 1 -> 3 -> 2 -> 1\` becomes \`3 -> 1 -> 2\`.

## Brute-force approach: compare with all earlier nodes

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node deduplicateBruteForce(Node head) {
        for (Node current = head; current != null; current = current.next) {
            Node previous = current;
            while (previous.next != null) {
                if (previous.next.value == current.value) previous.next = previous.next.next;
                else previous = previous.next;
            }
        }
        return head;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: track values in a set

Keep the first node for each value and unlink later occurrences.

\`\`\`java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node deleteDuplicates(Node head) {
        Set<Integer> seen = new HashSet<>();
        Node dummy = new Node(0); dummy.next = head;
        Node previous = dummy, current = head;
        while (current != null) {
            if (!seen.add(current.value)) previous.next = current.next;
            else previous = current;
            current = current.next;
        }
        return dummy.next;
    }
}
\`\`\`

- **Time:** O(n) expected
- **Extra space:** O(u), where u is the number of distinct values`,

  "ll-rotate-k": `## Problem statement

Rotate a singly linked list to the right by non-negative k positions. Return null for an empty list.

## Example

\`1 -> 2 -> 3 -> 4 -> 5\`, k = 2 becomes \`4 -> 5 -> 1 -> 2 -> 3\`.

## Brute-force approach: rotate one position repeatedly

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node rotateBruteForce(Node head, int k) {
        if (k < 0) throw new IllegalArgumentException("k must be non-negative");
        if (head == null) return null;
        while (k-- > 0) {
            Node previous = null, tail = head;
            while (tail.next != null) { previous = tail; tail = tail.next; }
            if (previous != null) { previous.next = null; tail.next = head; head = tail; }
        }
        return head;
    }
}
\`\`\`

- **Time:** O(nk)
- **Extra space:** O(1)

## Optimized approach: make a ring and break it

Compute list length, reduce k modulo length, temporarily connect tail to head, then cut at the new tail.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node rotateRight(Node head, int k) {
        if (k < 0) throw new IllegalArgumentException("k must be non-negative");
        if (head == null || head.next == null || k == 0) return head;
        int length = 1;
        Node tail = head;
        while (tail.next != null) { tail = tail.next; length++; }
        int shift = k % length;
        if (shift == 0) return head;
        tail.next = head;
        for (int i = 0; i < length - shift; i++) tail = tail.next;
        Node newHead = tail.next;
        tail.next = null;
        return newHead;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-reverse-k-group": `## Problem statement

Reverse nodes in complete groups of k. Leave any final group with fewer than k nodes unchanged. Require k > 0.

## Example

\`1 -> 2 -> 3 -> 4 -> 5\`, k = 2 becomes \`2 -> 1 -> 4 -> 3 -> 5\`.

## Brute-force approach: collect nodes, reverse groups, relink

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node reverseKGroupBruteForce(Node head, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        List<Node> nodes = new ArrayList<>();
        for (Node node = head; node != null; node = node.next) nodes.add(node);
        for (int start = 0; start + k <= nodes.size(); start += k) {
            for (int l = start, r = start + k - 1; l < r; l++, r--) {
                Node temp = nodes.get(l); nodes.set(l, nodes.get(r)); nodes.set(r, temp);
            }
        }
        for (int i = 0; i + 1 < nodes.size(); i++) nodes.get(i).next = nodes.get(i + 1);
        if (!nodes.isEmpty()) nodes.get(nodes.size() - 1).next = null;
        return nodes.isEmpty() ? null : nodes.get(0);
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: reverse links group by group

First confirm a full group exists, reverse its links, and connect it to the previous group.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node reverseKGroup(Node head, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        Node dummy = new Node(0); dummy.next = head;
        Node groupPrevious = dummy;
        while (true) {
            Node kth = groupPrevious;
            for (int i = 0; i < k && kth != null; i++) kth = kth.next;
            if (kth == null) break;
            Node groupNext = kth.next, previous = groupNext, current = groupPrevious.next;
            while (current != groupNext) {
                Node next = current.next; current.next = previous; previous = current; current = next;
            }
            Node oldStart = groupPrevious.next;
            groupPrevious.next = kth;
            groupPrevious = oldStart;
        }
        return dummy.next;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-partition-value": `## Problem statement

Partition a linked list so nodes smaller than x come before nodes greater than or equal to x, preserving order within each group.

## Example

\`1 -> 4 -> 3 -> 2 -> 5 -> 2\`, x = 3 becomes \`1 -> 2 -> 2 -> 4 -> 3 -> 5\`.

## Brute-force approach: collect values into two lists

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node partitionBruteForce(Node head, int x) {
        List<Integer> lower = new ArrayList<>(), upper = new ArrayList<>();
        for (Node node = head; node != null; node = node.next) (node.value < x ? lower : upper).add(node.value);
        Node dummy = new Node(0), tail = dummy;
        for (int value : lower) { tail.next = new Node(value); tail = tail.next; }
        for (int value : upper) { tail.next = new Node(value); tail = tail.next; }
        return dummy.next;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: stable two-chain relinking

Append each existing node to the lower or upper chain, then join the chains.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }

    public static Node partition(Node head, int x) {
        Node lowerDummy = new Node(0), upperDummy = new Node(0);
        Node lower = lowerDummy, upper = upperDummy;
        while (head != null) {
            Node next = head.next; head.next = null;
            if (head.value < x) { lower.next = head; lower = head; }
            else { upper.next = head; upper = head; }
            head = next;
        }
        lower.next = upperDummy.next;
        return lowerDummy.next;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)`,

  "ll-flatten-multilevel": `## Problem statement

Flatten a multilevel doubly linked list in depth-first order. Each node has next, previous, and child links. Child nodes are inserted between the node and its former next node; clear child links.

## Example

If node 2 has child list \`4 -> 5\` and its next is 3, flatten to \`1 -> 2 -> 4 -> 5 -> 3\`.

## Brute-force approach: stack of next-list continuations

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    static class Node { int value; Node prev, next, child; Node(int value) { this.value = value; } }

    public static Node flattenBruteForce(Node head) {
        if (head == null) return null;
        Deque<Node> continuations = new ArrayDeque<>();
        Node current = head;
        while (current != null) {
            if (current.child != null) {
                if (current.next != null) continuations.push(current.next);
                current.next = current.child; current.child.prev = current; current.child = null;
            } else if (current.next == null && !continuations.isEmpty()) {
                Node next = continuations.pop(); current.next = next; next.prev = current;
            }
            current = current.next;
        }
        return head;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(d), where d is the maximum number of pending child-list continuations

## Optimized approach: recursive depth-first splice

Flatten each child list, splice it after its parent, then reconnect the saved next node.

\`\`\`java
public class Solution {
    static class Node { int value; Node prev, next, child; Node(int value) { this.value = value; } }

    public static Node flatten(Node head) {
        flattenTail(head);
        return head;
    }

    private static Node flattenTail(Node head) {
        Node current = head, tail = head;
        while (current != null) {
            Node next = current.next;
            if (current.child != null) {
                Node child = current.child;
                Node childTail = flattenTail(child);
                current.child = null;
                current.next = child; child.prev = current;
                if (next != null) { childTail.next = next; next.prev = childTail; }
                tail = childTail;
            } else tail = current;
            current = next;
        }
        return tail;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(d) recursion, where d is the maximum nesting depth`
};
