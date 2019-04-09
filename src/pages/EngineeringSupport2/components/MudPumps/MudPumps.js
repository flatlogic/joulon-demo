import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import Widget from '../../../../core/Widget/Widget';
import cx from 'classnames';
import s from './MudPumps.module.scss';
import Checkbox from '../../../../components/Checkbox';
import Divider from '../../../../components/Divider';
import JoulonInput from '../../../../components/Input';


class MudPumps extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static defaultProps = {
    data: {pumps: []}
  };

  constructor(props) {
    super(props);
  }

  render() {
    const [mp1, mp2, mp3] = Object.values(this.props.data.pumps);
    const mudPump = (data, name) => {
      return (
        <ul className={s.mudPumpList}>
          <li className={s.mudPumpItem}>
            <Checkbox checked={data.MPConsoleInControl} name={name + "_MPConsoleInControl"}/>
            <p>MP Console In Control</p>
          </li>
          <li className={s.mudPumpItem}>
            <Checkbox checked={data.drillerInControl} name={name + "_drillerInControl"}/>
            <Button color={data.drillerInControl ? "primary" : "secondary"}>Driller in Control</Button>
          </li>
          <li className={cx("divider", s.mudPumpItem)}>
            <Divider/>
          </li>
          <li className={s.mudPumpItem}>
            <p className="text-muted">SPM Setpoint</p>
            <JoulonInput type="number" value={0.0}/>
          </li>
          <li className={s.mudPumpItem}>
            <Checkbox checked={data.MPOn} name={name + "_MPOn"}/>
            <Button color={data.MPOn ? "primary" : "secondary"}>MP On</Button>
          </li>
          <li className={s.mudPumpItem}>
            <Checkbox checked={data.selectAsMaster} name={name + "_selectAsMaster"}/>
            <Button color={data.selectAsMaster ? "primary" : "secondary"}>Select as Master</Button>
          </li>
          <li className={s.mudPumpItem}>
            <Checkbox checked={data.syncModeOn} name={name + "_syncModeOn"}/>
            <Button color={data.syncModeOn ? "primary" : "secondary"}>Sync Mode On</Button>
          </li>
          <li className={s.mudPumpItem}>
            <Checkbox checked={data.MPSynchronized} name={name + "_MPSynchronized"}/>
            <p>MP Synchronized</p>
          </li>
        </ul>
      )
    };
    return (
      <div className={s.root}>
        <Row>
          <Col xs={3}>
            <h5>MP1</h5>
            <Widget>
              {mudPump(mp1, 'mp1')}
            </Widget>
          </Col>
          <Col xs={3}>
            <h5>MP2</h5>
            <Widget>
              {mudPump(mp2, 'mp2')}
            </Widget>
          </Col>
          <Col xs={3}>
            <h5>MP3</h5>
            <Widget>
              {mudPump(mp3, 'mp3')}
            </Widget>
          </Col>
          <Col xs={3}>
            <h5 className="invisible">SPM</h5>
            <Widget>
              <section className={s.spm}>
                <div className={s.spmItem}>
                  <h5>{mp1.SPM}</h5>
                  <p>MP1 SPM</p>
                </div>
                <div className={s.spmItem}>
                  <h5>{mp2.SPM}</h5>
                  <p>MP2 SPM</p>
                </div>
                <div className={s.spmItem}>
                  <h5>{mp3.SPM}</h5>
                  <p>MP3 SPM</p>
                </div>
              </section>
            </Widget>
            <Widget>
              <div className={s.ibop}>
                <Checkbox checked={this.props.data.IBOPInterlockActive} name='IBOPInterlockActive'/>
                <p className='mb-0'>IBOP Interlock Active</p>
              </div>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col xs={9}>
            <Widget title={<h6 className='text-muted'>Mud Pumps Alarms</h6>} collapse>
            </Widget>
          </Col>
          <Col xs={2}>
            <Widget>
              <div className={s.info}>
                <p>MP Drives</p>
                <i className="la la-info-circle"/>
              </div>
              <div className={s.info}>
                <p>MP IO</p>
                <i className="la la-info-circle"/>
              </div>
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

export default connect(mapStateToProps)(MudPumps);
