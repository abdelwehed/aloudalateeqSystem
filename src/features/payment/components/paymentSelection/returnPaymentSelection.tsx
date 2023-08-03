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
import { CreditPdf } from '../creditPdf/creditPdf';
import { generateBillNumber } from '../paymentBill/utils/billNumberGenerator';
import { getBillProducts, getPaymenMethodsUsed } from '../paymentUtils';

export function ReturnPaymentSelection(props: any) {
  const [isReturnPaymentLoading, setIsReturnPaymentLoading] =
    useState<boolean>(false);
  const [isReturnPaymentSuccess, setIsReturnPaymentSuccess] =
    useState<boolean>(false);
  const [returnBillData, setReturnBillData] = useState<any>(null);

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

  function getPaymentData() {
    if (props.returnPaymentTypeSelected === 'credit') {
      return {
        credit: { value: 0, client: null },
      };
    }

    if (props.returnPaymentTypeSelected === 'cash') {
      return {
        cash: { change: 0, paid: totalOrder },
      };
    }

    if (props.returnPaymentTypeSelected === 'cb') {
      const cardReturnPayment = {
        type: null, // récuperer cet info depuis la facture de retour du client
        authoriationNumber: null, // récuperer cet info depuis la facture de retour du client
        holderName: null, // récuperer cet info depuis la facture de retour du client
        paid: totalOrder,
      };

      return {
        cards: [cardReturnPayment],
      };
    }

    return null;
  }

  async function handleOnProceedReturnPaymentClick() {
    setIsReturnPaymentLoading(true);

    const lastBillAdded = await firebase.getLastBill();

    const lastBillNumber = lastBillAdded.lastBill
      ? lastBillAdded.lastBill.billNumber.slice(8) * 1
      : 0;
    const generatedBillNumber = generateBillNumber(lastBillNumber);
    const billPayments = getPaymenMethodsUsed(change, getPaymentData());

    const billObject = {
      dateAdded: new Date().getTime(),
      branch: 'Tawar Mall',
      billNumber: generatedBillNumber,
      products: getBillProducts(searchedProducts),
      payments: billPayments,
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
      setIsReturnPaymentLoading(false);
      // change success to an object containing the bill data needed to display pdf
      setIsReturnPaymentSuccess(true);
      setReturnBillData(billObject);

      // update product quantity
      billObject.products.map(async (el: any) => {
        await firebase.editProductQuantity(el.idProduct, el);
      });
    } catch (e) {
      console.log('catch error', { e });

      setIsReturnPaymentLoading(false);
      // ...
      // handle payment error
      // ...
    }
  }

  function displayPdfDocumnet() {
    // VERSION 2
    /*     if (props.returnPaymentTypeSelected === 'credit') {
      return (
        <CreditPdf
          searchedProducts={searchedProducts}
          totalPrice={totalOrder}
          paymentInfos={getPaymentData()}
          change={change}
          billNumber={returnBillData.billNumber}
          customerInfos={customerInfos}
        />
      );
    } */

    return (
      <MyDocument
        paymentInfos={getPaymentData()}
        change={change}
        billData={returnBillData}
      />
    );
  }

  if (isReturnPaymentLoading) {
    return (
      <Modal
        open={() => {
          setIsReturnPaymentSuccess(false);
          setReturnBillData(null);
          props.closeBillModal();
        }}
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

  if (isReturnPaymentSuccess) {
    return (
      <Modal
        open={props.billModalOpen}
        onClose={() => {
          setIsReturnPaymentSuccess(false);
          setReturnBillData(null);
          props.closeBillModal();
        }}
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
      open={props.billModalOpen}
      onClose={() => {
        setIsReturnPaymentSuccess(false);
        setReturnBillData(null);
        props.closeBillModal();
      }}
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
          Do you really want to return with the{' '}
          {props.returnPaymentTypeSelected} ?
        </Typography>
        <Button
          onClick={() => handleOnProceedReturnPaymentClick()}
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
