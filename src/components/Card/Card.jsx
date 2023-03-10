import React from 'react'
import { useState } from 'react';

const Card = ({name, link,buckets, deleteCard, editCard, moveCard, playCard, index}) => {

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
    {/* <button onClick={() => moveCard(index)}>Move</button> */}
    <select value="" onChange={e => moveCard(index, e.target.value)}>
        <option disabled value="">
          Move to bucket...
        </option>
        {buckets.map(bucket => (
          <option key={bucket} value={bucket}>
            {bucket}
          </option>
        ))}
    </select>
    <button onClick={() => playCard(link)}>Play</button>
  </div>
  )
}

export default Card
