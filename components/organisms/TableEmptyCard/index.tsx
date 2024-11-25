import React from 'react';
import { GridColDef, DataGridProps } from '@mui/x-data-grid';
import { styled,Box } from '@mui/material';
import theme from '../../../theme/index';
import ContractsTable from '../../molecules/ContractsTable';
import IconTypography from '../../molecules/IconTypography/index';
import IconPath from '../../../utils/Constants';

export interface TableEmptyCardProps extends DataGridProps {
    columns: GridColDef[];
    isSuccessful?: boolean;
    isInitial?: boolean;
    cashKickPressed?: boolean;
    onLaunch?:()=>void;
    onFailure:()=>void;
    onConnect:()=>void;
    rows?:any[];
}


const InnerBox = styled(Box)({
    height: "100%",
    width: "100%",
    backgroundColor: "inherit",
    textAlign: "center",
    position: "relative",
    top: "25%"
});
 
const TableEmptyCard: React.FC<TableEmptyCardProps> = ({ columns,rows, isSuccessful,isInitial , cashKickPressed,onLaunch,onFailure,onConnect }) => {
    let noRows=()=> {
        let inner = null;
        if (isInitial  ) {
            inner = (
                <IconTypography
                    iconSrc={IconPath.financePlanning}
                    typo={[
                        {
                            variant: "heading3",
                            color: theme.palette.text.lowEmphasis,
                            children: (
                                <>
                                    Connect your preferred payments
                                    <br />
                                    or subscriptions platform to import contracts
                                </>
                            ),
                        },
                    ]}
                    iconHeight="160px"
                    iconWidth="231.72px"
                    buttonLabel="Connect Now"
                    onClick={onConnect}
                />
            );
        } else if ( cashKickPressed) {
            inner = (
                <IconTypography
                    iconSrc={IconPath.chequeIllustration}
                    typo={[
                        {
                            variant: "heading3",
                            color: theme.palette.text.lowEmphasis,
                            children: (
                                <>
                                    You don’t have any Cash Kick
                                </>
                            ),
                        },
                    ]}
                    iconHeight="160px"
                    iconWidth="231.72px"
                    buttonLabel="Launch A new cash kick"
                    onClick={onLaunch}
                />
            );
        } else if (isSuccessful) {
            inner = (
                <IconTypography
                    iconSrc={IconPath.coinsBag}
                    typo={[
                        {
                            variant: "heading3",
                            color: theme.palette.text.highEmphasis,
                            children: (
                                <>
                                    Connected Successfully
                                </>
                            ),
                        },
                    ]}
                    iconHeight="160px"
                    iconWidth="233px"
                />
            );
        } else {
            inner = (
                <IconTypography
                    iconSrc={IconPath.warningImg}
                    typo={[
                        {
                            variant: "heading3",
                            color: theme.palette.text.highEmphasis,
                            children: (
                                <>
                                    Failed to load contracts!
                                </>
                            ),
                        },
                        {
                            variant: "caption",
                            color: theme.palette.text.lowEmphasis,
                            children: (
                                <>
                                    Please contact customer support if this problem persists
                                </>
                            ),
                        }
                    ]}
                    iconHeight="160px"
                    iconWidth="231.72px"
                    buttonLabel="Retry"
                    onClick={onFailure}
                />
            );
        }
        return (
            <InnerBox>
                {inner}
            </InnerBox>
        );
    }
   

    return (
        <Box>
            <ContractsTable
                rows={rows}
                columns={columns}
                disableColumnMenu
                disableColumnFilter
                disableColumnSelector
                hideFooter={true}
                boxComponent={noRows()}
            />
        </Box>
    );
};

export default TableEmptyCard;
