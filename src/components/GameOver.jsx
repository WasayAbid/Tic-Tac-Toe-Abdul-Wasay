import React from 'react'
import GameState from './GameState'
function GameOver({gameState}) {
  switch(gameState)
  {
    case GameState.inProgress:
        return <></>;
    
    case GameState.playerOwins:
        return <div className='game-over'>O Wins</div>;
        
    case GameState.playerXwins:
            return <div className='game-over'>X Wins</div>;

     case GameState.draw:
                return <div className='game-over'>Draw</div>  ;  
    default:
            return <></>;
  }
}

export default GameOver