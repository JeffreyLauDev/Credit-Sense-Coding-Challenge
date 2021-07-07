const listWithQuery = require('../utils/dataQuery').listWithQuery


let data = [
  { id: 0, name: "Jeffrey" },
  { id: 1, name: "Tsz" },
  { id: 3, name: "Hei" },
  { id: 4, name: "Ac" },
  { id: 5, name: "AB" },
  { id: 6, name: "AC" },
  { id: 7, name: "AD" },
  { id: 8, name: "AE" },
  { id: 9, name: "AF" },
  { id: 10, name: "G" },
  { id: 11, name: "H" },
  { id: 12, name: "I" },
  { id: 13, name: "J" },
  { id: 14, name: "K" },
  { id: 15, name: "L" },
  { id: 16, name: "M" }
];


module.exports = app => {


  app.route('/api/templates')
    .get((req, res) => {

      //DATA QUERY BY _end, _order, _sort, _start, _search, _searchParam
      const processingData = listWithQuery(data, req.query);

      return res.status(200).send({ data: processingData });
    })
    .post((req, res) => {
      data.push({ ...req.body, id: data.length });
      return res.status(201).send({ message: "resource created successfully" });
    })

  app.route('/api/templates/:id')
    .get((req, res) => {

      const selectedData = data.find(obj => obj.id == req.params.id);

      if (!selectedData) {

        //IF CAN'T FIND SELECTED DATA 
        return res.status(400).send({ message: "resource not exists" });
      }

      return res.status(200).send({ data: selectedData });
    })
    .put((req, res) => {

      const foundIndex = data.findIndex(obj => obj.id == req.params.id);

      if (foundIndex === -1) {

        //IF CAN'T FIND SELECTED DATA 
        return res.status(400).send({ message: "resource not exists" });
      }

      data[foundIndex] = { ...data[foundIndex], ...req.body, id: req.params.id };
      return res.status(200).send({ data: data[foundIndex] });
    })
    .delete((req, res) => {

      data = data.filter(obj => obj.id != req.params.id);
      return res.status(200).send({ message: "resource Removed successfully" });
    })

};
