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
import AloudAlAteeqLogoArEn from '../../../assets/images/AloudAlAteeqArEn.png';
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
import { ProductsInterface } from 'dummyData/products';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductsInterface | null>(
    null
  );

  // didMount
  useEffect(() => {
    setOpen(true);
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
        <Grid
          container
          justifyContent={'center'}
          className="dashboard-app-bar-logo-container"
        >
          <img width="90px" alt="icon" src={AloudAlAteeqLogoArEn} />
        </Grid>

        <Grid
          className="dashboard-app-bar-helpers-container"
          container
          display={'flex'}
          alignItems={'center'}
          flexDirection={'row'}
        >
          <Typography style={{ fontSize: 16, marginLeft: 5, marginRight: 5 }}>
            Order
          </Typography>
          <Typography style={{ fontSize: 16, marginLeft: 5, marginRight: 5 }}>
            Save Bill
          </Typography>
          <Typography style={{ fontSize: 16, marginLeft: 5, marginRight: 5 }}>
            Extra
          </Typography>
        </Grid>

        <Grid
          container
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          className="dashboard-app-bar-account"
        >
          <Typography fontSize={'large'} color={'#fff'}>
            Mohamed Ali
          </Typography>
          <Button
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

      <Grid container flexDirection={'row'} justifyContent={'space-between'}>
        <LeftComponent />
        <RightComponent
          onProductSelected={(item: ProductsInterface) => setSelectedItem(item)}
        />
      </Grid>

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
        <Button
          //onClick={() => navigate('/login')}
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
        </Button>
      </Grid>

      <ModalComponent
        isModalOpen={open}
        handleCloseModal={() => setOpen(false)}
      />
    </div>
  );
}
