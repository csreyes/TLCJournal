import React from 'react';
import {Link} from 'react-router';
import DateTimePicker from 'react-bootstrap-datetimepicker';
import {Button, Input, ListGroup, ListGroupItem, Modal, OverlayTrigger, Popover} from 'react-bootstrap';
import GoalActions from '../actions/GoalActions';
import JournalStore from '../stores/JournalStore';
import NewGoalModal from './NewGoalModal';
// import HomeActions from '../actions/HomeActions';

class longTermGoals extends React.Component {
  constructor(props) {
	super(props);
	this.state = {showModal: false};
  }

  componentDidMount() {
		JournalStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
		JournalStore.unlisten(this.onChange.bind(this));
  }

  toggleModal() {
  	this.setState({showModal: !this.state.showModal});
  }

  handleAddItem() {
  	this.toggleModal();
  }

  handleGoalCompleted(goal) {
  	goal.completed = !goal.completed;
  	if (goal.completed) {
  		goal.completionDate = new Date().toDateString();
  	}
  	GoalActions.saveGoalItem(goal);
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
  	if (this.props.goals.longTerm.length > 0) {
	  	var listGroup = this.props.goals.longTerm.map(function(goal) {
	  		var bsStyle = goal.completed ? 'success' : 'danger';
	  		return (
	  			<OverlayTrigger trigger='hover' placement='bottom' overlay={<Popover title={makeTitle(goal)}>{goal.motivation}</Popover>}>
		  			<ListGroupItem onClick={this.handleGoalCompleted.bind(this, goal)} bsStyle={bsStyle} >{goal.description}</ListGroupItem>
					</OverlayTrigger>
	  		)
	  	}.bind(this));
  	} else {
  		var listGroup = [(<ListGroupItem>You need more goals in life, just sayin.</ListGroupItem>)]
  	}
		return (
			<div className='longterm-goal-container test'>
			  <div className='longterm-goal-header test'>Long Term Goals</div>
			  <div className='longterm-goal-list test'>
			  	<ListGroup>
			  	{listGroup}
			  	</ListGroup>
          <Button bsStyle='primary' onClick={this.handleAddItem.bind(this)} className='longterm-goal-save-button' >Add Item</Button>
			  </div>
			  <NewGoalModal {...this.state} onToggleModal={this.toggleModal.bind(this)} />
			</div>
		);
  }
}

export default longTermGoals