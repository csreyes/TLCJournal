import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';

class JournalWrite extends React.Component {
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
      <div className='journal-write-container test'>
        <div className='journal-write-header test'></div>
        <div className='journal-write-textarea test'></div>
      </div>
    );
  }
}

export default JournalWrite