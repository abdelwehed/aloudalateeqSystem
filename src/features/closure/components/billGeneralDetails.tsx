import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHead, Typography } from '@mui/material';

type billGeneralDetaislProps = {
  staff: any;
  customer: any;
};

export default function BillGeneralDetails(props: billGeneralDetaislProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={'medium'}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    padding: 1,
                    bgcolor: (theme) =>
                      alpha(
                        theme.palette.primary.main,
                        theme.palette.action.activatedOpacity
                      ),
                  }}
                >
                  <Typography variant="h5">Details</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.staff && (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell
                    style={{ padding: 7 }}
                    component="th"
                    id={'billStaff'}
                    scope="row"
                  >
                    <Typography variant="h6">
                      Staff: {props.staff.displayName}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {/* in V2 */}
              {props.customer && (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell
                    style={{ padding: 7 }}
                    component="th"
                    id={'billCustomer'}
                    scope="row"
                  >
                    <Typography variant="h6">
                      Customer: {props.customer}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
