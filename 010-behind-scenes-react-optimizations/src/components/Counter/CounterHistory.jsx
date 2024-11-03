import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  return (
    <ol>
      {history.map((count) => (
        // Since React executes the useState in sequence, the order of element matters. However, in a loop, we can have dynamic elements which are added, removed, re ordered. The addition, removal or re ordering will cause the sequence of components to be changed and incorrect state will be mapped to the components. Using a key will avoid this issue because React will use the key to correctly map the state with component so that addition, removal or re ordering of elements won't cause the incorrect state to be mapped.
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  );
}
