import { useState } from 'react';
import Header from './components/Header';
import InvestmentList from './components/InvestmentList';
import UserInvestmentData from './components/UserInvestmentData';
import { calculateInvestmentResults } from './util/investment';

function App() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [annualInvestment, setAnnualInvestment] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [duration, setDuration] = useState('');

  let investmentData = [];
  if (initialInvestment && annualInvestment && expectedReturn && duration) {
    investmentData = calculateInvestmentResults({
      initialInvestment,
      annualInvestment,
      expectedReturn,
      duration,
    });
    console.log({
      initialInvestment,
      annualInvestment,
      expectedReturn,
      duration,
      investmentData,
    });
  }

  return (
    <>
      <Header />
      <UserInvestmentData
        initialInvestment={initialInvestment}
        setInitialInvestment={setInitialInvestment}
        annualInvestment={annualInvestment}
        setAnnualInvestment={setAnnualInvestment}
        expectedReturn={expectedReturn}
        setExpectedReturn={setExpectedReturn}
        duration={duration}
        setDuration={setDuration}
      />
      <InvestmentList investmentData={investmentData} />
    </>
  );
}

export default App;
