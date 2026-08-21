
// controllers/authCtrl.js
//
// Handles sign-up, sign-in, and sign-out.
// "create" is shared by both sign-up and sign-in forms, since they're
// both just different ways of ending up with a logged-in session.
 
const User = require('../models/user');
 
// GET /sign-up — show the sign-up form
function newUser(req, res) {
  res.render('auth/sign-up.ejs');
}
 
// GET /sign-in — show the sign-in form
function newSession(req, res) {
  res.render('auth/sign-in.ejs');
}
 
// POST /sign-up  AND  POST /sign-in
// The form itself tells us which one this is, based on which fields it sends.
async function create(req, res) {
  try {
    // A sign-up form sends a "name" field; sign-in only sends email + password.
    const isSignUp = Boolean(req.body.name);
 
    if (isSignUp) {
      // ----- SIGN UP -----
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send('An account with that email already exists.');
      }
 
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.password, // gets hashed automatically by the pre('save') hook
      });
 
      req.session.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      return res.redirect('/records');
    }
 
    // ----- SIGN IN -----
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('Invalid email or password.');
    }
 
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password.');
    }
 
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.redirect('/records');
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
}
 
// DELETE /sign-out — end the session
function deleteSession(req, res) {
  req.session.destroy(() => {
    res.redirect('/sign-in');
  });
}
 
module.exports = {
  newUser,
  newSession,
  create,
  delete: deleteSession,
};
 
