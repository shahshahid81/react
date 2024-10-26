// Accepting all the props by using rest operator to dynamically accept any number of props
export default function Section({ title, children, ...props }) {
  return (
    // Using spread operator to pass all the props to the element except title and children.
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
