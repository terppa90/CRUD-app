const mongoose = require('mongoose');
require('dotenv').config(); //dotenv -moduuli tarvitaan jos aiotaan käyttää .env -filua

mongoose.set('useUnifiedTopology', true); // määritys jota käytetään tietokantapalvelimen etsinnässä
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

// yhteydenotto MongoDB Atlas -kantaan:

const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_CONNECTION_STRING, (req, res) => {
      console.log('Connected to the mongoDB database');
    })
    .then(() => console.log('connected to DB.'))
    .catch((err) => console.log(err));
};
module.exports = connectDB;
