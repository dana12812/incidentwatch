
// models/flagReview.js
const mongoose = require('../config/database');
 
// Schema Definition
const flagReviewSchema = new mongoose.Schema(
  {
    incidentId: {
      type: mongoose.Schema.Types.ObjectId, // a reference (ID) pointing to the Incident being reviewed
      ref: 'Incident', // tells Mongoose this ID belongs to the Incident model
      required: true, // every review must be attached to a specific incident
      unique: true, // an incident can only ever be reviewed once — this blocks a second review from being created
      index: true, // speeds up queries like "find the review for this incident"
    },
 
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId, // a reference (ID) pointing to the admin who wrote the review
      ref: 'User', // tells Mongoose this ID belongs to the User model
      required: true, // every review must show who made the decision
      index: true, // speeds up queries like "find all reviews written by this admin"
    },
 
    status: {
      type: String, // the review outcome is stored as text
      required: true, // every review must have a status — it can't be left blank
      enum: ['pending', 'cleared', 'escalated'], // only these three outcomes are allowed — blocks typos or invalid statuses
      default: 'pending', // a new review starts as pending until an admin actually decides
    },
 
    notes: {
      type: String, // the admin's written explanation is text
      trim: true, // removes accidental spaces — optional, not every review needs written notes
    },
 
    reviewedAt: {
      type: Date, // stores the exact date/time the review was made
      default: Date.now, // automatically fills in "right now" unless a specific time is given
    },
  },
  {
    // Like Incident, a review is only ever created — never edited afterward,
    // so we only track WHEN it was created, not "last updated"
    timestamps: { createdAt: true, updatedAt: false },
  }
);
 
// Create Model
const FlagReview = mongoose.model('FlagReview', flagReviewSchema);
 
module.exports = FlagReview;
 
