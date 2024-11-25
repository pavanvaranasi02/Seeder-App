import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import theme from '../../../theme';
import { convertCurrentFormatToDollars } from '../../../utils/helper';

export interface CashKickCardProps {
  cashKickkamount: number;
  onClick?: () => void;
}

const CardContainer = styled(Stack)({
  width: '100%',
  // minWidth: '346px',
  padding: '31px',
  height: '100%',
  backgroundColor: theme.palette.background.elevation1,
  borderRadius: '12px',
  border: `1px solid ${theme.palette.Borders.lowEmphasis}`,
  gap: '12px',
});

const StyledButton = styled(Button)({
  padding: '20px 40px',
  borderRadius: '12px',
  width: '278px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
});

const CashKickCard: React.FC<CashKickCardProps> = ({
  cashKickkamount,
  onClick,
}) => {
  return (
    <CardContainer>
      <Box>
        <Typography variant="heading2" color={theme.palette.text.highEmphasis}>
          Launch a new
        </Typography>
        <Box>
          <Typography
            variant="heading2"
            color={theme.palette.text.highEmphasis}
          >
            Cash Kick
          </Typography>
        </Box>
      </Box>

      <Stack spacing={1}>
        <Box>
          <Typography variant="body1" color={theme.palette.text.lowEmphasis}>
            You have up to{' '}
            <Typography
              component="span"
              variant="body1"
              color={theme.palette.text.mediumEmphasis}
              sx={{ fontWeight: 'bold' }}
            >
              {convertCurrentFormatToDollars(cashKickkamount)}
            </Typography>{' '}
            available
          </Typography>
          <Typography variant="body1" color={theme.palette.text.lowEmphasis}>
            for a new cash advance
          </Typography>
        </Box>
      </Stack>
      <StyledButton variant="contained" onClick={onClick}>
        New Cash Kick
      </StyledButton>
    </CardContainer>
  );
};

export default CashKickCard;
