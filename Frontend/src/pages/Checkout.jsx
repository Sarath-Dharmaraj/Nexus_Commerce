import { useLoaderData } from "react-router-dom";

function Checkout() {
  const { address } = useLoaderData();
  console.log(address);
  return <div>Checkout</div>;
}

export default Checkout;
