import React from 'react';
import { Box, styled, Theme, useTheme } from '@mui/material';

const CashAccelerationFlexBox = styled(Box)({
  width: '100%',
  minWidth: '1500px',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'row',
  gap: '30px',
});

const LeftFlexBox = styled(Box)({
  width: '20%',
  minWidth: '250px',
  height: '100vh',
  minHeight: '768px',
  // border: `1px solid ${theme.palette.Borders.lowEmphasis}`,
  // backgroundColor: theme.palette.background.elevation1,
});

const RightFlexBox = styled(Box)({
  width: '78%',
  marginRight: '20px',
  marginBottom: '50px',
});

const HeaderCardBox = styled(Box)({
  width: '100%',
  minWidth: '1060px',
  minHeight: '71px',
  marginTop: '40px',
});

const CashAccelerationCashKickFlexBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  gap: '15px',
  marginTop: '30px',
});

const CashAcclerationBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '70%',
  minWidth: '700px',
  minHeight: '259px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.Borders.lowEmphasis}`,
  backgroundColor: theme.palette.background.elevation1,
  padding: '32px',
  gap: '12px',
}));

const CongratsBox = styled(Box)({
  width: '70%',
  height: '100%',
  minWidth: '700px',
  minHeight: '259px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderRadius: '12px',
  gap: '12px',
});

const CashKickBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '30%',
  minWidth: '346px',
  maxHeight: '257px',
  border: `1px solid ${theme.palette.Borders.lowEmphasis}`,
  borderRadius: '12px',
  backgroundColor: theme.palette.background.elevation1,
}));

const DueChipOutstandingBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  paddingLeft: '28px',
  paddingRight: '28px',
  borderRadius: '12px',
  backgroundColor: theme.palette.background.elevation1,
  border: `1px solid ${theme.palette.Borders.lowEmphasis}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ContractsBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxHeight: '479px',
  marginTop: '20px',
  overflowY: 'auto',
  borderRadius: '12px',
  gap: '20px',
}));

interface CashAcclerationTemplateProps {
  SideNavBar?: React.ReactNode;
  HeaderCard?: React.ReactNode;
  CashAccelerationCard1?: React.ReactNode;
  CashAccelerationCard2?: React.ReactNode;
  CashAccelerationCard3?: React.ReactNode;
  CongratsCard?: React.ReactNode;
  DueChip?: React.ReactNode;
  OutstandingAmount?: React.ReactNode;
  CashKickCard?: React.ReactNode;
  ContractsOrganism?: React.ReactNode;
}

const CashAcclerationTemplate: React.FC<CashAcclerationTemplateProps> = ({
  SideNavBar,
  HeaderCard,
  CashAccelerationCard1,
  CashAccelerationCard2,
  CashAccelerationCard3,
  CongratsCard,
  DueChip,
  OutstandingAmount,
  CashKickCard,
  ContractsOrganism,
}) => {
  const theme = useTheme();

  return (
    <CashAccelerationFlexBox theme={theme}>
      <LeftFlexBox theme={theme}>{SideNavBar}</LeftFlexBox>
      <RightFlexBox theme={theme}>
        <HeaderCardBox>{HeaderCard}</HeaderCardBox>
        <CashAccelerationCashKickFlexBox>
          {CashAccelerationCard1 && (
            <CashAcclerationBox theme={theme}>
              {CashAccelerationCard1}
              {CashAccelerationCard2}
              {CashAccelerationCard3}
            </CashAcclerationBox>
          )}
          {DueChip && OutstandingAmount && (
            <>
              <DueChipOutstandingBox>{DueChip}</DueChipOutstandingBox>
              <DueChipOutstandingBox>{OutstandingAmount}</DueChipOutstandingBox>
            </>
          )}
          {CongratsCard && <CongratsBox>{CongratsCard}</CongratsBox>}
          <CashKickBox>{CashKickCard}</CashKickBox>
        </CashAccelerationCashKickFlexBox>
        <ContractsBox theme={theme}>{ContractsOrganism}</ContractsBox>
      </RightFlexBox>
    </CashAccelerationFlexBox>
  );
};

export default CashAcclerationTemplate;
