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
    width: '60%',
    height: 120,
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
  dashedDivider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'dashed',
  },
  verticalDivider: {
    borderLeftColor: 'black',
    borderLeftWidth: 1,
  },
  detailsTableTitles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  cashText: {
    width: '40%',
    fontSize: 22,
    fontWeight: 'bold',
  },
  checkText: {
    width: '40%',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
