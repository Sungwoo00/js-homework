import { CardCollection } from './Cards.js';

export class SwiperComponent {
  constructor(data) {
    this.cardCollection = new CardCollection(data);
    this.swiper = null;
    this.isPlaying = true;
  }

  render() {
    return `
    <div class="swiper-container">
      <div class="swiper">
        ${this.cardCollection.render()}
      </div>
      <button class="toggleButton control-button">Stop</button>
    </div>
  `;
  }
  initializeSwiper() {
    this.swiper = new Swiper('.swiper', {
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      speed: 500,
      loop: true,
      slidesPerView: 5,
      centeredSlides: true,
      spaceBetween: 30,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      on: {
        slideChange: function () {
          const slides = this.slides;
          slides.forEach((slide) => {
            slide.classList.remove('swiper-slide-active');
          });
          const activeSlide = slides[this.activeIndex];
          activeSlide.classList.add('swiper-slide-active');

          if (!this.autoplay.running) {
            activeSlide.classList.add('selected-card');
          } else {
            document.querySelectorAll('.selected-card').forEach((card) => {
              card.classList.remove('selected-card');
            });
          }
        },
      },
    });
  }

  setupEventListeners() {
    const toggleButton = document.querySelector('.toggleButton');
    toggleButton.addEventListener('click', () => this.handleToggle());
  }

  handleToggle() {
    if (this.isPlaying) {
      this.swiper.autoplay.stop();
      document.querySelector('.toggleButton').textContent = 'Start';
      document.querySelector('.swiper').classList.add('swiper-stopped');

      const activeSlide = this.swiper.slides[this.swiper.activeIndex];
      activeSlide.classList.add('flipped');
    } else {
      this.swiper.autoplay.start();
      document.querySelector('.toggleButton').textContent = 'Stop';
      document.querySelector('.swiper').classList.remove('swiper-stopped');

      document.querySelectorAll('.swiper-slide.flipped').forEach((card) => {
        card.classList.remove('flipped');
      });
    }
    this.isPlaying = !this.isPlaying;
  }

  initialize(element) {
    element.innerHTML = this.render();
    this.initializeSwiper();
    this.setupEventListeners();
  }
}
