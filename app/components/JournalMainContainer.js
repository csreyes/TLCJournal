import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import JournalWrite from './JournalWrite';
import DailyGoals from './DailyGoals';
import LongTermGoals from './LongTermGoals';

class JournalMainContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

    return (
      <div className='journal-inner-container test'>
        <DailyGoals />
        <JournalWrite />
        <LongTermGoals />
      </div>
  	);
  }
}

export default JournalMainContainer;