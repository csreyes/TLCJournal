import React from 'react';
import {Link} from 'react-router';
import JournalStore from '../stores/JournalStore'
import JournalActions from '../actions/JournalActions';
import JournalWrite from './JournalWrite';
import DailyGoals from './DailyGoals';
import LongTermGoals from './LongTermGoals';

class JournalMainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = JournalStore.getState();
    // JournalActions.getJournalData(new Date().toDateString())
  }

  componentDidMount() {
    JournalStore.listen(this.onChange.bind(this));
    var date = new Date().toDateString();
    JournalActions.getJournalData($, date)
  }

  componentWillUnmount() {
    JournalStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state)
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
        <DailyGoals />
        <JournalWrite {...this.state} onJournalInput={this.handleInput.bind(this)} />
        <LongTermGoals />
      </div>
  	);
  }
}

export default JournalMainContainer;