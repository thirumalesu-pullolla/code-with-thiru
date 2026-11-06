const makeContent = (statement, example, bruteText, bruteCode, bruteTime, bruteSpace,
  optimizedText, optimizedCode, optimizedTime, optimizedSpace) => `## Problem statement

${statement}

## Example

${example}

## Brute-force approach

${bruteText}

\`\`\`java
${bruteCode}
\`\`\`

- **Time:** ${bruteTime}
- **Extra space:** ${bruteSpace}

## Optimized approach

${optimizedText}

\`\`\`java
${optimizedCode}
\`\`\`

- **Time:** ${optimizedTime}
- **Extra space:** ${optimizedSpace}`;

export const disjointSetContent = {
  "implement-dsu-path-compression": makeContent(
    "Implement a DSU for elements 0 through n-1. Process pairs of operations: {0, x} asks for find(x), and {1, x, y} unions the sets containing x and y. Return find results and whether each union merged distinct sets. All indices are valid.",
    "For n = 5 and operations find(2), union(2,3), find(3), the finds return 2 then 2, and the union succeeds.",
    "A naive DSU keeps a component label per element and relabels every member on a union. It answers finds in constant time but can spend linear time merging.",
    `public class Solution {
    public static int[] apply(int n, int[][] operations) {
        int[] label = new int[n];
        for (int i = 0; i < n; i++) label[i] = i;
        int[] result = new int[operations.length];
        for (int i = 0; i < operations.length; i++) {
            int[] op = operations[i];
            if (op[0] == 0) result[i] = label[op[1]];
            else {
                int a = label[op[1]], b = label[op[2]];
                result[i] = a == b ? 0 : 1;
                if (a != b) for (int j = 0; j < n; j++) if (label[j] == b) label[j] = a;
            }
        }
        return result;
    }
}`,
    "O(qn) for q operations", "O(n + q) including output",
    "Store a parent for each element. During find, point every visited node directly at the root; this path compression makes a sequence of operations nearly constant amortized time.",
    `public class Solution {
    private final int[] parent;
    public Solution(int n) { parent = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }
    public int find(int x) { if (parent[x] != x) parent[x] = find(parent[x]); return parent[x]; }
    public boolean union(int a, int b) { int ra = find(a), rb = find(b); if (ra == rb) return false; parent[rb] = ra; return true; }
}`,
    "O((n + q) alpha(n)) amortized", "O(n) DSU state"
  ),
  "implement-union-by-rank-or-size": makeContent(
    "Process union pairs over vertices 0 through n-1. Return one boolean per pair, true exactly when the pair joined two previously separate sets. Indices are valid.",
    "With n = 4, unions (0,1), (1,2), (0,2) return [true, true, false].",
    "Maintain explicit member lists for components. Scan the labels to merge one component into the other, making each merge O(n).",
    `public class Solution {
    public static boolean[] unions(int n, int[][] pairs) {
        int[] component = new int[n];
        for (int i = 0; i < n; i++) component[i] = i;
        boolean[] answer = new boolean[pairs.length];
        for (int i = 0; i < pairs.length; i++) {
            int a = component[pairs[i][0]], b = component[pairs[i][1]];
            if (a == b) continue;
            answer[i] = true;
            for (int j = 0; j < n; j++) if (component[j] == b) component[j] = a;
        }
        return answer;
    }
}`,
    "O(nq)", "O(n + q) including output",
    "Use path compression and attach the smaller tree under the larger one. A component-size array bounds tree height, giving near-constant amortized operations.",
    `public class Solution {
    private final int[] parent, size;
    public Solution(int n) { parent = new int[n]; size = new int[n]; for (int i = 0; i < n; i++) { parent[i] = i; size[i] = 1; } }
    private int find(int x) { if (parent[x] != x) parent[x] = find(parent[x]); return parent[x]; }
    public boolean union(int a, int b) {
        int ra = find(a), rb = find(b); if (ra == rb) return false;
        if (size[ra] < size[rb]) { int t = ra; ra = rb; rb = t; }
        parent[rb] = ra; size[ra] += size[rb]; return true;
    }
}`,
    "O((n + q) alpha(n)) amortized", "O(n) DSU state"
  ),
  "dsu-detect-undirected-cycle": makeContent(
    "Given n vertices labeled 0 through n-1 and an edge list for a simple undirected graph, report whether any edge closes a cycle.",
    "For edges [[0,1],[1,2],[2,0]], return true; for [[0,1],[1,2]], return false.",
    "For each edge, search the graph built so far to see whether its endpoints are already connected. A connection means that adding the edge forms a cycle.",
    `import java.util.*;
public class Solution {
    public static boolean hasCycle(int n, int[][] edges) {
        List<List<Integer>> g = new ArrayList<>();
        for (int i = 0; i < n; i++) g.add(new ArrayList<>());
        for (int[] e : edges) {
            boolean[] seen = new boolean[n]; Deque<Integer> q = new ArrayDeque<>(); q.add(e[0]); seen[e[0]] = true;
            while (!q.isEmpty()) { int u = q.remove(); for (int v : g.get(u)) if (!seen[v]) { seen[v] = true; q.add(v); } }
            if (seen[e[1]]) return true;
            g.get(e[0]).add(e[1]); g.get(e[1]).add(e[0]);
        }
        return false;
    }
}`,
    "O(E(V + E)) in the worst case", "O(V + E)",
    "Process edges with DSU. If an edge's endpoints already have the same representative, it closes a cycle; otherwise union them.",
    `public class Solution {
    public static boolean hasCycle(int n, int[][] edges) {
        int[] p = new int[n], size = new int[n]; for (int i = 0; i < n; i++) { p[i] = i; size[i] = 1; }
        for (int[] e : edges) {
            int a = find(p, e[0]), b = find(p, e[1]);
            if (a == b) return true;
            if (size[a] < size[b]) { int t = a; a = b; b = t; }
            p[b] = a; size[a] += size[b];
        }
        return false;
    }
    private static int find(int[] p, int x) { if (p[x] != x) p[x] = find(p, p[x]); return p[x]; }
}`,
    "O((V + E) alpha(V))", "O(V)"
  ),
  "components-after-edge-additions": makeContent(
    "Start with n isolated vertices labeled 0 through n-1. After each valid added undirected edge, return the number of connected components.",
    "n = 4, edges [[0,1],[2,3],[1,2]] gives [3,2,1].",
    "After each edge, add it to an adjacency list and run DFS over all vertices to recount components.",
    `import java.util.*;
public class Solution {
    public static int[] counts(int n, int[][] edges) {
        List<List<Integer>> g = new ArrayList<>(); for (int i = 0; i < n; i++) g.add(new ArrayList<>());
        int[] answer = new int[edges.length];
        for (int i = 0; i < edges.length; i++) {
            int a = edges[i][0], b = edges[i][1]; g.get(a).add(b); g.get(b).add(a);
            boolean[] seen = new boolean[n]; int count = 0;
            for (int v = 0; v < n; v++) if (!seen[v]) { count++; Deque<Integer> st = new ArrayDeque<>(); st.push(v); seen[v] = true;
                while (!st.isEmpty()) for (int x : g.get(st.pop())) if (!seen[x]) { seen[x] = true; st.push(x); }
            }
            answer[i] = count;
        }
        return answer;
    }
}`,
    "O(q(V + E))", "O(V + E + q)",
    "Each successful DSU union reduces the component count by one; redundant edges leave it unchanged.",
    `public class Solution {
    public static int[] counts(int n, int[][] edges) {
        int[] p = new int[n], size = new int[n], answer = new int[edges.length]; for (int i = 0; i < n; i++) { p[i] = i; size[i] = 1; }
        int components = n;
        for (int i = 0; i < edges.length; i++) { int a = find(p, edges[i][0]), b = find(p, edges[i][1]);
            if (a != b) { if (size[a] < size[b]) { int t = a; a = b; b = t; } p[b] = a; size[a] += size[b]; components--; }
            answer[i] = components;
        }
        return answer;
    }
    private static int find(int[] p, int x) { if (p[x] != x) p[x] = find(p, p[x]); return p[x]; }
}`,
    "O((V + q) alpha(V))", "O(V + q)"
  ),
  "number-of-provinces-dsu": makeContent(
    "Given an n by n symmetric adjacency matrix where 1 denotes a direct connection, count connected provinces. Every city is connected to itself or may be treated as isolated.",
    "For [[1,1,0],[1,1,0],[0,0,1]], return 2.",
    "Run DFS from each unvisited city and count how many searches are started.",
    `public class Solution {
    public static int countProvinces(int[][] connected) {
        int n = connected.length, count = 0; boolean[] seen = new boolean[n];
        for (int i = 0; i < n; i++) if (!seen[i]) { count++; visit(i, connected, seen); }
        return count;
    }
    private static void visit(int u, int[][] g, boolean[] seen) { seen[u] = true; for (int v = 0; v < g.length; v++) if (g[u][v] != 0 && !seen[v]) visit(v, g, seen); }
}`,
    "O(V²)", "O(V) excluding recursion",
    "Union each connected pair once. The number of distinct representatives is the province count.",
    `public class Solution {
    public static int countProvinces(int[][] connected) {
        int n = connected.length; int[] p = new int[n], size = new int[n];
        for (int i = 0; i < n; i++) { p[i] = i; size[i] = 1; }
        for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) if (connected[i][j] != 0) {
            int a = find(p, i), b = find(p, j); if (a != b) { if (size[a] < size[b]) { int t = a; a = b; b = t; } p[b] = a; size[a] += size[b]; }
        }
        int count = 0; for (int i = 0; i < n; i++) if (find(p, i) == i) count++; return count;
    }
    private static int find(int[] p, int x) { if (p[x] != x) p[x] = find(p, p[x]); return p[x]; }
}`,
    "O(V² alpha(V))", "O(V)"
  ),
  "redundant-connection": makeContent(
    "The input is a tree on labels 1 through n plus one extra undirected edge. Return the first input edge whose addition creates a cycle. Labels are in 1..n.",
    "For [[1,2],[1,3],[2,3]], return [2,3].",
    "For each edge, search whether its endpoints are connected using the previously seen edges; return the first that already are.",
    `import java.util.*;
public class Solution {
    public static int[] findRedundantConnection(int[][] edges) {
        int n = edges.length; List<List<Integer>> g = new ArrayList<>(); for (int i = 0; i <= n; i++) g.add(new ArrayList<>());
        for (int[] e : edges) {
            boolean[] seen = new boolean[n + 1]; Deque<Integer> q = new ArrayDeque<>(); q.add(e[0]); seen[e[0]] = true;
            while (!q.isEmpty()) { int u = q.remove(); for (int v : g.get(u)) if (!seen[v]) { seen[v] = true; q.add(v); } }
            if (seen[e[1]]) return new int[]{e[0], e[1]}; g.get(e[0]).add(e[1]); g.get(e[1]).add(e[0]);
        }
        return new int[0];
    }
}`,
    "O(E(V + E))", "O(V + E)",
    "Union endpoints in order. The first edge whose endpoints already share a representative is redundant.",
    `public class Solution {
    public static int[] findRedundantConnection(int[][] edges) {
        int[] p = new int[edges.length + 1], size = new int[edges.length + 1]; for (int i = 1; i < p.length; i++) { p[i] = i; size[i] = 1; }
        for (int[] e : edges) { int a = find(p, e[0]), b = find(p, e[1]); if (a == b) return new int[]{e[0], e[1]};
            if (size[a] < size[b]) { int t = a; a = b; b = t; } p[b] = a; size[a] += size[b]; }
        return new int[0];
    }
    private static int find(int[] p, int x) { if (p[x] != x) p[x] = find(p, p[x]); return p[x]; }
}`,
    "O(E alpha(V))", "O(V)"
  ),
  "accounts-merge": makeContent(
    "Each account is an array whose first string is a name and remaining strings are emails. Accounts sharing any email belong together. Return groups as [name, sorted unique emails]; assume an email belongs to one person's name.",
    "For [John,a@x,b@x] and [John,b@x,c@x], return [John,a@x,b@x,c@x].",
    "Repeatedly merge any pair of accounts with a shared email until no pair can be merged, then sort the emails in each group.",
    `import java.util.*;
public class Solution {
    public static List<List<String>> merge(List<List<String>> accounts) {
        List<Set<String>> groups = new ArrayList<>(); List<String> names = new ArrayList<>();
        for (List<String> a : accounts) { Set<String> s = new HashSet<>(a.subList(1, a.size())); groups.add(s); names.add(a.get(0)); }
        boolean changed = true; while (changed) { changed = false;
            outer: for (int i = 0; i < groups.size(); i++) for (int j = i + 1; j < groups.size(); j++) {
                Set<String> small = groups.get(i).size() < groups.get(j).size() ? groups.get(i) : groups.get(j);
                Set<String> large = small == groups.get(i) ? groups.get(j) : groups.get(i);
                boolean share = false; for (String e : small) if (large.contains(e)) { share = true; break; }
                if (share) { int remove = small == groups.get(i) ? i : j; int keep = remove == i ? j : i;
                    groups.get(keep).addAll(groups.get(remove)); groups.remove(remove); names.remove(remove); changed = true; break outer; }
            }
        }
        List<List<String>> out = new ArrayList<>(); for (int i = 0; i < groups.size(); i++) { List<String> row = new ArrayList<>(); row.add(names.get(i)); List<String> emails = new ArrayList<>(groups.get(i)); Collections.sort(emails); row.addAll(emails); out.add(row); } return out;
    }
}`,
    "O(A² E) worst case for A accounts and E emails", "O(A + E) excluding output",
    "Index each unique email, union the accounts that contain it, then collect and sort emails by representative.",
    `import java.util.*;
public class Solution {
    public static List<List<String>> merge(List<List<String>> accounts) {
        int n = accounts.size(); int[] p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        Map<String, Integer> owner = new HashMap<>();
        for (int i = 0; i < n; i++) for (int j = 1; j < accounts.get(i).size(); j++) {
            String e = accounts.get(i).get(j); if (owner.containsKey(e)) union(p, i, owner.get(e)); else owner.put(e, i);
        }
        Map<Integer, TreeSet<String>> grouped = new HashMap<>();
        for (Map.Entry<String, Integer> e : owner.entrySet()) grouped.computeIfAbsent(find(p, e.getValue()), k -> new TreeSet<>()).add(e.getKey());
        List<List<String>> out = new ArrayList<>();
        for (Map.Entry<Integer, TreeSet<String>> e : grouped.entrySet()) { List<String> row = new ArrayList<>(); row.add(accounts.get(e.getKey()).get(0)); row.addAll(e.getValue()); out.add(row); }
        return out;
    }
    private static int find(int[] p, int x) { if (p[x] != x) p[x] = find(p, p[x]); return p[x]; }
    private static void union(int[] p, int a, int b) { p[find(p, a)] = find(p, b); }
}`,
    "O(E alpha(A) + E log E)", "O(A + E)"
  ),
  "most-stones-removed": makeContent(
    "Stone coordinates are unique integer pairs. A stone can be removed if another remaining stone shares its row or column. Return the maximum number removable.",
    "For [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]], return 5.",
    "Build row/column adjacency between stones and count connected components with DFS. In each component, all but one stone can be removed.",
    `import java.util.*;
public class Solution {
    public static int removeStones(int[][] stones) {
        int n = stones.length, components = 0; boolean[] seen = new boolean[n];
        for (int i = 0; i < n; i++) if (!seen[i]) { components++; Deque<Integer> q = new ArrayDeque<>(); q.add(i); seen[i] = true;
            while (!q.isEmpty()) { int a = q.remove(); for (int b = 0; b < n; b++) if (!seen[b] && (stones[a][0] == stones[b][0] || stones[a][1] == stones[b][1])) { seen[b] = true; q.add(b); } }
        }
        return n - components;
    }
}`,
    "O(S²)", "O(S)",
    "Represent each row and column as DSU nodes and union them for every stone. The answer is stones minus the number of connected components containing stones.",
    `import java.util.*;
public class Solution {
    public static int removeStones(int[][] stones) {
        Map<Long, Integer> id = new HashMap<>(); int next = 0;
        for (int[] s : stones) { long r = ((long)s[0]) << 1, c = (((long)s[1]) << 1) | 1L; if (!id.containsKey(r)) id.put(r, next++); if (!id.containsKey(c)) id.put(c, next++); }
        int[] p = new int[next]; for (int i = 0; i < next; i++) p[i] = i;
        Set<Integer> used = new HashSet<>();
        for (int[] s : stones) { int r = id.get(((long)s[0]) << 1), c = id.get((((long)s[1]) << 1) | 1L); p[find(p, r)] = find(p, c); used.add(r); used.add(c); }
        Set<Integer> roots = new HashSet<>(); for (int x : used) roots.add(find(p, x)); return stones.length - roots.size();
    }
    private static int find(int[] p, int x) { if (p[x] != x) p[x] = find(p, p[x]); return p[x]; }
}`,
    "O(S alpha(S)) expected with hash maps", "O(S)"
  ),
  "satisfiability-equality-equations": makeContent(
    "Each equation is a four-character string such as a==b or a!=b. Variables are lowercase English letters. Return whether all equations can hold at once.",
    '["a==b","b!=c","a!=c"] returns true; ["a==b","b!=a"] returns false.',
    "Try every assignment of the 26 variables to two truth-value groups and check whether an assignment satisfies every equation. This is exponential and only illustrative.",
    `public class Solution {
    public static boolean satisfiable(String[] equations) { return assign(0, new int[26], equations); }
    private static boolean assign(int x, int[] value, String[] eq) {
        if (x == 26) { for (String e : eq) { boolean same = value[e.charAt(0)-'a'] == value[e.charAt(3)-'a']; if ((e.charAt(1) == '=') != same) return false; } return true; }
        for (int candidate = 0; candidate < 26; candidate++) { value[x] = candidate; if (assign(x + 1, value, eq)) return true; }
        return false;
    }
}`,
    "O(26^26 · Q)", "O(26 + Q) recursion/output",
    "First union all equalities. Then any inequality whose endpoints share a representative is contradictory.",
    `public class Solution {
    public static boolean satisfiable(String[] equations) {
        int[] p = new int[26]; for (int i = 0; i < 26; i++) p[i] = i;
        for (String e : equations) if (e.charAt(1) == '=') p[find(p, e.charAt(0)-'a')] = find(p, e.charAt(3)-'a');
        for (String e : equations) if (e.charAt(1) == '!' && find(p, e.charAt(0)-'a') == find(p, e.charAt(3)-'a')) return false;
        return true;
    }
    private static int find(int[] p, int x) { if (p[x] != x) p[x] = find(p, p[x]); return p[x]; }
}`,
    "O(Q alpha(26))", "O(26)"
  ),
  "number-of-islands-ii": makeContent(
    "An initially water-filled m by n grid receives valid land additions [row,column]. After every addition, report the number of 4-directionally connected islands. Repeated additions are allowed.",
    "For a 3 by 3 grid with additions [[0,0],[0,1],[1,2],[2,1],[1,1]], return [1,1,2,3,1].",
    "After each addition, flood-fill the entire grid to count islands. Repeatedly added land has no further effect.",
    `import java.util.*;
public class Solution {
    public static List<Integer> islands(int m, int n, int[][] positions) {
        boolean[][] land = new boolean[m][n]; List<Integer> out = new ArrayList<>(); int[][] d = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] p : positions) {
            land[p[0]][p[1]] = true; boolean[][] seen = new boolean[m][n]; int count = 0;
            for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) if (land[r][c] && !seen[r][c]) {
                count++; Deque<int[]> q = new ArrayDeque<>(); q.add(new int[]{r,c}); seen[r][c] = true;
                while (!q.isEmpty()) { int[] x = q.remove(); for (int[] z : d) { int a=x[0]+z[0], b=x[1]+z[1]; if(a>=0&&a<m&&b>=0&&b<n&&land[a][b]&&!seen[a][b]){seen[a][b]=true;q.add(new int[]{a,b});} } }
            }
            out.add(count);
        }
        return out;
    }
}`,
    "O(Qmn)", "O(mn + Q)",
    "Assign one DSU element to each cell. A newly activated cell starts a component and unions with each active 4-neighbor; successful unions decrement the island count.",
    `import java.util.*;
public class Solution {
    public static List<Integer> islands(int m, int n, int[][] positions) {
        int total = m * n; int[] p = new int[total]; Arrays.fill(p, -1); int count = 0; List<Integer> out = new ArrayList<>(); int[][] d={{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] cell : positions) {
            int r=cell[0], c=cell[1], id=r*n+c;
            if (p[id] == -1) { p[id]=id; count++;
                for (int[] z:d) { int a=r+z[0], b=c+z[1]; if(a>=0&&a<m&&b>=0&&b<n) { int other=a*n+b; if(p[other]!=-1) { int x=find(p,id), y=find(p,other); if(x!=y){p[x]=y;count--;} } } }
            }
            out.add(count);
        }
        return out;
    }
    private static int find(int[] p,int x){if(p[x]!=x)p[x]=find(p,p[x]);return p[x];}
}`,
    "O(Q alpha(mn))", "O(mn + Q)"
  )
};
