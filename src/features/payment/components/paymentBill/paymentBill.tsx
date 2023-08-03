import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { CustomerInterface } from 'dummyData/customers';
import JsBarcode from 'jsbarcode';
import moment from 'moment';
import AloudAlAteeqLogo from '../../../../../assets/images/aloudAlateeqLogo.png';
import { styles } from './styles';
import { billProductType } from './types/billType';

type pdfDocumentPropsType = {
  totalPrice?: number;
  paymentInfos?: any;
  change: number;
  billNumber?: string;
  customerInfos?: CustomerInterface;
  billData?: any;
};

export const MyDocument = (props: pdfDocumentPropsType) => {
  const getProductDiscount = () => {
    let systemDiscount: number = 0;
    let privateDiscount: number = 0;

    props?.billData?.products?.map((el: billProductType) => {
      // in VERSION 1: if we have promotion such as solde, it is priorit than single product disount
      // in VERSION 2: set the greater discount
      systemDiscount = el.promo || el.reduction || 0; // V1
      privateDiscount += el.privateDiscount || 0;
    });

    return {
      systemDiscount,
      privateDiscount,
    };
  };

  const paymentInformations = props.paymentInfos;
  let paidCards: number = 0;

  paymentInformations?.cards
    ?.filter((el: any) => el !== null)
    ?.map((element: any) => (paidCards += element?.paid || 0));

  const paidCash = paymentInformations?.cash?.paid || 0;
  const paidCheck = paymentInformations?.check?.paid || 0;
  const paidCoupon = paymentInformations?.coupon?.paid || 0;
  const totalPaid = paidCards + paidCash + paidCheck + paidCoupon;

  let canvas;
  canvas = document.createElement('canvas');
  JsBarcode(canvas, props.billData?.billNumber.slice(-4));
  const barcode = canvas.toDataURL();

  function renderPaymentDetails() {
    if (!paymentInformations) {
      return null;
    }

    return (
      <View style={{ marginTop: 10 }}>
        {props.billData?.payments?.map((el: any) => {
          const cardType: string | null =
            el.paymentMethod.name === 'card' ? el.paymentMethod.type : null;
          return (
            <Text style={{ paddingVertical: 5 }}>
              {el.paymentMethod.name} {cardType} {el.value}
            </Text>
          );
        })}
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
            <Text style={styles.text}>Branch: {props.billData?.branch}</Text>
            <Text style={styles.text}>
              Bill Number: {props.billData?.billNumber}
            </Text>
            <Text style={styles.text}>
              Date:{' '}
              {moment(props.billData?.dateAdded).format('HH:mm:SS DD/MM/YYYY')}
            </Text>
          </View>
        </View>

        <View style={styles.section2}>
          <View style={styles.divider} />

          {/* products table header */}
          <View style={styles.detailsTableTitles}>
            <Text style={styles.typeText}>Type</Text>
            <Text style={styles.variantText}>Variant</Text>
            <Text style={styles.priceText}>Quantity</Text>
            <Text style={styles.priceText}>Price</Text>
          </View>

          <View style={styles.divider} />

          {/* products table content */}
          {props.billData?.products?.map((el: billProductType, i: number) => {
            // in VERSION 1: if we have promotion such as solde, it is priorit than single product disount
            // in VERSION 2: set the greater discount
            const systemDiscount = el.promo || el.reduction || 0; // V1
            const privateDiscount = el.privateDiscount || 0;

            const netQuantityDependant = (el.quantity || 0) * el.sellPrice;

            const promotion = systemDiscount + privateDiscount;

            const productNet =
              promotion !== 0
                ? (netQuantityDependant * (100 - promotion)) / 100
                : netQuantityDependant;
            return (
              <View key={i} style={styles.detailsTableContent}>
                <Text wrap={true} style={{ width: '45%', textAlign: 'left' }}>
                  {el.name}
                </Text>
                <Text wrap={true} style={{ width: '20%', textAlign: 'center' }}>
                  {el.variant ? el.variant.variant : 'no variant'}
                </Text>
                <Text wrap={true} style={{ width: '20%', textAlign: 'center' }}>
                  {el.quantity}
                </Text>
                <Text wrap={true} style={{ width: '20%', textAlign: 'center' }}>
                  {productNet}
                </Text>
              </View>
            );
          })}

          <View style={[styles.divider, { marginTop: 10 }]} />

          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 5 }}>
              Total {props?.billData?.totalNet}
            </Text>
            <Text style={{ paddingVertical: 5 }}>
              System discount {getProductDiscount().systemDiscount} %
            </Text>
            <Text style={{ paddingVertical: 5 }}>
              Private discount {getProductDiscount().privateDiscount} %
            </Text>
          </View>

          <View style={[styles.divider, { marginTop: 10 }]} />

          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 5 }}>
              Net {props?.billData?.totalNet}
            </Text>
            {/* re activate after developing the algorithm responsible for transforming digits into text */}
            {/* <Text style={{ paddingVertical: 5 }}>five thousand and fifty</Text> */}
          </View>

          <View style={[styles.divider, { marginTop: 10 }]} />

          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 5 }}>Paid {totalPaid}</Text>
            {props.change !== 0 && (
              <Text style={{ paddingVertical: 5 }}>Change {props.change}</Text>
            )}
          </View>

          <View style={[styles.divider, { marginTop: 10 }]} />

          {renderPaymentDetails()}

          <View style={[styles.divider, { marginTop: 10 }]} />

          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 5 }}>
              Only the original invoice can be exchanged
            </Text>
            {props.customerInfos && (
              <Text>
                Client: {props.customerInfos.firstName}{' '}
                {props.customerInfos.lastName}
              </Text>
            )}
            {props?.billData?.staff && (
              <Text style={{ paddingVertical: 5 }}>
                Seller: {props?.billData?.staff?.code}
                {props?.billData?.staff?.displayName}
              </Text>
            )}
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
