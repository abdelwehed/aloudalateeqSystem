import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export function AdminActions(props: any) {
  return (
    <Modal
      open={props.isSummaryModalOpen}
      onClose={props.handleCloseSummaryModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          //transform: 'translate(-50%, -50%)',
          position: 'absolute',
          width: '90%',
          height: '80%',
          left: '5%',
          top: '10%',
          padding: 2,
          bgcolor: 'background.paper',
        }}
      >
        {/* cette partie concerne le haut de la page (date, bouton fond de caisse et bouton cloture de caisse) */}
        <Grid
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <webview
            id="foo"
            src="https://aloudalateeq.com/"
            style={{
              display: 'inline-flex',
              width: '100%',
              height: '100%',
            }}
            //style="display:inline-flex; width:640px; height:480px"
          ></webview>
        </Grid>
      </Box>
    </Modal>
  );
}
