import React from 'react';

import Slide from '../../components/Slide/Slide';
import Highlight from '../../components/Highlight/Highlight';

const Selectors = ({ isActive }) => (
  <Slide isActive={isActive}>
    <div>
      <div className="slide-head">Selectors</div>
      <Highlight style={{ fontSize: '0.8em' }} className="js">
{`import { createSelector } from 'reselect';

const getLinkedUsersList = state => state.users.list.data;
const getAccountId = state => state.publishers.item.data.account_id;

const usersOptionsSelector = createSelector(
  [getLinkedUsersList, getAccountId],
  (users, accountId) =>
    users
      // Only account managers and not linked demand users
      .filter(user => (
        user.type === 4 ||
          (user.type === 2 && (!user.is_linked || user.default_account_id === accountId))
      ))
      .sort((a, b) => a.username > b.username)
      .map(user => ({
        label: \`\${user.username}\${user.type === 8 ? ' (AM)' : ''}\`,
        value: user.id
      })),
);

export default usersOptionsSelector;
`}
      </Highlight>
    </div>
  </Slide>
);

export default Selectors;
