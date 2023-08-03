import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Button,
  CircularProgress,
  Grid,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from 'renderer/hooks';
import { RootState } from 'renderer/store';
import { CardPayment } from './cardPayment';
import { CashPayment } from './cashPayment';
import { CheckPayment } from './checkPayment';
import { CouponPayment } from './couponPayment';
import { setChange, setRemaining } from 'features/payment/paymentReducer';
import { MyDocument } from 'features/payment/components/paymentBill/paymentBill';
import { generateBillNumber } from '../paymentBill/utils/billNumberGenerator';
import firebase from 'firebase/firebase';
import { SearchedOrderProduct } from 'features/orderPrepare/orderReducer';
import { billPayment } from '../paymentBill/types/billType';
import { getBillProducts, getPaymenMethodsUsed } from '../paymentUtils';

export type cardPaymentDataType = {
  type?: string | null;
  number?: string | null;
  authoriationNumber?: string | null;
  holderName?: string | null;
  paid: number;
};

export type cashPaymentDataType = {
  change: string | null;
  paid: number;
};

export type checkPaymentDataType = {
  checkNumber?: string | null;
  bank?: string | null;
  checkDate?: any;
  checkHolder?: string | null;
  paid?: number;
};

export type couponPaymentDataType = {
  couponNumber?: string | null;
  couponValue?: number | null;
  couponDate: any;
  paid?: number;
};

export const defaultCardPaymentData = {
  type: null,
  authoriationNumber: null,
};

export default function PaymentSelection(props: any) {
  // case of single card payment
  const [card, setCard] = useState<cardPaymentDataType | null>(null);
  const [cash, setCash] = useState<cashPaymentDataType | null>(null);
  const [check, setCheck] = useState<checkPaymentDataType | null>(null);
  const [coupon, setCoupon] = useState<couponPaymentDataType | null>(null);
  // case of multi payment
  const [multiCard1, setMultiCard1] = useState<cardPaymentDataType | null>(
    null
  );
  const [multiCard2, setMultiCard2] = useState<cardPaymentDataType | null>(
    null
  );
  const [multiCard3, setMultiCard3] = useState<cardPaymentDataType | null>(
    null
  );
  const [multiCash, setMultiCash] = useState<cashPaymentDataType | null>(null);
  const [multiCheck, setMultiCheck] = useState<checkPaymentDataType | null>(
    null
  );
  const [multiCoupon, setMultiCoupon] = useState<couponPaymentDataType | null>(
    null
  );
  // other payment notes
  const [otherNotes1, setOtherNotes1] = useState<string | null>(null);
  const [otherNotes2, setOtherNotes2] = useState<string | null>(null);
  // payment states
  const [isPaymentDisabled, setIsPaymentDisabled] = useState<boolean>(true);
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const [billData, setBillData] = useState<any>(null);

  // custom hooks
  const dispatch = useAppDispatch();

  const searchedProducts = useAppSelector(
    (state: RootState) => state.products.searchedProducts
  );

  const totalOrder = useAppSelector(
    (state: RootState) => state.payment.totalOrder
  );
  const remainingToPay = useAppSelector(
    (state: RootState) => state.payment.remaining
  );

  const change = useAppSelector((state: RootState) => state.payment.change);
  const staffConnected = useAppSelector(
    (state: RootState) => state.staff.staffInfos
  );

  const paymentTypeSelected = props.paymentTypeSelected;

  async function handleOnProceedPaymentClick() {
    setIsPaymentLoading(true);

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

      setIsPaymentLoading(false);
      setIsPaymentSuccess(true);
      setBillData(billObject);

      // update product quantity
      billObject.products.map(async (el: any) => {
        await firebase.editProductQuantity(el.idProduct, el);
      });
    } catch (e) {
      console.log('catch error heerr', { e });

      setIsPaymentLoading(false);
      // ...
      // handle payment error
      // ...
    }
  }

  function handleOnCheckPaymentClick() {
    const paymentData = getPaymentData();

    let paidCards: number = 0;

    paymentData?.cards
      ?.filter((el: any) => el !== null)
      ?.map((element: any) => (paidCards += element?.paid || 0));

    const paidCash = paymentData?.cash?.paid || 0;
    const paidCheck = paymentData?.check?.paid || 0;
    const paidCoupon = paymentData?.coupon?.paid || 0;
    const totalPaid = paidCards + paidCash + paidCheck + paidCoupon;

    if (paymentTypeSelected === 'cb') {
      if (totalPaid !== totalOrder) {
        setIsPaymentDisabled(true);
        return;
      }
      setIsPaymentDisabled(false);
      return;
    }

    /* handle change */
    if (
      paymentTypeSelected === 'cash' ||
      (paymentTypeSelected === 'multi' && (multiCash?.paid || 0) > 0)
    ) {
      if (totalPaid > totalOrder) {
        const change = Math.abs(totalOrder - totalPaid);
        dispatch(setChange(change));
      } else {
        dispatch(setChange(0));
      }
    }
    /* handle change */

    /* handle remaining */
    const remaining = totalOrder - totalPaid;

    if (remaining <= 0) {
      dispatch(setRemaining(0));
    }
    if (remaining > 0) {
      dispatch(setRemaining(remaining));
    }
    /* handle remaining */

    if (paymentTypeSelected === 'cash' || paymentTypeSelected === 'multi') {
      if ((remaining || 0) <= 0) {
        setIsPaymentDisabled(false);
      }

      if (remaining > 0) {
        setIsPaymentDisabled(true);
      }
    }
  }

  function getPaymentData() {
    if (paymentTypeSelected === 'multi') {
      return {
        cards: [multiCard1, multiCard2, multiCard3],
        cash: multiCash,
        check: multiCheck,
        coupon: multiCoupon,
        notes: `${otherNotes1} -  ${otherNotes2}`,
      };
    }

    return {
      cards: [card],
      cash,
      check,
      coupon,
      notes: `${otherNotes1} -  ${otherNotes2}`,
    };
  }

  function handleOtherNotesChange(e: any, index: number) {
    const value = e.target.value;

    switch (index) {
      case 0:
        setOtherNotes1(value);
        break;
      case 1:
        setOtherNotes2(value);
        break;
      default:
        console.log('other does not exist');
    }
  }

  function getOtherNotesValue(id: number): string | null {
    switch (id) {
      case 0:
        console.log({ otherNotes1 });
        return otherNotes1;
      case 1:
        return otherNotes2;
      default:
        return null;
    }
  }

  /**
   * Cette méthod gére l'affichage du forme de paiement (card, cash, multi, etc...)
   * @returns {JSX.Element}
   */
  function renderPaymentComponentByType(): JSX.Element | null {
    switch (props.paymentTypeSelected) {
      case 'cb':
        return (
          <CardPayment
            setCard={(card: any) => {
              setCard(card);
              setCash(null);
              setCheck(null);
              setCoupon(null);
            }}
          />
        );
      case 'cash':
        return (
          <CashPayment
            isRemainingDisabled={paymentTypeSelected !== 'multi'}
            change={change}
            setCash={(cash: any) => {
              setCash(cash);
              setCard(null);
              setCheck(null);
              setCoupon(null);
            }}
          />
        );
      case 'bankCheck':
        return (
          <CheckPayment
            setCheck={(checkNumber: any) => {
              setCheck(checkNumber);
              setCash(null);
              setCard(null);
              setCoupon(null);
            }}
          />
        );
      case 'coupon':
        return (
          <CouponPayment
            setCoupon={(couponNumber: any) => {
              setCoupon(couponNumber);
              setCheck(null);
              setCash(null);
              setCard(null);
            }}
          />
        );
      case 'multi':
        return (
          <Grid
            container
            flexDirection={'row'}
            alignItems="flex-start"
            justifyContent="space-around"
          >
            <Grid
              container
              xs={4}
              flexDirection="column"
              alignItems="center"
              justifyContent={'center'}
              style={{ marginTop: 30 }}
            >
              <Typography variant="h4" sx={{}}>
                {'Card 1'}
              </Typography>

              <CardPayment setCard={(card: any) => setMultiCard1(card)} />
            </Grid>

            <Grid
              container
              xs={4}
              flexDirection="column"
              alignItems="center"
              justifyContent={'center'}
              style={{ marginTop: 30 }}
            >
              <Typography variant="h4" sx={{}}>
                {'Card 2'}
              </Typography>
              <CardPayment setCard={(card: any) => setMultiCard2(card)} />
            </Grid>

            <Grid
              container
              xs={4}
              flexDirection="column"
              alignItems="center"
              justifyContent={'center'}
              style={{ marginTop: 30 }}
            >
              <Typography variant="h4" sx={{}}>
                {'Card 3'}
              </Typography>
              <CardPayment setCard={(card: any) => setMultiCard3(card)} />
            </Grid>

            <Grid
              container
              xs={4}
              alignItems="center"
              justifyContent={'center'}
              style={{ marginTop: 30 }}
            >
              <Typography variant="h4" sx={{}}>
                {'Cash'}
              </Typography>
              <CashPayment
                change={change}
                setCash={(cash: any) => setMultiCash(cash)}
              />
            </Grid>

            <Grid
              container
              xs={4}
              alignItems="center"
              justifyContent={'center'}
              style={{ marginTop: 30 }}
            >
              <Typography variant="h4" sx={{}}>
                {'Coupon'}
              </Typography>
              <CouponPayment
                setCoupon={(couponNumber: any) => setMultiCoupon(couponNumber)}
              />
            </Grid>

            <Grid
              container
              xs={4}
              alignItems="center"
              justifyContent={'center'}
              style={{ marginTop: 30 }}
            >
              <Typography variant="h4" sx={{}}>
                {'Check'}
              </Typography>
              <CheckPayment
                setCheck={(checkNumber: any) => setMultiCheck(checkNumber)}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  }

  function handlePaymentScreenClose() {
    props.handleCloseModal();
    setIsPaymentDisabled(true);
    setIsPaymentSuccess(false);
    setIsPaymentLoading(false);
    setCoupon(null);
    setCheck(null);
    setCash(null);
    setCard(null);
    setMultiCard1(null);
    setMultiCard2(null);
    setMultiCard3(null);
    setMultiCash(null);
    setMultiCheck(null);
    setMultiCoupon(null);
    dispatch(setRemaining(0));
    dispatch(setChange(0));
  }

  /* START: cette partie affiche la facture après un payment success */
  if (isPaymentSuccess) {
    return (
      <Modal
        open={props.isPaymentModalOpen}
        onClose={handlePaymentScreenClose}
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
              paymentInfos={getPaymentData()}
              change={change}
              billData={billData}
            />
          </PDFViewer>
        </Box>
      </Modal>
    );
  }
  /* END */

  /* START: cette partie affiche un spinner quand le paiement est loading */
  if (isPaymentLoading) {
    return (
      <Modal
        open={props.isPaymentModalOpen}
        onClose={handlePaymentScreenClose}
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
  /* END */

  return (
    <div>
      <Modal
        open={props.isPaymentModalOpen}
        onClose={handlePaymentScreenClose}
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
          {/* START: cette partie affiche les deux champs total et reste à payer */}
          <Grid
            container
            flexDirection={'row'}
            justifyContent="center"
            style={{}}
          >
            <Grid item xs={4} style={{}}>
              <TextField
                autoComplete="given-name"
                name="Type"
                required
                disabled
                fullWidth
                id="otherInfos"
                placeholder="Total amount"
                label="Total amount"
                variant="outlined"
                autoFocus
                onChange={(e) => {}}
                value={totalOrder}
              />
            </Grid>
            <Grid item xs={4} style={{}}>
              <TextField
                autoComplete="given-name"
                name="Type"
                required
                disabled
                fullWidth
                id="remaining"
                placeholder="Remaining to pay"
                label="Remaining to pay"
                variant="outlined"
                autoFocus
                onChange={(e) => {}}
                value={remainingToPay}
              />
            </Grid>
          </Grid>
          {/* END */}

          <Grid container>{renderPaymentComponentByType()}</Grid>

          {/* START: cette partie affiche les champs further notes */}
          <Grid
            container
            flexDirection={'column'}
            alignItems={'center'}
            style={{
              marginTop: 20,
            }}
          >
            <Typography variant="h4" sx={{}}>
              Further notes:
            </Typography>

            <Grid container flexDirection={'row'} alignItems={'center'}>
              {[1, 2].map((el, id) => {
                return (
                  <Grid
                    container
                    justifyContent="center"
                    xs={6}
                    style={{ padding: 5 }}
                  >
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={1}
                      name="OtherInfos"
                      required
                      fullWidth
                      id="otherInfos"
                      placeholder="Other infos"
                      variant="outlined"
                      autoFocus
                      onChange={(e) => handleOtherNotesChange(e, id)}
                      value={getOtherNotesValue(id)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          {/* END */}

          {/* START: cette partie affiche les deux boutons check (pour vérifier l'exactitude de paiement) et proceed (pour confirmer un paiement) */}
          <Grid container justifyContent={'center'}>
            <Button
              onClick={() => handleOnCheckPaymentClick()}
              color="secondary"
              variant="contained"
              style={{ marginTop: 10, marginLeft: 10 }}
            >
              <Typography variant="h5" sx={{ color: '#fff' }}>
                Check
              </Typography>
            </Button>

            <Button
              onClick={() => handleOnProceedPaymentClick()}
              variant="contained"
              disabled={isPaymentDisabled}
              style={{
                marginTop: 10,
                marginLeft: 10,
                backgroundColor: isPaymentDisabled ? 'gray' : 'green',
              }}
            >
              <Typography variant="h5" sx={{ color: '#fff' }}>
                Proceed
              </Typography>
            </Button>
          </Grid>
          {/* END */}
        </Box>
      </Modal>
    </div>
  );
}
