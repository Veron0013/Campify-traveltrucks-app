import css from './Hero.module.css';
import { Button } from '../Button/Button';

function Hero() {
  return (
    <section className={css.hero}>
      <div className="container">
        <div className={css.title_wrapper}>
          <h1 className={css.title}>Campers of your dreams</h1>
          <p className={css.hero_text}>You can find everything you want in our catalog</p>
        </div>
        <Button label="View now" href="/catalog" />
      </div>
    </section>
  );
}

export default Hero;
