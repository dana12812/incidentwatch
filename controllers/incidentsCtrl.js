// controllers/incidentsCtrl.js

// Admin-only. Lists all auto-logged incidents and lets an admin
// review the ones that got flagged.

const Incident = require('../models/incident');
const FlagReview = require('../models/flagReview');

// GET /incidents — list all incidents, flagged ones first
async function index(req, res) {
  try {
    const incidents = await Incident.find({})
      .populate('userId')
      .populate('recordId')
      .sort({ flagged: -1, createdAt: -1 });

    res.render('incidents/index.ejs', { incidents });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
}

// GET /incidents/:id — view one incident, plus its review if one exists
async function show(req, res) {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate('userId')
      .populate('recordId');

    if (!incident) {
      return res.status(404).send('Incident not found.');
    }

    const review = await FlagReview.findOne({ incidentId: incident._id }).populate('reviewedBy');

    res.render('incidents/show.ejs', { incident, review });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
}

// POST /incidents/:id/review — create the first review for this incident
async function createReview(req, res) {
  try {
    await FlagReview.create({
      incidentId: req.params.id,
      reviewedBy: req.session.user._id,
      status: req.body.status,
      notes: req.body.notes,
    });
    res.redirect(`/incidents/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
}

// PUT /incidents/:id/review — update an existing review
async function updateReview(req, res) {
  try {
    await FlagReview.findOneAndUpdate(
      { incidentId: req.params.id },
      {
        status: req.body.status,
        notes: req.body.notes,
        reviewedBy: req.session.user._id,
        reviewedAt: Date.now(),
      }
    );
    res.redirect(`/incidents/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
}

module.exports = {
  index,
  show,
  createReview,
  updateReview,
};