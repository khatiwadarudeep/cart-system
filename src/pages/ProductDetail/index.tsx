import { useParams } from "react-router-dom";
import "./productdetail.css";
import { useGetProductById } from "../../services/products";
import { useEffect, useState } from "react";
import { getDiscountedPrice } from "../../helpers/getDiscountedPrice";
import { useAddToCart } from "../../services/cart";
import { user } from "../../helpers/getUserDetail";
import { useAppDispatch } from "../../hooks/redux";
import { addToCart } from "../../features/cart.slice";

export interface ProductInfo {
  discountPercentage: number;
  discountedPrice: number;
  id: number;
  price: number;
  quantity: number;
  title: string;
  total: number;
}

const ProductDetail = () => {
  const { id } = useParams<string>();
  const { data: detail } = useGetProductById(id ?? "");
  const { mutateAsync: addToCartAsync } = useAddToCart();
  const [thumbnailImage, setThumbnailImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleAddCart = () => {
    const body = {
      userId: user.id,
      products: [
        {
          id: Number(id),
          quantity: quantity,
        },
      ],
    };

    addToCartAsync(body).then(() => {
      if (detail) {
        const newList = [
          {
            id: detail.data.id,
            title: detail.data.title,
            price: detail.data.price,
            quantity: quantity,
            total: detail.data.price * quantity,
            thumbnail: detail.data.thumbnail,
            discountPercentage: detail.data.discountPercentage,
            discountedPrice: getDiscountedPrice(
              detail.data.price,
              detail.data.discountPercentage
            ),
          },
        ];
        dispatch(addToCart(newList));
        setShowToast(true);
      }
    });
  };
  useEffect(() => {
    setThumbnailImage(detail?.data?.thumbnail ?? "");
  }, [detail]);

  useEffect(() => {
    setTimeout(() => {
      if (showToast) {
        setShowToast(false);
      }
    }, 3000);
  }, [showToast]);

  return (
    <>
      <div className="detail-container">
        <div className="detail-image">
          <img src={thumbnailImage} />
        </div>
        <div className="title">
          <h3>{detail?.data.title}</h3>
          <div className="description">
            <p>{detail?.data?.description}</p>
          </div>
          <div className="product-images">
            {detail?.data?.images?.map((image) => {
              return (
                <div className="product-image" key={image}>
                  <img src={image} onClick={() => setThumbnailImage(image)} />
                </div>
              );
            })}
          </div>
          <div className="price-section">
            <div className="original-price">
              <p>Price:</p>
              <span>${detail?.data?.price}</span>
            </div>
            <div>
              <h2>
                $
                {getDiscountedPrice(
                  detail?.data?.price ?? 0,
                  detail?.data?.discountPercentage ?? 0
                )}
              </h2>
            </div>
          </div>
          <div className="rating">
            <span className="rating-text">Rating:</span>
            <span> {detail?.data?.rating}</span>
          </div>
          <div className="category">
            <span className="category-text">Category:</span>
            <span> {detail?.data?.category}</span>
          </div>
          <div className="brand">
            <span className="brand-text">Brand:</span>
            <span> {detail?.data?.brand}</span>
          </div>
          <div className="quantity">
            <div className="quantity-text">Select Quantity:</div>
            <div className="select-quantity">
              <button onClick={() => setQuantity((prev) => prev - 1)}>-</button>

              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(+e.target.value);
                }}
              />
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
          </div>
          <div className="cart-button">
            <button
              className={quantity < 1 ? "disabled" : ""}
              disabled={quantity < 1}
              onClick={handleAddCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className={`${showToast ? "toast" : "toast-hide"}`}>
        {quantity} {detail?.data.title} is added to your cart.
      </div>
    </>
  );
};
export default ProductDetail;
