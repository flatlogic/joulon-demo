import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import Slider from 'rc-slider';
import cx from 'classnames';

import Widget from '../../../../core/Widget/Widget';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import ControlButton from './components/ControlButton/ControlButton';
import Switcher from '../../../../components/Switcher/Switcher';
import Bar from '../../../../components/Bar/Bar';
import JoulonInput from '../../../../components/Input/Input';
import DrillChart from '../DrillChart/DrillChart';
import s from './DrillingControl.module.scss';


class DrillingControl extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static defaultProps = {
    data: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      checked: false
    }
  }

  render() {
    const standJump = this.props.data.stand_jump;
    const hydraulicsMode = this.props.data.hydraulics_mode;
    const elevator = this.props.data.elevator;
    const powerSlips = this.props.data.power_slips;
    const drillTorqueReference = this.props.data.charts.drill_torque_reference;
    const makeupTorqueReference = this.props.data.charts.makeup_torque_reference;

    let gauge1 = this.props.data.charts.gauges[0];
    let valuePercent1 = gauge1.value / (gauge1.labels[gauge1.labels.length - 1] - gauge1.labels[0]) * 100;

    let gauge2 = this.props.data.charts.gauges[1];
    let valuePercent2 = gauge2.value / (gauge2.labels[gauge2.labels.length - 1] - gauge2.labels[0]) * 100;

    const trackStyle = {
      background: '#00C6D1',
      width: '1px',
      left: 'calc(50% - 1px)'
    };

    const railStyle = {
      width: '1px',
      left: 'calc(50% - 1px)',
      background: 'var(--border-color-light)'
    };

    const handleStyle = {
      marginLeft: '-3px',
      marginBottom: '-2px',
      width: '7px',
      height: '7px',
      borderColor: '#00C6D1',
      backgroundColor: '#00C6D1',
      left: 'calc(50% - 1px)'
    };

    return (
      <div className={s.root}>
        <Row>
          <Col xs={8}>
            <Widget title="Auxiliaries">
              <div className={cx(s.auxiliaries, "mt-3")}>
                {
                  this.props.data.auxiliaries.map((aux, index) => (
                      <section
                        key={index} // eslint-disable-line
                        className={s.auxiliary}
                      >
                        <Checkbox className="mb-3" checked={aux.state} name={aux.name} />
                        <p>{aux.name}</p>
                      </section>
                  ))
                }
              </div>
            </Widget>
          </Col>
          <Col xs={3}>
            <Widget title="Navigation">
              <div className={cx(s.navigation, "mt-3")}>
                {
                  this.props.data.navigation.map((nav, index) => (
                    <section
                      key={index} // eslint-disable-line
                      className={s.nav}
                    >
                      <Button className="mb-3" color={nav.state ? "primary" : "secondary"}>{nav.name}</Button>
                      <Checkbox className="mb-3" checked={nav.state} name={nav.name}/>
                    </section>
                  ))
                }
              </div>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Row>
              <Col xs={12}>
                <Widget title="Top Drive Control">
                  <div className={cx(s.topDriveControl, "mt-3")}>
                    {
                      this.props.data.top_drive_control.map((tdc, index) => (
                        <section
                          key={index} // eslint-disable-line
                          className={s.topDriveControlSection}
                        >
                          <Button className={cx("mb-3", tdc.name, tdc.state && "btnActive")} color={'primary'}/>
                          <Checkbox className="mb-3" checked={tdc.state} name={tdc.name}/>
                        </section>
                      ))
                    }
                  </div>
                </Widget>
              </Col>
              <Col xs={12}>
                <Widget title="Stand Jump">
                  <div className="mt-3">
                    <Switcher
                      checked={standJump.state}
                      onLabel={standJump.onValue}
                      offLabel={standJump.offValue}
                      width={80}
                    />
                  </div>
                </Widget>
              </Col>
              <Col xs={12}>
                <Widget title="Hydraulics Mode">
                  <div className="mt-3">
                    <Switcher
                      checked={hydraulicsMode.state}
                      onLabel={hydraulicsMode.onValue}
                      offLabel={hydraulicsMode.offValue}
                      width={100}
                    />
                  </div>
                </Widget>
              </Col>
              <Col xs={12}>
                <Widget title="Elevator">
                  <div className="mt-3">
                    <Switcher
                      checked={elevator.state}
                      onLabel={elevator.onValue}
                      offLabel={elevator.offValue}
                      width={80}
                    />
                  </div>
                </Widget>
              </Col>
              <Col xs={12}>
                <Widget title="Power Slips">
                  <div className="mt-3">
                    <Switcher
                      checked={powerSlips.state}
                      onLabel={powerSlips.onValue}
                      offLabel={powerSlips.offValue}
                      width={80}
                    />
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
          <Col xs={6}>
            <Row className="mb-3">
              <Col xs={12}>
                <section className={s.gauges}>
                  <DrillChart options={gauge1} id={'0'}/>
                  <Bar value={valuePercent1} height={120}/>
                  <Bar value={valuePercent2} height={120}/>
                  <DrillChart options={gauge2} id={'1'}/>
                </section>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Widget className={s.widgetWithInput} title={<p>Drill Torque Reference</p>}>
                  <div className="d-flex justify-content-center">
                    <JoulonInput value={drillTorqueReference} type={'number'} addon={'N.m'}/>
                  </div>
                </Widget>
              </Col>
              <Col xs={6}>
                <Widget className={s.widgetWithInput} title={<p>Make-up Torque Reference</p>}>
                  <div className="d-flex justify-content-center">
                    <JoulonInput value={makeupTorqueReference} type={'number'} addon={'N.m'}/>
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
          <Col xs={2}>
            <h6 className={s.brightnessTitle}>Brightness <i className={'la la-sun-o'}/></h6>
            <Widget className={s.brightnessControl}>
              <ControlButton>
                <i className='la la-plus'/>
              </ControlButton>
              <Slider
                className={s.brightnessSlider}
                vertical
                min={0}
                max={100}
                defaultValue={3}
                trackStyle={trackStyle}
                railStyle={railStyle}
                handleStyle={handleStyle}
              />
              <ControlButton>
                <i className='la la-minus'/>
              </ControlButton>
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

export default withRouter(connect(mapStateToProps)(DrillingControl));
