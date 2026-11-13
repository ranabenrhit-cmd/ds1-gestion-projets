require('dotenv').config(); //trod les variables de configuration dispo fil process.env bch b3d nst3mlouhom minou
const express = require('express'); // jebna il mini framework express w hatineh fi const samineha express bch t3awena n3mlou serveur w nst9blou les requetes (eq lil import fi NestJS)
const connectDB = require('./config/db'); // import mt3 il connection database
const app = express(); //we use express to do an app
app.use(express.json());//middleware hadher yst3mlou bch yefhem il body send in JSON form 
app.use('/api/auth', require('./users/auth.routes'));
app.use('/api/projects', require('./projects/projects.routes'));

app.get('/', (req, res) => {
  res.json({ message: 'API valide' });
});// just route tajribiya chnthbtou illy server y5dm 
connectDB().then(() => {//nknktiw bil base w b3d nhelou server bch hatta requete mtji 9bal ma mongoDB ykoun hadher
    app.listen(process.env.PORT, () => {
        console.log(`Serveur sur http://localhost:${process.env.PORT}`);
    });// n7elou server 3la port illy fil fichier .env
});




