import { Button, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { productsSalesOptions, productsSalesData } from '../constants';
import SearchProductsComponent from 'features/orderPrepare/components/SearchProductsComponent';
import { LogoMixed } from 'components/LogoMixed';
import { useAppSelector } from 'renderer/hooks';
import { RootState } from 'renderer/store';
import { CategoryType } from 'features/orderPrepare/types/categoryType';

export function LeftComponent() {
  const productsList = useAppSelector(
    (state: RootState) => state.search.products
  );

  const categoriesList = useAppSelector(
    (state: RootState) => state.search.categories
  );

  const collectionList = useAppSelector(
    (state: RootState) => state.search.collections
  );

  return (
    <Grid className="dashboard-left" display="flex" flexDirection="column">
      {/** the search input */}
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

      {/** products / categories grid list */}
      <Grid container style={{ marginTop: 60, marginLeft: 1 }}>
        {productsList?.map((el) => (
          <Grid
            key={el.name}
            item
            xs={3}
            style={{
              height: '4rem',
              width: '25%',
            }}
          >
            <Button style={{ height: '4rem', width: '95%' }} variant="outlined">
              {el.name}
            </Button>
          </Grid>
        ))}

        {categoriesList?.map((el: CategoryType, i: number) => {
          return (
            <Grid
              key={i}
              item
              xs={3}
              style={{
                height: '4rem',
                width: '25%',
                marginTop: 5,
              }}
            >
              <Button
                color="secondary"
                style={{ height: '4rem', width: '95%' }}
                variant="contained"
              >
                {el.name}
              </Button>
            </Grid>
          );
        })}

        {collectionList?.map((el) => (
          <Grid
            key={el.name}
            item
            xs={3}
            style={{
              height: '4rem',
              width: '25%',
            }}
          >
            <Button style={{ height: '4rem', width: '95%' }} variant="outlined">
              {el.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      <LogoMixed
        style={{ position: 'absolute', bottom: 150 }}
        imgWidth="300px"
      />
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
