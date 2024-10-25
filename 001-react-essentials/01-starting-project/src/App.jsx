import Header from './components/Header/Header';
import CoreConcept from './components/CoreConcept';
import TabButton from './components/TabButton';
import { CORE_CONCEPTS, EXAMPLES } from './data';
import { useState } from 'react';

// All Component Function name must start with upper case and return JSX Code
// https://stackoverflow.com/questions/30373343/reactjs-component-names-must-begin-with-capital-letters
// In JSX, lower-case tag names are considered to be HTML tags. However, lower-case tag names with a dot (property accessor) aren't.

// See caveats of the createElement API.

// <component /> compiles to React.createElement('component') (html tag)
// <Component /> compiles to React.createElement(Component)
// <obj.component /> compiles to React.createElement(obj.component)
function App() {
  /**
   * 2 rules for hook.
   * 1. Hooks must be called at the top level of function. (Not inside if else, loops, nested blocks etc)
   * 2. Hooks must be called in react components or custom hooks ony.
   *
   * The first rule is because react will always follow the same order to assign data from previous render or updated value so it's important that all hooks are called in the correct order. For Example, if we use 2 useState, then first render will take the value passed as initial value. On subsequent render, since react knows 2 useState hooks were called, it will assign data from previous render or updated value in proper order instead of setting the inital value.
   */

  /* 
    selectedTopic is a value from useState. First time, we will get the inital value passed to the useState method. In subsequent renders, react will pass data from previous renders or updated value.
    setSelectedTopic will schedule the value to be updated and then re render the function. 
    Because of this, we need to ensure that if we are calling useState multiple times, we should use the arrow function to get previous state and then update it.
  */
  const [selectedTopic, setSelectedTopic] = useState('');

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
    // Old component is logged here because setSelectedTopic will schedule update instead of performing it directly
    console.log(selectedTopic);
  }

  let tabContent = <p>Please select a topic.</p>;
  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div>
      {/* <Header></Header> */}
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {/* <CoreConcept
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            />
            <CoreConcept
              title={CORE_CONCEPTS[1].title}
              description={CORE_CONCEPTS[1].description}
              image={CORE_CONCEPTS[1].image}
            />
            <CoreConcept
              title={CORE_CONCEPTS[2].title}
              description={CORE_CONCEPTS[2].description}
              image={CORE_CONCEPTS[2].image}
            /> */}
            {/* Extracting the concepts directly and spreading it */}
            {/* <CoreConcept {...CORE_CONCEPTS[3]} /> */}

            {/*
              Note that when we add array in the curly braces, all the elements are processed one by one by react automatically. So in the below case, an array with 4 items are returned which are rendered one by one automatically.
            
              Also a key is needed for array elements to uniquely identify the elements to update.
              Keys tell React which array item each component corresponds to, so that it can match them up later. This becomes important if your array items can move (e.g. due to sorting), get inserted, or get deleted. A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree.
            */}
            {/* {CORE_CONCEPTS.map((coreConcept) => {
              return (
                <CoreConcept
                  key={coreConcept.title}
                  title={coreConcept.title}
                  description={coreConcept.description}
                  image={coreConcept.image}
                />
              );
            })} */}

            {CORE_CONCEPTS.map((coreConcept) => (
              <CoreConcept key={coreConcept.title} {...coreConcept} />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              isSelected={selectedTopic === 'components'}
              onSelect={() => handleSelect('components')}
            >
              Components
            </TabButton>
            <TabButton
              isSelected={selectedTopic === 'jsx'}
              onSelect={() => handleSelect('jsx')}
            >
              JSX
            </TabButton>
            <TabButton
              isSelected={selectedTopic === 'props'}
              onSelect={() => handleSelect('props')}
            >
              Props
            </TabButton>
            <TabButton
              isSelected={selectedTopic === 'state'}
              onSelect={() => handleSelect('state')}
            >
              State
            </TabButton>
          </menu>

          {/* Approach where we are using two different ternary operators. Note that null is not rendered by react. */}
          {/* {!selectedTopic ? <p>Please select a topic.</p> : null}
          {selectedTopic ? (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          ) : null} */}

          {/* This approach can be used since && will return the value if earlier statement is true */}
          {/* {!selectedTopic && <p>Please select a topic.</p>}
          {selectedTopic && (
          <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
              <code>{EXAMPLES[selectedTopic].code}</code>
            </pre>
          </div>
          )} */}

          {/* Approach where we are using single ternary operator */}
          {/* {!selectedTopic ? (
            <p>Please select a topic.</p>
          ) : (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          )} */}

          {/* Approach where we are using variable */}
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
