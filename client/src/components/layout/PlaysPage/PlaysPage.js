import React, { Component } from 'react';

import PlayCard from '../../elements/PlayCard'

import './styles.scss';

class PlaysPage extends Component {
  render() {
    const { plays = [] } = this.props;
    const playsDisplay = plays.map(play => {
      return (
        <div>
          {<PlayCard />} for {play.title}:
          <br />
          {play.about}
        </div>
      )
    })

    return <div>
      PlaysPage:
      {playsDisplay}
    </div>;
  }
}

export default PlaysPage;