import React from 'react'
import { useState } from 'react';

const Card = ({name, link, deleteCard, editCard, moveCard, playCard, index}) => {

  const [newName, setNewName] = useState(name);
  const [newLink, setNewLink] = useState(link);
  const [isEditing, setIsEditing] = useState(false);
  
    const handleEdit = e => {
      e.preventDefault();
      editCard(index, newName, newLink);
      setIsEditing(false);
    };
  
  return (
    <div className="card">
    <div>
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />
          <input type="text" value={newLink} onChange={e => setNewLink(e.target.value)} />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <p>{newName}</p>
          <span>{newLink}</span>
        </>
      )}
    </div>
    <button onClick={() => deleteCard(index)}>-</button>
    <button onClick={() => setIsEditing(true)}>Edit</button>
    <button onClick={() => moveCard(index)}>Move</button>
    <button onClick={() => playCard(link)}>Play</button>
  </div>
  )
}

export default Card
