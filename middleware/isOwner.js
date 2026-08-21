// middleware/isOwner.js
//
// Checks whether the logged-in user is the ORIGINAL OWNER of the record
// they're trying to edit or delete. Always run this AFTER isSignedIn.

const Record = require('../models/record');

async function isOwner(req, res, next) {
  // Look up the record being requested, using the :id from the URL
  const record = await Record.findById(req.params.id);

  if (!record) {
    return res.status(404).send('Record not found.');
  }

  // Compare the record's owner to the currently logged-in user
  if (!record.ownerId.equals(req.session.user._id)) {
    return res.status(403).send('You do not have permission to do that.');
  }

  // Attach the record to req so the controller doesn't have to look it up again
  req.record = record;
  next();
}

module.exports = isOwner;