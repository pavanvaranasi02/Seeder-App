# Loan Application Seeder
This repository contains the **Seeder Application**, a web application developed to simplify and streamline the process of companies opting for loans. This application leverages a modern, modular, and scalable technology stack and adheres to best practices in front-end development.

## Overview
- The Loan Application Seeder is designed to provide an intuitive and user-friendly interface for companies to initiate and manage their loan applications efficiently.
- This project is based on designs provided via Figma, ensuring pixel-perfect implementation that aligns with user experience (UX) and user interface (UI) best practices.

## Technology Stack
### Front-End Framework
- **React.js:** Used for building the component-based user interface, ensuring reusability and better performance.
- **TypeScript:** Adds static type-checking, enabling robust development with fewer runtime errors.
### UI Framework
- **Material UI (MUI):** Provides pre-designed, customizable components to ensure a modern and consistent UI.
### Design System
- **Atomic Design Methodology:** The application follows the atomic design principle, enabling the creation of a modular and maintainable component architecture.
### Mock Server
- **Mock Server Setup:** Simulates API responses for seamless front-end development and testing without dependencies on a live back end.
### Testing
- **React Testing Library:** Ensures components function as expected by focusing on behavior from the user's perspective.
- **Jest:** A robust JavaScript testing framework for unit tests and integration tests.
### Documentation and Component Showcase
- **Storybook:** An interactive tool for developing and testing UI components in isolation, ensuring consistent implementation.

## Images Of Application:
### Sign Up Page:
Any new user might be ceo/company owners can opt for loans just by regestering and by applying for loans in our website.
![image](https://github.com/user-attachments/assets/e756e325-348b-41ef-8e1f-0cf1a7ef3a50)

**Email Existence Validation**
![image](https://github.com/user-attachments/assets/26fb7b64-bca4-4644-aa75-bd7945c00f1e)

**Password validation**
![image](https://github.com/user-attachments/assets/2e9980d9-353a-4fe9-a21c-110c0a606c3c)

### Login Page:
Once after registering, any user has to login, for taking up loan and for repayments.
![image](https://github.com/user-attachments/assets/66d92d04-fd64-4b2d-86fc-fc5fd6ed4bd3)

**Cecking for user existence in mock server**
![image](https://github.com/user-attachments/assets/65f1accc-8530-4dae-ad32-82f57a5670bb)

### Forgot Password Page:
To change the password if user has forgotten their password.
![image](https://github.com/user-attachments/assets/6cf6677e-c055-4656-aba1-f9361256e098)

Reset Button enables only if email is correctly typed in Mock Server
![image](https://github.com/user-attachments/assets/e7f6693d-c948-4c5f-8cf3-c218943d858d)
![image](https://github.com/user-attachments/assets/5ff6e413-a738-4de4-a370-444a4f1111d2)

If user does not exists in mock server then an error message is shown in ui
![image](https://github.com/user-attachments/assets/a4c39acd-8a04-4dfe-af5a-f78a845d79eb)

### Reset Code Page
![image](https://github.com/user-attachments/assets/7379c43d-bd87-48bf-8bac-75edf8c7f30a)
![image](https://github.com/user-attachments/assets/e218f00b-b5ff-45c0-a87e-2e78141eaa97)

### Home Page:
When User does not take any loan
![image](https://github.com/user-attachments/assets/6ad7594e-4412-48f9-a0cd-dcadbaa2b6c4)

When User takes a loan
![image](https://github.com/user-attachments/assets/ad2e9217-2e0b-4594-a8ea-a38e102e4104)

### Cash Acceleration Page:
From this page we can actually take a loan and if loan is already taken all the information about payments are shown here.
![image](https://github.com/user-attachments/assets/9f54e455-f688-4fe8-949f-3ba610033eb4)
![image](https://github.com/user-attachments/assets/f198726c-1c09-4b21-98f0-3cf76a0ebe78)

**Edge Cases**
![image](https://github.com/user-attachments/assets/7bfd12c1-52d4-49fc-9c11-b8176c61f423)
![image](https://github.com/user-attachments/assets/7473dede-87e0-4cf9-8ce7-b10cb25ddb4c)
![image](https://github.com/user-attachments/assets/349013f2-e774-42b1-bf60-cb2d12faa655)


### New Cash Kick Page:
When user wants to take a loan then this page will help to opt for loans provided by different companies/persons/banks with different rates
![image](https://github.com/user-attachments/assets/a294aad4-4260-43f0-9c48-17aefee7e79a)
![image](https://github.com/user-attachments/assets/a7bc1cab-2a1a-4f1c-a630-d16eed40e0a9)
![image](https://github.com/user-attachments/assets/826e4722-6d79-4fe9-a895-199929d21d0d)
![image](https://github.com/user-attachments/assets/aeae9172-69e8-4214-a284-f765865e55a8)
![image](https://github.com/user-attachments/assets/356587a4-b9e5-449b-be6a-2834b34bbab7)

### Installation and Setup
- Clone the repository: git clone https://github.com/your-repo/loan-application-seeder.git
- Navigate to the project directory: cd loan-application-seeder
- Install dependencies: npm install
- Start the application: npm start
- Access the application at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>
- To run the tests, use the following commands: npm test
- To View Storybook: npm run storybook & Storybook will run on <a href="http://localhost:6006" target="_blank">http://localhost:6006</a>
