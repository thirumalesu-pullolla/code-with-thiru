export const stackQueueContent = {
  "sq-stack-array": `## Problem statement

Implement a bounded integer stack with push, pop, peek, and isEmpty operations. Push on full or pop/peek on empty throws an exception.

## Example

Push 4, then 7; pop returns 7 and peek returns 4.

## Brute-force approach: shift values on every pop

Store the bottom at index zero and shift all remaining values after a pop.

\`\`\`java
public class Solution {
    static class Stack {
        private final int[] values;
        private int size;
        Stack(int capacity) { values = new int[capacity]; }
        void push(int value) {
            if (size == values.length) throw new IllegalStateException("Stack full");
            values[size++] = value;
        }
        int pop() {
            if (size == 0) throw new IllegalStateException("Stack empty");
            int result = values[0];
            System.arraycopy(values, 1, values, 0, --size);
            return result;
        }
        int peek() {
            if (size == 0) throw new IllegalStateException("Stack empty");
            return values[0];
        }
        boolean isEmpty() { return size == 0; }
    }
}
\`\`\`

- **Time:** O(n) pop; O(1) push and peek
- **Extra space:** O(capacity)

## Optimized approach: use the array end as the stack top

Increment size on push and decrement on pop so all operations are constant time.

\`\`\`java
public class Solution {
    static class Stack {
        private final int[] values;
        private int size;
        Stack(int capacity) { values = new int[capacity]; }
        void push(int value) {
            if (size == values.length) throw new IllegalStateException("Stack full");
            values[size++] = value;
        }
        int pop() {
            if (size == 0) throw new IllegalStateException("Stack empty");
            return values[--size];
        }
        int peek() {
            if (size == 0) throw new IllegalStateException("Stack empty");
            return values[size - 1];
        }
        boolean isEmpty() { return size == 0; }
    }
}
\`\`\`

- **Time:** O(1) per operation
- **Extra space:** O(capacity)`,

  "sq-stack-linked-nodes": `## Problem statement

Implement an integer stack using linked nodes with push, pop, peek, and isEmpty operations.

## Example

Push 4, then 7; pop returns 7 and the next pop returns 4.

## Brute-force approach: append at the tail

Walk to the final node for push and pop.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value) { this.value = value; } }
    static class Stack {
        private Node bottom;
        void push(int value) {
            Node node = new Node(value);
            if (bottom == null) bottom = node;
            else { Node tail = bottom; while (tail.next != null) tail = tail.next; tail.next = node; }
        }
        int pop() {
            if (bottom == null) throw new IllegalStateException("Stack empty");
            if (bottom.next == null) { int value = bottom.value; bottom = null; return value; }
            Node node = bottom; while (node.next.next != null) node = node.next;
            int value = node.next.value; node.next = null; return value;
        }
        int peek() {
            if (bottom == null) throw new IllegalStateException("Stack empty");
            Node tail = bottom;
            while (tail.next != null) tail = tail.next;
            return tail.value;
        }
        boolean isEmpty() { return bottom == null; }
    }
}
\`\`\`

- **Time:** O(n) push and pop
- **Extra space:** O(n)

## Optimized approach: keep the top at the head

Insert and remove the head node, making each stack operation constant time.

\`\`\`java
public class Solution {
    static class Node { int value; Node next; Node(int value, Node next) { this.value = value; this.next = next; } }
    static class Stack {
        private Node top;
        void push(int value) { top = new Node(value, top); }
        int pop() {
            if (top == null) throw new IllegalStateException("Stack empty");
            int value = top.value; top = top.next; return value;
        }
        int peek() {
            if (top == null) throw new IllegalStateException("Stack empty");
            return top.value;
        }
        boolean isEmpty() { return top == null; }
    }
}
\`\`\`

- **Time:** O(1) per operation
- **Extra space:** O(n)`,

  "sq-queue-array": `## Problem statement

Implement a bounded integer FIFO queue with enqueue, dequeue, peek, and isEmpty operations.

## Example

Enqueue 4, then 7; dequeue returns 4 and peek returns 7.

## Brute-force approach: shift the array after dequeue

\`\`\`java
public class Solution {
    static class Queue {
        private final int[] values;
        private int size;
        Queue(int capacity) { values = new int[capacity]; }
        void enqueue(int value) {
            if (size == values.length) throw new IllegalStateException("Queue full");
            values[size++] = value;
        }
        int dequeue() {
            if (size == 0) throw new IllegalStateException("Queue empty");
            int value = values[0];
            System.arraycopy(values, 1, values, 0, --size);
            return value;
        }
        int peek() {
            if (size == 0) throw new IllegalStateException("Queue empty");
            return values[0];
        }
        boolean isEmpty() { return size == 0; }
    }
}
\`\`\`

- **Time:** O(n) dequeue; O(1) enqueue and peek
- **Extra space:** O(capacity)

## Optimized approach: circular array

Track the front and size; wrap indices modulo capacity so dequeue never shifts elements.

\`\`\`java
public class Solution {
    static class Queue {
        private final int[] values;
        private int front, size;
        Queue(int capacity) {
            if (capacity <= 0) throw new IllegalArgumentException("Capacity must be positive");
            values = new int[capacity];
        }
        void enqueue(int value) {
            if (size == values.length) throw new IllegalStateException("Queue full");
            values[(front + size) % values.length] = value; size++;
        }
        int dequeue() {
            if (size == 0) throw new IllegalStateException("Queue empty");
            int value = values[front]; front = (front + 1) % values.length; size--; return value;
        }
        int peek() {
            if (size == 0) throw new IllegalStateException("Queue empty");
            return values[front];
        }
        boolean isEmpty() { return size == 0; }
    }
}
\`\`\`

- **Time:** O(1) per operation
- **Extra space:** O(capacity)`,

  "sq-queue-two-stacks": `## Problem statement

Implement a FIFO queue using two stacks. Support enqueue, dequeue, peek, and isEmpty.

## Example

Enqueue 4, then 7; dequeue returns 4.

## Brute-force approach: transfer everything for each dequeue

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    static class Queue {
        private final Deque<Integer> input = new ArrayDeque<>(), output = new ArrayDeque<>();
        void enqueue(int value) { input.push(value); }
        int dequeue() {
            if (input.isEmpty()) throw new IllegalStateException("Queue empty");
            while (!input.isEmpty()) output.push(input.pop());
            int value = output.pop();
            while (!output.isEmpty()) input.push(output.pop());
            return value;
        }
        int peek() {
            if (input.isEmpty()) throw new IllegalStateException("Queue empty");
            while (!input.isEmpty()) output.push(input.pop());
            int value = output.peek();
            while (!output.isEmpty()) input.push(output.pop());
            return value;
        }
        boolean isEmpty() { return input.isEmpty(); }
    }
}
\`\`\`

- **Time:** O(n) dequeue and peek
- **Extra space:** O(n)

## Optimized approach: transfer only when output is empty

Input stores new values; output stores the front-to-back order when it needs refilling.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    static class Queue {
        private final Deque<Integer> input = new ArrayDeque<>(), output = new ArrayDeque<>();
        void enqueue(int value) { input.push(value); }
        private void prepare() {
            if (output.isEmpty()) while (!input.isEmpty()) output.push(input.pop());
        }
        int dequeue() {
            prepare();
            if (output.isEmpty()) throw new IllegalStateException("Queue empty");
            return output.pop();
        }
        int peek() {
            prepare();
            if (output.isEmpty()) throw new IllegalStateException("Queue empty");
            return output.peek();
        }
        boolean isEmpty() { return input.isEmpty() && output.isEmpty(); }
    }
}
\`\`\`

- **Time:** O(1) amortized per operation
- **Extra space:** O(n)`,

  "sq-stack-two-queues": `## Problem statement

Implement a LIFO stack using two FIFO queues. Support push, pop, top, and isEmpty.

## Example

Push 4, then 7; pop returns 7.

## Brute-force approach: move all items on pop

\`\`\`java
import java.util.ArrayDeque;
import java.util.Queue;

public class Solution {
    static class Stack {
        private Queue<Integer> main = new ArrayDeque<>(), buffer = new ArrayDeque<>();
        void push(int value) { main.add(value); }
        int pop() {
            if (main.isEmpty()) throw new IllegalStateException("Stack empty");
            while (main.size() > 1) buffer.add(main.remove());
            int value = main.remove();
            Queue<Integer> temp = main; main = buffer; buffer = temp;
            return value;
        }
        int top() {
            if (main.isEmpty()) throw new IllegalStateException("Stack empty");
            while (main.size() > 1) buffer.add(main.remove());
            int value = main.remove(); buffer.add(value);
            Queue<Integer> temp = main; main = buffer; buffer = temp;
            return value;
        }
        boolean isEmpty() { return main.isEmpty(); }
    }
}
\`\`\`

- **Time:** O(n) pop and top; O(1) push
- **Extra space:** O(n)

## Optimized approach: keep newest item at the queue front

On push, enqueue the new value and rotate the previous values behind it.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Queue;

public class Solution {
    static class Stack {
        private Queue<Integer> queue = new ArrayDeque<>();
        void push(int value) {
            queue.add(value);
            for (int i = 1; i < queue.size(); i++) queue.add(queue.remove());
        }
        int pop() {
            if (queue.isEmpty()) throw new IllegalStateException("Stack empty");
            return queue.remove();
        }
        int top() {
            if (queue.isEmpty()) throw new IllegalStateException("Stack empty");
            return queue.peek();
        }
        boolean isEmpty() { return queue.isEmpty(); }
    }
}
\`\`\`

- **Time:** O(n) push; O(1) pop and top
- **Extra space:** O(n)`,

  "sq-min-stack": `## Problem statement

Design a stack supporting push, pop, top, and minimum lookup, each in O(1).

## Example

Push 3, 5, 2; minimum is 2. Pop; minimum becomes 3.

## Brute-force approach: scan the stack for minimum

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    static class MinStack {
        private final Deque<Integer> values = new ArrayDeque<>();
        void push(int value) { values.push(value); }
        int pop() { if (values.isEmpty()) throw new IllegalStateException(); return values.pop(); }
        int top() { if (values.isEmpty()) throw new IllegalStateException(); return values.peek(); }
        int getMin() {
            if (values.isEmpty()) throw new IllegalStateException();
            int minimum = Integer.MAX_VALUE;
            for (int value : values) minimum = Math.min(minimum, value);
            return minimum;
        }
    }
}
\`\`\`

- **Time:** O(n) getMin; O(1) other operations
- **Extra space:** O(n)

## Optimized approach: store each prefix minimum

Alongside each value, store the minimum through that stack position.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    static class MinStack {
        private final Deque<int[]> values = new ArrayDeque<>();
        void push(int value) {
            int minimum = values.isEmpty() ? value : Math.min(value, values.peek()[1]);
            values.push(new int[] {value, minimum});
        }
        int pop() { if (values.isEmpty()) throw new IllegalStateException(); return values.pop()[0]; }
        int top() { if (values.isEmpty()) throw new IllegalStateException(); return values.peek()[0]; }
        int getMin() { if (values.isEmpty()) throw new IllegalStateException(); return values.peek()[1]; }
    }
}
\`\`\`

- **Time:** O(1) per operation
- **Extra space:** O(n)`,

  "sq-valid-parentheses": `## Problem statement

Given a string containing only bracket characters \`()[]{ }\` (without the space), determine whether brackets are properly nested and matched.

## Example

\`"([]{})"\` returns true; \`"([)]"\` returns false.

## Brute-force approach: repeatedly remove adjacent matching pairs

\`\`\`java
public class Solution {
    public static boolean validBracketsBruteForce(String text) {
        String current = text;
        while (true) {
            String next = current.replace("()", "").replace("[]", "").replace("{}", "");
            if (next.equals(current)) return next.isEmpty();
            current = next;
        }
    }
}
\`\`\`

- **Time:** O(n²) worst case
- **Extra space:** O(n)

## Optimized approach: stack opening brackets

Every closing bracket must match the most recently unmatched opening bracket.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static boolean isValid(String text) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char ch : text.toCharArray()) {
            if (ch == '(' || ch == '[' || ch == '{') stack.push(ch);
            else {
                if (stack.isEmpty()) return false;
                char open = stack.pop();
                if ((ch == ')' && open != '(') || (ch == ']' && open != '[') || (ch == '}' && open != '{')) return false;
                if (ch != ')' && ch != ']' && ch != '}') return false;
            }
        }
        return stack.isEmpty();
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "sq-postfix-evaluation": `## Problem statement

Evaluate a valid whitespace-separated postfix expression of integer operands and operators \`+ - * /\`. Division truncates toward zero.

## Example

\`"2 1 + 3 *"\` returns 9.

## Brute-force approach: repeatedly reduce the leftmost operator

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static long evaluatePostfixBruteForce(String expression) {
        List<String> tokens = new ArrayList<>(List.of(expression.trim().split("\\\\s+")));
        while (tokens.size() > 1) {
            boolean reduced = false;
            for (int i = 0; i < tokens.size(); i++) {
                String op = tokens.get(i);
                if (op.equals("+") || op.equals("-") || op.equals("*") || op.equals("/")) {
                    if (i < 2) throw new IllegalArgumentException("Malformed expression");
                    long a = Long.parseLong(tokens.get(i - 2)), b = Long.parseLong(tokens.get(i - 1));
                    long value = apply(a, b, op);
                    tokens.subList(i - 2, i + 1).clear(); tokens.add(i - 2, Long.toString(value));
                    reduced = true; break;
                }
            }
            if (!reduced) throw new IllegalArgumentException("Malformed expression");
        }
        return Long.parseLong(tokens.get(0));
    }

    private static long apply(long a, long b, String op) {
        return switch (op) { case "+" -> a + b; case "-" -> a - b; case "*" -> a * b; case "/" -> a / b; default -> throw new IllegalArgumentException(); };
    }
}
\`\`\`

- **Time:** O(n²) due to repeated scans and list shifts
- **Extra space:** O(n)

## Optimized approach: operand stack

Push operands; when an operator appears, pop the right and left operands and push the result.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static long evaluatePostfix(String expression) {
        Deque<Long> stack = new ArrayDeque<>();
        for (String token : expression.trim().split("\\\\s+")) {
            if (token.matches("-?\\\\d+")) stack.push(Long.parseLong(token));
            else {
                if (stack.size() < 2) throw new IllegalArgumentException("Malformed expression");
                long b = stack.pop(), a = stack.pop();
                stack.push(switch (token) { case "+" -> a + b; case "-" -> a - b; case "*" -> a * b; case "/" -> a / b; default -> throw new IllegalArgumentException("Unknown operator"); });
            }
        }
        if (stack.size() != 1) throw new IllegalArgumentException("Malformed expression");
        return stack.pop();
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "sq-infix-to-postfix": `## Problem statement

Convert an infix expression of single-character operands, parentheses, and binary \`+ - * /\` operators to postfix. Multiplication and division precede addition and subtraction; operators are left-associative.

## Example

\`a+b*c\` becomes \`a b c * +\`.

## Brute-force approach: fully parenthesize then emit postfix

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static String toPostfixBruteForce(String infix) {
        StringBuilder out = new StringBuilder();
        Deque<Character> operators = new ArrayDeque<>();
        for (char ch : infix.toCharArray()) {
            if (Character.isWhitespace(ch)) continue;
            if (Character.isLetterOrDigit(ch)) out.append(ch).append(' ');
            else if (ch == '(') operators.push(ch);
            else if (ch == ')') {
                while (!operators.isEmpty() && operators.peek() != '(') out.append(operators.pop()).append(' ');
                if (operators.isEmpty()) throw new IllegalArgumentException("Mismatched parentheses");
                operators.pop();
            } else if (precedence(ch) > 0) {
                while (!operators.isEmpty() && precedence(operators.peek()) >= precedence(ch)) out.append(operators.pop()).append(' ');
                operators.push(ch);
            } else throw new IllegalArgumentException("Unsupported token");
        }
        while (!operators.isEmpty()) {
            char op = operators.pop();
            if (op == '(') throw new IllegalArgumentException("Mismatched parentheses");
            out.append(op).append(' ');
        }
        return out.toString().trim();
    }
    private static int precedence(char op) { return op == '+' || op == '-' ? 1 : op == '*' || op == '/' ? 2 : 0; }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: shunting-yard operator stack

Emit operands immediately and pop operators with higher or equal precedence before pushing the current operator.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static String toPostfix(String infix) {
        StringBuilder out = new StringBuilder();
        Deque<Character> operators = new ArrayDeque<>();
        for (char ch : infix.toCharArray()) {
            if (Character.isWhitespace(ch)) continue;
            if (Character.isLetterOrDigit(ch)) out.append(ch).append(' ');
            else if (ch == '(') operators.push(ch);
            else if (ch == ')') {
                while (!operators.isEmpty() && operators.peek() != '(') out.append(operators.pop()).append(' ');
                if (operators.isEmpty()) throw new IllegalArgumentException("Mismatched parentheses");
                operators.pop();
            } else if (precedence(ch) > 0) {
                while (!operators.isEmpty() && precedence(operators.peek()) >= precedence(ch)) out.append(operators.pop()).append(' ');
                operators.push(ch);
            } else throw new IllegalArgumentException("Unsupported token");
        }
        while (!operators.isEmpty()) {
            char op = operators.pop();
            if (op == '(') throw new IllegalArgumentException("Mismatched parentheses");
            out.append(op).append(' ');
        }
        return out.toString().trim();
    }
    private static int precedence(char op) { return op == '+' || op == '-' ? 1 : op == '*' || op == '/' ? 2 : 0; }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "sq-infix-to-prefix": `## Problem statement

Convert an infix expression of single-character operands, parentheses, and binary \`+ - * /\` operators to prefix notation.

## Example

\`a+b*c\` becomes \`+ a * b c\`.

## Brute-force approach: convert to postfix then build prefix

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static String toPrefixBruteForce(String infix) {
        String postfix = toPostfix(infix);
        Deque<String> stack = new ArrayDeque<>();
        for (String token : postfix.split("\\\\s+")) {
            if (token.length() == 1 && precedence(token.charAt(0)) > 0) {
                String right = stack.pop(), left = stack.pop();
                stack.push(token + " " + left + " " + right);
            } else stack.push(token);
        }
        return stack.pop();
    }
    private static String toPostfix(String expression) {
        StringBuilder out = new StringBuilder(); Deque<Character> ops = new ArrayDeque<>();
        for (char ch : expression.toCharArray()) {
            if (Character.isWhitespace(ch)) continue;
            if (Character.isLetterOrDigit(ch)) out.append(ch).append(' ');
            else if (ch == '(') ops.push(ch);
            else if (ch == ')') { while (!ops.isEmpty() && ops.peek() != '(') out.append(ops.pop()).append(' '); if (ops.isEmpty()) throw new IllegalArgumentException(); ops.pop(); }
            else if (precedence(ch) > 0) { while (!ops.isEmpty() && precedence(ops.peek()) >= precedence(ch)) out.append(ops.pop()).append(' '); ops.push(ch); }
            else throw new IllegalArgumentException();
        }
        while (!ops.isEmpty()) { char op = ops.pop(); if (op == '(') throw new IllegalArgumentException(); out.append(op).append(' '); }
        return out.toString().trim();
    }
    private static int precedence(char op) { return op == '+' || op == '-' ? 1 : op == '*' || op == '/' ? 2 : 0; }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)

## Optimized approach: operator and operand stacks

Use the same precedence rules while emitting each reduced operation with its operator before its operands.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static String toPrefix(String infix) {
        Deque<Character> operators = new ArrayDeque<>();
        Deque<String> operands = new ArrayDeque<>();
        for (char ch : infix.toCharArray()) {
            if (Character.isWhitespace(ch)) continue;
            if (Character.isLetterOrDigit(ch)) operands.push(Character.toString(ch));
            else if (ch == '(') operators.push(ch);
            else if (ch == ')') {
                while (!operators.isEmpty() && operators.peek() != '(') reduce(operators, operands);
                if (operators.isEmpty()) throw new IllegalArgumentException("Mismatched parentheses");
                operators.pop();
            } else if (precedence(ch) > 0) {
                while (!operators.isEmpty() && precedence(operators.peek()) >= precedence(ch)) reduce(operators, operands);
                operators.push(ch);
            } else throw new IllegalArgumentException("Unsupported token");
        }
        while (!operators.isEmpty()) { if (operators.peek() == '(') throw new IllegalArgumentException("Mismatched parentheses"); reduce(operators, operands); }
        if (operands.size() != 1) throw new IllegalArgumentException("Malformed expression");
        return operands.pop();
    }
    private static void reduce(Deque<Character> ops, Deque<String> values) {
        if (values.size() < 2) throw new IllegalArgumentException("Malformed expression");
        char op = ops.pop(); String right = values.pop(), left = values.pop();
        values.push(op + " " + left + " " + right);
    }
    private static int precedence(char op) { return op == '+' || op == '-' ? 1 : op == '*' || op == '/' ? 2 : 0; }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "sq-prefix-evaluation": `## Problem statement

Evaluate a valid whitespace-separated prefix expression containing integer operands and \`+ - * /\`. Division truncates toward zero.

## Example

\`"- + 2 3 * 4 5"\` returns -15.

## Brute-force approach: recursively parse tokens

\`\`\`java
public class Solution {
    public static long evaluatePrefixBruteForce(String expression) {
        String[] tokens = expression.trim().split("\\\\s+");
        int[] index = {0};
        long result = parse(tokens, index);
        if (index[0] != tokens.length) throw new IllegalArgumentException("Malformed expression");
        return result;
    }
    private static long parse(String[] t, int[] i) {
        if (i[0] >= t.length) throw new IllegalArgumentException("Malformed expression");
        String token = t[i[0]++];
        if (token.matches("-?\\\\d+")) return Long.parseLong(token);
        long a = parse(t, i), b = parse(t, i);
        return apply(a, b, token);
    }
    private static long apply(long a, long b, String op) {
        return switch (op) { case "+" -> a + b; case "-" -> a - b; case "*" -> a * b; case "/" -> a / b; default -> throw new IllegalArgumentException("Unknown operator"); };
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n) recursion

## Optimized approach: scan tokens right to left

Push operands; for each operator, pop its left operand first and then its right operand.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static long evaluatePrefix(String expression) {
        String[] tokens = expression.trim().split("\\\\s+");
        Deque<Long> stack = new ArrayDeque<>();
        for (int i = tokens.length - 1; i >= 0; i--) {
            String token = tokens[i];
            if (token.matches("-?\\\\d+")) stack.push(Long.parseLong(token));
            else {
                if (stack.size() < 2) throw new IllegalArgumentException("Malformed expression");
                long a = stack.pop(), b = stack.pop();
                stack.push(switch (token) { case "+" -> a + b; case "-" -> a - b; case "*" -> a * b; case "/" -> a / b; default -> throw new IllegalArgumentException("Unknown operator"); });
            }
        }
        if (stack.size() != 1) throw new IllegalArgumentException("Malformed expression");
        return stack.pop();
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "sq-simplify-unix-path": `## Problem statement

Normalize an absolute Unix path by resolving repeated slashes, \`.\`, and \`..\`. Attempts to go above root remain at root.

## Example

\`"/a/./b/../../c/"\` returns \`"/c"\`.

## Brute-force approach: repeatedly resolve path components

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static String simplifyBruteForce(String path) {
        List<String> parts = new ArrayList<>();
        for (String part : path.split("/")) {
            if (part.isEmpty() || part.equals(".")) continue;
            if (part.equals("..")) { if (!parts.isEmpty()) parts.remove(parts.size() - 1); }
            else parts.add(part);
        }
        return "/" + String.join("/", parts);
    }
}
\`\`\`

- **Time:** O(n²) worst case due to removing from the middle of an array list
- **Extra space:** O(n)

## Optimized approach: use a deque as a path stack

Push ordinary names and pop one name for each \`..\`.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static String simplifyPath(String path) {
        Deque<String> parts = new ArrayDeque<>();
        for (String part : path.split("/")) {
            if (part.isEmpty() || part.equals(".")) continue;
            if (part.equals("..")) { if (!parts.isEmpty()) parts.removeLast(); }
            else parts.addLast(part);
        }
        return parts.isEmpty() ? "/" : "/" + String.join("/", parts);
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n)`,

  "sq-decode-string": `## Problem statement

Decode nested encodings where \`k[substring]\` means repeat substring k times. Counts are non-negative integers.

## Example

\`"3[a2[c]]"\` returns \`"accaccacc"\`.

## Brute-force approach: recursively locate matching brackets

\`\`\`java
public class Solution {
    public static String decodeBruteForce(String text) {
        return decode(text, new int[] {0});
    }
    private static String decode(String s, int[] i) {
        StringBuilder out = new StringBuilder();
        while (i[0] < s.length() && s.charAt(i[0]) != ']') {
            char ch = s.charAt(i[0]);
            if (Character.isDigit(ch)) {
                int count = 0;
                while (i[0] < s.length() && Character.isDigit(s.charAt(i[0]))) count = count * 10 + s.charAt(i[0]++) - '0';
                if (i[0] >= s.length() || s.charAt(i[0]++) != '[') throw new IllegalArgumentException("Malformed encoding");
                String nested = decode(s, i);
                if (i[0] >= s.length() || s.charAt(i[0]++) != ']') throw new IllegalArgumentException("Malformed encoding");
                out.append(nested.repeat(count));
            } else out.append(s.charAt(i[0]++));
        }
        return out.toString();
    }
}
\`\`\`

- **Time:** O(n + output length)
- **Extra space:** O(output length + nesting depth)

## Optimized approach: stacks of repeat counts and prefixes

Save the current prefix and repeat count at each opening bracket, then combine when its matching bracket closes.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static String decodeString(String s) {
        Deque<Integer> counts = new ArrayDeque<>();
        Deque<StringBuilder> prefixes = new ArrayDeque<>();
        StringBuilder current = new StringBuilder();
        int count = 0;
        for (char ch : s.toCharArray()) {
            if (Character.isDigit(ch)) count = count * 10 + ch - '0';
            else if (ch == '[') { counts.push(count); prefixes.push(current); count = 0; current = new StringBuilder(); }
            else if (ch == ']') {
                if (counts.isEmpty()) throw new IllegalArgumentException("Malformed encoding");
                StringBuilder expanded = prefixes.pop();
                expanded.append(current.toString().repeat(counts.pop())); current = expanded;
            } else current.append(ch);
        }
        if (!counts.isEmpty()) throw new IllegalArgumentException("Malformed encoding");
        return current.toString();
    }
}
\`\`\`

- **Time:** O(n + output length)
- **Extra space:** O(output length + nesting depth)`,

  "sq-browser-history": `## Problem statement

Design browser history supporting visit, back, and forward. Visiting a URL clears forward history.

## Example

Visit a, then b; back returns a; forward returns b.

## Brute-force approach: keep a list and shift forward entries

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    static class BrowserHistory {
        private final List<String> pages = new ArrayList<>();
        private int current = -1;
        BrowserHistory(String homepage) { visit(homepage); }
        void visit(String url) {
            while (pages.size() > current + 1) pages.remove(pages.size() - 1);
            pages.add(url); current++;
        }
        String back(int steps) { current = Math.max(0, current - steps); return pages.get(current); }
        String forward(int steps) { current = Math.min(pages.size() - 1, current + steps); return pages.get(current); }
    }
}
\`\`\`

- **Time:** O(n) worst case to clear forward entries
- **Extra space:** O(n)

## Optimized approach: doubly linked history nodes

Keep direct previous and next links; visiting discards the forward chain in O(1).

\`\`\`java
public class Solution {
    static class Page { String url; Page previous, next; Page(String url) { this.url = url; } }
    static class BrowserHistory {
        private Page current;
        BrowserHistory(String homepage) { current = new Page(homepage); }
        void visit(String url) {
            Page page = new Page(url); current.next = page; page.previous = current; current = page;
        }
        String back(int steps) {
            while (steps-- > 0 && current.previous != null) current = current.previous;
            return current.url;
        }
        String forward(int steps) {
            while (steps-- > 0 && current.next != null) current = current.next;
            return current.url;
        }
    }
}
\`\`\`

- **Time:** O(steps) back/forward; O(1) visit
- **Extra space:** O(n)`,

  "sq-lru-cache": `## Problem statement

Design an LRU cache with get and put in average O(1). Capacity is non-negative; get of a missing key returns -1.

## Example

Capacity 2: put(1,1), put(2,2), get(1), put(3,3) evicts key 2.

## Brute-force approach: list entries and scan for keys

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    static class LRUCache {
        private final int capacity;
        private final List<int[]> entries = new ArrayList<>();
        LRUCache(int capacity) { this.capacity = capacity; }
        int get(int key) {
            for (int i = 0; i < entries.size(); i++) if (entries.get(i)[0] == key) {
                int[] entry = entries.remove(i); entries.add(entry); return entry[1];
            }
            return -1;
        }
        void put(int key, int value) {
            for (int i = 0; i < entries.size(); i++) if (entries.get(i)[0] == key) { entries.remove(i); break; }
            if (capacity == 0) return;
            if (entries.size() == capacity) entries.remove(0);
            entries.add(new int[] {key, value});
        }
    }
}
\`\`\`

- **Time:** O(capacity) get and put
- **Extra space:** O(capacity)

## Optimized approach: hash map and access-ordered linked map

Java's access-ordered \`LinkedHashMap\` moves an entry to most-recently-used position on access.

\`\`\`java
import java.util.LinkedHashMap;
import java.util.Map;

public class Solution {
    static class LRUCache extends LinkedHashMap<Integer, Integer> {
        private final int capacity;
        LRUCache(int capacity) { super(Math.max(1, capacity), 0.75f, true); this.capacity = capacity; }
        int get(int key) { return super.getOrDefault(key, -1); }
        void putValue(int key, int value) { if (capacity > 0) super.put(key, value); }
        @Override protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
            return size() > capacity;
        }
    }
}
\`\`\`

- **Time:** O(1) average get and put
- **Extra space:** O(capacity)`,

  "sq-lfu-cache": `## Problem statement

Design an LFU cache with average O(1) get and put. Evict the least-frequently-used key; break frequency ties by least-recently-used. Capacity is non-negative.

## Example

When keys 1 and 2 have equal frequency, accessing 1 makes 2 the next eviction candidate.

## Brute-force approach: scan keys to find the eviction candidate

\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    static class Entry { int value, frequency; long time; Entry(int value, long time) { this.value = value; this.time = time; frequency = 1; } }
    static class LFUCache {
        private final int capacity; private long clock;
        private final Map<Integer, Entry> entries = new HashMap<>();
        LFUCache(int capacity) { this.capacity = capacity; }
        int get(int key) {
            Entry e = entries.get(key); if (e == null) return -1;
            e.frequency++; e.time = ++clock; return e.value;
        }
        void put(int key, int value) {
            if (capacity == 0) return;
            if (entries.containsKey(key)) { Entry e = entries.get(key); e.value = value; e.frequency++; e.time = ++clock; return; }
            if (entries.size() == capacity) {
                int victim = -1; Entry least = null;
                for (var pair : entries.entrySet()) {
                    Entry e = pair.getValue();
                    if (least == null || e.frequency < least.frequency || (e.frequency == least.frequency && e.time < least.time)) {
                        victim = pair.getKey(); least = e;
                    }
                }
                entries.remove(victim);
            }
            entries.put(key, new Entry(value, ++clock));
        }
    }
}
\`\`\`

- **Time:** O(n) put when eviction is needed
- **Extra space:** O(capacity)

## Optimized approach: frequency buckets with LRU order

Map each frequency to an insertion-ordered key set. The first key in the minimum-frequency bucket is the eviction candidate.

\`\`\`java
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

public class Solution {
    static class LFUCache {
        private final int capacity;
        private int minimumFrequency;
        private final Map<Integer, Integer> values = new HashMap<>(), frequencies = new HashMap<>();
        private final Map<Integer, LinkedHashSet<Integer>> keysByFrequency = new HashMap<>();
        LFUCache(int capacity) { this.capacity = capacity; }
        int get(int key) {
            if (!values.containsKey(key)) return -1;
            increase(key); return values.get(key);
        }
        void put(int key, int value) {
            if (capacity == 0) return;
            if (values.containsKey(key)) { values.put(key, value); increase(key); return; }
            if (values.size() == capacity) {
                LinkedHashSet<Integer> least = keysByFrequency.get(minimumFrequency);
                int victim = least.iterator().next(); least.remove(victim);
                if (least.isEmpty()) keysByFrequency.remove(minimumFrequency);
                values.remove(victim); frequencies.remove(victim);
            }
            values.put(key, value); frequencies.put(key, 1);
            keysByFrequency.computeIfAbsent(1, ignored -> new LinkedHashSet<>()).add(key);
            minimumFrequency = 1;
        }
        private void increase(int key) {
            int old = frequencies.get(key);
            LinkedHashSet<Integer> bucket = keysByFrequency.get(old);
            bucket.remove(key);
            if (bucket.isEmpty()) {
                keysByFrequency.remove(old);
                if (minimumFrequency == old) minimumFrequency++;
            }
            int next = old + 1; frequencies.put(key, next);
            keysByFrequency.computeIfAbsent(next, ignored -> new LinkedHashSet<>()).add(key);
        }
    }
}
\`\`\`

- **Time:** O(1) average get and put
- **Extra space:** O(capacity)`,

  "sq-circular-queue": `## Problem statement

Implement a fixed-capacity circular integer queue with enqueue, dequeue, front, rear, and empty/full checks.

## Example

Capacity 3: enqueue 1, 2; dequeue; enqueue 3, 4; front is 2 and rear is 4.

## Brute-force approach: shift remaining values after dequeue

\`\`\`java
public class Solution {
    static class CircularQueue {
        private final int[] data; private int size;
        CircularQueue(int capacity) { if (capacity <= 0) throw new IllegalArgumentException(); data = new int[capacity]; }
        boolean enQueue(int value) { if (isFull()) return false; data[size++] = value; return true; }
        boolean deQueue() {
            if (isEmpty()) return false;
            System.arraycopy(data, 1, data, 0, --size); return true;
        }
        int Front() { return isEmpty() ? -1 : data[0]; }
        int Rear() { return isEmpty() ? -1 : data[size - 1]; }
        boolean isEmpty() { return size == 0; }
        boolean isFull() { return size == data.length; }
    }
}
\`\`\`

- **Time:** O(n) dequeue; O(1) other operations
- **Extra space:** O(capacity)

## Optimized approach: use head and size indices

Wrap the insertion index modulo capacity and advance head on dequeue.

\`\`\`java
public class Solution {
    static class CircularQueue {
        private final int[] data; private int head, size;
        CircularQueue(int capacity) { if (capacity <= 0) throw new IllegalArgumentException(); data = new int[capacity]; }
        boolean enQueue(int value) {
            if (isFull()) return false;
            data[(head + size) % data.length] = value; size++; return true;
        }
        boolean deQueue() {
            if (isEmpty()) return false;
            head = (head + 1) % data.length; size--; return true;
        }
        int Front() { return isEmpty() ? -1 : data[head]; }
        int Rear() { return isEmpty() ? -1 : data[(head + size - 1) % data.length]; }
        boolean isEmpty() { return size == 0; }
        boolean isFull() { return size == data.length; }
    }
}
\`\`\`

- **Time:** O(1) per operation
- **Extra space:** O(capacity)`,

  "sq-deque": `## Problem statement

Implement a fixed-capacity integer deque supporting insertion and deletion at both ends.

## Example

Add last 2, add first 1; remove last returns 2, and front is 1.

## Brute-force approach: shift an array for front operations

\`\`\`java
public class Solution {
    static class Deque {
        private final int[] data; private int size;
        Deque(int capacity) { data = new int[capacity]; }
        boolean addFirst(int value) {
            if (size == data.length) return false;
            System.arraycopy(data, 0, data, 1, size); data[0] = value; size++; return true;
        }
        boolean addLast(int value) { if (size == data.length) return false; data[size++] = value; return true; }
        int removeFirst() { if (size == 0) return -1; int value = data[0]; System.arraycopy(data, 1, data, 0, --size); return value; }
        int removeLast() { return size == 0 ? -1 : data[--size]; }
    }
}
\`\`\`

- **Time:** O(n) addFirst and removeFirst; O(1) other operations
- **Extra space:** O(capacity)

## Optimized approach: circular buffer

Track the front index and size; calculate both ends with modular arithmetic.

\`\`\`java
public class Solution {
    static class Deque {
        private final int[] data; private int front, size;
        Deque(int capacity) { if (capacity <= 0) throw new IllegalArgumentException(); data = new int[capacity]; }
        boolean addFirst(int value) {
            if (size == data.length) return false;
            front = (front - 1 + data.length) % data.length; data[front] = value; size++; return true;
        }
        boolean addLast(int value) {
            if (size == data.length) return false;
            data[(front + size) % data.length] = value; size++; return true;
        }
        int removeFirst() { if (size == 0) return -1; int value = data[front]; front = (front + 1) % data.length; size--; return value; }
        int removeLast() { if (size == 0) return -1; int value = data[(front + --size) % data.length]; return value; }
        int getFirst() { return size == 0 ? -1 : data[front]; }
        int getLast() { return size == 0 ? -1 : data[(front + size - 1) % data.length]; }
        boolean isEmpty() { return size == 0; }
        boolean isFull() { return size == data.length; }
    }
}
\`\`\`

- **Time:** O(1) per operation
- **Extra space:** O(capacity)`,

  "sq-celebrity": `## Problem statement

Given a knows(a,b) relation among n people, find a celebrity known by everyone else and who knows nobody else. Return -1 if none exists.

## Example

If everyone knows person 2 and person 2 knows nobody, return 2.

## Brute-force approach: verify every candidate

\`\`\`java
public class Solution {
    public static int celebrityBruteForce(boolean[][] knows) {
        int n = knows.length;
        for (boolean[] row : knows) if (row.length != n) throw new IllegalArgumentException("Matrix must be square");
        for (int candidate = 0; candidate < n; candidate++) {
            boolean valid = true;
            for (int person = 0; person < n; person++) {
                if (person != candidate && (knows[candidate][person] || !knows[person][candidate])) { valid = false; break; }
            }
            if (valid) return candidate;
        }
        return -1;
    }
}
\`\`\`

- **Time:** O(n²)
- **Extra space:** O(1)

## Optimized approach: eliminate candidates with a stack

If a knows b, a cannot be the celebrity; otherwise b cannot be. Verify the remaining candidate.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static int celebrity(boolean[][] knows) {
        int n = knows.length;
        for (boolean[] row : knows) if (row.length != n) throw new IllegalArgumentException("Matrix must be square");
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) stack.push(i);
        while (stack.size() > 1) {
            int a = stack.pop(), b = stack.pop();
            stack.push(knows[a][b] ? b : a);
        }
        if (stack.isEmpty()) return -1;
        int candidate = stack.pop();
        for (int i = 0; i < n; i++) {
            if (i != candidate && (knows[candidate][i] || !knows[i][candidate])) return -1;
        }
        return candidate;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n) for candidate stack`,

  "sq-sliding-window-maximum": `## Problem statement

Return the maximum value in each contiguous window of size k.

## Example

\`[1, 3, -1, -3, 5, 3, 6, 7]\`, k = 3 returns \`[3, 3, 5, 5, 6, 7]\`.

## Brute-force approach: scan every window

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static int[] maxWindowBruteForce(int[] values, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        if (k > values.length) return new int[0];
        int[] result = new int[values.length - k + 1];
        for (int left = 0; left + k <= values.length; left++) {
            int maximum = values[left];
            for (int i = left + 1; i < left + k; i++) maximum = Math.max(maximum, values[i]);
            result[left] = maximum;
        }
        return result;
    }
}
\`\`\`

- **Time:** O(nk)
- **Extra space:** O(n) for the returned array

## Optimized approach: monotonic deque of indices

Keep indices in decreasing value order, expiring old indices and removing smaller trailing values.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static int[] maxSlidingWindow(int[] values, int k) {
        if (k <= 0) throw new IllegalArgumentException("k must be positive");
        if (k > values.length) return new int[0];
        int[] result = new int[values.length - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();
        for (int right = 0; right < values.length; right++) {
            while (!deque.isEmpty() && deque.peekFirst() <= right - k) deque.removeFirst();
            while (!deque.isEmpty() && values[deque.peekLast()] <= values[right]) deque.removeLast();
            deque.addLast(right);
            if (right >= k - 1) result[right - k + 1] = values[deque.peekFirst()];
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n), each index enters and leaves once
- **Extra space:** O(n) including output; O(k) deque`
};
