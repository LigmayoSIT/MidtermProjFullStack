require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})

const Pokemon = mongoose.model('Pokemon', new mongoose.Schema({
    name: String,
    region: String,
    town: String,
    badge: String,
    specialty: String,
    aceLevel: Number,
    motto: String
}))

app.post('/api/pokemon', async (req, res) => {
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    res.status(201).send(pokemon);
})

app.get('/api/pokemon/ :id', async (req, res) => {
    const list = await Pokemon.find();
    res.send(list);
})

app.post('/api/pokemon/ :id', async (req, res) => {
    const { id } = req.params;
    const updatePokemon = await Pokemon.findByIdAndUpdate(id, req.body, { new: true});
    res.send(updatePokemon);
}) 

app.delete('/api/pokemon/:id', async (req, res) => {
    const { id } = req.params;
    await Pokemon.findByIdAndDelete(id);
    res.status(204).send();
})

app.put('/api/pokemon/:id', async (req, res) => {
    const updatePokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(updatePokemon);
})