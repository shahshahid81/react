import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

// Method will recieve the same parameters as the page. Needs to return the object used by next js to generate metadata.
export async function generateMetadata({ params }) {
  const meal = getMeal(params.id);

  if (!meal) {
    // This will stop the rendering of current component and will render the nearest not found component
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  }
}

export default function MealsDetailsPage({ params }) {
  const meal = getMeal(params.id);

  if (!meal) {
    // This will stop the rendering of current component and will render the nearest not found component
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={meal.image} alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          // Beware of cross site scripting attacks
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
