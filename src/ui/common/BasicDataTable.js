import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import DataTable from 'react-data-table-component';

export const col = (name, selector, sortable, customize = {}) => ({
  name,
  selector,
  sortable,
  ...customize,
});

export const at = (path, defaultValue) => (ctx) =>
  _.get(ctx, path, defaultValue);

export const basicCol = (name, path, sortable) => col(name, at(path), sortable);
export const propCol = (path, sortable = true) =>
  basicCol(
    _.chain(path.split('.')).last().upperFirst().value(),
    path,
    sortable,
  );

export const relativeDateCol = (name, propertyPath) => {
  return col(
    name,
    (row) => {
      const val = _.get(row, propertyPath);
      return moment(val).fromNow();
    },
    true,
    {
      sortFunction: (a, b) => {
        a = new Date(_.get(a, propertyPath)).getTime();
        b = new Date(_.get(b, propertyPath)).getTime();
        return a - b;
      },
    },
  );
};

const BasicDataTable = ({
  columns = [],
  data = [],
  loading,
  defaultSortField,
  ExpandableRowsComponent,
}) => {
  // TODO: export
  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      defaultSortFieldId={defaultSortField}
      expandableRows={!!ExpandableRowsComponent}
      expandableRowsComponent={ExpandableRowsComponent}
    />
  );
};

export default BasicDataTable;

export const BasicJsonExpandedComponent = ({ data }) => (
  <div className="p-3">
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);
