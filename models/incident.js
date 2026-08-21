
// models/incident.js
const mongoose = require('../config/database');
 
// Schema Definition
const incidentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // a reference (ID) pointing to the User who performed the action
      ref: 'User', // tells Mongoose this ID belongs to the User model
      required: true, // every incident must be tied to a user — we always need to know who did it
      index: true, // speeds up queries like "find all incidents caused by this user"
    },
 
    recordId: {
      type: mongoose.Schema.Types.ObjectId, // a reference (ID) pointing to the Record that was accessed
      ref: 'Record', // tells Mongoose this ID belongs to the Record model
      required: true, // every incident must be tied to a record — we always need to know what was touched
      index: true, // speeds up queries like "find all incidents for this record"
    },
 
    action: {
      type: String, // the action performed is stored as text
      required: true, // every incident must record what actually happened
      enum: ['view', 'edit', 'export'], // only these three actions are allowed — blocks typos or unexpected values
    },
 
    flagged: {
      type: Boolean, // true/false — either this incident looks suspicious or it doesn't
      default: false, // most incidents are normal, so false is the safe starting point
    },
 
    reason: {
      type: String, // the explanation is text
      trim: true, // removes accidental spaces — optional, only filled in when there's something to explain
    },
 
    scoreImpact: {
      type: Number, // how much this incident affects a risk/trust score — a number, not text
      min: 0, // a negative score wouldn't make sense, so this sets a safe floor (recommended, not required)
    },
  },
  {
    // Incidents are a permanent log — once created, they're never edited,
    // so we only track WHEN it was created, not "last updated"
    timestamps: { createdAt: true, updatedAt: false },
  }
);
 
// Create Model
const Incident = mongoose.model('Incident', incidentSchema);
 
module.exports = Incident;
 
