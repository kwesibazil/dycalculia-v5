import anime from 'animejs/lib/anime.es.js';


const swapTiles = tiles =>{
  const width = tiles.source.square.getBoundingClientRect().width;
  const height = tiles.source.square.getBoundingClientRect().height;


  if(tiles.dest.id === (tiles.source.id-8)) slideUp(height, tiles)
  else if(tiles.dest.id === (tiles.source.id-1)) slideLeft(width, tiles)
  else if(tiles.dest.id === (tiles.source.id+1)) slideRight(width, tiles)
  else if(tiles.dest.id === (tiles.source.id+8)) slideDown(height, tiles)
}

//easeInQuad
//easeInQuart

const revertY = (tiles) =>{
  console.log('revert y');
  console.log(tiles.source.square.style.cssText);
  console.log(tiles.dest.square.style.cssText);
  console.log(tiles.dest.square.style.transform);
  console.log(tiles.dest.square.style);
  console.log(tiles.dest.square);
  tiles.dest.square.style=""
  anime.remove(tiles.source.square);
  anime.remove(tiles.dest.square);
  
  anime({
    targets: tiles.source.square,
    translateY: 0,
    direction: 'normal',
    duration: 170,
    easing: 'easeOutQuart'
  });

  anime({
    targets: tiles.dest.square,
    translateY: 0,
    direction: 'normal',
    duration: 170,
    easing: 'easeOutQuart'
  });
}


const revertX = (tiles) =>{
  console.log('revert x');
  console.log(tiles.source.square.style.cssText);
  console.log(tiles.dest.square.style.cssText);
  console.log(tiles.dest.square.style.transform);
  console.log(tiles.dest.square.style);
  console.log(tiles.dest.square);
  tiles.dest.square.style=""
  anime.remove(tiles.source.square);
  anime.remove(tiles.dest.square);
  anime({
    targets: tiles.source.square,
    translateX: 0,
    direction: 'normal',
    duration: 170,
    easing: 'easeOutQuart'
  });

  anime({
    targets: tiles.dest.square,
    translateX: 0,
    direction: 'normal',
    duration: 170,
    easing: 'easeOutQuart'
  });
}


const slideUp = (distance, tiles) =>{
  tiles.direction = true
  anime({
    targets: tiles.source.square,
    translateY: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 700,
    easing: 'easeOutQuart'
  });

  anime({
    targets: tiles.dest.square,
    translateY: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 700,
    easing: 'easeOutQuart'
  });
}
const slideDown = (distance, tiles) =>{
  tiles.direction = true
  anime({
    targets: tiles.source.square,
    translateY: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 700,
    easing: 'easeOutQuart'
  });

  anime({
    targets: tiles.dest.square,
    translateY: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 700,
    easing: 'easeOutQuart'
  });

}


const slideLeft = (distance, tiles) =>{
  tiles.direction = false
  anime({
    targets: tiles.source.square,
    translateX: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 700,
    easing: 'easeOutQuart'
  });

  anime({
    targets: tiles.dest.square,
    translateX: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 700,
    easing: 'easeOutQuart'
  });
}

const slideRight = (distance, tiles) => { 
  tiles.direction = false  
  anime({
    targets: tiles.source.square,
    translateX: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
  duration: 700,
    easing: 'easeOutQuart'
  });

  anime({
    targets: tiles.dest.square,
    translateX: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 700,
    easing: 'easeOutQuart'
  });
}










// const alternateTiles = () => {    
//   const distance = tiles.source.square.getBoundingClientRect().width;
//   anime({
//     targets: tiles.source.square,
//     translateX: distance,
//     direction: (tiles.alternate === true) ? 'alternate' : 'normal',
//      duration: 700,
    easing: 'easeOutQuart'
//   });

//   anime({
//     targets: tiles.dest.square,
//     translateX: -distance,
//     direction: (tiles.alternate === true) ? 'alternate' : 'normal',
//      duration: 700,
    easing: 'easeOutQuart'
//   });
//   setTimeout(_ => revertTiles(tiles), 1500)
// }


// const removeAnimation = tiles => {
//   tiles.source.square.firstElementChild.firstElementChild.classList.remove('selected')
//   tiles.source.square = null
//   tiles.dest.square = null
// }






// const validMoves = tiles =>{
//   const sourceID = parseInt(tiles.source.square.getAttribute('id'))
//   const destID = parseInt(tiles.dest.square.getAttribute('id'))
  
//   let moves = [ sourceID - 1, sourceID + 1, sourceID + 8,sourceID - 8]
//   let validMove = moves.includes(destID)
  

//   if(destID && validMove)
//     console.log(destID + ' ' + validMove + ' dest and validMove');
//   else
//     console.log(destID + ' else');
// }



// const swapTiles = tiles =>{
//   validMoves(tiles)
//   const distance = tiles.source.square.getBoundingClientRect().width;

//   anime({
//     targets: tiles.source.square,
//     translateX: distance,
//     direction: (tiles.alternate === true) ? 'alternate' : 'normal',
//      duration: 700,
    easing: 'easeOutQuart'

//   });

//   anime({
//     targets: tiles.dest.square,
//     translateX: -distance,
//     direction: (tiles.alternate === true) ? 'alternate' : 'normal',
//      duration: 700,
    easing: 'easeOutQuart'
//   });

//   setTimeout(_ => revertTiles(tiles), 1500)
// }


// const revertTiles = tiles => {
//   tiles.source.square.firstElementChild.firstElementChild.classList.remove('selected')
//   tiles.source.square = null
//   tiles.dest.square = null
// }


// const checkStreak = tiles => {
//   for(let i = 0; i<48; i++){
//     let total = 0
//     let col = [i, i+8, i+8*2]
//     col.forEach(square => total+= parseInt(grid[index].dataset.amount))

//     if(total === target){
//       score += points
//       col.forEach(square =>{
//         squares[square].style.backgroundImage = ''
//       })
//     }
//   }
// }

// checkColumn(){
//   for(let i = 0; i<=14; i++){
//     let total = 0 
//     let column = [i, i+this.width, i+this.width*2]
//     column.forEach(index => total += parseInt(this.grid[index].dataset.amount))
    
    
//     if(total === this.target){
//       this.score += this.points
//       column.forEach(index =>{
//          let rand =  Math.floor(Math.random() * this.images.length)
//           this.grid[index].classList.replace(this.grid[index].dataset.img, this.images[rand] )
//           this.grid[index].dataset.img = this.images[rand]
//           this.grid[index].dataset.amount = this.amount[rand]
//       })
//     } 
//   }
// },

// const replaceTiles = () => {
//   for (let i = 0; i < 64; i++) {
//       if(game.grid[i + gridSize.value].firstElementChild.dataset.img === 'bg-dark') {
        
//         console.log(game.grid[i + gridSize.value].firstElementChild);

//           game.grid[i + gridSize.value].firstElementChild.dataset.img = game.grid[i].firstElementChild.dataset.img
//           game.grid[i + gridSize.value].firstElementChild.dataset.amount = game.grid[i].firstElementChild.dataset.amount
//           game.grid[i + gridSize.value].firstElementChild.classList.replace(
//             game.grid[i + gridSize.value].firstElementChild.dataset.img,
//             game.grid[i].firstElementChild.dataset.img)

//           game.grid[i].firstElementChild.dataset.img = 'bg-dark'
//           game.grid[i].firstElementChild.dataset.amount = '0'
//           game.grid[i + gridSize.value].firstElementChild.classList.replace(game.grid[i].firstElementChild.dataset.img, 'bg-dark')


  
//           const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
//           const isFirstRow = firstRow.includes(i)
//           if (isFirstRow && (game.grid[i].firstElementChild.dataset.img === 'bg-dark')) {
//             console.log('meet the first row');
//               let rand = Math.floor(Math.random() * game.amount.length)
//               let value = game.amount[rand]
//               let bg = game.images[rand]
//               game.grid[i].firstElementChild.dataset.img = bg
//               game.grid[i].firstElementChild.dataset.amount = value
//               game.grid[i + gridSize.value].firstElementChild.classList.replace('bg-dark', bg)
//           }
//       }
//   }
// }



  // const resetTiles = markTiles => {
  //   score.value += points.value
  //   markTiles.forEach(square =>{
  //     game.grid[square].classList.replace(game.grid[square].dataset.img, 'bg-white')
  //     delete game.grid[square].dataset.amount
  //     delete game.grid[square].dataset.img
  //   })

  //   swapTiles(tiles)
  // }



  










//  if(direction === 'top'){
//       console.log('top');
//       console.log(grid[tiles.source.id-8]);
//       setTiles(grid[tiles.source.id-8])
//     }
//     else if(direction === 'left'){
//       console.log('left');
//       console.log(grid[tiles.source.id-1]);
//       setTiles(grid[tiles.source.id-1])
//     }
//     else if(direction === 'right'){
//       console.log('right');
//       console.log(grid[sourceID+1]);
//       setTiles(grid[sourceID+1])
//     }
//     else if(direction === 'bottom'){
//       console.log('bottom');
//       console.log(grid[tiles.source.id+8]);
//       setTiles(grid[tiles.source.id+8])
//     }








export {swapTiles, revertY, revertX }