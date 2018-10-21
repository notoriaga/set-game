import { app } from 'hyperapp';
import { Card, Controls, Timer } from './components';
import { generateAllCards, isSet, isSetPresent, shuffle } from './lib/helpers';
import { div } from './lib/html';
import registerServiceWorker from './lib/registerServiceWorker';

const state = {
  deck: [],
  board: [],
  selectedCards: [],
  score: 0,
  time: 0,
  playing: false
};

const actions = {
  startGame: () => {
    const initalDeck = shuffle(generateAllCards());
    const initalBoard = initalDeck.splice(0, 12);
    return {
      deck: initalDeck,
      board: initalBoard,
      selectedCards: [],
      score: 0,
      time: 0,
      playing: true
    };
  },

  selectCard: card => ({ selectedCards, board, deck, score }) => {
    // Unselect a card on second click
    const cardIndex = selectedCards.findIndex(c => c.id === card.id);
    if (cardIndex !== -1) {
      selectedCards.splice(cardIndex, cardIndex + 1);
      return { selectedCards: [...selectedCards] };
    }

    // Less than three cards, add to the selection
    const newSelection = selectedCards.concat(card);
    if (newSelection.length < 3) {
      return { selectedCards: newSelection };
    }

    // Three cards that aren't a set - clear hand and sub 1 point
    if (!isSet(...newSelection)) {
      return { selectedCards: [], score: score - 1 };
    }

    // Generate new board, adding cards in place where the set was found
    // but don't replace cards after the first 12
    const setIds = newSelection.map(c => c.id);
    const newBoard = board
      .slice(0, 12)
      .reduce((newBoard, oldCard) => {
        if (setIds.includes(oldCard.id)) {
          deck.length && newBoard.push(deck.pop());
          return newBoard;
        }
        return newBoard.concat(oldCard);
      }, [])
      .concat(board.slice(12).filter(c => !setIds.includes(c.id)));

    return {
      selectedCards: [],
      board: newBoard,
      deck: [...deck],
      score: score + 1
    };
  },

  addCards: number => ({ board, deck }) => ({
    board: board.concat(deck.slice(0, number)),
    deck: deck.slice(number)
  }),

  shuffle: () => ({ board }) => ({ board: shuffle(board) }),

  tick: () => ({ time }) =>  ({ time: ++time })
};

const view = (state, actions) =>
  div({ class: 'container' }, [
    div(
      { class: 'board' },
      state.board.map(card => {
        return Card({
          ...card,
          selected: !!state.selectedCards.find(c => c.id === card.id),
          onclick: actions.selectCard
        });
      })
    ),
    Controls(state, actions),
    div(`${state.score} sets found`),
    Timer(state, actions),
    !!state.board.length && !isSetPresent(state.board) && div('no sets found'),
  ]);

app(state, actions, view, document.body);

if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
  registerServiceWorker();
}
