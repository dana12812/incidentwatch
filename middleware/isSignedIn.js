
// middleware/isSignedIn.js
//
// Checks whether someone is logged in before letting them continue.
// If there's no user in the session, they get sent to the sign-in page instead.
 
function isSignedIn(req, res, next) {
  if (req.session.user) {
    // A user is logged in — let the request continue to the controller
    return next();
  }
 
  // No user in the session — send them to sign in instead
  res.redirect('/sign-in');
}
 
module.exports = isSignedIn;
 
