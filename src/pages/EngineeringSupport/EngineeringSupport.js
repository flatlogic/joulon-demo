import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import s from './EngineeringSupport.module.scss';
import DrillingControl from './components/DrillingControl';


class EngineeringSupport extends React.Component {
  render() {
    const drillingControlData = {
      auxiliaries: [
        {
          name: "Lockout",
          state: true,
        },
        {
          name: "Blower 1",
          state: true,
        },
        {
          name: "Blower 2",
          state: true,
        },
        {
          name: "VFD",
          state: true,
        },
        {
          name: "Lube Oil Pump",
          state: true,
        },
        {
          name: "Hydraulic Alarm",
          state: false,
        },
        {
          name: "Motor Temperature",
          state: false,
        },
        {
          name: "IBOP Closed",
          state: false,
        },
        {
          name: "Break ON",
          state: false,
        },
      ],
      navigation: [
        {
          name: "Top Drive",
          state: true,
        },
        {
          name: "Advanced",
          state: false
        }
      ],
      top_drive_control: [
        {
          name: "onState",
          state: true,
        },
        {
          name: "offState",
          state: false
        }
      ],
      stand_jump: {
        state: true,
        onValue: "On",
        offValue: "Off"
      },
      hydraulics_mode: {
        state: true,
        onValue: "Manual",
        offValue: "Auto"
      },
      elevator: {
        state: true,
        onValue: "ON",
        offValue: "OFF"
      },
      power_slips: {
        state: true,
        onValue: "ON",
        offValue: "OFF"
      },
      charts: {
        gauges: [
          {
            radius: 80,
            labels: [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
            minorTicksNumber: 4,
            value: 150,
            units: 'RPM',
            title: "Top Drive\nSpeed",
            zones: [
              {
                color: '#f8ac08',
                start: 175,
                end: 225
              },
              {
                color: '#ed4245',
                start: 225,
                end: 250
              }
            ]
          },
          {
            radius: 80,
            labels: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
            minorTicksNumber: 4,
            value: 32,
            units: '* 1000 N*m',
            title: "Torque",
            zones: [
              {
                color: '#f8ac08',
                start: 50,
                end: 65
              },
              {
                color: '#ed4245',
                start: 65,
                end: 70
              }
            ]
          }
        ],
        drill_torque_reference: 0,
        makeup_torque_reference: 0
      }

    };

    return (
      <div className={s.root}>
        <Row>
          <Col xs={12}>
            <DrillingControl data={drillingControlData}/>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(EngineeringSupport);
