import { useMerchant } from "../../context/merchantContext";

function Orders() {
  const { state } = useMerchant();

  if (!state.orders) return null;
  return <div>Orders</div>;
}

export default Orders;
