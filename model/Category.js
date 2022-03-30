const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required :true
    },
    categoryId: {
        type: Number,
        unique: true,
        rquired: true
    }
})