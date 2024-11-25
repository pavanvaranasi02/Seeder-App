import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetCodePage from './pages/ResetCodePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import SignUpPage from './pages/SignUpPage';
import CashAccelerationPage from './pages/CashAccelerationPage';
import NewCashkick from './pages/NewCashKick';
import AunthenticationWrapper from './utils/AunthenticationWrapper';

interface UserContextType {
  id: string;
  setId: (id: string) => void;
}

export const UserContext = createContext<UserContextType>({
  id: '',
  setId: () => {},
});

const App = () => {
  const [id, setId] = useState<string>('');

  return (
    <UserContext.Provider value={{ id: id, setId: setId }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/home"
              element={
                <AunthenticationWrapper
                  Page={
                    <HomePage
                      onConnectFunc={() => {}}
                      onFailureFunc={() => {}}
                    />
                  }
                />
              }
            />
            <Route
              path="/cash-acceleration"
              element={
                <AunthenticationWrapper Page={<CashAccelerationPage />} />
              }
            />
            <Route
              path="/new-cash-kick"
              element={<AunthenticationWrapper Page={<NewCashkick />} />}
            />

            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route
              path="/reset-code-page"
              element={<AunthenticationWrapper Page={<ResetCodePage />} />}
            />
            <Route
              path="/change-password-page"
              element={<AunthenticationWrapper Page={<ChangePasswordPage />} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
