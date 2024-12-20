import { cardData } from './src/data/data.js';
import { SwiperComponent } from './src/components/Swiper.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  new SwiperComponent(cardData).initialize(app);
});
