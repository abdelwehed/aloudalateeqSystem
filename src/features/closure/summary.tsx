import { Button, Grid, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Report } from 'features/closure/report';
import moment from 'moment';
import { useEffect, useState } from 'react';
import PaymentMethodsTable from './components/paymentTable';
import SalesInfosTable from './components/salesInfosTable';
import TicketsTable from './components/ticketsTable';
import PrintIcon from '@mui/icons-material/Print';
import { CashFundView } from 'features/cashFund/cashFundView';
import firebase from 'firebase/firebase';
import { useAppDispatch } from 'renderer/hooks';
import { setBills } from 'features/search/searchReducer';

const todayFormatted = moment(new Date()).format('DD/MM/YYYY hh:mm:ss');

export enum reportEnum {
  xReport = 'xReport',
  zReport = 'zReport',
}

export function Summary(props: any) {
  const [dayReportOpen, setDayReportOpen] = useState<boolean>(false);
  const [reportType, setReportType] = useState<string | null>(null);
  const [cashFundOpen, setCashFundOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const billsResult: any = await firebase.getBills();
      dispatch(setBills(billsResult));
    }

    fetchData();
  });

  // gestion de caisse
  if (cashFundOpen) {
    return (
      <Modal
        open={props.isSummaryModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            left: '50%',
            top: '50%',
            padding: 2,
            bgcolor: 'background.paper',
          }}
        >
          <CashFundView />
          <Button
            onClick={() => setCashFundOpen(false)}
            color="primary"
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <Typography variant="h5" sx={{ color: '#fff' }}>
              Back
            </Typography>
          </Button>
        </Box>
      </Modal>
    );
  }

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
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
          left: '50%',
          top: '50%',
          padding: 2,
          bgcolor: 'background.paper',
        }}
      >
        {/* cette partie concerne le haut de la page (date, bouton fond de caisse et bouton cloture de caisse) */}
        <Grid
          container
          flexDirection="column"
          style={{ flex: 1, marginBottom: 5 }}
        >
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Summary of the day
          </Typography>

          <Grid
            container
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">{todayFormatted}</Typography>
            <Grid item display="flex" flexDirection="row" alignItems="center">
              {/* gestion de fond de caisse */}
              <Button
                onClick={() => setCashFundOpen(true)}
                color="secondary"
                variant="contained"
                style={{ marginLeft: 10 }}
              >
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  $
                </Typography>
              </Button>

              {/* fermeture de caisse: Z report */}
              <Button
                onClick={() => {
                  setReportType(reportEnum.zReport);
                  setDayReportOpen(true);
                }}
                color="primary"
                variant="contained"
                style={{ marginLeft: 10 }}
              >
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  Close shift
                </Typography>
              </Button>

              {/* X report */}
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setReportType(reportEnum.xReport);
                  setDayReportOpen(true);
                }}
              >
                <PrintIcon fontSize="large" style={{ width: 60 }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          flexDirection={'row'}
          justifyContent="space-between"
          style={{
            flex: 1,
            backgroundColor: '#0b304a',
            minWidth: 700,
            borderRadius: 5,
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <PaymentMethodsTable />
          <SalesInfosTable />
        </Grid>

        <Grid
          container
          style={{
            height: 400,
            backgroundColor: '#0b304a',
            paddingBottom: 5,
            borderRadius: 5,
            marginTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <TicketsTable />
        </Grid>

        <Report
          isReportModalOpen={dayReportOpen}
          handleCloseReportModal={() => setDayReportOpen(false)}
          reportType={reportType}
        />
      </Box>
    </Modal>
  );
}
