
// models/user.js
const mongoose = require('../config/database');
const bcrypt = require('bcrypt');
 
// Schema Definition
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: true, // every user must have a name — can't be left blank
      trim: true, // removes accidental leading/trailing spaces (e.g. " Sarah " -> "Sarah")
    },
 
    email: {
      type: String, 
      required: true, // every user must sign up with an email
      unique: true, // no two accounts can share the same email — MongoDB enforces this
      lowercase: true, // stores "Sarah@Mail.com" as "sarah@mail.com" so duplicates aren't missed by case
      trim: true, // removes accidental spaces around the email
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'], // rejects text that isn't shaped like an email (must have @ and a domain)
    },
 
    passwordHash: {
      type: String, // the SCRAMBLED (hashed) password is stored as text, never the real password
      required: true, // every user must have a password to log in
    },
 
    role: {
      type: String, // role is stored as text
      enum: ['user', 'admin'], // only these two exact values are allowed — blocks typos or invalid roles
      default: 'user', // new accounts are regular users unless changed by an admin
      required: true, // every user must have a role, even if it's just the default
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields, so we don't write them by hand
  }
);
 
// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) {
    return; // skip re-hashing if the password wasn't changed
  }
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10); // scramble the plain password before it touches the database
});
 
// Compare password during login
userSchema.methods.comparePassword = function (typedPassword) {
  return bcrypt.compare(typedPassword, this.passwordHash); // checks a typed password against the stored hash, without ever un-scrambling it
};
 
// Never send password hash to the client
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.passwordHash; // strips the hash out any time a User is sent to a view or API response
    return ret;
  },
});
 
// Create Model
const User = mongoose.model('User', userSchema);
 
module.exports = User;
 
