import React, { Component } from 'react';
import axios from 'axios';

import Loading from '../../elements/Loading';
import waitAtLeast from '../../helpers/waitAtLeast';

import './styles.scss';
import { IMAGE_KIT_EXTERNAL_PATH } from '../../../utils/constants';

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
      waitAtLeast(axios.get('/api/infos/rem'))
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
      ? <Loading />
      : (
        <div className='page-content'>
          <img
            height='800'
            width='1200'
            src={`${IMAGE_KIT_EXTERNAL_PATH}/rvm-splash_dhsLuHE9b.jpg`}
            alt="Photograph of the stage from Rem's production of 'Men on Boats'."
          />
          {/* <h2>Manifesto</h2>
          <div className='manifesto' dangerouslySetInnerHTML={{ __html: manifesto }} /> */}
        </div>
      )
  }
}

export default Manifesto;