import React from 'react';
import {Link} from 'react-router';
import JournalStore from '../stores/JournalStore'
import JournalActions from '../actions/JournalActions';
import GoalActions from '../actions/GoalActions';
import JournalWrite from './JournalWrite';
import DailyGoals from './DailyGoals';
import LongTermGoals from './LongTermGoals';

class JournalMainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = JournalStore.getState();
  }

  componentDidMount() {
    JournalStore.listen(this.onChange.bind(this));
    var date = this.state.currentDate.format('llll').replace(/,/g, '').split(' ').slice(0,4).join(' ');
    JournalActions.getJournalData($, date);
    GoalActions.getGoalData($, date);
  }

  componentWillUnmount() {
    JournalStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.formattedCurrentDate !== this.state.formattedCurrentDate) {
      var date = this.state.currentDate.format('llll').replace(/,/g, '').split(' ').slice(0,4).join(' ');
      JournalActions.getJournalData($, date);
      GoalActions.getGoalData($, date);
    }
  }

  handleInput(text) {
    var entries = this.state.entries;
    entries[this.state.mode].text = text;
    this.setState({
      entries: entries
    })
  }

  render() {

    return (
      <div className='journal-inner-container test'>
        <DailyGoals {...this.state} />
        <JournalWrite {...this.state} onJournalInput={this.handleInput.bind(this)} />
        <LongTermGoals {...this.state} />
      </div>
  	);
  }
}

export default JournalMainContainer;