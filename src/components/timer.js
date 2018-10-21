import { div } from "../lib/html";

const format = time => `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' + time % 60 : time % 60 }`;

const timer = (() => {
  let interval;
  const createInterval = updater => {
    interval = setInterval(updater, 1000);
  };
  const destroyInterval = () => {
    if (interval) {
      clearInterval(interval);
    }
  };
  return {
    createInterval,
    destroyInterval
  };
})();

export default (state, actions) => {
  if (!state.playing) return;
  return div(
    {
      oncreate: () => timer.createInterval(actions.tick),
      ondestroy: timer.destroyInterval
    },
    format(state.time)
  );
};
