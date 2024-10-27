import { formatter } from '../util/investment';

export default function InvestmentList({ investmentData }) {
  if (!investmentData.length) {
    return null;
  }

  let totalInterest = 0;
  const investmentDataContent = investmentData.map((investment) => {
    totalInterest += investment.interest;
    return (
      <tr key={investment.year}>
        <td>{investment.year}</td>
        <td>{formatter.format(investment.valueEndOfYear)}</td>
        <td>{formatter.format(investment.interest)}</td>
        <td>{formatter.format(totalInterest)}</td>
        <td>{formatter.format(investment.valueEndOfYear - totalInterest)}</td>
      </tr>
    );
  });

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Investment Capital</th>
        </tr>
      </thead>
      <tbody>{investmentDataContent}</tbody>
    </table>
  );
}
