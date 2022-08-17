"use strict";

function PriorityHeap(compareFn) {
    this._array = [];
    this._compareFn = compareFn;
}

const index = (i) => Math.max(i - 1, 0);

const half = (v) => Math.floor(v / 2);

const less = (l, r, fn) => fn(l, r) < 0;

const greater = (l, r, fn) => fn(l, r) > 0;

function swap(arr, l, r) {
    const temp = arr[l];
    arr[l] = arr[r];
    arr[r] = temp;
}

PriorityHeap.prototype.push = function(item) {
    this._array.push(item);

    if(this._array.length > 1) {
        let [c, p] = [this._array.length, half(this._array.length)];

        while(less(this._array[index(c)], this._array[index(p)], this._compareFn) && c > 1){
            swap(this._array, index(c), index(p));
            [c, p] = [p, half(p)];
        }
    }
}

PriorityHeap.prototype.shift = function () {
    let p = 1;
    const ret = this._array[index(p)];

    this._array[index(p)] = this._array[this._array.length - 1];
    this._array.pop();

    while(p <= half(this._array.length)) {
        let [l, r] = [p * 2, p * 2 + 1];
        let [pi, li, ri] = [p, l, r].map(index);
        let [parent, leftChild, rightChild] = [pi, li, ri].filter(i => i < this._array.length).map(i => this._array[i]);

        if(greater(parent, leftChild, this._compareFn) || (rightChild !== undefined && greater(parent, rightChild, this._compareFn))){
            if(rightChild === undefined || less(leftChild, rightChild, this._compareFn)){
                swap(this._array, pi, li);
                p = l;
            }else {
                swap(this._array, pi, ri);
                p = r;
            }
        }else{
            break;
        }
    }

    return ret;
}

PriorityHeap.prototype.peek = function() {
    return this._array[0];
}

PriorityHeap.prototype.count = function() {
    return this._array.length;
}

PriorityHeap.prototype.dump = function() {
    return JSON.parse(JSON.stringify(this._array));
}

module.exports = PriorityHeap;