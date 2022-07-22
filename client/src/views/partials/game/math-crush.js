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
  tiles.direction = true
  anime({
    targets: tiles.source.square,
    translateY: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine'
  });

  anime({
    targets: tiles.dest.square,
    translateY: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine'
  });
}

const slideDown = (distance, tiles) =>{
  tiles.direction = true
  anime({
    targets: tiles.source.square,
    translateY: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine'
  });

  anime({
    targets: tiles.dest.square,
    translateY: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine'
  });
}


const slideLeft = (distance, tiles) =>{
  tiles.direction = false
  anime({
    targets: tiles.source.square,
    translateX: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine'
  });

  anime({
    targets: tiles.dest.square,
    translateX: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine'
  });
}

const slideRight = (distance, tiles) => { 
  tiles.direction = false
  anime({
    targets: tiles.source.square,
    translateX: distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
  duration: 500,
    easing: 'easeInSine'
  });

  anime({
    targets: tiles.dest.square,
    translateX: -distance,
    direction: (tiles.alternate === true) ? 'alternate' : 'normal',
    duration: 500,
    easing: 'easeInSine'
  });
}


const revertY = (tiles) =>{
  anime({
    targets: [tiles.source.square, tiles.dest.square],
    translateY: 0,
    direction: 'normal',
    duration: 10,
    easing: 'easeInSine'
  });
}


const revertX = (tiles) =>{
  anime({
    targets: [tiles.source.square,tiles.dest.square],
    translateX: 0,
    direction: 'normal',
    duration: 10,
    easing: 'easeInSine'
  });
}



export {swapTiles, revertY, revertX }