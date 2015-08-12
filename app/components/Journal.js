import React from 'react';
import {Link} from 'react-router';
import {Pager, PageItem} from 'react-bootstrap';
import moment from 'moment';
import JournalStore from '../stores/JournalStore'
import JournalActions from '../actions/JournalActions';


// import HomeStore from '../stores/HomeStore'
// import HomeActions from '../actions/HomeActions';
import JournalMainContainer from './JournalMainContainer';

class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = JournalStore.getState();
  }

  componentDidMount() {
    JournalStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    JournalStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state)
  }

  updateDate(update) {
    JournalActions.updateDate(update);
  }

  render() {
    var weeklyQuote = 'Plan well and follow through. It\'ll take you places you didn\'t know you could go.'

    return (
      <div className='journal-outer-container test'>
        <div className='journal-outer-container-header test'>
        <Pager className='journal-outer-container-header-pager test'>
          <PageItem onClick={this.updateDate.bind(this, -1)} className='journal-outer-container-header-page-item test' previous href='#'>&larr;</PageItem>
          <span className='journal-outer-container-header-current-date'>{this.state.formattedCurrentDate}</span>
          <PageItem onClick={this.updateDate.bind(this, 1)}className='journal-outer-container-header-page-item test' next href='#'>&rarr;</PageItem>
        </Pager>
          <h3 className='journal-outer-container-header-innertext'>TLC Journal</h3>
        </div>
        <JournalMainContainer />
        <div className='journal-footer'>
          <span className='journal-footer-text'>{weeklyQuote}</span>
        </div>
      </div>
    );
  }
}

export default Journal;