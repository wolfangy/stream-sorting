"use strict";

const PriorityHeap = require("./priority-heap");

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  const heap = new PriorityHeap((l, r) => l.log.date - r.log.date);

  let logs = await Promise
    .all(logSources.map((src, indx) => src.popAsync().then(l => ({ log: l, src: indx }))));

  for (const l of logs) {
    if (l.log !== false) heap.push(l);
  }

  do {
    const item = heap.shift();
    printer.print(item.log);

    const l = await logSources[item.src].popAsync();

    if (l !== false) {
      heap.push({ log: l, src: item.src });
    }
  } while (heap._array.length > 0)

  printer.done();

  console.log("Aysnc sort complete.");

};
