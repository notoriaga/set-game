import { div, button, span } from '../lib/html';

export default (state, actions) => {
  return div({ class: 'controls' }, [
    span(`${state.deck.length} cards left`),
    button({ class: 'button', onclick: actions.startGame }, 'start'),
    button(
      {
        class: 'button grey',
        onclick: actions.shuffle,
        disabled: !state.board.length
      },
      'shuffle'
    ),
    button(
      {
        class: 'button grey',
        onclick: actions.addCards.bind(this, 3),
        disabled: !state.deck.length
      },
      'add three'
    )
  ]);
};
