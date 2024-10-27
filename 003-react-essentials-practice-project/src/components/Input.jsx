export default function Input({ labelText, inputValue, handleInputChange }) {
  return (
    <p>
      <label>{labelText}</label>
      <input
        type="number"
        required
        value={inputValue}
        onChange={handleInputChange}
      />
    </p>
  );
}
