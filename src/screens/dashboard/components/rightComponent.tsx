import { Grid, Typography } from '@mui/material';
import { DashboardConfigProductButtons } from 'features/orderPrepare/components/DashboardConfigProductButtons/DashboardConfigProductButtons';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TempleHinduOutlinedIcon from '@mui/icons-material/TempleHinduOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchResultComponent from 'features/orderPrepare/components/SearchResultComponent';
import AddCustomerButton from 'features/addCustomer/components/addCustomerButton';
import AddCustomerForm from 'features/addCustomer/components/addCustomerForm';
import { useState } from 'react';
import { useAppSelector } from 'renderer/hooks';
import { RootState } from 'renderer/store';
import SearchCustomerComponent from 'features/addCustomer/components/SearchCustomerComponent';
import { ProductsInterface } from 'features/orderPrepare/types/productType';
import { SearchedOrderProduct } from 'features/orderPrepare/orderReducer';

export function RightComponent(props: any) {
  const [isUserFormOpen, setIsUserFormOpen] = useState<boolean>(false);
  const customerInfos = useAppSelector(
    (state: RootState) => state.customer.customerInfos
  );
  const [displaySearchCustomer, setDisplaySearchCustomer] =
    useState<boolean>(false);

  function onSearchCustomerByPhoneClick() {
    setDisplaySearchCustomer(true);
  }

  function onSearchCustomerClick() {
    setDisplaySearchCustomer(true);
  }

  const customerIconsData = [
    {
      id: 'icon1',
      component: LocalPhoneIcon,
      onPress: onSearchCustomerByPhoneClick,
    },
    {
      id: 'icon2',
      component: AssignmentOutlinedIcon,
      onPress: () => {},
    },
    {
      id: 'icon3',
      component: TempleHinduOutlinedIcon,
      onPress: onSearchCustomerClick,
    },
  ];

  return (
    <Grid
      className="dashboard-right"
      flexDirection="column"
      display="flex"
      alignItems="center"
    >
      {/* START: cette partie concerne la gestion d'un commande en cours (ajout, modification, etc...) */}
      <Grid container style={{ flex: 9 }}>
        <SearchResultComponent
          onItemSelect={(item: SearchedOrderProduct) => {
            props.onProductSelected(item);
          }}
        />
      </Grid>
      {/* END */}

      {/* START: cette partie concerne la gestion du client (ajout, recherche, etc...) */}
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
        {/* START: cette partie afficher les boutons de recherche de client (recherche par nom, prénom et numero de tél) */}
        <Grid>
          <DashboardConfigProductButtons data={customerIconsData} />
        </Grid>
        <SearchCustomerComponent
          isOpen={displaySearchCustomer}
          handleCloseModal={() => setDisplaySearchCustomer(false)}
        />
        {/* END */}

        {/* START: cette partie affiche les informations du client (nom, prénom et numéro de téléphone) */}
        <Typography color="green" fontSize="large">
          {customerInfos?.firstName} {customerInfos?.phoneNumber}
        </Typography>
        {/* END */}

        {/* START: cette partie concerne l'ajout d'un client (customer) */}
        <AddCustomerButton
          icon={PersonAddAlt1Icon}
          onButtonClick={(isFormOpen) => setIsUserFormOpen(isFormOpen)}
        />
        <AddCustomerForm
          isOpen={isUserFormOpen}
          handleCloseModal={() => setIsUserFormOpen(false)}
        />
        {/* END */}
      </Grid>
      {/* END */}
    </Grid>
  );
}
