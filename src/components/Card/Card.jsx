import React from 'react'

const Card = ({name, link, deleteCard, editCard, moveCard, playCard, index}) => {
  return (
    <div className="card">
        <div>
        <p>{name}</p>
        <span>{link}</span>
        </div>
        <button onClick={() => deleteCard(index)}>-</button>
      <button onClick={() => editCard(index)}>Edit</button>
      <button onClick={() => moveCard(index)}>Move</button>
      <button onClick={() => playCard(link)}>Play</button>
    </div>
  )
}

export default Card
