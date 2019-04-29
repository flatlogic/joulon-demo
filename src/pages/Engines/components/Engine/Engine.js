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
        <Row className="mb-3">
          <Col lg={3} xs={4} className="pl-2 pr-1 px-md-3">
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
          <Col lg={4} xs={8} className="pr-2 pl-1 px-md-3">
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <h6>Engine/Gen Percent Load</h6>
                  <p className="text-primary-light">{data.engineGenPercentLoad}</p>
                </li>
                <div className="px-md-3 pt-2">
                  <Progress className="progress-xs" color="primary-light" value={data.engineGenPercentLoad} max={100}/>
                </div>
              </ul>
            </Widget>
          </Col>
        </Row>
        <div className={s.localGridWrapper}>
          <LocalGrid data={{gens, devices}}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Engine);
