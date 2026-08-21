// controllers/usersCtrl.js

// Admin-only user management: view all users, view one, change a role, delete.

const User = require('../models/user');

// GET /users — list all users
async function index(req, res) {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
}

// GET /users/:id — view a single user's profile
async function show(req, res) {
  try {
    const profileUser = await User.findById(req.params.id);
    if (!profileUser) {
      return res.status(404).send('User not found.');
    }
    res.render('users/show.ejs', { profileUser });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
}

// PUT /users/:id — change a user's role
async function update(req, res) {
  try {
    await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
    res.redirect(`/users/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
}

// DELETE /users/:id — remove a user
async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
}

module.exports = {
  index,
  show,
  update,
  delete: deleteUser,
};