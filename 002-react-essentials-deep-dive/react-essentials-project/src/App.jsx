import Header from './components/Header/Header.jsx';
import Examples from './components/Examples.jsx';
import CoreConcepts from './components/CoreConcepts.jsx';

function App() {
  return (
    // Since a function should return only one value, if we want to return elements without any parent container, use Fragment or it's shorthand to wrap the values. Internally, it just renders the children that is passed to it.

    // <Fragment>
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
    // </Fragment>
  );
}

export default App;
