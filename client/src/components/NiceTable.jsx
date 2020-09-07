import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

import { getComparator, stableSort } from '../utils/comparators';

const useStyles = makeStyles({
  table: {
    minWidth: 750,
  },
  bottomTable: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

const NiceTable = (props) => {
  const classes = useStyles();

  /* Table meta-information */
  const { tableName, rowsPerPageOptions } = props;
  const { acceptsRowSelect, acceptsRowDelete } = props;

  /* Table data */
  const { rows, headCells, primaryKey } = props;
  const { handleDeleteSelectedClick, handleConfirmSelectedClick, hasConfirmButton } = props;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(primaryKey);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n[primaryKey]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row[primaryKey]);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row[primaryKey]);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleConfirmSelectedClickLocal = (event) => {
    event.preventDefault();
    setSelected([]);

    handleConfirmSelectedClick(selected);
  };

  const isSelected = (selectedValue) => {
    return selected.indexOf(selectedValue) !== -1;
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <>
      <EnhancedTableToolbar
        handleDeleteClick={() => handleDeleteSelectedClick(selected)}
        numSelected={selected.length}
        supportsDelete={acceptsRowDelete}
        tableName={tableName}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            selectable={acceptsRowSelect}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row[primaryKey]);
                const labelId = `enhanced - table - checkbox - ${index} `;

                return (
                  <TableRow
                    hover
                    onClick={acceptsRowSelect ? (event) => handleClick(event, row) : null}
                    role={acceptsRowSelect ? 'checkbox' : null}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row[primaryKey]}
                    selected={isItemSelected}
                  >
                    {acceptsRowSelect ? (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                    ) : (
                      <></>
                    )}
                    {headCells
                      .filter((elem) => elem.id !== primaryKey)
                      .map((elem) => {
                        return (
                          <TableCell key={elem.id} align={elem.numeric ? 'right' : 'left'}>
                            {row[elem.id]}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                );
              })}

            {/* Fill the rest of the table with space */}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={headCells.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add confirm button to bottom of table */}
      <div className={classes.bottomTable}>
        {hasConfirmButton && (
          <Button
            variant="contained"
            onClick={handleConfirmSelectedClickLocal}
            color="primary"
            block="true"
            disabled={selected.length === 0}
            type="submit"
          >
            Confirmă
          </Button>
        )}

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

NiceTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  tableName: PropTypes.string.isRequired,
  acceptsRowSelect: PropTypes.bool /* and delete */,
  acceptsRowDelete: PropTypes.bool /* and delete */,
  primaryKey: PropTypes.string.isRequired,
  hasConfirmButton: PropTypes.bool,
  headCells: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      disablePadding: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,

  handleDeleteSelectedClick: PropTypes.func,
  handleConfirmSelectedClick: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number.isRequired),
};

NiceTable.defaultProps = {
  acceptsRowSelect: false,
  acceptsRowDelete: false,
  hasConfirmButton: false,
  handleConfirmSelectedClick: () => {},
  handleDeleteSelectedClick: () => {},
  rowsPerPageOptions: [5, 10, 25],
};

export default NiceTable;
