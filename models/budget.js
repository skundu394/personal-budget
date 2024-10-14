const mongoose = require('mongoose');

// Budget Schema Model
const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        match: /^#([A-Fa-f0-9]{6})$/  // Enforces a valid 6-digit hexadecimal color code
    }
}, { collection: 'budgets' });

module.exports = mongoose.model('Budget', budgetSchema);
