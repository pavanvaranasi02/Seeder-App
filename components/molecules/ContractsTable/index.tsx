import React from 'react';
import { Box, styled, SxProps, Theme, BoxProps } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridRowId,
  GridRowParams,
} from '@mui/x-data-grid';
import CheckBox from '../../atoms/CheckBox/index';

const MainContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  height: '100%',
});

export interface ISeederDataGridProps extends DataGridProps {
  enableRowSelection?: boolean;
  handleSelection?: React.Dispatch<React.SetStateAction<GridRowId[]>>;
  selectedRows?: GridRowId[];
  isSelectable?: (params: GridRowParams<any>) => boolean;
  sx?: React.CSSProperties;
  boxComponent?: React.ReactElement<BoxProps>;
}

interface NoRowsOverlayProps
  extends React.HTMLAttributes<HTMLDivElement | undefined> {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
}
const ContractsTable: React.FC<ISeederDataGridProps> = ({
  rows,
  columns,
  enableRowSelection,
  handleSelection,
  selectedRows,
  isSelectable,
  boxComponent,
}) => {
  const updatedColumns = columns.map((column) => ({
    ...column,
    flex: 1,
    minWidth: 150,
  }));
  const DataGridContainer = styled(Box)({
    width: '100%',
    height: rows === undefined || rows.length === 0 ? '60vh' : '100%',
    overflowY: 'auto',
  });

  const NoRowsOverlayComponent: React.FC<NoRowsOverlayProps> = ({
    children,
    ...props
  }) => {
    return boxComponent ? boxComponent : null;
  };

  const onCheckboxClick = (rowIds: GridRowId[]) => {
    handleSelection?.(rowIds);
  };

  return (
    <MainContainer>
      <DataGridContainer data-testid="datagrid-container">
        <DataGrid
          rows={rows ?? []}
          columns={updatedColumns}
          {...(enableRowSelection ? { checkboxSelection: true } : {})}
          disableRowSelectionOnClick
          disableVirtualization
          hideFooter
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          slots={{
            baseCheckbox: CheckBox,
            noRowsOverlay: NoRowsOverlayComponent,
          }}
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={onCheckboxClick}
          isRowSelectable={isSelectable}
          data-testid="contracts"
        />
      </DataGridContainer>
    </MainContainer>
  );
};

export default ContractsTable;
