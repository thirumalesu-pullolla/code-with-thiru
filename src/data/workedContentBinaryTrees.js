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

${optimizedTitle.endsWith(".") ? "" : ""}

\`\`\`java
${optimizedCode}
\`\`\`

- **Time:** ${optimizedTime}
- **Extra space:** ${optimizedSpace}`;

export const binaryTreeContent = {
  "bt-preorder": entry(
    "Return binary-tree values in preorder: root, left, right. A null root produces an empty list.",
    "For root 1 with children 2 and 3, return [1, 2, 3].",
    "recurse through the subtrees",
    tree(`    public static List<Integer> preorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        visit(root, result);
        return result;
    }
    private static void visit(TreeNode node, List<Integer> out) {
        if (node == null) return;
        out.add(node.val);
        visit(node.left, out);
        visit(node.right, out);
    }`),
    "O(n)", "O(h) recursion stack, excluding the result",
    "use a stack and push right before left",
    tree(`    public static List<Integer> preorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);
            if (node.right != null) stack.push(node.right);
            if (node.left != null) stack.push(node.left);
        }
        return result;
    }`),
    "O(n)", "O(n) worst-case stack, excluding the result"
  ),
  "bt-inorder": entry(
    "Return binary-tree values in inorder: left, root, right. A null root produces an empty list.",
    "For root 2 with left child 1 and right child 3, return [1, 2, 3].",
    "visit recursively in inorder",
    tree(`    public static List<Integer> inorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        visit(root, result);
        return result;
    }
    private static void visit(TreeNode node, List<Integer> out) {
        if (node == null) return;
        visit(node.left, out);
        out.add(node.val);
        visit(node.right, out);
    }`),
    "O(n)", "O(h) recursion stack, excluding the result",
    "walk left spines with an explicit stack",
    tree(`    public static List<Integer> inorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;
        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            result.add(current.val);
            current = current.right;
        }
        return result;
    }`),
    "O(n)", "O(h) stack, excluding the result"
  ),
  "bt-postorder": entry(
    "Return binary-tree values in postorder: left, right, root. A null root produces an empty list.",
    "For root 1 with children 2 and 3, return [2, 3, 1].",
    "recurse before adding each node",
    tree(`    public static List<Integer> postorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        visit(root, result);
        return result;
    }
    private static void visit(TreeNode node, List<Integer> out) {
        if (node == null) return;
        visit(node.left, out);
        visit(node.right, out);
        out.add(node.val);
    }`),
    "O(n)", "O(h) recursion stack, excluding the result",
    "use two stacks to reverse root-right-left",
    tree(`    public static List<Integer> postorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        Deque<TreeNode> first = new ArrayDeque<>(), second = new ArrayDeque<>();
        first.push(root);
        while (!first.isEmpty()) {
            TreeNode node = first.pop();
            second.push(node);
            if (node.left != null) first.push(node.left);
            if (node.right != null) first.push(node.right);
        }
        while (!second.isEmpty()) result.add(second.pop().val);
        return result;
    }`),
    "O(n)", "O(n) stacks, excluding the result"
  ),
  "bt-level-order": entry(
    "Return the values of each level from top to bottom, preserving left-to-right order within a level.",
    "For root 1 with children 2 and 3, return [[1], [2, 3]].",
    "collect values by depth with a depth-first traversal",
    tree(`    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        collect(root, 0, levels);
        return levels;
    }
    private static void collect(TreeNode node, int depth, List<List<Integer>> levels) {
        if (node == null) return;
        if (levels.size() == depth) levels.add(new ArrayList<>());
        levels.get(depth).add(node.val);
        collect(node.left, depth + 1, levels);
        collect(node.right, depth + 1, levels);
    }`),
    "O(n)", "O(h) recursion stack, excluding output",
    "process one queue layer at a time",
    tree(`    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        if (root == null) return levels;
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.remove();
                level.add(node.val);
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            levels.add(level);
        }
        return levels;
    }`),
    "O(n)", "O(w) queue, excluding output; w is maximum level width"
  ),
  "bt-zigzag-level-order": entry(
    "Return level values in alternating directions, beginning left-to-right at the root.",
    "For root 1, children 2 and 3, and grandchildren 4 and 5 under 2, return [[1], [3, 2], [4, 5]].",
    "build levels in normal order and reverse alternating levels",
    tree(`    public static List<List<Integer>> zigzag(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        collect(root, 0, levels);
        for (int i = 1; i < levels.size(); i += 2)
            Collections.reverse(levels.get(i));
        return levels;
    }
    private static void collect(TreeNode node, int depth, List<List<Integer>> levels) {
        if (node == null) return;
        if (levels.size() == depth) levels.add(new ArrayList<>());
        levels.get(depth).add(node.val);
        collect(node.left, depth + 1, levels);
        collect(node.right, depth + 1, levels);
    }`),
    "O(n)", "O(h) recursion stack, excluding output",
    "write each breadth-first level in its target direction",
    tree(`    public static List<List<Integer>> zigzag(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        boolean leftToRight = true;
        while (!queue.isEmpty()) {
            int size = queue.size();
            Deque<Integer> level = new ArrayDeque<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.remove();
                if (leftToRight) level.addLast(node.val);
                else level.addFirst(node.val);
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            result.add(new ArrayList<>(level));
            leftToRight = !leftToRight;
        }
        return result;
    }`),
    "O(n)", "O(w) queue and level, excluding output"
  ),
  "bt-maximum-depth": entry(
    "Return the number of nodes on the longest root-to-leaf path. An empty tree has depth zero.",
    "A root with a chain of three nodes has maximum depth 3.",
    "measure the height recursively",
    tree(`    public static int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }`),
    "O(n)", "O(h) recursion stack",
    "count breadth-first levels",
    tree(`    public static int maxDepth(TreeNode root) {
        if (root == null) return 0;
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        int depth = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.remove();
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            depth++;
        }
        return depth;
    }`),
    "O(n)", "O(w) queue; w is maximum level width"
  ),
  "bt-minimum-depth": entry(
    "Return the node count on the shortest root-to-leaf path. A leaf must have no children; an empty tree has depth zero.",
    "For root 1 with left child 2 and right child 3, return 2.",
    "compute both subtree depths while handling missing children",
    tree(`    public static int minDepth(TreeNode root) {
        if (root == null) return 0;
        if (root.left == null) return 1 + minDepth(root.right);
        if (root.right == null) return 1 + minDepth(root.left);
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
    }`),
    "O(n)", "O(h) recursion stack",
    "stop at the first leaf in breadth-first order",
    tree(`    public static int minDepth(TreeNode root) {
        if (root == null) return 0;
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        int depth = 1;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.remove();
                if (node.left == null && node.right == null) return depth;
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            depth++;
        }
        return depth;
    }`),
    "O(n) worst case", "O(w) queue; w is maximum level width"
  ),
  "bt-count-nodes": entry(
    "Count every node in an arbitrary binary tree. No completeness assumption is made.",
    "A tree with root 1 and two children contains 3 nodes.",
    "sum recursive subtree counts",
    tree(`    public static int countNodes(TreeNode root) {
        if (root == null) return 0;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }`),
    "O(n)", "O(h) recursion stack",
    "visit each node with an explicit stack",
    tree(`    public static int countNodes(TreeNode root) {
        if (root == null) return 0;
        int count = 0;
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            count++;
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }
        return count;
    }`),
    "O(n)", "O(n) worst-case stack"
  ),
  "bt-identical-trees": entry(
    "Return true exactly when two trees have the same shape and equal values at corresponding nodes.",
    "Trees [1, 2] and [1, 2] are identical; [1, 2] and [1, null, 2] are not.",
    "compare corresponding nodes recursively",
    tree(`    public static boolean identical(TreeNode a, TreeNode b) {
        if (a == null || b == null) return a == b;
        return a.val == b.val
            && identical(a.left, b.left)
            && identical(a.right, b.right);
    }`),
    "O(n) for equal trees; may stop at first mismatch", "O(h) recursion stack",
    "compare node pairs iteratively",
    tree(`    public static boolean identical(TreeNode a, TreeNode b) {
        Deque<TreeNode> first = new LinkedList<>();
        Deque<TreeNode> second = new LinkedList<>();
        first.push(a);
        second.push(b);
        while (!first.isEmpty()) {
            TreeNode x = first.pop(), y = second.pop();
            if (x == null || y == null) {
                if (x != y) return false;
                continue;
            }
            if (x.val != y.val) return false;
            first.push(x.left); first.push(x.right);
            second.push(y.left); second.push(y.right);
        }
        return true;
    }`),
    "O(n) for equal trees; may stop at first mismatch", "O(n) worst-case stacks"
  ),
  "bt-symmetric-tree": entry(
    "Determine whether a tree is a mirror of itself around its center. An empty tree is symmetric.",
    "Root 1 with matching children 2 and 2 is symmetric if their outer and inner subtrees mirror.",
    "compare mirrored subtree pairs recursively",
    tree(`    public static boolean isSymmetric(TreeNode root) {
        return root == null || mirror(root.left, root.right);
    }
    private static boolean mirror(TreeNode a, TreeNode b) {
        if (a == null || b == null) return a == b;
        return a.val == b.val
            && mirror(a.left, b.right)
            && mirror(a.right, b.left);
    }`),
    "O(n)", "O(h) recursion stack",
    "process mirrored pairs in a queue",
    tree(`    public static boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root.left);
        queue.add(root.right);
        while (!queue.isEmpty()) {
            TreeNode a = queue.remove(), b = queue.remove();
            if (a == null || b == null) {
                if (a != b) return false;
                continue;
            }
            if (a.val != b.val) return false;
            queue.add(a.left); queue.add(b.right);
            queue.add(a.right); queue.add(b.left);
        }
        return true;
    }`),
    "O(n)", "O(w) queue; w is maximum level width"
  ),
  "bt-diameter": entry(
    "Return the diameter measured in edges on the longest path between any two nodes. Empty and single-node trees have diameter zero.",
    "A three-node chain has diameter 2.",
    "recompute subtree heights at every candidate node",
    tree(`    public static int diameter(TreeNode root) {
        if (root == null) return 0;
        int throughRoot = height(root.left) + height(root.right);
        return Math.max(throughRoot,
            Math.max(diameter(root.left), diameter(root.right)));
    }
    private static int height(TreeNode node) {
        if (node == null) return 0;
        return 1 + Math.max(height(node.left), height(node.right));
    }`),
    "O(n^2) worst case", "O(h) recursion stack",
    "compute height and update the best diameter in one postorder pass",
    tree(`    private static int best;
    public static int diameter(TreeNode root) {
        best = 0;
        height(root);
        return best;
    }
    private static int height(TreeNode node) {
        if (node == null) return 0;
        int left = height(node.left), right = height(node.right);
        best = Math.max(best, left + right);
        return 1 + Math.max(left, right);
    }`),
    "O(n)", "O(h) recursion stack"
  ),
  "bt-maximum-path-sum": entry(
    "Return the largest sum along any non-empty path; a path may begin and end at any nodes but must follow parent-child edges.",
    "For root -10 with children 9 and 20, and 20's children 15 and 7, return 42 (15 + 20 + 7).",
    "recompute best downward paths for every possible turning node",
    tree(`    public static int maxPathSum(TreeNode root) {
        if (root == null) throw new IllegalArgumentException("tree must be non-empty");
        int best = Integer.MIN_VALUE;
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            int left = Math.max(0, gain(node.left));
            int right = Math.max(0, gain(node.right));
            best = Math.max(best, node.val + left + right);
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }
        return best;
    }
    private static int gain(TreeNode node) {
        if (node == null) return 0;
        return node.val + Math.max(0, Math.max(gain(node.left), gain(node.right)));
    }`),
    "O(n^2) worst case", "O(h) recursion stack plus traversal stack",
    "return each subtree's best downward gain and update a global best",
    tree(`    private static int best;
    public static int maxPathSum(TreeNode root) {
        if (root == null) throw new IllegalArgumentException("tree must be non-empty");
        best = Integer.MIN_VALUE;
        gain(root);
        return best;
    }
    private static int gain(TreeNode node) {
        if (node == null) return 0;
        int left = Math.max(0, gain(node.left));
        int right = Math.max(0, gain(node.right));
        best = Math.max(best, node.val + left + right);
        return node.val + Math.max(left, right);
    }`),
    "O(n)", "O(h) recursion stack"
  ),
  "bt-lowest-common-ancestor": entry(
    "For two nodes known to be present in the tree, return their lowest common ancestor (the deepest node that is an ancestor of both).",
    "In the tree rooted at 3 with children 5 and 1, the LCA of nodes 5 and 1 is 3.",
    "build root-to-node paths, then compare their common prefix",
    tree(`    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        List<TreeNode> a = new ArrayList<>(), b = new ArrayList<>();
        findPath(root, p, a);
        findPath(root, q, b);
        TreeNode answer = null;
        for (int i = 0; i < Math.min(a.size(), b.size()) && a.get(i) == b.get(i); i++)
            answer = a.get(i);
        return answer;
    }
    private static boolean findPath(TreeNode node, TreeNode target, List<TreeNode> path) {
        if (node == null) return false;
        path.add(node);
        if (node == target || findPath(node.left, target, path) || findPath(node.right, target, path))
            return true;
        path.remove(path.size() - 1);
        return false;
    }`),
    "O(n)", "O(h) recursion and path storage",
    "propagate a found target upward and stop at the split point",
    tree(`    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }`),
    "O(n)", "O(h) recursion stack"
  ),
  "bt-height-balanced": entry(
    "Return true if at every node the heights of the left and right subtrees differ by at most one. An empty tree is balanced.",
    "A root with one leaf child is balanced; a three-edge chain is not.",
    "compute each node's height separately before checking its balance",
    tree(`    public static boolean isBalanced(TreeNode root) {
        if (root == null) return true;
        if (Math.abs(height(root.left) - height(root.right)) > 1) return false;
        return isBalanced(root.left) && isBalanced(root.right);
    }
    private static int height(TreeNode node) {
        if (node == null) return 0;
        return 1 + Math.max(height(node.left), height(node.right));
    }`),
    "O(n^2) worst case", "O(h) recursion stack",
    "return a sentinel height as soon as an imbalance is found",
    tree(`    public static boolean isBalanced(TreeNode root) {
        return heightOrFailure(root) >= 0;
    }
    private static int heightOrFailure(TreeNode node) {
        if (node == null) return 0;
        int left = heightOrFailure(node.left);
        if (left < 0) return -1;
        int right = heightOrFailure(node.right);
        if (right < 0 || Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }`),
    "O(n)", "O(h) recursion stack"
  ),
  "bt-boundary-traversal": entry(
    "Return the anti-clockwise boundary: root, non-leaf left boundary, all leaves left-to-right, then non-leaf right boundary bottom-up. Include every node at most once.",
    "For root 1, left boundary 2, leaves 4 and 5, and right boundary 3, return [1, 2, 4, 5, 3].",
    "collect the boundary components separately and skip leaf duplicates",
    tree(`    public static List<Integer> boundary(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        if (root == null) return out;
        if (!isLeaf(root)) out.add(root.val);
        TreeNode node = root.left;
        while (node != null) {
            if (!isLeaf(node)) out.add(node.val);
            node = node.left != null ? node.left : node.right;
        }
        leaves(root, out);
        List<Integer> right = new ArrayList<>();
        node = root.right;
        while (node != null) {
            if (!isLeaf(node)) right.add(node.val);
            node = node.right != null ? node.right : node.left;
        }
        Collections.reverse(right);
        out.addAll(right);
        return out;
    }
    private static boolean isLeaf(TreeNode n) { return n.left == null && n.right == null; }
    private static void leaves(TreeNode n, List<Integer> out) {
        if (n == null) return;
        if (isLeaf(n)) { out.add(n.val); return; }
        leaves(n.left, out);
        leaves(n.right, out);
    }`),
    "O(n)", "O(h) recursion and boundary storage",
    "traverse once in boundary order while explicitly excluding leaf duplicates",
    tree(`    public static List<Integer> boundary(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        if (root == null) return out;
        if (!leaf(root)) out.add(root.val);
        addLeft(root.left, out);
        addLeaves(root, out);
        List<Integer> right = new ArrayList<>();
        addRight(root.right, right);
        Collections.reverse(right);
        out.addAll(right);
        return out;
    }
    private static boolean leaf(TreeNode n) { return n.left == null && n.right == null; }
    private static void addLeft(TreeNode n, List<Integer> out) {
        while (n != null) {
            if (!leaf(n)) out.add(n.val);
            n = n.left != null ? n.left : n.right;
        }
    }
    private static void addRight(TreeNode n, List<Integer> out) {
        while (n != null) {
            if (!leaf(n)) out.add(n.val);
            n = n.right != null ? n.right : n.left;
        }
    }
    private static void addLeaves(TreeNode n, List<Integer> out) {
        if (n == null) return;
        if (leaf(n)) { out.add(n.val); return; }
        addLeaves(n.left, out); addLeaves(n.right, out);
    }`),
    "O(n)", "O(h) recursion and boundary storage"
  ),
  "bt-vertical-order": entry(
    "Group nodes by horizontal column, leftmost column first. Within a column sort by row, then by value for equal rows.",
    "For root 3 with children 9 and 20, and 20's children 15 and 7, return [[9], [3, 15], [20], [7]].",
    "scan all nodes for every column and sort the column's records",
    tree(`    static class Item {
        TreeNode node; int row, col;
        Item(TreeNode n, int r, int c) { node = n; row = r; col = c; }
    }
    public static List<List<Integer>> vertical(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        int[] bounds = {0, 0};
        findBounds(root, 0, bounds);
        for (int col = bounds[0]; col <= bounds[1]; col++) {
            List<Item> items = new ArrayList<>();
            collectColumn(root, 0, 0, col, items);
            items.sort(Comparator.comparingInt((Item x) -> x.row).thenComparingInt(x -> x.node.val));
            List<Integer> values = new ArrayList<>();
            for (Item item : items) values.add(item.node.val);
            result.add(values);
        }
        return result;
    }
    private static void findBounds(TreeNode n, int col, int[] bounds) {
        if (n == null) return;
        bounds[0] = Math.min(bounds[0], col);
        bounds[1] = Math.max(bounds[1], col);
        findBounds(n.left, col - 1, bounds);
        findBounds(n.right, col + 1, bounds);
    }
    private static void collectColumn(TreeNode n, int row, int col, int wanted, List<Item> out) {
        if (n == null) return;
        if (col == wanted) out.add(new Item(n, row, col));
        collectColumn(n.left, row + 1, col - 1, wanted, out);
        collectColumn(n.right, row + 1, col + 1, wanted, out);
    }`),
    "O(nw + Σ k_c log k_c), where w is number of columns and k_c is nodes in column c",
    "O(n) column records plus O(h) recursion",
    "collect each node's coordinates once and sort by column, row, and value",
    tree(`    static class Item {
        TreeNode node; int row, col;
        Item(TreeNode n, int r, int c) { node = n; row = r; col = c; }
    }
    public static List<List<Integer>> vertical(TreeNode root) {
        List<Item> items = new ArrayList<>();
        if (root != null) {
            Queue<Item> queue = new ArrayDeque<>();
            queue.add(new Item(root, 0, 0));
            while (!queue.isEmpty()) {
                Item x = queue.remove();
                items.add(x);
                if (x.node.left != null) queue.add(new Item(x.node.left, x.row + 1, x.col - 1));
                if (x.node.right != null) queue.add(new Item(x.node.right, x.row + 1, x.col + 1));
            }
        }
        items.sort(Comparator.comparingInt((Item x) -> x.col)
            .thenComparingInt(x -> x.row).thenComparingInt(x -> x.node.val));
        List<List<Integer>> result = new ArrayList<>();
        Integer previous = null;
        for (Item x : items) {
            if (previous == null || previous != x.col) {
                result.add(new ArrayList<>());
                previous = x.col;
            }
            result.get(result.size() - 1).add(x.node.val);
        }
        return result;
    }`),
    "O(n log n)", "O(n) queue and coordinate records"
  ),
  "bt-top-bottom-view": entry(
    "Return top and bottom views as values ordered by horizontal column. At a depth tie, choose the first node encountered left-to-right in level order.",
    "For root 1 with children 2 and 3, top view is [2, 1, 3] and bottom view is [2, 1, 3].",
    "scan all nodes and retain minimum-row and maximum-row records per column",
    tree(`        static class Seen { int row; int val; Seen(int r, int v) { row=r; val=v; } }
    public static List<List<Integer>> views(TreeNode root) {
        TreeMap<Integer, Seen> top = new TreeMap<>(), bottom = new TreeMap<>();
        scan(root, 0, 0, top, bottom);
        return Arrays.asList(values(top), values(bottom));
    }
    private static void scan(TreeNode n, int row, int col,
        TreeMap<Integer, Seen> top, TreeMap<Integer, Seen> bottom) {
        if (n == null) return;
        Seen t = top.get(col), b = bottom.get(col);
        if (t == null || row < t.row) top.put(col, new Seen(row, n.val));
        if (b == null || row > b.row) bottom.put(col, new Seen(row, n.val));
        scan(n.left, row + 1, col - 1, top, bottom);
        scan(n.right, row + 1, col + 1, top, bottom);
    }
    private static List<Integer> values(TreeMap<Integer, Seen> map) {
        List<Integer> out = new ArrayList<>();
        for (Seen s : map.values()) out.add(s.val);
        return out;
    }`),
    "O(n log w)", "O(n) queue and view maps",
    "use breadth-first order so first-per-column is top and last-per-column is bottom",
    tree(`    static class Item { TreeNode n; int col; Item(TreeNode n, int c) { this.n=n; col=c; } }
    public static List<List<Integer>> views(TreeNode root) {
        TreeMap<Integer, Integer> top = new TreeMap<>(), bottom = new TreeMap<>();
        if (root != null) {
            Queue<Item> q = new LinkedList<>();
            q.add(new Item(root, 0));
            while (!q.isEmpty()) {
                Item x = q.remove();
                top.putIfAbsent(x.col, x.n.val);
                bottom.put(x.col, x.n.val);
                if (x.n.left != null) q.add(new Item(x.n.left, x.col - 1));
                if (x.n.right != null) q.add(new Item(x.n.right, x.col + 1));
            }
        }
        return Arrays.asList(new ArrayList<>(top.values()), new ArrayList<>(bottom.values()));
    }`),
    "O(n log w)", "O(n) queue and maps"
  ),
  "bt-left-right-view": entry(
    "Return the leftmost and rightmost visible values at every depth, in two lists ordered from the root level downward.",
    "For root 1 with children 2 and 3, left view is [1, 2] and right view is [1, 3].",
    "use depth-first traversal and keep the first and last value recorded per depth",
    tree(`    public static List<List<Integer>> views(TreeNode root) {
        List<Integer> left = new ArrayList<>(), right = new ArrayList<>();
        visit(root, 0, left, right);
        return Arrays.asList(left, right);
    }
    private static void visit(TreeNode n, int d, List<Integer> left, List<Integer> right) {
        if (n == null) return;
        if (d == left.size()) left.add(n.val);
        if (d == right.size()) right.add(n.val);
        else right.set(d, n.val);
        visit(n.left, d + 1, left, right);
        visit(n.right, d + 1, left, right);
    }`),
    "O(n)", "O(h) recursion plus output",
    "take the first and last node of each breadth-first level",
    tree(`    public static List<List<Integer>> views(TreeNode root) {
        List<Integer> left = new ArrayList<>(), right = new ArrayList<>();
        if (root != null) {
            Queue<TreeNode> q = new ArrayDeque<>();
            q.add(root);
            while (!q.isEmpty()) {
                int size = q.size();
                for (int i = 0; i < size; i++) {
                    TreeNode n = q.remove();
                    if (i == 0) left.add(n.val);
                    if (i == size - 1) right.add(n.val);
                    if (n.left != null) q.add(n.left);
                    if (n.right != null) q.add(n.right);
                }
            }
        }
        return Arrays.asList(left, right);
    }`),
    "O(n)", "O(w) queue plus output"
  ),
  "bt-right-side-view-level-order": entry(
    "Return the value visible from the right side at each depth, from top to bottom.",
    "For root 1 with children 2 and 3, return [1, 3].",
    "record the last value gathered by depth-first traversal",
    tree(`    public static List<Integer> rightView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        visit(root, 0, result);
        return result;
    }
    private static void visit(TreeNode n, int depth, List<Integer> out) {
        if (n == null) return;
        if (depth == out.size()) out.add(n.val);
        else out.set(depth, n.val);
        visit(n.left, depth + 1, out);
        visit(n.right, depth + 1, out);
    }`),
    "O(n)", "O(h) recursion plus output",
    "process each level and take its last queued node",
    tree(`    public static List<Integer> rightView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode n = q.remove();
                if (i == size - 1) result.add(n.val);
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
        }
        return result;
    }`),
    "O(n)", "O(w) queue plus output"
  ),
  "bt-build-preorder-inorder": entry(
    "Reconstruct a binary tree from preorder and inorder arrays containing the same unique values. Return null for empty arrays.",
    "preorder [3, 9, 20], inorder [9, 3, 20] builds root 3 with children 9 and 20.",
    "search the inorder interval for each preorder root",
    tree(`        public static TreeNode buildTree(int[] preorder, int[] inorder) {
        preIndex = 0;
        return build(preorder, inorder, 0, inorder.length - 1);
    }
    private static TreeNode build(int[] pre, int[] in, int lo, int hi) {
        if (lo > hi) return null;
        int value = pre[preIndex++];
        TreeNode root = new TreeNode(value);
        int split = lo;
        while (in[split] != value) split++;
        root.left = build(pre, in, lo, split - 1);
        root.right = build(pre, in, split + 1, hi);
        return root;
    }
    private static int preIndex;`),
    "O(n^2) worst case", "O(h) recursion stack",
    "pre-index values by inorder position for constant-time splits",
    tree(`    private static int preIndex;
    private static Map<Integer, Integer> positions;
    public static TreeNode buildTree(int[] preorder, int[] inorder) {
        positions = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) positions.put(inorder[i], i);
        preIndex = 0;
        return build(preorder, 0, inorder.length - 1);
    }
    private static TreeNode build(int[] pre, int lo, int hi) {
        if (lo > hi) return null;
        int value = pre[preIndex++];
        int split = positions.get(value);
        TreeNode root = new TreeNode(value);
        root.left = build(pre, lo, split - 1);
        root.right = build(pre, split + 1, hi);
        return root;
    }`),
    "O(n)", "O(n) map and O(h) recursion stack"
  ),
  "bt-serialize-deserialize": entry(
    "Implement serialization and deserialization that preserve the exact shape and values of an integer-valued binary tree. Null children use an explicit marker.",
    "The tree 1 with left child 2 can serialize as 1,2,#,#,# and must deserialize to the same shape.",
    "write level-order tokens including null children",
    tree(`    public static String serialize(TreeNode root) {
        List<String> tokens = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            TreeNode n = q.remove();
            if (n == null) tokens.add("#");
            else {
                tokens.add(String.valueOf(n.val));
                q.add(n.left); q.add(n.right);
            }
        }
        return String.join(",", tokens);
    }
    public static TreeNode deserialize(String data) {
        String[] t = data.split(",");
        if (t[0].equals("#")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty()) {
            TreeNode n = q.remove();
            if (!t[i].equals("#")) { n.left = new TreeNode(Integer.parseInt(t[i])); q.add(n.left); }
            i++;
            if (!t[i].equals("#")) { n.right = new TreeNode(Integer.parseInt(t[i])); q.add(n.right); }
            i++;
        }
        return root;
    }`),
    "O(n)", "O(n) tokens and queue",
    "encode preorder with null markers and decode recursively",
    tree(`    public static String serialize(TreeNode root) {
        StringBuilder out = new StringBuilder();
        write(root, out);
        return out.toString();
    }
    private static void write(TreeNode n, StringBuilder out) {
        if (out.length() > 0) out.append(',');
        if (n == null) { out.append('#'); return; }
        out.append(n.val);
        write(n.left, out); write(n.right, out);
    }
    public static TreeNode deserialize(String data) {
        String[] tokens = data.split(",");
        int[] index = {0};
        return read(tokens, index);
    }
    private static TreeNode read(String[] tokens, int[] index) {
        String value = tokens[index[0]++];
        if (value.equals("#")) return null;
        TreeNode n = new TreeNode(Integer.parseInt(value));
        n.left = read(tokens, index);
        n.right = read(tokens, index);
        return n;
    }`),
    "O(n)", "O(n) output and O(h) recursion stack"
  ),
  "bt-flatten-linked-list": entry(
    "Flatten the tree in place into preorder order using right pointers; set every left pointer to null.",
    "Root 1 with children 2 and 5 and 2's right child 3 becomes 1 -> 2 -> 3 -> 5 through right links.",
    "save preorder nodes, then relink adjacent nodes",
    tree(`    public static void flatten(TreeNode root) {
        List<TreeNode> order = new ArrayList<>();
        collect(root, order);
        for (int i = 0; i < order.size(); i++) {
            TreeNode n = order.get(i);
            n.left = null;
            n.right = i + 1 < order.size() ? order.get(i + 1) : null;
        }
    }
    private static void collect(TreeNode n, List<TreeNode> out) {
        if (n == null) return;
        out.add(n);
        collect(n.left, out);
        collect(n.right, out);
    }`),
    "O(n)", "O(n) node list plus O(h) recursion",
    "splice each left subtree between a node and its former right subtree",
    tree(`    public static void flatten(TreeNode root) {
        TreeNode current = root;
        while (current != null) {
            if (current.left != null) {
                TreeNode rightmost = current.left;
                while (rightmost.right != null) rightmost = rightmost.right;
                rightmost.right = current.right;
                current.right = current.left;
                current.left = null;
            }
            current = current.right;
        }
    }`),
    "O(n)", "O(1) extra space"
  ),
  "bt-root-leaf-paths": entry(
    "Return every root-to-leaf path as a list of values, in left-to-right order.",
    "For root 1 with children 2 and 3, paths are [[1, 2], [1, 3]].",
    "copy the current path whenever a leaf is reached",
    tree(`    public static List<List<Integer>> paths(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        collect(root, new ArrayList<>(), result);
        return result;
    }
    private static void collect(TreeNode n, List<Integer> path, List<List<Integer>> out) {
        if (n == null) return;
        path.add(n.val);
        if (n.left == null && n.right == null) out.add(new ArrayList<>(path));
        else {
            collect(n.left, path, out);
            collect(n.right, path, out);
        }
        path.remove(path.size() - 1);
    }`),
    "O(n + total output size)", "O(h) recursion and path, excluding output",
    "use an explicit stack of node/path states",
    tree(`    static class State { TreeNode node; List<Integer> path; State(TreeNode n, List<Integer> p) { node=n; path=p; } }
    public static List<List<Integer>> paths(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Deque<State> stack = new ArrayDeque<>();
        stack.push(new State(root, new ArrayList<>(Arrays.asList(root.val))));
        while (!stack.isEmpty()) {
            State s = stack.pop();
            if (s.node.left == null && s.node.right == null) result.add(s.path);
            if (s.node.right != null) {
                List<Integer> p = new ArrayList<>(s.path); p.add(s.node.right.val);
                stack.push(new State(s.node.right, p));
            }
            if (s.node.left != null) {
                List<Integer> p = new ArrayList<>(s.path); p.add(s.node.left.val);
                stack.push(new State(s.node.left, p));
            }
        }
        return result;
    }`),
    "O(n + total output size)", "O(n) worst-case pending paths, excluding output"
  ),
  "bt-path-sum-target": entry(
    "Return true if at least one root-to-leaf path sums to target. A path must end at a leaf; an empty tree returns false.",
    "For 5 -> 4 -> 11 -> 2, target 22 returns true.",
    "enumerate root-to-leaf paths and sum each complete path",
    tree(`    public static boolean hasPathSum(TreeNode root, int target) {
        List<List<Integer>> all = new ArrayList<>();
        collect(root, new ArrayList<>(), all);
        for (List<Integer> path : all) {
            long sum = 0;
            for (int value : path) sum += value;
            if (sum == target) return true;
        }
        return false;
    }
    private static void collect(TreeNode n, List<Integer> path, List<List<Integer>> out) {
        if (n == null) return;
        path.add(n.val);
        if (n.left == null && n.right == null) out.add(new ArrayList<>(path));
        else { collect(n.left, path, out); collect(n.right, path, out); }
        path.remove(path.size() - 1);
    }`),
    "O(n + total path output)", "O(h) recursion plus stored paths",
    "carry the remaining sum and stop when a matching leaf is reached",
    tree(`    public static boolean hasPathSum(TreeNode root, int target) {
        if (root == null) return false;
        long remaining = (long) target - root.val;
        if (root.left == null && root.right == null) return remaining == 0;
        return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
    }
    private static boolean hasPathSum(TreeNode n, long remaining) {
        if (n == null) return false;
        remaining -= n.val;
        if (n.left == null && n.right == null) return remaining == 0;
        return hasPathSum(n.left, remaining) || hasPathSum(n.right, remaining);
    }`),
    "O(n) worst case", "O(h) recursion stack"
  ),
  "bt-maximum-width": entry(
    "Return the largest level width, counting missing positions between the leftmost and rightmost nodes as in a complete tree. BigInteger indices avoid overflow on deep sparse trees.",
    "A level with nodes at complete-tree positions 0 and 3 has width 4, including the two gaps.",
    "assign complete-tree indices with BigInteger and scan every level",
    tree(`    static class Item { TreeNode node; java.math.BigInteger index; Item(TreeNode n, java.math.BigInteger i) { node=n; index=i; } }
    public static java.math.BigInteger width(TreeNode root) {
        java.math.BigInteger best = java.math.BigInteger.ZERO;
        if (root == null) return best;
        Queue<Item> q = new LinkedList<>();
        q.add(new Item(root, java.math.BigInteger.ZERO));
        while (!q.isEmpty()) {
            int size = q.size();
            java.math.BigInteger first = q.peek().index, last = first;
            for (int i = 0; i < size; i++) {
                Item x = q.remove(); last = x.index;
                if (x.node.left != null) q.add(new Item(x.node.left, x.index.shiftLeft(1)));
                if (x.node.right != null) q.add(new Item(x.node.right, x.index.shiftLeft(1).add(java.math.BigInteger.ONE)));
            }
            best = best.max(last.subtract(first).add(java.math.BigInteger.ONE));
        }
        return best;
    }`),
    "O(n) queue operations (BigInteger index costs depend on depth)", "O(w) queue",
    "normalize indices at each level before deriving child positions",
    tree(`    static class Item { TreeNode node; long index; Item(TreeNode n, long i) { node=n; index=i; } }
    public static long width(TreeNode root) {
        if (root == null) return 0;
        long best = 0;
        Queue<Item> q = new ArrayDeque<>();
        q.add(new Item(root, 0));
        while (!q.isEmpty()) {
            int size = q.size();
            long base = q.peek().index, first = 0, last = 0;
            for (int i = 0; i < size; i++) {
                Item x = q.remove();
                long position = x.index - base;
                if (i == 0) first = position;
                if (i == size - 1) last = position;
                if (x.node.left != null) q.add(new Item(x.node.left, 2 * position));
                if (x.node.right != null) q.add(new Item(x.node.right, 2 * position + 1));
            }
            best = Math.max(best, last - first + 1);
        }
        return best;
    }`),
    "O(n)", "O(w) queue; assumes level-normalized indices fit in long"
  )
};
