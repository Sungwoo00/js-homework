export class Card {
  constructor(content) {
    this.content = content;
  }

  render() {
    return `
      <div class="swiper-slide" role="group" aria-label="${this.content}">
        <div class="card" data-flipped="false">
          <div class="card-front">
          </div>
          <div class="card-back">
            <p>${this.content}</p>
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
