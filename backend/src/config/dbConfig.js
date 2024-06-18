const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:55247/aplus';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit process with failure
});

mongoose.connection.on("connected", () => {
  console.log("Connected To MongoDb");
});

mongoose.connection.on("error", (err) => {
  console.log(`Error: ${err} `);
});

module.exports = mongoose;
