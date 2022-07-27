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
      complete: () => {
        tile.classList.add('invisible') 
      },
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
      duration: 700,
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


const animation = {drop, growAndExplode, removeTranslate}
export default animation

