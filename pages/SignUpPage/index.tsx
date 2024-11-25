import React, { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Authentication from '../../components/templates/Authentication';
import SignupForm from '../../components/organisms/SignupForm';
import IconPath, {
  EmailValidation,
  INVALID_CODE,
  INVALID_FORMAT,
  SIGNUP_ERROR,
  EMAIL_EXISTS,
  EMAIL_VALIDATION_ERROR,
  passwordValidation,
} from '../../utils/Constants';
import { CHECK_EMAIL, CREATE_USER } from '../../services';
import { UserContext } from '../../App';

interface State {
  name: string;
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  isButtonDisabled: boolean;
}

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_EMAIL_ERROR'; payload: string }
  | { type: 'SET_PASSWORD_ERROR'; payload: string }
  | { type: 'SET_IS_BUTTON_DISABLED'; payload: boolean }
  | { type: 'INVALID_ACTION'; payload: boolean };

export const initialState: State = {
  name: '',
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  isButtonDisabled: true,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'SET_PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    case 'SET_IS_BUTTON_DISABLED':
      return { ...state, isButtonDisabled: action.payload };
    default:
      return state;
  }
};

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id, setId } = useContext(UserContext);
  console.log('userId ', id, ' came to SignUp page');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NAME', payload: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: 'SET_EMAIL', payload: value });
    dispatch({
      type: 'SET_IS_BUTTON_DISABLED',
      payload: !EmailValidation(value) || state.password.length <= 4,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: 'SET_PASSWORD', payload: value });
    dispatch({
      type: 'SET_IS_BUTTON_DISABLED',
      payload: state.email.length === 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValid = EmailValidation(state.email);
    const passwordValid = passwordValidation(state.password);

    if (!validateInputs(emailValid, passwordValid)) {
      return;
    }

    try {
      const response = await CHECK_EMAIL(state.email);
      const user = response?.data.find(
        (user: any) => user.email === state.email
      );

      if (!user) {
        await createUserAndNavigate();
      } else {
        dispatch({ type: 'SET_EMAIL_ERROR', payload: EMAIL_EXISTS });
      }
    } catch (error) {
      dispatch({ type: 'SET_EMAIL_ERROR', payload: EMAIL_EXISTS });
    }
  };

  const validateInputs = (
    emailValid: boolean,
    passwordValid: boolean
  ): boolean => {
    let isValid = true;
    if (!emailValid) {
      isValid = false;
      dispatch({ type: 'SET_EMAIL_ERROR', payload: INVALID_FORMAT });
    } else {
      dispatch({ type: 'SET_EMAIL_ERROR', payload: '' });
    }

    if (!passwordValid) {
      isValid = false;
      dispatch({ type: 'SET_PASSWORD_ERROR', payload: INVALID_CODE });
    } else {
      dispatch({ type: 'SET_PASSWORD_ERROR', payload: '' });
    }
    return isValid;
  };

  const createUserAndNavigate = async () => {
    try {
      const response = CREATE_USER(state.name, state.email, state.password);
      response?.then((user) => {
        setId(user?.data.id);
        navigate('/home');
      });
    } catch (error) {
      dispatch({ type: 'SET_EMAIL_ERROR', payload: SIGNUP_ERROR });
    }
  };

  const handleLoginClick = () => navigate('/');
  const handleGoogleSignUpClick = () => navigate('/google-login');
  const handleStripeSignUpClick = () => navigate('/stripe-login');
  const handleXeroSignUpClick = () => navigate('/xero-login');

  return (
    <Authentication
      imageSrc={IconPath.Money}
      OrganismComponent={
        <SignupForm
          email={state.email}
          name={state.name}
          password={state.password}
          emailError={state.emailError}
          passwordError={state.passwordError}
          onEmailChange={handleEmailChange}
          onNameChange={handleNameChange}
          onPasswordChange={handlePasswordChange}
          onSubmit={handleSubmit}
          onLoginClick={handleLoginClick}
          onGoogleSignupClick={handleGoogleSignUpClick}
          onStripeSignupClick={handleStripeSignUpClick}
          onXeroSignupClick={handleXeroSignUpClick}
          isButtonDisabled={state.isButtonDisabled}
        />
      }
    />
  );
};

export default SignUpPage;
