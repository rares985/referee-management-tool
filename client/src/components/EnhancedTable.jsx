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
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

const useStyles = makeStyles({
  table: {
    minWidth: 750,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTable = (props) => {
  const classes = useStyles();
  const { rows, headCells, tableName, selectable } = props;
  const { handleFirstRefereeChoice, handleSecondRefereeChoice, handleObserverChoice, shortlistById } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
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
      const newSelecteds = rows.map((n) => n.match_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleHeadCellsPadding = () => {
    if (selectable) {
      return [{ ...headCells[0], disablePadding: true }, ...headCells.slice(1)];
    }
    return [{ ...headCells[0], disablePadding: false }, ...headCells.slice(1)];
  };

  const handleClick = (event, match) => {
    const selectedIndex = selected.indexOf(match.match_no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, match.match_no);
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
    console.log(`Setting to ${newSelected}`);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (matchNo) => {
    console.log(`Checking ${selected} for ${matchNo}`);
    return selected.indexOf(matchNo) !== -1;
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


  return (
    <>
      <EnhancedTableToolbar numSelected={selected.length} tableName={tableName} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size='small'
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            headCells={handleHeadCellsPadding()}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            selectable={selectable}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.match_no);
                const labelId = `enhanced - table - checkbox - ${index} `;

                return (
                  <TableRow
                    hover
                    onClick={selectable ? (event) => handleClick(event, row) : null}
                    role={selectable ? 'checkbox' : null}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.match_no}
                    selected={isItemSelected}
                  >
                    {selectable ? (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                    ) : (
                        <></>
                      )}
                    <TableCell component="th" id={labelId} scope="row" padding="default">
                      {row.match_no}
                    </TableCell>
                    <TableCell align="right">{row.match_date}</TableCell>
                    <TableCell align="right">{row.team_a_name}</TableCell>
                    <TableCell align="right">{row.team_b_name}</TableCell>
                    <TableCell align="right">{row.full_name_competition}</TableCell>
                    <TableCell align="right">
                      {row.first_referee_name ?
                        (row.first_referee_name) :
                        (<ChooseRefereeModal
                          matchid={row.id}
                          onSaveCloseCB={handleFirstRefereeChoice}
                          shortlist={shortlistById}
                        />)
                      }
                    </TableCell>
                    <TableCell align="right">
                      {row.second_referee_name ?
                        (row.second_referee_name) :
                        (<ChooseRefereeModal
                          matchid={row.id}
                          onSaveCloseCB={handleSecondRefereeChoice}
                          shortlist={shortlistById}
                        />)
                      }
                    </TableCell>
                    <TableCell align="right">
                      {row.observer_name ?
                        (row.observer_name) :
                        (<ChooseRefereeModal
                          matchid={row.id}
                          onSaveCloseCB={handleObserverChoice}
                          shortlist={shortlistById}
                        />)
                      }
                    </TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

EnhancedTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    match_no: PropTypes.number.isRequired,
    match_date: PropTypes.string.isRequired,
    team_a_name: PropTypes.string.isRequired,
    team_b_name: PropTypes.string.isRequired,
    competition_name: PropTypes.string.isRequired,
    a1: PropTypes.string.isRequired,
    a2: PropTypes.string.isRequired,
    obs: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  })).isRequired,
  headCells: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    numeric: PropTypes.bool.isRequired,
    disablePadding: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  shortlistById: PropTypes.arrayOf(PropTypes.exact({

  })).isRequired,
  tableName: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
  handleFirstRefereeChoice: PropTypes.func.isRequired,
  handleSecondRefereeChoice: PropTypes.func.isRequired,
  handleObserverChoice: PropTypes.func.isRequired,
};

EnhancedTable.defaultProps = {
  selectable: false,
};

export default EnhancedTable;
