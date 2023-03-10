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
    const [buckets, setBuckets] = useState([]);
    const [selectedBucket, setSelectedBucket] = useState('');

    useEffect(() => {
      localStorage.setItem("cards" , JSON.stringify(cards))
    },[cards]) 
  
    useEffect(() => {
      const bucketNames = cards.reduce((acc, curr) => {
        if (!acc.includes(curr.bucket)) {
          acc.push(curr.bucket);
        }
        return acc;
      }, []);
      setBuckets(bucketNames);
    }, [cards]);

    const addCard = (e) => {
      e.preventDefault();
      if (!selectedBucket) {   // If the bucket is not present alert
        alert('Please make a bucket before adding a card');
        setName('');
        setLink('');
        return;
      }
      const newCard = { name, link, bucket: selectedBucket };
      setCards([...cards, newCard]);
      setName('');
      setLink('');
      console.log(cards)
    };

  const deleteCard = index => {
      const filteredArr = cards.filter((_, i) => i !== index);
      setCards(filteredArr);
  };

  const editCard = (index, newName, newLink) => {
    const updatedCards = cards.map((card, i) => {
      if (i === index) {
        return { ...card, name: newName, link: newLink };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const deleteAllCards = () => {
    const filteredArr = cards.filter(card => card.bucket !== selectedBucket);
    setCards(filteredArr);
  };

  const selectBucket = e => {   
    setSelectedBucket(e.target.value);
  };

  const createBucket = e => {     // To add a new bucket in the buckets array
    e.preventDefault();
    if (selectedBucket) {
      setBuckets([...buckets, selectedBucket]);
      setSelectedBucket('');
    }
  };
  const moveCard = (index, newBucket) => {
    const cardToMove = cards[index];
    const updatedCard = { ...cardToMove, bucket: newBucket };
    const remainingCards = cards.filter((_, i) => i !== index);
    setCards([...remainingCards, updatedCard]);
  };

  const playCard = link => {
    const playedCard = { name: name, link: link, time: new Date().toLocaleString() };
    const history = localStorage.getItem('history')
      ? JSON.parse(localStorage.getItem('history'))
      : [];
    localStorage.setItem('history', JSON.stringify([...history, playedCard]));
    window.open(link, '_blank');
  };

  const history = localStorage.getItem('history')
    ? JSON.parse(localStorage.getItem('history'))
    : [];

  return (
    <div className="container">
      <h1>Cards Section</h1>
      <form onSubmit={addCard}>
        <input type="text" placeholder="Card Heading..." value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Video/MP3 Link..." value={link} onChange={e => setLink(e.target.value)} />
        <select value={selectedBucket} onChange={selectBucket}>
          <option disabled value="">
            Select a bucket
          </option>
          {buckets.map(bucket => (
            <option key={bucket} value={bucket}>
              {bucket}
            </option>
          ))}
        </select>
        <button type="submit">Add Card</button>
      </form>
      <form onSubmit={createBucket}>
        <input type="text" placeholder="Bucket Name..." value={selectedBucket} onChange={e => setSelectedBucket(e.target.value)} />
        <button type="submit">Create Bucket</button>
      </form>
      {buckets.length > 0 && (
        <div>
          <h2>Buckets:</h2>
          <ul>
          {buckets.map((buck, index) => (
              <li key={buck}>
                {buck}{' '}
                <button onClick={() => deleteAllCards(index)}>Delete All</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {cards.length > 0 && (
        <div>
          <h2>Cards:</h2>
          {cards.map((card, index) => {
            if (!selectedBucket || card.bucket === selectedBucket) {
              return (
                <Card
                  key={index}
                  name={card.name}
                  link={card.link}
                  deleteCard={() => deleteCard(index)}
                  editCard={(newName, newLink) => editCard(index, newName, newLink)}
                  moveCard={newBucket => moveCard(index, newBucket)}
                  playCard={() => playCard(card.link)}
                  buckets={buckets}
                />
              );
            }
            return null;
          })}
        </div>
      )}
      {history.length > 0 && (
        <div>
          <h2>History:</h2>
          <ul>
            {history.map((playedCard, index) => (
              <li key={index}>
                {playedCard.name} - {playedCard.time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;