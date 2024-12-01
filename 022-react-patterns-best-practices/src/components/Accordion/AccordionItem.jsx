import { createContext, useContext } from 'react';

const AccordionItemContext = createContext();

export function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);

  // Added this error since it's possible that hook is not used within the components wrapped by the AccordionItem
  if (!ctx) {
    throw new Error(
      'AccordionItem-related components must be wrapped by <AccordionItem>.'
    );
  }

  return ctx;
}

export default function AccordionItem({ id, className, children }) {
  return (
    <AccordionItemContext.Provider value={id}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
}
