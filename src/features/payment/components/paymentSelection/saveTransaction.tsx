import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from 'features/payment/components/paymentBill/paymentBill';
import firebase from 'firebase/firebase';
import { useState } from 'react';
import { useAppSelector } from 'renderer/hooks';
import { RootState } from 'renderer/store';
import { generateBillNumber } from '../paymentBill/utils/billNumberGenerator';
import { getBillProducts } from '../paymentUtils';

export function SaveTransaction(props: any) {
  const [isTransactionLoading, setIsTransactionLoading] =
    useState<boolean>(false);
  const [isTransactionSuccess, setIsTransactionSuccess] =
    useState<boolean>(false);
  const [transactionData, setTransactionData] = useState<any>(null);

  const searchedProducts = useAppSelector(
    (state: RootState) => state.products.searchedProducts
  );
  const change = useAppSelector((state: RootState) => state.payment.change);
  const totalOrder = useAppSelector(
    (state: RootState) => state.payment.totalOrder
  );

  const staffConnected = useAppSelector(
    (state: RootState) => state.staff.staffInfos
  );

  async function handleOnProceedSaveTransactionClick() {
    setIsTransactionLoading(true);

    const lastBillAdded = await firebase.getLastBill();

    const lastBillNumber = lastBillAdded.lastBill
      ? lastBillAdded.lastBill.billNumber.slice(8) * 1
      : 0;
    const generatedBillNumber = generateBillNumber(lastBillNumber);

    const billObject = {
      dateAdded: new Date().getTime(),
      branch: 'Tawar Mall',
      billNumber: generatedBillNumber,
      products: getBillProducts(searchedProducts),
      payments: [],
      customer: null,
      staff: {
        id: staffConnected.uid,
        code: staffConnected.code || null,
        displayName: staffConnected.fullname,
        email: staffConnected.email,
      },
      totalNet: totalOrder,
    };

    try {
      const key = await firebase.generateBillKey();
      if (key) {
        await firebase.addBill(key, billObject);
      }
      setIsTransactionLoading(false);
      // change success to an object containing the bill data needed to display pdf
      setIsTransactionSuccess(true);
      setTransactionData(billObject);
    } catch (e) {
      console.log('catch error', { e });

      setIsTransactionLoading(false);
      // ...
      // handle payment error
      // ...
    }
  }

  function displayPdfDocumnet() {
    return <MyDocument change={change} billData={transactionData} />;
  }

  if (isTransactionLoading) {
    return (
      <Modal
        open={props.saveTransactionModalOpen}
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
          <CircularProgress />
          <Typography variant="h4" sx={{}}>
            Processing...
          </Typography>
        </Box>
      </Modal>
    );
  }

  if (isTransactionSuccess) {
    return (
      <Modal
        open={props.saveTransactionModalOpen}
        onClose={props.closeSaveTransactionlModal}
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
            {displayPdfDocumnet()}
          </PDFViewer>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal
      open={props.saveTransactionModalOpen}
      onClose={props.closeSaveTransactionlModal}
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
          height: '30%',
          width: '30%',
          padding: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h5">
          Do you really want to save this transaction ?
        </Typography>
        <Button
          onClick={() => handleOnProceedSaveTransactionClick()}
          variant="contained"
          style={{
            marginTop: 10,
            marginLeft: 10,
            backgroundColor: 'green',
          }}
        >
          <Typography variant="h5" sx={{ color: '#fff' }}>
            Confirm
          </Typography>
        </Button>
      </Box>
    </Modal>
  );
}
