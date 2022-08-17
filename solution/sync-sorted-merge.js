"use strict";

const PriorityHeap = require("./priority-heap");

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const heap = new PriorityHeap((l, r) => l.log.date - r.log.date);

  for(let i = 0; i < logSources.length; i++){
    const src = logSources[i];
    const log = src.pop();
    if (log !== false) heap.push({log, src: i });
  }

  do {
    const item = heap.shift();
    printer.print(item.log);

    const l = logSources[item.src].pop();

    if(l !== false){
      heap.push({ log: l, src: item.src });
    }

  } while (heap._array.length > 0);

  printer.done();

  return console.log("Sync sort complete.");
};
-