import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Box, Theme, useTheme } from '@mui/material';
import { getData } from '../../services';
import IconPath, { YourPaymentsColumns } from '../../utils/Constants';
import {
  fetchPaymentsData,
  convertCurrentFormatToDollars,
} from '../../utils/helper';
import CashAcclerationTemplate from '../../components/templates/CashAcclerationTemplate';
import SideNavBar from '../../components/organisms/SideNavBar';
import HeaderCard from '../../components/molecules/HeaderCard';
import CongratsCard from '../../components/molecules/CongratsCard';
import CashAccelerationCard from '../../components/molecules/CashAccelerationCard';
import CashKickCard from '../../components/organisms/CashKickCard';
import TableEmptyCard from '../../components/organisms/TableEmptyCard';
import ContractsTable from '../../components/molecules/ContractsTable';
import { TypographyIconMolecule } from '../../components/molecules/TypographyWithIcon';
import { UserContext } from '../../App';

export interface PaymentsProps {
  id: string;
  dueDate: string[];
  status: string;
  expectedAmount: string;
  outStanding: string;
}

interface StateType {
  cashKickInfoAvailable: boolean;
  yourPaymentsRows: PaymentsProps[] | undefined;
  cashKickAmount: number;
  outstandingAmount: number;
  paymentDeductionAmount: number;
}

export const initialState: StateType = {
  cashKickInfoAvailable: false,
  yourPaymentsRows: [],
  cashKickAmount: 880000.0,
  outstandingAmount: 0,
  paymentDeductionAmount: 0,
};

export interface PayloadProps {
  paymentsData?: PaymentsProps[];
  totalOutstanding: number;
  dueAmount: number;
}

export interface ActionType {
  type: string;
  payload: PayloadProps;
}

export interface CashKick {
  id: string;
  userId: string;
  name: string;
  status: string;
  maturity: string;
  totalRecievedMonths: number;
  totalRecievedPercentage: number;
  totalFinanced: number;
  totalReceived: number;
}

export const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      const { paymentsData } = action.payload;
      return {
        ...state,
        cashKickInfoAvailable: true,
        yourPaymentsRows: paymentsData,
      };
    }
    case 'UPDATE_OUTSTANDING_AMOUNT': {
      const { totalOutstanding, dueAmount } = action.payload;
      return {
        ...state,
        outstandingAmount: totalOutstanding,
        paymentDeductionAmount: dueAmount,
        cashKickAmount: 880000.0 - totalOutstanding,
      };
    }
    default:
      return state;
  }
};

const todaysDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
});

const StyledYourPayments = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '32px',
  backgroundColor: theme.palette.background.elevation1,
}));

interface HomePageProps {
  // userId: number;
  onFailureFunc: () => void;
  onConnectFunc: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  // userId,
  onFailureFunc,
  onConnectFunc,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [
    {
      cashKickInfoAvailable,
      yourPaymentsRows,
      cashKickAmount,
      outstandingAmount,
      paymentDeductionAmount,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { id, setId } = useContext(UserContext);
  console.log('userId: ', id, 'in Home Page');

  const onCashAcclerationPageClick = () => navigate('/cash-acceleration');
  const onCashKickCardClick = () => navigate('/new-cash-kick');
  const onLogOutForProfileCard = () => {
    setId('');
    navigate('/');
  };

  useEffect(() => {
    const fetchCashKicksData = async () => {
      try {
        const data = await getData(id);
        console.log('Cash Kick Data', data, ' and user Id is ', id);
        if (data.length <= 0) throw Error('No maturity Dates');

        const maturityInfo = data.map((cashKick) => ({
          maturityDate: new Date(cashKick.maturity),
          dueAmount: Number((cashKick.totalFinanced / 12).toFixed(2)),
        }));

        const maturityDates = maturityInfo.map((info) =>
          info.maturityDate.getTime()
        );
        const maxMaturityDate = new Date(Math.max(...maturityDates));
        const minMaturityDate = new Date(Math.min(...maturityDates));

        const totalOutstanding = data.reduce(
          (sum, cashKick) => sum + cashKick.totalFinanced,
          0
        );
        const dueAmount = Number((totalOutstanding / 12).toFixed(2));
        const paymentsData = fetchPaymentsData(
          totalOutstanding,
          dueAmount,
          maxMaturityDate,
          minMaturityDate,
          maturityInfo,
          dispatch
        );

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: { paymentsData, totalOutstanding: 0, dueAmount: 0 },
        });
      } catch (error) {
        console.error('Error in fetchCashKicksData:', error);
      }
    };
    fetchCashKicksData();
  }, [id]);

  return (
    <CashAcclerationTemplate
      SideNavBar={
        <SideNavBar activeIndex={1} handlePage={onCashAcclerationPageClick} />
      }
      HeaderCard={
        <HeaderCard greeting={true} onLogout={() => onLogOutForProfileCard()} />
      }
      CongratsCard={
        !cashKickInfoAvailable ? (
          <CongratsCard
            heading="Congratulations you are ready to start!"
            body="You are approved for funding. We are ready to advance you up to $8.8M"
            buttonLabel="Learn more"
          />
        ) : null
      }
      DueChip={
        cashKickInfoAvailable ? (
          <CashAccelerationCard
            width="340px"
            height="259px"
            label="Due in 30 day(s)"
            src={IconPath.info}
            alt="Info icon"
            cardIconSrc={IconPath.dueDate}
            content={'Due - ' + todaysDate}
            value={convertCurrentFormatToDollars(paymentDeductionAmount)}
          />
        ) : null
      }
      OutstandingAmount={
        cashKickInfoAvailable ? (
          <CashAccelerationCard
            width="340px"
            height="259px"
            src={IconPath.info}
            alt="Info icon"
            cardIconSrc={IconPath.dueDate}
            content="Outstanding amount"
            value={convertCurrentFormatToDollars(outstandingAmount)}
            progressValue={(outstandingAmount / 880000.0) * 100}
          />
        ) : null
      }
      CashKickCard={
        <CashKickCard
          cashKickkamount={cashKickAmount}
          onClick={onCashKickCardClick}
        />
      }
      ContractsOrganism={
        cashKickInfoAvailable ? (
          <StyledYourPayments theme={theme}>
            <TypographyIconMolecule
              label="Your Payments"
              variant="heading2"
              src={IconPath.InfoIcon}
              gap="8px"
            />
            <ContractsTable
              columns={YourPaymentsColumns}
              rows={yourPaymentsRows}
            />
          </StyledYourPayments>
        ) : (
          <StyledYourPayments theme={theme}>
            <TypographyIconMolecule
              label="Your Payments"
              variant="heading2"
              src={IconPath.InfoIcon}
              gap="8px"
            />
            <TableEmptyCard
              columns={YourPaymentsColumns}
              cashKickPressed={true}
              onFailure={onFailureFunc}
              onConnect={onConnectFunc}
            />
          </StyledYourPayments>
        )
      }
    />
  );
};

export default HomePage;
