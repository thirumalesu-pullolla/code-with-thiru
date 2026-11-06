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

export const graphTraversalContent = {
  "graph-adjacency-list": makeContent(
    "Given n vertices labeled 0..n-1, edges [u,v], and a directed flag, return an adjacency list. For an undirected graph add both directions. Parallel edges are preserved.",
    "n=3, edges [[0,1],[1,2]], undirected yields [[1],[0,2],[1]].",
    "Initialize an n by n boolean matrix, add each edge, and scan the matrix to produce neighbor lists.",
    `import java.util.*;
public class Solution {
    public static List<List<Integer>> build(int n,int[][]e,boolean directed){boolean[][]m=new boolean[n][n];for(int[]x:e){m[x[0]][x[1]]=true;if(!directed)m[x[1]][x[0]]=true;}List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++){g.add(new ArrayList<>());for(int j=0;j<n;j++)if(m[i][j])g.get(i).add(j);}return g;}
}`,
    "O(V² + E)", "O(V²)",
    "Append directly to adjacency lists, storing both directions only for undirected input.",
    `import java.util.*;
public class Solution {
    public static List<List<Integer>> build(int n,int[][]e,boolean directed){List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(x[1]);if(!directed)g.get(x[1]).add(x[0]);}return g;}
}`,
    "O(V + E)", "O(V + E)"
  ),
  "graph-bfs": makeContent(
    "Given an adjacency list and valid start vertex, return the BFS order of all vertices reachable from start. Visit each once and respect each neighbor list's order.",
    "For [[1,2],[0,3],[0],[1]] starting at 0, return [0,1,2,3].",
    "Scan the entire vertex set at each distance from the start, using a graph search to identify vertices at the next level.",
    `import java.util.*;
public class Solution {
    public static List<Integer> bfs(List<List<Integer>>g,int s){List<Integer>out=new ArrayList<>();boolean[]seen=new boolean[g.size()];seen[s]=true;List<Integer>level=Arrays.asList(s);while(!level.isEmpty()){List<Integer>next=new ArrayList<>();for(int u:level){out.add(u);for(int v:g.get(u))if(!seen[v]){seen[v]=true;next.add(v);}}level=next;}return out;}
}`,
    "O(V + E) (already asymptotically optimal)", "O(V)",
    "Use a FIFO queue and mark vertices when enqueued to avoid duplicate queue entries.",
    `import java.util.*;
public class Solution {
    public static List<Integer> bfs(List<List<Integer>>g,int s){List<Integer>out=new ArrayList<>();boolean[]seen=new boolean[g.size()];Deque<Integer>q=new ArrayDeque<>();seen[s]=true;q.add(s);while(!q.isEmpty()){int u=q.remove();out.add(u);for(int v:g.get(u))if(!seen[v]){seen[v]=true;q.add(v);}}return out;}
}`,
    "O(V + E)", "O(V)"
  ),
  "graph-dfs-recursive": makeContent(
    "Given an adjacency list and valid start vertex, return recursive depth-first traversal order of reachable vertices. Neighbor order is the list order.",
    "For [[1,2],[0,3],[0],[1]] starting at 0, return [0,1,3,2].",
    "Simulate recursive DFS with an explicit stack that stores a vertex and its next neighbor index.",
    `import java.util.*;
public class Solution {
    public static List<Integer> dfs(List<List<Integer>>g,int s){List<Integer>o=new ArrayList<>();boolean[]seen=new boolean[g.size()];Deque<int[]>st=new ArrayDeque<>();seen[s]=true;o.add(s);st.push(new int[]{s,0});while(!st.isEmpty()){int[]x=st.peek();if(x[1]==g.get(x[0]).size()){st.pop();continue;}int v=g.get(x[0]).get(x[1]++);if(!seen[v]){seen[v]=true;o.add(v);st.push(new int[]{v,0});}}return o;}
}`,
    "O(V + E)", "O(V)",
    "Use recursive DFS, marking a vertex before exploring its neighbors.",
    `import java.util.*;
public class Solution {
    public static List<Integer> dfs(List<List<Integer>>g,int s){List<Integer>o=new ArrayList<>();boolean[]seen=new boolean[g.size()];visit(s,g,seen,o);return o;}
    private static void visit(int u,List<List<Integer>>g,boolean[]seen,List<Integer>o){seen[u]=true;o.add(u);for(int v:g.get(u))if(!seen[v])visit(v,g,seen,o);}
}`,
    "O(V + E)", "O(V) plus recursion"
  ),
  "graph-dfs-iterative": makeContent(
    "Given an adjacency list and valid start vertex, return depth-first order using an explicit stack, visiting each reachable vertex once.",
    "For [[1,2],[0,3],[0],[1]] from 0, a valid iterative DFS order is [0,2,1,3] when neighbors are pushed in listed order.",
    "Repeatedly scan remaining vertices to find reachable ones, expanding each using a full adjacency scan.",
    `import java.util.*;
public class Solution {
    public static List<Integer> dfs(List<List<Integer>>g,int s){List<Integer>o=new ArrayList<>();boolean[]seen=new boolean[g.size()];Deque<Integer>st=new ArrayDeque<>();st.push(s);while(!st.isEmpty()){int u=st.pop();if(seen[u])continue;seen[u]=true;o.add(u);for(int v:g.get(u))if(!seen[v])st.push(v);}return o;}
}`,
    "O(V + E)", "O(V)",
    "Use an explicit stack and mark nodes when popped; pushing neighbors in reverse list order reproduces recursive neighbor order.",
    `import java.util.*;
public class Solution {
    public static List<Integer> dfs(List<List<Integer>>g,int s){List<Integer>o=new ArrayList<>();boolean[]seen=new boolean[g.size()];Deque<Integer>st=new ArrayDeque<>();st.push(s);while(!st.isEmpty()){int u=st.pop();if(seen[u])continue;seen[u]=true;o.add(u);List<Integer>a=g.get(u);for(int i=a.size()-1;i>=0;i--)if(!seen[a.get(i)])st.push(a.get(i));}return o;}
}`,
    "O(V + E)", "O(V)"
  ),
  "connected-components-undirected-graph": makeContent(
    "Given an undirected graph as an adjacency list, return the number of connected components, including isolated vertices.",
    "For [[1],[0],[3],[2],[]], return 3.",
    "For every pair of vertices, run a reachability search and group vertices that can reach each other.",
    `import java.util.*;
public class Solution {
    public static int components(List<List<Integer>>g){int n=g.size(),count=0;boolean[]seen=new boolean[n];for(int i=0;i<n;i++)if(!seen[i]){count++;Deque<Integer>q=new ArrayDeque<>();q.add(i);seen[i]=true;while(!q.isEmpty())for(int v:g.get(q.remove()))if(!seen[v]){seen[v]=true;q.add(v);}}return count;}
}`,
    "O(V + E)", "O(V)",
    "Start one BFS for each unvisited vertex. Each such start identifies exactly one component.",
    `import java.util.*;
public class Solution {
    public static int components(List<List<Integer>>g){boolean[]seen=new boolean[g.size()];int count=0;for(int s=0;s<g.size();s++)if(!seen[s]){count++;ArrayDeque<Integer>q=new ArrayDeque<>();q.add(s);seen[s]=true;while(!q.isEmpty()){int u=q.remove();for(int v:g.get(u))if(!seen[v]){seen[v]=true;q.add(v);}}}return count;}
}`,
    "O(V + E)", "O(V)"
  ),
  "number-of-provinces-traversal": makeContent(
    "Given an n by n symmetric adjacency matrix of city connections, count connected provinces. Cities are vertices; a province is a connected component.",
    "For [[1,1,0],[1,1,0],[0,0,1]], return 2.",
    "For each unvisited city, perform a DFS over the corresponding matrix row and count the search roots.",
    `public class Solution {
    public static int provinces(int[][]a){int n=a.length,count=0;boolean[]seen=new boolean[n];for(int i=0;i<n;i++)if(!seen[i]){count++;dfs(i,a,seen);}return count;}
    private static void dfs(int u,int[][]a,boolean[]s){s[u]=true;for(int v=0;v<a.length;v++)if(a[u][v]!=0&&!s[v])dfs(v,a,s);}
}`,
    "O(V²)", "O(V) plus recursion",
    "Use iterative DFS from every unseen city; inspect its matrix row to find all directly connected unseen neighbors.",
    `import java.util.*;
public class Solution {
    public static int provinces(int[][]a){int n=a.length,count=0;boolean[]seen=new boolean[n];for(int s=0;s<n;s++)if(!seen[s]){count++;Deque<Integer>st=new ArrayDeque<>();st.push(s);seen[s]=true;while(!st.isEmpty()){int u=st.pop();for(int v=0;v<n;v++)if(a[u][v]!=0&&!seen[v]){seen[v]=true;st.push(v);}}}return count;}
}`,
    "O(V²)", "O(V)"
  ),
  "detect-cycle-undirected-graph": makeContent(
    "Given an undirected graph as an adjacency list, determine whether it contains a cycle. Assume a simple graph without self-loops or parallel edges.",
    "For [[1,2],[0,2],[0,1]], return true; a chain returns false.",
    "Remove each undirected edge in turn and check whether its endpoints remain connected. If so, that edge belongs to a cycle.",
    `import java.util.*;
public class Solution {
    public static boolean hasCycle(List<List<Integer>>g){for(int u=0;u<g.size();u++)for(int v:g.get(u))if(u<v){boolean[]s=new boolean[g.size()];Deque<Integer>q=new ArrayDeque<>();q.add(u);s[u]=true;while(!q.isEmpty()){int x=q.remove();for(int y:g.get(x))if(!(x==u&&y==v||x==v&&y==u)&&!s[y]){s[y]=true;q.add(y);}}if(s[v])return true;}return false;}
}`,
    "O(E(V + E))", "O(V + E)",
    "DFS while tracking each node's parent. Encountering an already visited neighbor other than the parent identifies a cycle.",
    `import java.util.*;
public class Solution {
    public static boolean hasCycle(List<List<Integer>>g){boolean[]s=new boolean[g.size()];for(int i=0;i<g.size();i++)if(!s[i]&&dfs(i,-1,g,s))return true;return false;}
    private static boolean dfs(int u,int p,List<List<Integer>>g,boolean[]s){s[u]=true;for(int v:g.get(u)){if(!s[v]){if(dfs(v,u,g,s))return true;}else if(v!=p)return true;}return false;}
}`,
    "O(V + E)", "O(V) plus recursion"
  ),
  "detect-cycle-directed-graph": makeContent(
    "Given a directed graph as adjacency lists, return whether it contains a directed cycle.",
    "For [[1],[2],[0]], return true; for [[1],[]], return false.",
    "For each start, enumerate directed walks up to V+1 edges; a repeated vertex on a walk reveals a cycle.",
    `import java.util.*;
public class Solution {
    public static boolean hasCycle(int[][]g){for(int s=0;s<g.length;s++)if(walk(s,s,0,g,new boolean[g.length]))return true;return false;}
    private static boolean walk(int start,int u,int depth,int[][]g,boolean[]path){if(depth>0&&u==start)return true;if(depth==g.length)return false;path[u]=true;for(int v:g[u])if(!path[v]||v==start)if(walk(start,v,depth+1,g,path))return true;path[u]=false;return false;}
}`,
    "O(V(V + E))", "O(V) per start",
    "Use DFS states: an edge to an active recursion-stack vertex is a back edge and proves a cycle.",
    `import java.util.*;
public class Solution {
    public static boolean hasCycle(List<List<Integer>>g){int[]s=new int[g.size()];for(int i=0;i<g.size();i++)if(s[i]==0&&dfs(i,g,s))return true;return false;}
    private static boolean dfs(int u,List<List<Integer>>g,int[]s){s[u]=1;for(int v:g.get(u)){if(s[v]==1)return true;if(s[v]==0&&dfs(v,g,s))return true;}s[u]=2;return false;}
}`,
    "O(V + E)", "O(V) plus recursion"
  ),
  "bipartite-graph": makeContent(
    "Given an undirected graph as adjacency lists, determine whether its vertices can be split into two sets so every edge crosses between the sets.",
    "A triangle is not bipartite; a four-cycle is bipartite.",
    "Try every two-color assignment and test all edges. Return true if any assignment satisfies every edge.",
    `public class Solution {
    public static boolean bipartite(int[][]g){return color(0,new int[g.length],g);}
    private static boolean color(int u,int[]c,int[][]g){if(u==g.length){for(int x=0;x<g.length;x++)for(int v:g[x])if(c[x]==c[v])return false;return true;}c[u]=1;if(color(u+1,c,g))return true;c[u]=2;return color(u+1,c,g);}
}`,
    "O(2^V(V + E))", "O(V)",
    "BFS-color every component, assigning opposite colors across each edge. A same-color edge is a contradiction.",
    `import java.util.*;
public class Solution {
    public static boolean bipartite(int[][]g){int[]c=new int[g.length];for(int s=0;s<g.length;s++)if(c[s]==0){Deque<Integer>q=new ArrayDeque<>();q.add(s);c[s]=1;while(!q.isEmpty()){int u=q.remove();for(int v:g[u])if(c[v]==0){c[v]=-c[u];q.add(v);}else if(c[v]==c[u])return false;}}return true;}
}`,
    "O(V + E)", "O(V)"
  ),
  "all-paths-source-destination": makeContent(
    "Given a directed acyclic graph as adjacency lists, return every path from vertex 0 to vertex n-1. Return an empty list if there are no paths.",
    "For [[1,2],[3],[3],[]], return [[0,1,3],[0,2,3]].",
    "Enumerate all vertex sequences, retaining only sequences that follow edges from source to destination.",
    `import java.util.*;
public class Solution {
    public static List<List<Integer>> paths(int[][]g){List<List<Integer>>out=new ArrayList<>();perm(0,g,new ArrayList<>(),out);return out;}
    private static void perm(int u,int[][]g,List<Integer>p,List<List<Integer>>out){p.add(u);if(u==g.length-1)out.add(new ArrayList<>(p));else for(int v=0;v<g.length;v++)if(has(g[u],v)&&!p.contains(v))perm(v,g,p,out);p.remove(p.size()-1);}
    private static boolean has(int[]a,int x){for(int v:a)if(v==x)return true;return false;}
}`,
    "O(V! · E) upper bound", "O(V) recursion plus output",
    "Backtrack along outgoing edges from 0. Since the graph is a DAG, no path can loop; copy the current path upon reaching n-1.",
    `import java.util.*;
public class Solution {
    public static List<List<Integer>> paths(int[][]g){List<List<Integer>>out=new ArrayList<>();if(g.length>0)dfs(0,g,new ArrayList<>(),out);return out;}
    private static void dfs(int u,int[][]g,List<Integer>p,List<List<Integer>>out){p.add(u);if(u==g.length-1)out.add(new ArrayList<>(p));else for(int v:g[u])dfs(v,g,p,out);p.remove(p.size()-1);}
}`,
    "O(total size of returned paths)", "O(V) recursion, excluding output"
  ),
  "clone-graph": makeContent(
    "Deep-clone a connected undirected graph represented by Node objects with integer value and a neighbor list. Return null for null input; node values need not be unique.",
    "If node 1 has neighbors 2 and 3, its clone must have newly allocated neighbor clones with corresponding links.",
    "Breadth-first traverse the graph and create exactly one clone for each original node, recording the mapping.",
    `import java.util.*;
public class Solution {
    static class Node { int val; List<Node> neighbors=new ArrayList<>(); Node(int v){val=v;} }
    public Node cloneGraph(Node node){if(node==null)return null;Map<Node,Node>m=new HashMap<>();Queue<Node>q=new ArrayDeque<>();m.put(node,new Node(node.val));q.add(node);while(!q.isEmpty()){Node u=q.remove();for(Node v:u.neighbors){if(!m.containsKey(v)){m.put(v,new Node(v.val));q.add(v);}m.get(u).neighbors.add(m.get(v));}}return m.get(node);}
}`,
    "O(V + E)", "O(V)",
    "Use recursive DFS with a map from original nodes to clones; install the clone before recursing so cycles terminate.",
    `import java.util.*;
public class Solution {
    static class Node { int val; List<Node> neighbors=new ArrayList<>(); Node(int v){val=v;} }
    private final Map<Node,Node> copies=new HashMap<>();
    public Node cloneGraph(Node node){if(node==null)return null;if(copies.containsKey(node))return copies.get(node);Node c=new Node(node.val);copies.put(node,c);for(Node v:node.neighbors)c.neighbors.add(cloneGraph(v));return c;}
}`,
    "O(V + E)", "O(V) plus recursion"
  ),
  "number-of-islands": makeContent(
    "Given a rectangular grid of '1' land and '0' water, count 4-directionally connected islands. The input may be modified.",
    'For [["1","1","0"],["0","1","0"],["1","0","1"]], return 3.',
    "For each unvisited land cell, run BFS and mark its entire island.",
    `import java.util.*;
public class Solution {
    public static int count(char[][]g){int m=g.length,n=g[0].length,c=0;boolean[][]s=new boolean[m][n];int[][]d={{1,0},{-1,0},{0,1},{0,-1}};for(int r=0;r<m;r++)for(int col=0;col<n;col++)if(g[r][col]=='1'&&!s[r][col]){c++;Deque<int[]>q=new ArrayDeque<>();q.add(new int[]{r,col});s[r][col]=true;while(!q.isEmpty()){int[]x=q.remove();for(int[]z:d){int a=x[0]+z[0],b=x[1]+z[1];if(a>=0&&a<m&&b>=0&&b<n&&g[a][b]=='1'&&!s[a][b]){s[a][b]=true;q.add(new int[]{a,b});}}}}return c;}
}`,
    "O(RC)", "O(RC)",
    "Scan the grid and flood-fill each newly found island, changing visited land into water to avoid a separate visited matrix.",
    `public class Solution {
    public static int count(char[][]g){int c=0;for(int r=0;r<g.length;r++)for(int col=0;col<g[0].length;col++)if(g[r][col]=='1'){c++;fill(r,col,g);}return c;}
    private static void fill(int r,int c,char[][]g){if(r<0||r>=g.length||c<0||c>=g[0].length||g[r][c]!='1')return;g[r][c]='0';fill(r+1,c,g);fill(r-1,c,g);fill(r,c+1,g);fill(r,c-1,g);}
}`,
    "O(RC)", "O(RC) worst-case recursion"
  ),
  "shortest-path-unweighted-graph": makeContent(
    "Given an undirected unweighted graph with vertices 0..n-1, source and destination, return the minimum number of edges in a path, or -1 if unreachable.",
    "For 0-1-2 and a direct 0-2 edge, distance 0 to 2 is 1.",
    "Enumerate simple paths from source to destination and retain the path using the fewest edges.",
    `import java.util.*;
public class Solution {
    public static int shortest(int n,int[][]e,int s,int t){List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(x[1]);g.get(x[1]).add(x[0]);}int[]best={Integer.MAX_VALUE};walk(s,t,0,new boolean[n],g,best);return best[0]==Integer.MAX_VALUE?-1:best[0];}
    private static void walk(int u,int t,int d,boolean[]v,List<List<Integer>>g,int[]b){if(d>=b[0])return;if(u==t){b[0]=d;return;}v[u]=true;for(int x:g.get(u))if(!v[x])walk(x,t,d+1,v,g,b);v[u]=false;}
}`,
    "O(number of simple paths)", "O(V + E) plus recursion",
    "BFS explores by edge count; the first time destination is dequeued its distance is minimal.",
    `import java.util.*;
public class Solution {
    public static int shortest(int n,int[][]e,int s,int t){List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(x[1]);g.get(x[1]).add(x[0]);}int[]d=new int[n];Arrays.fill(d,-1);Deque<Integer>q=new ArrayDeque<>();q.add(s);d[s]=0;while(!q.isEmpty()){int u=q.remove();if(u==t)return d[u];for(int v:g.get(u))if(d[v]<0){d[v]=d[u]+1;q.add(v);}}return -1;}
}`,
    "O(V + E)", "O(V + E)"
  ),
  "rotting-oranges": makeContent(
    "In a grid, 0 is empty, 1 fresh orange, and 2 rotten orange. Each minute rotten oranges infect adjacent fresh oranges in four directions. Return minutes until all rot, or -1 if impossible.",
    "For [[2,1,1],[1,1,0],[0,1,1]], return 4.",
    "Simulate each minute by scanning the grid and marking fresh oranges adjacent to oranges that were rotten before that minute.",
    `public class Solution {
    public static int minutes(int[][]g){int m=g.length,n=g[0].length,f=0,t=0;for(int[]r:g)for(int x:r)if(x==1)f++;while(f>0){boolean[][]add=new boolean[m][n];int changed=0;for(int r=0;r<m;r++)for(int c=0;c<n;c++)if(g[r][c]==2){int[][]d={{1,0},{-1,0},{0,1},{0,-1}};for(int[]z:d){int a=r+z[0],b=c+z[1];if(a>=0&&a<m&&b>=0&&b<n&&g[a][b]==1&&!add[a][b]){add[a][b]=true;changed++;}}}if(changed==0)return -1;for(int r=0;r<m;r++)for(int c=0;c<n;c++)if(add[r][c])g[r][c]=2;f-=changed;t++;}return t;}
}`,
    "O(T·RC), T at most RC", "O(RC)",
    "Start a multi-source BFS from every rotten orange. Process one queue layer per minute and count newly infected fresh cells.",
    `import java.util.*;
public class Solution {
    public static int minutes(int[][]g){int m=g.length,n=g[0].length,f=0,t=0;Deque<int[]>q=new ArrayDeque<>();for(int r=0;r<m;r++)for(int c=0;c<n;c++)if(g[r][c]==2)q.add(new int[]{r,c});else if(g[r][c]==1)f++;int[][]d={{1,0},{-1,0},{0,1},{0,-1}};while(f>0&&!q.isEmpty()){int size=q.size();boolean changed=false;while(size-->0){int[]x=q.remove();for(int[]z:d){int a=x[0]+z[0],b=x[1]+z[1];if(a>=0&&a<m&&b>=0&&b<n&&g[a][b]==1){g[a][b]=2;f--;changed=true;q.add(new int[]{a,b});}}}if(changed)t++;}return f==0?t:-1;}
}`,
    "O(RC)", "O(RC)"
  ),
  "nearest-zero-binary-matrix": makeContent(
    "Given a rectangular binary matrix containing at least one zero, return a matrix where each cell is its shortest 4-directional distance to a zero.",
    "For [[0,0,0],[0,1,0],[1,1,1]], return [[0,0,0],[0,1,0],[1,2,1]].",
    "For every cell, run a BFS until the nearest zero is reached.",
    `import java.util.*;
public class Solution {
    public static int[][] distances(int[][]a){int m=a.length,n=a[0].length;int[][]out=new int[m][n],d={{1,0},{-1,0},{0,1},{0,-1}};for(int r=0;r<m;r++)for(int c=0;c<n;c++){boolean[][]s=new boolean[m][n];Deque<int[]>q=new ArrayDeque<>();q.add(new int[]{r,c,0});s[r][c]=true;while(!q.isEmpty()){int[]x=q.remove();if(a[x[0]][x[1]]==0){out[r][c]=x[2];break;}for(int[]z:d){int y=x[0]+z[0],w=x[1]+z[1];if(y>=0&&y<m&&w>=0&&w<n&&!s[y][w]){s[y][w]=true;q.add(new int[]{y,w,x[2]+1});}}}}return out;}
}`,
    "O((RC)²)", "O(RC)",
    "Seed one BFS queue with all zero cells; each cell is first reached at its minimum distance.",
    `import java.util.*;
public class Solution {
    public static int[][] distances(int[][]a){int m=a.length,n=a[0].length;int[][]out=new int[m][n];Deque<int[]>q=new ArrayDeque<>();for(int r=0;r<m;r++)for(int c=0;c<n;c++)if(a[r][c]==0)q.add(new int[]{r,c});else out[r][c]=-1;int[][]d={{1,0},{-1,0},{0,1},{0,-1}};while(!q.isEmpty()){int[]x=q.remove();for(int[]z:d){int r=x[0]+z[0],c=x[1]+z[1];if(r>=0&&r<m&&c>=0&&c<n&&out[r][c]==-1){out[r][c]=out[x[0]][x[1]]+1;q.add(new int[]{r,c});}}}return out;}
}`,
    "O(RC)", "O(RC)"
  ),
  "surrounded-regions": makeContent(
    "Given a rectangular board of 'X' and 'O', capture every 'O' region not connected by 4-directional moves to the border by changing it to 'X'.",
    'For [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]], the enclosed middle region becomes X.',
    "For each O, flood-fill its component and check whether it touches the border; flip components that do not.",
    `import java.util.*;
public class Solution {
    public static void solve(char[][]b){int m=b.length,n=b[0].length;boolean[][]safe=new boolean[m][n];for(int r=0;r<m;r++)for(int c=0;c<n;c++)if(b[r][c]=='O'&&!safe[r][c]){List<int[]>cells=new ArrayList<>();Deque<int[]>q=new ArrayDeque<>();q.add(new int[]{r,c});safe[r][c]=true;boolean border=false;while(!q.isEmpty()){int[]x=q.remove();cells.add(x);if(x[0]==0||x[0]==m-1||x[1]==0||x[1]==n-1)border=true;int[][]d={{1,0},{-1,0},{0,1},{0,-1}};for(int[]z:d){int a=x[0]+z[0],w=x[1]+z[1];if(a>=0&&a<m&&w>=0&&w<n&&b[a][w]=='O'&&!safe[a][w]){safe[a][w]=true;q.add(new int[]{a,w});}}}if(!border)for(int[]x:cells)b[x[0]][x[1]]='X';}}
}`,
    "O(RC)", "O(RC)",
    "Flood-fill from all border O cells and mark them safe. Flip every remaining O.",
    `import java.util.*;
public class Solution {
    public static void solve(char[][]b){int m=b.length,n=b[0].length;Deque<int[]>q=new ArrayDeque<>();for(int r=0;r<m;r++){add(b,r,0,q);add(b,r,n-1,q);}for(int c=0;c<n;c++){add(b,0,c,q);add(b,m-1,c,q);}int[][]d={{1,0},{-1,0},{0,1},{0,-1}};while(!q.isEmpty()){int[]x=q.remove();for(int[]z:d)add(b,x[0]+z[0],x[1]+z[1],q);}for(int r=0;r<m;r++)for(int c=0;c<n;c++)if(b[r][c]=='O')b[r][c]='X';else if(b[r][c]=='#')b[r][c]='O';}
    private static void add(char[][]b,int r,int c,Deque<int[]>q){if(r>=0&&r<b.length&&c>=0&&c<b[0].length&&b[r][c]=='O'){b[r][c]='#';q.add(new int[]{r,c});}}
}`,
    "O(RC)", "O(RC)"
  ),
  "pacific-atlantic-water-flow": makeContent(
    "Given a nonempty height grid, return coordinates from which water can flow downhill or level to both the Pacific (top/left borders) and Atlantic (bottom/right borders).",
    "For the one-cell grid [[5]], return [[0,0]] because the cell touches both oceans.",
    "For each cell, run downhill DFS to see whether it can reach each ocean border.",
    `public class Solution {
    public static java.util.List<int[]> flow(int[][]h){java.util.List<int[]>out=new java.util.ArrayList<>();for(int r=0;r<h.length;r++)for(int c=0;c<h[0].length;c++)if(reach(r,c,h,new boolean[h.length][h[0].length],0)&&reach(r,c,h,new boolean[h.length][h[0].length],1))out.add(new int[]{r,c});return out;}
    private static boolean reach(int r,int c,int[][]h,boolean[][]s,int ocean){if(ocean==0&&(r==0||c==0)||ocean==1&&(r==h.length-1||c==h[0].length-1))return true;s[r][c]=true;int[][]d={{1,0},{-1,0},{0,1},{0,-1}};for(int[]z:d){int a=r+z[0],b=c+z[1];if(a>=0&&a<h.length&&b>=0&&b<h[0].length&&!s[a][b]&&h[a][b]<=h[r][c]&&reach(a,b,h,s,ocean))return true;}return false;}
}`,
    "O((RC)²)", "O(RC) per search",
    "Traverse backward from each ocean: move to equal-or-higher neighbors. The answer is the intersection of the two reachable sets.",
    `import java.util.*;
public class Solution {
    public static List<int[]> flow(int[][]h){int m=h.length,n=h[0].length;boolean[][]p=new boolean[m][n],a=new boolean[m][n];for(int r=0;r<m;r++){dfs(r,0,h,p);dfs(r,n-1,h,a);}for(int c=0;c<n;c++){dfs(0,c,h,p);dfs(m-1,c,h,a);}List<int[]>out=new ArrayList<>();for(int r=0;r<m;r++)for(int c=0;c<n;c++)if(p[r][c]&&a[r][c])out.add(new int[]{r,c});return out;}
    private static void dfs(int r,int c,int[][]h,boolean[][]s){if(s[r][c])return;s[r][c]=true;int[][]d={{1,0},{-1,0},{0,1},{0,-1}};for(int[]z:d){int x=r+z[0],y=c+z[1];if(x>=0&&x<h.length&&y>=0&&y<h[0].length&&h[x][y]>=h[r][c])dfs(x,y,h,s);}}
}`,
    "O(RC)", "O(RC) plus recursion"
  ),
  "word-ladder": makeContent(
    "Given beginWord, endWord, and a dictionary of equal-length lowercase words, return the number of words in a shortest transformation sequence where each step changes one letter. Return 0 if impossible; endWord must be in the dictionary.",
    'begin="hit", end="cog", words=["hot","dot","dog","lot","log","cog"] returns 5.',
    "Use BFS, comparing each dequeued word with every unused dictionary word to find one-letter neighbors.",
    `import java.util.*;
public class Solution {
    public static int ladder(String begin,String end,List<String>words){Set<String>left=new HashSet<>(words);if(!left.contains(end))return 0;Deque<String>q=new ArrayDeque<>();Map<String,Integer>d=new HashMap<>();q.add(begin);d.put(begin,1);while(!q.isEmpty()){String u=q.remove();if(u.equals(end))return d.get(u);for(String v:new ArrayList<>(left))if(diff(u,v)==1){left.remove(v);d.put(v,d.get(u)+1);q.add(v);}}return 0;}
    private static int diff(String a,String b){int x=0;for(int i=0;i<a.length();i++)if(a.charAt(i)!=b.charAt(i))x++;return x;}
}`,
    "O(W²L)", "O(WL)",
    "Generate all 25 one-letter substitutions at each position and BFS only into dictionary words not visited before.",
    `import java.util.*;
public class Solution {
    public static int ladder(String begin,String end,List<String>words){Set<String>dict=new HashSet<>(words);if(!dict.contains(end))return 0;Deque<String>q=new ArrayDeque<>();q.add(begin);Map<String,Integer>d=new HashMap<>();d.put(begin,1);while(!q.isEmpty()){String u=q.remove();if(u.equals(end))return d.get(u);char[]a=u.toCharArray();for(int i=0;i<a.length;i++){char old=a[i];for(char c='a';c<='z';c++)if(c!=old){a[i]=c;String v=new String(a);if(dict.remove(v)){d.put(v,d.get(u)+1);q.add(v);}}a[i]=old;}}return 0;}
}`,
    "O(26WL) expected with hash set", "O(WL)"
  ),
  "minimum-genetic-mutation": makeContent(
    "Genes are 8-character strings over A,C,G,T. Given start, end, and a bank of valid genes, return the fewest single-character mutations from start to end, or -1. The end must be in the bank unless start equals end.",
    'start="AACCGGTT", end="AAACGGTA", bank=["AACCGGTA","AACCGCTA","AAACGGTA"] returns 2.',
    "Use BFS and compare each current gene to every unused bank gene, accepting those differing in exactly one position.",
    `import java.util.*;
public class Solution {
    public static int minMutation(String start,String end,String[]bank){if(start.equals(end))return 0;Set<String>left=new HashSet<>(Arrays.asList(bank));if(!left.contains(end))return -1;Deque<String>q=new ArrayDeque<>();q.add(start);Map<String,Integer>d=new HashMap<>();d.put(start,0);while(!q.isEmpty()){String u=q.remove();for(String v:new ArrayList<>(left))if(diff(u,v)==1){if(v.equals(end))return d.get(u)+1;left.remove(v);d.put(v,d.get(u)+1);q.add(v);}}return -1;}
    private static int diff(String a,String b){int n=0;for(int i=0;i<a.length();i++)if(a.charAt(i)!=b.charAt(i))n++;return n;}
}`,
    "O(B²L)", "O(BL)",
    "From each gene, generate substitutions using the four valid bases at each position and BFS only through bank members.",
    `import java.util.*;
public class Solution {
    public static int minMutation(String start,String end,String[]bank){if(start.equals(end))return 0;Set<String>dict=new HashSet<>(Arrays.asList(bank));if(!dict.contains(end))return -1;char[]alphabet={'A','C','G','T'};Deque<String>q=new ArrayDeque<>();q.add(start);Map<String,Integer>d=new HashMap<>();d.put(start,0);while(!q.isEmpty()){String u=q.remove();char[]a=u.toCharArray();for(int i=0;i<a.length;i++){char old=a[i];for(char c:alphabet)if(c!=old){a[i]=c;String v=new String(a);if(dict.remove(v)){if(v.equals(end))return d.get(u)+1;d.put(v,d.get(u)+1);q.add(v);}}a[i]=old;}}return -1;}
}`,
    "O(4LB) expected", "O(BL)"
  ),
  "articulation-points": makeContent(
    "Given a connected or disconnected simple undirected graph on 0..n-1, return all articulation vertices in ascending order. Removing such a vertex increases the number of connected components.",
    "In edges [[0,1],[1,2],[1,3]], vertex 1 is an articulation point.",
    "For each vertex, remove it and count components among the remaining vertices; it is an articulation point if that count increases.",
    `import java.util.*;
public class Solution {
    public static List<Integer> articulation(int n,int[][]e){List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(x[1]);g.get(x[1]).add(x[0]);}int base=count(g,-1),original=base;List<Integer>out=new ArrayList<>();for(int v=0;v<n;v++)if(count(g,v)>original)out.add(v);return out;}
    private static int count(List<List<Integer>>g,int skip){boolean[]s=new boolean[g.size()];if(skip>=0)s[skip]=true;int c=0;for(int i=0;i<g.size();i++)if(!s[i]){c++;Deque<Integer>q=new ArrayDeque<>();q.add(i);s[i]=true;while(!q.isEmpty())for(int v:g.get(q.remove()))if(!s[v]){s[v]=true;q.add(v);}}return c;}
}`,
    "O(V(V + E))", "O(V + E)",
    "Tarjan's DFS computes discovery times and low-link values. A root needs at least two DFS children; a non-root is an articulation point if a child cannot reach an ancestor.",
    `import java.util.*;
public class Solution {
    private int time;
    public List<Integer> articulation(int n,int[][]e){List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(x[1]);g.get(x[1]).add(x[0]);}int[]disc=new int[n],low=new int[n];boolean[]cut=new boolean[n];time=0;for(int i=0;i<n;i++)if(disc[i]==0)dfs(i,-1,g,disc,low,cut);List<Integer>out=new ArrayList<>();for(int i=0;i<n;i++)if(cut[i])out.add(i);return out;}
    private void dfs(int u,int p,List<List<Integer>>g,int[]d,int[]l,boolean[]cut){d[u]=l[u]=++time;int children=0;for(int v:g.get(u)){if(v==p)continue;if(d[v]==0){children++;dfs(v,u,g,d,l,cut);l[u]=Math.min(l[u],l[v]);if(p!=-1&&l[v]>=d[u])cut[u]=true;}else l[u]=Math.min(l[u],d[v]);}if(p==-1&&children>1)cut[u]=true;}
}`,
    "O(V + E)", "O(V + E) plus recursion"
  )
};
