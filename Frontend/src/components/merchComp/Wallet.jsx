import { useMerchant } from "../../context/merchantContext";

function Wallet() {
  const { state } = useMerchant();

  if (!state.wallet) return null;
  return <div>Wallet</div>;
}

export default Wallet;
