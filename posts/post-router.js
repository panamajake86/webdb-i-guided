const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
    const posts = await db('posts');
    console.log(posts);
    res.json(posts);
    } catch (err) {
         res.status(500).json({message: 'Failed to get posts'});
     }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try{
        //SELECT * FROM posts WHERE id=16;
        const post = await db('posts').where('id', id);
        res.json(post);
    } catch {
        res.status(500).json({message: 'Failed to get post'});
    }
});

router.post('/', async (req, res) => {
    const postData = req.body;
    
    try {
        const post = await db('posts').insert(postData);
        res.status(201).json(post);
    } catch {
        res.status(500).json({message: 'Failed to send post'});
    };
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    
    try {
        const rowsUpdated = await db('posts').where('id', id).update(req.body);
        res.status(200).json({updated: rowsUpdated});
    } catch {
        res.status(500).json({message: 'Failed to change post'});
    };
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const rowsDeleted = await db('posts').where('id', id).del();
        res.status(200).json(rowsDeleted);
    } catch {
        res.status(500).json({message: 'Failed to delete post'});
    };
});

module.exports = router;