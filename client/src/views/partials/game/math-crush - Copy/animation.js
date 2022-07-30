import crush from './crush'
import anime from 'animejs/lib/anime.es.js';





const growAndExplode = tiles => {
  tiles.forEach(tile => {
    const target = tile.firstElementChild
    const transition = anime.timeline({
      targets: target,
      easing: 'easeInSine',
    })

    transition.add({
      scale: 1.3,
      duration: 700,
      complete: () => {
        target.removeAttribute('class')
        target.classList.add('coin', 'bomb') 
      }
    })
    transition.add({
      duration: 700,
      complete: (anim) => {
        target.classList.add('invisible') 
        anim.animatables[0].target.removeAttribute('style')
        console.log('explode complete');
      }
    })
  })
}

const drop = tiles => {
  const height = document.querySelector('.tile-container').getBoundingClientRect().height;
  tiles.forEach(tile => {
    const target =  tile.firstElementChild
    const down = target.dataset.down

    const transition = anime.timeline({
      targets: target,
      direction: 'normal',
      easing: 'easeInSine',
    })
    transition.add({
      translateY: height*down,
      delay: 700,
      duration: 700
    })

    //transition.finished.then(logFinished);


  })//forEach ends here
}//drop ends here



const rotateAndAppear = tiles => {
  tiles.forEach(tile => {
    const target = tile.firstElementChild
      const transition = anime.timeline({
        targets: target,
        direction: 'normal',
        easing: 'easeInSine',
      })

      transition.add({ 
        duration: 100,
        scale: .2,
        complete: () => target.classList.remove('invisible')
      })

      transition.add({
        rotate: '1turn',
        scale: 1.3,
        duration: 500,
      })
      transition.add({
        scale: 1,
        duration: 250,
        complete: () => {
          console.log('rotate and appear finishes');
        }
      })
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



const removeTranslate = tiles => {
  tiles.forEach(tile => {
    anime({
      targets: tile.firstElementChild,
      direction: 'normal',
      translateY: 0,
      duration: 0,
      easing: 'easeInSine'
    })
  })
}

const removeAnimation   = tiles => {
  setTimeout(()=> {
    tiles.forEach(tile => {
      const parent = tile
      const child = tile.firstElementChild
      parent.removeAttribute('style')
      child.removeAttribute('style')
      child.removeAttribute('data-down')
      crush.addHoverCss() //for some strange reasoning grid glitches if hover is added before
    })
  },900)
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

