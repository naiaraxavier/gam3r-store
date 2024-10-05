import ContextCart from "../contexts/ContextCart";
import { useContext } from "react";

const useCart = () => useContext(ContextCart);
export default useCart;
