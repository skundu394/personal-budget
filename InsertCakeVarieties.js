const { MongoClient } = require('mongodb');

// MongoDB URL
const url = 'mongodb://localhost:27017/mongodb_demo';

async function insertCakeVarieties() {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Access the database and collection
        const db = client.db('mongodb_demo');
        const collection = db.collection('cakeVarieties');

        // Cake varieties data to insert
        const cakeVarietiesData = [
            { flavor: 'Vanilla', cost: 120 },
            { flavor: 'Black Forest', cost: 220 },
            { flavor: 'Mango', cost: 340 },
            { flavor: 'Tiramisu', cost: 400 },
            { flavor: 'White Forest', cost: 450 }
        ];

        // Insert the data into the collection
        const insertResult = await collection.insertMany(cakeVarietiesData);
        console.log('Cake varieties inserted successfully:', insertResult.insertedCount);

    } catch (error) {
        console.error('Error inserting cake varieties:', error);
    } finally {
        // Close the MongoDB connection
        await client.close();
        console.log('MongoDB connection closed');
    }
}

// Run the function to insert cake varieties
insertCakeVarieties();
