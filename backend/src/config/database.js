const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/socialapp_2024');
    console.log('DB connected successfully...');
  } catch (err) {
    console.error('DB not connected...', err);
    process.exit(1); // Exit process with failure code
  }
}

module.exports = connectDB;
