import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import cx from 'classnames';
import s from './EngineeringSupport3.module.scss';
import Drawworks from './components/Drawworks';


class EngineeringSupport3 extends React.Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const drawworksData = {
      DWEnable: true,
      DWSelected: 'Reverse',
      lowStopPoint: 0.0,
      highStopPoint: 100.0,
      blockPosition: 6.0,
      hookload: 207.7,
      drumRPM: 0.0,
      autoDriller: 'Disabled',
      autoDrillerMode: 'N/A',
      WOB: 0.0,
      ROP: 0.0,
      autoparkCountdownTimer: 119.0,
      enableSlipAndCutMode: true,
      enableCreepSpeedMode: true,
      creepSpeedSetpoint: 119.0,
      DWRangeOverrideActivated: false,
      zeroWOBSelected: false,
      torqueProving: false,
      encodersOK: false
    };
    return (
      <div className={s.root}>
        <Row>
          <Col xs={12}>
            <Drawworks data={drawworksData}/>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(EngineeringSupport3);
