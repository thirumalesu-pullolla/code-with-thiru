const tree = (body) => `import java.util.*;
public class Solution {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }
${body}
}`;

const entry = (statement, example, bruteTitle, bruteCode, bruteTime, bruteSpace,
  optimizedTitle, optimizedCode, optimizedTime, optimizedSpace) => `## Problem statement

${statement}

## Example

${example}

## Brute-force approach: ${bruteTitle}

\`\`\`java
${bruteCode}
\`\`\`

- **Time:** ${bruteTime}
- **Extra space:** ${bruteSpace}

## Optimized approach: ${optimizedTitle}

\`\`\`java
${optimizedCode}
\`\`\`

- **Time:** ${optimizedTime}
- **Extra space:** ${optimizedSpace}`;

export const binarySearchTreeContent = {
  "bst-search-key": entry(
    "Search for key in a BST and return the matching node, or null if absent. This uses strict ordering; duplicate keys are not stored.",
    "Searching for 7 in a BST containing 5, 3, 7 returns the node with value 7.",
    "traverse the entire tree without using its ordering",
    tree(`    public static TreeNode search(TreeNode root, int key) {
        if (root == null) return null;
        if (root.val == key) return root;
        TreeNode found = search(root.left, key);
        return found != null ? found : search(root.right, key);
    }`),
    "O(n)", "O(h) recursion stack",
    "discard half of the remaining search path at each comparison",
    tree(`    public static TreeNode search(TreeNode root, int key) {
        TreeNode node = root;
        while (node != null && node.val != key)
            node = key < node.val ? node.left : node.right;
        return node;
    }`),
    "O(h), O(n) worst case", "O(1)"
  ),
  "bst-insert-node": entry(
    "Insert a value and return the updated root. The BST uses strict ordering; if the value already exists, leave the tree unchanged.",
    "Inserting 6 into a BST with root 5 and right child 8 adds 6 as the left child of 8.",
    "find the insertion parent with a full traversal",
    tree(`    public static TreeNode insert(TreeNode root, int value) {
        if (root == null) return new TreeNode(value);
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        while (!q.isEmpty()) {
            TreeNode n = q.remove();
            if (n.val == value) return root;
            if (n.left != null) q.add(n.left);
            if (n.right != null) q.add(n.right);
        }
        TreeNode parent = root;
        while (true) {
            if (value < parent.val) {
                if (parent.left == null) { parent.left = new TreeNode(value); return root; }
                parent = parent.left;
            } else {
                if (parent.right == null) { parent.right = new TreeNode(value); return root; }
                parent = parent.right;
            }
        }
    }`),
    "O(n)", "O(n) queue",
    "follow only the ordered search path and attach at the first null child",
    tree(`    public static TreeNode insert(TreeNode root, int value) {
        if (root == null) return new TreeNode(value);
        TreeNode node = root;
        while (true) {
            if (value == node.val) return root;
            if (value < node.val) {
                if (node.left == null) { node.left = new TreeNode(value); return root; }
                node = node.left;
            } else {
                if (node.right == null) { node.right = new TreeNode(value); return root; }
                node = node.right;
            }
        }
    }`),
    "O(h), O(n) worst case", "O(1)"
  ),
  "bst-delete-node": entry(
    "Delete key from a strict BST and return its possibly changed root. If the key is absent, leave the tree unchanged.",
    "Deleting 5 from a tree rooted at 5 with children 3 and 7 replaces it with its inorder successor, 7.",
    "rebuild the tree from all inorder values except the key",
    tree(`    public static TreeNode delete(TreeNode root, int key) {
        List<Integer> values = new ArrayList<>();
        inorder(root, values);
        TreeNode rebuilt = null;
        for (int value : values) if (value != key) rebuilt = insert(rebuilt, value);
        return rebuilt;
    }
    private static void inorder(TreeNode n, List<Integer> out) {
        if (n == null) return;
        inorder(n.left, out); out.add(n.val); inorder(n.right, out);
    }
    private static TreeNode insert(TreeNode n, int value) {
        if (n == null) return new TreeNode(value);
        if (value < n.val) n.left = insert(n.left, value);
        else n.right = insert(n.right, value);
        return n;
    }`),
    "O(n^2) worst case", "O(n) values plus recursion",
    "find the key, then splice its child or replace it with its successor",
    tree(`    public static TreeNode delete(TreeNode root, int key) {
        if (root == null) return null;
        if (key < root.val) root.left = delete(root.left, key);
        else if (key > root.val) root.right = delete(root.right, key);
        else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            TreeNode successor = root.right;
            while (successor.left != null) successor = successor.left;
            root.val = successor.val;
            root.right = delete(root.right, successor.val);
        }
        return root;
    }`),
    "O(h), O(n) worst case", "O(h) recursion stack"
  ),
  "bst-validate": entry(
    "Determine whether every node satisfies strict BST ordering relative to all its ancestors. Duplicate values are invalid.",
    "A root 8 with left subtree values below 8 and right subtree values above 8 is valid; a 9 hidden in the left subtree is invalid.",
    "collect inorder values and verify they increase strictly",
    tree(`    public static boolean isValidBST(TreeNode root) {
        List<Integer> values = new ArrayList<>();
        inorder(root, values);
        for (int i = 1; i < values.size(); i++)
            if (values.get(i - 1) >= values.get(i)) return false;
        return true;
    }
    private static void inorder(TreeNode n, List<Integer> out) {
        if (n == null) return;
        inorder(n.left, out); out.add(n.val); inorder(n.right, out);
    }`),
    "O(n)", "O(n) list plus O(h) recursion",
    "propagate exclusive lower and upper bounds",
    tree(`    public static boolean isValidBST(TreeNode root) {
        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    private static boolean valid(TreeNode n, long low, long high) {
        if (n == null) return true;
        if (n.val <= low || n.val >= high) return false;
        return valid(n.left, low, n.val) && valid(n.right, n.val, high);
    }`),
    "O(n)", "O(h) recursion stack"
  ),
  "bst-minimum-maximum": entry(
    "Return the smallest and largest values in a non-empty strict BST as [minimum, maximum].",
    "For root 8 with left child 3 and right child 10, return [3, 10].",
    "scan every node and track the smallest and largest values",
    tree(`    public static int[] minMax(TreeNode root) {
        if (root == null) throw new IllegalArgumentException("tree must be non-empty");
        int min = root.val, max = root.val;
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode n = stack.pop();
            min = Math.min(min, n.val); max = Math.max(max, n.val);
            if (n.left != null) stack.push(n.left);
            if (n.right != null) stack.push(n.right);
        }
        return new int[] { min, max };
    }`),
    "O(n)", "O(n) worst-case stack",
    "follow the leftmost and rightmost child chains",
    tree(`    public static int[] minMax(TreeNode root) {
        if (root == null) throw new IllegalArgumentException("tree must be non-empty");
        TreeNode min = root, max = root;
        while (min.left != null) min = min.left;
        while (max.right != null) max = max.right;
        return new int[] { min.val, max.val };
    }`),
    "O(h)", "O(1)"
  ),
  "bst-kth-smallest": entry(
    "Return the k-th smallest value using one-based k. Assume 1 <= k <= node count and all keys are distinct.",
    "For BST values [2, 3, 4, 5, 6], k = 3 returns 4.",
    "materialize the sorted inorder traversal and index it",
    tree(`    public static int kthSmallest(TreeNode root, int k) {
        List<Integer> values = new ArrayList<>();
        inorder(root, values);
        return values.get(k - 1);
    }
    private static void inorder(TreeNode n, List<Integer> out) {
        if (n == null) return;
        inorder(n.left, out); out.add(n.val); inorder(n.right, out);
    }`),
    "O(n)", "O(n) list plus O(h) recursion",
    "stop an iterative inorder traversal at the k-th node",
    tree(`    public static int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode n = root;
        while (n != null || !stack.isEmpty()) {
            while (n != null) { stack.push(n); n = n.left; }
            n = stack.pop();
            if (--k == 0) return n.val;
            n = n.right;
        }
        throw new IllegalArgumentException("k is out of range");
    }`),
    "O(h + k), O(n) worst case", "O(h) stack"
  ),
  "bst-kth-largest": entry(
    "Return the k-th largest value using one-based k. Assume 1 <= k <= node count and all keys are distinct.",
    "For BST values [2, 3, 4, 5, 6], k = 2 returns 5.",
    "materialize inorder values, then index backward",
    tree(`    public static int kthLargest(TreeNode root, int k) {
        List<Integer> values = new ArrayList<>();
        inorder(root, values);
        return values.get(values.size() - k);
    }
    private static void inorder(TreeNode n, List<Integer> out) {
        if (n == null) return;
        inorder(n.left, out); out.add(n.val); inorder(n.right, out);
    }`),
    "O(n)", "O(n) list plus O(h) recursion",
    "stop a reverse inorder traversal at the k-th node",
    tree(`    public static int kthLargest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode n = root;
        while (n != null || !stack.isEmpty()) {
            while (n != null) { stack.push(n); n = n.right; }
            n = stack.pop();
            if (--k == 0) return n.val;
            n = n.left;
        }
        throw new IllegalArgumentException("k is out of range");
    }`),
    "O(h + k), O(n) worst case", "O(h) stack"
  ),
  "bst-predecessor-successor": entry(
    "Return [predecessor, successor], where predecessor is the greatest key strictly less than the query and successor is the smallest key strictly greater. Either result is null when absent.",
    "In a BST containing 10, 20, 30, querying 25 returns [20, 30].",
    "collect sorted values and search neighboring entries",
    tree(`    public static List<Integer> neighbors(TreeNode root, int key) {
        List<Integer> values = new ArrayList<>();
        inorder(root, values);
        Integer pred = null, succ = null;
        for (int value : values) {
            if (value < key) pred = value;
            else if (value > key) { succ = value; break; }
        }
        return Arrays.asList(pred, succ);
    }
    private static void inorder(TreeNode n, List<Integer> out) {
        if (n == null) return;
        inorder(n.left, out); out.add(n.val); inorder(n.right, out);
    }`),
    "O(n)", "O(n) list plus O(h) recursion",
    "track the best strict lower and upper candidates while descending",
    tree(`    public static List<Integer> neighbors(TreeNode root, int key) {
        Integer pred = null, succ = null;
        TreeNode n = root;
        while (n != null) {
            if (n.val < key) { pred = n.val; n = n.right; }
            else if (n.val > key) { succ = n.val; n = n.left; }
            else {
                TreeNode x = n.left;
                while (x != null) { pred = x.val; x = x.right; }
                x = n.right;
                while (x != null) { succ = x.val; x = x.left; }
                break;
            }
        }
        return Arrays.asList(pred, succ);
    }`),
    "O(h), O(n) worst case", "O(1)"
  ),
  "bst-lowest-common-ancestor": entry(
    "Given two keys known to be present in a strict BST, return their lowest common ancestor.",
    "In a BST rooted at 6, the LCA of keys 2 and 8 is 6.",
    "find both root-to-key paths and return their last shared node",
    tree(`    public static TreeNode lca(TreeNode root, int a, int b) {
        List<TreeNode> x = new ArrayList<>(), y = new ArrayList<>();
        path(root, a, x); path(root, b, y);
        TreeNode answer = null;
        for (int i = 0; i < Math.min(x.size(), y.size()) && x.get(i) == y.get(i); i++)
            answer = x.get(i);
        return answer;
    }
    private static boolean path(TreeNode n, int key, List<TreeNode> out) {
        while (n != null) {
            out.add(n);
            if (key == n.val) return true;
            n = key < n.val ? n.left : n.right;
        }
        return false;
    }`),
    "O(h)", "O(h) path lists",
    "descend until the keys split across the current node",
    tree(`    public static TreeNode lca(TreeNode root, int a, int b) {
        TreeNode n = root;
        while (n != null) {
            if (a < n.val && b < n.val) n = n.left;
            else if (a > n.val && b > n.val) n = n.right;
            else return n;
        }
        return null;
    }`),
    "O(h), O(n) worst case", "O(1)"
  ),
  "bst-balanced-from-sorted-array": entry(
    "Convert an ascending array of distinct values into a height-balanced BST. The midpoint is chosen as the root of each range.",
    "Input [1, 2, 3] becomes a BST rooted at 2 with children 1 and 3.",
    "insert values in median-first order",
    tree(`    public static TreeNode sortedArrayToBST(int[] values) {
        TreeNode root = null;
        List<Integer> order = new ArrayList<>();
        medians(values, 0, values.length - 1, order);
        for (int value : order) root = insert(root, value);
        return root;
    }
    private static void medians(int[] a, int lo, int hi, List<Integer> out) {
        if (lo > hi) return;
        int mid = lo + (hi - lo) / 2;
        out.add(a[mid]);
        medians(a, lo, mid - 1, out); medians(a, mid + 1, hi, out);
    }
    private static TreeNode insert(TreeNode n, int v) {
        if (n == null) return new TreeNode(v);
        if (v < n.val) n.left = insert(n.left, v); else n.right = insert(n.right, v);
        return n;
    }`),
    "O(n log n)", "O(n) insertion order plus O(log n) recursion",
    "recursively choose the midpoint and build each side directly",
    tree(`    public static TreeNode sortedArrayToBST(int[] values) {
        return build(values, 0, values.length - 1);
    }
    private static TreeNode build(int[] a, int lo, int hi) {
        if (lo > hi) return null;
        int mid = lo + (hi - lo) / 2;
        TreeNode root = new TreeNode(a[mid]);
        root.left = build(a, lo, mid - 1);
        root.right = build(a, mid + 1, hi);
        return root;
    }`),
    "O(n)", "O(log n) recursion for the balanced result"
  ),
  "bst-to-sorted-doubly-linked-list": entry(
    "Convert the BST in place to an ascending circular-free doubly linked list. Reuse left as previous and right as next; return the head, whose left is null.",
    "BST 2 with children 1 and 3 becomes 1 <-> 2 <-> 3, with head.left and tail.right null.",
    "store inorder nodes and connect each adjacent pair",
    tree(`    public static TreeNode toList(TreeNode root) {
        List<TreeNode> nodes = new ArrayList<>();
        collect(root, nodes);
        for (int i = 0; i < nodes.size(); i++) {
            nodes.get(i).left = i == 0 ? null : nodes.get(i - 1);
            nodes.get(i).right = i + 1 == nodes.size() ? null : nodes.get(i + 1);
        }
        return nodes.isEmpty() ? null : nodes.get(0);
    }
    private static void collect(TreeNode n, List<TreeNode> out) {
        if (n == null) return;
        collect(n.left, out); out.add(n); collect(n.right, out);
    }`),
    "O(n)", "O(n) node list plus O(h) recursion",
    "link nodes to the previous inorder node as recursion visits them",
    tree(`    private static TreeNode head, previous;
    public static TreeNode toList(TreeNode root) {
        head = previous = null;
        inorder(root);
        return head;
    }
    private static void inorder(TreeNode n) {
        if (n == null) return;
        inorder(n.left);
        if (previous == null) head = n;
        else { previous.right = n; n.left = previous; }
        previous = n;
        inorder(n.right);
    }`),
    "O(n)", "O(h) recursion stack"
  ),
  "bst-recover-swapped-nodes": entry(
    "Two node values in an otherwise valid strict BST were swapped. Restore the ordering without changing its shape; assume exactly two values were swapped.",
    "In inorder sequence [1, 3, 2, 4], swapping the misplaced 3 and 2 restores [1, 2, 3, 4].",
    "sort inorder values and write them back in inorder positions",
    tree(`    public static void recoverTree(TreeNode root) {
        List<Integer> values = new ArrayList<>();
        inorder(root, values);
        Collections.sort(values);
        int[] index = {0};
        rewrite(root, values, index);
    }
    private static void inorder(TreeNode n, List<Integer> out) {
        if (n == null) return;
        inorder(n.left, out); out.add(n.val); inorder(n.right, out);
    }
    private static void rewrite(TreeNode n, List<Integer> values, int[] i) {
        if (n == null) return;
        rewrite(n.left, values, i); n.val = values.get(i[0]++); rewrite(n.right, values, i);
    }`),
    "O(n log n)", "O(n) values plus O(h) recursion",
    "find the two inorder inversions and swap only the misplaced values",
    tree(`    private static TreeNode first, second, previous;
    public static void recoverTree(TreeNode root) {
        first = second = previous = null;
        find(root);
        if (first != null && second != null) {
            int value = first.val; first.val = second.val; second.val = value;
        }
    }
    private static void find(TreeNode n) {
        if (n == null) return;
        find(n.left);
        if (previous != null && previous.val > n.val) {
            if (first == null) first = previous;
            second = n;
        }
        previous = n;
        find(n.right);
    }`),
    "O(n)", "O(h) recursion stack"
  ),
  "bst-two-sum": entry(
    "Return whether two distinct nodes in a strict BST sum to target. A node cannot be paired with itself.",
    "For values [2, 3, 4, 5, 6] and target 9, return true using 3 + 6.",
    "store visited values in a set while traversing",
    tree(`    public static boolean twoSum(TreeNode root, int target) {
        Set<Integer> seen = new HashSet<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        if (root != null) stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode n = stack.pop();
            if (seen.contains(target - n.val)) return true;
            seen.add(n.val);
            if (n.left != null) stack.push(n.left);
            if (n.right != null) stack.push(n.right);
        }
        return false;
    }`),
    "O(n)", "O(n) set and stack",
    "walk the sorted values from both ends with two inorder iterators",
    tree(`    public static boolean twoSum(TreeNode root, int target) {
        Deque<TreeNode> low = new ArrayDeque<>(), high = new ArrayDeque<>();
        pushLeft(root, low); pushRight(root, high);
        TreeNode a = nextLow(low), b = nextHigh(high);
        while (a != null && b != null && a != b) {
            long sum = (long) a.val + b.val;
            if (sum == target) return true;
            if (sum < target) a = nextLow(low);
            else b = nextHigh(high);
        }
        return false;
    }
    private static void pushLeft(TreeNode n, Deque<TreeNode> s) {
        while (n != null) { s.push(n); n = n.left; }
    }
    private static void pushRight(TreeNode n, Deque<TreeNode> s) {
        while (n != null) { s.push(n); n = n.right; }
    }
    private static TreeNode nextLow(Deque<TreeNode> s) {
        if (s.isEmpty()) return null;
        TreeNode n = s.pop(); pushLeft(n.right, s); return n;
    }
    private static TreeNode nextHigh(Deque<TreeNode> s) {
        if (s.isEmpty()) return null;
        TreeNode n = s.pop(); pushRight(n.left, s); return n;
    }`),
    "O(n)", "O(h) iterator stacks"
  ),
  "bst-range-sum": entry(
    "Return the sum of all node values in the inclusive range [low, high].",
    "For BST values [3, 5, 7, 10] and range [5, 10], return 22.",
    "visit all nodes and add values inside the range",
    tree(`    public static long rangeSum(TreeNode root, int low, int high) {
        if (root == null) return 0;
        long sum = root.val >= low && root.val <= high ? root.val : 0;
        return sum + rangeSum(root.left, low, high) + rangeSum(root.right, low, high);
    }`),
    "O(n)", "O(h) recursion stack",
    "prune subtrees that cannot contain values in the interval",
    tree(`    public static long rangeSum(TreeNode root, int low, int high) {
        if (root == null) return 0;
        if (root.val < low) return rangeSum(root.right, low, high);
        if (root.val > high) return rangeSum(root.left, low, high);
        return (long) root.val + rangeSum(root.left, low, high) + rangeSum(root.right, low, high);
    }`),
    "O(m + h), at most O(n), where m nodes are visited", "O(h) recursion stack"
  ),
  "bst-largest-subtree": entry(
    "Return the node count of the largest subtree that is itself a strict BST. A single node is a BST.",
    "In a tree whose left child of root 10 is 5 with children 1 and 8, that three-node subtree is a BST.",
    "for each node, validate and count its entire rooted subtree",
    tree(`    public static int largestBSTSubtree(TreeNode root) {
        if (root == null) return 0;
        int whole = countIfBST(root, Long.MIN_VALUE, Long.MAX_VALUE);
        if (whole >= 0) return whole;
        return Math.max(largestBSTSubtree(root.left), largestBSTSubtree(root.right));
    }
    private static int countIfBST(TreeNode n, long low, long high) {
        if (n == null) return 0;
        if (n.val <= low || n.val >= high) return -1;
        int left = countIfBST(n.left, low, n.val), right = countIfBST(n.right, n.val, high);
        return left < 0 || right < 0 ? -1 : 1 + left + right;
    }`),
    "O(n^2) worst case", "O(h) recursion stack",
    "return subtree validity, bounds, and size together in one postorder traversal",
    tree(`    static class Info {
        boolean bst; int size; long min, max;
        Info(boolean b, int s, long mi, long ma) { bst=b; size=s; min=mi; max=ma; }
    }
    private static int best;
    public static int largestBSTSubtree(TreeNode root) {
        best = 0;
        inspect(root);
        return best;
    }
    private static Info inspect(TreeNode n) {
        if (n == null) return new Info(true, 0, Long.MAX_VALUE, Long.MIN_VALUE);
        Info left = inspect(n.left), right = inspect(n.right);
        if (left.bst && right.bst && left.max < n.val && n.val < right.min) {
            int size = 1 + left.size + right.size;
            best = Math.max(best, size);
            return new Info(true, size, Math.min(n.val, left.min), Math.max(n.val, right.max));
        }
        return new Info(false, 0, 0, 0);
    }`),
    "O(n)", "O(h) recursion stack"
  )
};
