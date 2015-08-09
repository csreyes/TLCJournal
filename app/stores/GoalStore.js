import alt from '../alt';
import GoalActions from '../actions/GoalActions';

class GoalStore {
  constructor() {
    this.bindActions(GoalActions);
    this.goals = {
    	daily: [],
    	longTerm: []
    };
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
