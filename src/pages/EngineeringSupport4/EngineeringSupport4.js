import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import s from './EngineeringSupport4.module.scss';
import Engine from './components/Engine';


class EngineeringSupport4 extends React.Component {
  render() {
    const engineData = {
      totalMW: 1.4,
      totalMWA: 2.0,
      engineGenPercentLoad: 21.9,
      gens: [
        {
          name: 'Gen 1',
          KW: 351.0,
          KWA: 406.4,
          enabled: true,
          connected: true
        },
        {
          name: 'Gen 1',
          KW: 351.0,
          KWA: 406.4,
          enabled: true,
          connected: true
        },
        {
          name: 'Gen 1',
          KW: 351.0,
          KWA: 406.4,
          enabled: true,
          connected: true
        },
        {
          name: 'Gen 1',
          KW: 351.0,
          KWA: 406.4,
          enabled: true,
          connected: true
        },
        {
          name: 'Gen 1',
          KW: 351.0,
          KWA: 406.4,
          enabled: false,
          connected: false
        }
      ],
      devices: [
        {
          name: 'MP1A',
          RPM: {
            value: 495,
            max: 1000
          },
          AMP: {
            value: 458,
            max: 1000
          },
          torque: 1341,
          kW: 72,
          enabled: true,
          connected: true
        },
        {
          name: 'MP1B',
          RPM: {
            value: 495,
            max: 1000
          },
          AMP: {
            value: 458,
            max: 1000
          },
          torque: 1341,
          kW: 72,
          enabled: true,
          connected: true
        },
        {
          name: 'MP2A',
          RPM: {
            value: 495,
            max: 1000
          },
          AMP: {
            value: 458,
            max: 1000
          },
          torque: 1341,
          kW: 72,
          enabled: true,
          connected: true
        },
        {
          name: 'MP2B',
          RPM: {
            value: 495,
            max: 1000
          },
          AMP: {
            value: 458,
            max: 1000
          },
          torque: 1341,
          kW: 72,
          enabled: true,
          connected: true
        },
        {
          name: 'MP3A',
          RPM: {
            value: 495,
            max: 1000
          },
          AMP: {
            value: 458,
            max: 1000
          },
          torque: 1341,
          kW: 72,
          enabled: true,
          connected: true
        },
        {
          name: 'MP3B',
          RPM: {
            value: 495,
            max: 1000
          },
          AMP: {
            value: 458,
            max: 1000
          },
          torque: 1341,
          kW: 72,
          enabled: true,
          connected: true
        },
        {
          name: 'DWA',
          RPM: {
            value: 495,
            max: 1000
          },
          AMP: {
            value: 458,
            max: 1000
          },
          torque: 1341,
          kW: 72,
          enabled: true,
          connected: true
        },
        {
          name: 'DWB',
          RPM: {
            value: 495,
            max: 1000
          },
          AMP: {
            value: 458,
            max: 1000
          },
          torque: 1341,
          kW: 72,
          enabled: true,
          connected: true
        },
        {
          name: 'DWC',
          RPM: {
            value: 0,
            max: 1000
          },
          AMP: {
            value: 0,
            max: 1000
          },
          torque: 1341,
          kW: 72,
          enabled: false,
          connected: true
        },
        {
          name: 'TD',
          RPM: {
            value: 495,
            max: 1000
          },
          AMP: {
            value: 458,
            max: 1000
          },
          torque: 1341,
          kW: 72,
          enabled: true,
          connected: true
        },
        {
          name: 'RT',
          RPM: {
            value: 0,
            max: 1000
          },
          AMP: {
            value: 0,
            max: 1000
          },
          torque: 1341,
          kW: 72,
          enabled: false,
          connected: false
        },
      ]
    };
    return (
      <div className={s.root}>
        <Row>
          <Col xs={12}>
            <Engine data={engineData}/>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(EngineeringSupport4);
