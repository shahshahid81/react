import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

// using async function to simulate that we can return promise that can be used in server components
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // // Throwing error to simulate error and render error.js page
  // throw new Error('test');
  return (
    db
      .prepare('SELECT * FROM meals')
      // all returns all data.
      .all()
  );
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });

  // Sanitize input to prevent cross site scripting attacks
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Failed to save image.');
    }
  });

  // Route stored like below since we are storing data in public folder which can be accessed at the root route, but this will be available only on development mode. Use S3 for production.
  meal.image = `/images/${fileName}`;

  console.log(meal);

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
       @title, @summary, @instructions, @creator, @creator_email, @image, @slug
      )  
  `
  ).run(meal);
}
