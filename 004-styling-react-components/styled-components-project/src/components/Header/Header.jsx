import logo from '../../assets/logo.png';
import { styled } from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;

  ${
    /* Use & as placeholder to add other rules to be used with header since we are defining styles for styled.header*/ ''
  }
  & img {
    object-fit: contain;
    margin-bottom: 2rem;
    width: 11rem;
    height: 11rem;
  }

  & h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-align: center;
    text-transform: uppercase;
    color: #9a3412;
    font-family: 'Pacifico', cursive;
    margin: 0;
  }

  @media (min-width: 768px) {
    ${
      /** 
      Below code is using braces but we can omit it if we are only matching the element used above which is styled.header in this case.
      & {
        margin-bottom: 4rem;
      } 
      */ ''
    }

    margin-bottom: 4rem;

    & h1 {
      font-size: 2.25rem;
    }
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </StyledHeader>
  );
}
