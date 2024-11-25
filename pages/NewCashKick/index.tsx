import React, { useContext, useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../../theme';
import NewCashKick from '../../components/templates/NewCashKick';
import SideNavBar from '../../components/organisms/SideNavBar';
import HeaderCard from '../../components/molecules/HeaderCard';
import { TypographyIconMolecule } from '../../components/molecules/TypographyWithIcon';
import IconPath, { columns } from '../../utils/Constants';
import SummaryCard from '../../components/organisms/SummaryCard';
import ContractsTable from '../../components/molecules/ContractsTable';
import { GridRowId } from '@mui/x-data-grid';
import {
  convertCurrentFormatToDollars,
  parseDollarAmount,
  transformData,
} from '../../utils/helper';
import CashKickDialogueBox from '../../components/organisms/CashKickDialogueBox';
import { useNavigate } from 'react-router-dom';
import {
  fetchContracts,
  fetchUserContracts,
  updateUserContracts,
  createUserContracts,
  createCashKick,
  ContractAmount,
  UserContract,
} from '../../services';
import { UserContext } from '../../App';

export interface TransformedContract {
  id: number;
  name: string;
  type: string;
  perPayment: string;
  termLength: string[];
  paymentAmount: string;
  originalPaymentAmount: string;
}

interface AppState {
  contracts: TransformedContract[];
  selectedRows: GridRowId[];
  partialPayments: { [key: number]: number };
  isReviewed: boolean;
  openCashKickDialog: boolean;
  buttonLabel: string;
}

const NewCashkick = () => {
  const [state, setState] = useState<AppState>({
    contracts: [],
    selectedRows: [],
    partialPayments: {},
    isReviewed: false,
    openCashKickDialog: false,
    buttonLabel: 'Review Your Credit',
  });

  const navigate = useNavigate();
  const { id } = useContext(UserContext);
  const userId = id;

  useEffect(() => {
    const fetchContractsData = async () => {
      try {
        const data = await fetchContracts();
        const transformedData = transformData(data, []);
        setState((prevState) => ({ ...prevState, contracts: transformedData }));
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };
    fetchContractsData();
  }, []);

  const calculateSummary = () => {
    const selectedContracts = state.contracts.filter((contract) =>
      state.selectedRows.includes(contract.id)
    );
    const totalPayment = selectedContracts.reduce(
      (acc, contract) =>
        acc +
        (state.partialPayments[contract.id] ||
          parseDollarAmount(contract.paymentAmount)),
      0
    );

    const totalAllContractsPayment = state.contracts.reduce(
      (acc, contract) => acc + parseDollarAmount(contract.paymentAmount),
      0
    );

    return {
      totalSelected: selectedContracts.length,
      totalPayment,
      totalAllContractsPayment,
    };
  };

  const summaryData = calculateSummary();

  const updateSelectedContracts = (value: number) => {
    const updatedSelectedRows: GridRowId[] = [];
    const updatedPartialPayments: { [key: number]: number } = {};
    let remainingValue = value;

    for (const contract of state.contracts) {
      const contractPayment = parseDollarAmount(contract.paymentAmount);
      if (remainingValue >= contractPayment) {
        updatedSelectedRows.push(contract.id);
        remainingValue -= contractPayment;
      } else if (remainingValue > 0) {
        updatedSelectedRows.push(contract.id);
        updatedPartialPayments[contract.id] = remainingValue;
        remainingValue = 0;
      } else {
        break;
      }
    }

    setState((prevState) => ({
      ...prevState,
      selectedRows: updatedSelectedRows,
      partialPayments: updatedPartialPayments,
    }));
  };

  const handleSliderChange = (value: number) => {
    updateSelectedContracts(value);
  };

  const handleReviewClick = async () => {
    if (state.buttonLabel === 'Review Your Credit') {
      const selectedContracts = state.contracts.filter((contract) =>
        state.selectedRows.includes(contract.id)
      );

      try {
        const userContracts = await fetchUserContracts(userId);
        const existingUserContract = userContracts.find(
          (userContract) => userContract.userId === userId
        );

        const contractPayload: ContractAmount[] = selectedContracts.map(
          (contract) => ({
            id: contract.id.toString(),
            amount:
              state.partialPayments[contract.id] ||
              parseDollarAmount(contract.paymentAmount),
          })
        );

        if (existingUserContract) {
          await updateUserContracts(
            existingUserContract.id.toString(),
            userId,
            contractPayload
          );
        } else {
          await createUserContracts(userId, contractPayload);
        }

        const updatedUserContracts = await fetchUserContracts(userId);
        const contractsData = await fetchContracts();
        const allContracts = transformData(contractsData, contractPayload);

        const selectedContractAmounts = updatedUserContracts.flatMap(
          (item: UserContract) => item.contractIds
        );

        const mergedContracts = allContracts.map((contract) => {
          const matchingContract = selectedContractAmounts.find(
            (selected) => selected.id === contract.id.toString()
          );

          return matchingContract
            ? {
                ...contract,
                paymentAmount: convertCurrentFormatToDollars(
                  matchingContract.amount
                ),
              }
            : contract;
        });

        const fetchedContracts = mergedContracts.filter((contract) =>
          selectedContractAmounts.some(
            (selected) => selected.id === contract.id.toString()
          )
        );

        setState((prevState) => ({
          ...prevState,
          contracts: fetchedContracts,
          isReviewed: true,
          buttonLabel: 'Submit Your Credit',
        }));
      } catch (error) {
        console.error('Error processing contracts:', error);
      }
    } else if (state.buttonLabel === 'Submit Your Credit') {
      setState((prevState) => ({ ...prevState, openCashKickDialog: true }));
    }
  };

  const handleCloseDialog = () => {
    setState((prevState) => ({ ...prevState, openCashKickDialog: false }));
    navigate('/home');
  };

  const createCashKickHandler = async (name: string) => {
    const totalFinanced =
      summaryData.totalPayment + summaryData.totalPayment * 0.12;
    const maturityDate = new Date();
    maturityDate.setFullYear(maturityDate.getFullYear() + 1);
    const maturity = maturityDate.toLocaleString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const cashKickData = {
      userId,
      name,
      status: 'Pending',
      maturity,
      totalReceivedMonths: 12,
      totalReceivedPercentage: 12,
      totalFinanced,
      totalReceived: summaryData.totalPayment,
    };

    try {
      await createCashKick(cashKickData);
    } catch (error) {
      /* empty */
    }
  };

  const handleBackClick = async () => {
    if (state.buttonLabel === 'Review Your Credit') {
      navigate('/cash-acceleration');
    } else {
      setState((prevState) => ({
        ...prevState,
        isReviewed: false,
        buttonLabel: 'Review Your Credit',
        selectedRows: [],
      }));
      try {
        const data = await fetchContracts();
        const transformedData = transformData(data, []);
        setState((prevState) => ({ ...prevState, contracts: transformedData }));
      } catch (error) {
        /* empty */
      }
    }
  };

  const handleResetData = () => {
    setState((prevState) => ({
      ...prevState,
      selectedRows: [],
      partialPayments: {},
    }));
  };

  const pageChange = () => {
    navigate('/home');
  };

  const handleViewCashKick = () => {
    navigate('/cash-acceleration');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const displayedContracts = state.isReviewed
    ? state.contracts.filter((contract) =>
        state.selectedRows.includes(contract.id)
      )
    : state.contracts;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NewCashKick
        SideNavBar={<SideNavBar activeIndex={2} handlePage={pageChange} />}
        HeaderCard={
          <HeaderCard
            greeting={false}
            onLogout={handleLogout}
            heading="New cash kick"
            content="Let's setup a new cash kick to power your SaaS"
          />
        }
        TypographyIconMolecule={
          <TypographyIconMolecule
            variant="heading2"
            label="Your Contracts"
            gap="8px"
            src={IconPath.info}
          />
        }
        ContractsTable={
          state.isReviewed ? (
            <ContractsTable rows={displayedContracts} columns={columns} />
          ) : (
            <ContractsTable
              rows={displayedContracts}
              columns={columns}
              enableRowSelection={!state.isReviewed}
              handleSelection={(newSelectedRows) =>
                setState((prevState) => ({
                  ...prevState,
                  selectedRows: newSelectedRows as GridRowId[],
                }))
              }
              selectedRows={state.selectedRows}
            />
          )
        }
        SummaryCard={
          <SummaryCard
            contracts={summaryData.totalSelected}
            totalPayout={
              summaryData.totalPayment + summaryData.totalPayment * 0.12
            }
            sliderValue={summaryData.totalPayment}
            maxSliderValue={summaryData.totalAllContractsPayment}
            finalCashkick={summaryData.totalAllContractsPayment}
            variedCashkick={summaryData.totalPayment}
            percetageAmount={summaryData.totalPayment * 0.12}
            paybackAmount={summaryData.totalPayment}
            percentage={12}
            initialIsReviewed={state.isReviewed}
            reviewCredit={handleReviewClick}
            onClickResetData={handleResetData}
            handleSliderChange={handleSliderChange}
          />
        }
        onBackClick={handleBackClick}
      >
        Back
      </NewCashKick>
      <CashKickDialogueBox
        open={state.openCashKickDialog}
        onClose={handleCloseDialog}
        createCashKickHandler={createCashKickHandler}
        onViewCashKick={handleViewCashKick}
      />
    </ThemeProvider>
  );
};

export default NewCashkick;
