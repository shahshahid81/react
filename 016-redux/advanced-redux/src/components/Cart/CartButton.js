import { uiActions } from '../../store/uiSlice';
import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const total = items.reduce(
    (acc, item) => (acc += item.quantity),
    0
  );

  return (
    <button
      onClick={() => dispatch(uiActions.toggleCart())}
      className={classes.button}
    >
      <span>My Cart</span>
      <span className={classes.badge}>{total}</span>
    </button>
  );
};

export default CartButton;
