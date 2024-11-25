import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';

interface AunthenticationWrapperProps {
  Page: React.ReactElement;
}

const AunthenticationWrapper: React.FC<AunthenticationWrapperProps> = ({
  Page,
}) => {
  const { id } = useContext(UserContext);
  if (id === '') {
    console.log('Navigating in below line.');
    return <Navigate to="/" />;
  }
  return Page;
};

export default AunthenticationWrapper;
