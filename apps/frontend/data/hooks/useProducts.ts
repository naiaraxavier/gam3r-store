import ContextProducts from "../contexts/ContextProducts";
import { useContext } from "react";

const useProducts = () => useContext(ContextProducts);
export default useProducts;
