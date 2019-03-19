import React, { Component } from 'react';
import ReactTable from 'react-table';

import { reactTableData } from './data';
import Widget from '../../../components/Widget';

class CustomDashboard1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reactTable: reactTableData(),
    };
  }

  render() {
    return (
      <div>
        <h1 className="page-title mb-xlg">Dashboard 1</h1>
        <Widget title={<h4>Table</h4>} collapse close>
          <ReactTable
            data={this.state.reactTable}
            filterable
            columns={[
              {
                Header: 'NAME',
                accessor: 'name',
              },
              {
                Header: 'POSITION',
                accessor: 'position',
              },
              {
                Header: 'OFFICE',
                accessor: 'office',
              },
              {
                Header: 'EXT',
                accessor: 'ext',
              },
              {
                Header: 'START DATE',
                accessor: 'startDate',
              },
              {
                Header: 'SALARY',
                accessor: 'salary',
              },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </Widget>
      </div>
    );
  }
}

export default CustomDashboard1;
