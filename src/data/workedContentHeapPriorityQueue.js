const worked = (problem, example, bruteIdea, bruteCode, bruteTime, bruteSpace, optimizedIdea, optimizedCode, optimizedTime, optimizedSpace) =>
  `## Problem statement

${problem}

## Example

${example}

## Brute-force approach

${bruteIdea}

\`\`\`java
${bruteCode}
\`\`\`

- **Time:** ${bruteTime}
- **Extra space:** ${bruteSpace}

## Optimized approach

${optimizedIdea}

\`\`\`java
${optimizedCode}
\`\`\`

- **Time:** ${optimizedTime}
- **Extra space:** ${optimizedSpace}`;

export const heapContent = {
  "implement-min-heap": worked(
    "Implement a min-heap with insertion, minimum lookup, and minimum removal. Lookup and removal on an empty heap throw an exception.",
    "Insert `5, 2, 8`; peek returns `2`, and removing returns `2`.",
    "Store values in a list; find the minimum by scanning for peek or removal.",
    String.raw`import java.util.ArrayList;
import java.util.List;
public class Solution {
    static class MinHeap {
        private final List<Integer> a=new ArrayList<>();
        public void add(int x){a.add(x);}
        public int peek(){if(a.isEmpty())throw new IllegalStateException(); int m=a.get(0);for(int x:a)m=Math.min(m,x);return m;}
        public int remove(){int m=peek();a.remove(Integer.valueOf(m));return m;}
        public boolean isEmpty(){return a.isEmpty();}
    }
}`,
    "add O(1); peek/remove O(n)", "O(n)",
    "Store the complete binary tree in an array. Bubble inserted items upward; replace the root with the last item and sift it downward on removal.",
    String.raw`import java.util.ArrayList;
import java.util.List;
public class Solution {
    static class MinHeap {
        private final List<Integer> a=new ArrayList<>();
        public void add(int x){a.add(x);int i=a.size()-1;while(i>0){int p=(i-1)/2;if(a.get(p)<=x)break;a.set(i,a.get(p));i=p;}a.set(i,x);}
        public int peek(){if(a.isEmpty())throw new IllegalStateException();return a.get(0);}
        public int remove(){int r=peek(),last=a.remove(a.size()-1);if(!a.isEmpty()){int i=0;while(2*i+1<a.size()){int c=2*i+1;if(c+1<a.size()&&a.get(c+1)<a.get(c))c++;if(a.get(c)>=last)break;a.set(i,a.get(c));i=c;}a.set(i,last);}return r;}
        public boolean isEmpty(){return a.isEmpty();}
    }
}`,
    "add/remove O(log n); peek O(1)", "O(n)"
  ),
  "implement-max-heap": worked(
    "Implement a max-heap with insertion, maximum lookup, and maximum removal. Lookup and removal on an empty heap throw an exception.",
    "Insert `5, 2, 8`; peek returns `8`, and removing returns `8`.",
    "Store values in a list; find the maximum by scanning for peek or removal.",
    String.raw`import java.util.ArrayList;
import java.util.List;
public class Solution {
    static class MaxHeap {
        private final List<Integer> a=new ArrayList<>();
        public void add(int x){a.add(x);}
        public int peek(){if(a.isEmpty())throw new IllegalStateException();int m=a.get(0);for(int x:a)m=Math.max(m,x);return m;}
        public int remove(){int m=peek();a.remove(Integer.valueOf(m));return m;}
        public boolean isEmpty(){return a.isEmpty();}
    }
}`,
    "add O(1); peek/remove O(n)", "O(n)",
    "Store the complete binary tree in an array. Bubble larger items upward; replace the root with the last item and sift it downward on removal.",
    String.raw`import java.util.ArrayList;
import java.util.List;
public class Solution {
    static class MaxHeap {
        private final List<Integer> a=new ArrayList<>();
        public void add(int x){a.add(x);int i=a.size()-1;while(i>0){int p=(i-1)/2;if(a.get(p)>=x)break;a.set(i,a.get(p));i=p;}a.set(i,x);}
        public int peek(){if(a.isEmpty())throw new IllegalStateException();return a.get(0);}
        public int remove(){int r=peek(),last=a.remove(a.size()-1);if(!a.isEmpty()){int i=0;while(2*i+1<a.size()){int c=2*i+1;if(c+1<a.size()&&a.get(c+1)>a.get(c))c++;if(a.get(c)<=last)break;a.set(i,a.get(c));i=c;}a.set(i,last);}return r;}
        public boolean isEmpty(){return a.isEmpty();}
    }
}`,
    "add/remove O(log n); peek O(1)", "O(n)"
  ),
  "kth-largest-element-heap": worked(
    "Return the k-th largest element by sorted order; duplicate values occupy separate ranks. Invalid k throws an exception.",
    "`[3, 2, 1, 5, 6, 4]`, `k = 2` returns `5`.",
    "Sort a copy in ascending order and select index n-k.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int kthLargest(int[] a,int k){if(k<1||k>a.length)throw new IllegalArgumentException();int[] x=a.clone();Arrays.sort(x);return x[x.length-k];}
}`,
    "O(n log n)", "O(n)",
    "Keep a min-heap of at most k elements. Its root is the k-th largest after the scan.",
    String.raw`import java.util.PriorityQueue;
public class Solution {
    public static int kthLargest(int[] a,int k){
        if(k<1||k>a.length)throw new IllegalArgumentException();
        PriorityQueue<Integer> q=new PriorityQueue<>();
        for(int x:a){q.add(x);if(q.size()>k)q.remove();}
        return q.element();
    }
}`,
    "O(n log k)", "O(k)"
  ),
  "kth-smallest-element-heap": worked(
    "Return the k-th smallest element by sorted order; duplicates occupy separate ranks. Invalid k throws an exception.",
    "`[7, 10, 4, 3, 20, 15]`, `k = 3` returns `7`.",
    "Sort a copy in ascending order and select index k-1.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int kthSmallest(int[] a,int k){if(k<1||k>a.length)throw new IllegalArgumentException();int[] x=a.clone();Arrays.sort(x);return x[k-1];}
}`,
    "O(n log n)", "O(n)",
    "Keep a max-heap of the k smallest values encountered. Its root is the k-th smallest.",
    String.raw`import java.util.PriorityQueue;
public class Solution {
    public static int kthSmallest(int[] a,int k){
        if(k<1||k>a.length)throw new IllegalArgumentException();
        PriorityQueue<Integer> q=new PriorityQueue<>((x,y)->Integer.compare(y,x));
        for(int x:a){q.add(x);if(q.size()>k)q.remove();}
        return q.element();
    }
}`,
    "O(n log k)", "O(k)"
  ),
  "top-k-frequent-numbers-heap": worked(
    "Return k numbers by descending frequency; frequency ties are ordered by smaller numeric value first. Require 0 ≤ k ≤ the number of distinct values.",
    "`[1,1,1,2,2,3]`, `k = 2` returns `[1, 2]`.",
    "Count values, then sort all distinct values by frequency descending and number ascending.",
    String.raw`import java.util.*;
public class Solution {
    public static List<Integer> topK(int[] a,int k){
        Map<Integer,Integer> f=new HashMap<>();for(int x:a)f.put(x,f.getOrDefault(x,0)+1);
        if(k<0||k>f.size())throw new IllegalArgumentException();
        List<Integer> v=new ArrayList<>(f.keySet());v.sort((x,y)->f.get(x)!=f.get(y)?Integer.compare(f.get(y),f.get(x)):Integer.compare(x,y));
        return new ArrayList<>(v.subList(0,k));
    }
}`,
    "O(n + u log u)", "O(u)",
    "Maintain a size-k heap whose root is the least desirable retained item: lower frequency first, then larger number. Sort the selected values for the required output order.",
    String.raw`import java.util.*;
public class Solution {
    public static List<Integer> topK(int[] a,int k){
        Map<Integer,Integer> f=new HashMap<>();for(int x:a)f.put(x,f.getOrDefault(x,0)+1);
        if(k<0||k>f.size())throw new IllegalArgumentException();
        Comparator<Integer> bad=(x,y)->f.get(x)!=f.get(y)?Integer.compare(f.get(x),f.get(y)):Integer.compare(y,x);
        PriorityQueue<Integer> q=new PriorityQueue<>(bad);
        for(int x:f.keySet()){q.add(x);if(q.size()>k)q.remove();}
        List<Integer> out=new ArrayList<>(q);out.sort((x,y)->f.get(x)!=f.get(y)?Integer.compare(f.get(y),f.get(x)):Integer.compare(x,y));return out;
    }
}`,
    "O(n + u log k + k log k)", "O(u + k)"
  ),
  "merge-k-sorted-lists": worked(
    "Merge k ascending singly linked lists into one ascending list. Do not modify the input nodes.",
    "`[1→4→5, 1→3→4, 2→6]` becomes `1→1→2→3→4→4→5→6`.",
    "Copy all node values into an array, sort them, and build a new list.",
    String.raw`import java.util.*;
public class Solution {
    static class ListNode {int val;ListNode next;ListNode(int v){val=v;}}
    public static ListNode merge(ListNode[] lists){
        List<Integer> a=new ArrayList<>();for(ListNode h:lists)for(;h!=null;h=h.next)a.add(h.val);Collections.sort(a);
        ListNode d=new ListNode(0),t=d;for(int x:a){t.next=new ListNode(x);t=t.next;}return d.next;
    }
}`,
    "O(N log N)", "O(N)"
  ,
    "Keep the current node from each non-empty list in a min-heap. Remove the least node, copy it to the result, and add its successor.",
    String.raw`import java.util.*;
public class Solution {
    static class ListNode {int val;ListNode next;ListNode(int v){val=v;}}
    public static ListNode merge(ListNode[] lists){
        PriorityQueue<ListNode> q=new PriorityQueue<>((a,b)->Integer.compare(a.val,b.val));
        for(ListNode h:lists)if(h!=null)q.add(h);
        ListNode d=new ListNode(0),t=d;
        while(!q.isEmpty()){ListNode x=q.remove();t.next=new ListNode(x.val);t=t.next;if(x.next!=null)q.add(x.next);}
        return d.next;
    }
}`,
    "O(N log k)", "O(k + N) for heap and returned list"
  ),
  "k-closest-points-origin": worked(
    "Return any k points with the smallest squared Euclidean distances from the origin. Require 0 ≤ k ≤ the number of points.",
    "`[[1,3],[-2,2]]`, `k = 1` returns `[[-2,2]]`.",
    "Sort all points by squared distance and copy the first k.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int[][] closest(int[][] p,int k){
        if(k<0||k>p.length)throw new IllegalArgumentException();
        int[][] a=p.clone();Arrays.sort(a,(x,y)->Long.compare(dist(x),dist(y)));
        int[][] out=new int[k][];for(int i=0;i<k;i++)out[i]=a[i].clone();return out;
    }
    private static long dist(int[] p){return (long)p[0]*p[0]+(long)p[1]*p[1];}
}`,
    "O(n log n)", "O(n) for sorting copy"
  ,
    "Keep a max-heap of the k closest points seen, removing the farthest whenever the heap grows too large.",
    String.raw`import java.util.PriorityQueue;
public class Solution {
    public static int[][] closest(int[][] p,int k){
        if(k<0||k>p.length)throw new IllegalArgumentException();
        PriorityQueue<int[]> q=new PriorityQueue<>((a,b)->Long.compare(dist(b),dist(a)));
        for(int[] x:p){q.add(x);if(q.size()>k)q.remove();}
        int[][] out=new int[k][];for(int i=0;i<k;i++)out[i]=q.remove().clone();return out;
    }
    private static long dist(int[] p){return (long)p[0]*p[0]+(long)p[1]*p[1];}
}`,
    "O(n log k)", "O(k)"
  ),
  "k-closest-numbers-target": worked(
    "From a sorted array, return k values with smallest absolute distance from target. Break ties by choosing smaller values. Return the result sorted ascending.",
    "`[1,2,3,4,5]`, target `3`, `k = 4` returns `[1,2,3,4]`.",
    "Sort all values by distance then value, take k, and sort the chosen result ascending.",
    String.raw`import java.util.Arrays;
public class Solution {
    public static int[] closest(int[] a,int k,int target){
        if(k<0||k>a.length)throw new IllegalArgumentException();
        Integer[] x=new Integer[a.length];for(int i=0;i<a.length;i++)x[i]=a[i];
        Arrays.sort(x,(u,v)->{int c=Long.compare(Math.abs((long)u-target),Math.abs((long)v-target));return c!=0?c:Integer.compare(u,v);});
        int[] out=new int[k];for(int i=0;i<k;i++)out[i]=x[i];Arrays.sort(out);return out;
    }
}`,
    "O(n log n + k log k)", "O(n)"
  ,
    "Maintain a size-k max-heap ordered by distance and then value, with the farthest (or larger tied value) at the root.",
    String.raw`import java.util.*;
public class Solution {
    public static int[] closest(int[] a,int k,int target){
        if(k<0||k>a.length)throw new IllegalArgumentException();
        Comparator<Integer> worse=(x,y)->{int c=Long.compare(Math.abs((long)y-target),Math.abs((long)x-target));return c!=0?c:Integer.compare(y,x);};
        PriorityQueue<Integer> q=new PriorityQueue<>(worse);for(int x:a){q.add(x);if(q.size()>k)q.remove();}
        int[] out=new int[k];for(int i=0;i<k;i++)out[i]=q.remove();Arrays.sort(out);return out;
    }
}`,
    "O(n log k + k log k)", "O(k)"
  ),
  "median-data-stream": worked(
    "Design a stream structure with `addNum` and `findMedian`. For an even count, return the mean of the two middle values; finding a median on an empty stream throws.",
    "Add `1`, `2`: median is `1.5`; add `3`: median is `2.0`.",
    "Store values and sort a copy whenever the median is requested.",
    String.raw`import java.util.*;
public class Solution {
    static class MedianFinder {
        private final List<Integer> a=new ArrayList<>();
        public void addNum(int x){a.add(x);}
        public double findMedian(){if(a.isEmpty())throw new IllegalStateException();List<Integer>b=new ArrayList<>(a);Collections.sort(b);int n=b.size();return n%2==1?b.get(n/2):((long)b.get(n/2-1)+b.get(n/2))/2.0;}
    }
}`,
    "add O(1); median O(n log n)", "O(n)"
  ,
    "Maintain a max-heap for the lower half and a min-heap for the upper half, keeping sizes balanced and all lower values no greater than upper values.",
    String.raw`import java.util.PriorityQueue;
public class Solution {
    static class MedianFinder {
        private final PriorityQueue<Integer> low=new PriorityQueue<>((a,b)->Integer.compare(b,a));
        private final PriorityQueue<Integer> high=new PriorityQueue<>();
        public void addNum(int x){if(low.isEmpty()||x<=low.peek())low.add(x);else high.add(x);if(low.size()>high.size()+1)high.add(low.remove());else if(high.size()>low.size())low.add(high.remove());}
        public double findMedian(){if(low.isEmpty())throw new IllegalStateException();return low.size()>high.size()?low.peek():((long)low.peek()+high.peek())/2.0;}
    }
}`,
    "add O(log n); median O(1)", "O(n)"
  ),
  "minimum-cost-connect-ropes": worked(
    "Repeatedly connect two ropes at cost equal to their combined length. Return the minimum total cost to connect all ropes. Zero or one rope costs zero.",
    "`[4, 3, 2, 6]` returns `29`.",
    "Try every pair as the next merge and recursively compute the least remaining cost.",
    String.raw`public class Solution {
    private static long dfs(long[] a,int n){
        if(n<=1)return 0;long best=Long.MAX_VALUE;
        for(int i=0;i<n;i++)for(int j=i+1;j<n;j++){
            long sum=a[i]+a[j];long[] b=new long[n-1];int k=0;
            for(int t=0;t<n;t++)if(t!=i&&t!=j)b[k++]=a[t];b[k]=sum;
            best=Math.min(best,sum+dfs(b,n-1));
        }return best;
    }
    public static long minimumCost(long[] ropes){return dfs(ropes.clone(),ropes.length);}
}`,
    "O(n · ∏[j=2..n] binom(j, 2))", "O(n²) recursion/copy space"
  ,
    "Always connect the two shortest ropes first using a min-heap.",
    String.raw`import java.util.PriorityQueue;
public class Solution {
    public static long minimumCost(long[] ropes){
        PriorityQueue<Long> q=new PriorityQueue<>();for(long x:ropes){if(x<0)throw new IllegalArgumentException();q.add(x);}
        long cost=0;while(q.size()>1){long x=q.remove()+q.remove();cost+=x;q.add(x);}return cost;
    }
}`,
    "O(n log n)", "O(n)"
  ),
  "reorganize-string": worked(
    "Rearrange the string so equal characters are never adjacent, or return an empty string if no such arrangement exists. Characters are Java `char` values.",
    "`\"aab\"` returns a valid arrangement such as `\"aba\"`; `\"aaab\"` returns `\"\"`.",
    "Backtrack over every remaining character choice other than the previously placed character.",
    String.raw`public class Solution {
    private static boolean build(int[] f,int prev,char[] out,int pos){
        if(pos==out.length)return true;
        for(int c=0;c<f.length;c++)if(f[c]>0 && c!=prev){
            f[c]--;out[pos]=(char)c;if(build(f,c,out,pos+1))return true;f[c]++;
        }return false;
    }
    public static String reorganize(String s){
        int[] f=new int[Character.MAX_VALUE+1];for(char c:s.toCharArray())f[c]++;
        char[] out=new char[s.length()];return build(f,-1,out,0)?new String(out):"";
    }
}`,
    "O(σ^n) worst case", "O(σ + n)",
    "Repeatedly place the most frequent remaining character, temporarily holding it out of the heap until another character is placed.",
    String.raw`import java.util.*;
public class Solution {
    public static String reorganize(String s){
        Map<Character,Integer> f=new HashMap<>();for(char c:s.toCharArray())f.put(c,f.getOrDefault(c,0)+1);
        PriorityQueue<Character> q=new PriorityQueue<>((a,b)->Integer.compare(f.get(b),f.get(a)));
        q.addAll(f.keySet());StringBuilder out=new StringBuilder();Character held=null;
        while(!q.isEmpty()){
            char c=q.remove();out.append(c);f.put(c,f.get(c)-1);
            if(held!=null&&f.get(held)>0)q.add(held);
            held=f.get(c)>0?c:null;
        }
        return out.length()==s.length()?out.toString():"";
    }
}`,
    "O(n log σ)", "O(σ + n)"
  ),
  "task-scheduler-cooldown": worked(
    "Given uppercase-letter tasks and cooldown n ≥ 0, find the minimum intervals when identical tasks must be separated by at least n intervals.",
    "`tasks = [A,A,A,B,B,B]`, `n = 2` returns `8`.",
    "Use exhaustive memoized search over remaining task counts and cooldown counters. At each interval try every available task and idling.",
    String.raw`import java.util.*;
public class Solution {
    private static final Map<String,Integer> memo=new HashMap<>();
    private static String key(int[] c,int[] w){return Arrays.toString(c)+Arrays.toString(w);}
    private static int dfs(int[] c,int[] w){
        boolean done=true;for(int x:c)if(x>0)done=false;if(done)return 0;
        String k=key(c,w);if(memo.containsKey(k))return memo.get(k);
        int best=1+dfs(c,dec(w,-1));
        for(int i=0;i<26;i++)if(c[i]>0&&w[i]==0){c[i]--;int[] nw=dec(w,i);nw[i]=cooldown;best=Math.min(best,1+dfs(c,nw));c[i]++;}
        memo.put(k,best);return best;
    }
    private static int cooldown;
    private static int[] dec(int[] w,int skip){int[] x=w.clone();for(int i=0;i<26;i++)if(i!=skip&&x[i]>0)x[i]--;return x;}
    public static int leastIntervals(char[] tasks,int n){
        if(n<0)throw new IllegalArgumentException();int[] c=new int[26];for(char t:tasks){if(t<'A'||t>'Z')throw new IllegalArgumentException();c[t-'A']++;}
        cooldown=n;memo.clear();return dfs(c,new int[26]);
    }
}`,
    "Exponential in distinct task counts and cooldown states", "O(number of memoized states · 26)"
  ,
    "If the most frequent task occurs maxCount times, its frames require `(maxCount-1)(n+1) + numberOfMaxCountTasks` slots; the answer is the larger of that and task count.",
    String.raw`public class Solution {
    public static long leastIntervals(char[] tasks,int n){
        if(n<0)throw new IllegalArgumentException();int[] f=new int[26];
        for(char t:tasks){if(t<'A'||t>'Z')throw new IllegalArgumentException();f[t-'A']++;}
        int max=0,count=0;for(int x:f)if(x>max){max=x;count=1;}else if(x==max)count++;
        long frame=max==0?0:(long)(max-1)*((long)n+1)+count;return Math.max(tasks.length,frame);
    }
}`,
    "O(n)", "O(1)"
  ),
  "most-frequent-words": worked(
    "Return the k most frequent words ordered by descending frequency, then lexicographically ascending. Require 0 ≤ k ≤ the number of distinct words.",
    "`[\"i\",\"love\",\"leetcode\",\"i\",\"love\",\"coding\"]`, `k = 2` returns `[\"i\",\"love\"]`.",
    "Count words and sort all distinct words with the required ordering.",
    String.raw`import java.util.*;
public class Solution {
    public static List<String> topK(String[] words,int k){
        Map<String,Integer> f=new HashMap<>();for(String w:words)f.put(w,f.getOrDefault(w,0)+1);
        if(k<0||k>f.size())throw new IllegalArgumentException();
        List<String> a=new ArrayList<>(f.keySet());a.sort((x,y)->f.get(x)!=f.get(y)?Integer.compare(f.get(y),f.get(x)):x.compareTo(y));
        return new ArrayList<>(a.subList(0,k));
    }
}`,
    "O(n + u log u)", "O(u)"
  ,
    "Keep a size-k heap with the least desirable retained word at the root: lower frequency first, then lexicographically later.",
    String.raw`import java.util.*;
public class Solution {
    public static List<String> topK(String[] words,int k){
        Map<String,Integer> f=new HashMap<>();for(String w:words)f.put(w,f.getOrDefault(w,0)+1);
        if(k<0||k>f.size())throw new IllegalArgumentException();
        Comparator<String> bad=(x,y)->f.get(x)!=f.get(y)?Integer.compare(f.get(x),f.get(y)):y.compareTo(x);
        PriorityQueue<String> q=new PriorityQueue<>(bad);for(String w:f.keySet()){q.add(w);if(q.size()>k)q.remove();}
        List<String> out=new ArrayList<>(q);out.sort((x,y)->f.get(x)!=f.get(y)?Integer.compare(f.get(y),f.get(x)):x.compareTo(y));return out;
    }
}`,
    "O(n + u log k + k log k)", "O(u + k)"
  ),
  "smallest-range-sorted-lists": worked(
    "Given k non-empty sorted integer lists, return the narrowest inclusive range containing at least one value from every list. Ties use the smaller start. Return null if a list is empty.",
    "`[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]` returns `[20,24]`.",
    "Enumerate all possible left and right endpoints from the input values and test whether the interval covers every list.",
    String.raw`import java.util.*;
public class Solution {
    public static int[] smallestRange(List<List<Integer>> a){
        for(List<Integer> x:a)if(x.isEmpty())return null;
        List<Integer> v=new ArrayList<>();for(List<Integer>x:a)v.addAll(x);
        long best=Long.MAX_VALUE;int lo=0,hi=0;
        for(int l:v)for(int r:v)if(l<=r){
            boolean ok=true;for(List<Integer>x:a){boolean found=false;for(int z:x)if(z>=l&&z<=r){found=true;break;}if(!found){ok=false;break;}}
            long width=(long)r-l;if(ok&&(width<best||(width==best&&l<lo))){best=width;lo=l;hi=r;}
        }
        return new int[]{lo,hi};
    }
}`,
    "O(N² · N)", "O(N)"
  ,
    "Keep one current value from each list in a min-heap and track the current maximum. Advance the list containing the minimum; once any list ends, no later range can improve.",
    String.raw`import java.util.*;
public class Solution {
    static class Node {int value,list,index;Node(int v,int l,int i){value=v;list=l;index=i;}}
    public static int[] smallestRange(List<List<Integer>> a){
        if(a.isEmpty())return null;PriorityQueue<Node> q=new PriorityQueue<>((x,y)->Integer.compare(x.value,y.value));int max=Integer.MIN_VALUE;
        for(int i=0;i<a.size();i++){if(a.get(i).isEmpty())return null;int v=a.get(i).get(0);q.add(new Node(v,i,0));max=Math.max(max,v);}
        long best=Long.MAX_VALUE;int lo=0,hi=0;
        while(q.size()==a.size()){
            Node m=q.remove();long width=(long)max-m.value;
            if(width<best||(width==best&&m.value<lo)){best=width;lo=m.value;hi=max;}
            int ni=m.index+1;if(ni==a.get(m.list).size())break;
            int v=a.get(m.list).get(ni);q.add(new Node(v,m.list,ni));max=Math.max(max,v);
        }
        return new int[]{lo,hi};
    }
}`,
    "O(N log k)", "O(k)"
  ),
  "maximum-capital-projects": worked(
    "Given at most k projects, each with a required capital and profit, choose feasible projects to maximize final capital. Projects may be selected once; choosing fewer than k is allowed.",
    "`k = 2`, initial capital `0`, profits `[1,2,3]`, requirements `[0,1,1]` returns `4`.",
    "Recursively try every feasible unused project for up to k choices, keeping the best capital reached.",
    String.raw`public class Solution {
    private static long dfs(int left,long capital,int[] p,int[] r,boolean[] used){
        long best=capital;if(left==0)return best;
        for(int i=0;i<p.length;i++)if(!used[i]&&r[i]<=capital&&p[i]>0){
            used[i]=true;best=Math.max(best,dfs(left-1,capital+p[i],p,r,used));used[i]=false;
        }return best;
    }
    public static long maximizeCapital(int k,long w,int[] profits,int[] required){
        if(k<0)throw new IllegalArgumentException();
        return dfs(k,w,profits,required,new boolean[profits.length]);
    }
}`,
    "O(P(n,k)) (at most O(n^k))", "O(n + k) recursion",
    "Sort projects by required capital. As capital grows, push every newly feasible project into a max-heap of profits and take the best positive profit each round.",
    String.raw`import java.util.*;
public class Solution {
    public static long maximizeCapital(int k,long w,int[] p,int[] r){
        if(k<0)throw new IllegalArgumentException();
        int n=p.length;if(r.length!=n)throw new IllegalArgumentException();
        int[][] a=new int[n][2];for(int i=0;i<n;i++){a[i][0]=r[i];a[i][1]=p[i];}
        Arrays.sort(a,(x,y)->Integer.compare(x[0],y[0]));PriorityQueue<Integer> q=new PriorityQueue<>((x,y)->Integer.compare(y,x));int i=0;
        for(int round=0;round<k;round++){
            while(i<n&&a[i][0]<=w){q.add(a[i][1]);i++;}
            if(q.isEmpty()||q.peek()<=0)break;w+=q.remove();
        }return w;
    }
}`,
    "O(n log n + k log n)", "O(n)"
  )
};
