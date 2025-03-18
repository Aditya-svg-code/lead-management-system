const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    industry: { type: String, trim: true },
    budget: { type: String, trim: true },
    interestLevel: { type: String, trim: true },
    location: { type: String, trim: true },
    timeline: { type: String, trim: true },
    requirements: { type: String, trim: true },
    score: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
