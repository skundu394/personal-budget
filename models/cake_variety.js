const mongoose = require('mongoose');

// CakeVarieties Schema Model
const cakeSchema = new mongoose.Schema({
    flavor: {
        type: String,
        required: true,
        unique: true  // Ensure that each flavor is unique
    },
    cost: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        match: /^#([A-Fa-f0-9]{6})$/  // Enforces a valid 6-digit hexadecimal color code
    }
}, { collection: 'cakeVarieties' });

module.exports = mongoose.model('CakeVariety', cakeSchema);
