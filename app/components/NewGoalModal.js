import React from 'react';
import {Link} from 'react-router';
import DateTimePicker from 'react-bootstrap-datetimepicker';
import {Button, Input, ListGroup, ListGroupItem, Modal, OverlayTrigger} from 'react-bootstrap';
import GoalActions from '../actions/GoalActions';
import JournalStore from '../stores/JournalStore';
// import HomeActions from '../actions/HomeActions';

class NewGoalModal extends React.Component {
  constructor(props) {
	super(props);
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

  	this.props.onToggleModal();

  }

  onChange(state) {
		this.setState(state);
  }

  render() {
  	return (
	    <Modal show={this.props.showModal} onHide={this.props.onToggleModal}>
	      <Modal.Header closeButton>
	        <Modal.Title>New Goal</Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	        <Input type='text' ref='goal-description' label='Description' placeholder='Tell us more about this goal.' />
	        <Input type='text' ref='goal-motivation' label='Motivation' placeholder='Why complete this goal?' />
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

export default NewGoalModal