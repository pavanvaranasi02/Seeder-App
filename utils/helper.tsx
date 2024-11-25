import React, { Dispatch } from 'react';
import styled from '@emotion/styled';
import { Box, Stack, TypographyOwnProps } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import StyledChip from '../components/atoms/Chip';
import theme from '../theme';
import Typography from '../components/atoms/Typography';
import { PaymentsProps, ActionType } from '../pages/HomePage';
import { ApiContract, ContractAmount } from '../services';
import { TransformedContract } from '../pages/NewCashKick';

export const convertCurrentFormatToDollars = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
};

const ChipContainer = styled(Box)({
  padding: '12px 20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '4px',
  background: 'none',
  flexWrap: 'wrap',
});

const ChipBox = styled(Box)({
  marginTop: '-1%',
  marginLeft: '-80%',
  width: 'fit-content',
  '@media (max-width: 600px)': {
    marginLeft: '-60%',
    marginTop: '-1%',
    width: '110%',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const CustomTextContainer = styled(Box)<{ marginTop: number }>(
  ({ marginTop }) => ({
    marginTop: `${marginTop}px`,
  })
);

export const customText = (
  text: string,
  variant: TypographyOwnProps['variant'],
  color?: string,
  marginTop?: number
) => {
  return (
    <CustomTextContainer marginTop={marginTop ?? 0}>
      <Typography
        variant={variant}
        color={color ?? theme.palette.text.lowEmphasis}
        id="customText"
      >
        {text}
      </Typography>
    </CustomTextContainer>
  );
};

export const customDualText = (
  data: string[],
  color1: string = theme.palette.text.lowEmphasis,
  color2: string = theme.palette.text.lowEmphasis
) => {
  return (
    <Stack direction="column" paddingTop="12px">
      <Typography variant="body2" color={color1}>
        {data[0]}
      </Typography>
      <Typography variant="caption" color={color2}>
        {data[1]}
      </Typography>
    </Stack>
  );
};

export const customChips = (data: string) => {
  return (
    <ChipContainer>
      <ChipBox>
        <StyledChip
          variant="filled"
          backgroundColor={theme.palette.background.elevation2}
          height="25%"
          width="100%"
          label={
            <Typography
              variant="body2"
              color={theme.palette.text.mediumEmphasis}
            >
              {data}
            </Typography>
          }
        />
      </ChipBox>
    </ChipContainer>
  );
};

export interface ICustomColumnProps {
  field: string;
  headerText: string;
  valueColor?: string;
  width?: number;
  marginTop?: number;
  headerClassName?: string;
  cellClassName?: string;
}

export const customColumn = ({
  field,
  headerText,
  valueColor,
  width,
  marginTop,
  headerClassName,
  cellClassName,
}: ICustomColumnProps) => {
  return {
    field: field,
    width: width ?? 200,
    sortable: false,
    headerClassName: headerClassName,
    cellClassName: cellClassName,
    renderHeader: () => customText(headerText, 'body2', valueColor, 0),
    renderCell: (params: GridRenderCellParams) =>
      customText(params.value, 'body2', valueColor, marginTop ?? 0),
  };
};

export const parseDollarAmount = (amount: string): number => {
  return parseFloat(amount.replace(/[$,]/g, ''));
};
export const addMonths = (date: Date | string, months: number): Date => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

export const fetchPaymentsData = (
  totalOutstanding: number,
  paymentReductionAmt: number,
  maxMaturityDate: Date,
  minMaturityDate: Date,
  maturityInfo: { maturityDate: Date; dueAmount: number }[],
  dispatch: Dispatch<ActionType>
): PaymentsProps[] => {
  let totalOutstandingTemp = totalOutstanding;
  let minMaturityDateCounter = addMonths(minMaturityDate, -12);
  const updatedPaymentsData: PaymentsProps[] = [];
  let idCounter = 1;
  const presentDate = new Date();

  // remove dueAmount of past months from totalOutstanding till now.
  while (minMaturityDateCounter.getTime() <= presentDate.getTime()) {
    let combinedDueAmount: number;
    const matchingToday =
      minMaturityDateCounter.getFullYear() === presentDate.getFullYear() &&
      minMaturityDateCounter.getMonth() === presentDate.getMonth();

    combinedDueAmount = 0;
    maturityInfo.forEach(({ maturityDate, dueAmount }) => {
      const startPeriod = addMonths(maturityDate, -12);
      if (
        minMaturityDateCounter >= startPeriod &&
        minMaturityDateCounter <= maturityDate
      ) {
        if (matchingToday) {
          combinedDueAmount += dueAmount;
          return;
        }
        totalOutstandingTemp -= dueAmount;
      }
    });

    if (matchingToday) {
      dispatch({
        type: 'UPDATE_OUTSTANDING_AMOUNT',
        payload: {
          totalOutstanding: totalOutstandingTemp,
          dueAmount: combinedDueAmount,
        },
      });
    }

    minMaturityDateCounter = addMonths(minMaturityDateCounter, 1);
  }

  // Calculate future payments
  let nextDate = new Date(
    presentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
  );
  nextDate = addMonths(nextDate, 1); // Start from next month

  let daysFromNow = 0;

  while (nextDate <= maxMaturityDate && totalOutstandingTemp > 0) {
    let commonMonthsDueAmount = 0;

    maturityInfo.forEach(({ maturityDate, dueAmount }) => {
      const startPeriod = addMonths(maturityDate, -12);
      if (nextDate >= startPeriod && nextDate <= maturityDate) {
        totalOutstandingTemp -= dueAmount;
        commonMonthsDueAmount += dueAmount;
      }
    });

    if (totalOutstandingTemp <= 0) totalOutstandingTemp = 0;

    const lastDayOfMonth = new Date(
      nextDate.getFullYear(),
      nextDate.getMonth() + 1,
      0
    ).getDate();
    daysFromNow += lastDayOfMonth;

    updatedPaymentsData.push({
      id: idCounter.toString(),
      dueDate: [
        nextDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        }),
        `${daysFromNow} day(s) from now`,
      ],
      status: 'Upcoming',
      expectedAmount: convertCurrentFormatToDollars(-commonMonthsDueAmount),
      outStanding: convertCurrentFormatToDollars(+totalOutstandingTemp),
    });

    nextDate = addMonths(nextDate, 1);
    idCounter++;
  }

  return updatedPaymentsData;
};

export const transformData = (
  data: ApiContract[],
  selectedContractAmounts: ContractAmount[]
): TransformedContract[] => {
  return data.map((item: ApiContract) => {
    const selectedContract = selectedContractAmounts.find(
      (contract) => contract.id === item.id.toString()
    );

    return {
      id: item.id,
      name: item.name,
      type: item.type,
      perPayment: convertCurrentFormatToDollars(item.perPayment),
      termLength: [
        `${item.termLengthMonths} months`,
        `${item.termLengthPercentage}% fee`,
      ],
      paymentAmount: selectedContract
        ? convertCurrentFormatToDollars(selectedContract.amount)
        : convertCurrentFormatToDollars(item.paymentAmount),
      originalPaymentAmount: convertCurrentFormatToDollars(item.paymentAmount),
    };
  });
};
