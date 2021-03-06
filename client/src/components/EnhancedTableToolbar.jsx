import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const GetToolbarButton = (props) => {
  const { numSelected, handleDeleteClick, supportsDelete } = props;
  if (numSelected > 0) {
    return (
      <Tooltip title="Șterge">
        <IconButton aria-label="șterge" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  }
  if (supportsDelete) {
    return (
      <Tooltip title="Filtrează rânduri">
        <IconButton aria-label="filtreaza">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return <></>;
};

GetToolbarButton.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  supportsDelete: PropTypes.bool.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, tableName, handleDeleteClick, supportsDelete } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} rânduri selectate
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {tableName}
        </Typography>
      )}
      <GetToolbarButton
        numSelected={numSelected}
        handleDeleteClick={handleDeleteClick}
        supportsDelete={supportsDelete}
      />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  tableName: PropTypes.string.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  supportsDelete: PropTypes.bool.isRequired,
};

EnhancedTableToolbar.defaultProps = {};

export default EnhancedTableToolbar;
