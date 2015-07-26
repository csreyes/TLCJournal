import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import JournalMainContainer from './JournalMainContainer';

class Journal extends React.Component {
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
      <div className='journal-outer-container test'>
        <div className='journal-outer-container-header test'>
          <h3 className='journal-outer-container-header-innertext'>Daily View</h3>
        </div>
        <JournalMainContainer />
      </div>
    );
  }
}

export default Journal;