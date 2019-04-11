import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from './LocalGrid.module.scss';
import Generator from '../Generator';
import Device from '../Device';


class LocalGrid extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static defaultProps = {
    data: {}
  };

  render() {
    const {data} = this.props;
    return (
      <div className={s.root}>
        <div className={s.gens}>
          {data.gens.map(gen => <Generator data={gen}/>)}
        </div>
        <div className={s.pipeline}/>
        <div className={s.devices}>
          {data.devices.map(device => <Device data={device}/>)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(LocalGrid);
