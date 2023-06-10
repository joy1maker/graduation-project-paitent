import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from './component/Nav/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { RefsProvider } from './contexts/refs.context';
import { UserProvider } from './contexts/user.context';
import { AppointmentProvider } from './contexts/Appointment.context';
import AppointmentContextProvider from './contexts/Appointment.context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DoctorProvider } from './contexts/doctor.context';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RefsProvider>
          <AuthProvider>
            <UserProvider>
              <DoctorProvider>
                <AppointmentProvider>
                  <App />
                </AppointmentProvider>
              </DoctorProvider>
            </UserProvider>
          </AuthProvider>
        </RefsProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
