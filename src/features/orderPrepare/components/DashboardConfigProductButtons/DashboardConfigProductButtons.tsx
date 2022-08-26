import { Grid } from '@mui/material';
import { ProductsInterface } from 'dummyData/products';
import { IdashboardConfigButtonsList } from './constants';
import { ProductConfigItem } from './ProductConfigItem';

type DashboardConfigProductButtonsType = {
  data: Array<IdashboardConfigButtonsList>;
  selectedProduct?: ProductsInterface | null;
};
/**
 * This component diplays the bottom buttons of the dashboard
 * @param props
 * @returns {JSX.Element}
 */
export function DashboardConfigProductButtons(
  props: DashboardConfigProductButtonsType
): JSX.Element {
  const selectedProduct = props.selectedProduct;

  return (
    <Grid container alignItems={'center'} justifyContent={'space-evenly'}>
      {props.data.map((el: IdashboardConfigButtonsList) => (
        <ProductConfigItem
          selectedProduct={selectedProduct}
          id={el.id}
          icon={el.component}
        />
      ))}
    </Grid>
  );
}
