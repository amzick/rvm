import React, { Component } from 'react';
import axios from 'axios';

import './styles.scss';

class Manifesto extends Component {
  constructor(props) {
    super(props);
    const { manifesto } = props;

    this.state = {
      loading: true,
      manifesto
    }
  }

  componentDidMount() {
    if (this.state.loading || !this.state.manifesto) {
      axios.get('/api/infos/rem')
        .then(({ data }) => {
          const { info: { manifesto } } = data;
          this.setState({
            loading: false,
            manifesto
          });
        })
    }
  }

  render() {
    const { loading, manifesto } = this.state;
    return (loading || !manifesto)
      ? <div>Loading Manifesto</div>
      : (
        <div className='page-content'>
          <img height='800' width='1200' src='/rvm-splash.jpg' />
          {/* <h2>Manifesto</h2>
          <div className='manifesto' dangerouslySetInnerHTML={{ __html: manifesto }} /> */}
        </div>
      )
  }
}

export default Manifesto;