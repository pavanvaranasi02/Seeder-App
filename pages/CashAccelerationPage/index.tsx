import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CashAcclerationTemplate from '../../components/templates/CashAcclerationTemplate';
import SideNavBar from '../../components/organisms/SideNavBar';
import HeaderCard from '../../components/molecules/HeaderCard';
import CashAccelerationCard from '../../components/molecules/CashAccelerationCard';
import CashKickCard from '../../components/organisms/CashKickCard';
import CashAcceleration from '../../components/organisms/CashAcceleration';
import IconPath, {
  CashKickColumns,
  ContractsColumns,
} from '../../utils/Constants';
import { convertCurrentFormatToDollars } from '../../utils/helper';
import {
  ApiContract,
  fetchContracts,
  fetchUserContracts,
  getCashkicksByuserId,
  getUserById,
} from '../../services';
import { UserContext } from '../../App';

export interface ContractApi {
  id: string;
  name: string;
  type: string;
  perPayment: number;
  termLengthMonths: number;
  termLengthPercentage: number;
  paymentAmount: number;
}

export interface CashkickApi {
  id: number;
  name: string;
  status: string;
  maturity: string;
  totalReceivedPercentage: number;
  totalFinanced: number;
  totalReceived: number;
}

export interface ContractProps {
  id: string;
  name: string;
  type: string;
  perPayment: string;
  termLength: string[];
  paymentAmount: string;
}

export interface CashkickProps {
  id: number;
  name: string;
  status: string;
  maturity: string;
  totalRecieved: string[];
  totalFinanced: string;
}

const contractData = (data: ContractApi[]): ContractProps[] => {
  return data.map((item: ContractApi) => ({
    id: item.id,
    name: item.name,
    type: item.type,
    perPayment: convertCurrentFormatToDollars(item.perPayment),
    termLength: [
      `${item.termLengthMonths} months`,
      `${item.termLengthPercentage.toFixed(2)}% fee`,
    ],
    paymentAmount: convertCurrentFormatToDollars(item.paymentAmount),
  }));
};

const cashkickData = (data: CashkickApi[]): CashkickProps[] => {
  return data.map((item: CashkickApi) => ({
    id: item.id,
    name: item.name,
    status: item.status,
    maturity: item.maturity,
    totalRecieved: [
      `${convertCurrentFormatToDollars(item.totalReceived)}`,
      `${item.totalReceivedPercentage}% fee`,
    ],
    totalFinanced: convertCurrentFormatToDollars(item.totalFinanced),
  }));
};

export const getContractsByUserId = async (
  id: string
): Promise<ContractApi[]> => {
  const SelectedContractsdataAr = await fetchUserContracts(id);
  const SelectedContracts = SelectedContractsdataAr[0];
  console.log('Selected Contracts data', SelectedContracts);

  if (!SelectedContracts) {
    console.warn('SelectedContracts not found for the given userId:', id);
    return [];
  }

  const { contractIds } = SelectedContracts;
  console.log('Contract Ids', contractIds);

  const SelectedContractIds = contractIds.map((contract) =>
    contract.id.toString()
  );
  console.log('Selected Contracts Id', SelectedContractIds);

  const allContracts = await fetchContracts();

  console.log('All Contracts Data', allContracts);

  const matchingContracts = allContracts.filter((contract) => {
    return SelectedContractIds.includes(contract.id.toString());
  });

  console.log('Matching Contracts', matchingContracts);

  const convertedContracts: ContractApi[] = matchingContracts.map(
    (contract: ApiContract) => ({
      ...contract,
      id: contract.id.toString(),
    })
  );

  return convertedContracts;
};

const CashAccelerationPage: React.FC = () => {
  const [contracts, setContracts] = useState<ContractProps[]>([]);
  const [cashkicks, setCashkicks] = useState<CashkickProps[]>([]);
  const [availableCredit, setAvailableCredit] = useState<number | null>(null);
  const [isInitial, setIsInitial] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [cashKickPressed, setCashKickPressed] = useState(false);
  const navigate = useNavigate();

  const { id, setId } = useContext(UserContext);

  const pageChange = () => {
    navigate('/home');
  };
  const logoutCalled = () => {
    setId('');
    navigate('/');
  };

  console.log('userId: ', id, 'in Cash Acceleration Page');

  const fetchUser = async () => {
    try {
      const userResponse = await getUserById(id);
      console.log(userResponse, 'Debugging User Response');
      setAvailableCredit(userResponse.availableCredit);
    } catch (error) {
      console.error('Error in fetching user', error);
    }
  };

  useEffect(() => {
    const fetchContractsAndCashkicks = async (id: string) => {
      if (id) {
        try {
          const contractsData = getContractsByUserId(id);
          const convertedContracts = contractData(await contractsData);
          setContracts(convertedContracts);
          if (convertedContracts.length == 0) {
            setIsInitial(true);
          }
        } catch (err) {
          setHasError(true);
        }

        try {
          const cashkickResponse = await getCashkicksByuserId(id);
          console.log('Cash Kick Response', cashkickResponse);
          const cashkicksData: CashkickProps[] = cashkickData(cashkickResponse);
          console.log('Debugging below line execution for cash kick data');
          console.log('Cash Kick Data', cashkicksData);
          console.log('Debugging above line execution for cash kick data');
          setCashkicks(cashkicksData);
          const totalOutstanding = cashkickResponse.reduce(
            (sum, cashKick) => sum + cashKick.totalFinanced,
            0
          );
          setAvailableCredit(880000.0 - totalOutstanding);
          if (cashkicksData.length == 0) {
            setCashKickPressed(true);
          }
        } catch (err) {
          console.error('Error while setting Cash Kick data', err);
          setHasError(true);
        }
      }
    };
    fetchUser();
    fetchContractsAndCashkicks(id);
  }, [id]);

  const addNewCashkick = () => {
    navigate('/new-cash-kick');
  };

  return (
    <CashAcclerationTemplate
      SideNavBar={<SideNavBar activeIndex={2} handlePage={pageChange} />}
      HeaderCard={
        <HeaderCard
          greeting={false}
          heading="Cash Acceleration"
          content="Place to create new cash kicks to run your business"
          onLogout={logoutCalled}
        />
      }
      CashAccelerationCard1={
        <CashAccelerationCard
          width="204px"
          height="168px"
          src={IconPath.info}
          cardIconSrc={IconPath.calendar}
          content="Term cap"
          value="12 Months"
          alt="image"
        />
      }
      CashAccelerationCard2={
        <CashAccelerationCard
          width="204px"
          height="168px"
          src={IconPath.info}
          cardIconSrc={IconPath.documentDownload}
          content="Available Credit"
          value={
            availableCredit !== null
              ? `$${(availableCredit / 1000).toFixed(1)}K`
              : '$0.0K'
          }
          alt="image"
        />
      }
      CashAccelerationCard3={
        <CashAccelerationCard
          width="204px"
          height="168px"
          src={IconPath.info}
          cardIconSrc={IconPath.percentage}
          content="Max interest rate"
          value="12.00%"
          alt="image"
        />
      }
      CashKickCard={
        <CashKickCard
          cashKickkamount={availableCredit ?? 0}
          onClick={addNewCashkick}
        />
      }
      ContractsOrganism={
        <CashAcceleration
          enableSync={false}
          myCashKickColumns={CashKickColumns}
          myContractsColumns={ContractsColumns}
          myContractsRows={contracts}
          myCashKickRows={cashkicks}
          isInitial={isInitial}
          hasError={hasError}
          cashKickPressed={cashKickPressed}
        />
      }
    />
  );
};

export default CashAccelerationPage;
