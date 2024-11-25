import React, { useState } from 'react';
import { Box, Stack, styled, Theme, useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { TypographyIconMolecule } from '../../molecules/TypographyWithIcon';
import ContractsTable from '../../molecules/ContractsTable';
import Button from '../../atoms/Button/index';
import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import IconPath from '../../../utils/Constants';
import TableEmptyCard from '../TableEmptyCard';

interface IMyContractRows {
  name?: string;
  status?: string;
  type?: string;
  perPayment?: string;
  totalFinanced?: string;
  totalAvailable?: string;
  termLength?: string[];
  paymentAmount?: string;
}

interface IMyCashKickRows {
  name?: string;
  status?: string;
  maturity?: string;
  totalReceived?: string[];
  totalFinanced?: string;
}

export interface CashAccelerationProps {
  enableSync: boolean;
  myContractsRows?: IMyContractRows[];
  myContractsColumns: GridColDef<any>[];
  myCashKickRows?: IMyCashKickRows[];
  myCashKickColumns: GridColDef<any>[];
  activeButton?: string;
  isInitial?: boolean;
  hasError?: boolean;
  cashKickPressed?: boolean;
  // isSuccessful?: boolean;
  id?: string;
}

const CashAccelerationBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  height: 'auto',
  borderRadius: '12px',
  border: '1px solid',
  borderColor: theme.palette.Borders.lowEmphasis,
  backgroundColor: theme.palette.background.elevation1,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  padding: '32px',
}));

const ButtonStack = styled(Stack)({
  flexDirection: 'row',
  gap: '12px',
});

const StyledButton = styled(Button)<{ active?: boolean }>(
  ({ theme, active }) => ({
    backgroundColor: active
      ? theme.palette.primary.purple['600']
      : theme.palette.structural.grey['100'],
    color: active
      ? theme.palette.primary.purple['400']
      : theme.palette.text.mediumEmphasis,
    borderColor: active
      ? theme.palette.primary.purple['400']
      : theme.palette.Borders.highEmphasis,
    boxShadow: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    '&:hover': {
      backgroundColor: active ? theme.palette.primary.purple['600'] : 'default',
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  })
);

const HeaderStack = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const StyledTypography = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.purple[400],
  fontSize: '16px',
}));

const SyncNowButton = styled(Button)({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  width: '150px',
});

const CashAcceleration: React.FC<CashAccelerationProps> = ({
  enableSync,
  activeButton: initialActiveButton = 'myCashKicks',
  myContractsRows,
  myContractsColumns,
  myCashKickRows,
  myCashKickColumns,
  isInitial,
  hasError,
  cashKickPressed,
  id,
}) => {
  const [activeButton, setActiveButton] = useState(initialActiveButton);
  const [showContractsTable, setShowContractsTable] = useState(false);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const theme = useTheme();

  const displayTable = () => {
    if (myContractsRows?.length !== 0 && !showContractsTable) {
      setTimeout(() => {
        setShowContractsTable(true);
      }, 2000);
    }
  };

  const renderContractsContent = () => {
    if (myContractsRows?.length === 0 && isInitial) {
      return (
        <TableEmptyCard
          columns={myContractsColumns}
          isInitial={true}
          onConnect={() => {}}
          onFailure={() => {}}
        />
      );
    } else if (myContractsRows?.length === 0 && hasError) {
      return (
        <TableEmptyCard
          columns={myContractsColumns}
          isInitial={false}
          onConnect={() => {}}
          onFailure={() => {}}
        />
      );
    } else {
      displayTable();
      return (
        <>
          {showContractsTable ? (
            <ContractsTable
              columns={myContractsColumns}
              rows={myContractsRows}
            />
          ) : (
            <TableEmptyCard
              columns={myContractsColumns}
              isSuccessful={true}
              onConnect={() => {}}
              onFailure={() => {}}
              data-testid="empty-table"
            />
          )}
        </>
      );
    }
  };

  const renderCashKicksContent = () => {
    if (myCashKickRows?.length === 0 && cashKickPressed) {
      return (
        <TableEmptyCard
          columns={myCashKickColumns}
          cashKickPressed={true}
          onConnect={() => {}}
          onFailure={() => {}}
        />
      );
    } else if (myCashKickRows?.length === 0 && hasError) {
      return (
        <TableEmptyCard
          columns={myCashKickColumns}
          cashKickPressed={false}
          onConnect={() => {}}
          onFailure={() => {}}
        />
      );
    } else {
      return (
        <ContractsTable rows={myCashKickRows} columns={myCashKickColumns} />
      );
    }
  };

  return (
    <CashAccelerationBox theme={theme} data-testid={id}>
      <HeaderStack>
        <TypographyIconMolecule
          label="Cash acceleration"
          variant="heading2"
          src={IconPath.InfoIcon}
          gap="8px"
        />
        {enableSync && (
          <SyncNowButton disableRipple>
            <Icon src={IconPath.Refresh} alt="Refresh" />
            <StyledTypography variant="button" noWrap theme={theme}>
              Sync Now
            </StyledTypography>
          </SyncNowButton>
        )}
      </HeaderStack>
      <ButtonStack>
        <StyledButton
          theme={theme}
          variant="contained"
          active={activeButton === 'myContracts'}
          onClick={() => handleButtonClick('myContracts')}
          disableRipple
          disableFocusRipple
        >
          My Contracts
        </StyledButton>
        <StyledButton
          variant="contained"
          active={activeButton === 'myCashKicks'}
          onClick={() => handleButtonClick('myCashKicks')}
          disableRipple
          disableFocusRipple
        >
          My Cashkicks
        </StyledButton>
      </ButtonStack>
      {activeButton === 'myContracts'
        ? renderContractsContent()
        : renderCashKicksContent()}
    </CashAccelerationBox>
  );
};

export default CashAcceleration;
