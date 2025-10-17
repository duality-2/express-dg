import 'dotenv/config'
import express from "express";
const app = express();
const port = process.env.PORT || 3004;

app.use(express.json());

let teaData = [];
let nextID = 1;

// create tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextID++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id, 10));
  if (!tea) {
    return res.status(404).send("Tea not Found");
  }
  res.status(200).send(tea);
});

// update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id, 10));
  if (!tea) {
    return res.status(404).send("Tea not Found");
  }
  const { name, price } = req.body;
  if (name !== undefined) tea.name = name;
  if (price !== undefined) tea.price = price;
  res.status(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).send("Tea not Found");
  }
  teaData.splice(index, 1);
  return res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
