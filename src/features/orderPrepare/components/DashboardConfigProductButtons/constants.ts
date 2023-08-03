import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SoapOutlinedIcon from '@mui/icons-material/SoapOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import StarIcon from '@mui/icons-material/Star';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';

export interface IdashboardConfigButtonsList {
  id: string;
  component: any;
  onPress?: () => void;
}

export const dashboardConfigButtonsList: Array<IdashboardConfigButtonsList> = [
  /* {
    id: 'icon1',
    component: GridViewOutlinedIcon,
  },
  {
    id: 'icon2',
    component: CancelOutlinedIcon,
  },
    {
    id: 'icon3',
    component: SoapOutlinedIcon,
  },
  {
    id: 'icon4',
    component: RefreshOutlinedIcon,
  },
  {
    id: 'icon5',
    component: RateReviewOutlinedIcon,
  },
  {
    id: 'icon6',
    component: CardGiftcardOutlinedIcon,
  },
  {
    id: 'icon7',
    component: PercentOutlinedIcon,
  },
  {
    id: 'icon8',
    component: StarIcon,
  }, */
  {
    id: 'previousVariantChangeIcon',
    component: SkipPreviousOutlinedIcon,
  },
  {
    id: 'nextVariantChangeIcon',
    component: SkipNextOutlinedIcon,
  },
  {
    id: 'quantityDecrementIcon',
    component: ArrowCircleLeftOutlinedIcon,
  },
  {
    id: 'quantityIncrementIcon',
    component: ArrowCircleRightOutlinedIcon,
  },
];
