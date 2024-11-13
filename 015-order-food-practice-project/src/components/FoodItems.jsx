import { useEffect, useState } from 'react';
import FoodItem from './FoodItem.jsx';
import useHttp from '../hooks/useHttp.js';

export default function FoodItems() {
  const {
    data: foodItems,
    isLoading,
    error,
  } = useHttp([], 'http://localhost:4600/meals');

  let content = <p className="text-2xl text-center pt-12">Loading Data....</p>;
  if (!isLoading) {
    if (error !== '') {
      content = <p className="text-2xl text-center pt-12">An Error Occured</p>;
    } else if (!foodItems.length) {
      content = <p className="text-2xl text-center pt-12">No Items Found</p>;
    } else {
      content = (
        <ul className="grid grid-cols-3 gap-4">
          {foodItems.map((element) => (
            <li
              className="list-none bg-stone-900 rounded-xl object-cover overflow-hidden"
              key={element.id}
            >
              <FoodItem item={element} />
            </li>
          ))}
        </ul>
      );
    }
  }

  return <main className="w-[90%] m-auto py-20 px-28">{content}</main>;
}
