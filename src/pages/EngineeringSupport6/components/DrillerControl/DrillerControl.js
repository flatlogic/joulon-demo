import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import s from './DrillerControl.module.scss';
import Gauge from '../../../../components/Gauge';
import Checkbox from '../../../../components/Checkbox';
import Widget from '../../../../core/Widget';


class DrillerControl extends React.Component {
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
        <Row>
          <Col xs={3}>
            {data.gauges.map((g, index) => <div key={g.title + index} className="mb-3"><Gauge options={g} id={g.title+index}/></div>)}
          </Col>
          <Col xs={4}>
            <Row>
              {data.nodes.map((n, index) => (
                <Col xs={6} key={n.name + index}>
                  <Widget title={n.name}>
                      <div className="flex-group justify-content-between mb-3">
                        <Checkbox checked={n.open} name={n.name+"_open"}/>
                        <Button color={data.open ? "primary" : "secondary"}>Open</Button>
                      </div>
                      <div className="flex-group justify-content-between">
                        <Checkbox checked={!n.open} name={n.name+"_close"}/>
                        <Button color={!data.open ? "primary" : "secondary"}>Close</Button>
                      </div>
                  </Widget>
                </Col>))}
            </Row>
          </Col>
          <Col xs={2}>
            <Widget>
              <ul className="chartList">
                {data.sensors.map((s, index) => (
                  <li key={s.name + index} className="chartListItem px-0">
                    <Checkbox checked={s.state} name={s.name + index}/>
                    <h6>{s.name}</h6>
                  </li>
                ))}
              </ul>
            </Widget>
            <Widget>
              {data.additionalOptions.map((o, index) => (
                <div key={o.name + index} className="flex-group-column mb-3">
                  <Button className="mb-2" color={o.state ? "primary" : "secondary"}>{o.name}</Button>
                  <Checkbox checked={o.state} name={o.name + index}/>
                </div>
              ))}
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(DrillerControl);
