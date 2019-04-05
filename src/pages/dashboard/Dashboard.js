import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {
  Row, Col, Progress,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

import classnames from "classnames";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import s from './Dashboard.module.scss';
import Widget from '../../core/Widget';

import { fetchTableData } from '../../actions/dashboard';

const {SearchBar} = Search;

class Dashboard extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    tableData: PropTypes.array
  };

  static defaultProps = {
    tableData: []
  };

  componentDidMount() {
    this.props.dispatch(fetchTableData(null));
  }

  renderSizePerPageDropDown = (props) => {
    const limits = [];
    props.sizePerPageList.forEach((limit) => {
      limits.push(<DropdownItem key={limit} onClick={() => props.changeSizePerPage(limit)}>{limit}</DropdownItem>);
    });

    return (
      <Dropdown isOpen={props.open} toggle={props.toggleDropDown}>
        <DropdownToggle color="default" caret>
          {props.currSizePerPage}
        </DropdownToggle>
        <DropdownMenu>
          {limits}
        </DropdownMenu>
      </Dropdown>
    );
  };

  render() {
    function infoFormatter(cell) {
      return (
        <div>
          <small>
            Type:&nbsp;<span className="fw-semi-bold">{cell.type}</span>
          </small>
          <br/>
          <small>
            Dimensions:&nbsp;<span className="fw-semi-bold">{cell.dimensions}</span>
          </small>
        </div>
      );
    }

    function descriptionFormatter(cell) {
      return (
        <button className="btn-link">
          {cell}
        </button>
      );
    }

    function progressFormatter(cell) {
      return (
        <Progress style={{height: '15px'}} color={cell.type} value={cell.progress}/>
      );
    }

    function progressSortFunc(a, b, order) {
      if (order === 'asc') {
        return a.progress - b.progress;
      }
      return b.progress - a.progress;
    }

    function dateSortFunc(a, b, order) {
      if (order === 'asc') {
        return new Date(a).getTime() - new Date(b).getTime();
      }
      return new Date(b).getTime() - new Date(a).getTime();
    }

    function sortableHeaderFormatter(column, index, components) {
      let icon = (<div className={classnames(s.sortArrowsContainer, 'ml-sm')}>
        <span className={classnames('caret', 'mb-xs', s.rotatedArrow)}/>
        <span className="caret"/>
      </div>);

      if (components.sortElement.props.order === 'asc') {
        icon = (<div className="ml-sm">
          <span className={classnames('caret', 'mb-xs', s.rotatedArrow)}/>
        </div>);
      } else if (components.sortElement.props.order === 'desc') {
        icon = (<div className="ml-sm">
          <span className="caret mb-xs"/>
        </div>);
      }

      return <div className={s.sortableHeaderContainer}>{column.text} {icon}</div>
    }

    return (
      <div className={s.root}>
        <div>
          <Widget title={<h4>Table</h4>} collapse close>
            <ToolkitProvider
              keyField="id"
              data={this.props.tableData}
              columns={[{
                dataField: 'id',
                text: 'ID'
              }, {
                dataField: 'name',
                text: 'Name'
              }, {
                dataField: 'description',
                text: 'Description',
                formatter: descriptionFormatter,
              }, {
                dataField: 'info',
                text: 'info',
                formatter: infoFormatter,
              }, {
                dataField: 'date',
                text: 'Date',
                sort: true,
                sortFunc: dateSortFunc,
                headerFormatter: sortableHeaderFormatter,
              }, {
                dataField: 'status',
                text: 'Status',
                formatter: progressFormatter,
                sort: true,
                sortFunc: progressSortFunc,
                headerFormatter: sortableHeaderFormatter,
              }]}
              search
            >
              {
                props => (
                  <div>
                    <Row className="mb-lg">
                      <Col lg={{size: 4, offset: 8}} md={{size: 5, offset: 7}} sm={{size: 6, offset: 6}} xs={12}>
                        <SearchBar {...props.searchProps} />
                      </Col>
                    </Row>
                    <BootstrapTable
                      {...props.baseProps}
                      pagination={paginationFactory()}
                      striped
                    />
                  </div>
                )
              }
            </ToolkitProvider>
          </Widget>
        </div>
      </div>
    );
  }

}

function mapStateToProps(store) {
  return {
    tableData: store.dashboard.tableData,
  };
}

export default connect(mapStateToProps)(Dashboard);
