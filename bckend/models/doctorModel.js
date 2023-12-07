const mongoose = require('mongoose');

// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageURL: { type: String },
    specialization: {
        type: String,
        enum: ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Psychiatrist'],
        required: true
    },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    date: { type: Date, default: Date.now },
    slots: { type: Number, required: true },
    fee: { type: Number, required: true }
});

// Create the Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;