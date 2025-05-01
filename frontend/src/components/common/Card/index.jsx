import React from 'react';
import { Card as MuiCard, CardContent, CardActions, CardHeader } from '@mui/material';

const Card = ({ title, children, actions, ...props }) => {
  return (
    <MuiCard {...props}>
      {title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
};

export default Card;