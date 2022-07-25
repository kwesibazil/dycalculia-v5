import anime from 'animejs/lib/anime.es.js';


const steps = (valid) => {
  let step = 0

  valid.forEach(elem => {
    const id = elem.parentElement.getAttribute('id')
  
  })

  return 1
}


const dropTiles = (replacement, valid, invalid) => {
  console.log('drop');
  
  console.log(replacement[0].parentElement);
  const bottom = [56,57,58,59,60,61,62,63]
  const width = replacement[0].parentElement.getBoundingClientRect().width;
  const height = replacement[0].parentElement.getBoundingClientRect().height;


  invalid.forEach(tile => {
    const tl = anime.timeline({
      targets: tile,
      duration: 1000,
      easing: 'easeInSine',
    })

    tl.add({
      rotate: '1turn',
      scale: .5,
      complete: function() {
        tile.removeAttribute('class')
        tile.classList.add('invisible')
      }
    })
  })


  valid.forEach(tile => {
    let step = 0,  id = parseInt(tile.parentElement.getAttribute('id'))
    while(id < 64 && !document.getElementById(id).firstElementChild.hasAttribute('data-marked')){
      id +=8
      step+=1
    }
    
    const below = parseInt(tile.parentElement.getAttribute('id')) +8 
    let skip = parseInt(document.getElementById(below).firstElementChild.dataset.skip)
    if(skip === undefined || isNaN(skip))skip = parseInt(document.getElementById(id).firstElementChild.dataset.skip)
    tile.setAttribute('data-skip', skip+1)
    step -= skip
    
    const t2 = anime.timeline({
      targets: tile,
      direction: 'normal',
      duration: 1000,
      easing: 'easeInSine',
      delay: 1000,
    })

    t2.add({ 
      translateY: height*step,
    })
    .add({
      translateY: 0,
      rotate: '1turn',
      scale: .5,
      begin: function() {
        tile.removeAttribute('class')
        tile.classList.add('invisible')
        console.log('turn invisible then translate back up');
      }

    }, '+=500')

    .add({
      
      rotate: '-1turn',
      scale: 1,
      delay: 0,
      begin: function() {
        tile.removeAttribute('class')
        tile.classList.add('ten')
        console.log('becomes visible then rotate');
      }

    }, '+=500')

  })




}//dropTiles definition ends here





const animate = {dropTiles}

export default animate



// const genNewTiles = () => {
    
//   const invalid = document.getElementsByClassName('bomb')
//   Array.from(invalid).forEach(tile => game.invalid.push(tile))
//   game.invalid.reverse()

//   game.invalid.forEach(index =>{
//     console.log(index);
  
//     while(index >= 0){
//       replacement.push(index)
//       if(parseInt(game.grid[index].firstElementChild.dataset.amount) > 0)valid.push(index)
//       index -= game.size
//     }

  

//     // for(let i=0; i<replacement.length; i++){
//     //   if(valid[i] !== undefined){
//     //     console.log('replace');
//     //     //game.grid[valid[i]].classList.add('bg-white')
//     //     game.grid[replacement[i]].classList.add('bg-success')
//     //     //game.grid[valid[i]].firstElementChild.dataset.amount = 0
//     //   }else{
//     //     console.log('generate new random');
//     //     game.grid[replacement[i]].classList.add('bg-danger')
//     //   }
//     // }


//   })

//   console.log('finish gen new tiles');
// } 


// .add({
    //   rotate: '-=1turn',
    //   scale: 1,
    //   begin: function() {
    //     tile.classList.replace('invisible', 'ten')
    //     console.log('second begin');
    //   }
    // }, '+=2600') // relative offset after the previous animation ends    





    // .add({ 
    //   translateY: 0,
    //   complete: function(){
    //     console.log('move back up');
    //     tile.classList.replace('invisible', 'ten')
    //   }
    // })
    // .add({
    //   scale: 1,
    //   //rotate: '-=1turn',
    //   begin: function() {
    //     tile.classList.replace('invisible', 'ten')
    //     //tile.classList.replace('invisible', 'ten')
    //     console.log('becomes visible and rotate');
    //   }
    // }) // relative offset after the previous animation ends    
