const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Nudge Schema
const nudgeSchema = new mongoose.Schema({
    nudgeType: String,
    tag: String,
    title: { type: String, maxlength: 60 },
    image: String,
    scheduledDate: String,
    timing: {
        from: String,
        to: String
    },
    description: String,
    viewIcon: String,
    invitationText: String
});

const Nudge = mongoose.model('Nudge', nudgeSchema);

// CRUD Routes
app.post('/api/nudges', async (req, res) => {
    try {
        const nudge = new Nudge(req.body);
        await nudge.save();
        res.status(201).json({ message: 'Nudge created successfully', nudgeId: nudge._id });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create nudge' });
    }
});

app.get('/api/nudges/:nudgeId', async (req, res) => {
    try {
        const nudge = await Nudge.findById(req.params.nudgeId);
        if (!nudge) return res.status(404).json({ error: 'Nudge not found' });
        res.json(nudge);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/nudges/:nudgeId', async (req, res) => {
    try {
        const nudge = await Nudge.findByIdAndUpdate(req.params.nudgeId, req.body, { new: true });
        if (!nudge) return res.status(404).json({ error: 'Nudge not found' });
        res.json({ message: 'Nudge updated successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update nudge' });
    }
});

app.delete('/api/nudges/:nudgeId', async (req, res) => {
    try {
        const nudge = await Nudge.findByIdAndDelete(req.params.nudgeId);
        if (!nudge) return res.status(404).json({ error: 'Nudge not found' });
        res.json({ message: 'Nudge deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
