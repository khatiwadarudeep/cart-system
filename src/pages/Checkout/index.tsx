import { useNavigate } from "react-router-dom";
import "./checkout.css";
import { pageRoutes } from "../../routes/constants.routes";

const Checkout = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="checkout">
        <h1>Now Proceed further using some real App.</h1>
        <div className="back-button">
          <button onClick={() => navigate(pageRoutes.home)}>Go Back</button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
