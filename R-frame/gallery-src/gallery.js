function getElement(selector) {
  const element = document.querySelector(selector);
  if (selector) {
    return element;
  } else {
    return new Error(
      `The selector: ${selector} does not exist, please check out the selector!`
    );
  }
}

const img = document.querySelectorAll('.img-container img');
const thumbnailElement = document.querySelector('.thumbnails');
const lastOne = document.querySelector('.left');
const nextOne = document.querySelector('.right');
const closebtn = document.querySelector('.close');
const modal = document.querySelector('.gallery-overlayer');
let lastIndex;
let nextIndex;
let position;
let mainPicture = getElement('.img-container-overlayer');
let picElement;
let midIndex = 0;
let imgObject = new Array();
for (let i = 0; i < img.length; i++) {
  imgObject[i] = img[i];
}

imgObject.map(function (item) {
  item.addEventListener('click', function () {
    const src = this.src;
    OpenModal(src);
  });
});
function OpenModal(src) {
  //  main-pic
  const modal = getElement('.gallery-overlayer');
  modal.classList.add('open');
  picElement = `<img src="${src}">`;
  mainPicture.innerHTML = picElement;
  //   thumbnails
  //   console.log(src);
  genereateThumbnailPic(src);
  midIndex = srcList.indexOf(thumNailimgs[1].src);
}
function coculateIndexs(index) {
  position = index;
  if (position >= imgObject.length) {
    position = 0;
  }
  if (position < 0) {
    position = imgObject.length - 1;
  }
  lastIndex = position - 1;
  if (lastIndex < 0) {
    lastIndex = imgObject.length - 1;
  }
  nextIndex = position + 1;
  if (nextIndex >= imgObject.length) {
    nextIndex = 0;
  }
}
function genereateThumbnailPic(src) {
  position = coculatePositon(src);
  let thumbnailPics = new Array();
  imgObject.map(function (item, index) {
    thumbnailPics[index] = generatePic(item.src);
  });
  coculateIndexs(position);
  thumbnailElement.innerHTML =
    thumbnailPics[lastIndex] +
    thumbnailPics[position] +
    thumbnailPics[nextIndex];
  thumbnailState();
  const thumNailimgs = document.querySelectorAll('.thumbnailsImgs');
  let thumbnailsContainer = new Array();
  for (let i = 0; i < thumNailimgs.length; i++) {
    thumbnailsContainer[i] = thumNailimgs[i];
  }
  thumbnailsContainer.map(function (item) {
    item.addEventListener('click', function () {
      const index = srcList.indexOf(item.src);
      coculateIndexs(index);
      newSrc = srcList[position];
      genereateThumbnailPic(newSrc);
      thumbnailState();
      picElement = `<img src="${srcList[position]}" class="">`;
      mainPicture.innerHTML = picElement;
    });
  });
}
let srcList = new Array();
function coculatePositon(src) {
  imgObject.map(function (item, index) {
    srcList[index] = item.src;
  });
  const index = srcList.indexOf(src);
  return index;
}
let midSrc;
function judge() {
  if (position < 0) {
    position = imgObject.length - 1;
  } else if (position >= imgObject.length) {
    position = 0;
  }
}
position = midIndex;
let newSrc;
lastOne.addEventListener('click', function (e) {
  position--;
  judge();
  coculateIndexs(position);
  newSrc = srcList[position];
  genereateThumbnailPic(newSrc);
  thumbnailState();
  picElement = `<img src="${srcList[position]}" class="">`;
  mainPicture.innerHTML = picElement;
});
nextOne.addEventListener('click', function (e) {
  position++;
  judge();
  coculateIndexs(position);
  newSrc = srcList[position];
  genereateThumbnailPic(newSrc);
  thumbnailState();
  picElement = `<img src="${srcList[position]}" class="">`;
  mainPicture.innerHTML = picElement;
});
function generatePic(src) {
  return `<img src="${src}" class="thumbnailsImgs">`;
}
function thumbnailState() {
  const thumbnailUse = document.querySelectorAll('.thumbnailsImgs');
  thumbnailUse[1].classList.add('thumbactive');
}
closebtn.addEventListener('click', function () {
  modal.classList.remove('open');
});
