export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems(newElement) {
    if (newElement) {
      this._container.prepend(newElement);
    }
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
