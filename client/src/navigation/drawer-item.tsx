import React from 'react';
import { ListItem, ListItemIcon, Badge, ListItemText } from '@material-ui/core';
/**
 * Drawer List Item Component
 */

const DrawerItem = (props: any) => {
    const Icon = props.icon;
  
    const onItemClick = () => {
      if (props.onClick) props.onClick();
      return;
    }
  
    return (
      <ListItem button key={props.name} onClick={() => onItemClick()} selected={props.selected}>
        <ListItemIcon><Badge badgeContent={props.badgeCount} color="secondary"><Icon /></Badge></ListItemIcon>
        <ListItemText primary={props.name} />
      </ListItem>
    )
  };

  export { DrawerItem }