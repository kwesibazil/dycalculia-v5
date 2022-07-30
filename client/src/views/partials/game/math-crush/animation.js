import crush from './crush'
import anime from 'animejs/lib/anime.es.js';


const growAndExplode = tiles => {
    const transition = anime.timeline({
      targets: [...tiles],
      easing: 'easeInSine',
    })

    transition.add({
      scale: 1.3,
      duration: 700,
      complete: () => {
        tiles.forEach(tile => {
          tile.removeAttribute('class')
          tile.classList.add('coin', 'bomb') 
        })
      }
    })

    transition.add({
      duration: 700,
      complete: () => {
        tiles.forEach(tile => {
          tile.classList.add('invisible')
          tile.removeAttribute('style')
        })
      }
    })
}


const drop = tiles => {
  //console.log('step 5 -> drop tiles')
  
  const height = document.querySelector('.tile-container').getBoundingClientRect().height;
  tiles.forEach(tile => {
    const down = tile.dataset.down

    anime({
      delay: 900,
      duration: 700,
      targets: tile,
      direction: 'normal',
      easing: 'easeInSine',
      translateY: height*down,
    })

  })//forEach ends here
}//drop ends here


const removeTranslate = tiles => {
  anime({
    targets: [...tiles],
    direction: 'normal',
    translateY: 0,
    duration: 0,
    easing: 'easeInSine'
  })
}

const rotateAndAppear = tiles => {
  const transition = anime.timeline({
    targets: [...tiles],
    direction: 'normal',
    easing: 'easeInSine',
  })

  transition.add({ 
    scale: 0,
    delay: 180,
    duration: 0,
  })

  transition.add({
    rotate: '1turn',
    delay: 0,
    scale: 1,
    duration: 100,
    begin: () => tiles.forEach(tile => tile.classList.remove('invisible')),
    complete: () => {console.log('rotate complete');}
  })
}




const swap = tiles =>{
  const width = document.querySelector('.tile-container').getBoundingClientRect().width;
  const height = document.querySelector('.tile-container').getBoundingClientRect().height;

  if(tiles.dest.id === (tiles.source.id-8)) slideUp(height, tiles)
  else if(tiles.dest.id === (tiles.source.id-1)) slideLeft(width, tiles)
  else if(tiles.dest.id === (tiles.source.id+1)) slideRight(width, tiles)
  else if(tiles.dest.id === (tiles.source.id+8)) slideDown(height, tiles)
}

const slideUp = (distance, tiles) =>{
  anime({
    duration: 500,
    easing: 'easeInSine',
    translateY: -distance,
    targets: tiles.source.square,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
  })

  anime({
    duration: 500,
    easing: 'easeInSine',
    translateY: distance,
    targets: tiles.dest.square,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    complete: () => revert(tiles, true)
  })
}

const slideDown = (distance, tiles) =>{
  anime({
    duration: 500,
    easing: 'easeInSine',
    translateY: distance,
    targets: tiles.source.square,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
  })

  anime({
    duration: 500,
    easing: 'easeInSine',
    translateY: -distance,
    targets: tiles.dest.square,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    complete: () => revert(tiles, true)
  })
}

const slideLeft = (distance, tiles) => {
  anime({
    duration: 500,
    easing: 'easeInSine',
    translateX: -distance,
    targets: tiles.source.square,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
  })

  anime({
    duration: 500,
    easing: 'easeInSine',
    translateX: distance,
    targets: tiles.dest.square,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    complete: () => revert(tiles, false)
  })
}


const slideRight = (distance, tiles) => { 
  anime({
    duration: 500,
    easing: 'easeInSine',
    translateX: distance,
    targets: tiles.source.square,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
  })

  anime({
    duration: 500,
    easing: 'easeInSine',
    translateX: -distance,
    targets: tiles.dest.square,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    complete: () => revert(tiles, false)
  })
}





const removeAnimation = tiles => {
  setTimeout(()=> {
    tiles.forEach(tile => {
      tile.removeAttribute('style', 'data-down')
      crush.addHoverCss() //for some strange reasoning grid glitches if hover is added before
    })

    console.log('remove animation');

  },500)
}



const revert = (tiles, vertical) => {
  console.log('animation should start after checking');
  if(tiles.alternate !== true){
    if(vertical)revertY(tiles)
    else revertX(tiles)
  }
  else crush.swapAmount(tiles)
}


const revertY = tiles =>{
  anime({
    duration: 20,
    translateY: 0,
    direction: 'normal',
    easing: 'easeInSine',
    targets: [tiles.source.square, tiles.dest.square],
    begin: () => revertImg(tiles)
  });
}

const revertX = tiles =>{
  anime({
    duration: 20,
    translateX: 0,
    direction: 'normal',
    easing: 'easeInSine',
    targets: [tiles.source.square,tiles.dest.square],
    begin: () => revertImg(tiles)
  });
}

const revertImg = tiles => {
  tiles.source.square.classList.remove('selected')
  crush.swapImg(tiles)
}


const animation = {
  swap, drop, growAndExplode, 
  removeTranslate, rotateAndAppear,removeAnimation
}
export default animation

