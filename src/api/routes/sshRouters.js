const express = require('express');
const db = require('../db/connect/connectDB').db;

const entity = db.getRepository('Crendentials')

const router = express.Router();

router.get('/:id', async (req,res) => {

});

router.post('/', async (req,res) => {
    
    const saved = await entity.save(entity.create(req.body));
    return res.status(201).json(saved);
});

module.exports = router;