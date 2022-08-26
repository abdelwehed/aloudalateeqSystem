import { Button, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  productsList,
  categoriesList,
  productsSalesOptions,
  productsSalesData,
} from '../constants';
import SearchProductsComponent from 'features/orderPrepare/components/SearchProductsComponent';
import { LogoMixed } from 'components/LogoMixed';

export function LeftComponent() {
  return (
    <Grid className="dashboard-left" display="flex" flexDirection="column">
      <Grid
        container
        style={{
          position: 'absolute',
          zIndex: 999,
          left: 15,
        }}
      >
        <SearchProductsComponent />
      </Grid>

      <Grid container style={{ flex: 8, marginTop: 8, marginLeft: 1 }}>
        {productsList.map((el) => (
          <Grid
            key={el.productName}
            item
            xs={3}
            style={{ height: '4rem', width: '25%', marginTop: 1 }}
          >
            <Button style={{ height: '4rem', width: '98%' }} variant="outlined">
              {el.productName}
            </Button>
          </Grid>
        ))}

        {categoriesList.map((el) => (
          <Grid
            key={el.productName}
            item
            xs={3}
            style={{ height: '4rem', width: '25%', marginTop: 2 }}
          >
            <Button
              color="secondary"
              style={{ height: '4rem', width: '98%' }}
              variant="contained"
            >
              {el.productName}
            </Button>
          </Grid>
        ))}
      </Grid>

      <LogoMixed imgWidth="280px" />
      {/*     TODO: uncomment this when implemeting sales analytics features 
      <Grid style={{ flex: 1 }}>
        <Bar
          height="120rem"
          options={productsSalesOptions}
          data={productsSalesData}
        />
      </Grid> */}
    </Grid>
  );
}
