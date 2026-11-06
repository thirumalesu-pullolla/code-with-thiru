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

export const shortestPathsMstContent = {
  "implement-dijkstra": makeContent(
    "Given n vertices labeled 0..n-1, nonnegative directed weighted edges [from,to,weight], and a valid source, return distances; use Long.MAX_VALUE for unreachable vertices.",
    "n = 4, edges [[0,1,2],[0,2,5],[1,2,1]], source 0 gives [0,2,3,unreachable].",
    "Use the O(V²) array-based Dijkstra: repeatedly select the unused vertex with smallest tentative distance, then relax its outgoing edges. Nonnegative weights are required.",
    `public class Solution {
    public static long[] dijkstra(int n, int[][] edges, int source) {
        long inf=Long.MAX_VALUE/4; long[] d=new long[n]; boolean[] used=new boolean[n]; java.util.Arrays.fill(d,inf); d[source]=0;
        for(int k=0;k<n;k++){int u=-1;for(int i=0;i<n;i++)if(!used[i]&&(u<0||d[i]<d[u]))u=i;if(u<0||d[u]==inf)break;used[u]=true;
            for(int[] e:edges)if(e[0]==u&&d[e[1]]>d[u]+e[2])d[e[1]]=d[u]+e[2];}
        return d;
    }
}`,
    "O(V² + VE)", "O(V)",
    "Store outgoing adjacency lists and process the smallest tentative distance first in a min-priority queue. Ignore stale queue entries.",
    `import java.util.*;
public class Solution {
    public static long[] dijkstra(int n, int[][] edges, int source) {
        List<List<int[]>> g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[] e:edges)g.get(e[0]).add(new int[]{e[1],e[2]});
        long inf=Long.MAX_VALUE/4;long[] d=new long[n];Arrays.fill(d,inf);d[source]=0;PriorityQueue<long[]> q=new PriorityQueue<>(Comparator.comparingLong(a->a[0]));q.add(new long[]{0,source});
        while(!q.isEmpty()){long[] x=q.poll();long du=x[0];int u=(int)x[1];if(du!=d[u])continue;for(int[] e:g.get(u))if(d[e[0]]>du+e[1]){d[e[0]]=du+e[1];q.add(new long[]{d[e[0]],e[0]});}}
        return d;
    }
}`,
    "O((V + E) log V)", "O(V + E)"
  ),
  "implement-bellman-ford": makeContent(
    "Given n vertices, directed edges [from,to,weight] (weights may be negative), and a valid source, return shortest distances, using Long.MAX_VALUE for unreachable vertices. Return null if a negative cycle is reachable from source.",
    "Edges [[0,1,4],[0,2,5],[1,2,-2]] from 0 produce [0,4,2].",
    "Enumerate all simple paths from the source and retain the least cost to each vertex. This is exponential; paths need not repeat vertices because a shortest path without a negative cycle can be simple.",
    `import java.util.*;
public class Solution {
    public static long[] shortest(int n,int[][] edges,int source){
        List<List<int[]>> g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]e:edges)g.get(e[0]).add(new int[]{e[1],e[2]});
        long[] best=new long[n];Arrays.fill(best,Long.MAX_VALUE);best[source]=0;dfs(source,0,new boolean[n],g,best);
        for(int[]e:edges)if(best[e[0]]!=Long.MAX_VALUE&&best[e[1]]>best[e[0]]+e[2])return null;return best;
    }
    private static void dfs(int u,long cost,boolean[] used,List<List<int[]>>g,long[]best){if(cost<best[u])best[u]=cost;used[u]=true;for(int[]e:g.get(u))if(!used[e[0]])dfs(e[0],cost+e[1],used,g,best);used[u]=false;}
}`,
    "O(number of simple paths + VE) for the cycle check", "O(V + E) plus recursion",
    "Relax every edge up to V-1 rounds. A further reachable relaxation indicates a reachable negative cycle.",
    `import java.util.*;
public class Solution {
    public static long[] shortest(int n,int[][] edges,int source){
        long inf=Long.MAX_VALUE/4;long[]d=new long[n];Arrays.fill(d,inf);d[source]=0;
        for(int i=1;i<n;i++){boolean changed=false;for(int[]e:edges)if(d[e[0]]!=inf&&d[e[1]]>d[e[0]]+e[2]){d[e[1]]=d[e[0]]+e[2];changed=true;}if(!changed)break;}
        for(int[]e:edges)if(d[e[0]]!=inf&&d[e[1]]>d[e[0]]+e[2])return null;return d;
    }
}`,
    "O(VE)", "O(V)"
  ),
  "implement-floyd-warshall": makeContent(
    "Given n and directed weighted edges [from,to,weight], compute all-pairs shortest distances. Use Long.MAX_VALUE for unreachable pairs and return null if any negative cycle exists. Parallel edges use their minimum weight.",
    "With edges 0→1 of 3 and 1→2 of 4, distance 0→2 is 7.",
    "For every source, enumerate all simple paths to every destination and retain minimum costs; this direct enumeration is exponential.",
    `import java.util.*;
public class Solution {
    public static long[][] allPairs(int n,int[][] edges){
        List<List<int[]>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]e:edges)g.get(e[0]).add(new int[]{e[1],e[2]});
        long[][]d=new long[n][n];for(long[]r:d)Arrays.fill(r,Long.MAX_VALUE);for(int s=0;s<n;s++){d[s][s]=0;walk(s,s,0,new boolean[n],g,d);}
        long[]x=new long[n];for(int i=0;i<n;i++)for(int[]e:edges)if(x[e[0]]+e[2]<x[e[1]])x[e[1]]=x[e[0]]+e[2];for(int i=0;i<n;i++)for(int[]e:edges)if(x[e[0]]+e[2]<x[e[1]])return null;
        return d;
    }
    private static void walk(int s,int u,long c,boolean[]seen,List<List<int[]>>g,long[][]d){if(c<d[s][u])d[s][u]=c;seen[u]=true;for(int[]e:g.get(u))if(!seen[e[0]])walk(s,e[0],c+e[1],seen,g,d);seen[u]=false;}
}`,
    "O(V · number of simple paths + VE)", "O(V² + V + E) plus recursion",
    "Initialize a distance matrix from the edges and allow each vertex in turn as an intermediate point. A negative diagonal entry signals a negative cycle.",
    `import java.util.*;
public class Solution {
    public static long[][] allPairs(int n,int[][] edges){
        long inf=Long.MAX_VALUE/4;long[][]d=new long[n][n];for(int i=0;i<n;i++){Arrays.fill(d[i],inf);d[i][i]=0;}
        for(int[]e:edges)d[e[0]][e[1]]=Math.min(d[e[0]][e[1]],e[2]);
        for(int k=0;k<n;k++)for(int i=0;i<n;i++)if(d[i][k]!=inf)for(int j=0;j<n;j++)if(d[k][j]!=inf)d[i][j]=Math.min(d[i][j],d[i][k]+d[k][j]);
        for(int i=0;i<n;i++)if(d[i][i]<0)return null;return d;
    }
}`,
    "O(V³)", "O(V²)"
  ),
  "shortest-path-weighted-graph": makeContent(
    "Given n vertices, nonnegative undirected edges [u,v,w], source and destination, return a shortest path as vertex IDs (including both endpoints), or an empty list if unreachable.",
    "For edges [[0,1,2],[1,2,1],[0,2,8]], source 0 and destination 2 return [0,1,2].",
    "Enumerate all simple source-to-destination paths, retaining a path with the least total edge weight.",
    `import java.util.*;
public class Solution {
    public static List<Integer> path(int n,int[][]edges,int s,int t){List<List<int[]>>g=graph(n,edges);boolean[]used=new boolean[n];List<Integer>cur=new ArrayList<>(),best=new ArrayList<>();long[]cost={Long.MAX_VALUE};cur.add(s);dfs(s,t,0,g,used,cur,best,cost);return best;}
    private static List<List<int[]>> graph(int n,int[][]e){List<List<int[]>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(new int[]{x[1],x[2]});g.get(x[1]).add(new int[]{x[0],x[2]});}return g;}
    private static void dfs(int u,int t,long c,List<List<int[]>>g,boolean[]used,List<Integer>cur,List<Integer>best,long[]cost){if(u==t){if(c<cost[0]){cost[0]=c;best.clear();best.addAll(cur);}return;}used[u]=true;for(int[]e:g.get(u))if(!used[e[0]]){cur.add(e[0]);dfs(e[0],t,c+e[1],g,used,cur,best,cost);cur.remove(cur.size()-1);}used[u]=false;}
}`,
    "O(number of simple paths · V)", "O(V + E) plus recursion",
    "Run Dijkstra and remember each vertex's predecessor whenever its best distance improves. Reconstruct the path backward from the destination.",
    `import java.util.*;
public class Solution {
    public static List<Integer> path(int n,int[][]edges,int s,int t){
        List<List<int[]>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]e:edges){g.get(e[0]).add(new int[]{e[1],e[2]});g.get(e[1]).add(new int[]{e[0],e[2]});}
        long[]d=new long[n];Arrays.fill(d,Long.MAX_VALUE/4);d[s]=0;int[]prev=new int[n];Arrays.fill(prev,-1);PriorityQueue<long[]>q=new PriorityQueue<>(Comparator.comparingLong(a->a[0]));q.add(new long[]{0,s});
        while(!q.isEmpty()){long[]x=q.poll();int u=(int)x[1];if(x[0]!=d[u])continue;for(int[]e:g.get(u))if(d[e[0]]>d[u]+e[1]){d[e[0]]=d[u]+e[1];prev[e[0]]=u;q.add(new long[]{d[e[0]],e[0]});}}
        List<Integer>out=new ArrayList<>();if(d[t]>=Long.MAX_VALUE/8)return out;for(int x=t;x!=-1;x=prev[x])out.add(x);Collections.reverse(out);return out;
    }
}`,
    "O((V + E) log V)", "O(V + E)"
  ),
  "cheapest-flight-k-stops": makeContent(
    "Given n cities, directed flights [from,to,price], source, destination, and k, return the cheapest price using at most k intermediate stops, or -1. Prices are nonnegative.",
    "Flights [[0,1,100],[1,2,100],[0,2,500]], k=1 from 0 to 2 costs 200.",
    "Enumerate all flight sequences of at most k+1 edges and choose the least cost that reaches the destination.",
    `import java.util.*;
public class Solution {
    public static int cheapest(int n,int[][]f,int s,int t,int k){List<List<int[]>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]e:f)g.get(e[0]).add(new int[]{e[1],e[2]});long[]best={Long.MAX_VALUE};dfs(s,t,k+1,0,g,best);return best[0]==Long.MAX_VALUE?-1:(int)best[0];}
    private static void dfs(int u,int t,int left,long cost,List<List<int[]>>g,long[]best){if(u==t){best[0]=Math.min(best[0],cost);return;}if(left==0||cost>=best[0])return;for(int[]e:g.get(u))dfs(e[0],t,left-1,cost+e[1],g,best);}
}`,
    "O(b^(k+1)) for maximum branching factor b", "O(V + E + k) recursion",
    "Use a bounded Bellman-Ford dynamic program: each round extends paths by at most one more flight, reading only the previous round's distances.",
    `import java.util.*;
public class Solution {
    public static int cheapest(int n,int[][]f,int s,int t,int k){long inf=Long.MAX_VALUE/4;long[]d=new long[n];Arrays.fill(d,inf);d[s]=0;
        for(int i=0;i<=k;i++){long[]next=d.clone();for(int[]e:f)if(d[e[0]]!=inf)next[e[1]]=Math.min(next[e[1]],d[e[0]]+e[2]);d=next;}
        return d[t]==inf?-1:(int)d[t];
    }
}`,
    "O((k + 1)E)", "O(V)"
  ),
  "network-delay-time": makeContent(
    "Nodes are labeled 1..n and directed travel-time edges are [from,to,time], with nonnegative times. Return the earliest time for a signal from source k to reach all nodes, or -1 if any is unreachable.",
    "For n=4, k=2, edges [[2,1,1],[2,3,1],[3,4,1]], return 2.",
    "Use array-based Dijkstra to repeatedly settle the closest unvisited node and relax its outgoing edges.",
    `import java.util.*;
public class Solution {
    public static int delay(int[][]edges,int n,int k){long inf=Long.MAX_VALUE/4;long[]d=new long[n+1];boolean[]used=new boolean[n+1];Arrays.fill(d,inf);d[k]=0;
        for(int z=1;z<=n;z++){int u=-1;for(int i=1;i<=n;i++)if(!used[i]&&(u<0||d[i]<d[u]))u=i;if(u<0||d[u]==inf)break;used[u]=true;for(int[]e:edges)if(e[0]==u)d[e[1]]=Math.min(d[e[1]],d[u]+e[2]);}
        long ans=0;for(int i=1;i<=n;i++){if(d[i]==inf)return -1;ans=Math.max(ans,d[i]);}return (int)ans;
    }
}`,
    "O(V² + VE)", "O(V)",
    "Use adjacency lists and a min-priority queue for Dijkstra, then take the maximum shortest distance.",
    `import java.util.*;
public class Solution {
    public static int delay(int[][]edges,int n,int k){List<List<int[]>>g=new ArrayList<>();for(int i=0;i<=n;i++)g.add(new ArrayList<>());for(int[]e:edges)g.get(e[0]).add(new int[]{e[1],e[2]});
        long[]d=new long[n+1];Arrays.fill(d,Long.MAX_VALUE/4);d[k]=0;PriorityQueue<long[]>q=new PriorityQueue<>(Comparator.comparingLong(a->a[0]));q.add(new long[]{0,k});
        while(!q.isEmpty()){long[]x=q.poll();int u=(int)x[1];if(x[0]!=d[u])continue;for(int[]e:g.get(u))if(d[e[0]]>x[0]+e[1]){d[e[0]]=x[0]+e[1];q.add(new long[]{d[e[0]],e[0]});}}
        long ans=0;for(int i=1;i<=n;i++){if(d[i]>=Long.MAX_VALUE/8)return -1;ans=Math.max(ans,d[i]);}return (int)ans;
    }
}`,
    "O((V + E) log V)", "O(V + E)"
  ),
  "shortest-path-binary-matrix": makeContent(
    "For a square grid of 0 (open) and 1 (blocked), return the shortest number of cells in an 8-direction path from top-left to bottom-right, including both endpoints, or -1.",
    "For [[0,1],[1,0]], return 2.",
    "Enumerate simple clear paths with DFS, pruning paths no shorter than the best found.",
    `public class Solution {
    public static int shortest(int[][]g){int n=g.length;if(n==0||g[0][0]!=0||g[n-1][n-1]!=0)return -1;int[]best={Integer.MAX_VALUE};boolean[][]seen=new boolean[n][n];dfs(g,0,0,1,seen,best);return best[0]==Integer.MAX_VALUE?-1:best[0];}
    private static void dfs(int[][]g,int r,int c,int len,boolean[][]s,int[]best){int n=g.length;if(len>=best[0])return;if(r==n-1&&c==n-1){best[0]=len;return;}s[r][c]=true;for(int a=r-1;a<=r+1;a++)for(int b=c-1;b<=c+1;b++)if(a>=0&&a<n&&b>=0&&b<n&&g[a][b]==0&&!s[a][b])dfs(g,a,b,len+1,s,best);s[r][c]=false;}
}`,
    "O(number of simple clear paths)", "O(n²) plus recursion",
    "Breadth-first search visits cells in nondecreasing path length. Mark cells when enqueued to prevent duplicate work.",
    `import java.util.*;
public class Solution {
    public static int shortest(int[][]g){int n=g.length;if(n==0||g[0][0]!=0||g[n-1][n-1]!=0)return -1;int[][]d=new int[n][n];int[][]dirs={{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};Deque<int[]>q=new ArrayDeque<>();q.add(new int[]{0,0});d[0][0]=1;
        while(!q.isEmpty()){int[]x=q.remove();if(x[0]==n-1&&x[1]==n-1)return d[x[0]][x[1]];for(int[]z:dirs){int r=x[0]+z[0],c=x[1]+z[1];if(r>=0&&r<n&&c>=0&&c<n&&g[r][c]==0&&d[r][c]==0){d[r][c]=d[x[0]][x[1]]+1;q.add(new int[]{r,c});}}}return -1;
    }
}`,
    "O(n²)", "O(n²)"
  ),
  "minimum-effort-path-grid": makeContent(
    "For a nonempty integer height grid, find a top-left to bottom-right path minimizing the largest absolute height difference between consecutive cells.",
    "For [[1,2,2],[3,8,2],[5,3,5]], return 2.",
    "Enumerate simple paths, tracking each path's maximum edge difference, and retain the path with minimum such maximum.",
    `public class Solution {
    public static int effort(int[][]h){int[]best={Integer.MAX_VALUE};boolean[][]seen=new boolean[h.length][h[0].length];dfs(h,0,0,0,seen,best);return best[0];}
    private static void dfs(int[][]h,int r,int c,int e,boolean[][]s,int[]best){if(e>=best[0])return;if(r==h.length-1&&c==h[0].length-1){best[0]=e;return;}s[r][c]=true;int[][]d={{1,0},{-1,0},{0,1},{0,-1}};for(int[]z:d){int a=r+z[0],b=c+z[1];if(a>=0&&a<h.length&&b>=0&&b<h[0].length&&!s[a][b])dfs(h,a,b,Math.max(e,Math.abs(h[r][c]-h[a][b])),s,best);}s[r][c]=false;}
}`,
    "O(number of simple grid paths)", "O(RC) plus recursion",
    "Dijkstra's relaxation combines the current effort with an edge as max(current, edge difference); the smallest tentative effort is settled first.",
    `import java.util.*;
public class Solution {
    public static int effort(int[][]h){int m=h.length,n=h[0].length;int[][]d=new int[m][n];for(int[]r:d)Arrays.fill(r,Integer.MAX_VALUE);d[0][0]=0;PriorityQueue<int[]>q=new PriorityQueue<>(Comparator.comparingInt(a->a[0]));q.add(new int[]{0,0,0});int[][]dirs={{1,0},{-1,0},{0,1},{0,-1}};
        while(!q.isEmpty()){int[]x=q.poll();int e=x[0],r=x[1],c=x[2];if(e!=d[r][c])continue;if(r==m-1&&c==n-1)return e;for(int[]z:dirs){int a=r+z[0],b=c+z[1];if(a>=0&&a<m&&b>=0&&b<n){int ne=Math.max(e,Math.abs(h[r][c]-h[a][b]));if(ne<d[a][b]){d[a][b]=ne;q.add(new int[]{ne,a,b});}}}}return -1;
    }
}`,
    "O(RC log(RC))", "O(RC)"
  ),
  "implement-prims-mst": makeContent(
    "Given a connected weighted undirected graph with vertices 0..n-1 and edges [u,v,w], return the total weight of a minimum spanning tree.",
    "For n=3 and edges [[0,1,1],[1,2,2],[0,2,5]], return 3.",
    "Sort edges and use DSU to accept an edge only when it joins two components (the Kruskal construction is a simple baseline MST algorithm).",
    `import java.util.*;
public class Solution {
    public static long mst(int n,int[][]edges){int[][]e=edges.clone();Arrays.sort(e,Comparator.comparingInt(a->a[2]));int[]p=new int[n];for(int i=0;i<n;i++)p[i]=i;long sum=0;int used=0;for(int[]x:e){int a=find(p,x[0]),b=find(p,x[1]);if(a!=b){p[a]=b;sum+=x[2];if(++used==n-1)break;}}return used==n-1?sum:-1;}
    private static int find(int[]p,int x){if(p[x]!=x)p[x]=find(p,p[x]);return p[x];}
}`,
    "O(E log E + E alpha(V))", "O(V + E)",
    "Prim grows one tree. A min-priority queue chooses the cheapest edge leaving the already visited vertices.",
    `import java.util.*;
public class Solution {
    public static long mst(int n,int[][]edges){List<List<int[]>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]e:edges){g.get(e[0]).add(new int[]{e[1],e[2]});g.get(e[1]).add(new int[]{e[0],e[2]});}
        boolean[]seen=new boolean[n];PriorityQueue<int[]>q=new PriorityQueue<>(Comparator.comparingInt(a->a[1]));q.add(new int[]{0,0});long sum=0;int count=0;while(!q.isEmpty()){int[]x=q.poll();if(seen[x[0]])continue;seen[x[0]]=true;sum+=x[1];count++;for(int[]e:g.get(x[0]))if(!seen[e[0]])q.add(new int[]{e[0],e[1]});}return count==n?sum:-1;
    }
}`,
    "O((V + E) log V)", "O(V + E)"
  ),
  "implement-kruskals-mst": makeContent(
    "Given a connected weighted undirected graph with vertices 0..n-1 and edges [u,v,w], return a minimum spanning tree edge list. Return an empty list if disconnected.",
    "For edges [[0,1,1],[1,2,2],[0,2,5]], return the first two edges.",
    "Grow a tree from vertex 0 by repeatedly scanning all edges for the cheapest one crossing from visited to unvisited.",
    `import java.util.*;
public class Solution {
    public static List<int[]> mst(int n,int[][]e){boolean[]v=new boolean[n];v[0]=true;List<int[]>out=new ArrayList<>();while(out.size()<n-1){int[]best=null;for(int[]x:e)if(v[x[0]]!=v[x[1]]&&(best==null||x[2]<best[2]))best=x;if(best==null)return new ArrayList<>();out.add(best);v[best[0]]=true;v[best[1]]=true;}return out;}
}`,
    "O(VE)", "O(V) excluding output",
    "Sort edges by weight and accept an edge exactly when DSU says it joins two distinct components; stop after V-1 accepted edges.",
    `import java.util.*;
public class Solution {
    public static List<int[]> mst(int n,int[][]edges){int[][]e=edges.clone();Arrays.sort(e,Comparator.comparingInt(a->a[2]));int[]p=new int[n];for(int i=0;i<n;i++)p[i]=i;List<int[]>out=new ArrayList<>();for(int[]x:e){int a=find(p,x[0]),b=find(p,x[1]);if(a!=b){p[a]=b;out.add(x);if(out.size()==n-1)break;}}return out.size()==n-1?out:new ArrayList<>();}
    private static int find(int[]p,int x){if(p[x]!=x)p[x]=find(p,p[x]);return p[x];}
}`,
    "O(E log E + E alpha(V))", "O(V + E)"
  ),
  "minimum-cost-connect-cities": makeContent(
    "Cities are labeled 1..n; connections are undirected [cityA,cityB,cost]. Return the minimum cost to connect every city, or -1 if impossible.",
    "n=3, connections [[1,2,5],[1,3,6],[2,3,1]] returns 6.",
    "Run Prim's algorithm with a linear scan for the cheapest crossing edge at every step.",
    `public class Solution {
    public static long minCost(int n,int[][]e){boolean[]seen=new boolean[n];int[]key=new int[n];java.util.Arrays.fill(key,Integer.MAX_VALUE);key[0]=0;long sum=0;for(int k=0;k<n;k++){int u=-1;for(int i=0;i<n;i++)if(!seen[i]&&(u<0||key[i]<key[u]))u=i;if(u<0||key[u]==Integer.MAX_VALUE)return -1;seen[u]=true;sum+=key[u];for(int[]x:e){int a=x[0]-1,b=x[1]-1;if(a==u&&!seen[b])key[b]=Math.min(key[b],x[2]);if(b==u&&!seen[a])key[a]=Math.min(key[a],x[2]);}}return sum;}
}`,
    "O(V² + VE)", "O(V)",
    "Sort all connections and use DSU to accept the cheapest edges that merge components.",
    `import java.util.*;
public class Solution {
    public static long minCost(int n,int[][]e){int[][]a=e.clone();Arrays.sort(a,Comparator.comparingInt(x->x[2]));int[]p=new int[n];for(int i=0;i<n;i++)p[i]=i;long sum=0;int used=0;for(int[]x:a){int u=find(p,x[0]-1),v=find(p,x[1]-1);if(u!=v){p[u]=v;sum+=x[2];used++;}}return used==n-1?sum:-1;}
    private static int find(int[]p,int x){if(p[x]!=x)p[x]=find(p,p[x]);return p[x];}
}`,
    "O(E log E + E alpha(V))", "O(V + E)"
  ),
  "count-shortest-paths-destination": makeContent(
    "Given an undirected graph with positive weights and vertices 0..n-1, count distinct shortest paths from 0 to n-1 modulo 1,000,000,007. Parallel edges count as distinct choices.",
    "For two equal-cost routes from 0 to 3, return 2.",
    "Enumerate all simple paths from source to destination, finding their minimum distance and the number attaining it.",
    `import java.util.*;
public class Solution {
    static long best;static int ways;
    public static int count(int n,int[][]e){List<List<int[]>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(new int[]{x[1],x[2]});g.get(x[1]).add(new int[]{x[0],x[2]});}best=Long.MAX_VALUE;ways=0;dfs(0,n-1,0,new boolean[n],g);return ways;}
    private static void dfs(int u,int t,long d,boolean[]s,List<List<int[]>>g){if(d>best)return;if(u==t){if(d<best){best=d;ways=1;}else if(d==best)ways=(ways+1)%1000000007;return;}s[u]=true;for(int[]x:g.get(u))if(!s[x[0]])dfs(x[0],t,d+x[1],s,g);s[u]=false;}
}`,
    "O(number of simple paths)", "O(V + E) plus recursion",
    "Dijkstra tracks both the shortest distance and the count of ways to attain it. A shorter route replaces the count; an equal route adds to it.",
    `import java.util.*;
public class Solution {
    public static int count(int n,int[][]e){long mod=1000000007L;List<List<int[]>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(new int[]{x[1],x[2]});g.get(x[1]).add(new int[]{x[0],x[2]});}
        long[]d=new long[n],ways=new long[n];Arrays.fill(d,Long.MAX_VALUE/4);d[0]=0;ways[0]=1;PriorityQueue<long[]>q=new PriorityQueue<>(Comparator.comparingLong(a->a[0]));q.add(new long[]{0,0});
        while(!q.isEmpty()){long[]z=q.poll();long du=z[0];int u=(int)z[1];if(du!=d[u])continue;for(int[]x:g.get(u)){long nd=du+x[1];if(nd<d[x[0]]){d[x[0]]=nd;ways[x[0]]=ways[u];q.add(new long[]{nd,x[0]});}else if(nd==d[x[0]])ways[x[0]]=(ways[x[0]]+ways[u])%mod;}}
        return (int)ways[n-1];
    }
}`,
    "O((V + E) log V)", "O(V + E)"
  ),
  "min-cost-connect-points-plane": makeContent(
    "Given integer points [x,y], connect all points with edges whose costs are Manhattan distances. Return the minimum total cost.",
    "Points [[0,0],[2,2],[3,10],[5,2],[7,0]] have minimum cost 20.",
    "Construct every pairwise Manhattan-distance edge, sort them, and use DSU-based Kruskal.",
    `import java.util.*;
public class Solution {
    public static long minCost(int[][]p){int n=p.length;List<int[]>e=new ArrayList<>();for(int i=0;i<n;i++)for(int j=i+1;j<n;j++)e.add(new int[]{i,j,Math.abs(p[i][0]-p[j][0])+Math.abs(p[i][1]-p[j][1])});e.sort(Comparator.comparingInt(a->a[2]));int[]par=new int[n];for(int i=0;i<n;i++)par[i]=i;long sum=0;int used=0;for(int[]x:e){int a=find(par,x[0]),b=find(par,x[1]);if(a!=b){par[a]=b;sum+=x[2];if(++used==n-1)break;}}return sum;}
    private static int find(int[]p,int x){if(p[x]!=x)p[x]=find(p,p[x]);return p[x];}
}`,
    "O(n² log n)", "O(n²)",
    "Use Prim directly on the implicit complete graph: maintain each unselected point's cheapest connection to the selected set; calculate distances as needed.",
    `public class Solution {
    public static long minCost(int[][]p){int n=p.length;if(n==0)return 0;boolean[]used=new boolean[n];int[]d=new int[n];java.util.Arrays.fill(d,Integer.MAX_VALUE);d[0]=0;long sum=0;for(int k=0;k<n;k++){int u=-1;for(int i=0;i<n;i++)if(!used[i]&&(u<0||d[i]<d[u]))u=i;used[u]=true;sum+=d[u];for(int v=0;v<n;v++)if(!used[v])d[v]=Math.min(d[v],Math.abs(p[u][0]-p[v][0])+Math.abs(p[u][1]-p[v][1]));}return sum;}
}`,
    "O(n²)", "O(n)"
  ),
  "shortest-path-dag": makeContent(
    "Given a weighted directed acyclic graph on 0..n-1, edge list [u,v,w] (weights may be negative), and source, return shortest distances. Use Long.MAX_VALUE for unreachable nodes.",
    "For edges [[0,1,2],[0,2,4],[1,2,-1]], source 0 gives [0,2,1].",
    "Apply Bellman-Ford relaxation for at most V-1 passes. This works even without using the DAG property.",
    `import java.util.*;
public class Solution {
    public static long[] shortest(int n,int[][]e,int s){long inf=Long.MAX_VALUE/4;long[]d=new long[n];Arrays.fill(d,inf);d[s]=0;for(int i=1;i<n;i++){boolean change=false;for(int[]x:e)if(d[x[0]]!=inf&&d[x[1]]>d[x[0]]+x[2]){d[x[1]]=d[x[0]]+x[2];change=true;}if(!change)break;}return d;}
}`,
    "O(VE)", "O(V)",
    "Topologically order vertices and relax every outgoing edge once as each vertex is processed; negative weights are safe in a DAG.",
    `import java.util.*;
public class Solution {
    public static long[] shortest(int n,int[][]e,int s){List<List<int[]>>g=new ArrayList<>();int[]in=new int[n];for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(new int[]{x[1],x[2]});in[x[1]]++;}
        Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<n;i++)if(in[i]==0)q.add(i);long inf=Long.MAX_VALUE/4;long[]d=new long[n];Arrays.fill(d,inf);d[s]=0;
        while(!q.isEmpty()){int u=q.remove();for(int[]x:g.get(u)){if(d[u]!=inf)d[x[0]]=Math.min(d[x[0]],d[u]+x[1]);if(--in[x[0]]==0)q.add(x[0]);}}return d;
    }
}`,
    "O(V + E)", "O(V + E)"
  ),
  "minimize-maximum-edge-path": makeContent(
    "Given a weighted undirected graph, source, and destination, return the minimum possible value of the largest edge on a connecting path, or -1 if no path exists.",
    "For edges [[0,1,5],[1,2,2],[0,2,8]], source 0 and destination 2 return 5.",
    "Enumerate simple paths and select the one whose maximum edge weight is smallest.",
    `import java.util.*;
public class Solution {
    public static int minimumMaximum(int n,int[][]e,int s,int t){List<List<int[]>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(new int[]{x[1],x[2]});g.get(x[1]).add(new int[]{x[0],x[2]});}int[]best={Integer.MAX_VALUE};dfs(s,t,0,new boolean[n],g,best);return best[0]==Integer.MAX_VALUE?-1:best[0];}
    private static void dfs(int u,int t,int m,boolean[]s,List<List<int[]>>g,int[]best){if(u==t){best[0]=Math.min(best[0],m);return;}s[u]=true;for(int[]x:g.get(u))if(!s[x[0]]&&Math.max(m,x[1])<best[0])dfs(x[0],t,Math.max(m,x[1]),s,g,best);s[u]=false;}
}`,
    "O(number of simple paths)", "O(V + E) plus recursion",
    "Use a minimax variant of Dijkstra: path extension cost is max(current cost, edge weight), and settle the smallest such value first.",
    `import java.util.*;
public class Solution {
    public static int minimumMaximum(int n,int[][]e,int s,int t){List<List<int[]>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(new int[]{x[1],x[2]});g.get(x[1]).add(new int[]{x[0],x[2]});}int[]d=new int[n];Arrays.fill(d,Integer.MAX_VALUE);d[s]=0;PriorityQueue<int[]>q=new PriorityQueue<>(Comparator.comparingInt(a->a[0]));q.add(new int[]{0,s});
        while(!q.isEmpty()){int[]x=q.poll();if(x[0]!=d[x[1]])continue;if(x[1]==t)return x[0];for(int[]a:g.get(x[1])){int nd=Math.max(x[0],a[1]);if(nd<d[a[0]]){d[a[0]]=nd;q.add(new int[]{nd,a[0]});}}}return -1;
    }
}`,
    "O((V + E) log V)", "O(V + E)"
  )
};
