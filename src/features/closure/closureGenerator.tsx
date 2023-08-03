import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { BillType } from 'features/payment/components/paymentBill/types/billType';
import moment from 'moment';
import { Fragment } from 'react';
import JsBarcode from 'jsbarcode';
import AloudAlAteeqLogo from '../../../assets/images/aloudAlateeq_ArEn.png';
import { styles } from './styles';

const today = moment();
// prettier-ignore
const shiftOpenTime = moment().set({
  'year': today.year(),
  'month': today.month(),
  'date': today.date(),
  'hour': 10,
  'minute': 0,
  'second': 0,
});
const cachBoxOpenDate = moment(shiftOpenTime, 'DD-MM-YYYY HH:mm:ss').format(
  'DD-MM-YYYY HH:mm:ss'
);

type closureGeneratorPropsType = {
  bills: Array<BillType>;
  boxStartCash: number;
  reportTitle: string;
};

export const Closure = (props: closureGeneratorPropsType) => {
  const taxesValue = 0; // VERSION 2: dynamiser when adding taxes

  const branch = props.bills[0].branch;

  function getReturnTicketsNumber() {
    let returnTicketsNumber: number = 0;
    let productReturnsQuantity: number = 0;

    props.bills.map((bill) => {
      if (bill.totalNet < 0) {
        returnTicketsNumber += 1;
      }

      bill.products.map((product) => {
        if (product.quantity < 0) {
          productReturnsQuantity += product.quantity;
        }
      });
    });

    return {
      returnTicketsNumber,
      productReturnsQuantity,
    };
  }

  function getPaymentMethodCellText() {
    let payments = {
      totalCardsValue: 0,
      totalCardsVisa: 0,
      totalCardsNaps: 0,
      totalCardsMc: 0,
      totalCardsAmex: 0,
      numberOfCardsPayments: 0,
      totalCashValue: 0,
      numberOfCashPayments: 0,
      totalCheckValue: 0,
      numberOfCheckPayments: 0,
      totalCouponValue: 0,
      numberOfCouponPayment: 0,
    };

    props.bills.map((bill: BillType) => {
      bill.payments.map((payment) => {
        if (payment.paymentMethod.name === 'card') {
          payments = {
            ...payments,
            totalCardsValue: payments.totalCardsValue + payment.value,
            numberOfCardsPayments: payments.numberOfCardsPayments + 1,
            totalCardsVisa:
              payment.paymentMethod.type === 'visa'
                ? payments.totalCardsVisa + payment.value
                : payments.totalCardsVisa,
            totalCardsNaps:
              payment.paymentMethod.type === 'naps'
                ? payments.totalCardsNaps + payment.value
                : payments.totalCardsNaps,
            totalCardsMc:
              payment.paymentMethod.type === 'mc'
                ? payments.totalCardsMc + payment.value
                : payments.totalCardsMc,
            totalCardsAmex:
              payment.paymentMethod.type === 'amex'
                ? payments.totalCardsAmex + payment.value
                : payments.totalCardsAmex,
          };
        }
        if (payment.paymentMethod.name === 'cash') {
          const cashChange = payment.change || 0;
          payments = {
            ...payments,
            totalCashValue:
              payments.totalCashValue + payment.value - cashChange,
            numberOfCashPayments: payments.numberOfCashPayments + 1,
          };
        }
        if (payment.paymentMethod.name === 'check') {
          payments = {
            ...payments,
            totalCheckValue: payments.totalCheckValue + payment.value,
            numberOfCheckPayments: payments.numberOfCheckPayments + 1,
          };
        }
        if (payment.paymentMethod.name === 'coupon') {
          payments = {
            ...payments,
            totalCouponValue: payments.totalCouponValue + payment.value,
            numberOfCouponPayment: payments.numberOfCouponPayment + 1,
          };
        }
      });
    });

    return payments;
  }
  const paymentMethodsUsed = getPaymentMethodCellText();

  const cashInventoryPerDay =
    props.boxStartCash + paymentMethodsUsed.totalCashValue;

  const totalRevenu =
    paymentMethodsUsed.totalCardsValue +
    paymentMethodsUsed.totalCashValue +
    paymentMethodsUsed.totalCheckValue +
    paymentMethodsUsed.totalCouponValue;

  let canvas;
  const lastReportNumber = '0002';
  canvas = document.createElement('canvas');
  JsBarcode(canvas, lastReportNumber); // dynamiser quand on décide d'enregistrer
  const barcode = canvas.toDataURL();

  return (
    <Document>
      <Page size="A2" style={styles.page}>
        {/* This section displays the top bloc of the report */}
        <View style={styles.section1}>
          <Image style={styles.logo} src={AloudAlAteeqLogo} />
          <Text style={styles.text}>{props.reportTitle}</Text>
          <Text style={styles.text}>{today.format('DD-MM-YYYY')}</Text>
          <Image style={styles.bareCode} src={barcode} />

          <View style={styles.billTop}>
            <Text style={styles.text}>Branch: {branch}</Text>
            <Text style={styles.text}>
              {`From: ${cachBoxOpenDate} -> To: ${today.format(
                'DD-MM-YYYY HH:mm:ss'
              )}`}
            </Text>
          </View>
        </View>

        {/* This section concerns the payment methods details of the report */}
        <View style={styles.section2}>
          <View style={styles.divider} />

          <View style={styles.detailsTableTitles}>
            <Text style={styles.cashText}>
              Cash: {paymentMethodsUsed.totalCashValue}
            </Text>

            <Fragment>
              <View style={styles.verticalDivider} />
              <Text style={styles.checkText}>
                Check: {paymentMethodsUsed.totalCheckValue}
              </Text>
            </Fragment>

            <Fragment>
              <View style={styles.verticalDivider} />
              <Text style={styles.checkText}>
                Coupon: {paymentMethodsUsed.totalCouponValue}
              </Text>
            </Fragment>
          </View>

          <View style={[styles.dashedDivider, { marginTop: 10 }]} />

          <View style={styles.detailsTableTitles}>
            {paymentMethodsUsed.totalCardsVisa !== 0 && (
              <Fragment>
                <Text style={styles.cashText}>
                  Visa: {paymentMethodsUsed.totalCardsVisa}
                </Text>
                <View style={styles.verticalDivider} />
              </Fragment>
            )}
            {paymentMethodsUsed.totalCardsNaps !== 0 && (
              <Text style={styles.checkText}>
                Naps: {paymentMethodsUsed.totalCardsNaps}
              </Text>
            )}
          </View>

          <View style={[styles.dashedDivider, { marginTop: 10 }]} />

          <View style={styles.detailsTableTitles}>
            {paymentMethodsUsed.totalCardsMc !== 0 && (
              <Fragment>
                <Text style={styles.cashText}>
                  Master-card: {paymentMethodsUsed.totalCardsMc}
                </Text>
                <View style={styles.verticalDivider} />
              </Fragment>
            )}
            {paymentMethodsUsed.totalCardsAmex !== 0 && (
              <Text style={styles.checkText}>
                Amex: {paymentMethodsUsed.totalCardsAmex}
              </Text>
            )}
          </View>

          <View style={[styles.dashedDivider, { marginTop: 10 }]} />

          <View style={styles.detailsTableTitles}>
            <Text style={styles.cashText}>Collecting: {totalRevenu}</Text>
            {/* implement delayed in VERSION 2 */}
            {/*
                         <View style={styles.verticalDivider} />
           
            <Text style={styles.checkText}>Delayed: 0</Text>
              */}
          </View>

          <View style={[styles.divider, { marginTop: 50 }]} />

          <View style={styles.detailsTableTitles}>
            <Text style={styles.cashText}>
              Tickets Quantity: {props.bills.length}
            </Text>
            <View style={styles.verticalDivider} />
            <Text style={styles.checkText}>
              Return tickets Quantity:{' '}
              {getReturnTicketsNumber().returnTicketsNumber}
            </Text>
          </View>
        </View>

        {/* This section displays the sales net and taxes*/}
        <View style={styles.section2}>
          <View style={styles.divider} />

          <View style={styles.detailsTableTitles}>
            <Text style={[styles.cashText, { width: '100%', paddingLeft: 20 }]}>
              Sales net (with taxes): {totalRevenu}
            </Text>
          </View>

          <View style={styles.dashedDivider} />

          <View style={styles.detailsTableTitles}>
            <Text style={[styles.cashText, { width: '100%', paddingLeft: 20 }]}>
              Taxes: {taxesValue}
            </Text>
          </View>

          <View style={styles.dashedDivider} />

          <View style={styles.detailsTableTitles}>
            <Text style={[styles.cashText, { width: '100%', paddingLeft: 20 }]}>
              Sales net (without taxes): {totalRevenu}
            </Text>
          </View>
        </View>

        {/* This section displays the returns or substitution of one or more product */}
        <View style={styles.section2}>
          <View style={styles.divider} />

          <View style={styles.detailsTableTitles}>
            <Text style={[styles.cashText, { width: '100%', paddingLeft: 20 }]}>
              Returns: {getReturnTicketsNumber().productReturnsQuantity}
            </Text>
          </View>

          <View style={styles.dashedDivider} />

          {/* VERSION 2: soit on le laisse, soit on le supprime du rapport */}
          <View style={styles.detailsTableTitles}>
            <Text style={[styles.cashText, { width: '100%', paddingLeft: 20 }]}>
              Substitution: 0
            </Text>
          </View>
        </View>

        {/* This section displays the inventory bloc of the report */}
        <View style={styles.section2}>
          <View style={styles.divider} />

          <View style={styles.detailsTableTitles}>
            <Text style={styles.cashText}>Box: {props.boxStartCash}</Text>
            <View style={styles.verticalDivider} />
            <Text style={styles.checkText}>
              In: {paymentMethodsUsed.totalCashValue}
            </Text>
          </View>

          <View style={[styles.dashedDivider, { marginTop: 10 }]} />

          <View style={styles.detailsTableTitles}>
            <Text style={[styles.cashText, { width: '100%', paddingLeft: 20 }]}>
              Funds: {cashInventoryPerDay}
            </Text>
          </View>

          <View style={[styles.dashedDivider, { marginTop: 10 }]} />

          <View style={styles.detailsTableTitles}>
            {cashInventoryPerDay !== 0 && (
              <Text style={styles.cashText}>
                Cash inventory: {cashInventoryPerDay}
              </Text>
            )}
            <View style={styles.verticalDivider} />
            {paymentMethodsUsed.totalCardsValue !== 0 && (
              <Text style={styles.checkText}>
                Card inventory: {paymentMethodsUsed.totalCardsValue}
              </Text>
            )}
          </View>

          <View style={styles.detailsTableTitles}>
            {paymentMethodsUsed.totalCheckValue !== 0 && (
              <Text style={styles.cashText}>
                Check inventory: {paymentMethodsUsed.totalCheckValue}
              </Text>
            )}
            <View style={styles.verticalDivider} />
            {paymentMethodsUsed.totalCouponValue !== 0 && (
              <Text style={styles.checkText}>
                Coupon inventory: {paymentMethodsUsed.totalCouponValue}
              </Text>
            )}
          </View>

          <View style={[styles.dashedDivider, { marginTop: 10 }]} />

          <View style={styles.detailsTableTitles}>
            <Text style={styles.cashText}>Cash Diffrence: 0</Text>
            <View style={styles.verticalDivider} />
            <Text style={styles.checkText}>Card Diffrence: 0</Text>
          </View>

          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ paddingVertical: 5 }}>
              Thanks for choosing AL OUD AL ATEEQ
            </Text>
            <Text style={{ paddingVertical: 5 }}>
              Customer service center +974.7777.7482
            </Text>
            <Text style={{ paddingVertical: 5 }}>www.aloudalateeq.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
