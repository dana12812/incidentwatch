
// middleware/addUserToViews.js
//
// Runs on EVERY request, before any route. It copies the logged-in
// user (if any) onto res.locals, so every EJS view can reference
// `user` directly without each controller having to pass it manually.
 
function addUserToViews(req, res, next) {
  res.locals.user = req.session.user || null;
  next();
}
 
module.exports = addUserToViews;
 
