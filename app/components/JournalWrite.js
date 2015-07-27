import React from 'react';
import {Link} from 'react-router';
import {Input, Button} from 'react-bootstrap';
import JournalStore from '../stores/JournalStore';
import JournalActions from '../actions/JournalActions';

class JournalWrite extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSaveEntry() {
    var date = new Date().toDateString();
    var text = this.refs.journalEntryInput.getValue();
    var mode = this.props.mode;

    JournalActions.saveJournalEntry({
      date: date,
      text: text,
      mode: mode
    });
  }

  handleJournalInput() {
    var text = this.refs.journalEntryInput.getValue();
    this.props.onJournalInput(text);
  }

  componentDidMount() {
    JournalStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    JournalStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var map = {
      day: 'Daytime Freewrite',
      night: 'Nighttime Freewrite'
    };
    var header = map[this.props.mode];

    return (
      <div className='journal-write-container test'>
        <div className='journal-write-header test'>
          <div className='journal-write-header-innertext'>{{header}}</div>
          <Button className='journal-write-header-change-mode' bsSize='xsmall' onClick={JournalActions.swapMode}>Change mode?</Button>
        </div>
        <div className='journal-write-text-container test'>
          <Input ref='journalEntryInput' className='journal-write-textarea' onChange={this.handleJournalInput.bind(this)} value={this.props.entries[this.props.mode].text} type='textarea' placeholder='Share your thoughts...' />
          <Button bsStyle='primary' className='journal-write-textarea-save-button'  onClick={this.handleSaveEntry.bind(this)}>Save Entry</Button>
        </div>
      </div>
    );
  }
}

export default JournalWrite