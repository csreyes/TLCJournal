import React from 'react';
import {Link} from 'react-router';
// import HomeStore from '../stores/HomeStore'
// import HomeActions from '../actions/HomeActions';

class DailyGoals extends React.Component {
  constructor(props) {
	super(props);
  }

  componentDidMount() {
	// HomeStore.listen(this.onChange);
  }

  componentWillUnmount() {
	// HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
	this.setState(state);
  }

  render() {

	return (
		<div className='daily-goal-container test'>
		  <div className='daily-goal-header test'></div>
		  <div className='daily-goal-list test'></div>
		</div>
	);
  }
}

export default DailyGoals