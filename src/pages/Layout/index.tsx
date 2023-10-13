import { useState } from "react";
import "./layout.css";
import Cart from "../../components/Cart";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../routes/constants.routes";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="main_container">
        <div className="nav_bar_container">
          <div></div>
          <div
            className="nav_bar_brand"
            onClick={() => navigate(pageRoutes.home)}
          >
            E-Commerce
          </div>
          <div className="nav_bar_cart">
            <button
              onClick={() => {
                setIsActive((prev) => !prev);
              }}
            >
              Cart
            </button>
          </div>
        </div>
        <div className="body_content">
          <div
            className="page_container"
            onClick={() => {
              setIsActive(false);
            }}
          >
            {children}
          </div>
          <div className={`cart_container ${isActive ? "active" : ""}`}>
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutWrapper;
