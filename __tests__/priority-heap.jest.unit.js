const _ = require('lodash');
const PriorityHeap = require("../solution/priority-heap");

describe("Priority Heap Behaviors", () => {

    const greater = (l, r) => l - r;
    const less = (l, r) => r - l;

    test("It should support push and peek", () => {
        const heap = new PriorityHeap(greater);
        heap.push(5);
        expect(heap.peek() === 5).toBeTruthy();
    });

    test("It should support push and shift", () => {
        const heap = new PriorityHeap(greater);
        heap.push(5);
        expect(heap.shift() === 5).toBeTruthy();
        expect(heap.count() === 0).toBeTruthy();
    });

    test("It should support other type, like `Date`", () => {
        const heap = new PriorityHeap(greater);
        const now = new Date();
        heap.push(new Date(now.getTime() + 3 * 1000 * 60));
        heap.push(now);
        heap.push(new Date(now.getTime() + 2 * 1000 * 60));
        expect(heap.peek() === now).toBeTruthy();
    });

    test("It should support min-heap", () => {
        const heap = new PriorityHeap(greater);
        heap.push(5);
        heap.push(4);
        heap.push(3);
        expect(heap.peek() === 3).toBeTruthy();
    });


    test("It should support max-heap", () => {
        const heap = new PriorityHeap(less);
        heap.push(5);
        heap.push(4);
        heap.push(3);
        expect(heap.peek() === 5).toBeTruthy();
    });

    test("Its shift should keep the same priority", () => {
        const heap = new PriorityHeap(greater);
        heap.push(5);
        heap.push(3);
        heap.push(4);
        expect(heap.shift() === 3).toBeTruthy();
        expect(heap.shift() === 4).toBeTruthy();
        expect(heap.shift() === 5).toBeTruthy();
    });

    test("It should use push and shift to do the sort", () => {
        const heap = new PriorityHeap(greater);
        const limit = 10000;
        for (let i = 0; i < limit; i++) {
            heap.push(_.random(limit));
        }

        let prev = heap.shift();
        while (heap.count() > 0) {
            let cur = heap.shift();
            if(cur < prev){
                console.log(cur, prev);
            }
            expect(cur >= prev).toBeTruthy();
            prev = cur;
        }
    });
});