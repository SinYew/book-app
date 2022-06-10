import * as React from 'react';
import { Link } from "react-router-dom";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <LibraryBooksIcon/>
      </ListItemIcon>
      <ListItemText primary="Books" />
    </ListItemButton>
    <ListItemButton component={Link} to="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    <ListItemButton component={Link} to="/analytics">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Analytics" />
    </ListItemButton>
  </React.Fragment>
);