
// models/record.js
const mongoose = require('../config/database');
 
// Schema Definition
const recordSchema = new mongoose.Schema(
  {
    title: {
      type: String, 
      required: true, // every record needs a name so it can be identified in a list
      trim: true, // removes accidental leading/trailing spaces
    },
 
    description: {
      type: String, 
      trim: true,
    },
 
    department: {
      type: String, 
      trim: true,
    },
 
    sensitivityLevel: {
      type: String, // 
      required: true, // every record must be classified — nothing should be left unrated
      enum: ['low', 'medium', 'high'], // only these three values are allowed — blocks typos or made-up levels
    },
 
    ownerId: {
      type: mongoose.Schema.Types.ObjectId, // stores a reference (ID) pointing to a User document, not the user's data itself
      ref: 'User', // tells Mongoose which model this ID points to, so it can be looked up later
      required: true, // every record must belong to someone — no orphaned records
      index: true, // speeds up queries like "find all records owned by this user"
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);
 
// Create Model
const Record = mongoose.model('Record', recordSchema);
 
module.exports = Record;
 
