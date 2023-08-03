import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BillGeneralDetails from './billGeneralDetails';
import BillProductsDetails from './billProductsDetails';
import BillPaymentDetails from './billPaymentDetails';
import PrintIcon from '@mui/icons-material/Print';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Box, Grid, IconButton, Modal } from '@mui/material';
import { RootState } from 'renderer/store';
import { useAppSelector } from 'renderer/hooks';
import {
  billPayment,
  BillType,
} from 'features/payment/components/paymentBill/types/billType';
import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from 'features/payment/components/paymentBill/paymentBill';

export default function TicketsTable() {
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const [billPdfOpen, setBillPdfOpen] = React.useState<boolean>(false);
  const [selectedBill, setSelectedBill] = React.useState<BillType | null>(null);

  const bills = useAppSelector((state: RootState) => state.search.bills); // filter by date, get only today's bills

  const handleChange =
    (index: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? index : false);
    };

  function getPaymentData(payments: Array<billPayment>) {
    let paymentData = null;

    payments.map((el) => {
      const cardsPayment =
        el.paymentMethod.name === 'card'
          ? {
              paid: el.value,
            }
          : null;

      paymentData = {
        cards: [cardsPayment],
        cash:
          el.paymentMethod.name === 'cash'
            ? {
                paid: el.value,
              }
            : null,
        check:
          el.paymentMethod.name === 'check'
            ? {
                paid: el.value,
              }
            : null,
        coupon:
          el.paymentMethod.name === 'coupon'
            ? {
                paid: el.value,
              }
            : null,
      };
    });

    return paymentData;
  }

  function displayBillDuplicata() {
    if (!selectedBill) {
      return;
    }

    const billData = selectedBill;

    console.log({ billData });

    let change: number = 0;
    billData.payments.map((payment) => {
      if (payment.paymentMethod.name === 'cash') {
        change = payment.change || 0;
      }
    });

    return (
      <Modal
        open={billPdfOpen}
        onClose={() => setBillPdfOpen(false)}
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
            height: '90%',
            width: '45%',
            padding: 2,
            bgcolor: 'background.paper',
          }}
        >
          <PDFViewer style={{ height: '100%', width: '100%' }}>
            <MyDocument
              paymentInfos={getPaymentData(billData.payments)}
              change={change}
              billData={billData}
            />
          </PDFViewer>
        </Box>
      </Modal>
    );
  }

  return (
    <div style={{ width: '100%', height: 390, overflow: 'scroll' }}>
      {bills.map((el: BillType, index: number) => (
        <React.Fragment key={index}>
          {displayBillDuplicata()}
          <Accordion
            expanded={expanded === index}
            onChange={handleChange(index)}
            style={{ marginTop: 5 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Bill number: {el.billNumber}
                </Typography>

                <Typography sx={{ color: 'text.secondary' }}>
                  {el.totalNet} QAR
                </Typography>

                {/* VERSION 2 */}
                {/*               <IconButton
                aria-label="delete"
                onClick={(e) => e.stopPropagation()}
              >
                <BackspaceIcon fontSize="large" style={{ width: 60 }} />
              </IconButton> */}

                <IconButton
                  aria-label="duplicataBill"
                  onClick={(e) => {
                    setBillPdfOpen(true);
                    setSelectedBill(el);
                    e.stopPropagation();
                  }}
                >
                  <PrintIcon fontSize="large" style={{ width: 60 }} />
                </IconButton>
              </Grid>
            </AccordionSummary>

            <AccordionDetails>
              <BillGeneralDetails staff={el.staff} customer={el.customer} />
              <BillProductsDetails billProducts={el.products} />
              <BillPaymentDetails billPayments={el.payments} />
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      ))}
    </div>
  );
}
