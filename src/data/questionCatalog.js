import { workedQuestionIds } from "./workedQuestionIds.js";

function createQuestions(topicId, patternId, entries) {
  return entries.map(([id, title, difficulty, description]) => ({
    id,
    title,
    topicId,
    patternId,
    difficulty,
    description,
    contentType: "markdown",
    contentStatus: workedQuestionIds.has(id) ? "complete" : "draft",
    content: workedQuestionIds.has(id) ? undefined : `## Problem Statement

${description}

## Task

Write a Java solution for this problem. Explain the approach and analyze its time and extra-space complexity.`
  }));
}

export const questionCatalog = [
  ...createQuestions("basics", "basic-programming-number-problems", [
    ["check-even-or-odd", "Check Whether a Number Is Even or Odd", "Easy", "Given an integer, determine whether it is even or odd. Handle zero and negative integers correctly."],
    ["check-prime-number", "Check Whether a Number Is Prime", "Easy", "Given an integer n, determine whether n is a prime number. A prime number is greater than 1 and has exactly two positive divisors."],
    ["print-primes-in-range", "Print All Prime Numbers in a Given Range", "Medium", "Given inclusive integer bounds low and high, print every prime number in that range in increasing order."],
    ["factorial-of-number", "Find the Factorial of a Number", "Easy", "Given a non-negative integer n, calculate n! as the product of all positive integers from 1 through n. Define 0! as 1."],
    ["generate-fibonacci-sequence", "Generate the Fibonacci Sequence", "Easy", "Given n, print the first n Fibonacci numbers, starting with 0 and 1. Return an empty sequence when n is zero."],
    ["palindrome-number", "Check Whether a Number Is a Palindrome", "Easy", "Given an integer, determine whether its decimal representation reads the same forward and backward. Negative numbers are not palindromes."],
    ["reverse-integer", "Reverse an Integer", "Easy", "Given an integer, reverse its decimal digits while preserving its sign. If the reversed value overflows the signed 32-bit integer range, report that it is out of range."],
    ["armstrong-number", "Check Whether a Number Is an Armstrong Number", "Medium", "Given a non-negative integer, determine whether it equals the sum of its digits, each raised to the number of digits."],
    ["sum-of-digits", "Find the Sum of Digits of a Number", "Easy", "Given an integer, return the sum of the digits in its decimal representation, ignoring its sign."],
    ["count-digits", "Count the Digits of a Number", "Easy", "Given an integer, return the number of digits in its decimal representation. Treat zero as a one-digit number."],
    ["gcd-and-lcm", "Find the GCD and LCM of Two Numbers", "Medium", "Given two integers, calculate their greatest common divisor and least common multiple. Use non-negative results and define the LCM as zero if either input is zero."],
    ["perfect-number", "Check Whether a Number Is a Perfect Number", "Medium", "Given a positive integer n, determine whether it equals the sum of its positive divisors excluding itself."],
    ["power-of-two", "Check Whether a Number Is a Power of Two", "Easy", "Given an integer n, determine whether n is a positive power of two."],
    ["decimal-to-binary", "Convert Decimal to Binary", "Easy", "Given a non-negative decimal integer, return its binary representation without leading zeroes, except that zero is represented as 0."],
    ["binary-to-decimal", "Convert Binary to Decimal", "Easy", "Given a string containing only 0s and 1s, convert it to its decimal integer value."],
    ["greatest-of-three", "Find the Greatest of Three Numbers", "Easy", "Given three integers, return the greatest value. The inputs may contain ties or negative numbers."],
    ["swap-without-temporary", "Swap Two Numbers Without a Temporary Variable", "Easy", "Given two integer variables, swap their values without declaring a third variable. Use an approach that does not risk arithmetic overflow."],
    ["integer-square-root-binary-search", "Find the Square Root Using Binary Search", "Medium", "Given a non-negative integer n, return the floor of its square root using binary search, without calling a built-in square-root function."],
    ["fast-exponentiation", "Calculate a Power Using Fast Exponentiation", "Medium", "Given an integer base and a non-negative integer exponent, calculate base raised to that exponent using exponentiation by squaring."],
    ["number-and-star-patterns", "Print Number and Star Patterns Using Nested Loops", "Easy", "Given a positive row count n, print a right-aligned star triangle and an increasing-number triangle, each with n rows, using nested loops."]
  ]),
  ...createQuestions("arrays", "traversal", [
    ["smallest-and-second-smallest-elements", "Find the Smallest and Second-Smallest Elements", "Easy", "Given an integer array, find its smallest and second-smallest distinct values. Define what should be returned if fewer than two distinct values exist."],
    ["check-array-sorted", "Check Whether an Array Is Sorted", "Easy", "Given an integer array, determine whether it is sorted in non-decreasing order."],
    ["remove-duplicates-sorted-array", "Remove Duplicates from a Sorted Array", "Easy", "Given a sorted integer array, remove duplicate values in place and return the number of distinct elements. Preserve their order."],
    ["move-zeroes-to-end", "Move All Zeroes to the End", "Easy", "Move every zero in an integer array to the end while preserving the relative order of non-zero values. Perform the operation in place."],
    ["move-negative-numbers-to-one-side", "Move All Negative Numbers to One Side", "Easy", "Rearrange an integer array so all negative values appear before all non-negative values. The relative order within each group does not need to be preserved."],
    ["left-rotate-array-one-position", "Left-Rotate an Array by One Position", "Easy", "Rotate an array one position to the left: move its first element to the end while preserving the order of the remaining elements."],
    ["rotate-array-by-k-positions", "Rotate an Array by Positions", "Medium", "Given an array and a non-negative integer k, rotate the array to the left by k positions. Handle k values larger than the array length."],
    ["missing-number-from-one-to-n", "Find the Missing Number from 1 to n", "Easy", "An array contains n - 1 distinct values from the range 1 through n. Find the one missing value."],
    ["find-duplicate-number", "Find a Duplicate Number in an Array", "Easy", "Given an array containing n + 1 integers where each integer is in the range 1 through n, find a value that occurs more than once."],
    ["find-all-duplicate-elements", "Find All Duplicate Elements", "Medium", "Given an integer array, return each distinct value that appears more than once. Return duplicate values only once."],
    ["find-elements-appearing-once", "Find All Elements That Appear Only Once", "Easy", "Given an integer array, return all values whose frequency is exactly one, preserving their original order."],
    ["most-frequent-element", "Find the Element Occurring Most Frequently", "Easy", "Given a non-empty integer array, return the value with the highest frequency. If there is a tie, return the smallest tied value."],
    ["majority-element", "Find the Majority Element", "Easy", "Given an array, find the value that appears more than floor(n / 2) times, or report that no majority element exists."],
    ["leaders-in-array", "Find All Leaders in an Array", "Easy", "An element is a leader if it is greater than or equal to every element to its right. Return all leaders in their original order; the last element is a leader."],
    ["equilibrium-index", "Find the Equilibrium Index", "Medium", "Find an index where the sum of values strictly to its left equals the sum strictly to its right. Return the first such index, or -1 if none exists."],
    ["maximum-later-difference", "Find the Maximum Difference with the Larger Element Later", "Medium", "Given an integer array, maximize arr[j] - arr[i] subject to j > i. Report that no positive difference exists if the constraint cannot be satisfied with a positive result."],
    ["maximum-consecutive-ones", "Find the Maximum Consecutive Ones", "Easy", "Given a binary array, return the length of its longest contiguous run of 1s."],
    ["union-of-two-sorted-arrays", "Find the Union of Two Sorted Arrays", "Easy", "Given two sorted integer arrays, return their union as a sorted array without duplicate values."],
    ["intersection-of-two-arrays", "Find the Intersection of Two Arrays", "Easy", "Given two integer arrays, return the distinct values present in both arrays."],
    ["merge-two-sorted-arrays", "Merge Two Sorted Arrays", "Easy", "Given two arrays sorted in non-decreasing order, merge them into one sorted array."],
    ["alternating-positive-negative-array", "Rearrange an Array in Alternating Positive and Negative Order", "Medium", "Rearrange an array so positive and negative values alternate, beginning with a positive value. Preserve relative order where possible and append any values that cannot be paired."],
    ["sort-zero-one-two", "Sort an Array Containing 0s, 1s, and 2s", "Medium", "Sort an array containing only 0, 1, and 2 in non-decreasing order, preferably in one pass and without using a comparison sort."],
    ["next-permutation", "Find the Next Permutation", "Medium", "Rearrange the numbers into the next lexicographically greater permutation. If no greater permutation exists, rearrange them into ascending order."],
    ["previous-permutation", "Find the Previous Permutation", "Medium", "Rearrange the numbers into the previous lexicographically smaller permutation. If no smaller permutation exists, rearrange them into descending order."],
    ["longest-consecutive-sequence", "Find the Longest Consecutive Sequence", "Medium", "Given an unsorted integer array, return the length of the longest sequence of consecutive values. The values need not be adjacent in the input."],
    ["maximum-product-of-two-elements", "Find the Maximum Product of Two Elements", "Easy", "Given an integer array with at least two elements, return the maximum product obtainable from any two distinct positions."],
    ["product-of-array-except-self", "Find the Product of an Array Except Self", "Medium", "For each array position, return the product of all other values without using division. Aim for linear time and constant extra space apart from the output."]
  ]),
  ...createQuestions("arrays", "hashing", [
    ["two-sum", "Two Sum", "Easy", "Given an integer array and a target, return the indices of two distinct elements whose values add to the target. Assume exactly one valid answer exists."],
    ["frequency-of-every-element", "Count the Frequency of Every Element", "Easy", "Given an integer array, count how many times each distinct value occurs."],
    ["first-repeating-element", "Find the First Repeating Element", "Easy", "Return the value whose first occurrence has the smallest index among values that appear more than once. Return -1 if no value repeats."],
    ["first-non-repeating-element", "Find the First Non-Repeating Element", "Easy", "Return the first array value whose frequency is one. Return -1 if every value repeats."],
    ["all-pairs-with-given-sum", "Find All Pairs with a Given Sum", "Easy", "Given an array and target sum, return all distinct value-pairs whose values add to the target. Do not list the same value-pair more than once."],
    ["all-pairs-with-given-difference", "Find All Pairs with a Given Difference", "Easy", "Given an array and a non-negative integer k, return all distinct value-pairs whose absolute difference is k. Do not list duplicate pairs."],
    ["count-pairs-with-given-sum", "Count Pairs Whose Sum Equals a Target", "Medium", "Given an array and a target, count index pairs (i, j) where i < j and the values at those indices sum to the target. Count each pair of indices once."],
    ["group-anagrams", "Group Anagrams Together", "Medium", "Given a list of strings, group strings that contain the same characters with the same frequencies. The order of groups does not matter."],
    ["same-elements-same-frequencies", "Check Whether Two Arrays Have the Same Elements and Frequencies", "Easy", "Given two arrays, determine whether every value occurs the same number of times in both arrays."],
    ["intersection-of-multiple-arrays", "Find the Intersection of Multiple Arrays", "Medium", "Given a collection of integer arrays, return the distinct values that appear in every array."],
    ["longest-consecutive-sequence-hashset", "Find the Longest Consecutive Sequence Using a HashSet", "Medium", "Given an unsorted integer array, find the length of its longest sequence of consecutive values in expected linear time."],
    ["longest-zero-sum-subarray", "Find the Longest Subarray with Sum Zero", "Medium", "Given an integer array, return the length of the longest contiguous subarray whose sum is zero."],
    ["count-subarrays-with-target-sum", "Count Subarrays with Sum Equal to a Target", "Medium", "Given an integer array and target, count contiguous subarrays whose sum equals the target."],
    ["count-subarrays-divisible-by-k", "Count Subarrays Divisible by k", "Medium", "Given an integer array and a positive integer k, count contiguous subarrays whose sum is divisible by k."],
    ["longest-equal-zero-one-subarray", "Find the Longest Subarray with Equal 0s and 1s", "Medium", "Given a binary array, return the length of the longest contiguous subarray containing equal numbers of 0s and 1s."],
    ["longest-equal-zero-one-two-subarray", "Find the Longest Subarray with Equal Counts of 0s, 1s, and 2s", "Hard", "Given an array containing only 0, 1, and 2, return the length of the longest contiguous subarray in which all three values occur equally often."],
    ["minimum-window-substring", "Find the Smallest Window Containing All Required Characters", "Hard", "Given strings s and t, find the shortest substring of s containing every character in t with its required multiplicity. Return an empty string if no such window exists."],
    ["isomorphic-strings", "Check Whether Two Strings Are Isomorphic", "Easy", "Determine whether characters in one string can be consistently mapped one-to-one to characters in another string while preserving order."],
    ["word-pattern", "Check Whether a String Follows a Word Pattern", "Easy", "Given a character pattern and a space-separated sequence of words, determine whether there is a one-to-one mapping between pattern characters and words."],
    ["top-k-frequent-elements", "Find the Top Frequent Elements", "Medium", "Given an integer array and k, return the k values with the highest frequencies. Break frequency ties by choosing smaller values first."]
  ]),
  ...createQuestions(
    "dynamic-programming",
    "dp-grids-knapsack-partitioning",
    [
      [
        "unique-paths",
        "Unique Paths",
        "Medium",
        "Given an m by n grid, count the paths from the top-left to the bottom-right when you can only move right or down."
      ],
      [
        "unique-paths-ii",
        "Unique Paths II",
        "Medium",
        "Given a grid with blocked and open cells, count the paths from the top-left to the bottom-right using only right and down moves. Blocked cells cannot be entered."
      ],
      [
        "minimum-path-sum",
        "Minimum Path Sum",
        "Medium",
        "Given a grid of non-negative values, find the minimum sum of a path from the top-left to the bottom-right using only right and down moves."
      ],
      [
        "triangle-minimum-path-sum",
        "Triangle Minimum Path Sum",
        "Medium",
        "Given a triangle of numbers, find the minimum path sum from top to bottom. From each cell, you may move to either adjacent cell in the next row."
      ],
      [
        "maximum-falling-path-sum",
        "Maximum Falling Path Sum",
        "Medium",
        "Given a square matrix, find the maximum sum of a path from any cell in the first row to any cell in the last row. Each step may move down, down-left, or down-right."
      ],
      [
        "cherry-pickup",
        "Cherry Pickup",
        "Hard",
        "Given a square grid with cherries and blocked cells, find the maximum cherries collectable on a trip from the top-left to the bottom-right and back. A cell's cherries can only be collected once."
      ],
      [
        "zero-one-knapsack",
        "0/1 Knapsack",
        "Medium",
        "Given item weights and values and a capacity, choose items for maximum total value without exceeding capacity. Each item can be chosen at most once."
      ],
      [
        "unbounded-knapsack",
        "Unbounded Knapsack",
        "Medium",
        "Given item weights and values and a capacity, maximize total value without exceeding capacity. Each item may be selected any number of times."
      ],
      [
        "coin-change-minimum-coins",
        "Coin Change — Minimum Number of Coins",
        "Medium",
        "Given coin denominations and a target amount, return the fewest coins needed to make that amount. Return -1 if it cannot be made. Each denomination may be used repeatedly."
      ],
      [
        "coin-change-combinations",
        "Coin Change II — Number of Combinations",
        "Medium",
        "Given coin denominations and a target amount, count the combinations that make the amount when each coin can be used repeatedly and order does not matter."
      ],
      [
        "subset-sum",
        "Subset Sum",
        "Medium",
        "Given a set of non-negative integers and a target, determine whether some subset sums exactly to the target."
      ],
      [
        "partition-equal-subset-sum",
        "Partition Equal Subset Sum",
        "Medium",
        "Given an array of non-negative integers, determine whether it can be divided into two subsets with equal sums."
      ],
      [
        "count-subsets-with-given-sum",
        "Count Subsets with a Given Sum",
        "Medium",
        "Given non-negative integers and a target, count the subsets whose elements sum to the target. Treat elements at different indices as distinct."
      ],
      [
        "target-sum",
        "Target Sum",
        "Medium",
        "Given an array of non-negative integers and a target, count the ways to assign plus or minus signs so the resulting sum equals the target."
      ],
      [
        "minimum-subset-sum-difference",
        "Minimum Subset-Sum Difference",
        "Medium",
        "Divide a set of non-negative integers into two subsets so the absolute difference between their sums is as small as possible."
      ],
      [
        "rod-cutting",
        "Rod Cutting",
        "Medium",
        "Given prices for rod pieces of each length and a rod of length n, find the maximum revenue by cutting the rod. Each piece length may be used repeatedly."
      ],
      [
        "matrix-chain-multiplication",
        "Matrix Chain Multiplication",
        "Hard",
        "Given the dimensions of a chain of matrices, find the multiplication order that minimizes the number of scalar multiplications."
      ],
      [
        "burst-balloons",
        "Burst Balloons",
        "Hard",
        "Given balloon values, choose an order to burst them for the maximum coins. Bursting balloon i earns the product of its value and the values of its current neighbors; treat outside neighbors as 1."
      ]
    ]
  ),  ...createQuestions(
    "dynamic-programming",
    "one-dimensional",
    [
      [
        "climbing-stairs",
        "Climbing Stairs",
        "Easy",
        "You are climbing a staircase with n steps and can climb either 1 or 2 steps at a time. Return the number of distinct ways to reach the top."
      ],
      [
        "min-cost-climbing-stairs",
        "Min Cost Climbing Stairs",
        "Easy",
        "Given the cost of each stair, find the minimum cost to reach beyond the last stair. You may start at index 0 or 1, and each move advances 1 or 2 steps."
      ],
      [
        "house-robber",
        "House Robber",
        "Medium",
        "Given the amount of money in each house, find the maximum amount you can rob without robbing two adjacent houses."
      ],
      [
        "house-robber-ii",
        "House Robber II",
        "Medium",
        "The houses form a circle, so the first and last houses are adjacent. Find the maximum amount you can rob without robbing adjacent houses."
      ],
      [
        "maximum-sum-non-adjacent-elements",
        "Maximum Sum of Non-Adjacent Elements",
        "Medium",
        "Given an integer array, find the maximum sum of selected elements such that no two selected elements are adjacent. You may select no elements."
      ],
      [
        "frog-jump-minimum-energy",
        "Frog Jump with Minimum Energy",
        "Easy",
        "A frog is on the first of n stones, each with a height. It may jump one or two stones at a time. Find the minimum total energy, where a jump costs the absolute height difference."
      ],
      [
        "frog-jump-k-distances",
        "Frog Jump with Up to k Jumps",
        "Medium",
        "A frog is on the first of n stones, each with a height, and may jump forward by any distance from 1 through k. Find the minimum total energy, where each jump costs the absolute height difference."
      ],
      [
        "decode-ways",
        "Decode Ways",
        "Medium",
        "A string of digits maps 1 to A through 26 to Z. Count the ways to decode the entire string. A decoding cannot contain a number with a leading zero."
      ],
      [
        "word-break",
        "Word Break",
        "Medium",
        "Given a string and a dictionary of words, determine whether the string can be split into one or more dictionary words."
      ],
      [
        "maximum-subarray-kadane",
        "Maximum Subarray Sum Using Kadane's Algorithm",
        "Medium",
        "Given an integer array, find the largest sum of any non-empty contiguous subarray."
      ],
      [
        "maximum-product-subarray",
        "Maximum Product Subarray",
        "Medium",
        "Given an integer array, find the largest product of any non-empty contiguous subarray."
      ],
      [
        "longest-increasing-subsequence",
        "Longest Increasing Subsequence",
        "Medium",
        "Given an integer array, find the length of the longest strictly increasing subsequence. Its elements need not be adjacent."
      ],
      [
        "number-of-ways-to-reach-target-score",
        "Number of Ways to Reach a Target Score",
        "Medium",
        "Starting from score zero, count the ordered sequences of moves worth 1, 2, or 3 points that reach exactly the target score."
      ],
      [
        "minimum-jumps-to-reach-end",
        "Minimum Jumps to Reach the End",
        "Medium",
        "Each array value gives the maximum forward jump length from that position. Find the minimum jumps needed to reach the last index, or report that it is unreachable."
      ],
      [
        "perfect-squares-minimum-count",
        "Perfect Squares — Minimum Number Summing to n",
        "Medium",
        "Given a positive integer n, find the fewest perfect-square numbers whose sum is n. A square may be used more than once."
      ]
    ]
  ),
    ...createQuestions(
    "dynamic-programming",
    "dp-strings-subsequences",
    [
      [
        "longest-common-subsequence",
        "Longest Common Subsequence",
        "Medium",
        "Given two strings, find the length of their longest subsequence that appears in both strings in the same relative order."
      ],
      [
        "longest-common-substring",
        "Longest Common Substring",
        "Medium",
        "Given two strings, find the length of their longest common contiguous substring."
      ],
      [
        "longest-palindromic-subsequence",
        "Longest Palindromic Subsequence",
        "Medium",
        "Given a string, find the length of its longest subsequence that reads the same forward and backward."
      ],
      [
        "longest-palindromic-substring",
        "Longest Palindromic Substring",
        "Medium",
        "Given a string, find its longest contiguous substring that reads the same forward and backward."
      ],
      [
        "minimum-insertions-palindrome",
        "Minimum Insertions to Make a String a Palindrome",
        "Medium",
        "Given a string, find the minimum number of characters that must be inserted to make it a palindrome."
      ],
      [
        "minimum-deletions-to-make-strings-equal",
        "Minimum Deletions to Make Two Strings Equal",
        "Medium",
        "Given two strings, find the minimum total number of character deletions needed to make them equal."
      ],
      [
        "edit-distance",
        "Edit Distance",
        "Medium",
        "Given two strings, find the minimum number of insertions, deletions, and replacements needed to change one string into the other."
      ],
      [
        "distinct-subsequences",
        "Distinct Subsequences",
        "Hard",
        "Given strings s and t, count how many distinct subsequences of s equal t. The answer may be large."
      ],
      [
        "shortest-common-supersequence",
        "Shortest Common Supersequence",
        "Hard",
        "Given two strings, find the length of the shortest string that contains both as subsequences."
      ],
      [
        "wildcard-matching",
        "Wildcard Matching",
        "Hard",
        "Given a string and a pattern where ? matches one character and * matches any sequence of characters, determine whether the pattern matches the entire string."
      ],
      [
        "regular-expression-matching",
        "Regular Expression Matching",
        "Hard",
        "Given a string and a pattern where . matches any one character and * means zero or more repetitions of the preceding element, determine whether the pattern matches the entire string."
      ],
      [
        "count-palindromic-substrings",
        "Count Palindromic Substrings",
        "Medium",
        "Given a string, count all of its contiguous substrings that are palindromes. Count substrings at different positions separately."
      ],
      [
        "interleaving-string",
        "Interleaving String",
        "Medium",
        "Given strings s1, s2, and s3, determine whether s3 can be formed by interleaving s1 and s2 while preserving the order of characters from each."
      ],
      [
        "minimum-ascii-delete-sum",
        "Minimum ASCII Delete Sum for Two Strings",
        "Medium",
        "Given two strings, find the minimum sum of deleted character ASCII values needed to make the strings equal."
      ],
      [
        "longest-repeating-subsequence",
        "Longest Repeating Subsequence",
        "Medium",
        "Given a string, find the length of the longest subsequence that appears at least twice using different character indices in the two occurrences."
      ]
    ]
  ),  ...createQuestions("greedy", "greedy-algorithms", [
    [
      "activity-selection",
      "Activity Selection",
      "Easy",
      "Given start and finish times for activities, select the maximum number of non-overlapping activities. An activity can start when the previous one finishes."
    ],
    [
      "fractional-knapsack",
      "Fractional Knapsack",
      "Medium",
      "Given items with positive weights and values and a knapsack capacity, maximize the total value. Items may be divided into fractions."
    ],
    [
      "job-sequencing-deadlines",
      "Job Sequencing with Deadlines",
      "Medium",
      "Each job takes one unit of time and has a deadline and profit. Schedule jobs before their deadlines to maximize total profit."
    ],
    [
      "assign-cookies",
      "Assign Cookies to Maximize Satisfied Children",
      "Easy",
      "Each child has a minimum cookie size they will accept, and each cookie has a size. Assign at most one cookie per child to maximize the number of satisfied children."
    ],
    [
      "jump-game",
      "Jump Game",
      "Medium",
      "Each array value is the maximum forward jump from that position. Determine whether you can reach the last index from the first."
    ],
    [
      "jump-game-ii",
      "Jump Game II",
      "Medium",
      "Each array value is the maximum forward jump from that position. Find the minimum jumps needed to reach the last index; assume it is reachable."
    ],
    [
      "gas-station",
      "Gas Station",
      "Medium",
      "Given circular gas stations with gas supplies and travel costs to the next station, find a starting station from which a vehicle can complete the circuit, or return -1 if impossible."
    ],
    [
      "candy-distribution",
      "Candy Distribution",
      "Hard",
      "Children stand in a line and each has a rating. Give each child at least one candy, and give more candies to a child than an adjacent child with a lower rating. Find the minimum total candies needed."
    ],
    [
      "partition-labels",
      "Partition Labels",
      "Medium",
      "Split a string into as many parts as possible so each character appears in at most one part. Return the lengths of the parts."
    ],
    [
      "non-overlapping-intervals",
      "Non-overlapping Intervals",
      "Medium",
      "Given intervals, remove the minimum number so the remaining intervals do not overlap. Intervals that touch at an endpoint are non-overlapping."
    ],
    [
      "minimum-arrows-burst-balloons",
      "Minimum Number of Arrows to Burst Balloons",
      "Medium",
      "Each balloon is represented by a horizontal interval. Find the minimum number of vertical arrows needed to burst all balloons; an arrow bursts every interval it intersects."
    ],
    [
      "best-time-buy-sell-stock",
      "Best Time to Buy and Sell Stock",
      "Easy",
      "Given a stock price for each day, choose one day to buy and a later day to sell to maximize profit. Return zero if no profitable trade is possible."
    ],
    [
      "best-time-buy-sell-stock-ii",
      "Best Time to Buy and Sell Stock II",
      "Medium",
      "Given a stock price for each day, maximize profit with as many buy-sell transactions as desired, but hold at most one share at a time."
    ],
    [
      "minimum-railway-platforms",
      "Minimum Number of Railway Platforms",
      "Medium",
      "Given arrival and departure times for trains, find the minimum platforms needed so no train waits. A train departing at the same time another arrives requires a separate platform."
    ],
    [
      "huffman-coding",
      "Huffman Coding",
      "Medium",
      "Given symbols and their frequencies, construct a prefix-free binary code that minimizes the total encoded length, calculated as frequency multiplied by code length."
    ],
    [
      "minimum-coins-canonical-system",
      "Minimum Coins for a Canonical Coin System",
      "Medium",
      "Given coin denominations from a canonical coin system and a target amount, find the minimum number of coins needed. The denomination system guarantees that repeatedly choosing the largest usable coin is optimal."
    ],
    [
      "queue-reconstruction-by-height",
      "Queue Reconstruction by Height",
      "Medium",
      "Each person has a height and a count k of people at least as tall standing before them. Reconstruct any queue satisfying all given height and count pairs."
    ],
    [
      "maximum-units-on-truck",
      "Maximum Units on a Truck",
      "Easy",
      "Given box types with a quantity and units per box, and a truck capacity measured in boxes, maximize the total units loaded."
    ],
    [
      "lemonade-change",
      "Lemonade Change",
      "Easy",
      "Customers pay with 5, 10, or 20 dollar bills for lemonade costing 5 dollars. Determine whether correct change can be given to every customer in order."
    ],
    [
      "minimum-refueling-stops",
      "Minimum Number of Refueling Stops",
      "Hard",
      "A vehicle starts with a given fuel amount and travels toward a destination. Given fuel stations and their supplies along the route, find the minimum stops needed to reach the destination, or return -1 if impossible."
    ]
  ]),  ...createQuestions("graphs", "disjoint-set-union", [
    ["implement-dsu-path-compression", "Implement Disjoint Set Union with Path Compression", "Medium", "Implement a Disjoint Set Union structure for n elements. Support find and union operations, and apply path compression during find."],
    ["implement-union-by-rank-or-size", "Implement Union by Rank or Size", "Medium", "Extend Disjoint Set Union to merge components by rank or size. Return whether each union actually combined two different components."],
    ["dsu-detect-undirected-cycle", "Detect a Cycle in an Undirected Graph Using DSU", "Medium", "Given an undirected graph, determine whether it contains a cycle using a Disjoint Set Union structure."],
    ["components-after-edge-additions", "Count Connected Components After Edge Additions", "Medium", "Given n vertices and a sequence of edge additions, return the number of connected components after each added edge."],
    ["number-of-provinces-dsu", "Number of Provinces Using DSU", "Medium", "Given an adjacency matrix representing connections between cities, count the connected groups of cities using Disjoint Set Union."],
    ["redundant-connection", "Redundant Connection", "Medium", "Given the edges of a graph that began as a tree with one extra edge, return an edge whose removal makes the graph a tree."],
    ["accounts-merge", "Accounts Merge", "Medium", "Each account contains a name and a list of emails. Merge accounts that share an email and return each merged account with its emails sorted."],
    ["most-stones-removed", "Most Stones Removed with Same Row or Column", "Medium", "Given stones at unique grid coordinates, remove the maximum number such that each removed stone shares a row or column with a remaining stone."],
    ["satisfiability-equality-equations", "Satisfiability of Equality Equations", "Medium", "Given equations of the form a==b or a!=b, determine whether all equations can be satisfied simultaneously."],
    ["number-of-islands-ii", "Number of Islands II - Dynamic Island Additions", "Hard", "Given an initially water-filled grid and a sequence of land additions, return the number of islands after each addition."]
  ]),
  ...createQuestions("graphs", "shortest-paths-mst", [
    ["implement-dijkstra", "Implement Dijkstra's Shortest-Path Algorithm", "Medium", "Given a weighted graph with non-negative edge weights and a source vertex, find the shortest distance from the source to every vertex."],
    ["implement-bellman-ford", "Implement Bellman-Ford", "Medium", "Given a weighted directed graph and a source vertex, find shortest distances even with negative edges, and detect whether a reachable negative-weight cycle exists."],
    ["implement-floyd-warshall", "Implement Floyd-Warshall", "Medium", "Given a weighted graph, compute the shortest-path distances between every pair of vertices. Support negative edges and identify negative cycles."],
    ["shortest-path-weighted-graph", "Find the Shortest Path in a Weighted Graph", "Medium", "Given a weighted graph with non-negative edge weights, a source, and a destination, return a shortest path and its total weight, or report that no path exists."],
    ["cheapest-flight-k-stops", "Cheapest Flight with at Most k Stops", "Medium", "Given flights with prices, a source, a destination, and k, find the minimum price using at most k intermediate stops, or return -1 if impossible."],
    ["network-delay-time", "Network Delay Time", "Medium", "Given directed travel times and a starting node, find how long it takes for a signal to reach every node. Return -1 if some node is unreachable."],
    ["shortest-path-binary-matrix", "Shortest Path in a Binary Matrix", "Medium", "Given a square binary grid, find the shortest clear path from the top-left to the bottom-right. Moves may go in any of the eight neighboring directions."],
    ["minimum-effort-path-grid", "Minimum Effort Path in a Grid", "Medium", "Given a grid of heights, find a path from the top-left to the bottom-right that minimizes the largest absolute height difference between adjacent cells."],
    ["implement-prims-mst", "Implement Prim's Minimum Spanning Tree", "Medium", "Given a connected, weighted, undirected graph, find the total weight of a minimum spanning tree using Prim's algorithm."],
    ["implement-kruskals-mst", "Implement Kruskal's Minimum Spanning Tree", "Medium", "Given a connected, weighted, undirected graph, find a minimum spanning tree using Kruskal's algorithm and Disjoint Set Union."],
    ["minimum-cost-connect-cities", "Find the Minimum Cost to Connect All Cities", "Medium", "Given cities and possible undirected connections with costs, find the minimum cost to connect every city, or report that it is impossible."],
    ["count-shortest-paths-destination", "Count Shortest Paths to a Destination", "Hard", "Given an undirected weighted graph with positive weights, count the distinct shortest paths from vertex 0 to vertex n-1. Return the count modulo 1,000,000,007."],
    ["min-cost-connect-points-plane", "Cheapest Way to Connect Points in a Plane", "Medium", "Given points in a plane, connect every point so the total Manhattan distance of the connections is minimized."],
    ["shortest-path-dag", "Shortest Path in a DAG", "Medium", "Given a weighted directed acyclic graph and a source vertex, find the shortest distance from the source to every reachable vertex. Edge weights may be negative."],
    ["minimize-maximum-edge-path", "Find a Path with Minimum Maximum Edge Weight", "Medium", "Given a weighted graph, source, and destination, find a path that minimizes the largest edge weight used along that path."]
  ]),
  ...createQuestions("graphs", "topological-sort", [
    ["kahns-topological-sort", "Implement Kahn's Topological Sort", "Medium", "Given a directed graph, return a topological ordering using indegrees and a queue. Report when the graph contains a cycle."],
    ["dfs-topological-sort", "Implement Topological Sorting Using DFS", "Medium", "Given a directed graph, return a topological ordering using depth-first search. Detect and report cycles."],
    ["course-schedule", "Course Schedule", "Medium", "Given course prerequisites, determine whether it is possible to complete every course."],
    ["course-schedule-ii", "Course Schedule II - Return a Valid Course Order", "Medium", "Given course prerequisites, return any valid order for completing all courses, or an empty result if no such order exists."],
    ["tasks-completion-dependencies", "Determine Whether All Tasks Can Be Completed", "Medium", "Given tasks and directed prerequisite dependencies, determine whether all tasks can be completed."],
    ["minimum-semesters-courses", "Minimum Semesters Required to Finish Courses", "Medium", "Given courses and prerequisite pairs, find the minimum semesters needed when any number of currently available courses can be taken in parallel, or return -1 if prerequisites contain a cycle."],
    ["eventual-safe-states", "Find All Eventual Safe States", "Medium", "Given a directed graph, return all vertices from which every possible path eventually reaches a terminal vertex."],
    ["critical-path-dag", "Find the Critical Path in a Directed Acyclic Graph", "Hard", "Given a DAG whose vertices have task durations, find the longest dependency path and its total duration."],
    ["alien-dictionary", "Alien Dictionary", "Hard", "Given words sorted in an unknown alphabet, infer a valid character order. Return an empty result if the ordering is contradictory or a word has an invalid prefix order."],
    ["alien-character-order", "Find the Order of Characters in a Sorted Alien Language", "Medium", "Given words sorted according to an unknown alphabet, return one valid ordering of the characters that appear in the words."]
  ]),
  ...createQuestions("graphs", "graph-traversal", [
    ["graph-adjacency-list", "Represent a Graph Using an Adjacency List", "Easy", "Given a vertex count and edge list, build an adjacency-list representation. Support directed or undirected input as specified."],
    ["graph-bfs", "Implement Graph BFS", "Easy", "Given a graph and a starting vertex, return the vertices in breadth-first traversal order. Visit each reachable vertex once."],
    ["graph-dfs-recursive", "Implement Graph DFS Recursively", "Easy", "Given a graph and a starting vertex, return the vertices in recursive depth-first traversal order. Visit each reachable vertex once."],
    ["graph-dfs-iterative", "Implement Graph DFS Iteratively", "Easy", "Given a graph and a starting vertex, return the vertices in depth-first traversal order using an explicit stack."],
    ["connected-components-undirected-graph", "Count Connected Components in an Undirected Graph", "Medium", "Given an undirected graph with n vertices, count its connected components."],
    ["number-of-provinces-traversal", "Count Provinces in a Graph", "Medium", "Given an adjacency matrix of city connections, count the connected groups using graph traversal."],
    ["detect-cycle-undirected-graph", "Detect a Cycle in an Undirected Graph", "Medium", "Given an undirected graph, determine whether it contains a cycle using graph traversal."],
    ["detect-cycle-directed-graph", "Detect a Cycle in a Directed Graph", "Medium", "Given a directed graph, determine whether it contains a directed cycle."],
    ["bipartite-graph", "Determine Whether a Graph Is Bipartite", "Medium", "Given an undirected graph, determine whether its vertices can be split into two groups so every edge connects different groups."],
    ["all-paths-source-destination", "Find All Paths from Source to Destination", "Medium", "Given a directed acyclic graph, return every path from the source vertex to the destination vertex."],
    ["clone-graph", "Clone a Graph", "Medium", "Given a reference to a node in a connected undirected graph, create a deep copy of the graph."],
    ["number-of-islands", "Find the Number of Islands", "Medium", "Given a grid of land and water, count groups of horizontally or vertically connected land cells."],
    ["shortest-path-unweighted-graph", "Find the Shortest Path in an Unweighted Graph", "Medium", "Given an unweighted graph, a source, and a destination, return the shortest path and its edge count, or report that no path exists."],
    ["rotting-oranges", "Rotting Oranges", "Medium", "In a grid of fresh and rotten oranges, each rotten orange rots adjacent fresh oranges every minute. Return the minutes until no fresh oranges remain, or -1 if some can never rot."],
    ["nearest-zero-binary-matrix", "Find the Nearest Zero in a Binary Matrix", "Medium", "For each cell in a binary matrix containing at least one zero, return its distance to the nearest zero using four-directional moves."],
    ["surrounded-regions", "Surrounded Regions", "Medium", "Given a board of X and O cells, capture each O region that is not connected to the board's boundary by changing it to X."],
    ["pacific-atlantic-water-flow", "Pacific Atlantic Water Flow", "Medium", "Given a height grid, return cells from which water can flow to both the Pacific and Atlantic edges, moving only to cells of equal or lower height."],
    ["word-ladder", "Word Ladder", "Hard", "Given a begin word, end word, and dictionary, find the length of the shortest sequence of valid words where each step changes one letter."],
    ["minimum-genetic-mutation", "Minimum Genetic Mutation Steps", "Medium", "Given start and end gene strings and a bank of valid genes, find the minimum single-character mutations needed to reach the end, or return -1."],
    ["articulation-points", "Find All Articulation Points in a Graph", "Hard", "Given an undirected graph, return vertices whose removal increases the number of connected components."]
  ]),
  ...createQuestions("tries", "trie-prefix-search", [
    ["implement-trie", "Implement a Trie with Insert, Search, and Prefix Search", "Medium", "Implement a Trie that supports inserting words, searching for a complete word, and checking whether any word starts with a given prefix."],
    ["trie-word-deletion", "Implement Word Deletion in a Trie", "Medium", "Extend a Trie with a delete operation. Deleting a word must not remove prefixes still needed by other stored words."],
    ["trie-words-with-prefix", "Find All Words with a Given Prefix", "Medium", "Given a collection of words and a prefix, return all stored words beginning with that prefix in lexicographic order."],
    ["wildcard-dictionary-search", "Implement a Dictionary Supporting Wildcard Searches", "Medium", "Design a word dictionary that supports adding words and searching with a dot wildcard matching any single character."],
    ["word-search-ii", "Find All Dictionary Words in a Character Grid", "Hard", "Given a character grid and a dictionary, return every dictionary word that can be formed by adjacent horizontal or vertical cells without reusing a cell in a word."],
    ["longest-common-prefix", "Find the Longest Common Prefix", "Easy", "Given a list of strings, find the longest prefix shared by every string, or return an empty string if none exists."],
    ["longest-buildable-word", "Find the Longest Word Buildable One Character at a Time", "Medium", "Given a dictionary, return the longest word for which every prefix formed by removing its last character is also in the dictionary. Break ties lexicographically."],
    ["replace-words-dictionary-roots", "Replace Words Using Dictionary Roots", "Medium", "Given dictionary roots and a sentence, replace each word with the shortest root that is its prefix, if one exists."],
    ["autocomplete-suggestions", "Implement Autocomplete Suggestions", "Medium", "Given a product list and a search word, return up to three lexicographically smallest products matching each successive prefix of the search word."],
    ["maximum-xor-binary-trie", "Find Maximum XOR of Two Numbers Using a Binary Trie", "Hard", "Given a list of non-negative integers, find the maximum XOR value obtainable from any pair of distinct indices using a binary Trie."]
  ]),
  ...createQuestions("heaps", "heap-priority-queue", [
    ["implement-min-heap", "Implement a Min-Heap", "Medium", "Implement a min-heap supporting insertion, retrieving the minimum, and removing the minimum."],
    ["implement-max-heap", "Implement a Max-Heap", "Medium", "Implement a max-heap supporting insertion, retrieving the maximum, and removing the maximum."],
    ["kth-largest-element-heap", "Find the K-th Largest Element Using a Heap", "Medium", "Given an integer array and k, find the k-th largest element by sorted order. Duplicate values count as separate positions."],
    ["kth-smallest-element-heap", "Find the K-th Smallest Element Using a Heap", "Medium", "Given an integer array and k, find the k-th smallest element by sorted order. Duplicate values count as separate positions."],
    ["top-k-frequent-numbers-heap", "Find the Top k Frequent Numbers", "Medium", "Given an integer array and k, return the k most frequent values. Break frequency ties by choosing smaller values first."],
    ["merge-k-sorted-lists", "Merge Sorted Lists", "Medium", "Given k sorted linked lists, merge them into one sorted linked list."],
    ["k-closest-points-origin", "Find the Closest Points to the Origin", "Medium", "Given points in a 2D plane and k, return the k points with the smallest Euclidean distance from the origin."],
    ["k-closest-numbers-target", "Find the Closest Numbers to a Target", "Medium", "Given a sorted integer array, a target, and k, return the k values closest to the target. Break ties by choosing the smaller value."],
    ["median-data-stream", "Find the Median from a Data Stream", "Hard", "Design a data structure that accepts integers one at a time and returns the median of all values seen so far."],
    ["minimum-cost-connect-ropes", "Find the Minimum Cost to Connect Ropes", "Medium", "Given rope lengths, repeatedly connect two ropes at a cost equal to their combined length. Find the minimum total cost to connect all ropes."],
    ["reorganize-string", "Reorganize a String So Adjacent Characters Differ", "Medium", "Rearrange a string so no two adjacent characters are equal, or return an empty string if no valid arrangement exists."],
    ["task-scheduler-cooldown", "Schedule Tasks with Cooldowns", "Medium", "Given tasks represented by letters and a non-negative cooldown n, find the minimum intervals needed when identical tasks must be separated by at least n intervals."],
    ["most-frequent-words", "Find the Most Frequent Words", "Medium", "Given a list of words and k, return the k most frequent words, ordered by descending frequency and then lexicographically."],
    ["smallest-range-sorted-lists", "Find the Smallest Range Covering Elements from Sorted Lists", "Hard", "Given k sorted integer lists, find the smallest inclusive range containing at least one value from every list. Break equal-width ties by choosing the smaller starting value."],
    ["maximum-capital-projects", "Find Maximum Capital Using Available Projects", "Hard", "Given project profits and minimum capital requirements, an initial capital, and k, choose at most k feasible projects to maximize final capital."]
  ]),  ...createQuestions("arrays", "two-pointers", [
    ["tp-two-sum-sorted", "Two Sum in a Sorted Array", "Easy", "Given a sorted integer array and a target, return the indices of two values whose sum equals the target, or report that no pair exists."],
    ["tp-two-sum-ii", "Two Sum II - Return One-Based Indices", "Medium", "Given a sorted array and a target, return the one-based indices of two distinct values that sum to the target. Assume exactly one solution exists."],
    ["tp-three-sum", "Three Sum", "Medium", "Given an integer array, return all unique triplets whose values sum to zero."],
    ["tp-four-sum", "Four Sum", "Medium", "Given an integer array and a target, return all unique quadruplets whose values sum to the target."],
    ["tp-zero-sum-triplets", "Find Triplets with Sum Zero", "Medium", "Given an integer array, return all unique triplets whose sum is zero."],
    ["tp-triplet-target-sum", "Find a Triplet with a Target Sum", "Easy", "Given an integer array and a target, determine whether three distinct elements sum to the target."],
    ["tp-container-most-water", "Container With Most Water", "Medium", "Given non-negative heights, choose two lines that form a container holding the maximum amount of water."],
    ["tp-trapping-rain-water", "Trapping Rain Water Using Two Pointers", "Hard", "Given non-negative bar heights, calculate how much rainwater can be trapped between the bars."],
    ["tp-remove-duplicates-sorted", "Remove Duplicates from a Sorted Array In Place", "Easy", "Remove duplicates from a sorted array in place and return the number of unique values, preserving their order."],
    ["tp-remove-specified-element", "Remove a Specified Element In Place", "Easy", "Remove every occurrence of a given value in place and return the new length. The remaining elements may be in any order."],
    ["tp-reverse-character-array", "Reverse a Character Array", "Easy", "Reverse a character array in place using constant extra space."],
    ["tp-valid-palindrome", "Check Whether a String Is a Palindrome", "Easy", "Determine whether a string is a palindrome after ignoring non-alphanumeric characters and letter case."],
    ["tp-valid-palindrome-one-deletion", "Valid Palindrome After at Most One Deletion", "Easy", "Determine whether a string can be made a palindrome by deleting at most one character."],
    ["tp-pair-closest-target", "Find the Pair Closest to a Target Sum", "Medium", "Given a sorted array and target, find the pair whose sum has the smallest absolute difference from the target."],
    ["tp-smallest-difference-arrays", "Smallest Difference Between Two Sorted Arrays", "Medium", "Given two sorted integer arrays, find the pair of values—one from each array—with the smallest absolute difference."],
    ["tp-merge-sorted-arrays-in-place", "Merge Two Sorted Arrays In Place", "Medium", "Merge a sorted array into another sorted array with sufficient trailing capacity, storing the result in the first array."],
    ["tp-sorted-squares", "Sort Squares of a Sorted Array", "Easy", "Given a sorted integer array, return the squares of its values in sorted order."],
    ["tp-partition-around-pivot", "Partition an Array Around a Pivot", "Medium", "Rearrange an array so values smaller than a pivot come first, equal values next, and larger values last."],
    ["tp-unique-triplets-target", "Find Unique Triplets with a Target Sum", "Medium", "Given an integer array and target, return all unique triplets whose values sum to the target."],
    ["tp-backspace-string-compare", "Compare Strings Containing Backspaces", "Easy", "Given two strings where # represents a backspace, determine whether they are equal after processing all backspaces."]
  ]),
  ...createQuestions("arrays", "prefix-sums-difference-arrays", [
    ["ps-build-prefix-array", "Build a Prefix Sum Array", "Easy", "Given an integer array, build an array where each position stores the sum of all input values up to that position."],
    ["ps-range-sum-queries", "Answer Range-Sum Queries Efficiently", "Easy", "Given an array and multiple inclusive range queries, return each range sum using a precomputed prefix-sum array."],
    ["ps-pivot-index", "Find a Pivot Index", "Easy", "Find an index where the sum of values to its left equals the sum of values to its right. Return -1 if none exists."],
    ["ps-equilibrium-point", "Find the Equilibrium Point of an Array", "Easy", "Find the first index where the sum before it equals the sum after it, or report that no such index exists."],
    ["ps-count-target-sum", "Count Subarrays with a Given Sum", "Medium", "Given an integer array and target, count the contiguous subarrays whose sum equals the target."],
    ["ps-longest-target-sum", "Find the Longest Subarray with a Given Sum", "Medium", "Given an integer array and target, return the length of the longest contiguous subarray whose sum equals the target."],
    ["ps-longest-zero-sum", "Find the Longest Subarray with Sum Zero", "Medium", "Given an integer array, return the length of its longest contiguous subarray whose sum is zero."],
    ["ps-equal-zero-one-subarrays", "Count Subarrays with Equal 0s and 1s", "Medium", "Given a binary array, count the contiguous subarrays containing equal numbers of zeroes and ones."],
    ["ps-maximum-circular-subarray", "Maximum Sum Circular Subarray", "Medium", "Given a circular integer array, find the maximum sum of a non-empty subarray, which may wrap around the end."],
    ["ps-kadane-maximum-subarray", "Maximum Subarray Sum Using Kadane's Algorithm", "Medium", "Given an integer array, find the maximum sum of any non-empty contiguous subarray."],
    ["ps-minimum-length-target-sum", "Minimum-Length Subarray with a Target Sum", "Medium", "Given positive integers and a target, find the shortest contiguous subarray whose sum is at least the target, or return zero if none exists."],
    ["ps-product-except-self", "Product of Array Elements Except Self", "Medium", "For each array position, return the product of all other values without using division."],
    ["ps-count-divisible-by-k", "Count Subarrays Whose Sum Is Divisible by k", "Medium", "Given an integer array and positive k, count contiguous subarrays whose sum is divisible by k."],
    ["ps-difference-array-updates", "Apply Range Updates Using a Difference Array", "Medium", "Start with an array of zeroes and apply multiple inclusive range-increment operations. Return the final array."],
    ["ps-maximum-interval-coverage", "Maximum Coverage Over Intervals", "Medium", "Given inclusive intervals, find the maximum number of intervals covering any single point."]
  ]),
  ...createQuestions("arrays", "sliding-window", [
    ["sw-maximum-sum-size-k", "Maximum Sum Subarray of Size k", "Easy", "Given an integer array and k, find the maximum sum among all contiguous subarrays of length k."],
    ["sw-first-negative-size-k", "First Negative Number in Every Window of Size k", "Easy", "For every contiguous window of size k, return its first negative value, or zero if the window contains none."],
    ["sw-maximum-every-window", "Maximum in Every Sliding Window", "Hard", "Given an array and window size k, return the maximum value in each contiguous window."],
    ["sw-longest-unique-substring", "Longest Substring Without Repeating Characters", "Medium", "Find the length of the longest substring containing no repeated characters."],
    ["sw-longest-at-most-k-distinct", "Longest Substring with at Most k Distinct Characters", "Medium", "Given a string and k, find the length of its longest substring containing at most k distinct characters."],
    ["sw-longest-two-distinct", "Longest Substring with at Most Two Distinct Characters", "Medium", "Find the length of the longest substring containing no more than two distinct characters."],
    ["sw-minimum-window-substring", "Minimum Window Substring", "Hard", "Given strings s and t, find the shortest substring of s containing every character in t with its required multiplicity."],
    ["sw-find-anagrams", "Find All Anagrams in a String", "Medium", "Given strings s and p, return the starting indices of all substrings of s that are anagrams of p."],
    ["sw-permutation-in-string", "Check Whether a Permutation Exists in Another String", "Medium", "Given strings s1 and s2, determine whether s2 contains a substring that is a permutation of s1."],
    ["sw-longest-character-replacement", "Longest Repeating-Character Replacement", "Medium", "Given an uppercase string and k, find the longest substring that can be made of one repeated character by replacing at most k characters."],
    ["sw-minimum-size-subarray-sum", "Minimum Size Subarray Sum", "Medium", "Given positive integers and target, find the minimum length of a contiguous subarray whose sum is at least the target."],
    ["sw-subarray-product-less-than-k", "Count Subarrays with Product Less Than k", "Medium", "Given positive integers and k, count contiguous subarrays whose product is less than k."],
    ["sw-longest-ones-with-flips", "Longest Subarray of Ones with at Most k Zero Flips", "Medium", "Given a binary array and k, find the longest contiguous subarray of ones after flipping at most k zeroes."],
    ["sw-max-consecutive-ones-iii", "Max Consecutive Ones III", "Medium", "Given a binary array and k, return the longest run of ones possible after flipping at most k zeroes."],
    ["sw-fruit-into-baskets", "Fruit Into Baskets", "Medium", "Given the fruit type at each tree, find the longest contiguous stretch containing at most two fruit types."],
    ["sw-longest-subarray-k-distinct", "Longest Subarray with at Most k Distinct Values", "Medium", "Given an integer array and k, find the length of its longest contiguous subarray containing at most k distinct values."],
    ["sw-subarrays-exactly-k-distinct", "Count Subarrays with Exactly k Distinct Integers", "Hard", "Given an integer array and k, count contiguous subarrays containing exactly k distinct values."],
    ["sw-substrings-all-required", "Substrings Containing All Required Characters", "Medium", "Given a string and a set of required characters, count substrings containing every required character at least once."],
    ["sw-reduce-x-to-zero", "Minimum Operations to Reduce x to Zero", "Medium", "Remove values from either end of an integer array, minimizing removals so their sum is exactly x."],
    ["sw-maximum-vowels-substring", "Maximum Vowels in a Substring of Length k", "Easy", "Given a string and k, find the maximum number of vowels in any substring of length k."]
  ]),
  ...createQuestions("arrays", "binary-search", [
    ["bs-iterative", "Implement Binary Search Iteratively", "Easy", "Given a sorted array and target, return its index using iterative binary search, or -1 if absent."],
    ["bs-recursive", "Implement Binary Search Recursively", "Easy", "Given a sorted array and target, return its index using recursive binary search, or -1 if absent."],
    ["bs-first-occurrence", "Find the First Occurrence of a Target", "Easy", "Given a sorted array with duplicates, return the first index of the target, or -1 if absent."],
    ["bs-last-occurrence", "Find the Last Occurrence of a Target", "Easy", "Given a sorted array with duplicates, return the last index of the target, or -1 if absent."],
    ["bs-count-occurrences", "Count Occurrences of a Target", "Easy", "Given a sorted array and target, count how many times the target occurs."],
    ["bs-lower-upper-bound", "Find the Lower Bound and Upper Bound", "Medium", "In a sorted array, find the first position with a value at least target and the first position with a value greater than target."],
    ["bs-insertion-position", "Find the Insertion Position of a Target", "Easy", "Given a sorted array and target, return its index if present, or the index where it should be inserted to preserve order."],
    ["bs-floor-ceiling", "Find the Floor and Ceiling in a Sorted Array", "Easy", "Given a sorted array and target, find the greatest value at most target and the smallest value at least target."],
    ["bs-first-last-position", "Find the First and Last Position of an Element", "Medium", "Given a sorted array and target, return the first and last indices where it appears, or [-1, -1] if absent."],
    ["bs-search-rotated", "Search in a Rotated Sorted Array", "Medium", "Search for a target in a rotated sorted array of distinct values and return its index, or -1."],
    ["bs-minimum-rotated", "Find the Minimum in a Rotated Sorted Array", "Medium", "Given a rotated strictly increasing array, find its minimum value in logarithmic time."],
    ["bs-rotation-count", "Find How Many Times an Array Was Rotated", "Medium", "Given a rotated strictly increasing array, return the number of left rotations."],
    ["bs-nearly-sorted", "Search in a Nearly Sorted Array", "Medium", "In an array where each value is at most one position from its sorted location, find the target index or return -1."],
    ["bs-peak-element", "Find a Peak Element", "Medium", "Find an index whose value is greater than its neighboring values in an array."],
    ["bs-peak-2d-matrix", "Find a Peak in a Two-Dimensional Matrix", "Medium", "Find a matrix cell greater than its horizontal and vertical neighbors, using an efficient search."],
    ["bs-integer-square-root", "Find the Integer Square Root", "Easy", "Given a non-negative integer n, return floor(sqrt(n)) without using a built-in square-root function."],
    ["bs-kth-root", "Find the k-th Root of a Number", "Medium", "Given non-negative n and positive k, return the greatest integer x such that x^k is at most n."],
    ["bs-median-two-sorted", "Median of Two Sorted Arrays", "Hard", "Given two sorted arrays, find their combined median in logarithmic time."],
    ["bs-kth-two-sorted", "Find the k-th Element of Two Sorted Arrays", "Hard", "Given two sorted arrays and a one-based k, find the k-th smallest value in their combined sorted order."],
    ["bs-allocate-books", "Allocate Books Among Students", "Hard", "Given non-negative book page counts and students, assign each student a contiguous non-empty range while minimizing the maximum pages assigned. Return -1 if there are more students than books."],
    ["bs-split-array-largest-sum", "Split an Array to Minimize the Largest Subarray Sum", "Hard", "Split a non-negative array into m non-empty contiguous parts so the largest part sum is minimized."],
    ["bs-aggressive-cows", "Aggressive Cows - Maximize the Minimum Distance", "Hard", "Place k cows in stalls so the minimum distance between any two placed cows is as large as possible."],
    ["bs-minimum-eating-speed", "Minimum Eating Speed", "Medium", "Given piles and h hours, find the minimum integer eating speed that finishes all piles within h hours."],
    ["bs-ship-capacity-days", "Minimum Ship Capacity to Deliver Packages", "Medium", "Given package weights in order and days, find the minimum ship capacity that delivers all packages within the given days."],
    ["bs-smallest-divisor-threshold", "Smallest Divisor Satisfying a Threshold", "Medium", "Given positive integers and threshold, find the smallest positive divisor whose rounded-up quotient sum is at most the threshold."]
  ]),
  ...createQuestions("arrays", "sorting-selection", [
    ["sort-bubble-sort", "Implement Bubble Sort", "Easy", "Sort an integer array in ascending order using bubble sort."],
    ["sort-selection-sort", "Implement Selection Sort", "Easy", "Sort an integer array in ascending order using selection sort."],
    ["sort-insertion-sort", "Implement Insertion Sort", "Easy", "Sort an integer array in ascending order using insertion sort."],
    ["sort-merge-sort", "Implement Merge Sort", "Medium", "Sort an integer array in ascending order using merge sort."],
    ["sort-quicksort", "Implement Quicksort", "Medium", "Sort an integer array in ascending order using quicksort."],
    ["sort-counting-sort", "Implement Counting Sort", "Medium", "Sort an integer array whose values are within a known bounded range using counting sort."],
    ["sort-custom-comparator", "Sort an Array Using a Custom Comparator", "Easy", "Given records and a comparison rule, sort the records according to that rule."],
    ["sort-employees-salary-id", "Sort Employees by Salary and Employee ID", "Easy", "Sort employee records by salary ascending, using employee ID ascending to break salary ties."],
    ["sort-kth-largest", "Find the k-th Largest Element", "Medium", "Given an integer array and k, find the k-th largest value by sorted order; duplicate values count as separate positions."],
    ["sort-kth-smallest", "Find the k-th Smallest Element", "Medium", "Given an integer array and k, find the k-th smallest value by sorted order; duplicate values count as separate positions."],
    ["sort-top-k-frequent", "Find the Top k Frequent Elements", "Medium", "Given an integer array and k, return the k most frequent values, breaking frequency ties by smaller value."],
    ["sort-top-k-stream", "Find the k Largest Elements in a Stream", "Medium", "Read a stream of integers and report the k largest values seen so far after each input."],
    ["sort-running-median", "Find the Median of a Running Stream", "Hard", "Process integers one at a time and return the median of all values received after each insertion."],
    ["sort-merge-overlapping-intervals", "Merge Overlapping Intervals", "Medium", "Given intervals, merge all overlapping intervals and return the resulting non-overlapping intervals."],
    ["sort-insert-interval", "Insert a New Interval", "Medium", "Insert an interval into a sorted list of non-overlapping intervals and merge any overlaps."],
    ["sort-minimum-meeting-rooms", "Find the Minimum Number of Meeting Rooms", "Medium", "Given meeting start and end times, find the minimum rooms needed so all meetings can take place."],
    ["sort-maximum-concurrent-meetings", "Find the Maximum Number of Concurrent Meetings", "Medium", "Given meeting intervals, find the maximum number of meetings occurring at the same time."],
    ["sort-minimum-train-platforms", "Find the Minimum Platforms Required for Trains", "Medium", "Given train arrival and departure times, find the minimum platforms needed so no arriving train waits."],
    ["sort-minimum-interval-removals", "Minimum Intervals to Remove to Eliminate Overlap", "Medium", "Given intervals, remove the fewest intervals so the remaining intervals do not overlap."],
    ["sort-maximum-non-overlap", "Maximum Number of Non-Overlapping Intervals", "Medium", "Given intervals, select the maximum number of mutually non-overlapping intervals."]
  ]),  ...createQuestions("arrays", "matrix-grid", [
    ["mx-row-traversal", "Traverse a Matrix Row by Row", "Easy", "Given a matrix, return its elements row by row from top to bottom."],
    ["mx-column-traversal", "Traverse a Matrix Column by Column", "Easy", "Given a matrix, return its elements column by column from left to right."],
    ["mx-spiral-order", "Print a Matrix in Spiral Order", "Medium", "Return the elements of a matrix in clockwise spiral order."],
    ["mx-rotate-90", "Rotate a Matrix 90 Degrees", "Medium", "Rotate an n by n matrix 90 degrees clockwise in place."],
    ["mx-transpose", "Transpose a Matrix", "Easy", "Return the transpose of a matrix by swapping its rows and columns."],
    ["mx-search-row-column-sorted", "Search a Row-Wise and Column-Wise Sorted Matrix", "Medium", "Search for a target in a matrix whose rows and columns are each sorted in ascending order."],
    ["mx-search-fully-sorted", "Search in a Fully Sorted Matrix", "Medium", "Search for a target in a matrix where each row is sorted and each row's first value is greater than the previous row's last value."],
    ["mx-set-matrix-zeroes", "Set Matrix Rows and Columns to Zero", "Medium", "If a matrix cell is zero, set its entire row and column to zero in place."],
    ["mx-diagonal-sums", "Find the Diagonal Sums of a Matrix", "Easy", "For a square matrix, calculate the primary and secondary diagonal sums without double-counting the center."],
    ["mx-boundary-traversal", "Find the Boundary Traversal of a Matrix", "Easy", "Return the boundary elements of a matrix in clockwise order without repeating corners."],
    ["mx-count-islands", "Count Islands in a Binary Grid", "Medium", "Count groups of horizontally or vertically connected land cells in a binary grid."],
    ["mx-maximum-island-area", "Find the Maximum Area of an Island", "Medium", "Return the largest number of horizontally or vertically connected land cells in a binary grid."],
    ["mx-flood-fill", "Flood Fill", "Easy", "Starting from a cell, recolor its connected region of the same original color using four-directional adjacency."],
    ["mx-shortest-path-binary-maze", "Find the Shortest Path in a Binary Maze", "Medium", "Find the shortest four-directional path between two cells in a binary grid, avoiding blocked cells."],
    ["mx-unique-paths", "Find the Number of Unique Paths in a Grid", "Medium", "Count paths from the top-left to the bottom-right of an m by n grid using only right and down moves."],
    ["mx-unique-paths-obstacles", "Find Unique Paths with Obstacles", "Medium", "Count right-and-down paths through a grid while avoiding blocked cells."],
    ["mx-minimum-path-sum", "Find the Minimum Path Sum in a Grid", "Medium", "Find the minimum sum of a right-and-down path from the top-left to the bottom-right."],
    ["mx-word-search-grid", "Find a Word in a Character Grid", "Medium", "Determine whether a word can be formed from adjacent horizontal or vertical cells without reusing a cell."],
    ["mx-rotate-image-in-place", "Rotate an Image In Place", "Medium", "Rotate a square image matrix 90 degrees clockwise in place."],
    ["mx-largest-square-ones", "Find the Largest Square of 1s", "Medium", "Find the area of the largest square containing only 1s in a binary matrix."]
  ]),
  ...createQuestions("linked-lists", "linked-lists", [
    ["ll-reverse-iterative", "Reverse a Singly Linked List", "Easy", "Reverse a singly linked list iteratively and return its new head."],
    ["ll-reverse-recursive", "Reverse a Linked List Recursively", "Easy", "Reverse a singly linked list using recursion and return its new head."],
    ["ll-middle-node", "Find the Middle Node", "Easy", "Return the middle node of a singly linked list. If there are two middle nodes, return the second."],
    ["ll-detect-cycle", "Detect a Cycle in a Linked List", "Easy", "Determine whether a singly linked list contains a cycle."],
    ["ll-cycle-start", "Find the Starting Node of a Cycle", "Medium", "Return the node where a linked-list cycle begins, or null if there is no cycle."],
    ["ll-cycle-length", "Find the Length of a Cycle", "Easy", "Return the number of nodes in a linked-list cycle, or zero if the list has no cycle."],
    ["ll-kth-from-end", "Find the k-th Node from the End", "Easy", "Return the k-th node from the end of a singly linked list, using one-based k."],
    ["ll-remove-kth-from-end", "Remove the k-th Node from the End", "Medium", "Remove the k-th node from the end of a singly linked list and return the updated head."],
    ["ll-merge-two-sorted", "Merge Two Sorted Linked Lists", "Easy", "Merge two sorted linked lists into one sorted list by reusing their nodes."],
    ["ll-merge-k-sorted", "Merge Multiple Sorted Linked Lists", "Hard", "Merge k sorted linked lists into one sorted linked list."],
    ["ll-palindrome", "Check Whether a Linked List Is a Palindrome", "Easy", "Determine whether the values in a singly linked list read the same forward and backward."],
    ["ll-intersection", "Find the Intersection Node of Two Linked Lists", "Easy", "Given two singly linked lists, return the node where they first share the same reference, or null if they do not intersect."],
    ["ll-add-two-numbers", "Add Two Numbers Represented by Linked Lists", "Medium", "Each list stores a non-negative integer in reverse digit order. Add the values and return the sum in the same representation."],
    ["ll-sort-list", "Sort a Linked List", "Medium", "Sort a singly linked list in ascending order in O(n log n) time."],
    ["ll-remove-duplicates-sorted", "Remove Duplicates from a Sorted Linked List", "Easy", "Remove repeated values from a sorted linked list, keeping one node for each distinct value."],
    ["ll-remove-duplicates-unsorted", "Remove Duplicates from an Unsorted Linked List", "Easy", "Remove repeated values from an unsorted linked list while preserving the first occurrence of each value."],
    ["ll-rotate-k", "Rotate a Linked List by k Positions", "Medium", "Rotate a singly linked list to the right by k positions."],
    ["ll-reverse-k-group", "Reverse Nodes in Groups of k", "Hard", "Reverse nodes in groups of k. Leave any final group with fewer than k nodes unchanged."],
    ["ll-partition-value", "Partition a Linked List Around a Value", "Medium", "Rearrange a linked list so nodes with values less than x come before nodes with values greater than or equal to x, preserving relative order within each group."],
    ["ll-flatten-multilevel", "Flatten a Multilevel Linked List", "Medium", "Flatten a multilevel doubly linked list so child lists are inserted in depth-first order."]
  ]),
  ...createQuestions("stacks-queues", "stack-queue", [
    ["sq-stack-array", "Implement a Stack Using an Array", "Easy", "Implement a stack with push, pop, peek, and isEmpty operations using an array."],
    ["sq-stack-linked-nodes", "Implement a Stack Using Linked Nodes", "Easy", "Implement a stack with push, pop, peek, and isEmpty operations using linked nodes."],
    ["sq-queue-array", "Implement a Queue Using an Array", "Easy", "Implement a first-in-first-out queue with enqueue, dequeue, peek, and isEmpty operations using an array."],
    ["sq-queue-two-stacks", "Implement a Queue Using Two Stacks", "Easy", "Implement a first-in-first-out queue using two stacks."],
    ["sq-stack-two-queues", "Implement a Stack Using Two Queues", "Easy", "Implement a last-in-first-out stack using two queues."],
    ["sq-min-stack", "Design a Min Stack", "Medium", "Design a stack supporting push, pop, top, and retrieving the minimum value, each in constant time."],
    ["sq-valid-parentheses", "Validate Balanced Parentheses", "Easy", "Given a string containing bracket characters, determine whether every opening bracket is correctly closed in order."],
    ["sq-postfix-evaluation", "Evaluate a Postfix Expression", "Medium", "Evaluate a valid postfix expression containing integers and arithmetic operators."],
    ["sq-infix-to-postfix", "Convert Infix to Postfix", "Medium", "Convert an infix arithmetic expression to postfix notation while respecting parentheses and operator precedence."],
    ["sq-infix-to-prefix", "Convert Infix to Prefix", "Medium", "Convert an infix arithmetic expression to prefix notation while respecting parentheses and operator precedence."],
    ["sq-prefix-evaluation", "Evaluate a Prefix Expression", "Medium", "Evaluate a valid prefix expression containing integers and arithmetic operators."],
    ["sq-simplify-unix-path", "Simplify a Unix-Style File Path", "Medium", "Normalize an absolute Unix path by resolving . and .. components and repeated slashes."],
    ["sq-decode-string", "Decode an Encoded String", "Medium", "Decode strings where k[substring] means the substring repeats k times. Encodings may be nested."],
    ["sq-browser-history", "Implement Browser History", "Medium", "Design browser history supporting visit, back, and forward operations."],
    ["sq-lru-cache", "Design an LRU Cache", "Medium", "Design a least-recently-used cache with get and put operations in average O(1) time."],
    ["sq-lfu-cache", "Design an LFU Cache", "Hard", "Design a least-frequently-used cache with average O(1) get and put operations. Break frequency ties by evicting the least recently used entry."],
    ["sq-circular-queue", "Implement a Circular Queue", "Medium", "Implement a fixed-capacity circular queue with enqueue, dequeue, front, rear, and empty/full checks."],
    ["sq-deque", "Implement a Deque", "Medium", "Implement a double-ended queue supporting insertion and deletion at both ends."],
    ["sq-celebrity", "Find the Celebrity in a Party", "Medium", "Given a knows(a, b) relation, find a person known by everyone who knows nobody, or report that no such person exists."],
    ["sq-sliding-window-maximum", "Find the Maximum in Each Sliding Window Using a Deque", "Hard", "Given an array and window size k, return the maximum value in each window using a deque."]
  ]),
  ...createQuestions("stacks-queues", "monotonic-stack-queue", [
    ["ms-next-greater-right", "Next Greater Element to the Right", "Medium", "For each array element, find the first greater value to its right, or -1 if none exists."],
    ["ms-next-greater-left", "Next Greater Element to the Left", "Medium", "For each array element, find the nearest greater value to its left, or -1 if none exists."],
    ["ms-next-smaller-right", "Next Smaller Element to the Right", "Medium", "For each array element, find the first smaller value to its right, or -1 if none exists."],
    ["ms-next-smaller-left", "Next Smaller Element to the Left", "Medium", "For each array element, find the nearest smaller value to its left, or -1 if none exists."],
    ["ms-stock-span", "Stock Span Problem", "Medium", "For each day, calculate the number of consecutive previous days whose stock prices were less than or equal to that day's price."],
    ["ms-daily-temperatures", "Daily Temperatures", "Medium", "For each day, find how many days must pass until a warmer temperature. Return zero if no warmer day exists."],
    ["ms-largest-rectangle-histogram", "Largest Rectangle in a Histogram", "Hard", "Given histogram bar heights, find the largest rectangular area that can be formed."],
    ["ms-maximal-rectangle", "Maximal Rectangle in a Binary Matrix", "Hard", "Find the largest rectangle containing only 1s in a binary matrix."],
    ["ms-sum-subarray-minimums", "Sum of Subarray Minimums", "Medium", "Sum the minimum value of every non-empty subarray and return the result modulo 1,000,000,007."],
    ["ms-sum-subarray-maximums", "Sum of Subarray Maximums", "Medium", "Sum the maximum value of every non-empty subarray."],
    ["ms-max-min-each-window", "Maximum of Minimums for Every Window Size", "Hard", "For each window size from 1 through n, find the maximum among the minimum values of all windows of that size."],
    ["ms-trapping-rain-water", "Trapping Rain Water Using a Monotonic Stack", "Hard", "Given non-negative bar heights, calculate how much rainwater can be trapped between the bars using a monotonic stack."],
    ["ms-remove-digits-smallest", "Remove Digits to Form the Smallest Number", "Medium", "Given a non-negative number as a string and k, remove exactly k digits to produce the smallest possible number."],
    ["ms-132-pattern", "Find the 132 Pattern", "Medium", "Determine whether an array contains indices i < j < k such that nums[i] < nums[k] < nums[j]."],
    ["ms-online-stock-span", "Online Stock Span", "Medium", "Design a data structure that receives daily stock prices and returns each day's stock span."]
  ]),
  ...createQuestions("recursion-backtracking", "recursion-backtracking", [
    ["rb-factorial", "Calculate Factorial Using Recursion", "Easy", "Given a non-negative integer n, calculate n! using recursion. Define 0! as 1."],
    ["rb-fibonacci-memoization", "Generate Fibonacci Numbers Recursively and with Memoization", "Easy", "Return the first n Fibonacci numbers and compare a direct recursive solution with a memoized solution."],
    ["rb-subsets-array", "Generate All Subsets of an Array", "Medium", "Given an array of distinct values, return every possible subset."],
    ["rb-subsequences-string", "Generate All Subsequences of a String", "Medium", "Given a string, generate all subsequences while preserving character order."],
    ["rb-permutations-array", "Generate All Permutations of an Array", "Medium", "Given an array of distinct values, return all possible permutations."],
    ["rb-unique-permutations", "Generate Unique Permutations with Duplicate Values", "Medium", "Given an array that may contain duplicates, return each distinct permutation exactly once."],
    ["rb-combinations", "Generate Combinations of Numbers", "Medium", "Given integers n and k, return all ways to choose k distinct values from 1 through n."],
    ["rb-combination-sum", "Combination Sum", "Medium", "Given distinct positive candidates and a target, return combinations summing to the target. A candidate may be reused."],
    ["rb-combination-sum-ii", "Combination Sum II", "Medium", "Given candidates that may contain duplicates and a target, return unique combinations summing to the target. Each candidate may be used once."],
    ["rb-generate-parentheses", "Generate All Valid Parentheses", "Medium", "Given n pairs of parentheses, generate every well-formed sequence."],
    ["rb-n-queens", "Solve the N-Queens Problem", "Hard", "Place n queens on an n by n chessboard so no two queens attack each other, and return all valid board arrangements."],
    ["rb-sudoku-solver", "Solve Sudoku", "Hard", "Fill an incomplete 9 by 9 Sudoku board so each row, column, and 3 by 3 box contains digits 1 through 9 exactly once."],
    ["rb-rat-in-maze", "Rat in a Maze", "Medium", "Find all paths from the top-left to the bottom-right of a maze, moving only through open cells."],
    ["rb-word-search", "Word Search", "Medium", "Determine whether a word can be formed from adjacent horizontal or vertical grid cells without reusing a cell."],
    ["rb-palindrome-partitioning", "Palindrome Partitioning", "Medium", "Partition a string into substrings so every substring is a palindrome, and return all valid partitions."],
    ["rb-restore-ip-addresses", "Restore Valid IP Addresses", "Medium", "Given a string of digits, insert three dots to form all valid IPv4 addresses while preserving digit order."],
    ["rb-phone-letter-combinations", "Letter Combinations of a Phone Number", "Medium", "Given digits from 2 through 9, return all letter combinations they could represent on a phone keypad."],
    ["rb-expression-target", "Generate Expressions for a Target Value", "Hard", "Given a digit string and target, insert +, -, or * between digits to create expressions evaluating to the target."],
    ["rb-partition-equal-subsets", "Partition an Array into Equal-Sum Subsets", "Hard", "Determine whether an array can be partitioned into k non-empty subsets with equal sums."],
    ["rb-hamiltonian-path", "Find a Hamiltonian Path in a Small Graph", "Hard", "Given a small graph, determine whether a path visits every vertex exactly once and return one such path if it exists."]
  ]),
  ...createQuestions("trees", "binary-trees", [
    ["bt-preorder", "Implement Preorder Traversal", "Easy", "Return the node values of a binary tree in preorder: root, left, right."],
    ["bt-inorder", "Implement Inorder Traversal", "Easy", "Return the node values of a binary tree in inorder: left, root, right."],
    ["bt-postorder", "Implement Postorder Traversal", "Easy", "Return the node values of a binary tree in postorder: left, right, root."],
    ["bt-level-order", "Implement Level-Order Traversal", "Medium", "Return binary-tree values level by level from top to bottom."],
    ["bt-zigzag-level-order", "Zigzag Level-Order Traversal", "Medium", "Return binary-tree levels in alternating left-to-right and right-to-left order."],
    ["bt-maximum-depth", "Find the Height or Maximum Depth of a Tree", "Easy", "Return the number of nodes on the longest path from the root to a leaf."],
    ["bt-minimum-depth", "Find the Minimum Depth of a Tree", "Easy", "Return the number of nodes on the shortest path from the root to a leaf."],
    ["bt-count-nodes", "Count Nodes in a Binary Tree", "Easy", "Count all nodes in a binary tree."],
    ["bt-identical-trees", "Check Whether Two Trees Are Identical", "Easy", "Determine whether two binary trees have the same structure and node values."],
    ["bt-symmetric-tree", "Check Whether a Binary Tree Is Symmetric", "Easy", "Determine whether a binary tree is a mirror of itself around its center."],
    ["bt-diameter", "Find the Diameter of a Binary Tree", "Easy", "Find the number of edges on the longest path between any two nodes."],
    ["bt-maximum-path-sum", "Find the Maximum Path Sum", "Hard", "Find the maximum sum of node values along any non-empty path in a binary tree."],
    ["bt-lowest-common-ancestor", "Find the Lowest Common Ancestor", "Medium", "Given two nodes in a binary tree, find their lowest common ancestor."],
    ["bt-height-balanced", "Check Whether a Tree Is Height-Balanced", "Easy", "Determine whether every node's left and right subtree heights differ by at most one."],
    ["bt-boundary-traversal", "Find the Boundary Traversal of a Tree", "Medium", "Return the root boundary in anti-clockwise order without duplicating nodes."],
    ["bt-vertical-order", "Find the Vertical Order Traversal", "Hard", "Group binary-tree nodes by vertical column, ordering ties by row and then value."],
    ["bt-top-bottom-view", "Find the Top View and Bottom View", "Medium", "Return the visible node values when viewing a binary tree from above and from below."],
    ["bt-left-right-view", "Find the Left View and Right View", "Medium", "Return the first and last visible node at every depth of a binary tree."],
    ["bt-right-side-view-level-order", "Find the Right-Side View Using Level Order", "Medium", "Return the rightmost node value at each level using level-order traversal."],
    ["bt-build-preorder-inorder", "Construct a Tree from Preorder and Inorder Traversals", "Medium", "Reconstruct a binary tree from its preorder and inorder traversals. Assume values are unique."],
    ["bt-serialize-deserialize", "Serialize and Deserialize a Binary Tree", "Hard", "Design methods to serialize a binary tree to a string and deserialize it back to the same tree."],
    ["bt-flatten-linked-list", "Flatten a Binary Tree into a Linked List", "Medium", "Flatten a binary tree in place to follow preorder traversal, using right pointers and setting left pointers to null."],
    ["bt-root-leaf-paths", "Find All Root-to-Leaf Paths", "Easy", "Return every path from the root to a leaf."],
    ["bt-path-sum-target", "Find a Path Sum Equal to a Target", "Easy", "Determine whether a root-to-leaf path has values summing to a target."],
    ["bt-maximum-width", "Find the Maximum Width of a Binary Tree", "Medium", "Find the maximum width among levels, counting gaps between the end nodes as if the tree were complete."]
  ]),
  ...createQuestions("trees", "binary-search-trees", [
    ["bst-search-key", "Search for a Key in a BST", "Easy", "Given a binary search tree and key, return the node containing the key or null if it is absent."],
    ["bst-insert-node", "Insert a Node into a BST", "Medium", "Insert a value into a binary search tree and return the updated root."],
    ["bst-delete-node", "Delete a Node from a BST", "Medium", "Delete a key from a binary search tree while preserving the BST ordering property."],
    ["bst-validate", "Validate Whether a Binary Tree Is a BST", "Medium", "Determine whether a binary tree satisfies strict BST ordering for every node and its descendants."],
    ["bst-minimum-maximum", "Find the Minimum and Maximum Values in a BST", "Easy", "Return the minimum and maximum values in a non-empty binary search tree."],
    ["bst-kth-smallest", "Find the k-th Smallest Element in a BST", "Medium", "Given a BST and valid k, find the k-th smallest value using one-based k."],
    ["bst-kth-largest", "Find the k-th Largest Element in a BST", "Medium", "Given a BST and valid k, find the k-th largest value using one-based k."],
    ["bst-predecessor-successor", "Find the Predecessor and Successor of a Key", "Medium", "In a BST, find the greatest value smaller than a key and the smallest value greater than it."],
    ["bst-lowest-common-ancestor", "Find the Lowest Common Ancestor in a BST", "Medium", "Given two keys in a BST, find their lowest common ancestor."],
    ["bst-balanced-from-sorted-array", "Convert a Sorted Array into a Balanced BST", "Easy", "Convert a sorted array of distinct values into a height-balanced binary search tree."],
    ["bst-to-sorted-doubly-linked-list", "Convert a BST into a Sorted Doubly Linked List", "Medium", "Convert a BST in place to a sorted doubly linked list using the tree's pointers."],
    ["bst-recover-swapped-nodes", "Recover a BST Where Two Nodes Are Swapped", "Medium", "Two values in a BST were swapped by mistake. Restore the BST without changing its structure."],
    ["bst-two-sum", "Find Two BST Nodes Whose Sum Equals a Target", "Medium", "Determine whether two distinct BST nodes have values summing to a target."],
    ["bst-range-sum", "Find the Range Sum of BST Nodes", "Easy", "Return the sum of values in a BST that fall within the inclusive range [low, high]."],
    ["bst-largest-subtree", "Find the Largest BST Subtree", "Hard", "Find the size of the largest subtree that is itself a valid binary search tree."]
  ])
]