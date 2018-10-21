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

const shuffle = a => a.sort(() => 0.5 - Math.random());

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
