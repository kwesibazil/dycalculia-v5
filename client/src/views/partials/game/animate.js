import anime from 'animejs/lib/anime.es.js';


const dropTiles = (replacement, valid, invalid) => {
  console.log('drop');
  
  

  const width = replacement[0].getBoundingClientRect().width;
  const height = replacement[0].getBoundingClientRect().height;



  invalid.forEach(tile => {
    const tl = anime.timeline({
      targets: tile.firstElementChild,
      duration: 1000,
      easing: 'easeInSine',
    })

    tl.add({
      rotate: '1turn',
      scale: .5,
      complete: function() {
        tile.firstElementChild.removeAttribute('class')
        tile.firstElementChild.classList.add('invisible')
      }
    })
  })


  valid.forEach(tile => {
    console.log(tile);
    //console.log(height*tile.firstElementChild.dataset.skip);

    const t2 = anime.timeline({
      targets: tile.firstElementChild,
      direction: 'normal',
      duration: 1000,
      easing: 'easeInSine',
      delay: 1000,
    })

    t2.add({ 
      translateY: height*tile.firstElementChild.dataset.skip,
    })

    // t2.add({ 
    //   translateY: 0,
    // })
  
    
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
