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
    debugger;
    console.log('got here 1')
    this.goals = data;
  }

  onGetGoalDataSuccess(data) {
    console.log('got here 2')
    this.goals = data;
  }

  onVoteFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(JournalStore);
