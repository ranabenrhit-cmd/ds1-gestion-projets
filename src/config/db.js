const mongoose = require('mongoose');//njibou mongoose houa illy bch y5alina nhkiw m3a il mongoDB
//function bch nrbtou bil database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);//we try to connect m3a il url illy hatinou fil fichier .env
    console.log('MongoDB connecté');//msg ydhhr fil console to know the connection is done 
  } catch (error) {
    console.error('Erreur de connexion MongoDB :', error.message);//n7otou fil console illy sart erreur w error.message description mt3 il erreur 
    process.exit(1);// lehna n9olou lil app t3na o5rj wil (1) m3neha 5rajna khtr 3ana error khtr fmch 3lch nkmlou maghir cnx bil base 
  }
};

module.exports = connectDB;// n3loulha exports bch nstmlouha b3d fi server.js