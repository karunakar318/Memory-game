import { useEffect, useState } from 'react'

import './App.css'
import { SingleCard } from './Components/SingleCard';
const cardImage=[
  {"src":"/img/helmet-1.png","matched":false},
  {"src":"/img/potion-1.png","matched":false},
  {"src":"/img/ring-1.png","matched":false},
  {"src":"/img/scroll-1.png","matched":false},
  {"src":"/img/shield-1.png","matched":false},
  {"src":"/img/sword-1.png","matched":false},
]
function App() {
  const [cards,setCards]=useState([]);
  const [turns,setTurns]=useState(0);
  const [choiceOne,setChoiceOne]=useState(null);
  const [choiceTwo,setChoiceTwo]=useState(null);
  const [disable,setdisbale]=useState(false);
  const shuffleCards=()=>{
    const shuffleCards=[...cardImage,...cardImage].sort(()=>Math.random()-0.5).
    map((card)=>{
      return {...card,id:Math.random()}
    })
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  }
  const handleChoice=(card)=>{
    choiceOne?setChoiceTwo(card):setChoiceOne(card);
  }
  const resetTurn=()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns=>prevTurns+1);
    setdisbale(false)
  }
  useEffect(()=>{
    
    if(choiceOne && choiceTwo){
      setdisbale(true)
      if(choiceOne.src===choiceTwo.src){
        
        setCards(prevcards=>{
          return prevcards.map((card)=>{
            if(card.src===choiceOne.src){
              return {...card,matched:true}
            }
            else{
              return card
            }
          })
        })
        resetTurn();
      }
      else{
        console.log("those cards do not matchs");
        setTimeout(()=>resetTurn(),1000);

      }
    }
  },[choiceOne,choiceTwo]);
  useEffect(()=>{
    shuffleCards()
  },[])
  console.log(cards);
  return <div className="App">
    <h1>Magic Memory</h1>
    <button onClick={shuffleCards}> New Game</button>
    
    <div className="card-grid">
      {cards.map((card)=>{
        return <SingleCard card={card} handleChoice={handleChoice} flipped={card===choiceOne || card===choiceTwo || card.matched} disbale={disable} key={card.id}/>
      })}
    </div>
    <p>turns:{turns}</p>
  </div>
}

export default App
