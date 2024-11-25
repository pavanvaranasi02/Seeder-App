import axios from 'axios';
import { CashKick } from '../pages/HomePage';
import { CashkickApi } from '../pages/CashAccelerationPage';

const BASE_URL = 'http://localhost:8000';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  availableCredit?: number;
}

export interface ApiContract {
  id: number;
  name: string;
  type: string;
  perPayment: number;
  termLengthMonths: number;
  termLengthPercentage: number;
  paymentAmount: number;
}

export interface ContractAmount {
  id: string;
  amount: number;
}

export interface UserContract {
  id: number;
  userId: string;
  contractIds: ContractAmount[];
}

export const getUserByEmail = async (email: string) => {
  return await axios.get(`${BASE_URL}/user?email=${email}`);
};

export const updateUserPassword = async (user: User) => {
  return await axios.patch(`${BASE_URL}/user/${user.id}`, user);
};

export const CHECK_EMAIL = async (email: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/user?email=${email}`
    );
    const user = response.data.find((user: User) => user.email === email);
    return user;
  } catch (error) {
    console.error('Email checking failed');
  }
};

export const CHECK_EMAIL_AND_PASSWORD = async (
  email: string,
  password: string
) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/user?email=${email}&password=${password}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to check email and password:', error);
    throw error;
  }
};

export const getData = async (id: string): Promise<CashKick[]> => {
  try {
    const { data } = await axios.get(
      `http://localhost:8000/CashKicks?userId=${id}`
    );
    return data;
  } catch (error) {
    console.error('Failed to fetch Cash kicks:', error);
    return [];
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
  }
};
export const fetchContracts = async (): Promise<ApiContract[]> => {
  try {
    const response = await axios.get<ApiContract[]>(`${BASE_URL}/contracts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contracts:', error);
    throw error;
  }
};

export const getCashkicksByuserId = async (userId: string) => {
  try {
    const response = await axios.get<CashkickApi[]>(
      `${BASE_URL}/CashKicks?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const fetchUserContracts = async (
  userId: string
): Promise<UserContract[]> => {
  try {
    const response = await axios.get<UserContract[]>(
      `${BASE_URL}/SelectedContracts?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user contracts:', error);
    throw error;
  }
};

export const updateUserContracts = async (
  userContractId: string,
  userId: string,
  contractPayload: ContractAmount[]
) => {
  try {
    await axios.patch(`${BASE_URL}/SelectedContracts/${userContractId}`, {
      userId,
      contractIds: contractPayload,
    });
  } catch (error) {
    console.error('Error updating user contracts:', error);
    throw error;
  }
};

export const createUserContracts = async (
  userId: string,
  contractPayload: ContractAmount[]
) => {
  try {
    await axios.post(`${BASE_URL}/SelectedContracts`, {
      userId,
      contractIds: contractPayload,
    });
  } catch (error) {
    console.error('Error creating user contracts:', error);
    throw error;
  }
};

export const createCashKick = async (cashKickData: {
  userId: string;
  name: string;
  status: string;
  maturity: string;
  totalReceivedMonths: number;
  totalReceivedPercentage: number;
  totalFinanced: number;
  totalReceived: number;
}) => {
  try {
    await axios.post(`${BASE_URL}/CashKicks`, cashKickData);
  } catch (error) {
    console.error('Error creating cash kick:', error);
    throw error;
  }
};

export const CREATE_USER = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const availableCredit = 880000;
    const response = await axios.post(`http://localhost:8000/user`, {
      name,
      email,
      password,
      availableCredit,
    });
    return response;
  } catch (error) {
    return null;
  }
};
