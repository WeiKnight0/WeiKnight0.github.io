---
title: Common Data Structures Library
date: 2026-02-19
lang: en
---

This note presents a library of common data structures that are frequently used in programming contests and interviews. The library includes data structures such as Stack, Queue, Array, etc., Each data structure is implemented in a way that allows for easy usage and integration into various algorithms. The library serves as a reference for developers to quickly access and utilize these data structures in their coding challenges and projects.

Conventionally, only Python, C++, and Java implementations are provided, as these are the most commonly used programming languages in competitive programming and technical interviews. However, the concepts and implementations can be easily adapted to other programming languages as needed.

## List of Common Data Structures
- Stack
- Queue
- Deque
- Array / Vector
- Heap / Priority Queue

## Stack

### Python

|Method/Operation|Description|
|---|---|
|`stack = []`|Initialize an empty stack, using a list.|
|`stack.append(x)`|Push element `x` onto the stack.|
|`val = stack.pop()`|Pop and return the top element of the stack.|
|`stack[-1]`|Access the top element of the stack without removing it.|
|`len(stack)`|Return the number of elements in the stack.|


### C++

1. `stack` STL

|Method/Operation|Description|
|---|---|
|`std::stack<int> s;`|Initialize an empty stack of integers.|
|`s.push(x);`|Push element `x` onto the stack.|
|`s.pop();`|Pop the top element from the stack.|
|`s.top();`|Access the top element of the stack without removing it.|
|`s.empty();`|Check if the stack is empty.|
|`s.size();`|Return the number of elements in the stack.|

`std::stack` **is not iterable**, so you cannot directly iterate through its elements.

2. `vector` STL

|Method/Operation|Description|
|---|---|
|`std::vector<int> stack;`|Initialize an empty vector to be used as a stack.|
|`stack.push_back(x);`|Push element `x` onto the stack.|
|`stack.pop_back();`|Pop the top element from the stack.|
|`stack.back();`|Access the top element of the stack without removing it.|
|`stack.empty();`|Check if the stack is empty.|
|`stack.size();`|Return the number of elements in the stack.|

### Java

|Method/Operation|Description|
|---|---|
|`Deque<Integer> stack = new ArrayDeque<>();`|Initialize an empty stack using `ArrayDeque`.|
|`stack.push(x);`|Push element `x` onto the stack.|
|`stack.pop();`|Pop and return the top element of the stack.|
|`stack.peek();`|Access the top element of the stack without removing it.|
|`stack.isEmpty();`|Check if the stack is empty.|
|`stack.size();`|Return the number of elements in the stack.|

To traverse the `Deque` stack in Java, you can use an iterator:

```java
for (Integer element : stack) {
    System.out.println(element);
}
```

Also, `Deque.descendingIterator()` can be used to traverse the stack in reverse order:

```java
Iterator<Integer> descendingIterator = stack.descendingIterator();
while (descendingIterator.hasNext()) {
    System.out.println(descendingIterator.next());
}
```

## Queue
### Python
|Method/Operation|Description|
|---|---|
|`q = deque()`|Initialize an empty queue using `collections.deque`.|
|`q.append(x)`|Enqueue element `x` to the back of the queue.|
|`val = q.popleft()`|Dequeue and return the front element of the queue.|
|`q[0]`|Access the front element of the queue without removing it.|
|`len(q)`|Return the number of elements in the queue.| 

### C++
|Method/Operation|Description|
|---|---|
|`std::queue<int> q;`|Initialize an empty queue of integers.|
|`q.push(x);`|Enqueue element `x` to the back of the queue.|
|`q.pop();`|Dequeue the front element from the queue.|
|`q.front();`|Access the front element of the queue without removing it.|
|`q.empty();`|Check if the queue is empty.|
|`q.size();`|Return the number of elements in the queue.|

### Java
|Method/Operation|Description|
|---|---|
|`Queue<Integer> q = new LinkedList<>();`|Initialize an empty queue using `LinkedList`.|
|`q.offer(x);`|Enqueue element `x` to the back of the queue.|
|`q.poll();`|Dequeue and return the front element of the queue.|
|`q.peek();`|Access the front element of the queue without removing it.|
|`q.isEmpty();`|Check if the queue is empty.|
|`q.size();`|Return the number of elements in the queue.|

## Deque
### Python
|Method/Operation|Description|
|---|---|
|`d = deque()`|Initialize an empty deque using `collections.deque`.|
|`d.append(x)`|Add element `x` to the back of the deque.|
|`d.appendleft(x)`|Add element `x` to the front of the deque.|
|`val = d.pop()`|Remove and return the back element of the deque.|
|`val = d.popleft()`|Remove and return the front element of the deque.|
|`d[0]`|Access the front element of the deque without removing it.|
|`d[-1]`|Access the back element of the deque without removing it.|
|`len(d)`|Return the number of elements in the deque.|

### C++
|Method/Operation|Description|
|---|---|
|`std::deque<int> d;`|Initialize an empty deque of integers.|
|`std::deque<int> d(vec.begin(), vec.end());`|Initialize a deque with elements from a vector `vec`.|
|`d.push_back(x);`|Add element `x` to the back of the deque.|
|`d.push_front(x);`|Add element `x` to the front of the deque.|
|`d.pop_back();`|Remove the back element of the deque.|
|`d.pop_front();`|Remove the front element of the deque.|
|`d.front();`|Access the front element of the deque without removing it.|
|`d.back();`|Access the back element of the deque without removing it.|
|`d.empty();`|Check if the deque is empty.|
|`d.size();`|Return the number of elements in the deque.|

### Java
|Method/Operation|Description|
|---|---|
|`Deque<Integer> d = new ArrayDeque<>();`|Initialize an empty deque using `ArrayDeque`.|
|`d.addLast(x);`|Add element `x` to the back of the deque.|
|`d.addFirst(x);`|Add element `x` to the front of the deque.|
|`d.removeLast();`|Remove and return the back element of the deque.|
|`d.removeFirst();`|Remove and return the front element of the deque.|
|`d.peekFirst();`|Access the front element of the deque without removing it.|
|`d.peekLast();`|Access the back element of the deque without removing it.|
|`d.isEmpty();`|Check if the deque is empty.|
|`d.size();`|Return the number of elements in the deque.|

## Priority Queue / Heap
### Python In-place Heap
|Method/Operation|Description|
|---|---|
|`heapq.heapify(hq)`|Initialize an priority queue (min-heap) from a list `hq`.|
|`heapq.heapify_max(hq)`|Initialize a max-heap from a list `hq`.|
|`heapq.heappush(hq, x)`|Push element `x` onto the priority queue.|
|`val = heapq.heappop(hq)`|Pop and return the root element from the priority queue.|
|`hq[0]`|Access the root element of the priority queue without removing it.|
|`len(hq)`|Return the number of elements in the priority queue.|

Before Python 3.14, there is no built-in max-heap implementation. You can simulate a max-heap by negating the values when pushing and popping:

```python
import heapq
lst = [1, 3, 5, 7]
hq = [-x for x in lst]
heapq.heapify(hq)
```


### C++ Priority Queue
|Method/Operation|Description|
|---|---|
|`std::priority_queue<int> pq;`|Initialize an empty priority queue (**max-heap**) of integers.|
|`std::priority_queue<int, std::vector<int>, std::greater<int>> pq;`|Initialize an empty priority queue (**min-heap**) of integers.|
|`pq.push(x);`|Push element `x` onto the priority queue.|
|`pq.pop();`|Pop the root element from the priority queue.|
|`pq.top();`|Access the root element of the priority queue without removing it.|
|`pq.empty();`|Check if the priority queue is empty.|
|`pq.size();`|Return the number of elements in the priority queue.|

Attention: C++ STL's default `std::priority_queue` is a max-heap. To create a min-heap, you need to specify the comparator as `std::greater<int>`.

To fill a `std::priority_queue` with elements from a vector, you can use the constructor that takes a range of iterators:

```cpp
std::vector<int> vec = {1, 3, 5, 7};
std::make_heap(vec.begin(), vec.end()); // This will create a max-heap in-place
std::priority_queue<int> pq(less<int>(), std::move(vec)); // This will create a max-heap from the vector
```

`std::priority_queue` is not iterable, so you cannot directly iterate through its elements. If you need to access all elements, you can pop them one by one until the queue is empty, but this will destroy the queue in the process.

### C++ In-place Heap
|Method/Operation|Description|
|---|---|
|`std::make_heap(vec.begin(), vec.end());`|Initialize a priority queue (min-heap) from a vector `vec`.|
|`std::make_heap(vec.begin(), vec.end(), std::greater<int>());`|Initialize a max-heap from a vector `vec`.|
|`std::push_heap(vec.begin(), vec.end());`|Push the last element of the vector onto the priority queue.|
|`std::pop_heap(vec.begin(), vec.end());`|Pop the root element from the priority queue and move it to the end of the vector.|

In C++, the last element of the vector is considered the "new" element when pushing, and the root element is moved to the end of the vector when popping. You need to manage the size of the vector accordingly.

### Java
|Method/Operation|Description|
|---|---|
|`PriorityQueue<Integer> pq = new PriorityQueue<>();`|Initialize an empty priority queue (min-heap) of integers.|
|`PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());`|Initialize an empty priority queue (max-heap) of integers.|
|`pq.add(x);`|Push element `x` onto the priority queue.|
|`pq.poll();`|Pop and return the root element from the priority queue.|
|`pq.peek();`|Access the root element of the priority queue without removing it.|
|`pq.isEmpty();`|Check if the priority queue is empty.|
|`pq.size();`|Return the number of elements in the priority queue.|