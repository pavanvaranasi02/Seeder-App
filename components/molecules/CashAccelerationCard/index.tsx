import React from 'react'
import { Box, Stack, styled} from '@mui/material'
import Icon from '../../atoms/Icon'
import Typography from '../../atoms/Typography'
import StyledChip from '../../atoms/Chip'
import CustomCircularProgress from '../../atoms/Progress'
import theme from '../../../theme'

export interface CashAccelerationProps{
    width:string,
    height?:string,
    padding?:string,
    cardbackground?:string,
    cardBorder?:string,
    cardBorderRadius?:string,
    cardIconSrc:string,
    src:string,
    alt:string,
    content:string,
    value:string,
    label?: string;
    progressValue?: number;
    progressSize?: number;
    progressStrokeWidth?: number;
    progressColor?: string;
    progressFontSize?: number | string;

}

export const CardContainer = styled(Box)<{ width: string; height?: string; cardBackground?: string; cardBorder?: string, cardBorderRadius?:string,}>(
    ({ theme, cardBackground, cardBorder, width, height,cardBorderRadius }) => ({
        width: width,
        height: height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: cardBackground ?? theme.palette.background.elevation1,
        border: cardBorder ? `1px solid ${cardBorder}` : 'none',
        boxSizing: 'border-box',
        position: 'relative',
        borderRadius:cardBorderRadius ?? '0' ,
    })
);

const CustomStyledChip = styled(StyledChip)(({ theme }) => ({
    position: 'absolute',
    top: '22px',
    right: '20px',
    opacity: 1,
    zIndex: 1,
    width: '123px',
    height: '25px',
    backgroundColor: theme.palette.customColors.dueChip,
    '& .MuiChip-label': {
    fontWeight: 600,
    fontSize: 14,
  },
}));

const ContentContainer = styled(Box)<{ padding?: string }>(({ padding }) => ({
    padding: padding,
    gap: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
}));

const IconContainer = styled(Box)(({ theme }) => ({
    width: '80px',
    height: '80px',
    padding: '20px',
    backgroundColor: theme.palette.structural.grey[100] ,
    border: '1px solid',
    borderColor: theme.palette.Borders.lowEmphasis,
    borderRadius: '12px',
}));

const StyledIcon = styled(Icon)<{ width?: string; height?: string }>`
  width: ${({ width }) => width ?? '16px'};
  height: ${({ height }) => height ?? '16px'};
`;

export const InnerTypographyStack = styled(Stack)`
  gap: 8px;
  align-items: center;
  flex-direction: row; 
`;

export const TypographyStack = styled(Stack)`
  gap: 8px;
  flex-direction: column;  
`;

const CashAccelerationCard:React.FC<CashAccelerationProps> = ({width,height,padding,content,value,cardIconSrc,src,label,alt,cardbackground,cardBorder,cardBorderRadius,progressValue, progressSize, progressStrokeWidth, progressColor, progressFontSize}) => {

    const isDueDate = content.toLowerCase().includes('due');
    const isShowProgress  = content.toLowerCase().includes('outstanding');


  return (
    <CardContainer data-testid="card-container"  width={width} height={height} cardBackground={cardbackground} cardBorder={cardBorder} cardBorderRadius={cardBorderRadius}>

        {isDueDate && (
            <CustomStyledChip label={label}/>
        )}

        <ContentContainer padding={padding}>
            {isShowProgress ? (
                <Box data-testid="custom-circular-progress">
                <CustomCircularProgress
                value={progressValue ?? 0}
                size={progressSize ?? 80}
                strokeWidth={progressStrokeWidth ?? 6}
                customcolor={progressColor}
                customfontsize={progressFontSize}
                />
            </Box>
            ) : (
            <IconContainer>
                <StyledIcon src={cardIconSrc} height='40px' width='40px'></StyledIcon>
            </IconContainer>
            )}

            <TypographyStack  data-testid="typography-stack">
                <InnerTypographyStack data-testid="inner-typography-stack" alignItems='center' justifyContent='flex-start'>
                    <Typography variant='body1' color={theme.palette.text.mediumEmphasis} >{content}</Typography>
                    <StyledIcon src={src} alt={alt}></StyledIcon>
                </InnerTypographyStack>

                <Typography variant='heading2' color={theme.palette.text.highEmphasis}>{value}</Typography>
            </TypographyStack>

            </ContentContainer>
        </CardContainer>
  )
}

export default CashAccelerationCard