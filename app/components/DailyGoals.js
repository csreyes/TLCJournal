import React from 'react';
import {Link} from 'react-router';
import DateTimePicker from 'react-bootstrap-datetimepicker';
import {Button, Input, ListGroup, ListGroupItem, Modal, OverlayTrigger, Popover} from 'react-bootstrap';
import GoalActions from '../actions/GoalActions';
import JournalStore from '../stores/JournalStore';
import NewGoalModal from './NewGoalModal';
import EditGoalModal from './EditGoalModal';
// import HomeActions from '../actions/HomeActions';

class DailyGoals extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
    showAddModal: false,
    showEditMOdal: false,
    currentEditItem: null
    };
  }

  componentDidMount() {
		JournalStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
		JournalStore.unlisten(this.onChange.bind(this));
  }

  toggleAddModal() {
  	this.setState({showAddModal: !this.state.showAddModal});
  }

  toggleEditModal() {
    this.setState({showEditModal: !this.state.showEditModal});
  }

  handleAddItem() {
  	this.toggleAddModal();
  }


  handleGoalCompleted(goal) {
  	goal.completed = !goal.completed;
  	if (goal.completed) {
  		goal.completionDate = new Date().toDateString();
  	}
  	GoalActions.saveGoalItem(goal);
  }

  handleEditItem(goal) {
    this.state.currentEditItem = goal;
    this.toggleEditModal();
  }

  handleSaveGoal() {
  	var description = this.refs['goal-description'].getValue();
  	var motivation = this.refs['goal-motivation'].getValue();
  	var startDate = this.refs['goal-start-date'].state.selectedDate.format('llll').replace(/,/g, '').split(' ').slice(0,4).join(' ');
  	var setCompletionDate = this.refs['goal-end-date'].state.selectedDate.format('llll').replace(/,/g, '').split(' ').slice(0,4).join(' ')

  	GoalActions.saveGoalItem({
  		description: description,
  		motivation: motivation,
  		startDate: startDate,
  		setCompletionDate: setCompletionDate
  	});

  }

  handleInput(key, value) {
    var currentGoal = this.state.currentEditItem;
    currentGoal[key] = value;
    this.setState({
      currentEditItem: currentGoal
    });
  }

  onChange(state) {
		this.setState(state);
  }

  render() {
  	var makeTitle = function(goal) {
  		if (goal.completed) {
  			return 'Completed on '+ goal.completionDate
  		}
  		return 'Complete by ' + goal.setCompletionDate;
  	}
  	var divStyle = {textAlign: 'center'};
  	if (this.props.goals.daily.length > 0) {
	  	var listGroup = this.props.goals.daily.map(function(goal) {
	  		var bsStyle = goal.completed ? 'success' : 'danger';
	  		return (
	  			<OverlayTrigger trigger='hover' placement='bottom' overlay={<Popover title={makeTitle(goal)}>{goal.motivation}</Popover>}>
		  			<ListGroupItem onClick={this.handleEditItem.bind(this, goal)} bsStyle={bsStyle} >{goal.description}</ListGroupItem>
					</OverlayTrigger>
	  		)
	  	}.bind(this));
  	} else {
  		var listGroup = [(<ListGroupItem>You need more goals in life, just sayin.</ListGroupItem>)]
  	}
		return (
			<div className='daily-goal-container test'>
			  <div className='daily-goal-header test'>Daily Goals</div>
			  <div className='daily-goal-list test'>
			  	<ListGroup>
  			  	{listGroup}
			  	</ListGroup>
          <Button bsStyle='primary' onClick={this.handleAddItem.bind(this)} className='daily-goal-save-button' >Add Item</Button>
			  </div>
        <NewGoalModal {...this.state} onToggleAddModal={this.toggleAddModal.bind(this)} />
			  <EditGoalModal {...this.state} onEditInput={this.handleInput.bind(this)} onToggleEditModal={this.toggleEditModal.bind(this)} />
			</div>
		);
  }
}

export default DailyGoals