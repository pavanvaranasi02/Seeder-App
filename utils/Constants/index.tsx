import React from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import theme from '../../theme';
import {
  customColumn,
  customText,
  customChips,
  customDualText,
  parseDollarAmount,
} from '../helper';
import { Typography } from '@mui/material';

const imgPath = '/assets/images';
const path = '/assets/icons';

const IconPath = {
  avatarImg: `${path}/Image.svg`,
  arrowDropDownIcon: `${path}/ArrowDropDown.svg`,

  google: `${imgPath}/google.svg`,
  stripe: `${imgPath}/stripe.svg`,
  xero: `${imgPath}/xero.svg`,
  seeder: `${imgPath}/seederLogo.svg`,

  IndeterminateImg: `${path}/minus-square.svg`,
  UncheckedImg: `${path}/no tick-square.svg`,
  CheckedImg: `${path}/tick-square.svg`,
  HomeIcon: `${path}/home.svg`,
  CashIcon: `${path}/cash.svg`,
  FlashIcon: `${path}/flash.svg`,
  info: `${path}/Info.svg`,
  LeftArrow: `${path}/LeftArrow.svg`,

  chequeIllustration: `${imgPath}/Cheque 3D Illustration 2.svg`,
  warningImg: `${imgPath}/Warning 3D.svg`,
  coinsBag: `${imgPath}/Coins Bag 3D Illustration 1.svg`,
  financePlanning: `${imgPath}/Finance Planning 3D Illustration.svg`,

  Lock: `${path}/lock.svg`,
  Email: `${path}/Email.svg`,
  Eye: `${path}/eye.svg`,
  Name: `${path}/Name.svg`,
  Seeder: `${path}/Seeder.svg`,
  Money: `${path}/Money.svg`,
  BusinessAnalysis: `${path}/BusinessAnalysis.svg`,
  Password: `${path}/Password.svg`,

  NotificationImg: `${path}/notification.svg`,
  MoreImg: `${path}/more.svg`,
  crossIcon: `${path}/crossIcon.svg`,
  reviewIcon: `${path}/review.gif`,
  settings: `${path}/Settings.svg`,
  logout: `${path}/Log Out.svg`,

  Tick: `${path}/tick.svg`,
  dueDate: `${path}/DueDate.svg`,
  percentage: `${path}/Percentage.svg`,
  calendar: `${path}/Calendar.svg`,
  documentDownload: `${path}/Document-download.svg`,
  Refresh: `${path}/Refresh.svg`,
  InfoIcon: `${path}/InfoIcon.svg`,
};
export const LoginFormTexts = {
  LoginTitle: 'Login to Seeder ✨',
  LoginHeading: 'Enter your mail id and password to login',
  EmailPlaceHolder: 'Enter your email id',
  PasswordPlaceHolder: 'Enter your password',
  ForgotPassword: 'Forgot Password?',
  Continue: 'Continue',
  Or: 'Or',
  DontHaveAccount: "Don't have an account?",
  SignUp: 'Sign Up',
  Google: 'Google',
  Stripe: 'Stripe',
  Xero: 'Xero',
  PasswordAlt: 'Password Icon',
  EyeAlt: 'Eye Icon',
  EmailAlt: 'Email Icon',
};

export const SignupFormTexts = {
  SignupTitle: 'Sign Up ✨',
  NamePlaceholder: 'Your Name',
  NameAlt: 'Name Icon',
  EmailPlaceholder: 'Email Address',
  PasswordPlaceholder: 'Password',
  AlreadyHaveAccount: 'Already have an account?',
  Login: 'Login',
};

export const AuthenticationTexts = {
  LogoTitle: 'Seeder',
  SeederAlt: 'Seeder Logo',
  BusinessAlt: 'Business Analysis',
};

export default IconPath;

export const cashAcclerationRows = [
  {
    id: 1,
    name: 'Contract 1',
    type: 'Monthly',
    perPayment: '$6,000.00',
    termLength: ['12 months', '12.0% fee'],
    paymentAmount: ['$63,360.00'],
  },
  {
    id: 2,
    name: 'Contract 2',
    type: 'Monthly',
    perPayment: '$6,000.00',
    termLength: ['12 months', '12.0% fee'],
    paymentAmount: ['$63,360.00'],
  },
  {
    id: 3,
    name: 'Contract 3',
    type: 'Monthly',
    perPayment: '$6,000.00',
    termLength: ['12 months', '12.0% fee'],
    paymentAmount: ['$63,360.00'],
  },
  {
    id: 4,
    name: 'Contract 4',
    type: 'Monthly',
    perPayment: '$6,000.00',
    termLength: ['12 months', '12.0% fee'],
    paymentAmount: ['$63,360.00'],
  },
  {
    id: 5,
    name: 'Contract 5',
    type: 'Monthly',
    perPayment: '$6,000.00',
    termLength: ['12 months', '12.0% fee'],
    paymentAmount: ['$63,360.00'],
  },
  {
    id: 6,
    name: 'Contract 6',
    type: 'Monthly',
    perPayment: '$6,000.00',
    termLength: ['12 months', '12.0% fee'],
    paymentAmount: ['$63,360.00'],
  },
  {
    id: 7,
    name: 'Contract 7',
    type: 'Monthly',
    perPayment: '$6,000.00',
    termLength: ['12 months', '12.0% fee'],
    paymentAmount: ['$63,360.00'],
  },
  {
    id: 8,
    name: 'Contract 8',
    type: 'Monthly',
    perPayment: '$6,000.00',
    termLength: ['12 months', '12.0% fee'],
    paymentAmount: ['$63,360.00'],
  },
];

export const cashKickRows = [
  {
    id: 1,
    name: 'My first advance',
    status: 'Pending',
    maturity: 'Apr 03, 2022',
    totalReceived: ['$150,000.00', '12.0% fee'],
    totalFinanced: '$170,454.55',
  },
];

export const CASH_KICK_MODAL = {
  content:
    'It will remain on pending state until we review it internally. This can take upto 5 mins to couple of hours. Once reviewed, the cash will be transferred to your account and you’ll be notified.',
  heading: 'Cash kick launched successfully!',
  subHeading: 'We are reviewing your cash kick',
  review: 'Your cash kick is under review',
  close: 'Close',
  viewCashkicks: 'View Cash Kicks',
};

export const NAMECASHKICKMODAL = {
  heading: 'Name your cash kick',
  subHeading: 'Add a name to identify your cash kick',
  label: 'Cash kick name',
  placeholder: 'Ex: marketing expenses',
  cancel: 'Cancel',
  CashKickButton: 'Create Cash Kick',
};

export const MyContractsRows = [
  {
    id: 1,
    name: 'Contract 1',
    status: 'Available',
    type: 'Monthly',
    perPayment: '$12,000.25',
    totalFinanced: '-',
    totalAvailable: '$126,722.64',
  },
  {
    id: 2,
    name: 'Contract 3',
    status: 'Available',
    type: 'Monthly',
    perPayment: '$6,000.00',
    totalFinanced: '-',
    totalAvailable: '$63,360.00',
  },
  {
    id: 3,
    name: 'Contract 4',
    status: 'Available',
    type: 'Monthly',
    perPayment: '$6,000.00',
    totalFinanced: '-',
    totalAvailable: '$63,360.00',
  },
  {
    id: 4,
    name: 'Contract 5',
    status: 'Available',
    type: 'Monthly',
    perPayment: '$6,000.00',
    totalFinanced: '-',
    totalAvailable: '$63,360.00',
  },
  {
    id: 5,
    name: 'Contract 6',
    status: 'Available',
    type: 'Monthly',
    perPayment: '$6,000.00',
    totalFinanced: '-',
    totalAvailable: '$63,360.00',
  },
];

export const MyContractsColumns = [
  customColumn({
    field: 'name',
    headerText: 'Name',
    marginTop: 15,
    headerClassName: 'super-app-theme--header',
    valueColor: theme.palette.text.highEmphasis,
    cellClassName: 'super-app-theme--cell',
  }),
  {
    field: 'status',
    headerText: 'Status',
    width: 200,
    sortable: false,
    renderHeader: () => customText('Status', 'body2'),
    renderCell: (params: GridRenderCellParams) => customChips(params.value),
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  },
  customColumn({
    field: 'type',
    headerText: 'Type',
    marginTop: 15,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  }),
  customColumn({
    field: 'perPayment',
    headerText: 'Per payment',
    marginTop: 15,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  }),
  customColumn({
    field: 'totalFinanced',
    headerText: 'Total financed',
    marginTop: 15,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  }),
  customColumn({
    field: 'totalAvailable',
    headerText: 'Total available',
    marginTop: 15,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  }),
];

export const MyCashKickRows = [
  {
    id: 1,
    name: 'My first advance',
    status: 'Pending',
    maturity: 'Apr 03, 2022',
    totalReceived: ['$150,000.00', '12.0% fee'],
    totalFinanced: '$170,454.55',
  },
];

export const MyCashKickColumns = [
  customColumn({
    field: 'name',
    headerText: 'Name',
    marginTop: 15,
    headerClassName: 'super-app-theme--header',
    valueColor: theme.palette.text.highEmphasis,
  }),
  {
    field: 'status',
    width: 200,
    sortable: false,
    renderHeader: () => customText('Status', 'body2'),
    renderCell: (params: GridRenderCellParams) => customChips(params.value),
    headerClassName: 'super-app-theme--header',
  },
  customColumn({
    field: 'maturity',
    headerText: 'Maturity',
    marginTop: 15,
    headerClassName: 'super-app-theme--header',
  }),
  {
    field: 'totalReceived',
    width: 200,
    sortable: false,
    renderHeader: () => customText('Total received', 'body2'),
    renderCell: (params: GridRenderCellParams) => customDualText(params.value),
    headerClassName: 'super-app-theme--header',
  },
  customColumn({
    field: 'totalFinanced',
    headerText: 'Total financed',
    marginTop: 15,
    headerClassName: 'super-app-theme--header',
  }),
];

export const columns = [
  customColumn({
    field: 'name',
    headerText: 'Name',
    valueColor: theme.palette.text.highEmphasis,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  }),
  customColumn({
    field: 'type',
    headerText: 'Type',
    valueColor: theme.palette.text.lowEmphasis,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  }),
  customColumn({
    field: 'perPayment',
    headerText: 'Per Payment',
    headerClassName: 'super-app-theme--header',
    valueColor: theme.palette.text.lowEmphasis,
    cellClassName: 'super-app-theme--cell',
  }),
  {
    field: 'termLength',
    width: 200,
    sortable: false,
    renderHeader: () => customText('Term Length', 'body2'),
    renderCell: (params: GridRenderCellParams) => customDualText(params.value),
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'Payment Amount',
    headerText: 'Payment Amount',
    sortable: false,
    valueColor: theme.palette.text.lowEmphasis,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
    renderHeader: () => (
      <Typography
        variant="body2"
        style={{ color: theme.palette.text.lowEmphasis }}
      >
        Payment Amount
      </Typography>
    ),
    renderCell: (params: GridRenderCellParams) => {
      const originalPaymentAmount = parseDollarAmount(
        params.row.originalPaymentAmount
      );
      const selectedPaymentAmount = parseDollarAmount(params.row.paymentAmount);

      return (
        <>
          {selectedPaymentAmount !== originalPaymentAmount ? (
            <>
              <Typography
                variant="body2"
                color={theme.palette.text.lowEmphasis}
              >
                {params.row.paymentAmount}
              </Typography>
              <Typography
                variant="caption"
                style={{
                  textDecoration: 'line-through',
                }}
                color={theme.palette.text.lowEmphasis}
              >
                {params.row.originalPaymentAmount}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" color={theme.palette.text.lowEmphasis}>
              {params.row.paymentAmount}
            </Typography>
          )}
        </>
      );
    },
  },
];

export const ResetCodeValidation = (value: string) => /^\d{8}$/.test(value);

export const PasswordValidation = /^(?=.*[A-Za-z]{7,})(?=.*\d)[A-Za-z\d]{8,}$/;



export const CashKickColumns = [
  customColumn({
    field: 'name',
    headerText: 'Name',
    valueColor: theme.palette.text.highEmphasis,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  }),
  {
    field: 'status',
    width: 200,
    sortable: false,
    renderHeader: () => customText('Status', 'body2'),
    renderCell: (params: GridRenderCellParams) => customChips(params.value),
    headerClassName: 'super-app-theme--header',

  },
  customColumn({
    field: 'maturity',
    headerText: 'Maturity',
    valueColor: theme.palette.text.lowEmphasis,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  }),
  {
    field: 'totalRecieved',
    width: 200,
    sortable: false,
    renderHeader: () => customText('Total recieved', 'body2'),
    renderCell: (params: GridRenderCellParams) =>
      customDualText(params.value),
    valueColor: theme.palette.text.lowEmphasis,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  },
  customColumn({
      field: 'totalFinanced',
      headerText: 'Total financed',
      valueColor: theme.palette.text.lowEmphasis,
      headerClassName: 'super-app-theme--header',
      cellClassName: 'super-app-theme--cell',
  }),
];

export const ContractsColumns = [
  customColumn({
    field: 'name',
    headerText: 'Name',
    valueColor: theme.palette.text.highEmphasis,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  }),
  customColumn({
    field: 'type',
    headerText: 'Type',
    valueColor: theme.palette.text.lowEmphasis,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  }),
  customColumn({
    field: 'perPayment',
    headerText: 'Per Payment',
    headerClassName: 'super-app-theme--header',
    valueColor: theme.palette.text.lowEmphasis,
    cellClassName: 'super-app-theme--cell',
  }),
  {
    field: 'termLength',
    width: 200,
    sortable: false,
    renderHeader: () => customText('Term Length', 'body2'),
    renderCell: (params: GridRenderCellParams) =>
      customDualText(params.value),
    valueColor: theme.palette.text.lowEmphasis,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  },
  customColumn({
    field: 'paymentAmount',
    headerText: 'Payment amount',
    valueColor: theme.palette.text.lowEmphasis,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
  }),
];

export const YourPaymentsColumns = [
  {
    field: 'dueDate',
    width: 200,
    sortable: false,
    renderHeader: () => customText('Due date', 'body2'),
    renderCell: (params: GridRenderCellParams) =>
      customDualText(params.value, theme.palette.text.highEmphasis),
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'status',
    width: 200,
    sortable: false,
    renderHeader: () => customText('Status', 'body2'),
    renderCell: (params: GridRenderCellParams) => customChips(params.value),
    headerClassName: 'super-app-theme--header',
  },
  customColumn({
    field: 'expectedAmount',
    headerText: 'Expected amount',
    marginTop: 15,
    headerClassName: 'super-app-theme--header',
  }),
  customColumn({
    field: 'outStanding',
    headerText: 'Outstanding',
    marginTop: 15,
    headerClassName: 'super-app-theme--header',
  }),
];
export const EmailValidation = (value: string) =>
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
export const passwordValidation = (value: string) =>/^(?=.*[A-Za-z]{7,})(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
export const ERROR="Not a valid user";
export const AUTH_ERROR='Error during authentication';
export const INVALID_CODE="Passcode should contain 8 digits";
export const INVALID_FORMAT="Invalid email format"
export const SIGNUP_ERROR="Error during signup"
export const EMAIL_EXISTS="Email already in use"
export const EMAIL_VALIDATION_ERROR="Error during email validation"

