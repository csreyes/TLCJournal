import alt from '../alt';
import JournalActions from '../actions/JournalActions';

class JournalStore {
  constructor() {
    this.bindActions(JournalActions);
    this.dailyGoals = [];
    this.journalEntries = {};
    this.longTermGoals = [];
  }

  onGetJournalDataSuccess(data) {
    this.dailyGoals = data.dailyGoals;
    this.journalEntries = data.journalEntries;
    this.longTermGoals = data.longTermGoals;
  }

  onSaveJournalEntrySuccess(data) {

  }

  onUpdateDailyGoalsSuccess(data) {

  }

  onUpdateLongTermGoalsSuccess

  onGetJournalDataFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(NavbarStore);