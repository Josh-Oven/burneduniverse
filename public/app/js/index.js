let logo = document.getElementById('title-logo')
let projectBanner = document.getElementById('project-banner')

let logoRect = logo.getBoundingClientRect();
let pBannerRect = projectBanner.getBoundingClientRect();
let windowHeight = window.innerHeight;


// console.log(fadeDistance, fadeSegments)

//////////////////////
// logo fade needs to take two dom elemtents
let fadeDistance = false;
let fadeSegments;
let currentFadeDistance;
let item1 = logo;
let item2 = projectBanner;

let logoFade = () => {
  let item1Rect = item1.getBoundingClientRect();
  let item2Rect = item2.getBoundingClientRect();
  let newFadeDistance = item2Rect.top - item1Rect.top;

  if (fadeDistance == false){
    fadeDistance = item2Rect.top - item1Rect.top;
    fadeSegments = fadeDistance/10;
  }

  if (newFadeDistance < fadeSegments){
    item1.style.opacity = 0;
  } else if (newFadeDistance <= fadeSegments){
    item1.style.opacity = .1;
  } else if (newFadeDistance <= fadeSegments*2){
    item1.style.opacity = .2;
  } else if (newFadeDistance <= fadeSegments*3){
    item1.style.opacity = .3;
  } else if (newFadeDistance <= fadeSegments*4){
    item1.style.opacity = .4;
  } else if (newFadeDistance <= fadeSegments*5){
    item1.style.opacity = .5;
  } else if (newFadeDistance <= fadeSegments*6){
    item1.style.opacity = .6;
  } else if (newFadeDistance <= fadeSegments*7){
    item1.style.opacity = .7;
  } else if (newFadeDistance <= fadeSegments*8){
    item1.style.opacity = .8;
  } else if (newFadeDistance <= fadeSegments*9){
    item1.style.opacity = .9;
  } else if (newFadeDistance <= fadeSegments*10){
    item1.style.opacity = 1;
  }

}
document.addEventListener('scroll', logoFade)
