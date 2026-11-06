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

export const topologicalSortContent = {
  "kahns-topological-sort": makeContent(
    "Given a directed graph on vertices 0..n-1 and edges [from,to], return a topological ordering, or an empty list if there is a cycle. Any valid ordering is accepted.",
    "Edges [[0,2],[1,2]] can produce [0,1,2].",
    "Try every vertex permutation and return the first where each edge's source precedes its destination.",
    `import java.util.*;
public class Solution {
    public static List<Integer> sort(int n,int[][]e){List<Integer>p=new ArrayList<>();boolean[]used=new boolean[n];return search(n,e,p,used)?p:new ArrayList<>();}
    private static boolean search(int n,int[][]e,List<Integer>p,boolean[]u){if(p.size()==n){int[]pos=new int[n];for(int i=0;i<n;i++)pos[p.get(i)]=i;for(int[]x:e)if(pos[x[0]]>=pos[x[1]])return false;return true;}for(int v=0;v<n;v++)if(!u[v]){u[v]=true;p.add(v);if(search(n,e,p,u))return true;p.remove(p.size()-1);u[v]=false;}return false;}
}`,
    "O(V! (V + E))", "O(V)",
    "Kahn's algorithm repeatedly removes a zero-indegree vertex. If fewer than V vertices are removed, the graph has a cycle.",
    `import java.util.*;
public class Solution {
    public static List<Integer> sort(int n,int[][]e){List<List<Integer>>g=new ArrayList<>();int[]in=new int[n];for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(x[1]);in[x[1]]++;}
        Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<n;i++)if(in[i]==0)q.add(i);List<Integer>out=new ArrayList<>();while(!q.isEmpty()){int u=q.remove();out.add(u);for(int v:g.get(u))if(--in[v]==0)q.add(v);}return out.size()==n?out:new ArrayList<>();
    }
}`,
    "O(V + E)", "O(V + E)"
  ),
  "dfs-topological-sort": makeContent(
    "Given a directed graph on vertices 0..n-1 and edges [from,to], return a topological ordering or an empty list if a cycle exists.",
    "Edges [[0,1],[0,2],[1,3],[2,3]] have an order such as [0,2,1,3].",
    "Test permutations and accept one that places every edge's source before its destination.",
    `import java.util.*;
public class Solution {
    public static List<Integer> sort(int n,int[][]e){List<Integer>p=new ArrayList<>();return go(n,e,p,new boolean[n])?p:new ArrayList<>();}
    private static boolean go(int n,int[][]e,List<Integer>p,boolean[]u){if(p.size()==n){int[]pos=new int[n];for(int i=0;i<n;i++)pos[p.get(i)]=i;for(int[]x:e)if(pos[x[0]]>=pos[x[1]])return false;return true;}for(int v=0;v<n;v++)if(!u[v]){u[v]=true;p.add(v);if(go(n,e,p,u))return true;p.remove(p.size()-1);u[v]=false;}return false;}
}`,
    "O(V! (V + E))", "O(V)",
    "DFS each vertex with three states: unvisited, active, finished. An edge to an active vertex is a cycle; append finished vertices and reverse the list.",
    `import java.util.*;
public class Solution {
    public static List<Integer> sort(int n,int[][]e){List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e)g.get(x[0]).add(x[1]);int[]state=new int[n];List<Integer>out=new ArrayList<>();for(int i=0;i<n;i++)if(state[i]==0&&!dfs(i,g,state,out))return new ArrayList<>();Collections.reverse(out);return out;}
    private static boolean dfs(int u,List<List<Integer>>g,int[]s,List<Integer>o){s[u]=1;for(int v:g.get(u)){if(s[v]==1)return false;if(s[v]==0&&!dfs(v,g,s,o))return false;}s[u]=2;o.add(u);return true;}
}`,
    "O(V + E)", "O(V + E) plus recursion"
  ),
  "course-schedule": makeContent(
    "There are numCourses courses labeled 0..numCourses-1 and prerequisite pairs [course, prerequisite]. Return whether all courses can be completed.",
    "numCourses=2, prerequisites [[1,0]] returns true; [[1,0],[0,1]] returns false.",
    "Use DFS with active-stack detection on prerequisite edges; a back edge means a circular dependency.",
    `import java.util.*;
public class Solution {
    public static boolean canFinish(int n,int[][]pre){List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:pre)g.get(x[1]).add(x[0]);int[]s=new int[n];for(int i=0;i<n;i++)if(s[i]==0&&!dfs(i,g,s))return false;return true;}
    private static boolean dfs(int u,List<List<Integer>>g,int[]s){s[u]=1;for(int v:g.get(u)){if(s[v]==1||s[v]==0&&!dfs(v,g,s))return false;}s[u]=2;return true;}
}`,
    "O(V + E)", "O(V + E) plus recursion",
    "Use indegrees and Kahn's queue. Completion is possible exactly when all courses are removed.",
    `import java.util.*;
public class Solution {
    public static boolean canFinish(int n,int[][]pre){List<List<Integer>>g=new ArrayList<>();int[]in=new int[n];for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:pre){g.get(x[1]).add(x[0]);in[x[0]]++;}Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<n;i++)if(in[i]==0)q.add(i);int done=0;while(!q.isEmpty()){int u=q.remove();done++;for(int v:g.get(u))if(--in[v]==0)q.add(v);}return done==n;}
}`,
    "O(V + E)", "O(V + E)"
  ),
  "course-schedule-ii": makeContent(
    "Given numCourses and pairs [course, prerequisite], return any valid course order, or an empty array if impossible.",
    "numCourses=2, prerequisites [[1,0]] returns [0,1].",
    "Enumerate all course permutations and test whether each prerequisite occurs before its course.",
    `public class Solution {
    public static int[] order(int n,int[][]pre){int[]p=new int[n];boolean[]u=new boolean[n];return go(0,n,pre,p,u)?p:new int[0];}
    private static boolean go(int k,int n,int[][]e,int[]p,boolean[]u){if(k==n){int[]pos=new int[n];for(int i=0;i<n;i++)pos[p[i]]=i;for(int[]x:e)if(pos[x[1]]>=pos[x[0]])return false;return true;}for(int v=0;v<n;v++)if(!u[v]){u[v]=true;p[k]=v;if(go(k+1,n,e,p,u))return true;u[v]=false;}return false;}
}`,
    "O(V! (V + E))", "O(V)",
    "Use Kahn's algorithm; return its order only if it includes every course.",
    `import java.util.*;
public class Solution {
    public static int[] order(int n,int[][]pre){List<List<Integer>>g=new ArrayList<>();int[]in=new int[n];for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:pre){g.get(x[1]).add(x[0]);in[x[0]]++;}Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<n;i++)if(in[i]==0)q.add(i);int[]o=new int[n];int k=0;while(!q.isEmpty()){int u=q.remove();o[k++]=u;for(int v:g.get(u))if(--in[v]==0)q.add(v);}return k==n?o:new int[0];}
}`,
    "O(V + E)", "O(V + E)"
  ),
  "tasks-completion-dependencies": makeContent(
    "Tasks are numbered 0..n-1. Each dependency [a,b] means task a must finish before b. Return whether all tasks can be completed.",
    "n=3, dependencies [[0,1],[1,2]] returns true; adding [2,0] makes it false.",
    "Run recursive DFS with active-state cycle detection; any directed cycle makes the dependencies impossible.",
    `import java.util.*;
public class Solution {
    public static boolean possible(int n,int[][]e){List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e)g.get(x[0]).add(x[1]);int[]s=new int[n];for(int i=0;i<n;i++)if(s[i]==0&&!dfs(i,g,s))return false;return true;}
    private static boolean dfs(int u,List<List<Integer>>g,int[]s){s[u]=1;for(int v:g.get(u)){if(s[v]==1||s[v]==0&&!dfs(v,g,s))return false;}s[u]=2;return true;}
}`,
    "O(V + E)", "O(V + E) plus recursion",
    "Count incoming dependencies and repeatedly execute zero-indegree tasks. All are completable exactly if all n are processed.",
    `import java.util.*;
public class Solution {
    public static boolean possible(int n,int[][]e){List<List<Integer>>g=new ArrayList<>();int[]in=new int[n];for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(x[1]);in[x[1]]++;}Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<n;i++)if(in[i]==0)q.add(i);int done=0;while(!q.isEmpty()){int u=q.remove();done++;for(int v:g.get(u))if(--in[v]==0)q.add(v);}return done==n;}
}`,
    "O(V + E)", "O(V + E)"
  ),
  "minimum-semesters-courses": makeContent(
    "Courses are labeled 0..n-1; each pair [course, prerequisite] means prerequisite first. Any number of available courses can be taken simultaneously. Return the minimum semesters, or -1 if a cycle exists.",
    "n=4, prerequisites [[1,0],[2,0],[3,1],[3,2]] requires 3 semesters.",
    "Use recursive DFS to detect cycles and compute each course's longest prerequisite-chain depth; the maximum depth is the semester count.",
    `import java.util.*;
public class Solution {
    public static int semesters(int n,int[][]p){List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]e:p)g.get(e[1]).add(e[0]);int[]s=new int[n],memo=new int[n];int ans=0;for(int i=0;i<n;i++){int x=depth(i,g,s,memo);if(x<0)return -1;ans=Math.max(ans,x);}return ans;}
    private static int depth(int u,List<List<Integer>>g,int[]s,int[]m){if(s[u]==1)return -1;if(s[u]==2)return m[u];s[u]=1;int d=1;for(int v:g.get(u)){int x=depth(v,g,s,m);if(x<0)return -1;d=Math.max(d,x+1);}s[u]=2;return m[u]=d;}
}`,
    "O(V + E)", "O(V + E) plus recursion",
    "Process a whole Kahn frontier per semester. If any course remains after the queue empties, a cycle exists.",
    `import java.util.*;
public class Solution {
    public static int semesters(int n,int[][]p){List<List<Integer>>g=new ArrayList<>();int[]in=new int[n];for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]e:p){g.get(e[1]).add(e[0]);in[e[0]]++;}Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<n;i++)if(in[i]==0)q.add(i);int done=0,term=0;while(!q.isEmpty()){int size=q.size();term++;while(size-->0){int u=q.remove();done++;for(int v:g.get(u))if(--in[v]==0)q.add(v);}}return done==n?term:-1;}
}`,
    "O(V + E)", "O(V + E)"
  ),
  "eventual-safe-states": makeContent(
    "Given a directed graph as adjacency lists, return all vertices for which every possible walk eventually ends at a terminal vertex, in ascending order.",
    "For graph [[1,2],[2,3],[5],[0],[5],[],[]], return [2,4,5,6].",
    "For each start vertex, search all reachable paths. A repeated vertex on the current path means a cycle and therefore the start is unsafe.",
    `import java.util.*;
public class Solution {
    public static List<Integer> safe(int[][]g){List<Integer>out=new ArrayList<>();for(int i=0;i<g.length;i++)if(check(i,g,new boolean[g.length],new boolean[g.length]))out.add(i);return out;}
    private static boolean check(int u,int[][]g,boolean[]path,boolean[]done){if(done[u])return true;if(path[u])return false;path[u]=true;for(int v:g[u])if(!check(v,g,path,done)){path[u]=false;return false;}path[u]=false;done[u]=true;return true;}
}`,
    "O(V(V + E)) worst case", "O(V) per search",
    "Reverse all edges and start from terminal vertices (outdegree zero). Repeatedly remove vertices whose outgoing neighbors are all known safe.",
    `import java.util.*;
public class Solution {
    public static List<Integer> safe(int[][]g){int n=g.length;List<List<Integer>>rev=new ArrayList<>();int[]out=new int[n];for(int i=0;i<n;i++)rev.add(new ArrayList<>());for(int u=0;u<n;u++){out[u]=g[u].length;for(int v:g[u])rev.get(v).add(u);}Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<n;i++)if(out[i]==0)q.add(i);boolean[]ok=new boolean[n];while(!q.isEmpty()){int v=q.remove();ok[v]=true;for(int u:rev.get(v))if(--out[u]==0)q.add(u);}List<Integer>a=new ArrayList<>();for(int i=0;i<n;i++)if(ok[i])a.add(i);return a;}
}`,
    "O(V + E)", "O(V + E)"
  ),
  "critical-path-dag": makeContent(
    "Given a DAG, a nonnegative duration for each vertex, and directed edges [u,v] meaning u precedes v, return a vertex sequence with maximum sum of durations and that total duration. The path may start and end at any vertices; empty graph returns an empty path with duration 0.",
    "Durations [2,3,4], edges [[0,1],[1,2]] produce path [0,1,2] with duration 9.",
    "Enumerate every directed path starting at every vertex, tracking the path with greatest duration.",
    `import java.util.*;
public class Solution {
    static class Result { List<Integer> path; long duration; Result(List<Integer>p,long d){path=p;duration=d;} }
    static long best;static List<Integer>answer;
    public static Result criticalPath(int[]duration,int[][]edges){List<List<Integer>>g=new ArrayList<>();for(int i=0;i<duration.length;i++)g.add(new ArrayList<>());for(int[]e:edges)g.get(e[0]).add(e[1]);best=duration.length==0?0:-1;answer=new ArrayList<>();for(int i=0;i<duration.length;i++)walk(i,0,duration,g,new ArrayList<>());return new Result(answer,best);}
    private static void walk(int u,long sum,int[]d,List<List<Integer>>g,List<Integer>path){sum+=d[u];path.add(u);if(sum>best){best=sum;answer=new ArrayList<>(path);}for(int v:g.get(u))walk(v,sum,d,g,path);path.remove(path.size()-1);}
}`,
    "O(number of DAG paths · V)", "O(V + E) plus recursion",
    "Topologically process vertices and relax longest-path distances along each edge. Store predecessors to reconstruct the maximum-duration path.",
    `import java.util.*;
public class Solution {
    static class Result { List<Integer> path; long duration; Result(List<Integer>p,long d){path=p;duration=d;} }
    public static Result criticalPath(int[]d,int[][]e){int n=d.length;if(n==0)return new Result(new ArrayList<>(),0);List<List<Integer>>g=new ArrayList<>();int[]in=new int[n];for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[]x:e){g.get(x[0]).add(x[1]);in[x[1]]++;}Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<n;i++)if(in[i]==0)q.add(i);long[]best=new long[n];int[]prev=new int[n];Arrays.fill(prev,-1);for(int i=0;i<n;i++)best[i]=d[i];int done=0;
        while(!q.isEmpty()){int u=q.remove();done++;for(int v:g.get(u)){if(best[v]<best[u]+d[v]){best[v]=best[u]+d[v];prev[v]=u;}if(--in[v]==0)q.add(v);}}
        if(done<n)return new Result(new ArrayList<>(),0);int end=0;for(int i=1;i<n;i++)if(best[i]>best[end])end=i;List<Integer>path=new ArrayList<>();for(int x=end;x!=-1;x=prev[x])path.add(x);Collections.reverse(path);return new Result(path,best[end]);
    }
}`,
    "O(V + E)", "O(V + E)"
  ),
  "alien-dictionary": makeContent(
    "Given words sorted in an unknown lowercase alphabet, infer a valid ordering of the distinct characters. Return an empty string for contradictory constraints, including an invalid longer-word-before-its-prefix pair.",
    '["wrt","wrf","er","ett","rftt"] returns a valid order such as "wertf".',
    "Try permutations of the characters appearing in the words and keep one that makes every adjacent word pair lexicographically sorted.",
    `import java.util.*;
public class Solution {
    public static String order(String[]w){boolean[]used=new boolean[26];for(String s:w)for(char c:s.toCharArray())used[c-'a']=true;List<Integer>chars=new ArrayList<>();for(int i=0;i<26;i++)if(used[i])chars.add(i);return perm(w,chars,new StringBuilder(),new boolean[26])?answer:"";}
    static String answer;
    private static boolean perm(String[]w,List<Integer>c,StringBuilder b,boolean[]u){if(b.length()==c.size()){String s=b.toString();for(int i=1;i<w.length;i++){String a=w[i-1],z=w[i];int j=0;while(j<a.length()&&j<z.length()&&a.charAt(j)==z.charAt(j))j++;if(j==z.length()&&a.length()>z.length())return false;if(j<a.length()&&j<z.length()&&s.indexOf(a.charAt(j))>s.indexOf(z.charAt(j)))return false;}answer=s;return true;}for(int x:c)if(!u[x]){u[x]=true;b.append((char)('a'+x));if(perm(w,c,b,u))return true;b.setLength(b.length()-1);u[x]=false;}return false;}
}`,
    "O(C! · total word length)", "O(C + total word length)",
    "Compare adjacent words to derive the first differing-character edge, reject invalid prefixes, then topologically sort the character graph.",
    `import java.util.*;
public class Solution {
    public static String order(String[]w){List<Set<Integer>>g=new ArrayList<>();int[]in=new int[26];boolean[]used=new boolean[26];for(int i=0;i<26;i++)g.add(new HashSet<>());for(String s:w)for(char c:s.toCharArray())used[c-'a']=true;
        for(int i=1;i<w.length;i++){String a=w[i-1],b=w[i];int j=0;while(j<a.length()&&j<b.length()&&a.charAt(j)==b.charAt(j))j++;if(j==b.length()&&a.length()>b.length())return "";if(j<a.length()&&j<b.length()){int x=a.charAt(j)-'a',y=b.charAt(j)-'a';if(g.get(x).add(y))in[y]++;}}
        Deque<Integer>q=new ArrayDeque<>();int total=0;for(int i=0;i<26;i++)if(used[i]){total++;if(in[i]==0)q.add(i);}StringBuilder out=new StringBuilder();while(!q.isEmpty()){int u=q.remove();out.append((char)('a'+u));for(int v:g.get(u))if(--in[v]==0)q.add(v);}return out.length()==total?out.toString():"";
    }
}`,
    "O(L + C + E)", "O(C + E)"
  ),
  "alien-character-order": makeContent(
    "Given words sorted in an unknown lowercase alphabet, return one valid order of all distinct characters appearing in the words. Return an empty string if the ordering constraints conflict.",
    '["baa","abcd","abca","cab","cad"] can yield "bdac".',
    "Try every ordering of the distinct letters and retain the first order that lexicographically sorts all adjacent words.",
    `import java.util.*;
public class Solution {
    static String answer;
    public static String order(String[]w){boolean[]seen=new boolean[26];for(String s:w)for(char c:s.toCharArray())seen[c-'a']=true;List<Integer>cs=new ArrayList<>();for(int i=0;i<26;i++)if(seen[i])cs.add(i);return go(w,cs,new boolean[26],new StringBuilder())?answer:"";}
    private static boolean go(String[]w,List<Integer>cs,boolean[]u,StringBuilder b){if(b.length()==cs.size()){String s=b.toString();for(int i=1;i<w.length;i++){String a=w[i-1],z=w[i];int j=0;while(j<a.length()&&j<z.length()&&a.charAt(j)==z.charAt(j))j++;if(j==z.length()&&a.length()>z.length())return false;if(j<a.length()&&j<z.length()&&s.indexOf(a.charAt(j))>s.indexOf(z.charAt(j)))return false;}answer=s;return true;}for(int x:cs)if(!u[x]){u[x]=true;b.append((char)('a'+x));if(go(w,cs,u,b))return true;b.setLength(b.length()-1);u[x]=false;}return false;}
}`,
    "O(C! · L)", "O(C + L)",
    "Build precedence edges from the first differing character of each adjacent word, then run Kahn's algorithm over only characters that appear.",
    `import java.util.*;
public class Solution {
    public static String order(String[]w){List<Set<Integer>>g=new ArrayList<>();for(int i=0;i<26;i++)g.add(new HashSet<>());int[]in=new int[26];boolean[]seen=new boolean[26];for(String s:w)for(char c:s.toCharArray())seen[c-'a']=true;
        for(int i=1;i<w.length;i++){String a=w[i-1],b=w[i];int j=0;while(j<a.length()&&j<b.length()&&a.charAt(j)==b.charAt(j))j++;if(j==b.length()&&a.length()>b.length())return "";if(j<a.length()&&j<b.length()){int x=a.charAt(j)-'a',y=b.charAt(j)-'a';if(g.get(x).add(y))in[y]++;}}
        Deque<Integer>q=new ArrayDeque<>();int need=0;for(int i=0;i<26;i++)if(seen[i]){need++;if(in[i]==0)q.add(i);}StringBuilder out=new StringBuilder();while(!q.isEmpty()){int u=q.remove();out.append((char)('a'+u));for(int v:g.get(u))if(--in[v]==0)q.add(v);}return out.length()==need?out.toString():"";
    }
}`,
    "O(L + C + E)", "O(C + E)"
  )
};
