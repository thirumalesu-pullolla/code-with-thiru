export const basicsContent = {
    "check-even-or-odd": `## Problem statement

Given any Java \`int\`, return whether it is even or odd. This includes zero and negative values.

## Examples

| Input | Output |
|---|---|
| \`7\` | \`Odd\` |
| \`-4\` | \`Even\` |
| \`0\` | \`Even\` |

## Brute-force approach: repeated subtraction

Work with a \`long\` magnitude so negating \`Integer.MIN_VALUE\` is safe. Remove pairs until fewer than two remain. A remainder of zero means even.

~~~java
public class Solution {
    public static boolean isEvenBruteForce(int number) {
        long remaining = Math.abs((long) number);
        while (remaining >= 2) {
            remaining -= 2;
        }
        return remaining == 0;
    }
}
~~~

- **Time:** O(|n|)
- **Extra space:** O(1)

## Optimized approach: inspect the last bit

In binary, even numbers end in 0 and odd numbers end in 1. The bitwise AND with 1 reads that bit directly.

~~~java
public class Solution {
    public static boolean isEven(int number) {
        return (number & 1) == 0;
    }
}
~~~

- **Time:** O(1)
- **Extra space:** O(1)

The method returns a boolean; print \`Even\` when it is true and \`Odd\` otherwise.`,

    "check-prime-number": `## Problem statement

Given an integer \`n\`, determine whether it is prime. A prime is greater than 1 and has no positive divisors other than 1 and itself.

## Examples

| Input | Output |
|---|---|
| \`29\` | \`true\` |
| \`1\` | \`false\` |
| \`35\` | \`false\` |

## Brute-force approach: test every possible divisor

For values greater than 1, try every divisor from 2 up to \`n - 1\`. A divisor proves the number is composite.

~~~java
public class Solution {
    public static boolean isPrimeBruteForce(int n) {
        if (n < 2) {
            return false;
        }
        for (int divisor = 2; divisor < n; divisor++) {
            if (n % divisor == 0) {
                return false;
            }
        }
        return true;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: stop at the square root

If \`n = a * b\`, at least one factor is at most \`sqrt(n)\`. We only need to check through that boundary. Comparing \`divisor <= n / divisor\` avoids overflow from squaring the divisor.

~~~java
public class Solution {
    public static boolean isPrime(int n) {
        if (n < 2) {
            return false;
        }
        for (int divisor = 2; divisor <= n / divisor; divisor++) {
            if (n % divisor == 0) {
                return false;
            }
        }
        return true;
    }
}
~~~

- **Time:** O(sqrt(n))
- **Extra space:** O(1)

## Key edge cases

- Every integer less than 2 is not prime.
- 2 is prime; the loop does not need to run.
- A perfect square such as 49 is caught when the divisor reaches 7.`,

    "print-primes-in-range": `## Problem statement

Given inclusive bounds \`low\` and \`high\`, return all prime numbers in increasing order. If \`high < 2\` or the range is empty, return an empty list.

## Examples

| Input | Output |
|---|---|
| \`low = 10, high = 20\` | \`[11, 13, 17, 19]\` |
| \`low = -3, high = 3\` | \`[2, 3]\` |

## Brute-force approach: test each candidate

Check every number in the range by trying divisors up to its square root.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    private static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int d = 2; d <= n / d; d++) {
            if (n % d == 0) return false;
        }
        return true;
    }

    public static List<Integer> primesInRange(int low, int high) {
        List<Integer> result = new ArrayList<>();
        for (int n = Math.max(2, low); n <= high; n++) {
            if (isPrime(n)) result.add(n);
            if (n == Integer.MAX_VALUE) break;
        }
        return result;
    }
}
~~~

- **Time:** O(R sqrt(H)), where R is the number of candidates and H is the largest candidate
- **Extra space:** O(k) for the returned k primes

## Optimized approach: Sieve of Eratosthenes

Mark multiples of each prime starting at its square. Each composite is crossed off instead of retesting its divisors.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> primesInRange(int low, int high) {
        List<Integer> result = new ArrayList<>();
        if (high < 2 || low > high) return result;
        boolean[] prime = new boolean[high + 1];
        java.util.Arrays.fill(prime, 2, high + 1, true);

        for (int p = 2; p <= high / p; p++) {
            if (prime[p]) {
                for (long multiple = (long) p * p;
                     multiple <= high; multiple += p) {
                    prime[(int) multiple] = false;
                }
            }
        }
        for (int n = Math.max(2, low); n <= high; n++) {
            if (prime[n]) result.add(n);
        }
        return result;
    }
}
~~~

- **Time:** O(H log log H)
- **Extra space:** O(H), plus the returned list

For a very large upper bound and a narrow interval, use a segmented sieve to reduce memory.`,

    "factorial-of-number": `## Problem statement

For a non-negative integer \`n\`, calculate \`n!\`. By definition, \`0! = 1\`. Use \`BigInteger\` so results do not overflow Java's primitive integer types.

## Examples

| Input | Output |
|---|---|
| \`0\` | \`1\` |
| \`5\` | \`120\` |

## Brute-force approach: recursion

Use the recurrence \`n! = n * (n - 1)!\`, with \`0!\` and \`1!\` as base cases. Deep recursion can exhaust the call stack for large inputs.

~~~java
import java.math.BigInteger;

public class Solution {
    public static BigInteger factorialRecursive(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be non-negative");
        }
        if (n < 2) {
            return BigInteger.ONE;
        }
        return BigInteger.valueOf(n)
                .multiply(factorialRecursive(n - 1));
    }
}
~~~

- **Time:** O(n) multiplications (not counting the cost of large-integer arithmetic)
- **Extra space:** O(n) call-stack frames

## Optimized approach: iterative multiplication

Multiply the factors from 2 through \`n\`. This avoids recursive call-stack growth.

~~~java
import java.math.BigInteger;

public class Solution {
    public static BigInteger factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be non-negative");
        }
        BigInteger result = BigInteger.ONE;
        for (int factor = 2; factor <= n; factor++) {
            result = result.multiply(BigInteger.valueOf(factor));
        }
        return result;
    }
}
~~~

- **Time:** O(n) multiplications (not counting the cost of large-integer arithmetic)
- **Extra space:** O(1) auxiliary variables; the result itself requires O(n log n) bits

## Why use BigInteger?

Even 13! is larger than the maximum signed 32-bit integer. Returning a \`BigInteger\` preserves the exact answer instead of silently overflowing.`,

    "generate-fibonacci-sequence": `## Problem statement

Return the first \`n\` Fibonacci numbers, starting with 0 and 1. For example, the sequence begins \`0, 1, 1, 2, 3, 5\`. For \`n = 0\`, return an empty list.

## Examples

| Input | Output |
|---|---|
| \`n = 0\` | \`[]\` |
| \`n = 1\` | \`[0]\` |
| \`n = 7\` | \`[0, 1, 1, 2, 3, 5, 8]\` |

## Brute-force approach: recursive calculation

Compute each sequence value using \`F(k) = F(k - 1) + F(k - 2)\`. The same values are recalculated many times, so runtime grows exponentially.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    private static long fibonacci(int index) {
        if (index < 2) {
            return index;
        }
        return fibonacci(index - 1) + fibonacci(index - 2);
    }

    public static List<Long> generateBruteForce(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be non-negative");
        }
        List<Long> result = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            result.add(fibonacci(i));
        }
        return result;
    }
}
~~~

- **Time:** O(2^n)
- **Extra space:** O(n) recursion depth, excluding the returned list

## Optimized approach: keep the previous two values

Each next number depends only on the previous two. Build the result in one pass rather than recalculating earlier values.

~~~java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Long> generate(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be non-negative");
        }
        List<Long> result = new ArrayList<>(n);
        long previous = 0;
        long current = 1;

        for (int i = 0; i < n; i++) {
            result.add(previous);
            long next = previous + current;
            previous = current;
            current = next;
        }
        return result;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1) auxiliary variables, excluding the O(n) returned list

## Important note

This example uses \`long\`; Fibonacci values eventually exceed its range. For large \`n\`, use \`BigInteger\` for the two running values.`,

    "palindrome-number": `## Problem statement

Return whether the decimal representation of an integer reads the same from both ends. Negative values are not palindromes.

## Examples

| Input | Output |
|---|---|
| \`1221\` | \`true\` |
| \`-121\` | \`false\` |
| \`10\` | \`false\` |

## Brute-force approach: compare characters

Convert the number to text, then compare matching characters from the two ends.

~~~java
public class Solution {
    public static boolean isPalindromeBruteForce(int number) {
        if (number < 0) return false;
        String text = Integer.toString(number);
        int left = 0, right = text.length() - 1;
        while (left < right) {
            if (text.charAt(left++) != text.charAt(right--)) return false;
        }
        return true;
    }
}
~~~

- **Time:** O(d), where d is the number of digits
- **Extra space:** O(d) for the string

## Optimized approach: reverse half the digits

Reverse only the lower half. For an even number of digits both halves match; for an odd number, discard the middle digit from the reversed half.

~~~java
public class Solution {
    public static boolean isPalindrome(int number) {
        if (number < 0 || (number % 10 == 0 && number != 0)) return false;
        int reversedHalf = 0;
        while (number > reversedHalf) {
            reversedHalf = reversedHalf * 10 + number % 10;
            number /= 10;
        }
        return number == reversedHalf || number == reversedHalf / 10;
    }
}
~~~

- **Time:** O(d)
- **Extra space:** O(1)

The trailing-zero check prevents values such as 10 from being mistaken for palindromes.`,

    "reverse-integer": `## Problem statement

Reverse the decimal digits of a signed 32-bit integer, keeping its sign. Return \`0\` if the reversed value is outside the signed 32-bit range.

## Examples

| Input | Output |
|---|---|
| \`123\` | \`321\` |
| \`-120\` | \`-21\` |
| \`1534236469\` | \`0\` (overflow) |

## Brute-force approach: reverse a string

Reverse the magnitude as text and parse it using \`long\`. Check the 32-bit range before converting back.

~~~java
public class Solution {
    public static int reverseBruteForce(int number) {
        boolean negative = number < 0;
        String reversed = new StringBuilder(
                Long.toString(Math.abs((long) number)))
                .reverse().toString();
        long value = Long.parseLong(reversed);
        if (negative) value = -value;
        if (value < Integer.MIN_VALUE || value > Integer.MAX_VALUE) return 0;
        return (int) value;
    }
}
~~~

- **Time:** O(d)
- **Extra space:** O(d)

## Optimized approach: build the number digit by digit

Before multiplying the result by ten, check whether the next digit would overflow. This avoids allocating strings.

~~~java
public class Solution {
    public static int reverse(int number) {
        int result = 0;
        while (number != 0) {
            int digit = number % 10;
            number /= 10;
            if (result > Integer.MAX_VALUE / 10
                    || (result == Integer.MAX_VALUE / 10 && digit > 7)) return 0;
            if (result < Integer.MIN_VALUE / 10
                    || (result == Integer.MIN_VALUE / 10 && digit < -8)) return 0;
            result = result * 10 + digit;
        }
        return result;
    }
}
~~~

- **Time:** O(d)
- **Extra space:** O(1)

The boundary digits 7 and -8 come from the last digits of \`Integer.MAX_VALUE\` and \`Integer.MIN_VALUE\`.`,

    "armstrong-number": `## Problem statement

A non-negative integer is an Armstrong number if it equals the sum of each digit raised to the number of digits. Return whether \`n\` has this property.

## Examples

| Input | Output |
|---|---|
| \`153\` | \`true\` because \`1³ + 5³ + 3³ = 153\` |
| \`10\` | \`false\` |

## Brute-force approach: use floating-point power

Count the digits, then sum each digit's power using \`Math.pow\`. This is concise, but floating-point arithmetic can round for larger powers.

~~~java
public class Solution {
    public static boolean isArmstrongBruteForce(int n) {
        if (n < 0) return false;
        int digits = Integer.toString(n).length();
        long sum = 0;
        for (char c : Integer.toString(n).toCharArray()) {
            sum += (long) Math.pow(c - '0', digits);
        }
        return sum == n;
    }
}
~~~

- **Time:** O(d)
- **Extra space:** O(d)

## Optimized approach: precompute digit powers with integer arithmetic

Precompute the powers for digits 0 through 9 once, then process the number with division and remainder. Integer arithmetic avoids floating-point rounding; a \`long\` sum avoids overflow for an \`int\` input.

~~~java
public class Solution {
    public static boolean isArmstrong(int n) {
        if (n < 0) return false;
        int digits = Integer.toString(n).length();
        long[] powers = new long[10];
        for (int digit = 0; digit <= 9; digit++) {
            long power = 1;
            for (int i = 0; i < digits; i++) power *= digit;
            powers[digit] = power;
        }
        int remaining = n;
        long sum = 0;
        do {
            sum += powers[remaining % 10];
            remaining /= 10;
        } while (remaining != 0);
        return sum == n;
    }
}
~~~

- **Time:** O(d) for an \`int\` input because the digit alphabet has fixed size
- **Extra space:** O(1) for the fixed 10-entry table

Zero is handled by the \`do-while\`: its one digit contributes zero.`,

    "sum-of-digits": `## Problem statement

Return the sum of the decimal digits of an integer. Ignore its sign, including for the minimum 32-bit integer.

## Examples

| Input | Output |
|---|---|
| \`-502\` | \`7\` |
| \`0\` | \`0\` |

## Brute-force approach: convert to text

Convert the absolute value to \`long\` first so \`Integer.MIN_VALUE\` can be represented, then add each character's numeric value.

~~~java
public class Solution {
    public static int digitSumBruteForce(int number) {
        String digits = Long.toString(Math.abs((long) number));
        int sum = 0;
        for (char digit : digits.toCharArray()) sum += digit - '0';
        return sum;
    }
}
~~~

- **Time:** O(d)
- **Extra space:** O(d)

## Optimized approach: use remainder and division

Repeatedly take the last digit with \`% 10\`, add its absolute value, and remove it with \`/ 10\`.

~~~java
public class Solution {
    public static int digitSum(int number) {
        long remaining = Math.abs((long) number);
        int sum = 0;
        while (remaining > 0) {
            sum += remaining % 10;
            remaining /= 10;
        }
        return sum;
    }
}
~~~

- **Time:** O(d)
- **Extra space:** O(1)

The \`long\` conversion is important: \`Math.abs(Integer.MIN_VALUE)\` overflows if performed as an \`int\`.`,

    "count-digits": `## Problem statement

Return how many decimal digits an integer contains. Zero has one digit; a negative sign is not counted.

## Examples

| Input | Output |
|---|---|
| \`-804\` | \`3\` |
| \`0\` | \`1\` |

## Brute-force approach: convert to text

Convert to a string and exclude a possible leading minus sign.

~~~java
public class Solution {
    public static int countDigitsBruteForce(int number) {
        String value = Integer.toString(number);
        return value.charAt(0) == '-' ? value.length() - 1 : value.length();
    }
}
~~~

- **Time:** O(d)
- **Extra space:** O(d)

## Optimized approach: divide by ten

Use a \`long\` magnitude to safely handle \`Integer.MIN_VALUE\`, then count how many times it can be divided by ten.

~~~java
public class Solution {
    public static int countDigits(int number) {
        long remaining = Math.abs((long) number);
        if (remaining == 0) return 1;
        int count = 0;
        while (remaining > 0) {
            count++;
            remaining /= 10;
        }
        return count;
    }
}
~~~

- **Time:** O(d)
- **Extra space:** O(1)`,

    "gcd-and-lcm": `## Problem statement

For two signed 32-bit integers, return their non-negative greatest common divisor (GCD) and least common multiple (LCM). Define LCM as zero when either input is zero.

## Examples

| Inputs | GCD | LCM |
|---|---:|---:|
| \`12, 18\` | 6 | 36 |
| \`-4, 6\` | 2 | 12 |

## Brute-force approach: test common divisors

Check candidate divisors downward from the smaller absolute value. Use \`long\` magnitudes to handle \`Integer.MIN_VALUE\`.

~~~java
public class Solution {
    public static long[] gcdLcmBruteForce(int a, int b) {
        long x = Math.abs((long) a), y = Math.abs((long) b);
        if (x == 0 || y == 0) return new long[] {Math.max(x, y), 0};
        long gcd = 1;
        for (long d = Math.min(x, y); d >= 1; d--) {
            if (x % d == 0 && y % d == 0) {
                gcd = d;
                break;
            }
        }
        return new long[] {gcd, (x / gcd) * y};
    }
}
~~~

- **Time:** O(min(|a|, |b|))
- **Extra space:** O(1), excluding the two-value result

## Optimized approach: Euclidean algorithm

Replace \`(x, y)\` with \`(y, x % y)\` until the remainder is zero. Then calculate LCM as \`(x / gcd) * y\` to reduce overflow risk.

~~~java
public class Solution {
    public static long[] gcdLcm(int a, int b) {
        long x = Math.abs((long) a), y = Math.abs((long) b);
        long first = x, second = y;
        while (second != 0) {
            long remainder = first % second;
            first = second;
            second = remainder;
        }
        long gcd = first;
        long lcm = (x == 0 || y == 0) ? 0 : (x / gcd) * y;
        return new long[] {gcd, lcm};
    }
}
~~~

- **Time:** O(log min(|a|, |b|))
- **Extra space:** O(1), excluding the result

The LCM can exceed the range of \`int\`, so the methods return \`long\`.`,

    "perfect-number": `## Problem statement

A positive integer is perfect when it equals the sum of its positive divisors excluding itself. Return whether \`n\` is perfect.

## Examples

| Input | Output |
|---|---|
| \`28\` | \`true\` because \`1 + 2 + 4 + 7 + 14 = 28\` |
| \`12\` | \`false\` |

## Brute-force approach: check every smaller number

Test each integer from 1 through \`n - 1\` and add it if it divides \`n\`.

~~~java
public class Solution {
    public static boolean isPerfectBruteForce(int n) {
        if (n <= 1) return false;
        long sum = 0;
        for (int divisor = 1; divisor < n; divisor++) {
            if (n % divisor == 0) sum += divisor;
        }
        return sum == n;
    }
}
~~~

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: process divisor pairs

Divisors occur in pairs \`d\` and \`n / d\`. Check only through the square root, and add each proper divisor pair once.

~~~java
public class Solution {
    public static boolean isPerfect(int n) {
        if (n <= 1) return false;
        long sum = 1;
        for (int d = 2; d <= n / d; d++) {
            if (n % d == 0) {
                sum += d;
                int paired = n / d;
                if (paired != d) sum += paired;
            }
        }
        return sum == n;
    }
}
~~~

- **Time:** O(sqrt(n))
- **Extra space:** O(1)

The square-root divisor of a perfect square must not be added twice.`,

    "power-of-two": `## Problem statement

Return whether an integer is a positive power of two. Zero and negative numbers are not powers of two.

## Examples

| Input | Output |
|---|---|
| \`16\` | \`true\` |
| \`18\` | \`false\` |
| \`0\` | \`false\` |

## Brute-force approach: repeatedly divide

For a positive number, divide by two while it is even. It is a power of two if the remaining value is one.

~~~java
public class Solution {
    public static boolean isPowerOfTwoBruteForce(int n) {
        if (n <= 0) return false;
        while (n % 2 == 0) n /= 2;
        return n == 1;
    }
}
~~~

- **Time:** O(log n)
- **Extra space:** O(1)

## Optimized approach: one set bit

A positive power of two has exactly one set bit in binary. Subtracting one clears that bit and sets all lower bits, so their bitwise AND is zero.

~~~java
public class Solution {
    public static boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}
~~~

- **Time:** O(1)
- **Extra space:** O(1)`,

    "decimal-to-binary": `## Problem statement

Convert a non-negative Java \`int\` to base-2 text without leading zeroes. Represent zero as \`"0"\`.

## Examples

| Input | Output |
|---|---|
| \`13\` | \`"1101"\` |
| \`0\` | \`"0"\` |

## Brute-force approach: repeated division

Repeatedly divide by two and collect remainders from least significant to most significant. Reverse them at the end.

~~~java
public class Solution {
    public static String toBinaryBruteForce(int number) {
        if (number < 0) throw new IllegalArgumentException("number must be non-negative");
        if (number == 0) return "0";
        StringBuilder reversed = new StringBuilder();
        while (number > 0) {
            reversed.append(number % 2);
            number /= 2;
        }
        return reversed.reverse().toString();
    }
}
~~~

- **Time:** O(log n)
- **Extra space:** O(log n) for the output

## Optimized approach: inspect bits from left to right

Find the highest set-bit position and read each bit once. This avoids a separate reversal.

~~~java
public class Solution {
    public static String toBinary(int number) {
        if (number < 0) throw new IllegalArgumentException("number must be non-negative");
        if (number == 0) return "0";
        StringBuilder result = new StringBuilder();
        int highestBit = 31 - Integer.numberOfLeadingZeros(number);
        for (int bit = highestBit; bit >= 0; bit--) {
            result.append((number >>> bit) & 1);
        }
        return result.toString();
    }
}
~~~

- **Time:** O(log n)
- **Extra space:** O(log n) for the output`,

    "binary-to-decimal": `## Problem statement

Convert a non-empty string containing only \`0\` and \`1\` to its exact decimal value. Reject invalid characters and values too large for \`long\`.

## Examples

| Input | Output |
|---|---:|
| \`"10110"\` | 22 |
| \`"0"\` | 0 |

## Brute-force approach: sum positional powers

For each set bit, calculate its power-of-two place value and add it to a \`BigInteger\`. This is simple but recomputes powers.

~~~java
import java.math.BigInteger;

public class Solution {
    public static BigInteger binaryToDecimalBruteForce(String bits) {
        BigInteger value = BigInteger.ZERO;
        int power = 0;
        for (int i = bits.length() - 1; i >= 0; i--, power++) {
            char bit = bits.charAt(i);
            if (bit != '0' && bit != '1') throw new IllegalArgumentException("Invalid bit");
            if (bit == '1') value = value.add(BigInteger.ONE.shiftLeft(power));
        }
        return value;
    }
}
~~~

- **Time:** O(d²) bit work with repeated large-integer additions
- **Extra space:** O(d) for the result

## Optimized approach: accumulate by shifting

Read from left to right. Each step shifts the accumulated value left (multiply by two) and adds the next bit.

~~~java
public class Solution {
    public static long binaryToDecimal(String bits) {
        if (bits.isEmpty()) throw new IllegalArgumentException("bits must not be empty");
        long value = 0;
        for (int i = 0; i < bits.length(); i++) {
            char bit = bits.charAt(i);
            if (bit != '0' && bit != '1') throw new IllegalArgumentException("Invalid bit");
            int digit = bit - '0';
            if (value > (Long.MAX_VALUE - digit) / 2) {
                throw new ArithmeticException("Value exceeds long range");
            }
            value = value * 2 + digit;
        }
        return value;
    }
}
~~~

- **Time:** O(d)
- **Extra space:** O(1), excluding the returned value

Use the \`BigInteger\` version when the input may exceed the \`long\` range.`,

    "greatest-of-three": `## Problem statement

Return the greatest of three integers. Inputs may be negative or equal.

## Examples

| Inputs | Output |
|---|---:|
| \`-4, 12, 7\` | 12 |
| \`5, 5, 2\` | 5 |

## Brute-force approach: sort the values

Place the three inputs in an array, sort it, and return the final element.

~~~java
import java.util.Arrays;

public class Solution {
    public static int greatestBruteForce(int a, int b, int c) {
        int[] values = {a, b, c};
        Arrays.sort(values);
        return values[2];
    }
}
~~~

- **Time:** O(1) for a fixed three-element input
- **Extra space:** O(1)

## Optimized approach: compare once per value

Keep the current maximum and update it when either remaining input is larger.

~~~java
public class Solution {
    public static int greatest(int a, int b, int c) {
        int greatest = a;
        if (b > greatest) greatest = b;
        if (c > greatest) greatest = c;
        return greatest;
    }
}
~~~

- **Time:** O(1)
- **Extra space:** O(1)

The sorting approach is useful as a simple baseline; direct comparisons avoid sorting work.`,

    "swap-without-temporary": `## Problem statement

Swap two integer values without declaring a third variable and without risking arithmetic overflow.

## Examples

Input values \`a = 8\`, \`b = -3\` become \`a = -3\`, \`b = 8\`.

## Brute-force approach: use a temporary variable

This is the clearest and recommended production approach, but it does not meet the no-third-variable constraint.

~~~java
public class Solution {
    public static void swapWithTemporary(int[] values) {
        int temporary = values[0];
        values[0] = values[1];
        values[1] = temporary;
    }
}
~~~

- **Time:** O(1)
- **Extra space:** O(1) for one temporary value

## Optimized approach for the stated constraint: XOR swap

XOR combines and separates the bit patterns without arithmetic overflow. The parameters must refer to distinct storage locations; an array makes that condition explicit.

~~~java
public class Solution {
    public static void swapWithoutTemporary(int[] values) {
        if (values == null || values.length < 2) {
            throw new IllegalArgumentException("Two values are required");
        }
        values[0] ^= values[1];
        values[1] ^= values[0];
        values[0] ^= values[1];
    }
}
~~~

- **Time:** O(1)
- **Extra space:** O(1)

In normal application code, prefer the temporary-variable version: it is clearer and avoids aliasing pitfalls.`,

    "integer-square-root-binary-search": `## Problem statement

Given a non-negative integer \`n\`, return \`floor(sqrt(n))\` without using a square-root function.

## Examples

| Input | Output |
|---|---:|
| \`n = 27\` | 5 |
| \`n = 0\` | 0 |

## Brute-force approach: count upward

Increase a candidate until its square would exceed \`n\`. Use division rather than multiplication to prevent overflow.

~~~java
public class Solution {
    public static int floorSqrtBruteForce(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be non-negative");
        int candidate = 0;
        while (candidate + 1 <= n / (candidate + 1)) candidate++;
        return candidate;
    }
}
~~~

- **Time:** O(sqrt(n))
- **Extra space:** O(1)

## Optimized approach: binary search

The answer lies between zero and \`n\`. Binary search finds the largest candidate satisfying \`candidate <= n / candidate\`.

~~~java
public class Solution {
    public static int floorSqrt(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be non-negative");
        int low = 0, high = Math.min(n, 46340), answer = 0;
        while (low <= high) {
            int middle = low + (high - low) / 2;
            if (middle == 0 || middle <= n / middle) {
                answer = middle;
                low = middle + 1;
            } else {
                high = middle - 1;
            }
        }
        return answer;
    }
}
~~~

- **Time:** O(log n)
- **Extra space:** O(1)

The upper bound 46340 is the largest integer whose square fits in a signed \`int\`.`,

    "fast-exponentiation": `## Problem statement

Calculate \`base\` raised to a non-negative integer exponent and return the exact result. Use \`BigInteger\` to avoid fixed-width overflow.

## Examples

| Input | Output |
|---|---:|
| \`base = -2, exponent = 5\` | -32 |
| \`base = 7, exponent = 0\` | 1 |

## Brute-force approach: multiply once per exponent

Start at one and multiply by the base \`exponent\` times.

~~~java
import java.math.BigInteger;

public class Solution {
    public static BigInteger powerBruteForce(int base, int exponent) {
        if (exponent < 0) throw new IllegalArgumentException("exponent must be non-negative");
        BigInteger result = BigInteger.ONE;
        BigInteger factor = BigInteger.valueOf(base);
        for (int i = 0; i < exponent; i++) result = result.multiply(factor);
        return result;
    }
}
~~~

- **Time:** O(e) multiplications for exponent e, excluding large-integer costs
- **Extra space:** O(1) auxiliary variables; result size is O(e log |base|) bits

## Optimized approach: exponentiation by squaring

When the exponent is even, square the base and halve the exponent. When it is odd, multiply the result by the current base first.

~~~java
import java.math.BigInteger;

public class Solution {
    public static BigInteger power(int base, int exponent) {
        if (exponent < 0) throw new IllegalArgumentException("exponent must be non-negative");
        BigInteger result = BigInteger.ONE;
        BigInteger factor = BigInteger.valueOf(base);
        int remaining = exponent;
        while (remaining > 0) {
            if ((remaining & 1) == 1) result = result.multiply(factor);
            factor = factor.multiply(factor);
            remaining >>>= 1;
        }
        return result;
    }
}
~~~

- **Time:** O(log e) multiplications, excluding large-integer costs
- **Extra space:** O(1) auxiliary variables; result size is O(e log |base|) bits`,

    "number-and-star-patterns": `## Problem statement

For a positive row count \`n\`, print two patterns: a right-aligned star triangle and an increasing-number triangle. Each row ends with a newline.

## Examples

For \`n = 3\`, the output is:

\`\`\`text
  *
 **
***
1
12
123
\`\`\`

## Brute-force approach: print each character

Use nested loops and write each space, star, digit, and newline directly.

~~~java
public class Solution {
    public static void printPatternsBruteForce(int n) {
        if (n <= 0) throw new IllegalArgumentException("n must be positive");
        for (int row = 1; row <= n; row++) {
            for (int space = row; space < n; space++) System.out.print(' ');
            for (int star = 0; star < row; star++) System.out.print('*');
            System.out.println();
        }
        for (int row = 1; row <= n; row++) {
            for (int digit = 1; digit <= row; digit++) System.out.print(digit);
            System.out.println();
        }
    }
}
~~~

- **Time:** O(n²), equal to the number of printed characters
- **Extra space:** O(1)

## Optimized approach: buffer output

Build the output in a \`StringBuilder\` and write it once. The total output is still quadratic, but buffered output avoids many small I/O operations.

~~~java
public class Solution {
    public static void printPatterns(int n) {
        if (n <= 0) throw new IllegalArgumentException("n must be positive");
        StringBuilder output = new StringBuilder();
        for (int row = 1; row <= n; row++) {
            output.append(" ".repeat(n - row));
            output.append("*".repeat(row)).append('\\n');
        }
        for (int row = 1; row <= n; row++) {
            for (int digit = 1; digit <= row; digit++) output.append(digit);
            output.append('\\n');
        }
        System.out.print(output);
    }
}
~~~

- **Time:** O(n²)
- **Extra space:** O(n²) for the buffered output

The output size itself is O(n²), so no implementation can print both patterns in less than O(n²) time.`,
};
