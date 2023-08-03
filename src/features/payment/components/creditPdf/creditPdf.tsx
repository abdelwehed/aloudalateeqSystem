import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { CustomerInterface } from 'dummyData/customers';
import { SearchedOrderProduct } from 'features/orderPrepare/orderReducer';
import JsBarcode from 'jsbarcode';
import moment from 'moment';
import AloudAlAteeqLogo from '../../../../../assets/images/aloudAlateeqLogo.png';
import { styles } from './styles';

type pdfDocumentPropsType = {
  searchedProducts: Array<SearchedOrderProduct>;
  totalPrice: number;
  paymentInfos?: any;
  change: number;
  billNumber: string;
  customerInfos: CustomerInterface;
};

export const CreditPdf = (props: pdfDocumentPropsType) => {
  let systemDiscount: number = 0;
  let privateDiscount: number = 0;

  const basket = props?.searchedProducts?.map((el: SearchedOrderProduct) => {
    // in VERSION 1: if we have promotion such as solde, it is priorit than single product disount
    // in VERSION 2: set the greater discount
    const discount = el.promo?.value || el.reduction?.value || 0; // V1
    systemDiscount += discount.value || 0;

    privateDiscount += el.specialDiscount || 0;

    const netQuantityDependant = (el.productOrderQuantity || 0) * el.sellPrice;

    const promotion = discount + el.specialDiscount;
    const productNet =
      promotion !== 0
        ? (netQuantityDependant * (100 - promotion)) / 100
        : netQuantityDependant;

    return {
      ...el,
      netToPay: productNet,
    };
  });

  const paymentInformations = props.paymentInfos;

  let canvas;
  canvas = document.createElement('canvas');
  JsBarcode(canvas, props.billNumber.slice(-4));
  const barcode = canvas.toDataURL();

  function renderPaymentDetails() {
    if (!paymentInformations) {
      return null;
    }

    return (
      <View style={{ marginTop: 10 }}>
        <Text style={{ paddingVertical: 5 }}>Avoir {props?.totalPrice}</Text>
      </View>
    );
  }

  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View style={styles.section1}>
          <Image style={styles.logo} src={AloudAlAteeqLogo} />
          <Image style={styles.bareCode} src={barcode} />

          <View style={styles.billTop}>
            <Text style={styles.text}>Branch: Tawar Mall credit, avoir</Text>
            <Text style={styles.text}>Credit Number: {props.billNumber}</Text>
            <Text style={styles.text}>
              Date: {moment().format('HH:mm:SS DD/MM/YYYY')}
            </Text>
            {paymentInformations?.client && (
              <Text style={{ paddingVertical: 5 }}>
                {paymentInformations?.client}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section2}>
          <View style={styles.divider} />

          <View style={styles.detailsTableTitles}>
            <Text style={styles.typeText}>Type</Text>
            <Text style={styles.weightText}>Weight</Text>
            <Text style={styles.priceText}>Price</Text>
            <Text style={styles.netText}>Net</Text>
          </View>

          <View style={styles.divider} />

          {basket.map((el, i) => (
            <View key={i} style={styles.detailsTableContent}>
              <Text wrap={true} style={{ width: '45%', textAlign: 'left' }}>
                {el.name}
              </Text>
              <Text wrap={true} style={{ width: '20%', textAlign: 'center' }}>
                {el.productOrderVariant.variant}
              </Text>
              <Text wrap={true} style={{ width: '20%', textAlign: 'center' }}>
                {el.sellPrice}
              </Text>
              <Text wrap={true} style={{ width: '20%', textAlign: 'center' }}>
                {el.netToPay}
              </Text>
            </View>
          ))}

          <View style={[styles.divider, { marginTop: 10 }]} />

          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 5 }}>
              Total {props?.totalPrice}
            </Text>
            <Text style={{ paddingVertical: 5 }}>
              System discount {systemDiscount}
            </Text>
            <Text style={{ paddingVertical: 5 }}>
              Private discount {privateDiscount}
            </Text>
          </View>

          <View style={[styles.divider, { marginTop: 10 }]} />

          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 5 }}>Net {props?.totalPrice}</Text>
            {/* re activate after developing the algorithm responsible for transforming digits into text */}
            {/* <Text style={{ paddingVertical: 5 }}>five thousand and fifty</Text> */}
          </View>

          <View style={[styles.divider, { marginTop: 10 }]} />

          {renderPaymentDetails()}

          <View style={[styles.divider, { marginTop: 10 }]} />

          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 5 }}>
              This ticket can not be refunded or exchanged
            </Text>
            {props.customerInfos && (
              <Text>
                Client: {props.customerInfos.firstName}{' '}
                {props.customerInfos.lastName}
              </Text>
            )}
            <Text style={{ paddingVertical: 5 }}>
              Seller 04486 Chiheb Batnini
            </Text>
          </View>

          <View style={[styles.divider, { marginTop: 10 }]} />

          <View
            style={{
              marginTop: 10,
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
