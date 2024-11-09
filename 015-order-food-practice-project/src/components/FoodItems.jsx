import { useEffect, useState } from 'react';
import FoodItem from './FoodItem.jsx';

export default function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchFoodItems() {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch('http://localhost:4600/meals', {
          signal: abortController.signal,
        });
        if (response.ok) {
          setFoodItems(await response.json());
        }
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setIsError(true);
          console.log(error);
        } else {
          setIsError(false);
        }
        setIsLoading(false);
      }
    }
    fetchFoodItems();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <main className="w-[90%] m-auto py-20 px-28">
      {isError && (
        <p className="text-2xl text-center pt-12">An Error Occured</p>
      )}
      {isLoading && (
        <p className="text-2xl text-center pt-12">Loading Data....</p>
      )}
      {!isLoading && foodItems.length > 0 ? (
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
      ) : (
        <p className="text-2xl text-center pt-12">No Items Found</p>
      )}
    </main>
  );
}
