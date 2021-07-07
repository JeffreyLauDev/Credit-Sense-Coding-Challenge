const listWithQuery = require('../utils/dataQuery').listWithQuery


let data = [
  { name: "Admin", acc:0414036441 },
  {  name: "John Smith", acc:123456 },
  {  name: "Jack Doe", acc:874625 }
];


module.exports = app => {


  app.route('/api/users')
    .get((req, res) => {

      //DATA QUERY BY _end, _order, _sort, _start, _search, _searchParam
      const processingData = listWithQuery(data, req.query);

      return res.status(200).send({ data: processingData });
    })
    .post((req, res) => {
      data.push({ ...req.body, acc: data.length });
      return res.status(201).send({ message: "resource created successfully" });
    })

  app.route('/api/users/:acc')
    .get((req, res) => {

      const selectedData = data.find(obj => obj.acc == req.params.acc);

      if (!selectedData) {

        //IF CAN'T FIND SELECTED DATA 
        return res.status(400).send({ message: "resource not exists" });
      }

      return res.status(200).send({ data: selectedData });
    })
    .put((req, res) => {

      const foundIndex = data.findIndex(obj => obj.acc == req.params.acc);

      if (foundIndex === -1) {

        //IF CAN'T FIND SELECTED DATA 
        return res.status(400).send({ message: "resource not exists" });
      }

      data[foundIndex] = { ...data[foundIndex], ...req.body, acc: req.params.acc };
      return res.status(200).send({ data: data[foundIndex] });
    })
    .delete((req, res) => {

      data = data.filter(obj => obj.acc != req.params.acc);
      return res.status(200).send({ message: "resource Removed successfully" });
    })

};
