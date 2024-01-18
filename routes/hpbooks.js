const express = require("express");
const router = express.Router();
const Joi = require("joi");

const HPbooks = [
  { id: 1, name: "The Sorcerer's Stone" },
  { id: 2, name: "The Chamber of Secrets" },
  { id: 3, name: "The Prisoner of Azkaban™" },
  { id: 4, name: "The Goblet of Fire" },
  { id: 5, name: "The Order of Phoenix" },
  { id: 6, name: "The Half-Blood Prince" },
  { id: 7, name: "The Deathly Hallows™ - Part 1" },
  { id: 8, name: "The Deathly Hallows™ - Part 2" },
];

router.get("/", (req, res) => {
  res.send(HPbooks);
});

router.get("/:id", (req, res) => {
  const book = HPbooks.find((c) => c.id === parseFloat(req.params.id));
  if (!book) {
    return res
      .status(404)
      .send("Please enter a valid Harry Potter book number");
  }
  res.status(200).send(book);
});

router.post("/", (req, res) => {
  const result = bookValidation(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const book = {
    id: HPbooks.length + 1,
    name: req.body.name,
  };
  HPbooks.push(book);
  res.status(201).send(book);
});

router.put("/:id", (req, res) => {
  const book = HPbooks.find((c) => c.id === parseFloat(req.params.id));
  if (!book) {
    return res.status(404).send("Bad Request");
  }
  const result = bookValidation(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  book.name = req.body.name;
  res.status(200).send(book);
});

router.delete("/:id", (req, res) => {
  const book = HPbooks.find((c) => c.id === parseFloat(req.params.id));
  if (!book) {
    return res.status(404).send("Bad Request");
  }
  const index = HPbooks.indexOf(book);
  HPbooks.slice(index, 1);
  res.status(200).send("The new book is deleted");
});

function bookValidation(book) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(book);
}
 
module.exports = router;
