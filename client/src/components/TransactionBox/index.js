import React, { useEffect, useState } from "react";
import "./transaction.css";

import dataProvider from "src/dataProvider";
import {
  useErrorNotification,
  useMessage,
} from "src/context/MessageBoxContext";
import { useUpdate } from "src/context/UpdateContext";
const TransactionBox = ({ acc, toAcc }) => {
  const errorNotification = useErrorNotification();
  const [data, setData] = useState({});
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [update, setUpdate] = useUpdate(0);

  const [message, setMessage] = useMessage();
  const submitTransaction = () => {
    if (amount === "" || description === "") {
      setMessage("Amount & Description are needed to make a transaction");
    }
    else if (isNaN(amount)){
      console.log("typeof amount",isNaN(amount))
      setMessage("Amount has to be a number");
    } else {
      dataProvider
        .createData("transactions", {
          amount,
          description,
          fromAcc: acc,
          toAcc,
        })
        .then(() => {
          setUpdate(update+1);
        })
        .catch(errorNotification);
    }
  };

  useEffect(() => {
    dataProvider
      .getData(`transactions/${acc}`)
      .then((response) => {
        if (response !== undefined) {
          setData(response ? response.data : {});
        }
      })
      .catch(errorNotification);
  }, [update]);
  return (
    <div className="transaction">
      <div className="transaction-card">
        <div className="top-part">
          <h3> {data.name}</h3>
          <p>${data.balance}</p>
        </div>

        <p> Acc: {data.acc}</p>
        <div className="d-flex ">
          <input
            placeholder="+$100.00"
            className="transaction-amount"
            type="number"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              setAmount((e) => value);
            }}
          />
          <input
            placeholder="Another Transaction description"
            className="transaction-description"
            type="text"
            value={description}
            onChange={(e) => {
              const value = e.target.value;
              setDescription((e) => value);
            }}
          />
          <input
            type="submit"
            className="transaction-submit"
            value="TRANSFER"
            onClick={submitTransaction}
          />
        </div>
      </div>
      <h2>Transaction</h2>
      <div className="transaction-history d-flex">
        <table cellspacing="0">
          {data.transaction &&
            data.transaction.map((obj) => (
              <tr>
                <td>{obj.createdAt}</td>
                <td>{obj.description}</td>
                <td>
                  {obj.sign}${obj.amount}
                </td>
              </tr>
            ))}
        </table>
      </div>

    </div>
  );
};

export default TransactionBox;
