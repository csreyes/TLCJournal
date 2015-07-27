import alt from '../alt';

class GoalActions {
  constructor() {
    this.generateActions(
      'getGoalDataSuccess',
      'getGoalDataFail',
      'saveGoalItemSuccess',
      'saveGoalItemFail',
      'swapModeSuccess'
    );
  }

  getGoalData($, date) {
    $.ajax({
      type: 'GET',
      url: '/api/goals',
      data: {date: date}
    })
      .done(data => {
        this.actions.getGoalDataSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getGoalDataFail(jqXhr.responseJSON.message);
      });
  }

  saveGoalItem(data) {
    $.ajax({
      type: 'PUT',
      url: '/api/goals',
      data: data
    })
      .done(data => {
      	console.log('success data=', data)
        this.actions.saveGoalItemSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.saveGoalItemFail(jqXhr.responseJSON.message);
      });
  }

  swapMode() {
    this.actions.swapModeSuccess();
  }
}


export default alt.createActions(GoalActions);