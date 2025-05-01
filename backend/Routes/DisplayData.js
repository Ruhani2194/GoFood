const express=require('express')
const FoodItem = require('../models/FoodItem');
const router=express.Router()
router.post('/foodData',(req,res)=>{
    try {
        res.send([global.food_items,global.foodCategory])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
        
    }
})
// router.get('/getFoodItems', async (req, res) => {
//     try {
//         const foodItems = await FoodItem.find(); // Retrieve all food items
//         res.status(200).json(foodItems);
//     } catch (error) {
//         console.error("Error fetching food items:", error);
//         res.status(500).json({ message: 'Error fetching food items' });
//     }
// });
module.exports=router;