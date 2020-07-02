import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Table } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { XIcon } from '../../components/Icons';

import dateFormatter from '../../utils/datemanip';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
}));


const UnavailableDatesTable = (props) => {
  const classes = useStyles();

  const handleDelete = (idx) => {
    /* eslint-disable no-console */
    console.log(`Deleted ${idx}`);
    /* eslint-enable no-console */
  }

  const { deletable, dates, title } = props;

  return (
    <>
      <Typography className={classes.title} component="h1" variant="h5">
        {title}
      </Typography>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Data începerii</th>
            <th>Data încheierii</th>
            <th>Motiv</th>
            {deletable && <th>Sterge</th>}
          </tr>
        </thead>
        <tbody>
          {dates.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{dateFormatter(item.StartDate)}</td>
                <td>{dateFormatter(item.EndDate)}</td>
                <td>{item.Reason}</td>
                {deletable &&
                  <td>
                    <Button variant="contained" color="primary" onClick={() => handleDelete(i + 1)}>
                      <XIcon />
                    </Button>
                  </td>
                }
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

UnavailableDatesTable.propTypes = {
  deletable: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  dates: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    StartDate: PropTypes.string.isRequired,
    EndDate: PropTypes.string.isRequired,
    Reason: PropTypes.string.isRequired,
  })).isRequired
}
export default UnavailableDatesTable;