export default function Input({ labelText, inputValue, handleInputChange }) {
  return (
    <div>
      <label>{labelText}</label>
      <input type="number" value={inputValue} onChange={handleInputChange} />
    </div>
  );
}
