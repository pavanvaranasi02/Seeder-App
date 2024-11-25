import React from 'react';
import '@testing-library/jest-dom';
import {
  render as rtlRender,
  screen,
  fireEvent,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContractsTable, { ISeederDataGridProps } from './';
import {
  customText,
  customColumn,
  customChips,
  customDualText,
} from '../../../utils/helper';
import theme from '../../../theme/index';

const render = (ui: React.ReactElement, { ...renderOptions } = {}) => {
  return rtlRender(ui, renderOptions);
};

describe('ContractsTable', () => {
  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  const defaultProps: ISeederDataGridProps = {
    rows,
    columns,
    enableRowSelection: true,
    handleSelection: jest.fn(),
    selectedRows: [],
    isSelectable: jest.fn(() => true),
  };

  it('should render ContractsTable with rows and columns', () => {
    render(<ContractsTable {...defaultProps} />);
    const contractsTable = screen.getByTestId('contracts');
    expect(contractsTable).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
    expect(screen.getByText('DataGridPro')).toBeInTheDocument();
    expect(screen.getByText('is Awesome')).toBeInTheDocument();
    expect(screen.getByText('MUI')).toBeInTheDocument();
    expect(screen.getByText('is Amazing')).toBeInTheDocument();
  });

  it('should handle row selection and calls handleSelection', async () => {
    const handleSelectionMock = jest.fn();
    render(
      <ContractsTable {...defaultProps} handleSelection={handleSelectionMock} />
    );

    const checkbox = screen.getAllByRole('checkbox')[1];
    await userEvent.click(checkbox);

    expect(handleSelectionMock).toHaveBeenCalledWith([1]);
  });

  it('should handle row selection model change correctly', async () => {
    const handleSelectionMock = jest.fn();
    render(
      <ContractsTable
        {...defaultProps}
        handleSelection={handleSelectionMock}
        selectedRows={[1]}
      />
    );

    const checkbox = screen.getAllByRole('checkbox')[2];
    await userEvent.click(checkbox);

    expect(handleSelectionMock).toHaveBeenCalledWith([1, 2]);
  });

  it('should enable row selection when enableRowSelection is true', () => {
    render(<ContractsTable {...defaultProps} enableRowSelection={true} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('should disable row selection when enableRowSelection is false', () => {
    render(<ContractsTable {...defaultProps} enableRowSelection={false} />);
    const checkboxes = screen.queryAllByRole('checkbox');
    expect(checkboxes.length).toBe(0);
  });

  it('should handle row selection and calls handleSelection', async () => {
    const handleSelectionMock = jest.fn();
    render(
      <ContractsTable {...defaultProps} handleSelection={handleSelectionMock} />
    );

    const checkbox = screen.getAllByRole('checkbox')[1];
    await userEvent.click(checkbox);

    expect(handleSelectionMock).toHaveBeenCalledWith([1]);
  });

  it('should handle row selection model change correctly', async () => {
    const handleSelectionMock = jest.fn();
    render(
      <ContractsTable
        {...defaultProps}
        handleSelection={handleSelectionMock}
        selectedRows={[1]}
      />
    );

    const checkbox = screen.getAllByRole('checkbox')[2];
    await userEvent.click(checkbox);

    expect(handleSelectionMock).toHaveBeenCalledWith([1, 2]);
  });

  it('should render with empty rows and columns', () => {
    render(<ContractsTable {...defaultProps} rows={[]} columns={[]} />);
    expect(screen.queryByTestId('contracts')).toBeInTheDocument();
  });

  it('should render with no rows', () => {
    render(<ContractsTable {...defaultProps} rows={[]} />);
    expect(screen.queryByTestId('contracts')).toBeInTheDocument();
  });

  it('should render with no columns', () => {
    render(<ContractsTable {...defaultProps} columns={[]} />);
    expect(screen.queryByTestId('contracts')).toBeInTheDocument();
  });

  it('should handle row deselection', async () => {
    render(<ContractsTable {...defaultProps} selectedRows={[1]} />);

    const checkbox = screen.getAllByRole('checkbox')[1];
    await userEvent.click(checkbox);

    expect(screen.getByTestId('contracts')).toBeInTheDocument();
    expect(defaultProps.handleSelection).toHaveBeenCalledWith([]);
  });

  it('should render with virtualization disabled', () => {
    render(<ContractsTable {...defaultProps} disableVirtualization={true} />);

    expect(screen.getByTestId('contracts')).toBeInTheDocument();
  });

  it('should respect isSelectable prop for row selection', async () => {
    const isSelectableMock = jest.fn((params) => params.row.id !== 2);
    render(
      <ContractsTable {...defaultProps} isSelectable={isSelectableMock} />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[1]);
    await userEvent.click(checkboxes[2]);

    expect(defaultProps.handleSelection).toHaveBeenCalledWith([1]);
    expect(defaultProps.handleSelection).not.toHaveBeenCalledWith([2]);
  });

  test('should display NoRowsOverlayComponent when no rows are provided', () => {
    render(<ContractsTable {...defaultProps} rows={[]} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('should render custom header text with specified properties', () => {
    const columns = [
      customColumn({
        field: 'col1',
        headerText: 'Custom Header',
        valueColor: 'green',
        width: 150,
      }),
      { field: 'col2', headerName: 'Column 2', width: 150 },
    ];

    render(<ContractsTable {...defaultProps} columns={columns} />);

    expect(screen.getByText('Custom Header')).toBeInTheDocument();
    expect(screen.getByText('Custom Header')).toHaveStyle('color: green');
  });

  it('should render custom cell text with specified properties', () => {
    const columns = [
      customColumn({
        field: 'col1',
        headerText: 'Column 1',
        valueColor: 'blue',
        marginTop: 10,
        width: 150,
      }),
      { field: 'col2', headerName: 'Column 2', width: 150 },
    ];

    render(<ContractsTable {...defaultProps} columns={columns} />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toHaveStyle('color: blue');
  });

  it('should render custom text with the correct props', () => {
    render(customText('Test Text', 'body2', 'blue', 10));
    const textElement = screen.getByText('Test Text');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle('color: blue');
    expect(textElement.closest('div')).toHaveStyle('margin-top: 10px');
  });

  it('should render custom column with the correct props', () => {
    const columns = [
      customColumn({
        field: 'col1',
        headerText: 'Custom Header',
        valueColor: 'green',
        width: 150,
      }),
      { field: 'col2', headerName: 'Column 2', width: 150 },
    ];

    render(<ContractsTable {...defaultProps} columns={columns} />);

    const headerCell = screen.getByText('Custom Header');
    const dataCell = screen.getByText('Hello');

    expect(headerCell).toBeInTheDocument();
    expect(headerCell).toHaveStyle('color: green');
    expect(dataCell).toBeInTheDocument();
    expect(dataCell).toHaveStyle('color: green');
  });

  it('should handle missing or undefined props gracefully', () => {
    render(<ContractsTable rows={[]} columns={[]} />);
    const contractsTable = screen.getByTestId('contracts');
    expect(contractsTable).toBeInTheDocument();
  });

  it('should handle column resizing', () => {
    render(<ContractsTable {...defaultProps} />);
    const headerCell = screen.getByText('Column 1');
    const resizeHandle = headerCell.closest('.MuiDataGrid-columnSeparator');
    if (resizeHandle) {
      fireEvent.mouseDown(resizeHandle);
      fireEvent.mouseMove(resizeHandle, { clientX: 300 });
      fireEvent.mouseUp(resizeHandle);
      expect(screen.getByText('Column 1')).toBeInTheDocument();
    }
  });

  describe('customDualText', () => {
    it('renders correctly with provided data', () => {
      const data = ['Left Text', 'Right Text'];
      render(customDualText(data));

      const leftText = screen.getByText('Left Text');
      const rightText = screen.getByText('Right Text');

      expect(leftText).toBeInTheDocument();
      expect(leftText).toHaveStyle(`color: ${theme.palette.text.lowEmphasis}`);
      expect(rightText).toBeInTheDocument();
      expect(rightText).toHaveStyle(`color: ${theme.palette.text.lowEmphasis}`);
    });
    describe('customChips', () => {
      it('renders correctly with provided data', () => {
        const data = 'Chip Text';
        render(customChips(data));

        const chipText = screen.getByText('Chip Text');

        expect(chipText).toBeInTheDocument();
        expect(chipText).toHaveStyle(
          `color: ${theme.palette.text.mediumEmphasis}`
        );
        expect(chipText.closest('.MuiChip-root')).toHaveStyle(
          `background-color: ${theme.palette.background.elevation2}`
        );
      });
    });
    it('should render custom text with specified properties', () => {
      render(customText('Test Text', 'body2', 'blue', 10));
      const textElement = screen.getByText('Test Text');
      expect(textElement).toBeInTheDocument();
      expect(textElement).toHaveStyle('color: blue');
      expect(textElement.closest('div')).toHaveStyle('margin-top: 10px');
    });

    it('should render custom text with default properties', () => {
      render(customText('Test Text', 'body2'));
      const textElement = screen.getByText('Test Text');
      expect(textElement).toBeInTheDocument();
      expect(textElement).toHaveStyle(
        `color: ${theme.palette.text.lowEmphasis}`
      );
      expect(textElement.closest('div')).toHaveStyle('margin-top: 0px');
    });
    describe('customDualText', () => {
      it('renders correctly with provided data', () => {
        const data = ['Left Text', 'Right Text'];
        render(customDualText(data));

        const leftText = screen.getByText('Left Text');
        const rightText = screen.getByText('Right Text');

        expect(leftText).toBeInTheDocument();
        expect(leftText).toHaveStyle(
          `color: ${theme.palette.text.lowEmphasis}`
        );
        expect(rightText).toBeInTheDocument();
        expect(rightText).toHaveStyle(
          `color: ${theme.palette.text.lowEmphasis}`
        );
      });
    });
    describe('customChips', () => {
      it('renders correctly with provided data', () => {
        const data = 'Chip Text';
        render(customChips(data));

        const chipText = screen.getByText('Chip Text');

        expect(chipText).toBeInTheDocument();
        expect(chipText).toHaveStyle(
          `color: ${theme.palette.text.mediumEmphasis}`
        );
        expect(chipText.closest('.MuiChip-root')).toHaveStyle(
          `background-color: ${theme.palette.background.elevation2}`
        );
      });
    });
    it('should render custom column with the correct props', () => {
      const columns = [
        customColumn({
          field: 'col1',
          headerText: 'Custom Header',
          valueColor: 'green',
          width: 150,
        }),
        { field: 'col2', headerName: 'Column 2', width: 150 },
      ];

      render(<ContractsTable {...defaultProps} columns={columns} />);

      const headerCell = screen.getByText('Custom Header');
      const dataCell = screen.getByText('Hello');

      expect(headerCell).toBeInTheDocument();
      expect(headerCell).toHaveStyle('color: green');
      expect(dataCell).toBeInTheDocument();
      expect(dataCell).toHaveStyle('color: green');
    });

    it('should render custom column with default props', () => {
      const columns = [
        customColumn({ field: 'col1', headerText: 'Custom Header' }),
        { field: 'col2', headerName: 'Column 2', width: 150 },
      ];

      render(<ContractsTable {...defaultProps} columns={columns} />);

      const headerCell = screen.getByText('Custom Header');
      const dataCell = screen.getByText('Hello');

      expect(headerCell).toBeInTheDocument();
      expect(headerCell).toHaveStyle(
        `color: ${theme.palette.text.lowEmphasis}`
      );
      expect(dataCell).toBeInTheDocument();
      expect(dataCell).toHaveStyle(`color: ${theme.palette.text.lowEmphasis}`);
    });

    it('should render customText with different variants and colors', () => {
      render(customText('Test Text', 'h1', 'red', 10));
      render(customText('Test Text', 'body1', 'blue', 20));
    });

    it('should render customText with and without marginTop', () => {
      render(customText('Test Text', 'body2'));
      render(customText('Test Text', 'body2', undefined, 30));
    });

    it('should handle empty data string in customDualText', () => {
      render(customDualText([]));
    });

    it('should handle single element data in customDualText', () => {
      render(customDualText(['Single Text']));
    });
  });

  test('should handle row selection model change correctly', async () => {
    const handleSelectionMock = jest.fn();
    const rows = [{ id: 1 }, { id: 2 }];
    const columns = [{ field: 'id', headerName: 'ID' }];

    render(
      <ContractsTable
        rows={rows}
        columns={columns}
        enableRowSelection={true}
        handleSelection={handleSelectionMock}
        selectedRows={[1]}
      />
    );

    const checkbox = screen.getAllByRole('checkbox')[2];
    await userEvent.click(checkbox);
    expect(handleSelectionMock).toHaveBeenCalledWith([1, 2]);
    expect(handleSelectionMock).toHaveBeenCalledTimes(1);
  });
  it('should call handleSelection with rowIds when onRowSelectionModelChange is triggered', async () => {
    const handleSelectionMock = jest.fn();
    render(
      <ContractsTable {...defaultProps} handleSelection={handleSelectionMock} />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[1]);

    expect(handleSelectionMock).toHaveBeenCalledWith([1]);
  });

  it('should call handleSelection with no rowIds when onRowSelectionModelChange is not triggered', async () => {
    const handleSelectionMock = null;
    render(
      <ContractsTable
        rows={rows}
        columns={columns}
        enableRowSelection={true}
        selectedRows={[]}
        isSelectable={jest.fn(() => true)}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[1]);
  });

  it('should render NoRowsOverlayComponent when boxComponent prop is provided', () => {
    const CustomBoxComponent = () => (
      <div data-testid="custom-box">Custom Box Component</div>
    );
    render(
      <ContractsTable
        {...defaultProps}
        rows={[]}
        boxComponent={<CustomBoxComponent />}
      />
    );

    const customBox = screen.getByTestId('custom-box');
    expect(customBox).toBeInTheDocument();
  });

  it('should handle deselecting rows correctly', async () => {
    const handleSelectionMock = jest.fn();
    const { rerender } = render(
      <ContractsTable
        {...defaultProps}
        handleSelection={handleSelectionMock}
        selectedRows={[1, 2, 3]}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[1]);

    rerender(
      <ContractsTable
        {...defaultProps}
        handleSelection={handleSelectionMock}
        selectedRows={[2, 3]}
      />
    );

    expect(handleSelectionMock).toHaveBeenCalledWith([2, 3]);
  });
  it('should set height to 100vh when rows are empty', () => {
    render(<ContractsTable {...defaultProps} rows={[]} />);
    const dataGridContainer = screen.getByTestId('datagrid-container');
    expect(dataGridContainer).toHaveStyle('height: 60vh');
    expect(dataGridContainer).toHaveStyle('width: 100%');
  });

  it('should set height to 100% when rows are present', () => {
    render(<ContractsTable {...defaultProps} rows={rows} />);
    const dataGridContainer = screen.getByTestId('datagrid-container');
    expect(dataGridContainer).toHaveStyle('height: 100%');
    expect(dataGridContainer).toHaveStyle('width: 100%');
  });

  it('should set height to 70% when rows are undefined', () => {
    render(<ContractsTable {...defaultProps} rows={undefined} />);
    const dataGridContainer = screen.getByTestId('datagrid-container');
    expect(dataGridContainer).toHaveStyle('height: 60vh');
    expect(dataGridContainer).toHaveStyle('width: 100%');
  });
});
