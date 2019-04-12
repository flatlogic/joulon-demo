import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import s from './EngineeringSupport5.module.scss';
import TopDrive from './components/TopDrive';


class EngineeringSupport5 extends React.Component {
  render() {
    const topDriveData = {
      options: [
        {
          name: "TD Mode",
          value: "Spin",
        },
        {
          name: "TD Direction",
          value: "Reverse",
        },
        {
          name: "Compensator Mode",
          value: "Auto",
        },
        {
          name: "Brake",
          value: "Off",
        },
        {
          name: "Auto Break (RPM)",
          value: 0,
        },
        {
          name: "Makeup Torque Setpoints",
          value: 0.0,
        },
        {
          name: "Top Drive Alarms",
          value: 0.0,
        },
      ],
      topDriveOn: false,
      blowerOverrideOn: false,
      handlingRingLock: false,
      IBOPClose: true,
      grabsOn: false,
      TDGrabsOnDWInterlocked: false,
      gauges: [
        {
          radius: 80,
          labels: [0, 75, 125, 175, 250],
          minorTicksNumber: 5,
          value: 180,
          units: 'RPM',
          title: "Speed",
        },
        {
          radius: 80,
          labels: [0, 25, 50, 75, 100],
          minorTicksNumber: 5,
          value: 60,
          units: 'Kin-lbs',
          title: "Drill Torque",
        }
      ]
    };
    return (
      <div className={s.root}>
        <Row>
          <Col xs={12}>
            <TopDrive data={topDriveData}/>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(EngineeringSupport5);
