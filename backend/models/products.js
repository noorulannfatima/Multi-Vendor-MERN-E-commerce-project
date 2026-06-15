const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {
        type: [String],
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    description:{
        type:String,
        required: true,
        maxlength: 200,
        minlength: 50,
        trim: true,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum:['Vegetables', 'Fruits', 'Drinks', 'Dairy', 'Bakery', 'Grains', 'Instant']},
    price:{
        type: Number,
        required: true,
    },
    offerPrice: {
        type: Number,
        required : true
    },
    // The vendor (User with role 'admin') who owns this product. Optional so
    // existing products and the current addProduct flow keep working.
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)