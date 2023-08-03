import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  section1: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section2: {
    marginTop: 30,
    width: '70%',
  },
  logo: {
    width: 220,
    height: 180,
    padding: 10,
  },
  bareCode: {
    width: 200,
    height: 80,
    padding: 10,
  },
  billTop: {
    marginTop: 10,
  },
  text: {
    paddingVertical: 5,
    fontSize: 22,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  detailsTableTitles: {
    flexDirection: 'row',
    padding: 10,
  },
  detailsTableContent: {
    flexDirection: 'row',
    paddingVertical: 5,
    marginTop: 5,
  },
  typeText: {
    width: '50%',
    fontSize: 22,
    fontWeight: 'bold',
  },
  weightText: {
    width: '20%',
    fontSize: 22,
    fontWeight: 'bold',
  },
  priceText: {
    width: '20%',
    fontSize: 22,
    fontWeight: 'bold',
  },
  netText: {
    width: '20%',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
