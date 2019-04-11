import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import s from './EngineeringSupport2.module.scss';
import MudPumps from './components/MudPumps';


class EngineeringSupport2 extends React.Component {
  render() {
    const mudPumpsData = {
      pumps: {
        mp1: {
          MPConsoleInControl: true,
          drillerInControl: true,
          SPMSetpoint: 0.0,
          MPOn: true,
          selectAsMaster: false,
          syncModeOn: false,
          MPSynchronized: false,
          SPM: 167
        },
        mp2: {
          MPConsoleInControl: true,
          drillerInControl: true,
          SPMSetpoint: 0.0,
          MPOn: true,
          selectAsMaster: false,
          syncModeOn: false,
          MPSynchronized: false,
          SPM: 169
        },
        mp3: {
          MPConsoleInControl: true,
          drillerInControl: true,
          SPMSetpoint: 0.0,
          MPOn: true,
          selectAsMaster: false,
          syncModeOn: false,
          MPSynchronized: false,
          SPM: 0
        },
        IBOPInterlockActive: true
      }

    };
    return (
      <div className={s.root}>
        <Row>
          <Col xs={12}>
            <MudPumps data={mudPumpsData}/>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(EngineeringSupport2);
