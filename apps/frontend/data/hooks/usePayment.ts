import ContextPayment from "../contexts/ContextPayment";
import { useContext } from "react";

const usePayment = () => useContext(ContextPayment);
export default usePayment;
