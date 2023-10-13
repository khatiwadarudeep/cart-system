import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useGetCart } from "../../services/cart";
import { addToCart } from "../../features/cart.slice";
import CartCard from "../CartCard";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../routes/constants.routes";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: cartData } = useGetCart();
  const existingCartProducts = cartData?.data?.carts?.[0]?.products;

  useEffect(() => {
    if (existingCartProducts) {
      dispatch(addToCart(existingCartProducts));
    }
  }, [existingCartProducts, dispatch]);

  const totalAmount = cart.cart.reduce((acc, item) => {
    const total = (item?.discountedPrice as number) * item?.quantity;
    return acc + total;
  }, 0);

  return (
    <>
      <div>
        {cart.cart.map(
          (cartItem) => cartItem !== null && <CartCard cart={cartItem} />
        )}
        <div className="total-section">
          <div className="total-section--label">Total Amount</div>
          <div className="amount">${totalAmount}</div>
        </div>
        <div className="checkout">
          <button
            className="checkout-button"
            onClick={() => {
              navigate(pageRoutes.checkout);
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
