import alt from '../alt';
import JournalActions from '../actions/JournalActions';

class JournalStore {
  constructor() {
    this.bindActions(JournalActions);
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

  onVoteFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(JournalStore);