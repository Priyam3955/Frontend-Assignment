import React from 'react'

const Card = ({name , link, deleteCard ,index}) => {
  return (
    <div className="card">
        <div>
        <p>{name}</p>
        <span>{link}</span>
        </div>
        <button onClick={() => deleteCard(index)}>-</button>
    </div>
  )
}

export default Card
