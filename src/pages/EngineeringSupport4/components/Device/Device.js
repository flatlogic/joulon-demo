import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import s from './Device.module.scss';
import Connector from '../Connector';
import Bar from '../../../../components/Bar';


class Device extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static defaultProps = {
    data: {
      RPM: {},
      AMP: {}
    }
  };

  render() {
    const {data} = this.props;
    const {connected} = data;

    let RPM = data.RPM.value / data.RPM.max * 100;
    let AMP = data.AMP.value / data.AMP.max * 100;

    return (
      <div className={s.root}>
        <Connector connected={connected}/>
        <div className={cx(s.main, data.enabled ? s.enabled : "")}>
          <h6 className={s.header}>{data.name}</h6>
          <div className={s.loadCharts}>
            <div className={s.RPM}>
              <Bar className="mb-2" value={RPM} height={70} width={10}/>
              <p className={s.title}>RPM</p>
              <h6 className={s.value}>{data.RPM.value}</h6>
            </div>
            <div className={s.AMP}>
              <Bar className="mb-2" value={AMP} height={70} width={10}/>
              <p className={s.title}>AMP</p>
              <h6 className={s.value}>{data.AMP.value}</h6>
            </div>
          </div>
          <div className={s.torque}>
            <p className={s.title}>Torque (%&#42;1000)</p>
            <h6 className={s.value}>{data.torque}</h6>
          </div>
          <div className={s.kW}>
            <p className={s.title}>kW</p>
            <h6 className={s.value}>{data.kW}</h6>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Device);
