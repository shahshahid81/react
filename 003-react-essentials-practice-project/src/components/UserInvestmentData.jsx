import Input from './Input';

export default function UserInvestmentData({
  initialInvestment,
  setInitialInvestment,
  annualInvestment,
  setAnnualInvestment,
  expectedReturn,
  setExpectedReturn,
  duration,
  setDuration,
}) {
  return (
    <div id="user-input">
      <div className="input-group">
        <Input
          labelText="Initial Investment"
          inputValue={initialInvestment}
          handleInputChange={(e) =>
            setInitialInvestment(Number(e.target.value, 10))
          }
        />
        <Input
          labelText="Annual Investment"
          inputValue={annualInvestment}
          handleInputChange={(e) =>
            setAnnualInvestment(Number(e.target.value), 10)
          }
        />
      </div>
      <div className="input-group">
        <Input
          labelText="Expected Return"
          inputValue={expectedReturn}
          handleInputChange={(e) =>
            setExpectedReturn(Number(e.target.value), 10)
          }
        />
        <Input
          labelText="Duration"
          inputValue={duration}
          handleInputChange={(e) => setDuration(Number(e.target.value), 10)}
        />
      </div>
    </div>
  );
}
