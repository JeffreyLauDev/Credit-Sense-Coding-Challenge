const listWithQuery = require("../utils/dataQuery").listWithQuery;
const exactMath = require("exact-math");
const moment = require("moment");

let users = [
  { name: "Admin", acc: 0414036441 },
  { name: "John Smith", acc: 123456 },
  { name: "Jack Doe", acc: 874625 },
];

let data = [
  {
    id: 0,
    description: "initial Transaction",
    amount: 10521.4,
    fromAcc: 0414036441,
    toAcc: 123456,
    hidden: true,
    createdAt: new Date(2018, 1, 2),
  },
  {
    id: 1,
    description: "initial Transaction",
    amount: 7478.6,
    fromAcc: 0414036441,
    toAcc: 874625,
    hidden: true,
    createdAt: new Date(2018, 1, 2),
  },
  {
    id: 2,
    description: "Manual Transaction A",
    amount: 100,
    fromAcc: 123456,
    toAcc: 874625,
    createdAt: new Date(2018, 1, 2),
  },
  {
    id: 3,
    description: "Manual Transaction B",
    amount: 100,
    fromAcc: 123456,
    toAcc: 874625,
    createdAt: new Date(2018, 1, 2),
  },
  {
    id: 4,
    description: "Manual Transaction C",
    amount: 80.5,
    fromAcc: 123456,
    toAcc: 874625,
    createdAt: new Date(2018, 1, 2),
  },
  {
    id: 5,
    description: "Manual Transaction D",
    amount: 120.45,
    fromAcc: 123456,
    toAcc: 874625,
    createdAt: new Date(2018, 1, 1),
  },
  {
    id: 6,
    description: "Manual Transaction E",
    amount: 120.45,
    fromAcc: 123456,
    toAcc: 874625,
    createdAt: new Date(2018, 1, 1),
  },
];

module.exports = (app) => {
  app.route("/api/transactions").post((req, res) => {
    const [balance, selectedData] = getBalance(req.body.fromAcc);

    if (exactMath.sub(balance, parseFloat(req.body.amount)) < 0) {
      return res.status(400).send({ message: "Not enough money in this account" });
    }
    data.push({
      description: req.body.description,
      amount: parseFloat(req.body.amount),
      fromAcc: parseInt(req.body.fromAcc),
      toAcc: parseInt(req.body.toAcc),
      createdAt: new Date(),
      id: data.length,
    });
    return res.status(201).send({ message: "resource created successfully" });
  });

  app.route("/api/transactions/:acc").get((req, res) => {
    const acc = req.params.acc;

    const [balance, selectedData] = getBalance(acc);

    const user = users.find((user) => user.acc == acc);

    const displayResult = selectedData.reduce((arr, obj) => {
      const sign = acc == obj.fromAcc ? "-" : "+";

      if (!obj.hidden) {
        return [
          ...arr,
          {
            description: obj.description,
            amount: obj.amount.toFixed(2),
            sign,
            createdAt: moment(obj.createdAt).format("L"),
          },
        ];
      }
      return arr;
    }, []);

    return res.status(200).send({
      ...user,
      balance: balance.toFixed(2),
      transaction: displayResult,
    });
  });
};

const getAllTransactionByAcc = (acc) => {
  return data.filter((obj) => (obj) => obj.toAcc == acc || obj.fromAcc == acc);
};
const getBalance = (acc) => {
  const selectedData = getAllTransactionByAcc(acc);
  return [
    selectedData.reduce((sum, obj) => {
      if (obj.toAcc == acc) {
        return exactMath.add(sum, obj.amount);
      } else if (obj.fromAcc == acc) {
        return exactMath.sub(sum, obj.amount);
      } else {
        return sum;
      }
    }, 0),
    selectedData,
  ];
};
