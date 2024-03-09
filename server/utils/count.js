// utils/count.js
let count = { add: 0, update: 0 };

function getCount() {
  return count;
}

function incrementCount(action) {
  count[action]++;
}

module.exports = {
  getCount,
  incrementCount,
};
