
  
  
  
  
  const swapValues = () => {
    console.log('swap amounts');
    const temp = tiles.source.square.firstElementChild.dataset.amount
    tiles.source.square.firstElementChild.dataset.amount = tiles.dest.square.firstElementChild.dataset.amount
    tiles.dest.square.firstElementChild.dataset.amount = temp
  }

  


  const validMoves = () =>{
    const destID = tiles.dest.id
    const sourceID = tiles.source.id
    let moves = [sourceID - 1, sourceID + 1, sourceID + 8,sourceID - 8]
    
    let validMove = moves.includes(destID)

    if(validMove){
      tiles.alternate = true
      swapValues()
      checkColStreak()
      checkRowStreak()
      
      if(tiles.source.square !== null)
          swapTiles(tiles)
          
    
    }
    else{
      tiles.source.square.firstElementChild.firstElementChild.classList.remove('selected')
      tiles.source.id = tiles.dest.id
      tiles.source.square = tiles.dest.square
      tiles.dest.id = null
      tiles.dest.square = null
      tiles.source.square.firstElementChild.firstElementChild.classList.add('selected')
    }
  }


  const checkRowStreak = () =>{
    console.log('check row');
    for(let i=0; i<62; i++){
      let total = 0
      let row = [i, i+1, i+2]
      
      const inValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
      if (inValid.includes(i)) continue
      row.forEach(index => total+= parseInt(game.grid[index].firstElementChild.dataset.amount))

      if(total === game.target){
        tiles.alternate = false
        if(tiles.source.square !== null)score.value += points.value
        row.forEach(square => replaceTiles(square))
      }
    }
  }



  const checkColStreak = () => {  
    console.log('check col');
    for(let i = 0; i<48; i++){
      let total = 0
      let col = [i, i+8, i+8*2]
      col.forEach(index => total+= parseInt(game.grid[index].firstElementChild.dataset.amount))

      if(total === game.target){
        tiles.alternate = false
        if(tiles.source.square !== null)score.value += points.value
        col.forEach(square => replaceTiles(square))
      }
    }
  }



  const replaceTiles = square => {
    console.log(game.grid[square].firstElementChild);
    const rand = Math.floor(Math.random() * game.amount.length)
    const value = game.amount[rand]
    const bg = game.images[rand]

    // game.grid[square].firstElementChild.classList.replace(game.grid[square].firstElementChild.dataset.img, 'bomb')
    setTimeout(_ =>{
      game.grid[square].firstElementChild.classList.replace(game.grid[square].firstElementChild.dataset.img, 'bg-white')
      game.grid[square].firstElementChild.dataset.amount = 0
      game.grid[square].firstElementChild.dataset.img = 'bg-white'
    }, 1000)

  }
