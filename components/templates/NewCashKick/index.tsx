import React from 'react';
import { Box, Stack, styled } from '@mui/material';
import CustomButton from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import IconPath from '../../../utils/Constants';

export interface CashKickProps {
  SideNavBar: React.ReactNode;
  HeaderCard: React.ReactNode;
  children: string;
  TypographyIconMolecule: React.ReactNode;
  ContractsTable: React.ReactNode;
  SummaryCard: React.ReactNode;
  onBackClick: () => void;
}

const StyledContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100vh',
  backgroundColor: theme.palette.background.elevation0,
  '@media (max-width: 960px)': {
    gap: '20px',
  },
  // '@media (max-width: 1685px)': {
  //   overflow: 'none',
  // },
  // '@media (max-width: 1480px)': {
  //   overflow: 'none',
  // },
  // '@media (min-width: 1920px)': {
  //   gap: '20px',
  //   width: '100%',
  // },
}));

const StyledSideBar = styled(Box)(({ theme }) => ({
  height: '100vh',
  overflow: 'none',
  width: '250px',
  backgroundColor: theme.palette.background.elevation1,
  '@media (min-width: 1920px)': {
    width: 'auto',
  },
  '@media (max-width: 1685px)': {
    overflow: 'none',
    width: '250px',
  },
  '@media (max-width: 1480px)': {
    overflow: 'none',
    width: '250px',
  },
}));

const StyledRightStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  margin: '30px',
  height: '60%',
  '@media (max-width: 960px)': {
    width: '100%',
    margin: '20px 0',
    overflow: 'auto',
    height: 'auto',
  },
  '@media (max-width: 600px)': {
    margin: '10px 0',
  },
  '@media (max-width: 1480px)': {
    width: '70%',
  },
  '@media (max-width: 1685px)': {
    width: '50%',
  },
  '@media (min-width: 1920px)': {
    margin: '20px',
    width: '85%',
  },
}));

const StyledHeader = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '80px',
  '@media (max-width: 600px)': {
    margin: '15px 0',
  },
  '@media (max-width: 1480px)': {
    width: '100%',
  },
  '@media (max-width: 1685px)': {
    width: '100%',
  },
  '@media (min-width: 1920px)': {
    height: '100px',
  },
}));

const StyledButton = styled(CustomButton)(({ theme }) => ({
  float: 'left',
  height: '30px',
  border: `1px solid ${theme.palette.Borders.lowEmphasis}`,
  borderRadius: '12px',
  color: theme.palette.text.highEmphasis,
  backgroundColor: theme.palette.background.elevation1,
  '&:hover': {
    backgroundColor: theme.palette.background.elevation1,
  },
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: '6px 12px',
  marginTop: '20px',
  '@media (max-width: 600px)': {
    marginTop: '20px',
  },
  '@media (min-width: 1920px)': {
    padding: '10px 20px',
    marginTop: '60px',
  },
}));

const StyledInnerStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(5),
  marginTop: '30px',
  height: '70vh',
  '@media (max-width: 960px)': {
    flexDirection: 'column',
    gap: '20px',
  },
  '@media (max-width: 1480px)': {
    height: '70vh',
    paddingRight: '5%',
    width: '100%',
  },
  '@media (max-width: 1685px)': {
    width: '100%',
    flexGrow: 0,
  },
  '@media (min-width: 1920px)': {
    gap: theme.spacing(8),
    marginTop: '60px',
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxWidth: '1000px',
  border: `1px solid ${theme.palette.Borders.lowEmphasis}`,
  borderRadius: '12px',
  backgroundColor: theme.palette.background.elevation1,
  padding: '32px 0px 32px 32px',
  '@media (max-width: 770px)': {
    paddingTop: '20px',
    height: '60%',
  },
  '@media (max-width: 1480px)': {
    height: '100%',
    width: '100%',
  },
  '@media (max-width: 1685px)': {
    width: '72%',
    height: '100%',
  },
  '@media (min-width: 1920px)': {
    padding: '40px 0px 40px 40px',
  },
}));

const StyledSummary = styled(Box)(({ theme }) => ({
  height: '90%',
  width: '360px',
  borderRadius: '12px',
  overflow: 'auto',
  backgroundColor: theme.palette.background.elevation1,
  '@media (min-width: 1920px)': {
    width: '400px',
  },
  '@media (max-width: 1480px)': {
    height: '98%',
  },
  '@media (max-width: 1685px)': {
    height: '98%',
  },
}));

const StyledtableBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(5),
  height: 'auto',
  '@media (max-width: 960px)': {
    paddingTop: '20px',
  },
  '@media (max-width: 1480px)': {
    height: '100%',
    width: 'auto',
  },
  '@media (max-width: 1685px)': {
    height: '100%',
  },
  '@media (min-width: 1920px)': {
    paddingTop: theme.spacing(6),
    height: '80%',
  },
}));

const NewCashKick: React.FC<CashKickProps> = ({
  SideNavBar,
  HeaderCard,
  children,
  TypographyIconMolecule,
  ContractsTable,
  SummaryCard,
  onBackClick,
}) => {
  return (
    <StyledContainer>
      <StyledSideBar>{SideNavBar}</StyledSideBar>
      <StyledRightStack>
        <StyledHeader>{HeaderCard}</StyledHeader>
        <span>
          <StyledButton onClick={onBackClick}>
            <Icon src={IconPath.LeftArrow} />
            {children}
          </StyledButton>
        </span>
        <StyledInnerStack>
          <StyledBox>
            {TypographyIconMolecule}
            <StyledtableBox>{ContractsTable}</StyledtableBox>
          </StyledBox>
          <StyledSummary>{SummaryCard}</StyledSummary>
        </StyledInnerStack>
      </StyledRightStack>
    </StyledContainer>
  );
};

export default NewCashKick;
