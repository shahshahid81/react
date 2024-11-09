export default function CtaButton({ ctaText, ...props }) {
  return (
    <button
      className=" text-stone-900 font-light bg-yellow-500 hover:bg-yellow-600 px-6 py-2 my-3"
      {...props}
    >
      {ctaText}
    </button>
  );
}
