import { div, button } from '../lib/html';

//<div class="notifications">
//  <div class="notification persistent show" style="top: -141px;">
//    Hey boss. This notification needs your attention before it'll go away.
//    <div class="buttons" data-layout="block">
//      <button class="button white">Got it</button>
//    </div>
//  </div>
//</div>;

const notifications = (...children) =>
  div({ class: 'notifications' }, children);
const notification = (...children) => div({ class: 'notification' }, children);

const updateAvailable = () => {
  return notifications(
    notification(
      'An update is available, would you like to refresh and check it out?',
      div(
        { class: buttons },
        button({ class: 'red' }),
        button({ class: 'white' })
      )
    )
  );
};
