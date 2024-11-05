import { useRef, useState } from 'react';
import Input from './Input';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';
import { useInput } from '../hooks/useInput';

export default function Login() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const [formData, setFormData] = useState({ email: '', password: '' });
  // const [didEdit, setDidEdit] = useState({ email: false, password: false });
  // const [isEmailValid, setIsEmailValid] = useState(true);
  // const [isPasswordValid, setIsPasswordValid] = useState(true);

  // function handleFormDataChange(key, value) {
  //   setFormData((previousState) => ({
  //     ...previousState,
  //     [key]: value,
  //   }));

  //   setDidEdit((previousState) => ({
  //     ...previousState,
  //     [key]: false,
  //   }));
  // }

  // function handleInputBlur(key) {
  //   setDidEdit((previousState) => ({
  //     ...previousState,
  //     [key]: true,
  //   }));
  // }

  // const emailIsInvalid =
  //   didEdit.email && (!isNotEmpty(formData.email) || !isEmail(formData.email));
  // const passwordIsInvalid =
  //   didEdit.password && !hasMinLength(formData.password, 6);

  // const emailRef = useRef(null);
  // const passwordRef = useRef(null);

  const {
    value: email,
    handleBlur: handleEmailBlur,
    handleChange: handleEmailChange,
    hasError: emailHasError,
  } = useInput('', (email) => isNotEmpty(email) && isEmail(email));

  const {
    value: password,
    handleBlur: handlePasswordBlur,
    handleChange: handlePasswordChange,
    hasError: passwordHasError,
  } = useInput('', (password) => hasMinLength(password, 6));

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted');

    // console.log({ email, password });
    // setEmail('');
    // setPassword('');

    // console.log(formData);
    // setFormData({ email: '', password: '' });

    // console.log({
    //   email: emailRef.current.value,
    //   password: passwordRef.current.value,
    // });
    // Ideally, we shouldn't update dom element programatically and let react update it but it is fine in this case becase this state change doesn't have to re render the UI
    // emailRef.current.value = '';
    // passwordRef.current.value = '';

    // if (!isNotEmpty(formData.email) || !isEmail(formData.email)) {
    //   setIsEmailValid(false);
    //   return;
    // }

    // if (!hasMinLength(formData.password, 6)) {
    //   setIsPasswordValid(false);
    //   return;
    // }

    // setIsEmailValid(true);
    // setIsPasswordValid(true);
  }

  return (
    // Added onSubmit event handler here instead of submit button's click listener because the event can be called by pressing enter or programatically by form.submit() method along with submit button event
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        {/* <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            // ref={emailRef}

            // value={email}
            // onChange={(e) => setEmail(e.target.value)}

            value={formData.email}
            onChange={(e) => handleFormDataChange('email', e.target.value)}
            onBlur={() => handleInputBlur('email')}
          />
          <div className="control-error">
            {(emailIsInvalid || !isEmailValid) && (
              <p>Please enter a valid email address</p>
            )}
          </div>
        </div> */}

        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailHasError && 'Please enter a valid email address'}
        />

        {/* <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            // ref={passwordRef}

            // value={password}
            // onChange={(e) => setPassword(e.target.value)}

            value={formData.password}
            onChange={(e) => handleFormDataChange('password', e.target.value)}
          />
        </div> */}
        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordHasError && 'Please enter a valid password'}
        />
      </div>

      <p className="form-actions">
        {/* By default type is submit if not specified */}
        {/* If we add another type than submit then handleSubmit won't be called */}
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
