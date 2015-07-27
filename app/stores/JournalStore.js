import alt from '../alt';
import JournalActions from '../actions/JournalActions';
import GoalActions from '../actions/GoalActions';


class JournalStore {
  constructor() {
    this.bindActions(JournalActions);
    this.bindActions(GoalActions);
    this.entries = {
      day: {
        text: '',
        date: null
      },
      night: {
        text: '',
        date: null
      }
    };
    this.mode = this.setMode();
    this.goals = {
      daily: [],
      longTerm: []
    };
  }

  setMode() {
    var today = new Date();
    var hour = today.getHours();
    var mode;

    if (hour > 6 && hour < 20) {
        mode = 'day';
    } else {
        mode = 'night';
    }
    return mode;
  }

  swapModeSuccess() {
    var modes = {
      day: 'night',
      night: 'day'
    };

    this.mode = modes[this.mode];
  }

  onSaveJournalEntrySuccess(entry) {
    var mode = entry.mode;
    this.entries[mode].text = entry.text;
    this.entries[mode].date = entry.date;
  }

  onGetJournalDataSuccess(response) {
    this.entries = response;
  }

  onSaveGoalItemSuccess(goal) {
    var replaced = false;
    if (goal.startDate === goal.setCompletionDate) {
      this.goals.daily.forEach(function(singleGoal, i) {
        if (singleGoal.entryId === goal.entryId) {
          this.goals.daily[i] = goal;
          replaced = true;
        }
      }.bind(this))
      if (!replaced) {
        this.goals.daily.push(goal);
      }
    } else {
      this.goals.longTerm.forEach(function(singleGoal, i) {
        if (singleGoal.entryId === goal.entryId) {
          this.goals.longTerm[i] = goal;
          replaced = true;
        }
      }.bind(this))
      if (!replaced) {
        this.goals.longTerm.push(goal);
      }
    }
  }

  onGetGoalDataSuccess(data) {
    this.goals = data;
  }

  onVoteFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(JournalStore);