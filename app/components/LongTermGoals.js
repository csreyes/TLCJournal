import React from 'react';
import {Link} from 'react-router';
// import HomeStore from '../stores/HomeStore'
// import HomeActions from '../actions/HomeActions';

class LongTermGoals extends React.Component {
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
		<div className='longterm-goal-container test'>
		  <div className='longterm-goal-header test'></div>
		  <div className='longterm-goal-list test'></div>
		</div>
	);
  }
}

export default LongTermGoals;