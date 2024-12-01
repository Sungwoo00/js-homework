export class Card {
  constructor(content) {
    this.content = content;
  }

  render() {
    return `
      <div class="swiper-slide" >
        <div class="card" data-content="${this.content}">  

        </div>
      </div>
    `;
  }
}

export class Modal {
  constructor(content) {
    this.content = content;
  }

  render() {
    return `
      <div class="modal" id="cardModal">
        <div class="modal-content">
          <span class="close-button">&times;</span>
          <div class="modal-img"></div>
          <div class="modal-body">
            ${this.content}...
          </div>
        </div>
      </div>
    `;
  }
}

export class CardCollection {
  constructor(data) {
    this.cards = data.map((item) => new Card(item.content));
  }

  render() {
    return `
      <div class="swiper-wrapper">
        ${this.cards.map((card) => card.render()).join('')}
      </div>
    `;
  }
}
