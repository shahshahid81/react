import {
  useDispatch,
  useSelector,
  // connect
} from 'react-redux';
import classes from './Counter.module.css';
// import { Component } from 'react';

const Counter = () => {
  // useSelector allows us to only select part of a state. We automatically get subscription to the selected state and it is automatically cleaned up behind the scenes
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  const dispatch = useDispatch();

  const toggleCounterHandler = () => { dispatch({ type: 'TOGGLE' }) };
  const incrementHandler = () => dispatch({ type: 'INCREMENT' });
  const increaseHandler = () => dispatch({ type: 'INCREASE', amount: 10 });
  const decrementHandler = () => dispatch({ type: 'DECREMENT' });

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment By 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() { }

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler.bind(this)}>
//           Toggle Counter
//         </button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: 'INCREMENT' }),
//     decrement: () => dispatch({ type: 'DECREMENT' }),
//   };
// };

// // connect can be used with functional components as well but using hooks is more convenient.
// // we basically map the state and dispatch operation as props so that it can be used internally inside the component class
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
