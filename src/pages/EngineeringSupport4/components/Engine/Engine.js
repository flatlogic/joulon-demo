import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Progress } from 'reactstrap';
import s from './Engine.module.scss';
import Widget from '../../../../core/Widget';
import LocalGrid from '../LocalGrid';


class Engine extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static defaultProps = {
    data: {}
  };

  render() {
    const {data} = this.props;
    const {gens, devices} = data;
    return (
      <div className={s.root}>
        <h5>Engine</h5>
        <Row className="mb-3">
          <Col xs={2}>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <h6>Total MW</h6>
                  <p className="text-primary-light">{data.totalMW}</p>
                </li>
                <li className="chartListItem">
                  <h6>Total MWA</h6>
                  <p className="text-primary-light">{data.totalMWA}</p>
                </li>
              </ul>
            </Widget>
          </Col>
          <Col xs={4}>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <h6>Engine/Gen Percent Load</h6>
                  <p className="text-primary-light">{data.engineGenPercentLoad}</p>
                </li>
                <div className="px-3 pb-3">
                  <Progress className="progress-xs" color="primary-light" value={data.engineGenPercentLoad} max={100}/>
                </div>
              </ul>
            </Widget>
          </Col>
        </Row>
        <LocalGrid data={{gens, devices}}/>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Engine);
