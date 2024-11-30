//  Adding this will ensure that this method will be available only on server.
// Also, adding this to separate file will let us use `use client` directive on the parent components because we cannot use both `use server` and `use client` at the same time
'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.image ||
    meal.image.size === 0 ||
    !meal.creator_email ||
    !meal.creator_email.includes('@')
  ) {
    // throw new Error('Invalid Input');

    // We can return object here, but it needs to be a plain object (keys should have primitive values or can be array or object with primitive values, no methods)
    return {
      message: 'Invalid Input',
    };
  }

  await saveMeal(meal);

  // In production, the pages are cached, so /meals will not show any newly added meals. To test this, uncomment below method and run npm run build and npm run start and add a meal. 
  // The first param is route which will be re evaluated by next. By default, only the /meals route will be re evalutated. If we want to do the same for nested routes, add 'layout' to the second argument.
  revalidatePath('/meals')
  redirect('/meals');
}
