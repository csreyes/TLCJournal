var Goals = require('../models/goals');
var mongoose = require('mongoose');

module.exports = {
	getGoals: function(req, res) {
		var date = req.query.date || req.body.date;
		var response = {};

		Goals.find({}, function(err, allGoals) {
		  if (err) {
		    console.log('error getting goals');
		    return;
		  }

		  var relevantGoals = allGoals.filter(function(singleGoal) {
		    var startTime = new Date(singleGoal.startDate).getTime();
		    var setCompletionTime = new Date(singleGoal.setCompletionDate).getTime();
		    var currentTime = new Date(date).getTime();

		    return currentTime >= startTime && currentTime <= setCompletionTime;

		  });

		  var goals = {
		    daily: [],
		    longTerm: []
		  };

		  relevantGoals.forEach(function(goal) {
		    if (goal.startDate === goal.setCompletionDate) {
		      goals.daily.push(goal);
		    } else {
		      goals.longTerm.push(goal);
		    }
		  });
		  console.log('sending this back', goals);

		  res.send(goals);
		});
	},

	addAndUpdateGoals: function(req, res, next) {
		var entryId = req.body.entryId || null;
		var description = req.body.description;
		var motivation = req.body.motivation;
		var startDate = req.body.startDate;
		var progress = req.body.progress;
		var setCompletionDate= req.body.setCompletionDate;
		var completed = req.body.completed || null;
		var completionDate = req.body.completionDate || null;

		var query = {entryId: entryId};

		if (req.body.delete) {
		  Goals.find(query).remove().exec();
		  next();
		  return;
		}

		var update = {
		  description: description,
		  motivation: motivation,
		  startDate: startDate,
		  progress: progress,
		  setCompletionDate: setCompletionDate,
		  completed: completed,
		  completionDate: completionDate
		};

		var mongooseCB = function(err, entry) {
		  if (err) {
		    console.log('entry update error, mongooseCB', err);
		    next();
		  }

		  next();
		};


		Goals.findOne(query, function (err, entry) {
		  if (err) {
		    console.log('entry update error, findOne JournalEntries');
		    next();
		  }
		  if (entry) {
		    Goals.findOneAndUpdate(query, update, {new: true}, mongooseCB);
		  } else {
		    update.entryId = mongoose.Types.ObjectId();
		    Goals.create(update, mongooseCB)
		  }
		})
	}
}