import { useQuery } from "react-query"
import { api} from "./api"
import { httpClient } from "./axios.config"
import { Product, ProductResponse } from "../types/product.types";
  

const getAllProducts = () => {
    return httpClient.get<ProductResponse>(api.getAllProducts)
}

const useGetAllProducts = () => {
    return useQuery({
        queryKey:"products",
        queryFn: getAllProducts,
    })
}

const getProduct = (id: string) => {
    return httpClient.get<Product>(api.getProduct.replace("{id}",id))
}

const useGetProductById = (id: string) => {
    return useQuery({
        queryKey: ["product",id],
        queryFn: () => getProduct(id)
    })
}

export {useGetAllProducts,useGetProductById}