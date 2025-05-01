const mongoose = require('mongoose');

const mongoURI = "mongodb://gofood:ruhani2812@cluster0-shard-00-00.ciskq.mongodb.net:27017,cluster0-shard-00-01.ciskq.mongodb.net:27017,cluster0-shard-00-02.ciskq.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-fdeqq1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
        const fetched_data = mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        if (data.length > 0) {
            global.food_items = data;
            
        } else {
        }
        const fetchedCategory = mongoose.connection.db.collection("foodCategory");
        const catData = await fetchedCategory.find({}).toArray();
        if (catData.length > 0) {
            global.foodCategory = catData;
            // console.log("Data fetched from 'foodCategory' collection:", global.foodCategory);
        } else {
            // console.log("No data found in the 'foodCategory' collection.");
        }
        const fetchedReviews = mongoose.connection.db.collection("userreviews");
        const reviewData = await fetchedReviews.find({}).toArray();
        if (reviewData.length > 0) {
            // console.log("Data fetched from 'UserReview' collection:", reviewData);
            global.reviews = reviewData;
        } else {
            // console.log("No data found in the 'UserReview' collection.");
        }

    } catch (error) {
        console.error("Failed to connect to MongoDB or fetch data:", error);
    }
};

module.exports = mongoDB;


