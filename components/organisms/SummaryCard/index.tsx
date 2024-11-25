import React from 'react';
import { Box, Card, Stack, styled } from '@mui/material';
import { TypographyIconMolecule } from '../../molecules/TypographyWithIcon';
import IconPath from '../../../utils/Constants';
import Typography from '../../atoms/Typography';
import CustomButton from '../../atoms/Button';
import CustomSliderComponent from '../../atoms/Slider';
import Divider from '../../atoms/Divider';
import theme from '../../../theme';
import { convertCurrentFormatToDollars } from '../../../utils/helper';

export interface CardProps {
  contracts?: number;
  sliderValue?: number;
  maxSliderValue?: number;
  variedCashkick?: number;
  finalCashkick?: number;
  paybackAmount?: number;
  percentage?: number;
  percetageAmount?: number;
  totalPayout?: number;
  id?: string;
  initialIsReviewed?: boolean;
  onClickResetData?: () => void;
  reviewCredit?: () => void;
  handleSliderChange?: (value: number) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.elevation1,
  width: '100%',
  height: '100%',
  borderRadius: '12px',
  padding: theme.spacing(7),
  overflow: 'auto',
  '@media(max-height: 600px)': {
    width: '85%',
    overflow: 'auto',
  },
}));

const StyledHeading = styled(TypographyIconMolecule)(({ theme }) => ({
  '& img': {
    width: '24px',
    height: '24px',
  },
  marginBottom: '12px',
}));

const OuterBox = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '0px 0px',
  '@media(max-width: 600px)': {
    width: '100%',
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  maxWidth: '276px',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 'auto',
  marginTop: '12px',
  '@media (max-width: 600px)': {
    maxWidth: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > *:not(:last-child)': {
      marginBottom: '8px',
    },
  },
}));

const ExtendedStack = styled(Stack)(({ theme }) => ({
  width: '286px',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 'auto',
  marginTop: '12px',
  '@media (max-width: 600px)': {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > *:not(:last-child)': {
      marginBottom: '8px',
    },
  },
}));

const LineStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  '@media (max-width: 600px)': {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > *:not(:last-child)': {
      marginBottom: '8px',
    },
  },
}));

const PaddingBox = styled(Box)(({ theme }) => ({
  paddingRight: '5px',
}));

const StyledButton = styled(CustomButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.mediumEmphasis,
  backgroundColor: theme.palette.background.elevation2,
  '&:hover': {
    backgroundColor: theme.palette.background.elevation2,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.background.elevation2,
    color: theme.palette.Borders.highEmphasis,
  },
}));

const SliderBox = styled(Box)(({ theme }) => ({
  width: '286px',
  padding: '12px 0px',
  '@media(max-width: 600px)': {
    width: '100%',
  },
}));

const StyledSlider = styled(CustomSliderComponent)(({ theme }) => ({
  width: '100%',
  maxWidth: '286px',
  marginTop: '30px',
  padding: theme.spacing(6),
  '@media (max-width: 600px)': {
    maxWidth: '100%',
    padding: theme.spacing(3),
  },
}));

const ReviewButton = styled(CustomButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  width: '276px',
  height: '59px',
  marginTop: '20px',
  '&.Mui-disabled': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.lowEmphasis,
  },
  '@media (max-width: 600px)': {
    width: '100%',
    height: '50px',
    padding: theme.spacing(2),
  },
}));

const SummaryCard: React.FC<CardProps> = ({
  sliderValue = 0,
  maxSliderValue = 5,
  contracts = 0,
  variedCashkick = 0,
  finalCashkick = 880000,
  paybackAmount = 0,
  percentage = 0,
  percetageAmount = 0,
  totalPayout = 0,
  initialIsReviewed = false,
  onClickResetData,
  reviewCredit,
  handleSliderChange = () => {},
  id,
}) => {
  return (
    <StyledCard data-testid={id}>
      <StyledHeading
        variant="heading2"
        label="Summary"
        gap="8px"
        src={IconPath.info}
      />
      <OuterBox>
        <StyledStack>
          <Typography
            variant="body1"
            children="Term"
            color={theme.palette.text.lowEmphasis}
          />
          <Typography
            variant="body1"
            children="12 months"
            color={theme.palette.text.highEmphasis}
          />
        </StyledStack>
        <StyledStack>
          <Typography
            variant="body1"
            children="Selected Contracts"
            color={theme.palette.text.lowEmphasis}
          />
          <Typography
            variant="body1"
            children={contracts}
            color={theme.palette.text.highEmphasis}
          />
        </StyledStack>
      </OuterBox>
      {!initialIsReviewed && (
        <div>
          <ExtendedStack>
            <Typography
              variant="body1"
              children="Slide to autoselect"
              color={theme.palette.text.lowEmphasis}
            />
            <StyledButton
              variant="text"
              onClick={onClickResetData}
              children="Reset"
              disabled={sliderValue === 0}
              disableRipple
            />
          </ExtendedStack>
          <SliderBox>
            <StyledSlider
              width="100%"
              value={sliderValue}
              maxValue={maxSliderValue}
              onSliderChange={handleSliderChange}
              sx={{ left: '4%' }}
            />
          </SliderBox>
          <LineStack>
            <PaddingBox>
              <Typography
                variant="body1"
                children={convertCurrentFormatToDollars(variedCashkick)}
                color={theme.palette.primary.purple[400]}
                sx={{ paddingRight: '5px' }}
              />
            </PaddingBox>
            <PaddingBox>
              <Typography
                variant="body1"
                children=" selected of "
                color={theme.palette.text.lowEmphasis}
              />
            </PaddingBox>
            <Typography
              variant="body1"
              children={convertCurrentFormatToDollars(finalCashkick)}
              color={theme.palette.text.highEmphasis}
            />
          </LineStack>
        </div>
      )}
      <OuterBox>
        <StyledStack>
          <Typography
            variant="body1"
            children="Pay back amount"
            color={theme.palette.text.lowEmphasis}
          />
          <Typography
            variant="body1"
            children={convertCurrentFormatToDollars(paybackAmount)}
            color={theme.palette.text.highEmphasis}
          />
        </StyledStack>
        <StyledStack>
          <span>
            <Typography
              variant="body1"
              children="Rate %"
              color={theme.palette.text.lowEmphasis}
            />
          </span>
          <span>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography
                variant="caption"
                children={`(${percentage.toFixed(2)}%)`}
                color={theme.palette.text.lowEmphasis}
              />
              <Typography
                variant="body1"
                children={convertCurrentFormatToDollars(percetageAmount)}
                color={theme.palette.text.highEmphasis}
              />
            </Stack>
          </span>
        </StyledStack>
      </OuterBox>
      <Divider orientation="horizontal" sx={{ margin: '20px 0px' }} />
      <OuterBox>
        <StyledStack>
          <Typography
            variant="heading3"
            children="Total Payout"
            color={theme.palette.text.lowEmphasis}
          />
          <Typography
            variant="heading2"
            children={convertCurrentFormatToDollars(totalPayout)}
            color={theme.palette.text.highEmphasis}
          />
        </StyledStack>
      </OuterBox>
      <ReviewButton
        variant="contained"
        children={
          initialIsReviewed ? 'Submit Your Credit' : 'Review Your Credit'
        }
        disabled={sliderValue === 0}
        onClick={reviewCredit}
        disableRipple
      />
    </StyledCard>
  );
};

export default SummaryCard;
