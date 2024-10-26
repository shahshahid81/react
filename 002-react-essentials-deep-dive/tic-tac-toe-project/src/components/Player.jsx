import { useState } from 'react';

export default function Player({
  name: initialName,
  symbol,
  isActive,
  handlePlayerNameChange,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // setIsEditing(!isEditing);

    /*
    Since we are updating state based on the existing value, we have to use method instead of directly updating the value since react will schedule the update instead of directly updating it and we will have stale data.

    For Example, if isEditing is false, then the below two statements will keep it as true since the second statement won't reflect the updated value. 

    setIsEditing(!isEditing); => true
    setIsEditing(!isEditing); => true

    Here, it will work as expected since we are referring to existing values
    setIsEditing((editing) => !editing); => true
    setIsEditing((editing) => !editing); => false
    */

    let editing = isEditing;
    setIsEditing((editing) => !editing);
    if (editing) {
      handlePlayerNameChange(symbol, playerName);
    }
  }

  function handleInputChange(event) {
    setPlayerName(event.target.value);
  }

  const playerNameContent = isEditing ? (
    <input
      type="text"
      required
      value={playerName}
      onChange={handleInputChange}
    />
  ) : (
    <span className="player-name">{playerName}</span>
  );

  return (
    <li className={isActive ? 'active' : null}>
      <span className="player">
        {playerNameContent}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
