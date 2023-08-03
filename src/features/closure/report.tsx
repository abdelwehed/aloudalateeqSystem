import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { PDFViewer } from '@react-pdf/renderer';
import { Closure } from './closureGenerator';
import { RootState } from 'renderer/store';
import { useAppSelector } from 'renderer/hooks';
import { reportEnum } from './summary';

export function Report(props: any) {
  const bills = useAppSelector((state: RootState) => state.search.bills); // filter by date, get only today's bills

  const cashFund = useAppSelector((state: RootState) => state.cashFund.fund);

  function handleSummmaryScreenClose() {
    props.handleCloseReportModal();
  }

  const reportTitle =
    props.reportType === reportEnum.xReport ? 'X Report' : 'Daily Closure';

  return (
    <Modal
      open={props.isReportModalOpen}
      onClose={handleSummmaryScreenClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        sx={{
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '50%',
          height: '60%',
          padding: 2,
          bgcolor: 'background.paper',
        }}
      >
        <PDFViewer style={{ height: '100%', width: '100%' }}>
          <Closure
            bills={bills}
            boxStartCash={cashFund}
            reportTitle={reportTitle}
          />
        </PDFViewer>
      </Box>
    </Modal>
  );
}
