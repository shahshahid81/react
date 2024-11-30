import Link from 'next/link';
import logo from '@/assets/logo.png';
import classes from './main-header.module.css';
import Image from 'next/image';
import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          {/* Note that we are using src key on the logo unlinke react where we directly use the image */}
          {/* <img src={logo.src} alt="A plate with food on it" />
        Nextlevel Food */}

          {/* Note that we are using the logo object completely since it is needed by the component */}
          {/* Using image component instead of img tag provides different benefits like optimization of image, lazy loading etc. */}
          <Image src={logo} alt="A plate with food on it" priority />
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals"> Browse meals</NavLink>
            </li>
            <li>
              <NavLink href="/community"> Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
