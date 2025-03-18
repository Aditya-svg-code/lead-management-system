const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Lead = require('../models/Lead');

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateLeadScore = async (leadInfo) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
        You are a lead scoring AI. Score the lead based on the following details:
        - Name: ${leadInfo.name}
        - Email: ${leadInfo.email}
        - Phone: ${leadInfo.phone}
        - Company: ${leadInfo.company || 'Not Provided'}
        - Industry: ${leadInfo.industry || 'Not Provided'}
        - Budget: ${leadInfo.budget || 'Not Provided'}
        - Timeline: ${leadInfo.timeline || 'Not Provided'}
        - Requirements: ${leadInfo.requirements || 'Not Provided'}
        
        Score the lead from 1 to 100 based on the completeness and relevance of the information.
        Provide a numeric score only.
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

// Create Lead API
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, company, industry, budget, timeline, requirements } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, Email, and Phone are required' });
        }

        const leadData = {
            name,
            email,
            phone,
            company,
            industry,
            budget,
            timeline,
            requirements,
        };

        const score = await generateLeadScore(leadData);

        const newLead = new Lead({ ...leadData, score });
        await newLead.save();

        res.status(201).json(newLead);
    } catch (error) {
        console.error('Error creating lead:', error.message);
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
