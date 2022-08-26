import Button from '@mui/material/Button';
import { useAppDispatch } from 'renderer/hooks';
import {
  incrementQuantity,
  decrementQuantity,
  incrementUnit,
  decrementUnit,
} from 'features/orderPrepare/orderReducer';
import { ProductsInterface } from 'dummyData/products';

type ProductConfigItemProps = {
  id?: string;
  icon: any;
  selectedProduct?: ProductsInterface | null;
};

export function ProductConfigItem(props: ProductConfigItemProps) {
  const dispatch = useAppDispatch();

  const Icon = props.icon;
  const key = props.id;
  const product = props.selectedProduct;

  function handleOnItemClick(): void {
    if (!product) {
      return;
    }

    switch (key) {
      case 'quantityIncrementIcon': {
        dispatch(incrementQuantity(product?.code));
        return;
      }
      case 'quantityDecrementIcon': {
        dispatch(decrementQuantity(product?.code));
        return;
      }
      case 'unitIncrementIcon': {
        const incrementUnitPayload = {
          code: product?.code,
          unitType: product?.unitType,
        };
        dispatch(incrementUnit(incrementUnitPayload));
        return;
      }
      case 'unitDecrementIcon': {
        const decrementUnitPayload = {
          code: product?.code,
          unitType: product?.unitType,
        };
        dispatch(decrementUnit(decrementUnitPayload));
        return;
      }
      default:
        return;
    }
  }

  return (
    <Button
      onClick={handleOnItemClick}
      className="icon-button"
      sx={{
        '&.MuiButtonBase-root:hover': {
          backgroundColor: 'gray',
        },
      }}
    >
      <Icon sx={{ color: 'black', fontSize: 40 }} />
    </Button>
  );
}
