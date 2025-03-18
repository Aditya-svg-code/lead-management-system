const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Lead = require('../models/Lead');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateLeadScore = async (leadInfo) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
        You are a lead scoring AI for a real estate company. Score the lead based on the following details:
        - Name: ${leadInfo.name}
        - Email: ${leadInfo.email}
        - Phone: ${leadInfo.phone}
        - Source: ${leadInfo.source}
        - Company: ${leadInfo.company || 'Not Provided'}
        - Industry: ${leadInfo.industry || 'Not Provided'}
        - Budget: ${leadInfo.budget || 'Not Provided'}
        - Timeline: ${leadInfo.timeline || 'Not Provided'}
        - Requirements: ${leadInfo.requirements || 'Not Provided'}
        - Preferred Property Type: ${leadInfo.propertyType || 'Not Provided'}
        - BHK: ${leadInfo.bhk || 'Not Provided'}
        - Preferred Location: ${leadInfo.location || 'Not Provided'}
        
        Scoring Rules:
        1. WhatsApp > Email > Web Form (Priority in scoring).
        2. Higher budget leads get a higher score.
        3. More information completeness increases the score.
        4. Higher demand locations increase the score.

        Everytime provide a numeric score only from 1 to 100.
        `;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const score = parseInt(result.response.candidates[0].content.parts[0].text.trim(), 10);

        if (isNaN(score)) throw new Error('Invalid score from Gemini');

        return score;
    } catch (error) {
        console.error('Gemini Error:', error.message);
        return null;
    }
};

// Create/Update Lead API
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, source, company, industry, budget, timeline, requirements, propertyType, bhk, location } = req.body;

        if (!name || !email || !phone || !source) {
            return res.status(400).json({ message: 'Name, Email, Phone, and Source are required' });
        }

        const leadData = { name, email, phone, source, company, industry, budget, timeline, requirements, propertyType, bhk, location };

        const score = await generateLeadScore(leadData);

        const existingLead = await Lead.findOne({ email });

        if (existingLead) {
            existingLead.set({ ...leadData, score });
            await existingLead.save();
            return res.status(200).json(existingLead);
        }

        const newLead = new Lead({ ...leadData, score });
        await newLead.save();

        res.status(201).json(newLead);
    } catch (error) {
        console.error('Error creating/updating lead:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Leads API
router.get('/', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ score: -1 });
        res.status(200).json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
