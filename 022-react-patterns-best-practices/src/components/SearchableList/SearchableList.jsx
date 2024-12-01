import { useRef, useState } from 'react';

export default function SearchableList({ items, children, itemKeyFn }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      // Setting null to ensure that when the timeout function is eventually executed, we disassociate the value held in memory (our timeout function) with our ref.  This is a declarative approach to ensuring that garbage collection is properly executed in a timely manner in our application.
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 500);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
