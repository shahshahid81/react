import logoPath from '../assets/investment-calculator-logo.png';

export default function Header() {
  return (
    <header id="header">
      <img src={logoPath} alt="Money Bag" />
      <h1>Investment Calculator</h1>
    </header>
  );
}
