// Seeds the page with a set of starting cards

const placesGrid = document.querySelector('.places__grid');

const initialCards = [
  {
      name: 'Yosemite Valley',
      // link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
      link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
      
  },
  {
      name: 'Lake Louise',
      link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg'
  },
  {
      name: 'Bald Mountains',
      link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg'
  },
  {
      name: 'Latemar',
      link: 'https://code.s3.yandex.net/web-code/latemar.jpg'
  },
  {
      name: 'Vanois National Park',
      link: 'https://code.s3.yandex.net/web-code/vanois.jpg'
  },
  {
      name: 'Lago di Braies',
      link: 'https://code.s3.yandex.net/web-code/lago.jpg'
  }
];

function createInitialCards() {
  for (card of initialCards) {
    const [name, link] = Object.values(card);
    let elements = createCardElements();
    elements = addClassesToCardElements(elements);
    elements = addContentToCardElements(elements, name, link);
    nestCardElements(elements); 
  }  
}

function createCardElements() {
  const listItem = document.createElement('li');
  const image = document.createElement('div');
  image.setAttribute('crossorigin', 'anonymous');
  const footer = document.createElement('div');
  const name = document.createElement('h2');
  const btn = document.createElement('button');
  return [listItem, image, footer, name, btn];
}

function addClassesToCardElements(elements) {
  const [listItem, image, footer, name, btn] = elements;
  listItem.classList.add('place');
  image.classList.add('place__image');
  footer.classList.add('place__footer');
  name.classList.add('place__name');
  btn.classList.add('button', 'button_action_like');
  return [listItem, image, footer, name, btn];
}

function addContentToCardElements(elements, cardName, link) {
  const [listItem, image, footer, name, btn] = elements;
  image.style.backgroundImage = `url(${link})`;
  name.textContent = cardName;
  return [listItem, image, footer, name, btn];
}

function nestCardElements(elements) {
  const [listItem, image, footer, name, btn] = elements;
  footer.append(name, btn);
  listItem.append(image, footer);
  placesGrid.prepend(listItem);
}

createInitialCards();


