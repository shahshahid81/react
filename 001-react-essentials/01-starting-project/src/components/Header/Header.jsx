import reactImg from '../../assets/react-core-concepts.png';
import './Header.css'; // This import is not scoped. Adding rules in this file will apply the css rules globally.

const reactDescriptions = ['Fundamental', 'Curcial', 'Core'];

function generateRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

/*
Standard practices
  Use export default for components.
    People often use default exports if the file exports only one component, and use named exports if it exports multiple components and values. 
  File name and Function Name should be same.
*/
export default function Header() {
  const description = reactDescriptions[generateRandomInt(2)];

  // Using parantheses to return multi line code.
  return (
    <header>
      {/* 
        When we need to import image instead of using the path so that the image is also added to the final bundle and production safe path is used (Image will load in dev build as well as prod build).
        Also, this will help with image optimization, caching etc and other improvements.
        It also helps with hot reloading since only edited files are imported again after changes.
      */}
      {/* <img src="src/assets/react-core-concepts.png" alt="Stylized atom" /> */}
      <img src={reactImg} alt="Stylized atom" />

      <h1>React Essentials</h1>
      <p>
        {/* 
          Curly braces will evaluate JS expressions within them
          Here, we have used variable which is cleaner approach but we can directly write the expressions here too.
        */}
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}
