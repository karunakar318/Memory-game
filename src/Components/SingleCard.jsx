import React from 'react'
import './SingleCard.css'
export const SingleCard = ({card,handleChoice,flipped,disable}) => {
    const handleclick=()=>{
        if(!disable){
            handleChoice(card)
        }
        
    }
  return (
    <div className="card">
          <div className={flipped?'flipped':''}>
            <img src={card.src} className='front' alt='front-card'/>
            <img src="/img/cover.png" className='back' 
            onClick={handleclick}
            alt="back-card" />
            
          </div>
        </div>
  )
}
