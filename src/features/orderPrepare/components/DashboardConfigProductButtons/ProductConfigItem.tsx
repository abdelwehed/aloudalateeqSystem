import Button from '@mui/material/Button';
import { useAppDispatch } from 'renderer/hooks';
import {
  incrementQuantity,
  decrementQuantity,
  SearchedOrderProduct,
  changeSearchItemNextVariant,
  changeSearchItemPreviousVariant,
} from 'features/orderPrepare/orderReducer';

type ProductConfigItemProps = {
  id?: string;
  icon: any;
  selectedProduct?: SearchedOrderProduct | null;
  onPress?: () => void;
};

export function ProductConfigItem(props: ProductConfigItemProps) {
  const dispatch = useAppDispatch();

  const Icon = props.icon;
  const key = props.id;
  const product = props.selectedProduct;

  function handleOnItemClick(): void {
    if (props.onPress) {
      props.onPress();
    }

    if (!product) {
      return;
    }

    switch (key) {
      case 'quantityIncrementIcon': {
        dispatch(incrementQuantity(product?.supplierRef));
        return;
      }
      case 'quantityDecrementIcon': {
        dispatch(decrementQuantity(product?.supplierRef));
        return;
      }
      case 'nextVariantChangeIcon': {
        if (
          !product?.variants?.variants ||
          !product?.productOrderVariant?.variantGroupId
        ) {
          return;
        }
        const nextVariantPayload = {
          variantGroupId: product?.variants?.id,
          variantGroupName: product?.variants?.name,
          variant: product?.productOrderVariant.variant,
          code: product?.supplierRef,
        };

        dispatch(changeSearchItemNextVariant(nextVariantPayload));
        return;
      }
      case 'previousVariantChangeIcon': {
        if (
          !product?.variants?.variants ||
          !product?.productOrderVariant?.variantGroupId
        ) {
          return;
        }
        const nextVariantPayload = {
          variantGroupId: product?.variants?.id,
          variantGroupName: product?.variants?.name,
          variant: product?.productOrderVariant.variant,
          code: product?.supplierRef,
        };

        dispatch(changeSearchItemPreviousVariant(nextVariantPayload));
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
