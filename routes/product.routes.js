import express from "express";

const router = express.Router();

let productList = [
];

// retrieve a product

router.get("/product/list",(req, res)=>{
    return res.status(200).send(productList);
})

// create a product

router.post("/product/add",(req, res)=>{
    const newProduct = req.body;
    productList.push(newProduct);

    return res.status(200).send({message:"The product is added successfully"})
})

// delete product 

router.delete("/product/delete/:id",(req, res)=>{

   let productIdToBeDeleted = +req.params.id;

   let productToBeDeleted = productList.find((item)=>{

    if(productIdToBeDeleted=== item.id){
        return item;
    }
   });

   if(!productToBeDeleted){

    return res.status(404).send({message:"The product doesn't exist"});

   }

   let newProductList = productList.filter((item)=>{
    return productIdToBeDeleted !== item.id ;
   });

   productList = structuredClone(newProductList);

   return res.status(200).send({message:"The product is deleted Successfully"});

});


// update product 

router.put("/product/edit/:id", (req, res)=>{


    let productIdToBeEdited = +req.params.id;

    let productToBeEdited = req.body;

    let foundProductToBeEdited = productList.find((item)=>{

        if(item.id === productIdToBeEdited){
            return item; 
        }
    });

    if(!foundProductToBeEdited){
        return res.status(404).send({message:"Product doesn't exist for editing"});
    }

    const newProductList = productList.map((item)=>{
        if(productIdToBeEdited === item.id){
            return {...item, ...productToBeEdited};
        } else{
            return item ;
        }
    });

    productList = structuredClone(newProductList);



    return res.status(200).send({message:"The Product is edited successfully"})


});

export default router;