// generate all the cards
const cardAttrs = [
  [1, 2, 3],
  ['solid', 'open', 'striped'],
  ['red', 'green', 'purple'],
  ['diamond', 'squiggle', 'oval']
];
const cartesianHelper = (a, b) =>
  [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) =>
  b ? cartesian(cartesianHelper(a, b), ...c) : a;
const generateAllCards = () => {
  return cartesian(...cardAttrs).map(card => {
    return {
      number: card[0],
      fill: card[1],
      color: card[2],
      shape: card[3],
      id: card.join('')
    };
  });
};

// knuth-shuffle
const shuffle = array => {
  let currentIndex = array.length;
  let temporaryValue ;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// determine if three cards make a set
const allSame = (attr, a, b, c) => a[attr] === b[attr] && b[attr] === c[attr];
const allDiff = (attr, a, b, c) =>
  a[attr] !== b[attr] && b[attr] !== c[attr] && a[attr] !== c[attr];
const isValidAttr = (attr, a, b, c) =>
  allSame(attr, a, b, c) || allDiff(attr, a, b, c);
const isSet = (a, b, c) =>
  isValidAttr('number', a, b, c) &&
  isValidAttr('fill', a, b, c) &&
  isValidAttr('shape', a, b, c) &&
  isValidAttr('color', a, b, c);

// check if any sets are present
function* combinations(board) {
  for (let i = 0; i < board.length - 2; i++) {
    for (let j = i + 1; j < board.length - 1; j++) {
      for (let k = j + 1; k < board.length; k++) {
        yield [board[i], board[j], board[k]];
      }
    }
  }
}
const isSetPresent = board => {
  for (const cards of combinations(board)) {
    if (isSet(...cards)) {
      return true;
    }
  }
  return false;
};

export { generateAllCards, shuffle, isSet, isSetPresent };
