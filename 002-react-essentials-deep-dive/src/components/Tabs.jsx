/*
Here, we are accepting ButtonContainer as prop to dynamically use an element in the code. The values can be either string for built in html components or function reference for custom components. Note that the prop is capitalized to ensure that react doesn't look for built in component but for custom component. 

We can also remap the prop to a variable and use it if we don't want to accept a capitalized prop.

Also note that we have set a default value.
*/
export default function Tabs({ children, buttons, ButtonContainer = 'menu' }) {
  // const ButtonContainer = buttonContainer;

  return (
    <>
      <ButtonContainer>{buttons}</ButtonContainer>
      {children}
    </>
  );
}
