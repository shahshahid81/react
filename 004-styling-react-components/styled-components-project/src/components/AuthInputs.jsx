import { useState } from 'react';
import { styled } from 'styled-components';
import Button from './Button';
import CustomInput from './CustomInput';

// Creates a div component with all the styles defined under a uniquely generated class name under the hood
// The component will also forward all the props including children
const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlContainer>
        <CustomInput
          label="Email"
          type="email"
          invalid={emailNotValid}
          onChange={(event) => handleInputChange('email', event.target.value)}
        />
        {/* <p>
          <Label $invalid={emailNotValid}>Email</Label>
          <Input
            type="email"
            //  We can apply inline style only by passing object, string won't work here.
            //  Also, the properties which have hypen should either be used within quotes or simply use camelCase name instead.
            // style={{
            //   'background-color': emailNotValid ? 'red' : '#d1d5db',
            //   backgroundColor: emailNotValid ? 'red' : '#d1d5db',
            // }}

            // Ideally, we don't want to use class name or style with styled components. Instead we want to use built in method where the props are passed to styled components to apply the css rules conditionally.
            // className={emailNotValid ? 'invalid' : undefined}

            // Note that instead of using above className props, we are passing $invalid prop. We are prefixing the '$' character since we have an inbuilt html invalid prop too and it is best practice to use '$' for all props with styled components
            $invalid={emailNotValid}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p> */}
        <CustomInput
          label="Password"
          type="password"
          invalid={passwordNotValid}
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
        />
        {/* <p>
          <Label $invalid={passwordNotValid}>Password</Label>
          <Input
            type="password"
            // className={passwordNotValid ? 'invalid' : undefined}
            $invalid={passwordNotValid}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </p> */}
      </ControlContainer>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
