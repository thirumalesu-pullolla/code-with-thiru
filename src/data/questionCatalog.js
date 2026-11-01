function createQuestions(topicId, patternId, entries) {
  return entries.map(([id, title, difficulty, description]) => ({
    id,
    title,
    topicId,
    patternId,
    difficulty,
    description,
    contentType: "markdown",
    content: `## Problem Statement

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
  ])
];
