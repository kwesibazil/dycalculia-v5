import anime from 'animejs/lib/anime.es.js';


const swapTiles = tiles =>{
  const width = tiles.source.square.getBoundingClientRect().width;
  const height = tiles.source.square.getBoundingClientRect().height;

  if(tiles.dest.id === (tiles.source.id-8)) slideUp(height, tiles)
  else if(tiles.dest.id === (tiles.source.id-1)) slideLeft(width, tiles)
  else if(tiles.dest.id === (tiles.source.id+1)) slideRight(width, tiles)
  else if(tiles.dest.id === (tiles.source.id+8)) slideDown(height, tiles)
}

const slideUp = (distance, tiles) =>{
  anime({
    targets: tiles.source.square,
    translateY: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine',
    begin: function() {
      console.log('swap begin');
      swapBegin(tiles)
    }
  });

  anime({
    targets: tiles.dest.square,
    translateY: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine',
    complete: function() {
      console.log('swap end');
      swapComplete(tiles)
    }
  });
}

const slideDown = (distance, tiles) =>{
  anime({
    targets: tiles.source.square,
    translateY: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine',
    begin: function() {
      console.log('swap begin');
      swapBegin(tiles)
    }
  });

  anime({
    targets: tiles.dest.square,
    translateY: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine',
    complete: function() {
      console.log('swap end');
      swapComplete(tiles)
    }
  });
}


const slideLeft = (distance, tiles) =>{
  anime({
    targets: tiles.source.square,
    translateX: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine',
    begin: function() {
      console.log('swap begin');
      swapBegin(tiles)
    }
  });

  anime({
    targets: tiles.dest.square,
    translateX: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine',
    complete: function() {
      console.log('swap end');
      swapComplete(tiles)
    }
  });
}

const slideRight = (distance, tiles) => { 
  anime({
    targets: tiles.source.square,
    translateX: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine',
    begin: function() {
      console.log('swap begin');
      swapBegin(tiles)
    }
  });

  anime({
    targets: tiles.dest.square,
    translateX: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine',
    complete: function() {
      console.log('swap end');
      swapComplete(tiles)
    }
  });
}


const revertY = (tiles) =>{
  anime({
    targets: [tiles.source.square, tiles.dest.square],
    translateY: 0,
    direction: 'normal',
    duration: 10,
    easing: 'easeInSine',
    complete: function() { swapComplete(tiles) }
  });
}


const revertX = (tiles) =>{
  anime({
    targets: [tiles.source.square,tiles.dest.square],
    translateX: 0,
    direction: 'normal',
    duration: 10,
    easing: 'easeInSine',
    complete: function() { swapComplete(tiles) }
  });
}

const swapComplete = (tiles) =>{
  console.log('reset tiles');

  if(tiles.alternate !== true)
    revertX(tiles)

  resetTiles(tiles)
  //tiles.source.square.firstElementChild.classList.replace(tiles.dest.square.firstElementChild.dataset.img, tiles.source.square.firstElementChild.dataset.img)
  //tiles.dest.square.firstElementChild.classList.replace(tiles.source.square.firstElementChild.dataset.img,  tiles.dest.square.firstElementChild.dataset.img)
}

const swapBegin = (tiles) =>{
  console.log('re-swap amount');
  const temp = tiles.source.square.firstElementChild.dataset.amount
  tiles.source.square.firstElementChild.dataset.amount = tiles.dest.square.firstElementChild.dataset.amount
  tiles.dest.square.firstElementChild.dataset.amount = temp
}


const resetTiles = (tiles) => {
  console.log('resetting tiles values');
  tiles.source.square.firstElementChild.firstElementChild.classList.remove('selected')
  tiles.source.square = null
  tiles.dest.square = null
  tiles.source.id = null
  tiles.alternate = true
  tiles.dest.id = null
}
export {swapTiles, revertY, revertX }