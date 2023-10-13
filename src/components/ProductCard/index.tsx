import { useNavigate } from "react-router-dom";
import { getDiscountedPrice } from "../../helpers/getDiscountedPrice";
import { Product } from "../../types/product.types";
import "./productcard.css";
import { pageRoutes } from "../../routes/constants.routes";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="card"
        onClick={() =>
          navigate(
            pageRoutes.productDetail.replace(":id", product?.id?.toString())
          )
        }
      >
        <div className="card-image">
          <img src={product.thumbnail} alt="product"></img>
        </div>
        <div className="card-bottom-container">
          <div className="discount-box">
            <div className="discount-percentage">
              {product.discountPercentage}% off
            </div>
            <div className="price-box">
              <span className="discounted-price">
                ${getDiscountedPrice(product.price, product.discountPercentage)}
              </span>
              <span className="actual-price">
                Original Price: ${product.price}
              </span>
            </div>
            <div className="product-title">{product.title}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
