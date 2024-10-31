export default function FormInput({ label, id, Component, ...props }) {
  return (
    <>
      <label
        className="text-lg uppercase text-stone-700 font-semibold tracking-wide mb-1"
        htmlFor={id}
      >
        {label}
      </label>
      <Component
        className="bg-stone-500/15 w-full text-xl focus:outline-none focus:border-b-2 focus:border-b-stone-700"
        required
        id={id}
        {...props}
      />
    </>
  );
}
