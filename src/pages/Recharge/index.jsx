import axios from "axios";
import { Button, Select, TextInput } from "flowbite-react";
import { useState } from "react";

const submitLink = 'http://localhost:8080/recharge/create_payment_url'

const Recharge = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const balance = 0;
  const onAmountChange = (event) => {
    const target = event.target;
    const value = target.value;
    setAmount(value);
  };

  const handleSubmit = async () => {
    try {
        setLoading(true);
        const res = await axios.post(submitLink, {amount});
        window.location.replace(res.data.paymentURL);
    } catch (error) {
        console.log(error.response);
    }
}

  return (
    <div className="w-3/5 flex flex-col space-y-5">
      <h1 className="font-semibold text-4xl text-cyan-500">Nạp tiền</h1>
      <hr />
      <div className="text-xl">Số dư ví</div>
      <TextInput
        id="accountBalance"
        type="text"
        value={balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        readOnly
        className="font-semibold"
      />
      <div className="text-xl">Phương thức nạp</div>
      <Select>
        <option value={"vn-pay"}>VNPAY</option>
      </Select>
      <div className="text-xl">Số tiền cần nạp</div>
      <TextInput
        id="amount"
        type="number"
        value={amount}
        onChange={onAmountChange}
        className="font-medium"
      />
      <Button onClick={handleSubmit} isProcessing={loading} disabled={loading} className="w-1/2 self-center">Nạp tiền</Button>
    </div>
  );
};

export default Recharge;
