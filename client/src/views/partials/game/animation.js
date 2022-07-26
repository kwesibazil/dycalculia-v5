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
      delay: 700,
      complete: () => {
        tile.removeAttribute('class')
        tile.classList.add('coin', 'bomb') 
        console.log('grow then remove old class and add coin and bomb');
      }
    })

    transition.add({
      duration: 700,
      delay: 700,
      complete: () => {
        // tile.removeAttribute('class')
        // tile.classList.add('coin', 'invisible') 
        console.log('remove old class and add coin and invisible');
      }
    })

    transition.add({
      scale: 1,
      delay: 0
    })

  

  })
}

const drop = tiles => {
  const height = document.querySelector('.tile-container').getBoundingClientRect().height;
  
  tiles.forEach(tile => {
    const target =  tile.firstElementChild
    const down = tile.firstElementChild.dataset.down

    const transition = anime.timeline({
      targets: target,
      direction: 'normal',
      easing: 'easeInSine',
    })

    transition.add({
      translateY: height*down,
      delay: 1700,
      duration: 1000,
      complete: () => {
        console.log('moving down ');
      }
    })

    transition.add({
      duration: 1000,
      complete: () => { 
        //target.parentElement.classList.add('bg-white')
      }
    })


    transition.add({
      translateY: 0,
      delay: 1000,
      complete: () => {
        console.log('moving back up');
      }
    })
  })//forEach ends here
}//drop ends here



const animation = {drop, growAndExplode}
export default animation

