import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import s from './EngineeringSupport6.module.scss';
import DrillerControl from './components/DrillerControl';


class EngineeringSupport6 extends React.Component {
  render() {
    const drillerControlData = {
      gauges: [
        {
          radius: 80,
          labels: [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000],
          minorTicksNumber: 1,
          value: 1000,
          units: 'PSI',
          title: "Annular",
        },
        {
          radius: 80,
          labels: [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000],
          minorTicksNumber: 1,
          value: 1040,
          units: 'PSI',
          title: "Manifold",
        },
        {
          radius: 80,
          labels: [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000],
          minorTicksNumber: 1,
          value: 440,
          units: 'PSI',
          title: "Accumulator",
        },
      ],
      nodes: [
        {
          name:"Annular",
          state: true,
        },
        {
          name: "Shear RAM",
          open: true,
        },
        {
          name: "Annular",
          open: true,
        },
        {
          name: "Kill Line #1",
          open: true,
        },
        {
          name: "HCR #1",
          open: true,
        },
        {
          name: "Pipe RAM #1",
          open: true,
        },
        {
          name: "Choke Line #1",
          open: true,
        },
        {
          name: "HCR #2",
          open: true,
        },
      ],
      sensors: [
        {
          name: "Low Accum. Pressure",
          state: false
        },
        {
          name: "Low Accum. Pressure",
          state: false
        },
        {
          name: "Low Accum. Pressure",
          state: false
        },
        {
          name: "Low Accum. Pressure",
          state: false
        },
        {
          name: "Low Accum. Pressure",
          state: false
        },
        {
          name: "Low Accum. Pressure",
          state: false
        },
        {
          name: "Low Accum. Pressure",
          state: false
        },
      ],
      additionalOptions: [
        {
          name: "Master",
          state: false
        },
        {
          name: "Silence",
          state: false
        },
        {
          name: "Log",
          state: false
        },
        {
          name: "Settings",
          state: false
        },
      ]
    };
    return (
      <div className={s.root}>
        <Row>
          <Col xs={12}>
            <DrillerControl data={drillerControlData}/>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(EngineeringSupport6);
