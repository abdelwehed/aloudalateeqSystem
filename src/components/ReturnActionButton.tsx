import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';
import { returnPaymentTypes } from 'dummyData/payment';

export default function ReturnActionButton(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        zIndex: 999,
        height: '100%',
        width: 200,
        flex: 1,
        transform: 'translateZ(0px)',
        flexGrow: 1,
      }}
    >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          position: 'absolute',
          bottom: 5,
          right: 5,
        }}
        icon={<PlayArrowOutlinedIcon />}
        onClick={handleOpen}
        open={open}
        FabProps={{
          sx: {
            bgcolor: 'green',
            '&:hover': {
              bgcolor: 'green',
            },
          },
        }}
      >
        {returnPaymentTypes.map((action) => (
          <SpeedDialAction
            key={action.id}
            icon={<action.icon />}
            tooltipTitle={action.label}
            tooltipOpen
            onClick={() => props.onPress(action.value)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
