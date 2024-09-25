const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;

app.use('/', express.static('public'));

// Async function to load the budget data from the JSON file
async function loadBudgetData() {
    try {
        // Read the file and parse the JSON content
        const data = await fs.readFile('public/myBudget.json', 'utf8');
        return JSON.parse(data); // Convert the JSON string into an object
    } catch (error) {
        console.error('Error reading budget data:', error);
        throw error; // Rethrow to handle error in route
    }
}

// Route to return budget data from the JSON file
app.get('/budget', async (req, res) => {
    try {
        const budget = await loadBudgetData(); // Load budget data from file
        res.json(budget); // Send the data as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to load budget data' }); // Handle error
    }
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

async function loadCakeVarietiesData() {
    try {
        // Read the file and parse the JSON content
        const data = await fs.readFile('public/cakeVarieties.json', 'utf8');
        return JSON.parse(data); // Convert the JSON string into an object
    } catch (error) {
        console.error('Error reading Cake Varieties data:', error);
        throw error; // Rethrow to handle error in route
    }
}

app.get('/cake-varieties', async (req, res) => {
    try {
        const cakeVarieties = await loadCakeVarietiesData();
        res.json(cakeVarieties); // Send the data as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to load Cake Varieties data' }); // Handle error
    }
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});