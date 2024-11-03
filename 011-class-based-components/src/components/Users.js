import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component {
  constructor() {
    // Super must be called if we are extending class
    super();

    // State always has to be an property named state with type as object for class based components
    this.state = {
      showUsers: true,
      extraProperty: '',
    };
  }


  toggleUsersHandler() {
    // setState will merge the state instead of overwriting the state. So only showUser will be replaced with new value and extraProperty or any other properties won't be affected
    // Also, to update the state based on existing value, use method where old value is provided
    this.setState((currentState) => {
      return {
        showUsers: !currentState.showUsers,
      };
    });
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        {/* this.toggleUsersHandler will return a method but no this context. We need to use bind method call to ensure that the current object is bound to it. */}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
