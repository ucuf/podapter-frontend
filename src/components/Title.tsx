import * as React from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography px={"1rem"} pt={"1rem"} component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
