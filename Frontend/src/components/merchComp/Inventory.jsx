import { useMerchant } from "../../context/merchantContext";

function Inventory() {
  const { state } = useMerchant();

  if (!state.inventory) return null;
  return <div>Inventory</div>;
}

export default Inventory;
