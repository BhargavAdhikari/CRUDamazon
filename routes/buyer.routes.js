import express from "express";

const router = express.Router();

let buyerList = [];

// list or read all the buyer data

router.get("/buyer/list", (req, res) => {
  return res.status(200).send(buyerList);
});

// add a buyer

router.post("/buyer/add", (req, res) => {
  //   console.log(req.body);
  let buyerDataToBeAdded = req.body;
  buyerList.push(buyerDataToBeAdded);
  return res
    .status(200)
    .send({ message: "The buyer is added successfully", buyerList });
});

// edit a buyer data

router.put("/buyer/edit/:id", (req, res) => {
  let buyerIdToBeEdited = +req.params.id;
  let buyerDataToBeEdited = req.body;

  let foundBuyerData = buyerList.find((item, index, self) => {
    if (buyerIdToBeEdited === item.id) {
      return item;
    }
  });

  if (!foundBuyerData) {
    return res.status(404).send({
      message: "The buyer data to be edited or updated doesn't exist",
    });
  }

  // }

  let newBuyerList = buyerList.map((item, index, self) => {
    if (buyerIdToBeEdited === item.id) {
      return { ...item, ...buyerDataToBeEdited };
    } else {
      return item;
    }
  });

  buyerList = structuredClone(newBuyerList);

  return res.status(201).send({ message: "The buyer is updated" });
});

// delete a buyer data

router.delete("/buyer/delete/:id", (req, res) => {
  let buyerIdToBeDeleted = +req.params.id;

  let foundToBeDeleteBuyerData = buyerList.find((item, index, self) => {
    return item.id === buyerIdToBeDeleted;
  });

  if (!foundToBeDeleteBuyerData) {
    return res
      .status(200)
      .send({ message: "The id doesn't exist for deletion" });
  }

  let newBuyerList1 = buyerList.filter((item, index, self) => {
    if (buyerIdToBeDeleted !== item.id) {
      return item;
    }
  });

  buyerList = structuredClone(newBuyerList1);
  return res
    .status(201)
    .send({ message: "The selected buyer data is deleted" });
});

export default router;
