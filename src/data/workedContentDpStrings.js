const worked = (statement, example, brute, bruteTime, bruteSpace, optimized, optimizedTime, optimizedSpace) => `## Problem statement

${statement}

## Example

${example}

## Brute-force approach

${brute.description}

\`\`\`java
${brute.code}
\`\`\`

- **Time:** ${bruteTime}
- **Extra space:** ${bruteSpace}

## Optimized approach

${optimized.description}

\`\`\`java
${optimized.code}
\`\`\`

- **Time:** ${optimizedTime}
- **Extra space:** ${optimizedSpace}`;

const solution = (body) => `public class Solution {
${body}
}`;

export const dpStringsContent = {
  "longest-common-subsequence": worked(
    "Return the length of a longest subsequence common to two strings. A subsequence preserves order but need not be contiguous.",
    "\"abcde\" and \"ace\" return 3.",
    { description: "At a matching pair take it; otherwise discard one of the two current characters and try both choices.", code: solution(`    public static int lcs(String a, String b) {
        return visit(a, b, 0, 0);
    }
    private static int visit(String a, String b, int i, int j) {
        if (i == a.length() || j == b.length()) return 0;
        if (a.charAt(i) == b.charAt(j)) return 1 + visit(a, b, i + 1, j + 1);
        return Math.max(visit(a, b, i + 1, j), visit(a, b, i, j + 1));
    }`) },
    "Exponential", "O(m+n) recursion stack",
    { description: "Build prefix LCS lengths in a table; equal characters extend the diagonal.", code: solution(`    public static int lcs(String a, String b) {
        int[] dp = new int[b.length() + 1];
        for (int i = 1; i <= a.length(); i++) {
            int diagonal = 0;
            for (int j = 1; j <= b.length(); j++) {
                int above = dp[j];
                if (a.charAt(i - 1) == b.charAt(j - 1)) dp[j] = diagonal + 1;
                else dp[j] = Math.max(dp[j], dp[j - 1]);
                diagonal = above;
            }
        }
        return dp[b.length()];
    }`) },
    "O(mn)", "O(n)"
  ),
  "longest-common-substring": worked(
    "Return the length of the longest contiguous substring shared by two strings.",
    "\"abcjklp\" and \"acjkp\" return 3 (\"cjk\").",
    { description: "Enumerate all start positions and extend while the characters match.", code: solution(`    public static int length(String a, String b) {
        int best = 0;
        for (int i = 0; i < a.length(); i++)
            for (int j = 0; j < b.length(); j++) {
                int k = 0;
                while (i + k < a.length() && j + k < b.length()
                        && a.charAt(i + k) == b.charAt(j + k)) k++;
                best = Math.max(best, k);
            }
        return best;
    }`) },
    "O(mn·min(m,n))", "O(1)",
    { description: "A match extends the diagonal suffix length; a mismatch resets it to zero.", code: solution(`    public static int length(String a, String b) {
        int[] dp = new int[b.length() + 1];
        int best = 0;
        for (int i = 1; i <= a.length(); i++) {
            for (int j = b.length(); j >= 1; j--) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) dp[j] = dp[j - 1] + 1;
                else dp[j] = 0;
                best = Math.max(best, dp[j]);
            }
        }
        return best;
    }`) },
    "O(mn)", "O(n)"
  ),
  "longest-palindromic-subsequence": worked(
    "Return the length of a longest palindromic subsequence in a string. The empty string has length 0.",
    "\"bbbab\" returns 4.",
    { description: "For each interval, match its ends when equal; otherwise omit one end and take the better result.", code: solution(`    public static int length(String s) {
        return visit(s, 0, s.length() - 1);
    }
    private static int visit(String s, int l, int r) {
        if (l > r) return 0;
        if (l == r) return 1;
        if (s.charAt(l) == s.charAt(r)) return 2 + visit(s, l + 1, r - 1);
        return Math.max(visit(s, l + 1, r), visit(s, l, r - 1));
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "Fill interval lengths from short intervals to long ones, using a single DP row.", code: solution(`    public static int length(String s) {
        int n = s.length();
        int[] dp = new int[n];
        for (int l = n - 1; l >= 0; l--) {
            int diagonal = 0;
            dp[l] = 1;
            for (int r = l + 1; r < n; r++) {
                int old = dp[r];
                if (s.charAt(l) == s.charAt(r)) dp[r] = diagonal + 2;
                else dp[r] = Math.max(dp[r], dp[r - 1]);
                diagonal = old;
            }
        }
        return n == 0 ? 0 : dp[n - 1];
    }`) },
    "O(n²)", "O(n)"
  ),
  "longest-palindromic-substring": worked(
    "Return one longest contiguous palindromic substring. For an empty string, return the empty string.",
    "\"babad\" returns \"bab\" or \"aba\".",
    { description: "Test each substring by comparing inward from its ends.", code: solution(`    public static String longest(String s) {
        int bestStart = 0, bestLength = 0;
        for (int l = 0; l < s.length(); l++)
            for (int r = l; r < s.length(); r++) {
                int i = l, j = r;
                while (i < j && s.charAt(i) == s.charAt(j)) { i++; j--; }
                if (i >= j && r - l + 1 > bestLength) {
                    bestStart = l;
                    bestLength = r - l + 1;
                }
            }
        return s.substring(bestStart, bestStart + bestLength);
    }`) },
    "O(n³)", "O(1), excluding the returned substring",
    { description: "Expand around each odd and even center, recording the longest matching range.", code: solution(`    public static String longest(String s) {
        int start = 0, best = 0;
        for (int center = 0; center < s.length(); center++) {
            int len1 = expand(s, center, center);
            int len2 = expand(s, center, center + 1);
            int len = Math.max(len1, len2);
            if (len > best) { best = len; start = center - (len - 1) / 2; }
        }
        return s.substring(start, start + best);
    }
    private static int expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
        return r - l - 1;
    }`) },
    "O(n²)", "O(1), excluding the returned substring"
  ),
  "minimum-insertions-palindrome": worked(
    "Return the minimum number of character insertions needed to make a string a palindrome. Insertions may occur anywhere.",
    "\"mbadm\" needs 2 insertions.",
    { description: "Try matching equal ends or insert a matching copy at either end, then recurse on the remaining interval.", code: solution(`    public static int minimumInsertions(String s) {
        return visit(s, 0, s.length() - 1);
    }
    private static int visit(String s, int l, int r) {
        if (l >= r) return 0;
        if (s.charAt(l) == s.charAt(r)) return visit(s, l + 1, r - 1);
        return 1 + Math.min(visit(s, l + 1, r), visit(s, l, r - 1));
    }`) },
    "O(2^n)", "O(n) recursion stack",
    { description: "A longest palindromic subsequence needs no inserted characters; insert all other characters.", code: solution(`    public static int minimumInsertions(String s) {
        int n = s.length();
        int[] dp = new int[n];
        for (int l = n - 1; l >= 0; l--) {
            int diagonal = 0;
            dp[l] = 1;
            for (int r = l + 1; r < n; r++) {
                int old = dp[r];
                dp[r] = s.charAt(l) == s.charAt(r) ? diagonal + 2
                        : Math.max(dp[r], dp[r - 1]);
                diagonal = old;
            }
        }
        return n == 0 ? 0 : n - dp[n - 1];
    }`) },
    "O(n²)", "O(n)"
  ),
  "minimum-deletions-to-make-strings-equal": worked(
    "Given two strings, find the minimum total character deletions needed to make them equal. Characters may only be deleted.",
    "\"sea\" and \"eat\" need 2 deletions.",
    { description: "Try deleting either current character, except that matching characters can be kept together.", code: solution(`    public static int minimumDeletions(String a, String b) {
        return visit(a, b, 0, 0);
    }
    private static int visit(String a, String b, int i, int j) {
        if (i == a.length()) return b.length() - j;
        if (j == b.length()) return a.length() - i;
        if (a.charAt(i) == b.charAt(j)) return visit(a, b, i + 1, j + 1);
        return 1 + Math.min(visit(a, b, i + 1, j), visit(a, b, i, j + 1));
    }`) },
    "Exponential", "O(m+n) recursion stack",
    { description: "Only characters in a longest common subsequence can remain; delete the rest.", code: solution(`    public static int minimumDeletions(String a, String b) {
        int[] dp = new int[b.length() + 1];
        for (int i = 1; i <= a.length(); i++) {
            int diagonal = 0;
            for (int j = 1; j <= b.length(); j++) {
                int above = dp[j];
                dp[j] = a.charAt(i - 1) == b.charAt(j - 1)
                        ? diagonal + 1 : Math.max(dp[j], dp[j - 1]);
                diagonal = above;
            }
        }
        return a.length() + b.length() - 2 * dp[b.length()];
    }`) },
    "O(mn)", "O(n)"
  ),
  "edit-distance": worked(
    "Compute the minimum insertions, deletions, and substitutions required to transform one string into another.",
    "\"horse\" to \"ros\" has edit distance 3.",
    { description: "Try insert, delete, or replace at each pair of positions.", code: solution(`    public static int distance(String a, String b) {
        return visit(a, b, 0, 0);
    }
    private static int visit(String a, String b, int i, int j) {
        if (i == a.length()) return b.length() - j;
        if (j == b.length()) return a.length() - i;
        if (a.charAt(i) == b.charAt(j)) return visit(a, b, i + 1, j + 1);
        return 1 + Math.min(visit(a, b, i + 1, j),
                Math.min(visit(a, b, i, j + 1), visit(a, b, i + 1, j + 1)));
    }`) },
    "Exponential", "O(m+n) recursion stack",
    { description: "Compute edit costs for prefixes, rolling a single row of the table.", code: solution(`    public static int distance(String a, String b) {
        int[] dp = new int[b.length() + 1];
        for (int j = 0; j <= b.length(); j++) dp[j] = j;
        for (int i = 1; i <= a.length(); i++) {
            int diagonal = dp[0];
            dp[0] = i;
            for (int j = 1; j <= b.length(); j++) {
                int above = dp[j];
                if (a.charAt(i - 1) == b.charAt(j - 1)) dp[j] = diagonal;
                else dp[j] = 1 + Math.min(diagonal, Math.min(dp[j], dp[j - 1]));
                diagonal = above;
            }
        }
        return dp[b.length()];
    }`) },
    "O(mn)", "O(n)"
  ),
  "distinct-subsequences": worked(
    "Count how many index-distinct subsequences of source equal target. Assume the answer fits in long.",
    "Source \"rabbbit\", target \"rabbit\" returns 3.",
    { description: "At each source character, either skip it or match it to the next target character.", code: solution(`    public static long count(String s, String t) {
        return visit(s, t, 0, 0);
    }
    private static long visit(String s, String t, int i, int j) {
        if (j == t.length()) return 1;
        if (i == s.length()) return 0;
        long ways = visit(s, t, i + 1, j);
        if (s.charAt(i) == t.charAt(j)) ways += visit(s, t, i + 1, j + 1);
        return ways;
    }`) },
    "O(2^m)", "O(m+n) recursion stack",
    { description: "Count ways to form each target prefix. Update target positions backward for each source character.", code: solution(`    public static long count(String s, String t) {
        long[] dp = new long[t.length() + 1];
        dp[0] = 1;
        for (int i = 0; i < s.length(); i++)
            for (int j = t.length(); j >= 1; j--)
                if (s.charAt(i) == t.charAt(j - 1)) dp[j] += dp[j - 1];
        return dp[t.length()];
    }`) },
    "O(mn)", "O(n)"
  ),
  "shortest-common-supersequence": worked(
    "Return the length of a shortest string that contains both input strings as subsequences.",
    "\"abac\" and \"cab\" have a shortest common supersequence of length 5.",
    { description: "Recursively merge the next character from either string; matching characters are emitted once.", code: solution(`    public static int length(String a, String b) {
        return visit(a, b, 0, 0);
    }
    private static int visit(String a, String b, int i, int j) {
        if (i == a.length()) return b.length() - j;
        if (j == b.length()) return a.length() - i;
        if (a.charAt(i) == b.charAt(j)) return 1 + visit(a, b, i + 1, j + 1);
        return 1 + Math.min(visit(a, b, i + 1, j), visit(a, b, i, j + 1));
    }`) },
    "Exponential", "O(m+n) recursion stack",
    { description: "Use the identity |SCS| = |a| + |b| - |LCS|.", code: solution(`    public static int length(String a, String b) {
        int[] dp = new int[b.length() + 1];
        for (int i = 1; i <= a.length(); i++) {
            int diagonal = 0;
            for (int j = 1; j <= b.length(); j++) {
                int above = dp[j];
                dp[j] = a.charAt(i - 1) == b.charAt(j - 1)
                        ? diagonal + 1 : Math.max(dp[j], dp[j - 1]);
                diagonal = above;
            }
        }
        return a.length() + b.length() - dp[b.length()];
    }`) },
    "O(mn)", "O(n)"
  ),
  "wildcard-matching": worked(
    "Match the entire text against a pattern where '?' matches any one character and '*' matches any sequence (including empty).",
    "Text \"adceb\" matches \"*a*b\".",
    { description: "For '*', try consuming no text or one more character; literals and '?' must match one character.", code: solution(`    public static boolean matches(String s, String p) {
        return visit(s, p, 0, 0);
    }
    private static boolean visit(String s, String p, int i, int j) {
        if (j == p.length()) return i == s.length();
        if (p.charAt(j) == '*')
            return visit(s, p, i, j + 1) || (i < s.length() && visit(s, p, i + 1, j));
        return i < s.length() && (p.charAt(j) == '?' || p.charAt(j) == s.charAt(i))
                && visit(s, p, i + 1, j + 1);
    }`) },
    "Exponential", "O(m+n) recursion stack",
    { description: "Use prefix matching DP. A star either consumes no character or extends its previous match.", code: solution(`    public static boolean matches(String s, String p) {
        boolean[] dp = new boolean[p.length() + 1];
        dp[0] = true;
        for (int j = 1; j <= p.length(); j++)
            dp[j] = dp[j - 1] && p.charAt(j - 1) == '*';
        for (int i = 1; i <= s.length(); i++) {
            boolean diagonal = dp[0];
            dp[0] = false;
            for (int j = 1; j <= p.length(); j++) {
                boolean above = dp[j];
                char ch = p.charAt(j - 1);
                if (ch == '*') dp[j] = dp[j - 1] || dp[j];
                else dp[j] = diagonal && (ch == '?' || ch == s.charAt(i - 1));
                diagonal = above;
            }
        }
        return dp[p.length()];
    }`) },
    "O(mn)", "O(n)"
  ),
  "regular-expression-matching": worked(
    "Match the entire text against a valid pattern where '.' matches one character and '*' means zero or more repetitions of the immediately preceding atom. Assume '*' never appears without a preceding atom.",
    "Text \"aab\" matches pattern \"c*a*b\".",
    { description: "A starred atom branches between using zero copies and consuming another matching text character.", code: solution(`    public static boolean matches(String s, String p) {
        return visit(s, p, 0, 0);
    }
    private static boolean visit(String s, String p, int i, int j) {
        if (j == p.length()) return i == s.length();
        boolean first = i < s.length()
                && (p.charAt(j) == '.' || p.charAt(j) == s.charAt(i));
        if (j + 1 < p.length() && p.charAt(j + 1) == '*')
            return visit(s, p, i, j + 2) || (first && visit(s, p, i + 1, j));
        return first && visit(s, p, i + 1, j + 1);
    }`) },
    "Exponential", "O(m+n) recursion stack",
    { description: "Let dp[i][j] describe matching prefixes. For a star, either skip its atom-star pair or consume one matching character.", code: solution(`    public static boolean matches(String s, String p) {
        boolean[][] dp = new boolean[s.length() + 1][p.length() + 1];
        dp[0][0] = true;
        for (int j = 2; j <= p.length(); j++)
            if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];
        for (int i = 1; i <= s.length(); i++)
            for (int j = 1; j <= p.length(); j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 2];
                    char atom = p.charAt(j - 2);
                    if (atom == '.' || atom == s.charAt(i - 1))
                        dp[i][j] |= dp[i - 1][j];
                } else if (pc == '.' || pc == s.charAt(i - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        return dp[s.length()][p.length()];
    }`) },
    "O(mn)", "O(mn)"
  ),
  "count-palindromic-substrings": worked(
    "Count all palindromic substrings, counting occurrences at different positions separately.",
    "\"aaa\" contains 6 palindromic substrings.",
    { description: "Enumerate each substring and check whether it reads the same forward and backward.", code: solution(`    public static long count(String s) {
        long total = 0;
        for (int l = 0; l < s.length(); l++)
            for (int r = l; r < s.length(); r++) {
                int i = l, j = r;
                while (i < j && s.charAt(i) == s.charAt(j)) { i++; j--; }
                if (i >= j) total++;
            }
        return total;
    }`) },
    "O(n³)", "O(1)",
    { description: "Every palindrome has an odd or even center; expand outward while characters match.", code: solution(`    public static long count(String s) {
        long total = 0;
        for (int center = 0; center < s.length(); center++) {
            total += expand(s, center, center);
            total += expand(s, center, center + 1);
        }
        return total;
    }
    private static long expand(String s, int l, int r) {
        long count = 0;
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            count++;
            l--;
            r++;
        }
        return count;
    }`) },
    "O(n²)", "O(1)"
  ),
  "interleaving-string": worked(
    "Determine whether s3 is formed by interleaving all characters of s1 and s2 while preserving each source string's order.",
    "\"aabcc\", \"dbbca\", and \"aadbbcbcac\" return true.",
    { description: "At each position, consume the next character from either source when it matches.", code: solution(`    public static boolean isInterleave(String a, String b, String c) {
        if (a.length() + b.length() != c.length()) return false;
        return visit(a, b, c, 0, 0);
    }
    private static boolean visit(String a, String b, String c, int i, int j) {
        int k = i + j;
        if (k == c.length()) return true;
        return (i < a.length() && a.charAt(i) == c.charAt(k) && visit(a, b, c, i + 1, j))
                || (j < b.length() && b.charAt(j) == c.charAt(k) && visit(a, b, c, i, j + 1));
    }`) },
    "O(2^(m+n))", "O(m+n) recursion stack",
    { description: "Dynamic programming records whether prefixes of the two sources form each prefix of the result.", code: solution(`    public static boolean isInterleave(String a, String b, String c) {
        if (a.length() + b.length() != c.length()) return false;
        boolean[] dp = new boolean[b.length() + 1];
        dp[0] = true;
        for (int j = 1; j <= b.length(); j++)
            dp[j] = dp[j - 1] && b.charAt(j - 1) == c.charAt(j - 1);
        for (int i = 1; i <= a.length(); i++) {
            dp[0] = dp[0] && a.charAt(i - 1) == c.charAt(i - 1);
            for (int j = 1; j <= b.length(); j++) {
                char ch = c.charAt(i + j - 1);
                dp[j] = (dp[j] && a.charAt(i - 1) == ch)
                        || (dp[j - 1] && b.charAt(j - 1) == ch);
            }
        }
        return dp[b.length()];
    }`) },
    "O(mn)", "O(n)"
  ),
  "minimum-ascii-delete-sum": worked(
    "Assuming ASCII input, delete characters from two strings so they become equal, minimizing the sum of deleted characters' ASCII values.",
    "\"sea\" and \"eat\" have minimum delete sum 231.",
    { description: "Recursively keep equal leading characters or delete one side and pay its character value.", code: solution(`    public static long minimumSum(String a, String b) {
        return visit(a, b, 0, 0);
    }
    private static long visit(String a, String b, int i, int j) {
        if (i == a.length()) {
            long sum = 0;
            for (; j < b.length(); j++) sum += b.charAt(j);
            return sum;
        }
        if (j == b.length()) {
            long sum = 0;
            for (; i < a.length(); i++) sum += a.charAt(i);
            return sum;
        }
        if (a.charAt(i) == b.charAt(j)) return visit(a, b, i + 1, j + 1);
        return Math.min(a.charAt(i) + visit(a, b, i + 1, j),
                        b.charAt(j) + visit(a, b, i, j + 1));
    }`) },
    "Exponential", "O(m+n) recursion stack",
    { description: "For each pair of prefixes, either delete the trailing character from one string or keep matching trailing characters.", code: solution(`    public static long minimumSum(String a, String b) {
        long[] dp = new long[b.length() + 1];
        for (int j = 1; j <= b.length(); j++) dp[j] = dp[j - 1] + b.charAt(j - 1);
        for (int i = 1; i <= a.length(); i++) {
            long diagonal = dp[0];
            dp[0] += a.charAt(i - 1);
            for (int j = 1; j <= b.length(); j++) {
                long above = dp[j];
                if (a.charAt(i - 1) == b.charAt(j - 1)) dp[j] = diagonal;
                else dp[j] = Math.min(dp[j] + a.charAt(i - 1),
                        dp[j - 1] + b.charAt(j - 1));
                diagonal = above;
            }
        }
        return dp[b.length()];
    }`) },
    "O(mn)", "O(n)"
  ),
  "longest-repeating-subsequence": worked(
    "Return the length of the longest subsequence that appears at two different index sequences in the same string. An index cannot pair with itself.",
    "\"aabebcdd\" returns 3.",
    { description: "Compare the string with itself; match equal characters only when their indices differ.", code: solution(`    public static int length(String s) {
        return visit(s, 0, 0);
    }
    private static int visit(String s, int i, int j) {
        if (i == s.length() || j == s.length()) return 0;
        if (i != j && s.charAt(i) == s.charAt(j))
            return 1 + visit(s, i + 1, j + 1);
        return Math.max(visit(s, i + 1, j), visit(s, i, j + 1));
    }`) },
    "Exponential", "O(n) recursion stack",
    { description: "This is LCS of the string with itself with the diagonal index pair forbidden.", code: solution(`    public static int length(String s) {
        int n = s.length();
        int[][] dp = new int[n + 1][n + 1];
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++) {
                if (i != j && s.charAt(i - 1) == s.charAt(j - 1))
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        return dp[n][n];
    }`) },
    "O(n²)", "O(n²)"
  )
};
