import React from 'react';
import {Link} from 'react-router';
import DateTimePicker from 'react-bootstrap-datetimepicker';
import {Button, Input, ListGroup, ListGroupItem, Modal, OverlayTrigger} from 'react-bootstrap';
import GoalActions from '../actions/GoalActions';
import JournalStore from '../stores/JournalStore';
// import HomeActions from '../actions/HomeActions';

class EditGoalModal extends React.Component {
  constructor(props) {
	super(props);
  }

  componentDidMount() {
		JournalStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
		JournalStore.unlisten(this.onChange.bind(this));
  }

  handleSaveGoal() {
  	var description = this.refs['goal-description'].getValue();
  	var motivation = this.refs['goal-motivation'].getValue();
  	var startDate = this.refs['goal-start-date'].state.selectedDate.format('llll').replace(/,/g, '').split(' ').slice(0,4).join(' ');
  	var setCompletionDate = this.refs['goal-end-date'].state.selectedDate.format('llll').replace(/,/g, '').split(' ').slice(0,4).join(' ');
  	var progress = this.refs['goal-progress'].getValue();
  	var completed = Boolean(this.refs['goal-completed'].getValue());

  	debugger;

  	GoalActions.saveGoalItem({
  		description: description,
  		motivation: motivation,
  		startDate: startDate,
  		setCompletionDate: setCompletionDate,
  		progress: progress,
  		completed: completed
  	});

  	this.props.onToggleEditModal();

  }

  handleEditGoalInput(key) {
  	var key = key[0];
  	var values = {
	    description : this.refs['goal-description'].getValue(),
	    motivation : this.refs['goal-motivation'].getValue(),
	    startDate : this.refs['goal-start-date'].state.selectedDate.format('llll').replace(/,/g, '').split(' ').slice(0,4).join(' '),
	    setCompletionDate : this.refs['goal-end-date'].state.selectedDate.format('llll').replace(/,/g, '').split(' ').slice(0,4).join(' '),
	    progress : this.refs['goal-progress'].getValue(),
	    completed : this.refs['goal-completed'].getValue()
  	};

  	var value = values[key];
  	this.props.onEditInput(key, value);


  }

  onChange(state) {
		this.setState(state);
  }

  render() {
  	var textAreaStyle = {
  		height: 'auto'
  	};
  	return (
	    <Modal show={this.props.showEditModal} onHide={this.props.onToggleEditModal}>
	      <Modal.Header closeButton>
	        <Modal.Title>New Goal</Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	        <Input type='text' ref='goal-description' onChange={this.handleEditGoalInput.bind(this, ['description'])} value={this.props.currentEditItem ? this.props.currentEditItem.description : ''} label='Description' placeholder='Tell us more about this goal.' />
	        <Input type='textarea' style={textAreaStyle} ref='goal-motivation' onChange={this.handleEditGoalInput.bind(this, ['motivation'])}value={this.props.currentEditItem ? this.props.currentEditItem.motivation : ''} label='Motivation' placeholder='Why complete this goal?' />
	        <Input type='textarea' style={textAreaStyle} ref='goal-progress' onChange={this.handleEditGoalInput.bind(this, ['progress'])} value={this.props.currentEditItem ? this.props.currentEditItem.progress || '' : ''} label='Progress' placeholder='Progress updates/How do you plan on better completing this?' />
	        <Input type='checkbox' ref='goal-completed' onChange={this.handleEditGoalInput.bind(this, ['completed'])} label='Completed'  checked={this.props.currentEditItem ? this.props.currentEditItem.completed : false} help='if not, keep working on it' />
	        <h5>From:</h5>
	        <DateTimePicker dateTime={this.props.currentDate} ref='goal-start-date' mode='date' />
	        <h5>To:</h5>
	        <DateTimePicker dateTime={this.props.currentDate} ref='goal-end-date' mode='date' />
	        
	      </Modal.Body>
	      <Modal.Footer>
	        <Button onClick={this.handleSaveGoal.bind(this)}>Save</Button>
	      </Modal.Footer>
	    </Modal>
  	)
  }
}

export default EditGoalModal