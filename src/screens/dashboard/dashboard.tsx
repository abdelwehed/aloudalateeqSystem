import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { LogoMixed } from 'components/LogoMixed';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import AloudAlAteeqLogoArEn from '../../../assets/images/aloudAlateeq_ArEn.png';
/* import { Bar } from 'react-chartjs-2';
import {
  dailySalesData,
  dailySalesOptions,
  monthlySalesData,
  monthlySalesOptions,
} from './constants'; */
import { DashboardConfigProductButtons } from 'features/orderPrepare/components/DashboardConfigProductButtons/DashboardConfigProductButtons';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { RightComponent } from './components/rightComponent';
import { LeftComponent } from './components/leftComponent';
import ModalComponent from 'components/Modal';
import { useEffect, useState } from 'react';
import { dashboardConfigButtonsList } from 'features/orderPrepare/components/DashboardConfigProductButtons/constants';
import PaymentSelection from 'features/payment/components/paymentSelection/paymentSelection';
import PaymentActionButton from 'components/PaymentActionButton';
import ReturnActionButton from 'components/ReturnActionButton';
import { Summary } from 'features/closure/summary';
import { useAppDispatch, useAppSelector } from 'renderer/hooks';
import { RootState } from 'renderer/store';
import { generateBillNumber } from 'features/payment/components/paymentBill/utils/billNumberGenerator';
import { ReturnPaymentSelection } from 'features/payment/components/paymentSelection/returnPaymentSelection';
import StaffList from 'features/staffLogin/components/staffList';
import { AdminActions } from 'features/admin/adminActions';
import firebase from 'firebase/firebase';
import { ProductsInterface } from 'features/orderPrepare/types/productType';
import {
  setCategories,
  setCollections,
  setProducts,
  setSuppliers,
  setVariants,
} from 'features/search/searchReducer';
import { SearchedOrderProduct } from 'features/orderPrepare/orderReducer';
import { SaveTransaction } from 'features/payment/components/paymentSelection/saveTransaction';

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [isStaffListOpen, setIsStaffListOpen] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SearchedOrderProduct | null>(
    null
  );
  const [paymentTypeSelected, setPaymentTypeSelected] = useState<any>(null);
  const [returnPaymentTypeSelected, setReturnPaymentTypeSelected] =
    useState<any>(null);
  const [daySummaryOpen, setDaySummaryOpen] = useState<boolean>(false);
  const [billModalOpen, setBillModalOpen] = useState<boolean>(false);

  const [transactionModalOpen, setTransactionModalOpen] =
    useState<boolean>(false);

  const [adminActionsOpen, setAdminActionsOpen] = useState<boolean>(false);

  const totalOrder = useAppSelector(
    (state: RootState) => state.payment.totalOrder
  );

  const staffInfos = useAppSelector(
    (state: RootState) => state.staff.staffInfos
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setOpen(true);

    async function fetchData() {
      const productsResult: any = await firebase.getProducts();
      const categoriesResult: any = await firebase.getCategories();
      const suppliersResult: any = await firebase.getSuppliers();
      const collectionsResult: any = await firebase.getCollections();
      const variantsResult: any = await firebase.getVariants();

      dispatch(setProducts(productsResult));
      dispatch(setCategories(categoriesResult));
      dispatch(setSuppliers(suppliersResult));
      dispatch(setCollections(collectionsResult));
      dispatch(setVariants(variantsResult));
    }

    fetchData();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <div className="dashboard">
      <Grid
        className="home-app-bar"
        container
        display={'flex'}
        alignItems={'center'}
        justifyContent="space-between"
      >
        {/* START: ce composant répresente la popin d'ouverture du système pour alimenter avec le montant du cash de la caisse */}
        <ModalComponent
          isModalOpen={open}
          handleCloseModal={() => setOpen(false)}
        />
        {/* END */}

        <StaffList
          isOpen={isStaffListOpen}
          handleCloseStaffListModal={() => setIsStaffListOpen(false)}
          staffInfos={staffInfos}
        />

        {/* START: ce composant concerne le x-report et le z-report */}
        <Summary
          isSummaryModalOpen={daySummaryOpen}
          handleCloseSummaryModal={() => setDaySummaryOpen(false)}
        />
        {/* END */}

        {/* START: AdminActions */}
        <AdminActions
          isSummaryModalOpen={adminActionsOpen}
          handleCloseSummaryModal={() => setAdminActionsOpen(false)}
        />
        {/* END */}

        {/* START: ce composant concerne le logo aloud al ateeq dans le header */}
        <Grid
          container
          justifyContent={'center'}
          className="dashboard-app-bar-logo-container"
        >
          <img width="90px" alt="icon" src={AloudAlAteeqLogoArEn} />
        </Grid>
        {/* END */}

        {/* START: ce composant concerne la liste du header */}
        <Grid
          className="dashboard-app-bar-helpers-container"
          container
          display={'flex'}
          alignItems={'center'}
          flexDirection={'row'}
        >
          <Button
            onClick={() => setDaySummaryOpen(true)}
            className="icon-button"
            sx={{
              width: 100,
              '&.MuiButtonBase-root:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Typography style={{ fontSize: 16, marginLeft: 5, marginRight: 5 }}>
              Synthése
            </Typography>
          </Button>

          <Button
            onClick={() => setAdminActionsOpen(true)}
            className="icon-button"
            sx={{
              width: 100,
              '&.MuiButtonBase-root:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Typography style={{ fontSize: 16, marginLeft: 5, marginRight: 5 }}>
              Admin
            </Typography>
          </Button>
        </Grid>
        {/* END */}

        {/* START: ce composant contient le nom du staff connecté et un bouton changement du staff */}
        <Grid
          container
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          className="dashboard-app-bar-account"
        >
          <Typography fontSize={'large'} color={'#fff'}>
            {staffInfos?.fullname}
          </Typography>
          <Button
            onClick={() => setIsStaffListOpen(true)}
            sx={{
              height: 50,
              marginLeft: 1,
              '&.MuiButtonBase-root:hover': {
                backgroundColor: '#e7bd67',
              },
            }}
          >
            <CachedOutlinedIcon sx={{ color: 'green', fontSize: 50 }} />
            <PeopleAltOutlinedIcon
              sx={{
                color: 'white',
                fontSize: 20,
                position: 'absolute',
                right: 22,
              }}
            />
          </Button>
        </Grid>
      </Grid>
      {/* END */}

      {/* TODO: uncomment this when implemeting sales analytics features
      <Grid className="dahboard-staf-sales-container">
        <Grid>
          <Bar options={dailySalesOptions} data={dailySalesData} />
        </Grid>
        <Grid>
          <Bar options={monthlySalesOptions} data={monthlySalesData} />
        </Grid>
      </Grid>
      */}
      <LogoMixed />

      {/* START: cette partie contient les composant du milieu */}
      <Grid container flexDirection={'row'} justifyContent={'space-between'}>
        <LeftComponent />
        <RightComponent
          onProductSelected={(item: SearchedOrderProduct) =>
            setSelectedItem(item)
          }
        />
      </Grid>
      {/* END */}

      <Grid className="dashboard-bottom-container">
        <Button
          //onClick={() => navigate('/login')}
          className="icon-button"
          variant="contained"
          sx={{ width: 250, marginLeft: 2 }}
        >
          <DeleteForeverTwoToneIcon sx={{ color: 'black', fontSize: 50 }} />
        </Button>
        <DashboardConfigProductButtons
          data={dashboardConfigButtonsList}
          selectedProduct={selectedItem}
        />

        <ReturnPaymentSelection
          billModalOpen={billModalOpen}
          closeBillModal={() => setBillModalOpen(false)}
          returnPaymentTypeSelected={returnPaymentTypeSelected}
        />

        <SaveTransaction
          saveTransactionModalOpen={transactionModalOpen}
          closeSaveTransactionlModal={() => setTransactionModalOpen(false)}
        />

        {totalOrder === 0 && (
          <Button
            sx={{ backgroundColor: 'green' }}
            variant="contained"
            onClick={() => setTransactionModalOpen(true)}
          >
            Save transaction
          </Button>
        )}
        {totalOrder > 0 && (
          <PaymentActionButton
            onPress={(paymentTypeSelected: any) => {
              setIsPaymentOpen(true);
              setPaymentTypeSelected(paymentTypeSelected);
            }}
          />
        )}
        {totalOrder < 0 && (
          <ReturnActionButton
            onPress={(paymentTypeSelected: any) => {
              setBillModalOpen(true);
              setReturnPaymentTypeSelected(paymentTypeSelected);
            }}
          />
        )}
        {/*         <Button
          onClick={() => setIsPaymentOpen(true)}
          className="icon-button"
          sx={{
            backgroundColor: 'rgb(59, 150, 32)',
            '&.MuiButtonBase-root:hover': {
              backgroundColor: 'rgb(59, 150, 119)',
            },
            width: 200,
            marginRight: 1,
          }}
        >
          <PlayArrowOutlinedIcon sx={{ color: '#fff', fontSize: 50 }} />
          
        </Button> */}
      </Grid>

      {/* START: ce composant répresente le bouton du choix du méthod de paiement */}
      <PaymentSelection
        isPaymentModalOpen={isPaymentOpen}
        handleCloseModal={() => setIsPaymentOpen(false)}
        paymentTypeSelected={paymentTypeSelected}
      />
      {/* END */}
    </div>
  );
}
