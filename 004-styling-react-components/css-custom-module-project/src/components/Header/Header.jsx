import logo from '../../assets/logo.png';

/* 
Here, we are using .module.css file extension. 
This will be used by build process to generate the css rules only specific to this JSX markup and won't impact other rules. 
This is done by generating unique name per css module.
Note that even if we are not using classes, we should import the css file so that other rules get applied.
Also, only classes and animation names. Ids and element selectors like p, h1 etc are not impacted.
*/
import classes from './Header.module.css';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p className={classes.paragraph}>
        A community of artists and art-lovers.
      </p>
    </header>
  );
}
