import { Grid, Typography } from '@mui/material';
import { DashboardConfigProductButtons } from 'features/orderPrepare/components/DashboardConfigProductButtons/DashboardConfigProductButtons';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TempleHinduOutlinedIcon from '@mui/icons-material/TempleHinduOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchResultComponent from 'features/orderPrepare/components/SearchResultComponent';
import { ProductsInterface } from 'dummyData/products';
import AddUserButton from 'features/addCustomer/components/addCustomerButton';
import AddUserForm from 'features/addCustomer/components/addCustomerForm';
import { useState } from 'react';

export const customerIconsData = [
  {
    id: 'icon1',
    component: LocalPhoneIcon,
  },
  {
    id: 'icon2',
    component: AssignmentOutlinedIcon,
  },
  {
    id: 'icon3',
    component: TempleHinduOutlinedIcon,
  },
];

export function RightComponent(props: any) {
  const [isUserFormOpen, setIsUserFormOpen] = useState<boolean>(false);

  return (
    <Grid
      className="dashboard-right"
      flexDirection="column"
      display="flex"
      alignItems="center"
    >
      <Grid container style={{ flex: 9 }}>
        <SearchResultComponent
          onItemSelect={(item: ProductsInterface) => {
            props.onProductSelected(item);
          }}
        />
      </Grid>

      <Grid
        container
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        style={{
          backgroundColor: '#fff',
          marginTop: 10,
          borderRadius: 7,
          width: '100%',
        }}
      >
        <Grid>
          <DashboardConfigProductButtons data={customerIconsData} />
        </Grid>
        <Typography color="green" fontSize="large">
          خليفة أبو حمد
        </Typography>
        <AddUserButton
          icon={PersonAddAlt1Icon}
          onButtonClick={(isFormOpen) => setIsUserFormOpen(isFormOpen)}
        />
        <AddUserForm isOpen={isUserFormOpen} />
      </Grid>
    </Grid>
  );
}
