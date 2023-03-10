import React from 'react'
import Card from '../Card/Card'
import { useState, useEffect } from 'react';

const Home = () => {

    const initialArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [] ;
    // We have done parse to again change from string to array.
    // If any array founds in localStorage then gets printed else not.
  
    const [cards , setCards] = useState(initialArray);
    // this empty array is removed and if tasks are present then a will render else b.
    const [name ,setName] = useState("");
    const [link ,setLink] = useState("");
    // initial value is given empty array in useState function.

    const deleteCard =(index) => {
        const filteredArr = cards.filter((val ,i) => {
          return i !== index;
        })
        setCards(filteredArr);
        console.log(filteredArr);
        // filteredArr gives the tasks that are left in the array after removing the tasks.
    } 

    const submithandler = (e) => {
        e.preventDefault();

        setCards([...cards,{
          name, link
        },])
        setName("")
        setLink("")
    
        // First added the tasks that are present initially & then after tasks are added manually
        console.log(cards)
        // tasks array elements get come after the ADD button.
    }

    useEffect(() => {
        localStorage.setItem("cards" , JSON.stringify(cards))
      },[cards]) 

    return (
        <div className="container">
        <h1 >Cards Section</h1>
        <form onSubmit={submithandler} >
          <input type="text" placeholder='Notes Heading...' value={name} onChange={(e) =>
            setName(e.target.value)} />
          <textarea placeholder='Notes Desc...' value={link} onChange={(e) =>
            setLink(e.target.value)}></textarea>
          <button type="submit" >Click me!!! Notes added..</button>
  
          {cards.map((card,index) => {
            // Here item or the first parameter says the first task in array
            // Every task has two things one is title and other is description.
             return <Card key={index} name={card.name} link={card.link} deleteCard={deleteCard}
             index ={index} />
          })}
          {/* When we use map function we hv to give unique key */}
          {/* Map function in Javascript written in curly brackets any jaascript line should be written in curly brackets*/}
        </form>
      </div>
  )
}

export default Home