import anime from 'animejs/lib/anime.es.js';

const growAndExplode = tiles =>{
  tiles.forEach(tile => {
    const transition = anime.timeline({
      targets: tile,
      easing: 'easeInSine',
    })

    transition.add({
      scale: 1.3,
      duration: 700,
      complete: () => {
        tile.removeAttribute('class')
        tile.classList.add('coin', 'bomb') 
      }
    })
    transition.add({
      delay: 1000,
      duration: 500,
      complete: () => tile.classList.add('invisible') 
    })

    transition.add({
      scale: 1,
      delay: 0,
    })
    
  })
}

const drop = (tiles) => {
  const height = document.querySelector('.tile-container').getBoundingClientRect().height;
  
  tiles.forEach(tile => {
    const target =  tile
    const down = tile.firstElementChild.dataset.down

    const transition = anime.timeline({
      targets: target,
      direction: 'normal',
      easing: 'easeInSine',
    })

    transition.add({
      translateY: height*down,
      delay: 1000,
      duration: 900,
    })

  })//forEach ends here
}//drop ends here

const removeTranslate = tiles => {
  tiles.forEach(tile => {
    anime({
      targets: tile,
      direction: 'normal',
      translateY: 0,
      duration: 0,
      easing: 'easeInSine'
    })
  })

}

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
        duration: 250
      })
  })
}


const reset = tiles => {
  setTimeout(()=> {
    tiles.forEach(tile => {
      const parent = tile
      const child = tile.firstElementChild
      parent.removeAttribute('style')
      child.removeAttribute('style')
      child.removeAttribute('data-down')

      addHoverCss() //for some strange reasoning grid glitches if hover is added before

    })
  },900)
}


const addHoverCss = () => {
  const tiles = document.getElementsByClassName('tile-container')
  Array.from(tiles).forEach(tile =>tile.firstElementChild.classList.add('hvr-grow'))
}


const animation = {reset, drop, growAndExplode, removeTranslate, rotateAndAppear}
export default animation

