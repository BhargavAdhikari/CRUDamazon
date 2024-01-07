import express from "express";

const router = express.Router();

let sellerList= [

];

// retrieve a seller data
router.get("/seller/list", (req, res)=>{
    return res.status(200).send(sellerList)
})

// create a seller

router.post("/seller/add", (req, res)=>{

    let sellerData = req.body;
    sellerList.push(sellerData);

    return res.status(200).send({message: "The seller is adding", sellerData});
});

// edit a seller

router.put("/seller/edit/:id",(req, res)=>{

const sellerIdToBeEdited = +req.params.id;

const sellerDataToBeEdited = req.body;

 let foundSellerDataToBeEdited = sellerList.find((item)=>{

    if(sellerIdToBeEdited === item.id){
        return item;
    } 
});

if(!foundSellerDataToBeEdited){
    return res.status(404).send({message:"The Seller doesn't exist"});
}

let newSellerList = sellerList.map((item)=>{

    if(sellerIdToBeEdited === item.id){
        return {...item, ...sellerDataToBeEdited};
    }else{
        return item ;
    }

});

    sellerList = structuredClone(newSellerList);

    return res.status(200).send({message:"The data is edited"});

});

// delete seller

router.delete("/seller/delete/:id", (req, res)=>{

    let sellerIdToBeDeleted = +req.params.id;

   let foundSellerIdToBeDeleted = sellerList.find((item)=>{
    if(sellerIdToBeDeleted === item.id){
        return item ;
    }
});

    if(!foundSellerIdToBeDeleted){
        return res.status(404).send({message:"The seller data doesn't exist for deletion"});
    }

    let newSellerList1 = sellerList.filter((item)=>{
        return item.id !== sellerIdToBeDeleted ;
              
    });

   sellerList = structuredClone(newSellerList1);

   return res.status(200).send({message:"The seller data is successfully deleted"});

});

export default router ;