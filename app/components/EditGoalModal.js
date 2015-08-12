import React from 'react';
import {Link} from 'react-router';
import DateTimePicker from 'react-bootstrap-datetimepicker';
import {Button, Input, ListGroup, ListGroupItem, Modal, OverlayTrigger} from 'react-bootstrap';
import GoalActions from '../actions/GoalActions';
import JournalStore from '../stores/JournalStore';
import moment from 'moment';
// import HomeActions from '../actions/HomeActions';

class EditGoalModal extends React.Component {
  constructor(props) {
	  super(props);
    this.state = {
      description: props.currentEditItem ? props.currentEditItem.description : ''
    }
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
  	var completed = Boolean(this.state.completed);
    var entryId = this.state.entryId;
    var date = this.state.currentDate.format('llll').replace(/,/g, '').split(' ').slice(0,4).join(' ');


  	GoalActions.saveGoalItem({
  		description: description,
  		motivation: motivation,
  		startDate: startDate,
  		setCompletionDate: setCompletionDate,
  		progress: progress,
  		completed: completed,
      entryId: entryId,
      date: date
  	});

  	this.props.onToggleEditModal();

  }

  handleEditGoalInput(key) {
  	var key = key[0];
  	var values = {
	    description : this.refs['goal-description'].getValue(),
	    motivation : this.refs['goal-motivation'].getValue(),
      startDate : this.refs['goal-start-date'].state.selectedDate.format('LL'),
      setCompletionDate : this.refs['goal-end-date'].state.selectedDate.format('LL'),
	    progress : this.refs['goal-progress'].getValue(),
	    
  	};

    if (key === 'completed') {
      values.completed = !(this.state.completed);
    }

  	var value = values[key];
  	this.setState(values);

  }

  handleDeleteGoal() {
    var date = this.state.currentDate.format('llll').replace(/,/g, '').split(' ').slice(0,4).join(' ');
    GoalActions.deleteGoalItem({
      entryId: this.state.entryId,
      date: date
    });
    this.props.onToggleEditModal();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentEditItem) {
      var currentEditItem = nextProps.currentEditItem;
      this.setState({
        description: currentEditItem.description,
        motivation: currentEditItem.motivation,
        startDate: moment(currentEditItem.startDate),
        setCompletionDate: moment(currentEditItem.setCompletionDate),
        progress: currentEditItem.progress || '',
        completed: currentEditItem.completed || false,
        entryId: currentEditItem.entryId || null
      });
    }
  }

  test(a) {
    console.log(a);
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
	        <Modal.Title>Edit Goal</Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	        <Input type='text' ref='goal-description' onChange={this.handleEditGoalInput.bind(this, ['description'])} value={this.state.description} label='Description' placeholder='Tell us more about this goal.' />
	        <Input type='textarea' style={textAreaStyle} ref='goal-motivation' onChange={this.handleEditGoalInput.bind(this, ['motivation'])}value={this.state.motivation} label='Motivation' placeholder='Why complete this goal?' />
	        <Input type='textarea' style={textAreaStyle} ref='goal-progress' onChange={this.handleEditGoalInput.bind(this, ['progress'])} value={this.state.progress} label='Progress' placeholder='Progress updates/How do you plan on better completing this?' />
	        <Input type='checkbox' ref='goal-completed' onChange={this.handleEditGoalInput.bind(this, ['completed'])} label='Completed'  checked={this.state.completed} help='if not, keep working on it' />
	        <h5>From:</h5>
	        <DateTimePicker dateTime={this.state.startDate} ref='goal-start-date' mode='date' onChange={this.test.bind(this)}/>
	        <h5>To:</h5>
	        <DateTimePicker dateTime={this.state.setCompletionDate} ref='goal-end-date' mode='date' />
	        
	      </Modal.Body>
	      <Modal.Footer>
          <Button onClick={this.handleSaveGoal.bind(this)}>Save</Button>
          <Button onClick={this.handleDeleteGoal.bind(this)}>Delete</Button>
        </Modal.Footer>
	    </Modal>
  	)
  }
}

export default EditGoalModal
