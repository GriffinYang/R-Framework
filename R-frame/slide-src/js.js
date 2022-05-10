// @ts-nocheck
let dynamicWith = '0px';
let round = 0;
let currentValue;
let lastValue;
let time = 0;
let timer;
let newEle;
let widthValue = '0px';
let eleContent;

const content = document.querySelector('.slide-content');
const div = document.querySelectorAll('.slide-content div');
const contentLength = content?.children.length;
const body = document.querySelector('body');

window.onload = () => {
  // @ts-ignore
  newEle = document.createElement('style');
  for (let i = 0; i < contentLength; i++) {
    widthValue =
      getNum(getComputedStyle(div[i]).width) + getNum(widthValue) + 'px';
    if (i === 0) {
      eleContent = `.style${i}{right:${widthValue}!important};`;
    } else {
      eleContent += `.style${i}{right:${widthValue}!important};`;
    }
  }

  newEle.innerHTML = eleContent;
  body.append(newEle);
  content.style.width = div[time].offsetWidth + 'px';
};
timer = setInterval(slideAnimation, 3000);
function slideAnimation() {
  if (time === -1) {
    content.style.width = div[0].offsetWidth + 'px';
    for (let i = 0; i < contentLength; i++) {
      div[i].classList.remove(`style${contentLength - 2}`);
      div[0].style.right = 0 + 'px';
    }
    time++;
    return;
  }
  content.style.width = div[time + 1].offsetWidth + 'px';
  if (time <= contentLength - 1) {
    for (let i = 0; i < contentLength; i++) {
      if (div[i].classList.length != 0) {
        div[i].classList.add(`style${time}`);
        div[i].classList.remove(`style${time - 1}`);
      } else if (div[i].classList.length === 0) {
        div[i].classList.add(`style${time}`);
      }
    }
    time++;
    if (time === contentLength - 1) {
      time = -1;
    }
  }
}

function getNum(numString) {
  let len = numString.length;
  const index = numString.indexOf('p');
  return parseFloat(numString.substring(0, index));
}
