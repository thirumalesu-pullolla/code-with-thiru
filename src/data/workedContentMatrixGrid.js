export const matrixGridContent = {
  "mx-row-traversal": `## Problem statement

Return all matrix values in row-major order. Return an empty array for an empty matrix.

## Example

\`[[1, 2], [3, 4]]\` returns \`[1, 2, 3, 4]\`.

## Brute-force approach: append into a dynamic list

Visit each row and append its cells to a dynamically growing list.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> rowOrderBruteForce(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        for (int[] row : matrix) for (int value : row) result.add(value);
        return result;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) for the returned values

## Optimized approach: pre-size the output array

Allocate exactly the required output size and fill it in row-major order without boxing.

\`\`\`java
public class Solution {
    public static int[] rowOrder(int[][] matrix) {
        int columns = matrix.length == 0 ? 0 : matrix[0].length;
        int[] result = new int[matrix.length * columns];
        int index = 0;
        for (int[] row : matrix) {
            if (row.length != columns) throw new IllegalArgumentException("Matrix must be rectangular");
            for (int value : row) result[index++] = value;
        }
        return result;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) for the returned array`,

  "mx-column-traversal": `## Problem statement

Return matrix values column by column, from the leftmost column to the rightmost.

## Example

\`[[1, 2, 3], [4, 5, 6]]\` returns \`[1, 4, 2, 5, 3, 6]\`.

## Brute-force approach: append into a dynamic list

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> columnOrderBruteForce(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix.length == 0) return result;
        int columns = matrix[0].length;
        for (int c = 0; c < columns; c++) {
            for (int[] row : matrix) result.add(row[c]);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) for the returned values

## Optimized approach: pre-size the output array

Write values into one exact-sized primitive array, avoiding list growth and boxing.

\`\`\`java
public class Solution {
    public static int[] columnOrder(int[][] matrix) {
        if (matrix.length == 0) return new int[0];
        int columns = matrix[0].length;
        int[] result = new int[matrix.length * columns];
        int index = 0;
        for (int[] row : matrix) if (row.length != columns) throw new IllegalArgumentException("Matrix must be rectangular");
        for (int c = 0; c < columns; c++) {
            for (int[] row : matrix) result[index++] = row[c];
        }
        return result;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) for the returned array`,

  "mx-spiral-order": `## Problem statement

Return all values of a rectangular matrix in clockwise spiral order.

## Example

\`[[1, 2, 3], [4, 5, 6], [7, 8, 9]]\` returns \`[1, 2, 3, 6, 9, 8, 7, 4, 5]\`.

## Brute-force approach: walk with visited cells

Walk in the current direction; turn clockwise whenever the next cell is outside the matrix or already visited.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> spiralBruteForce(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix.length == 0 || matrix[0].length == 0) return result;
        int rows = matrix.length, cols = matrix[0].length;
        boolean[][] seen = new boolean[rows][cols];
        int[] dr = {0, 1, 0, -1}, dc = {1, 0, -1, 0};
        int r = 0, c = 0, direction = 0;
        for (int count = 0; count < rows * cols; count++) {
            result.add(matrix[r][c]); seen[r][c] = true;
            int nr = r + dr[direction], nc = c + dc[direction];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || seen[nr][nc]) {
                direction = (direction + 1) % 4;
                nr = r + dr[direction]; nc = c + dc[direction];
            }
            r = nr; c = nc;
        }
        return result;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) for visited cells and output

## Optimized approach: shrink four boundaries

Traverse the current top, right, bottom, and left edges, shrinking each boundary after it is consumed.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix.length == 0 || matrix[0].length == 0) return result;
        int top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) result.add(matrix[top][c]);
            top++;
            for (int r = top; r <= bottom; r++) result.add(matrix[r][right]);
            right--;
            if (top <= bottom) {
                for (int c = right; c >= left; c--) result.add(matrix[bottom][c]);
                bottom--;
            }
            if (left <= right) {
                for (int r = bottom; r >= top; r--) result.add(matrix[r][left]);
                left++;
            }
        }
        return result;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) for the returned values`,

  "mx-rotate-90": `## Problem statement

Return a new square matrix rotated 90 degrees clockwise.

## Example

\`[[1, 2], [3, 4]]\` returns \`[[3, 1], [4, 2]]\`.

## Brute-force approach: write into a second matrix

An element at row r, column c moves to row c, column n-1-r.

\`\`\`java
public class Solution {
    public static int[][] rotateBruteForce(int[][] matrix) {
        int n = matrix.length;
        int[][] result = new int[n][n];
        for (int[] row : matrix) if (row.length != n) throw new IllegalArgumentException("Matrix must be square");
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) result[c][n - 1 - r] = matrix[r][c];
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n²)

## Optimized approach: transpose then reverse each row

Swap across the main diagonal, then reverse every row in place.

\`\`\`java
public class Solution {
    public static void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int[] row : matrix) if (row.length != n) throw new IllegalArgumentException("Matrix must be square");
        for (int r = 0; r < n; r++) {
            for (int c = r + 1; c < n; c++) {
                int temp = matrix[r][c]; matrix[r][c] = matrix[c][r]; matrix[c][r] = temp;
            }
        }
        for (int[] row : matrix) {
            for (int left = 0, right = n - 1; left < right; left++, right--) {
                int temp = row[left]; row[left] = row[right]; row[right] = temp;
            }
        }
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(1)`,

  "mx-transpose": `## Problem statement

Return the transpose of a rectangular matrix: rows become columns.

## Example

\`[[1, 2, 3], [4, 5, 6]]\` returns \`[[1, 4], [2, 5], [3, 6]]\`.

## Brute-force approach: append each column dynamically

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static int[][] transposeBruteForce(int[][] matrix) {
        if (matrix.length == 0) return new int[0][0];
        int columns = matrix[0].length;
        List<List<Integer>> values = new ArrayList<>();
        for (int c = 0; c < columns; c++) {
            List<Integer> row = new ArrayList<>();
            for (int[] source : matrix) row.add(source[c]);
            values.add(row);
        }
        int[][] result = new int[columns][matrix.length];
        for (int r = 0; r < columns; r++) for (int c = 0; c < matrix.length; c++) result[r][c] = values.get(r).get(c);
        return result;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) for temporary lists and result

## Optimized approach: allocate the transposed shape directly

Allocate n rows of m columns and copy each value to its transposed position.

\`\`\`java
public class Solution {
    public static int[][] transpose(int[][] matrix) {
        if (matrix.length == 0) return new int[0][0];
        int columns = matrix[0].length;
        int[][] result = new int[columns][matrix.length];
        for (int[] row : matrix) if (row.length != columns) throw new IllegalArgumentException("Matrix must be rectangular");
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < columns; c++) result[c][r] = matrix[r][c];
        }
        return result;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) for the returned matrix`,

  "mx-search-row-column-sorted": `## Problem statement

Search a target in a matrix where each row and each column is sorted ascending. Return true if present.

## Example

\`[[1, 4, 7], [2, 5, 8], [3, 6, 9]]\`, target 6 returns true.

## Brute-force approach: inspect every cell

\`\`\`java
public class Solution {
    public static boolean searchBruteForce(int[][] matrix, int target) {
        for (int[] row : matrix) for (int value : row) if (value == target) return true;
        return false;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(1)

## Optimized approach: staircase search

Start at the top-right. A value that is too large eliminates its column; one that is too small eliminates its row.

\`\`\`java
public class Solution {
    public static boolean searchMatrix(int[][] matrix, int target) {
        if (matrix.length == 0 || matrix[0].length == 0) return false;
        int rows = matrix.length, cols = matrix[0].length;
        for (int[] row : matrix) if (row.length != cols) throw new IllegalArgumentException("Matrix must be rectangular");
        int r = 0, c = cols - 1;
        while (r < rows && c >= 0) {
            if (matrix[r][c] == target) return true;
            if (matrix[r][c] > target) c--;
            else r++;
        }
        return false;
    }
}
\`\`\`

- **Time:** O(m + n)
- **Extra space:** O(1)`,

  "mx-search-fully-sorted": `## Problem statement

Search a target in a matrix whose rows are sorted and whose next row starts after the previous row ends. Return its row and column, or \`[-1, -1]\`.

## Example

\`[[1, 3, 5], [7, 9, 11]]\`, target 9 returns \`[1, 1]\`.

## Brute-force approach: scan all cells

\`\`\`java
public class Solution {
    public static int[] searchBruteForce(int[][] matrix, int target) {
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] == target) return new int[] {r, c};
            }
        }
        return new int[] {-1, -1};
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(1)

## Optimized approach: binary search the virtual flattened array

Map flat index x to row x / columns and column x % columns.

\`\`\`java
public class Solution {
    public static int[] searchMatrix(int[][] matrix, int target) {
        if (matrix.length == 0 || matrix[0].length == 0) return new int[] {-1, -1};
        int columns = matrix[0].length;
        for (int[] row : matrix) if (row.length != columns) throw new IllegalArgumentException("Matrix must be rectangular");
        int low = 0, high = matrix.length * columns - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int value = matrix[mid / columns][mid % columns];
            if (value == target) return new int[] {mid / columns, mid % columns};
            if (value < target) low = mid + 1;
            else high = mid - 1;
        }
        return new int[] {-1, -1};
    }
}
\`\`\`

- **Time:** O(log(mn))
- **Extra space:** O(1)`,

  "mx-set-matrix-zeroes": `## Problem statement

If any cell is zero, set its entire row and column to zero in place.

## Example

\`[[1, 1, 1], [1, 0, 1], [1, 1, 1]]\` becomes \`[[1, 0, 1], [0, 0, 0], [1, 0, 1]]\`.

## Brute-force approach: mark rows and columns separately

Record which rows and columns originally contain zero before changing the matrix.

\`\`\`java
public class Solution {
    public static void setZeroesBruteForce(int[][] matrix) {
        if (matrix.length == 0) return;
        int rows = matrix.length, cols = matrix[0].length;
        boolean[] zeroRows = new boolean[rows], zeroCols = new boolean[cols];
        for (int[] row : matrix) if (row.length != cols) throw new IllegalArgumentException("Matrix must be rectangular");
        for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {
            if (matrix[r][c] == 0) { zeroRows[r] = true; zeroCols[c] = true; }
        }
        for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {
            if (zeroRows[r] || zeroCols[c]) matrix[r][c] = 0;
        }
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(m + n)

## Optimized approach: use the first row and column as markers

Store marker state in the matrix itself, separately remembering whether the first row or first column originally had zero.

\`\`\`java
public class Solution {
    public static void setZeroes(int[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) return;
        int rows = matrix.length, cols = matrix[0].length;
        boolean firstRowZero = false, firstColZero = false;
        for (int[] row : matrix) if (row.length != cols) throw new IllegalArgumentException("Matrix must be rectangular");
        for (int c = 0; c < cols; c++) if (matrix[0][c] == 0) firstRowZero = true;
        for (int r = 0; r < rows; r++) if (matrix[r][0] == 0) firstColZero = true;
        for (int r = 1; r < rows; r++) for (int c = 1; c < cols; c++) {
            if (matrix[r][c] == 0) { matrix[r][0] = 0; matrix[0][c] = 0; }
        }
        for (int r = 1; r < rows; r++) for (int c = 1; c < cols; c++) {
            if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;
        }
        if (firstRowZero) for (int c = 0; c < cols; c++) matrix[0][c] = 0;
        if (firstColZero) for (int r = 0; r < rows; r++) matrix[r][0] = 0;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(1)`,

  "mx-diagonal-sums": `## Problem statement

For a square matrix, return the primary and secondary diagonal sums. Count the center cell only once in the combined sum.

## Example

\`[[1, 2, 3], [4, 5, 6], [7, 8, 9]]\` returns primary 15, secondary 15, total 25.

## Brute-force approach: traverse each diagonal separately

\`\`\`java
public class Solution {
    public static long[] diagonalSumsBruteForce(int[][] matrix) {
        int n = matrix.length;
        long primary = 0, secondary = 0;
        for (int[] row : matrix) if (row.length != n) throw new IllegalArgumentException("Matrix must be square");
        for (int i = 0; i < n; i++) primary += matrix[i][i];
        for (int i = 0; i < n; i++) secondary += matrix[i][n - 1 - i];
        return new long[] {primary, secondary, primary + secondary - (n % 2 == 1 ? matrix[n / 2][n / 2] : 0)};
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1), excluding the three-value result

## Optimized approach: compute both sums in one pass

At each row, add both diagonal cells and subtract the center once when the matrix size is odd.

\`\`\`java
public class Solution {
    public static long[] diagonalSums(int[][] matrix) {
        int n = matrix.length;
        long primary = 0, secondary = 0;
        for (int[] row : matrix) if (row.length != n) throw new IllegalArgumentException("Matrix must be square");
        for (int i = 0; i < n; i++) {
            primary += matrix[i][i];
            secondary += matrix[i][n - 1 - i];
        }
        long total = primary + secondary - (n % 2 == 1 ? matrix[n / 2][n / 2] : 0);
        return new long[] {primary, secondary, total};
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1), excluding the three-value result`,

  "mx-boundary-traversal": `## Problem statement

Return the boundary values of a rectangular matrix in clockwise order, without repeating corners. Handle a single row or column without duplicates.

## Example

\`[[1, 2, 3], [4, 5, 6], [7, 8, 9]]\` returns \`[1, 2, 3, 6, 9, 8, 7, 4]\`.

## Brute-force approach: inspect every cell's boundary status

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> boundaryBruteForce(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix.length == 0 || matrix[0].length == 0) return result;
        int rows = matrix.length, cols = matrix[0].length;
        for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {
            if (r == 0 || r == rows - 1 || c == 0 || c == cols - 1) result.add(matrix[r][c]);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(m + n) for the boundary output

## Optimized approach: walk the four edges

Traverse top, right, bottom in reverse, and left in reverse while guarding single-row and single-column cases.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> boundary(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix.length == 0 || matrix[0].length == 0) return result;
        int rows = matrix.length, cols = matrix[0].length;
        for (int c = 0; c < cols; c++) result.add(matrix[0][c]);
        for (int r = 1; r < rows; r++) result.add(matrix[r][cols - 1]);
        if (rows > 1) for (int c = cols - 2; c >= 0; c--) result.add(matrix[rows - 1][c]);
        if (cols > 1) for (int r = rows - 2; r > 0; r--) result.add(matrix[r][0]);
        return result;
    }
}
\`\`\`

- **Time:** O(m + n)
- **Extra space:** O(m + n) for the returned boundary`,

  "mx-count-islands": `## Problem statement

Count four-directionally connected groups of land cells. The input grid contains '1' for land and '0' for water and is not modified.

## Example

\`[["1","1","0"], ["0","1","0"], ["1","0","1"]]\` returns 3.

## Brute-force approach: visited matrix with recursive flood fill

\`\`\`java
public class Solution {
    public static int countIslandsBruteForce(char[][] grid) {
        if (grid.length == 0) return 0;
        int rows = grid.length, cols = grid[0].length, islands = 0;
        boolean[][] seen = new boolean[rows][cols];
        for (char[] row : grid) if (row.length != cols) throw new IllegalArgumentException("Grid must be rectangular");
        for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1' && !seen[r][c]) { islands++; visit(grid, seen, r, c); }
        }
        return islands;
    }

    private static void visit(char[][] g, boolean[][] seen, int r, int c) {
        if (r < 0 || r >= g.length || c < 0 || c >= g[0].length || seen[r][c] || g[r][c] != '1') return;
        seen[r][c] = true;
        visit(g, seen, r + 1, c); visit(g, seen, r - 1, c);
        visit(g, seen, r, c + 1); visit(g, seen, r, c - 1);
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) for visited cells and recursion

## Optimized approach: mark discovered land in place

Use the grid as the visited marker to avoid allocating a second matrix. This version modifies the grid.

\`\`\`java
public class Solution {
    public static int countIslands(char[][] grid) {
        if (grid.length == 0) return 0;
        int cols = grid[0].length, islands = 0;
        for (char[] row : grid) if (row.length != cols) throw new IllegalArgumentException("Grid must be rectangular");
        for (int r = 0; r < grid.length; r++) for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') { islands++; sink(grid, r, c); }
        }
        return islands;
    }

    private static void sink(char[][] g, int r, int c) {
        if (r < 0 || r >= g.length || c < 0 || c >= g[0].length || g[r][c] != '1') return;
        g[r][c] = '0';
        sink(g, r + 1, c); sink(g, r - 1, c);
        sink(g, r, c + 1); sink(g, r, c - 1);
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) worst-case recursion; O(1) visited storage`,

  "mx-maximum-island-area": `## Problem statement

Return the largest four-directionally connected land area in a binary grid. Return zero when there is no land.

## Example

\`[[0, 0, 1], [1, 1, 1]]\` returns 4.

## Brute-force approach: flood fill with a visited matrix

\`\`\`java
public class Solution {
    public static int maxAreaBruteForce(int[][] grid) {
        if (grid.length == 0) return 0;
        int rows = grid.length, cols = grid[0].length, best = 0;
        boolean[][] seen = new boolean[rows][cols];
        for (int[] row : grid) if (row.length != cols) throw new IllegalArgumentException("Grid must be rectangular");
        for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1 && !seen[r][c]) best = Math.max(best, area(grid, seen, r, c));
        }
        return best;
    }

    private static int area(int[][] g, boolean[][] seen, int r, int c) {
        if (r < 0 || r >= g.length || c < 0 || c >= g[0].length || seen[r][c] || g[r][c] != 1) return 0;
        seen[r][c] = true;
        return 1 + area(g, seen, r + 1, c) + area(g, seen, r - 1, c)
                + area(g, seen, r, c + 1) + area(g, seen, r, c - 1);
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) for visited cells and recursion

## Optimized approach: mark each island in place

After visiting a land cell, change it to water so it is never counted again. This version modifies the grid.

\`\`\`java
public class Solution {
    public static int maxAreaOfIsland(int[][] grid) {
        if (grid.length == 0) return 0;
        int cols = grid[0].length, best = 0;
        for (int[] row : grid) if (row.length != cols) throw new IllegalArgumentException("Grid must be rectangular");
        for (int r = 0; r < grid.length; r++) for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) best = Math.max(best, area(grid, r, c));
        }
        return best;
    }

    private static int area(int[][] g, int r, int c) {
        if (r < 0 || r >= g.length || c < 0 || c >= g[0].length || g[r][c] != 1) return 0;
        g[r][c] = 0;
        return 1 + area(g, r + 1, c) + area(g, r - 1, c)
                + area(g, r, c + 1) + area(g, r, c - 1);
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) worst-case recursion; O(1) visited storage`,

  "mx-flood-fill": `## Problem statement

Starting at a cell, recolor its four-directionally connected region having the same original color. Return a new image and leave the input unchanged.

## Example

\`[[1, 1, 1], [1, 1, 0]]\`, start (0, 0), new color 2 returns \`[[2, 2, 2], [2, 2, 0]]\`.

## Brute-force approach: breadth-first search with visited cells

\`\`\`java
import java.util.ArrayDeque;
import java.util.Queue;

public class Solution {
    public static int[][] floodFillBruteForce(int[][] image, int sr, int sc, int color) {
        int[][] result = copy(image);
        if (image.length == 0 || sr < 0 || sr >= image.length || sc < 0 || sc >= image[0].length) return result;
        int original = result[sr][sc];
        if (original == color) return result;
        boolean[][] seen = new boolean[result.length][result[0].length];
        Queue<int[]> queue = new ArrayDeque<>();
        queue.add(new int[] {sr, sc}); seen[sr][sc] = true;
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};
        while (!queue.isEmpty()) {
            int[] cell = queue.remove();
            result[cell[0]][cell[1]] = color;
            for (int d = 0; d < 4; d++) {
                int r = cell[0] + dr[d], c = cell[1] + dc[d];
                if (r >= 0 && r < result.length && c >= 0 && c < result[0].length
                        && !seen[r][c] && result[r][c] == original) {
                    seen[r][c] = true; queue.add(new int[] {r, c});
                }
            }
        }
        return result;
    }

    private static int[][] copy(int[][] image) {
        int[][] result = new int[image.length][];
        for (int i = 0; i < image.length; i++) result[i] = image[i].clone();
        return result;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn), including the copied image

## Optimized approach: depth-first recolor on the copied image

The recolored value also marks visited cells, so no separate visited matrix is needed.

\`\`\`java
public class Solution {
    public static int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int[][] result = new int[image.length][];
        for (int i = 0; i < image.length; i++) result[i] = image[i].clone();
        if (result.length == 0 || sr < 0 || sr >= result.length || sc < 0 || sc >= result[0].length) return result;
        int original = result[sr][sc];
        if (original != color) fill(result, sr, sc, original, color);
        return result;
    }

    private static void fill(int[][] image, int r, int c, int oldColor, int newColor) {
        if (r < 0 || r >= image.length || c < 0 || c >= image[0].length || image[r][c] != oldColor) return;
        image[r][c] = newColor;
        fill(image, r + 1, c, oldColor, newColor); fill(image, r - 1, c, oldColor, newColor);
        fill(image, r, c + 1, oldColor, newColor); fill(image, r, c - 1, oldColor, newColor);
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn) for copied image and recursion`,

  "mx-shortest-path-binary-maze": `## Problem statement

Find the shortest four-directional path from source to destination in a grid where 1 is open and 0 is blocked. Count visited cells in the path, including both endpoints; return -1 if unreachable.

## Example

\`[[1, 1, 0], [0, 1, 1]]\`, source (0, 0), destination (1, 2) returns 4.

## Brute-force approach: explore all simple paths

Backtrack over unvisited open neighbors and keep the shortest path found.

\`\`\`java
public class Solution {
    public static int shortestPathBruteForce(int[][] grid, int sr, int sc, int dr, int dc) {
        if (!open(grid, sr, sc) || !open(grid, dr, dc)) return -1;
        boolean[][] seen = new boolean[grid.length][grid[0].length];
        int result = dfs(grid, sr, sc, dr, dc, seen, 1);
        return result == Integer.MAX_VALUE ? -1 : result;
    }

    private static int dfs(int[][] g, int r, int c, int dr, int dc, boolean[][] seen, int length) {
        if (r == dr && c == dc) return length;
        seen[r][c] = true;
        int best = Integer.MAX_VALUE;
        int[] rows = {1, -1, 0, 0}, cols = {0, 0, 1, -1};
        for (int i = 0; i < 4; i++) {
            int nr = r + rows[i], nc = c + cols[i];
            if (open(g, nr, nc) && !seen[nr][nc]) best = Math.min(best, dfs(g, nr, nc, dr, dc, seen, length + 1));
        }
        seen[r][c] = false;
        return best;
    }

    private static boolean open(int[][] g, int r, int c) {
        return g.length > 0 && r >= 0 && r < g.length && c >= 0 && c < g[0].length && g[r][c] == 1;
    }
}
\`\`\`

- **Time:** O(4^(mn)) worst case
- **Extra space:** O(mn) for visited cells and recursion

## Optimized approach: breadth-first search

BFS explores cells in increasing distance, so the first visit to the destination is shortest.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Queue;

public class Solution {
    public static int shortestPath(int[][] grid, int sr, int sc, int dr, int dc) {
        if (grid.length == 0 || grid[0].length == 0 || !open(grid, sr, sc) || !open(grid, dr, dc)) return -1;
        int[][] distance = new int[grid.length][grid[0].length];
        Queue<int[]> queue = new ArrayDeque<>();
        queue.add(new int[] {sr, sc}); distance[sr][sc] = 1;
        int[] rows = {1, -1, 0, 0}, cols = {0, 0, 1, -1};
        while (!queue.isEmpty()) {
            int[] cell = queue.remove();
            if (cell[0] == dr && cell[1] == dc) return distance[dr][dc];
            for (int i = 0; i < 4; i++) {
                int r = cell[0] + rows[i], c = cell[1] + cols[i];
                if (open(grid, r, c) && distance[r][c] == 0) {
                    distance[r][c] = distance[cell[0]][cell[1]] + 1;
                    queue.add(new int[] {r, c});
                }
            }
        }
        return -1;
    }

    private static boolean open(int[][] g, int r, int c) {
        return r >= 0 && r < g.length && c >= 0 && c < g[0].length && g[r][c] == 1;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(mn)`,

  "mx-unique-paths": `## Problem statement

Count paths from the top-left to bottom-right of an m by n grid using only right and down moves. Assume positive dimensions.

## Example

3 rows and 7 columns return 28.

## Brute-force approach: enumerate paths recursively

\`\`\`java
public class Solution {
    public static long uniquePathsBruteForce(int rows, int cols) {
        if (rows <= 0 || cols <= 0) return 0;
        return count(rows - 1, cols - 1);
    }

    private static long count(int down, int right) {
        if (down == 0 || right == 0) return 1;
        return count(down - 1, right) + count(down, right - 1);
    }
}
\`\`\`

- **Time:** O(2^(m+n))
- **Extra space:** O(m+n) recursion

## Optimized approach: one-dimensional dynamic programming

For each cell, the number of paths is the sum from above and from the left.

\`\`\`java
public class Solution {
    public static long uniquePaths(int rows, int cols) {
        if (rows <= 0 || cols <= 0) return 0;
        long[] paths = new long[cols];
        java.util.Arrays.fill(paths, 1);
        for (int r = 1; r < rows; r++) {
            for (int c = 1; c < cols; c++) paths[c] += paths[c - 1];
        }
        return paths[cols - 1];
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(n)`,

  "mx-unique-paths-obstacles": `## Problem statement

Count right-and-down paths from the top-left to bottom-right while avoiding cells marked 1. Cells marked 0 are open.

## Example

\`[[0, 0, 0], [0, 1, 0], [0, 0, 0]]\` returns 2.

## Brute-force approach: recursively try both moves

\`\`\`java
public class Solution {
    public static long pathsBruteForce(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) return 0;
        return count(grid, 0, 0);
    }

    private static long count(int[][] g, int r, int c) {
        if (r >= g.length || c >= g[0].length || g[r][c] == 1) return 0;
        if (r == g.length - 1 && c == g[0].length - 1) return 1;
        return count(g, r + 1, c) + count(g, r, c + 1);
    }
}
\`\`\`

- **Time:** O(2^(m+n))
- **Extra space:** O(m+n) recursion

## Optimized approach: one-dimensional dynamic programming

Keep the number of paths reaching each column; an obstacle resets that column's count.

\`\`\`java
public class Solution {
    public static long uniquePathsWithObstacles(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) return 0;
        int cols = grid[0].length;
        long[] paths = new long[cols];
        paths[0] = grid[0][0] == 0 ? 1 : 0;
        for (int[] row : grid) {
            if (row.length != cols) throw new IllegalArgumentException("Grid must be rectangular");
            for (int c = 0; c < cols; c++) {
                if (row[c] == 1) paths[c] = 0;
                else if (c > 0) paths[c] += paths[c - 1];
            }
        }
        return paths[cols - 1];
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(n)`,

  "mx-minimum-path-sum": `## Problem statement

Find the minimum sum of a path from the top-left to bottom-right, moving only right or down.

## Example

\`[[1, 3, 1], [1, 5, 1], [4, 2, 1]]\` returns 7.

## Brute-force approach: recursively try both moves

\`\`\`java
public class Solution {
    public static long minPathBruteForce(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) throw new IllegalArgumentException("Grid must not be empty");
        return minimum(grid, 0, 0);
    }

    private static long minimum(int[][] g, int r, int c) {
        if (r == g.length - 1 && c == g[0].length - 1) return g[r][c];
        long down = r + 1 < g.length ? minimum(g, r + 1, c) : Long.MAX_VALUE;
        long right = c + 1 < g[0].length ? minimum(g, r, c + 1) : Long.MAX_VALUE;
        return g[r][c] + Math.min(down, right);
    }
}
\`\`\`

- **Time:** O(2^(m+n))
- **Extra space:** O(m+n) recursion

## Optimized approach: one-dimensional dynamic programming

Reuse one row of costs, choosing the smaller of the path from above and from the left.

\`\`\`java
public class Solution {
    public static long minPathSum(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) throw new IllegalArgumentException("Grid must not be empty");
        int cols = grid[0].length;
        long[] cost = new long[cols];
        java.util.Arrays.fill(cost, Long.MAX_VALUE);
        cost[0] = 0;
        for (int[] row : grid) {
            if (row.length != cols) throw new IllegalArgumentException("Grid must be rectangular");
            for (int c = 0; c < cols; c++) {
                long fromLeft = c == 0 ? Long.MAX_VALUE : cost[c - 1];
                cost[c] = row[c] + Math.min(cost[c], fromLeft);
            }
        }
        return cost[cols - 1];
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(n)`,

  "mx-word-search-grid": `## Problem statement

Return whether a word can be formed from adjacent horizontal or vertical cells without reusing a cell.

## Example

Board \`[["A","B","C"], ["S","F","C"], ["A","D","E"]]\`, word \`"ABCCED"\` returns true.

## Brute-force approach: backtrack with a visited matrix

Try each matching start and recursively explore each unused neighboring cell.

\`\`\`java
public class Solution {
    public static boolean existBruteForce(char[][] board, String word) {
        if (word.isEmpty()) return true;
        if (board.length == 0 || board[0].length == 0) return false;
        boolean[][] used = new boolean[board.length][board[0].length];
        for (int r = 0; r < board.length; r++) for (int c = 0; c < board[0].length; c++) {
            if (search(board, word, r, c, 0, used)) return true;
        }
        return false;
    }

    private static boolean search(char[][] b, String w, int r, int c, int i, boolean[][] used) {
        if (i == w.length()) return true;
        if (r < 0 || r >= b.length || c < 0 || c >= b[0].length || used[r][c] || b[r][c] != w.charAt(i)) return false;
        used[r][c] = true;
        boolean found = search(b, w, r + 1, c, i + 1, used) || search(b, w, r - 1, c, i + 1, used)
                || search(b, w, r, c + 1, i + 1, used) || search(b, w, r, c - 1, i + 1, used);
        used[r][c] = false;
        return found;
    }
}
\`\`\`

- **Time:** O(mn * 4^L), where L is word length
- **Extra space:** O(mn) visited plus O(L) recursion

## Optimized approach: in-place backtracking with frequency pruning

Reject words whose character counts exceed the board, then temporarily mark visited cells in the board.

\`\`\`java
public class Solution {
    public static boolean exist(char[][] board, String word) {
        if (word.isEmpty()) return true;
        if (board.length == 0 || board[0].length == 0) return false;
        int cols = board[0].length;
        int[] available = new int[Character.MAX_VALUE + 1];
        for (char[] row : board) {
            if (row.length != cols) throw new IllegalArgumentException("Board must be rectangular");
            for (char ch : row) available[ch]++;
        }
        int[] needed = new int[available.length];
        for (char ch : word.toCharArray()) if (++needed[ch] > available[ch]) return false;
        for (int r = 0; r < board.length; r++) for (int c = 0; c < cols; c++) {
            if (search(board, word, r, c, 0)) return true;
        }
        return false;
    }

    private static boolean search(char[][] b, String w, int r, int c, int i) {
        if (r < 0 || r >= b.length || c < 0 || c >= b[0].length || b[r][c] != w.charAt(i)) return false;
        if (i == w.length() - 1) return true;
        char original = b[r][c];
        b[r][c] = '\\0';
        boolean found = search(b, w, r + 1, c, i + 1) || search(b, w, r - 1, c, i + 1)
                || search(b, w, r, c + 1, i + 1) || search(b, w, r, c - 1, i + 1);
        b[r][c] = original;
        return found;
    }
}
\`\`\`

- **Time:** O(mn * 4^L) worst case
- **Extra space:** O(L) recursion plus fixed-size character counts`,

  "mx-rotate-image-in-place": `## Problem statement

Rotate an n by n image 90 degrees clockwise in place.

## Example

\`[[1, 2], [3, 4]]\` becomes \`[[3, 1], [4, 2]]\`.

## Brute-force approach: rotate into a new matrix then copy back

\`\`\`java
public class Solution {
    public static void rotateBruteForce(int[][] image) {
        int n = image.length;
        for (int[] row : image) if (row.length != n) throw new IllegalArgumentException("Image must be square");
        int[][] rotated = new int[n][n];
        for (int r = 0; r < n; r++) for (int c = 0; c < n; c++) rotated[c][n - 1 - r] = image[r][c];
        for (int r = 0; r < n; r++) System.arraycopy(rotated[r], 0, image[r], 0, n);
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(n²)

## Optimized approach: transpose and reverse rows

Transpose the image in place, then reverse every row.

\`\`\`java
public class Solution {
    public static void rotate(int[][] image) {
        int n = image.length;
        for (int[] row : image) if (row.length != n) throw new IllegalArgumentException("Image must be square");
        for (int r = 0; r < n; r++) for (int c = r + 1; c < n; c++) {
            int temp = image[r][c]; image[r][c] = image[c][r]; image[c][r] = temp;
        }
        for (int[] row : image) for (int left = 0, right = n - 1; left < right; left++, right--) {
            int temp = row[left]; row[left] = row[right]; row[right] = temp;
        }
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(1)`,

  "mx-largest-square-ones": `## Problem statement

Return the area of the largest square containing only 1s in a binary matrix.

## Example

\`[[1, 0, 1, 0, 0], [1, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 0, 0, 1, 0]]\` returns 4.

## Brute-force approach: test every square

For each top-left corner and side length, inspect all cells and track the largest valid square.

\`\`\`java
public class Solution {
    public static int maximalSquareBruteForce(char[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) return 0;
        int rows = matrix.length, cols = matrix[0].length, best = 0;
        for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {
            for (int side = 1; r + side <= rows && c + side <= cols; side++) {
                boolean allOnes = true;
                for (int i = r; i < r + side && allOnes; i++) {
                    for (int j = c; j < c + side; j++) if (matrix[i][j] != '1') { allOnes = false; break; }
                }
                if (allOnes) best = Math.max(best, side * side);
            }
        }
        return best;
    }
}
\`\`\`

- **Time:** O(mn * min(m,n)^3) in the straightforward cell-checking bound
- **Extra space:** O(1)

## Optimized approach: dynamic programming with one row

For a cell containing 1, its largest square is one plus the minimum of the top, left, and top-left square sizes.

\`\`\`java
public class Solution {
    public static int maximalSquare(char[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) return 0;
        int rows = matrix.length, cols = matrix[0].length, best = 0;
        int[] dp = new int[cols + 1];
        for (int r = 1; r <= rows; r++) {
            int diagonal = 0;
            for (int c = 1; c <= cols; c++) {
                int above = dp[c];
                if (matrix[r - 1][c - 1] == '1') {
                    dp[c] = 1 + Math.min(diagonal, Math.min(dp[c - 1], dp[c]));
                    best = Math.max(best, dp[c]);
                } else dp[c] = 0;
                diagonal = above;
            }
        }
        return best * best;
    }
}
\`\`\`

- **Time:** O(mn)
- **Extra space:** O(n)`
};
