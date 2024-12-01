import { createContext, useContext, useState } from 'react';
import AccordionItem from './AccordionItem';
import AccordionTitle from './AccordionTitle';
import AccordionContent from './AccordionContent';

const AccordionContext = createContext();

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  // Added this error since it's possible that hook is not used within the components wrapped by the Accordion
  if (!ctx) {
    throw new Error(
      'Accordion-related components must be wrapped by <Accordion>.'
    );
  }

  return ctx;
}

export default function Accordion({ children, className }) {
  const [openItemId, setOpenItemId] = useState();

  function toggleItem(id) {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = {
    openItemId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

// Adding property on function so that we can group the children elements together and make it more clearer that item must be used within the container
// Note that it is possible to import the below components directly, however, we can have all the components in the same file to avoid export the below components
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
