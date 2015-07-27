import alt from '../alt';

class JournalActions {
  constructor() {
    this.generateActions(
      'getJournalDataSuccess',
      'getJournalDataFail',
      'saveJournalEntrySuccess',
      'saveJournalEntryFail',
      'swapModeSuccess'
    );
  }

  getJournalData($, date) {
    $.ajax({
      type: 'GET',
      url: '/api/entries',
      data: {date: date}
    })
      .done(data => {
        this.actions.getJournalDataSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getJournalDataFail(jqXhr.responseJSON.message);
      });
  }

  saveJournalEntry(data) {
    $.ajax({
      type: 'PUT',
      url: '/api/entries',
      data: {
        date: data.date,
        text: data.text,
        mode: data.mode
      }
    })
      .done(data => {
        this.actions.saveJournalEntrySuccess(data);
      })
      .fail(jqXhr => {
        this.actions.saveJournalEntryFail(jqXhr.responseJSON.message);
      });
  }

  swapMode() {
    this.actions.swapModeSuccess();
  }

  getTwoCharacters() {
    $.ajax({ url: '/api/characters' })
      .done(data => {
        this.actions.getTwoCharactersSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getTwoCharactersFail(jqXhr.responseJSON.message);
      });
  }

  vote(winner, loser) {
    $.ajax({
      type: 'PUT',
      url: '/api/characters' ,
      data: { winner: winner, loser: loser }
    })
      .done(() => {
        this.actions.getTwoCharacters();
      })
      .fail((jqXhr) => {
        this.actions.voteFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(JournalActions);