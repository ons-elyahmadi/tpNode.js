const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let voitures = [
    { id: 1, name: "clio" },
    { id: 2, name: "megane" },
    { id: 3, name: "range" }
];

// API pour ajouter une voiture au tableau
app.post('/voitures', (req, res) => {
    const nouvelleVoiture = req.body;
    voitures.push(nouvelleVoiture);
    res.json(voitures);
});

// API pour lister toutes les voitures
app.get('/voitures', (req, res) => {
    res.json(voitures);
});

// API pour lister une voiture par son ID
app.get('/voitures/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const voiture = voitures.find(v => v.id === id);
    if (voiture) {
        res.json(voiture);
    } else {
        res.status(404).json({ message: "Voiture non trouvée" });
    }
});

// API pour modifier une voiture par son ID
app.put('/voitures/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = voitures.findIndex(v => v.id === id);
    if (index !== -1) {
        voitures[index] = req.body;
        res.json(voitures[index]);
    } else {
        res.status(404).json({ message: "Voiture non trouvée" });
    }
});

// API pour supprimer une voiture par son ID
app.delete('/voitures/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = voitures.findIndex(v => v.id === id);
    if (index !== -1) {
        voitures.splice(index, 1);
        res.json({ message: "Voiture supprimée avec succès" });
    } else {
        res.status(404).json({ message: "Voiture non trouvée" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
