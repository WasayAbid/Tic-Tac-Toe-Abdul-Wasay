import React from 'react'
import Board from './Board'
import {useState,useEffect} from "react";
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';


import gameover from '../sounds/gameover.wav';
import clicksound from '../sounds/clicksound.wav';

const gameoversound= new Audio(gameover)
gameoversound.volume=0.2;

const clicksounds=new Audio(clicksound)
clicksounds.volume=0.5;

const Playerx="X";
const Playero="O";

const winningCombinations = [
    //Rows
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  
    //Columns
    { combo: [0, 3, 6], strikeClass: "strike-column-1" },
    { combo: [1, 4, 7], strikeClass: "strike-column-2" },
    { combo: [2, 5, 8], strikeClass: "strike-column-3" },
  
    //Diagonals
    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
  ];

function checkWinner(tiles,setStrikeClass,setGameState)
{
    for(const {combo,strikeClass} of winningCombinations)
    {
      const tileValue1= tiles[combo[0]];
      const tileValue2= tiles[combo[1]];
      const tileValue3= tiles[combo[2]];
        if(tileValue1 !== null && tileValue1===tileValue2 && tileValue1 === tileValue3)
        {
            setStrikeClass(strikeClass);
            if(tileValue1===Playerx)
            {
                setGameState  (GameState.playerXwins);
            }
            else
            {
                setGameState(GameState.playerOwins);
            }
            return;
        }
    }

    const areAllTilesFilledin=tiles.every((tile)=>tile!==null);
    if(areAllTilesFilledin)
    {
        setGameState(GameState.draw);
    }
}
function Tictac() {
    const[tiles,setTiles]=useState(Array(9).fill(null));
    const[playerTurn,setPlayerTurn]=useState(Playerx);
    const[strikeClass, setStrikeClass]=useState();
    const[gameState,setGameState]=useState(GameState.inProgress);
    
    const handleTileClick=(index)=>
    {
        if(gameState!==GameState.inProgress)
        {
            return;
        }
       if(tiles[index]!==null)
       {
        return ;
       }
        const newTiles=[...tiles];
        newTiles[index]=playerTurn;
        setTiles(newTiles);
        if(playerTurn===Playerx)
        {
            setPlayerTurn(Playero);

        }else
        {
            setPlayerTurn(Playerx);
        }
    };

    const handleReset =()=>{
      setGameState(GameState.inProgress);
      setTiles(Array(9).fill(null));
      setPlayerTurn(Playerx);
      setStrikeClass(null);
        }

 useEffect(()=>{
    checkWinner(tiles,setStrikeClass,setGameState)
    },[tiles]);

    useEffect(()=>{

        if(tiles.some((tile)=>tile !==null))
        {
            clicksounds.play();
        } 
     },[tiles]);
    
     useEffect(()=>{
        if(gameState!==GameState.inProgress)
        {
            gameoversound.play();
        }
     },[gameState]);
  return (
    <div>
    <h1 className='font-bold'>Tic Tac Toe</h1>
        <Board playerTurn={playerTurn}
         tiles={tiles} 
         onTileClick={handleTileClick}
         strikeClass={strikeClass}
         />
         <GameOver gameState={gameState}/>
         <Reset gameState={gameState} onReset={handleReset} />
         <h1>Made By Abdul Wasay</h1>
    </div>
  )
}

export default Tictac