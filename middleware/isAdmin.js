// middleware/isAdmin.js
//
// Checks whether the logged-in user has the "admin" role.
// Always run this AFTER isSignedIn, since it assumes req.session.user already exists.

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    // This user is an admin — let the request continue
    return next();
  }

  // Not an admin — block the request entirely
  res.status(403).send('Access denied: admins only.');
}

module.exports = isAdmin;