import { Component } from 'react';
import classes from './User.module.css';

// All Components must be extended
class User extends Component {

  // To be called before the component is removed from dom
  componentWillUnmount() {
    console.log('componentWillUnmount called');
  }

  render() {
    // props are accessed using this
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
