const { MongoClient } = require('mongodb');

// MongoDB URL
const url = 'mongodb://localhost:27017';
const dbName = 'mongodb_demo';

// Budget data to insert
const budgetData = [
    { title: "Pharmacy", budget: 120 },
    { title: "Insurance", budget: 220 },
    { title: "Groceries", budget: 300 },
    { title: "Rent", budget: 1200 },
    { title: "Travel Expenses", budget: 200 },
    { title: "Internet", budget: 150 },
    { title: "Investments", budget: 1000 }
];

// Function to insert the budget data
async function insertBudgetData() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        
        const db = client.db(dbName);
        const collection = db.collection('budgets'); // Name of the collection
        
        // Insert the data
        const insertResult = await collection.insertMany(budgetData);
        console.log("Data inserted successfully:", insertResult.insertedCount);
    } catch (error) {
        console.error("An error occurred while inserting data:", error);
    } finally {
        // Close the connection
        await client.close();
        console.log("MongoDB connection closed");
    }
}

// Call the function to insert the data
insertBudgetData();
