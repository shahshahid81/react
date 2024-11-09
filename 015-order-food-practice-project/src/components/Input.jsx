export default function Input({ id, name, label, ...props }) {
  return (
    <div className="flex flex-col my-2 gap-1">
      <label className="font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        className="max-w-80 p-1 border-white border-solid border-[1px] rounded-sm"
        name={name}
        id={id}
        {...props}
      />
    </div>
  );
}
