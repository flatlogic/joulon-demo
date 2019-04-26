import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import s from './Generator.module.scss';
import Connector from '../Connector';


class Generator extends React.Component {
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
        <div className={cx(s.main, data.enabled ? s.enabled : "")}>
          <h6 className={s.header}>{data.name}</h6>
          <div className={s.genItem}>
            <p className={s.title}>KW</p>
            <p className={s.value}>{data.KW}</p>
          </div>
          <div className={s.genItem}>
            <p className={s.title}>KWA</p>
            <p className={s.value}>{data.KWA}</p>
          </div>
        </div>
        <Connector connected={data.connected}/>

      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Generator);
