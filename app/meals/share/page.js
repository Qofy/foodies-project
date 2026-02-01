import { handleSubmission } from '@/lib/actionForm';
import classes from './page.module.css';
import ImagePicker from '@/component/meals/image-picker';
import MealForm from '@/component/meals/meals-form';
// server action is used directly as the form `action`

export const metadata = {
  title: 'Share Your Meal',
  description: 'Share your delicious meal and recipe to the Community',
};

export default function ShareMealPage() {
  
  const formAction = handleSubmission;
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="user pick an image" name="image"/>
          
          <p className={classes.actions}>
            <MealForm/>
          </p>
        </form>
      </main>
    </>
  );
}