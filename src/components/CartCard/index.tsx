import { useDispatch } from "react-redux";
import { getDiscountedPrice } from "../../helpers/getDiscountedPrice";
import "./cartcard.css";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../features/cart.slice";
interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  quantity: number;
  total: number;
  thumbnail?: string;
}

const CartCard = ({ cart }: { cart: Product }) => {
  const dispatch = useDispatch();
  const discountedPrice = getDiscountedPrice(
    cart?.price,
    cart?.discountPercentage
  );
  const total = (discountedPrice as number) * cart?.quantity;
  const handleDecrementQuantity = () => {
    console.log(cart?.id);
    dispatch(decrementQuantity(cart?.id));
  };

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(cart?.id));
  };

  return (
    <>
      <div className="cart-card">
        <div className="cart-item_label">
          <p>{cart?.title}</p>
        </div>
        <div className="cart-item_price">
          <span>Price:</span>{" "}
          <span className="actual_price">${cart?.price}</span>{" "}
          <span className="price">${discountedPrice}</span>
        </div>
        <div className="quantity">
          <div className="quantity-text">Quantity:</div>
          <div className="select-quantity">
            <button onClick={handleDecrementQuantity}>-</button>
            <input type="number" value={cart?.quantity} />
            <button onClick={handleIncrementQuantity}>+</button>
          </div>
        </div>
        <div className="item-total">
          <span className="total-label">Total:</span>
          <span className="total">${total}</span>
        </div>
      </div>
    </>
  );
};

export default CartCard;
