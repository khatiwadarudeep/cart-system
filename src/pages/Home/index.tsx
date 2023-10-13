import ProductCard from "../../components/ProductCard";
import { useGetAllProducts } from "../../services/products";
import "./home.css";

const Home = () => {
  const { data: products } = useGetAllProducts();
  return (
    <>
      <div className="home">
        {products?.data?.products?.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
