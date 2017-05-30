'use strict';

// Simple FIFO queue implementation to avoid having to do shift()
// on an array, which is slow.

function Queue(max_length) {
    this.length = 0;
    this.max_length = max_length || 0;
}

Queue.prototype.push = function (item) {
    var node = {item: item};
    if (this.last) {
        this.last = this.last.next = node;
    } else {
        this.last = this.first = node;
    }
    this.length++;
    if (this.max_length > 0 && this.length > this.max_length) {
        this.shift();
    }
};

Queue.prototype.shift = function () {
    var node = this.first;
    if (node) {
        this.first = node.next;
        if (!(--this.length)) {
            this.last = undefined;
        }
        return node.item;
    }
};

Queue.prototype.slice = function (start, end) {
    start = typeof start === 'undefined' ? 0 : start;
    end = typeof end === 'undefined' ? Infinity : end;

    var output = [];

    var i = 0;
    for (var node = this.first; node; node = node.next) {
        if (--end < 0) {
            break;
        } else if (++i > start) {
            output.push(node.item);
        }
    }
    return output;
};

module.exports = Queue;
