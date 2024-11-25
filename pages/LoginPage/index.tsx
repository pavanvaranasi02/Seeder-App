import React, { useReducer, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHECK_EMAIL_AND_PASSWORD } from '../../services';
import Authentication from '../../components/templates/Authentication';
import LoginForm from '../../components/organisms/LoginForm';
import IconPath, { EmailValidation } from '../../utils/Constants';
import { UserContext } from '../../App';

interface State {
  email: string;
  password: string;
  isButtonDisabled: boolean;
  error: string;
}

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_IS_BUTTON_DISABLED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const initialState: State = {
  email: '',
  password: '',
  isButtonDisabled: true,
  error: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_IS_BUTTON_DISABLED':
      return { ...state, isButtonDisabled: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
  }
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { id, setId } = useContext(UserContext);
  console.log('userId: ', id, ' in Login Page');

  useEffect(() => {
    if (id) navigate('/home');
  }, [id]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: 'SET_EMAIL', payload: value });
    dispatch({
      type: 'SET_IS_BUTTON_DISABLED',
      payload: !EmailValidation(value) || state.password.length <= 4,
    });
    dispatch({ type: 'SET_ERROR', payload: '' });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: 'SET_PASSWORD', payload: value });
    dispatch({
      type: 'SET_IS_BUTTON_DISABLED',
      payload: !EmailValidation(state.email) || value.length <= 4,
    });
    dispatch({ type: 'SET_ERROR', payload: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const users = await CHECK_EMAIL_AND_PASSWORD(state.email, state.password);
      const user = users.find(
        (user: any) =>
          user.email === state.email && user.password === state.password
      );
      if (user) {
        dispatch({ type: 'SET_ERROR', payload: '' });
        setId(user.id);
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Invalid email or password.' });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleForgotPasswordClick = () => navigate('/forgot-password');
  const handleGoogleLoginClick = () => navigate('/google-login');
  const handleStripeLoginClick = () => navigate('/stripe-login');
  const handleXeroLoginClick = () => navigate('/xero-login');
  const handleSignUpClick = () => navigate('/signup');

  return (
    <Authentication
      OrganismComponent={
        <LoginForm
          email={state.email}
          password={state.password}
          onSubmit={handleSubmit}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onForgotPasswordClick={handleForgotPasswordClick}
          onGoogleLoginClick={handleGoogleLoginClick}
          onStripeLoginClick={handleStripeLoginClick}
          onXeroLoginClick={handleXeroLoginClick}
          onSignUpClick={handleSignUpClick}
          isButtonDisabled={state.isButtonDisabled}
          error={state.error}
        />
      }
      imageSrc={IconPath.BusinessAnalysis}
      imageAlt="Business Analysis"
    />
  );
};

export default LoginPage;
