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

export const triesContent = {
  "implement-trie": entry(
    "Implement a Trie with insert, exact-word search, and prefix search. Words are case-sensitive Java strings; inserting the same word repeatedly does not change results.",
    "After inserting apple, search(apple) and startsWith(app) are true, while search(app) is false.",
    "store all words and scan them for exact or prefix matches",
    `import java.util.*;
public class Solution {
    static class Trie {
        private final Set<String> words = new HashSet<>();
        public void insert(String word) { words.add(word); }
        public boolean search(String word) { return words.contains(word); }
        public boolean startsWith(String prefix) {
            for (String word : words) if (word.startsWith(prefix)) return true;
            return false;
        }
    }
}`,
    "O(total stored characters) per prefix query; O(1) average exact lookup",
    "O(total stored characters)",
    "share common prefixes in a character trie",
    `import java.util.*;
public class Solution {
    static class Node {
        Map<Character, Node> children = new HashMap<>();
        boolean word;
    }
    static class Trie {
        private final Node root = new Node();
        public void insert(String value) {
            Node n = root;
            for (char c : value.toCharArray())
                n = n.children.computeIfAbsent(c, k -> new Node());
            n.word = true;
        }
        public boolean search(String value) {
            Node n = find(value);
            return n != null && n.word;
        }
        public boolean startsWith(String prefix) { return find(prefix) != null; }
        private Node find(String value) {
            Node n = root;
            for (char c : value.toCharArray()) {
                n = n.children.get(c);
                if (n == null) return null;
            }
            return n;
        }
    }
}`,
    "O(L) per operation, where L is the input length",
    "O(total characters across distinct trie paths)"
  ),
  "trie-word-deletion": entry(
    "Add a delete operation to a Trie. Return whether a word was removed, and preserve nodes still needed by other words or prefixes. Words are case-sensitive.",
    "If car and cart are stored, deleting car makes search(car) false but search(cart) remains true.",
    "remove the word from a set and retain no shared-prefix structure",
    `import java.util.*;
public class Solution {
    static class WordStore {
        private final Set<String> words = new HashSet<>();
        public void insert(String word) { words.add(word); }
        public boolean delete(String word) { return words.remove(word); }
        public boolean search(String word) { return words.contains(word); }
    }
}`,
    "O(1) average per operation",
    "O(total stored characters)",
    "clear the terminal marker and prune childless non-word nodes while unwinding",
    `import java.util.*;
public class Solution {
    static class Node {
        Map<Character, Node> children = new HashMap<>();
        boolean word;
    }
    static class Trie {
        private final Node root = new Node();
        public void insert(String value) {
            Node n = root;
            for (char c : value.toCharArray())
                n = n.children.computeIfAbsent(c, k -> new Node());
            n.word = true;
        }
        public boolean search(String value) {
            Node n = find(value);
            return n != null && n.word;
        }
        public boolean delete(String value) { return remove(root, value, 0); }
        private boolean remove(Node n, String word, int i) {
            if (i == word.length()) {
                if (!n.word) return false;
                n.word = false;
                return true;
            }
            char c = word.charAt(i);
            Node child = n.children.get(c);
            if (child == null || !remove(child, word, i + 1)) return false;
            if (!child.word && child.children.isEmpty()) n.children.remove(c);
            return true;
        }
        private Node find(String value) {
            Node n = root;
            for (char c : value.toCharArray()) {
                n = n.children.get(c);
                if (n == null) return null;
            }
            return n;
        }
    }
}`,
    "O(L) per operation",
    "O(total characters); deletion uses O(L) recursion stack"
  ),
  "trie-words-with-prefix": entry(
    "Given stored words and a prefix, return every matching word in lexicographic order. Return each distinct stored word once.",
    "Words [app, apple, ape, bat] with prefix ap return [ape, app, apple].",
    "scan a set, filter with startsWith, then sort",
    `import java.util.*;
public class Solution {
    public static List<String> wordsWithPrefix(Collection<String> words, String prefix) {
        Set<String> unique = new HashSet<>(words);
        List<String> result = new ArrayList<>();
        for (String word : unique) if (word.startsWith(prefix)) result.add(word);
        Collections.sort(result);
        return result;
    }
}`,
    "O(N + K log K) plus string comparison cost",
    "O(K) output",
    "seek the prefix node, then enumerate its descendants in character order",
    `import java.util.*;
public class Solution {
    static class Node {
        Map<Character, Node> children = new TreeMap<>();
        boolean word;
    }
    public static List<String> wordsWithPrefix(Collection<String> words, String prefix) {
        Node root = new Node();
        for (String word : words) {
            Node n = root;
            for (char c : word.toCharArray())
                n = n.children.computeIfAbsent(c, k -> new Node());
            n.word = true;
        }
        Node start = root;
        for (char c : prefix.toCharArray()) {
            start = start.children.get(c);
            if (start == null) return new ArrayList<>();
        }
        List<String> result = new ArrayList<>();
        collect(start, new StringBuilder(prefix), result);
        return result;
    }
    private static void collect(Node n, StringBuilder path, List<String> out) {
        if (n.word) out.add(path.toString());
        for (Map.Entry<Character, Node> e : n.children.entrySet()) {
            path.append(e.getKey());
            collect(e.getValue(), path, out);
            path.deleteCharAt(path.length() - 1);
        }
    }
}`,
    "O(total input characters + output characters)",
    "O(total trie characters + output)"
  ),
  "wildcard-dictionary-search": entry(
    "Support adding words and searching with dot as a wildcard matching exactly one character. Words are case-sensitive.",
    "After adding bad, search(b.d) is true and search(b..) is true, while search(ba) is false.",
    "test each stored word of matching length character by character",
    `import java.util.*;
public class Solution {
    static class WordDictionary {
        private final Set<String> words = new HashSet<>();
        public void addWord(String word) { words.add(word); }
        public boolean search(String pattern) {
            for (String word : words) {
                if (word.length() != pattern.length()) continue;
                int i = 0;
                while (i < word.length()
                    && (pattern.charAt(i) == '.' || pattern.charAt(i) == word.charAt(i))) i++;
                if (i == word.length()) return true;
            }
            return false;
        }
    }
}`,
    "O(NL) per search in the worst case",
    "O(total stored characters)",
    "branch only where a wildcard can match any child",
    `import java.util.*;
public class Solution {
    static class Node {
        Map<Character, Node> children = new HashMap<>();
        boolean word;
    }
    static class WordDictionary {
        private final Node root = new Node();
        public void addWord(String value) {
            Node n = root;
            for (char c : value.toCharArray())
                n = n.children.computeIfAbsent(c, k -> new Node());
            n.word = true;
        }
        public boolean search(String pattern) { return match(root, pattern, 0); }
        private boolean match(Node n, String p, int i) {
            if (i == p.length()) return n.word;
            char c = p.charAt(i);
            if (c != '.') {
                Node child = n.children.get(c);
                return child != null && match(child, p, i + 1);
            }
            for (Node child : n.children.values())
                if (match(child, p, i + 1)) return true;
            return false;
        }
    }
}`,
    "O(V) worst case, where V is the number of trie nodes explored",
    "O(total trie characters + L) recursion"
  ),
  "word-search-ii": entry(
    "Return each dictionary word that can be formed by adjacent horizontal or vertical grid cells without reusing a cell within a word. Return distinct matches; the grid may be empty.",
    "Grid [[o,a,a,n],[e,t,a,e],[i,h,k,r],[i,f,l,v]] with words [oath, pea, eat, rain] returns [eat, oath].",
    "run a separate backtracking grid search for each word",
    `import java.util.*;
public class Solution {
    public static List<String> findWords(char[][] board, String[] words) {
        Set<String> found = new TreeSet<>();
        if (board == null || board.length == 0) return new ArrayList<>();
        for (String word : new HashSet<>(Arrays.asList(words)))
            if (!word.isEmpty() && exists(board, word)) found.add(word);
        return new ArrayList<>(found);
    }
    private static boolean exists(char[][] b, String w) {
        for (int r = 0; r < b.length; r++)
            for (int c = 0; c < b[0].length; c++)
                if (search(b, w, 0, r, c)) return true;
        return false;
    }
    private static boolean search(char[][] b, String w, int i, int r, int c) {
        if (r < 0 || r >= b.length || c < 0 || c >= b[0].length || b[r][c] != w.charAt(i)) return false;
        if (i == w.length() - 1) return true;
        char saved = b[r][c]; b[r][c] = '\\0';
        boolean yes = search(b,w,i+1,r+1,c) || search(b,w,i+1,r-1,c)
            || search(b,w,i+1,r,c+1) || search(b,w,i+1,r,c-1);
        b[r][c] = saved;
        return yes;
    }
}`,
    "O(D · R · C · 4^L) worst case",
    "O(L) recursion plus result",
    "share grid prefixes in a Trie and stop searches with no dictionary continuation",
    `import java.util.*;
public class Solution {
    static class Node { Map<Character, Node> next = new HashMap<>(); String word; }
    private static final int[][] DIR = {{1,0},{-1,0},{0,1},{0,-1}};
    public static List<String> findWords(char[][] board, String[] words) {
        Set<String> found = new TreeSet<>();
        if (board == null || board.length == 0 || board[0].length == 0) return new ArrayList<>();
        Node root = new Node();
        for (String word : words) {
            Node n = root;
            for (char c : word.toCharArray()) n = n.next.computeIfAbsent(c, k -> new Node());
            n.word = word;
        }
        for (int r = 0; r < board.length; r++)
            for (int c = 0; c < board[0].length; c++) dfs(board, r, c, root, found);
        return new ArrayList<>(found);
    }
    private static void dfs(char[][] b, int r, int c, Node parent, Set<String> out) {
        char ch = b[r][c];
        Node n = parent.next.get(ch);
        if (n == null) return;
        if (n.word != null) { out.add(n.word); n.word = null; }
        b[r][c] = '\\0';
        for (int[] d : DIR) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < b.length && nc >= 0 && nc < b[0].length && b[nr][nc] != '\\0')
                dfs(b, nr, nc, n, out);
        }
        b[r][c] = ch;
    }
}`,
    "O(R · C · 4^L) worst case, with trie-prefix pruning",
    "O(total dictionary characters + L) trie and recursion, plus output"
  ),
  "longest-common-prefix": entry(
    "Return the longest prefix shared by every string, or the empty string for an empty list or no shared characters. Strings are case-sensitive.",
    "For [flower, flow, flight], return fl.",
    "compare adjacent strings and retain their common prefix",
    `public class Solution {
    public static String longestCommonPrefix(String[] words) {
        if (words.length == 0) return "";
        String prefix = words[0];
        for (int i = 1; i < words.length; i++) {
            int j = 0;
            while (j < prefix.length() && j < words[i].length()
                && prefix.charAt(j) == words[i].charAt(j)) j++;
            prefix = prefix.substring(0, j);
            if (prefix.isEmpty()) return "";
        }
        return prefix;
    }
}`,
    "O(total characters examined)",
    "O(1) auxiliary space excluding returned string",
    "scan each character position across all words once",
    `public class Solution {
    public static String longestCommonPrefix(String[] words) {
        if (words.length == 0) return "";
        for (int i = 0; i < words[0].length(); i++) {
            char c = words[0].charAt(i);
            for (int j = 1; j < words.length; j++)
                if (i == words[j].length() || words[j].charAt(i) != c)
                    return words[0].substring(0, i);
        }
        return words[0];
    }
}`,
    "O(N · L), where L is the shortest word length",
    "O(1) auxiliary space excluding returned string"
  ),
  "longest-buildable-word": entry(
    "Return the longest word for which every non-empty prefix is also in the dictionary. Break ties lexicographically; return the empty string when no word qualifies.",
    "Words [w,wo,wor,worl,world] produce world.",
    "for each candidate, separately check each proper prefix against the word set",
    `import java.util.*;
public class Solution {
    public static String longestBuildable(String[] words) {
        Set<String> set = new HashSet<>(Arrays.asList(words));
        String best = "";
        for (String word : words) {
            boolean ok = true;
            for (int i = 1; i <= word.length(); i++)
                if (!set.contains(word.substring(0, i))) { ok = false; break; }
            if (ok && (word.length() > best.length()
                || word.length() == best.length() && word.compareTo(best) < 0)) best = word;
        }
        return best;
    }
}`,
    "O(total characters squared) due to prefix substring checks",
    "O(total dictionary characters)",
    "sort lexicographically and extend only from already buildable prefixes",
    `import java.util.*;
public class Solution {
    public static String longestBuildable(String[] words) {
        Arrays.sort(words);
        Set<String> buildable = new HashSet<>();
        String best = "";
        for (String word : words) {
            if (word.length() == 1 || buildable.contains(word.substring(0, word.length() - 1))) {
                buildable.add(word);
                if (word.length() > best.length()) best = word;
            }
        }
        return best;
    }
}`,
    "O(N log N + total characters)",
    "O(N) set, excluding sort workspace"
  ),
  "replace-words-dictionary-roots": entry(
    "Replace each sentence token with the shortest dictionary root that is its prefix. Keep a word unchanged if no root matches. Tokens are separated and rejoined by single spaces.",
    "Roots [cat, bat, rat] and sentence the cattle was rattled produce the cat was rat.",
    "test every root against each word and choose the shortest match",
    `import java.util.*;
public class Solution {
    public static String replaceWords(List<String> roots, String sentence) {
        String[] words = sentence.isEmpty() ? new String[0] : sentence.split(" ");
        StringBuilder out = new StringBuilder();
        for (String word : words) {
            String best = word;
            for (String root : roots)
                if (word.startsWith(root) && root.length() < best.length()) best = root;
            if (out.length() > 0) out.append(' ');
            out.append(best);
        }
        return out.toString();
    }
}`,
    "O(W · R · L) worst case",
    "O(W) output",
    "follow the word through a Trie and stop at its first terminal node",
    `import java.util.*;
public class Solution {
    static class Node { Map<Character, Node> next = new HashMap<>(); boolean root; }
    public static String replaceWords(List<String> roots, String sentence) {
        Node trie = new Node();
        for (String word : roots) {
            Node n = trie;
            for (char c : word.toCharArray()) n = n.next.computeIfAbsent(c, k -> new Node());
            n.root = true;
        }
        String[] words = sentence.isEmpty() ? new String[0] : sentence.split(" ");
        StringBuilder out = new StringBuilder();
        for (String word : words) {
            Node n = trie;
            int end = 0;
            for (; end < word.length(); end++) {
                n = n.next.get(word.charAt(end));
                if (n == null) break;
                if (n.root) { end++; break; }
            }
            if (out.length() > 0) out.append(' ');
            out.append(n != null && n.root ? word.substring(0, end) : word);
        }
        return out.toString();
    }
}`,
    "O(total root characters + total sentence characters)",
    "O(total root characters + output)"
  ),
  "autocomplete-suggestions": entry(
    "For each successive prefix of searchWord, return up to three lexicographically smallest matching products. Products may repeat; the sorted output preserves repeated entries.",
    "Products [mobile, mouse, moneypot] and search word mouse yield one suggestion list for m, mo, mou, mous, and mouse.",
    "filter and sort the full product list independently for every prefix",
    `import java.util.*;
public class Solution {
    public static List<List<String>> suggest(String[] products, String searchWord) {
        List<List<String>> result = new ArrayList<>();
        for (int i = 1; i <= searchWord.length(); i++) {
            String prefix = searchWord.substring(0, i);
            List<String> matches = new ArrayList<>();
            for (String p : products) if (p.startsWith(prefix)) matches.add(p);
            Collections.sort(matches);
            result.add(new ArrayList<>(matches.subList(0, Math.min(3, matches.size()))));
        }
        return result;
    }
}`,
    "O(Q · (N L + N log N))",
    "O(N) temporary matches plus output",
    "build a Trie whose nodes retain the three smallest matching products",
    `import java.util.*;
public class Solution {
    static class Node { Map<Character, Node> next = new HashMap<>(); List<String> top = new ArrayList<>(); }
    public static List<List<String>> suggest(String[] products, String searchWord) {
        Arrays.sort(products);
        Node root = new Node();
        for (String p : products) {
            Node n = root;
            for (char c : p.toCharArray()) {
                n = n.next.computeIfAbsent(c, k -> new Node());
                if (n.top.size() < 3) n.top.add(p);
            }
        }
        List<List<String>> result = new ArrayList<>();
        Node n = root;
        boolean missing = false;
        for (char c : searchWord.toCharArray()) {
            if (missing || (n = n.next.get(c)) == null) {
                missing = true;
                result.add(new ArrayList<>());
            } else result.add(new ArrayList<>(n.top));
        }
        return result;
    }
}`,
    "O(N log N + total product characters + Q)",
    "O(total Trie characters + up to 3 suggestions per node)"
  ),
  "maximum-xor-binary-trie": entry(
    "Return the maximum XOR of two values at distinct indices. Inputs are non-negative signed int values; return zero when fewer than two values are supplied.",
    "For [3, 10, 5, 25, 2, 8], the maximum XOR is 28 (5 XOR 25).",
    "evaluate every pair of distinct indices",
    `public class Solution {
    public static int maximumXor(int[] values) {
        int best = 0;
        for (int i = 0; i < values.length; i++)
            for (int j = i + 1; j < values.length; j++)
                best = Math.max(best, values[i] ^ values[j]);
        return best;
    }
}`,
    "O(n^2)", "O(1)",
    "insert prior values into a 31-bit binary Trie and greedily choose opposite bits",
    `public class Solution {
    static class Node { Node zero, one; }
    public static int maximumXor(int[] values) {
        Node root = new Node();
        int best = 0;
        boolean hasPrior = false;
        for (int value : values) {
            if (hasPrior) best = Math.max(best, query(root, value));
            insert(root, value);
            hasPrior = true;
        }
        return best;
    }
    private static void insert(Node root, int value) {
        Node n = root;
        for (int bit = 30; bit >= 0; bit--) {
            if (((value >>> bit) & 1) == 0) {
                if (n.zero == null) n.zero = new Node();
                n = n.zero;
            } else {
                if (n.one == null) n.one = new Node();
                n = n.one;
            }
        }
    }
    private static int query(Node root, int value) {
        Node n = root;
        int xor = 0;
        for (int bit = 30; bit >= 0; bit--) {
            int b = (value >>> bit) & 1;
            Node opposite = b == 0 ? n.one : n.zero;
            if (opposite != null) { xor |= 1 << bit; n = opposite; }
            else n = b == 0 ? n.zero : n.one;
        }
        return xor;
    }
}`,
    "O(31n) = O(n)", "O(31n) Trie nodes"
  )
};
