export default function TabButton(props) {
  // children prop is always passed by react and will contain whatever code that is written between the tag of the Component.
  // For Example, <TabButton> Components </TabButton> will send Components in children and <TabButton> <p>Components</p> </TabButton> will send <p>Components</p> in children
  // The approach is called component composition

  return (
    // React Requires one parent element because it renders the node in UI tree and it needs one node only to properly add node to tree
    // However, when we use map at top level, react won't give the one parent element error and render each element individually.
    <li>

      {/* onClick is not HTML attribute but JSX attribute. When the code is processed, react will attach the handler to the element */}
      {/* <button onClick={handleClick}>{props.children}</button> */}

      {/* We are using className. class is a keyword in javascript and JSX is an extension of javascript. That's the principal reason why React uses className instead of class. */}
      <button className={props.isSelected ? "active": undefined} onClick={props.onSelect}>
        {props.children}
      </button>

    </li>
  );
}
