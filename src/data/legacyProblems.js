
export const legacyProblems = [
  {
    id: "find-largest-element",
    title: "Find the Largest Element in an Array",
    topicId: "arrays",
    patternId: "traversal",
    difficulty: "Easy",
    description:
      "Given a non-empty integer array, find and return the largest element.",

    examples: [
      {
        input: "[10, 25, 8, 40, 15]",
        output: "40",
        explanation: "40 is the largest element."
      },
      {
        input: "[-5, -2, -10]",
        output: "-2",
        explanation: "-2 is the largest element."
      }
    ],

    constraints: [
      "The array contains at least one element.",
      "Elements may be positive, negative, or zero."
    ],

    solutions: {
      bruteForce: {
        title: "Brute Force — Sorting",
        explanation:
          "Sort a copy of the array and return its last element.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        code: `import java.util.Arrays;

public class Solution {

    public static int largest(int[] arr) {
        if (arr == null || arr.length == 0) {
            throw new IllegalArgumentException(
                "Array must not be empty"
            );
        }

        int[] copy = arr.clone();
        Arrays.sort(copy);

        return copy[copy.length - 1];
    }
}`
      },

      optimized: {
        title: "Optimized — Single Traversal",
        explanation:
          "Initialize the maximum with the first element and update it whenever a larger value is found.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `public class Solution {

    public static int largest(int[] arr) {
        if (arr == null || arr.length == 0) {
            throw new IllegalArgumentException(
                "Array must not be empty"
            );
        }

        int max = arr[0];

        for (int num : arr) {
            if (num > max) {
                max = num;
            }
        }

        return max;
    }
}`
      }
    },

    dryRun: [
      { element: 10, maximum: 10 },
      { element: 25, maximum: 25 },
      { element: 8, maximum: 25 },
      { element: 40, maximum: 40 },
      { element: 15, maximum: 40 }
    ]
  },

  {
    id: "reverse-array",
    title: "Reverse an Array",
    topicId: "arrays",
    patternId: "traversal",
    difficulty: "Easy",
    description:
      "Given an integer array, reverse its elements in place.",

    examples: [
      {
        input: "[1, 2, 3, 4, 5]",
        output: "[5, 4, 3, 2, 1]",
        explanation: "The order of elements is reversed."
      }
    ],

    constraints: [
      "Modify the original array.",
      "Use constant extra space for the optimized solution."
    ],

    solutions: {
      bruteForce: {
        title: "Brute Force — Temporary Array",
        explanation:
          "Create a reversed copy and copy its values back to the original array.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        code: `public class Solution {

    public static void reverse(int[] arr) {
        int n = arr.length;
        int[] temp = new int[n];

        for (int i = 0; i < n; i++) {
            temp[i] = arr[n - 1 - i];
        }

        System.arraycopy(temp, 0, arr, 0, n);
    }
}`
      },

      optimized: {
        title: "Optimized — Two Pointers",
        explanation:
          "Swap elements at the left and right ends, moving inward until the pointers meet.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `public class Solution {

    public static void reverse(int[] arr) {
        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            left++;
            right--;
        }
    }
}`
      }
    },

    dryRun: [
      {
        element: "Swap 1 and 5",
        maximum: "[5,2,3,4,1]"
      },
      {
        element: "Swap 2 and 4",
        maximum: "[5,4,3,2,1]"
      }
    ]
  }
];
