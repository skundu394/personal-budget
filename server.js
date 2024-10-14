const express = require('express');
const mongoose = require('mongoose');
const Budget = require('./models/budget');
const CakeVariety = require('./models/cake_variety');  // Ensure this path is correct
const app = express();
const port = 3000;

app.use(express.json());  // Enable JSON parsing for request bodies
app.use(express.static('public'));  // Serve static files from 'public' directory

// MongoDB URL and client initialization
const url = 'mongodb://localhost:27017/mongodb_demo';

// Connect to MongoDB using Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((connectionError) => {
        console.log(connectionError);
    });

// POST route to add a new budget entry
app.post('/budget/add', async (req, res) => {
    const { title, budget, color } = req.body;

    if (!title || !budget|| !color) {
        return res.status(400).json({ error: 'Please provide all required fields: title, budget, and color' });
    }

    try {
        const newBudget = new Budget({ title, budget, color });
        await newBudget.save();
        res.status(201).json({ message: 'Budget entry added successfully', newBudget });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add budget entry' });
    }
});

// Route to get all budget entries
app.get('/budget', async (req, res) => {
    try {
        const budgetEntries = await Budget.find(); // Fetch all budget entries
        res.json(budgetEntries); // Send the data as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to load budget data' });
    }
});

// POST route to add a new cake variety
app.post('/cake-varieties/add', async (req, res) => {
    const { flavor, cost, color } = req.body;

    if (!flavor || !cost || !color) {
        return res.status(400).json({ error: 'Please provide all required fields: flavor, cost, and color' });
    }

    try {
        const newCakeVariety = new CakeVariety({ flavor, cost, color });
        await newCakeVariety.save();
        res.status(201).json({ message: 'Cake variety added successfully', newCakeVariety });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add cake variety' });
    }
});

// Route to get all cake varieties
app.get('/cake-varieties', async (req, res) => {
    try {
        const cakeVarieties = await CakeVariety.find(); // Fetch all cake varieties
        res.json(cakeVarieties); // Send the data as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to load Cake Varieties data' });
    }
});

// New Route to update a specific cake variety based on flavor
app.put('/cake-varieties/update', async (req, res) => {
    const { flavor, newCost } = req.body;

    if (!flavor || !newCost) {
        return res.status(400).json({ error: 'Please provide a flavor and the new cost' });
    }

    try {
        // Update the cost of the specified flavor
        const updatedCake = await CakeVariety.findOneAndUpdate(
            { flavor: flavor }, // Find cake variety by flavor
            { $set: { cost: newCost } }, // Set the new cost
            { new: true, runValidators: true } // Return the updated document
        );

        if (updatedCake) {
            res.json({ message: 'Cake variety updated successfully', updatedCake });
        } else {
            res.status(404).json({ message: 'Cake variety not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cake variety' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
