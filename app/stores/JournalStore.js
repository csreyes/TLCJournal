import alt from '../alt';
import JournalActions from '../actions/JournalActions';
import GoalActions from '../actions/GoalActions';
import moment from 'moment';


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
    this.currentDate = moment();
    this.formattedCurrentDate = this.currentDate.format('LL');
    this.daysDifference = 0;
  }

  updateDateSuccess(update) {
    this.daysDifference = this.daysDifference + update;
    this.currentDate = moment().add(this.daysDifference, 'days');
    this.formattedCurrentDate = this.currentDate.format('LL');
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

  onGetJournalDataSuccess(entries) {
    if (!entries.day) {
      entries.day = {
        text: '',
        date: null
      };
    } else if (!entries.night) {
      entries.night = {
        text: '',
        date: null
      };
    }
    
    this.entries = entries;
  }

  onDeleteGoalItemSuccess(data) {
    this.goals = data;
  }

  onSaveGoalItemSuccess(data) {
    this.goals = data;
  }

  onGetGoalDataSuccess(data) {
    this.goals = data;
  }

  onVoteFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(JournalStore);
