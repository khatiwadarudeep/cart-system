import { useMutation, useQuery } from "react-query"
import { api } from "./api"
import { httpClient } from "./axios.config"
import { ICart } from "../types/cart.types"
import { user } from "../helpers/getUserDetail"

const getCart = () => {
    return httpClient.get(api.getCart.replace("{id}", String(user.id)))
}
const useGetCart = () => {
    return useQuery({
        queryKey: "cart",
        queryFn: () => getCart()
    })
}

const addToCart = (body: ICart) => {
    return httpClient.post(api.addToCart, body)
}

const useAddToCart = () => {
    return useMutation({
        mutationKey: "add-cart",
        mutationFn: addToCart
    })
}

export {useAddToCart,useGetCart}