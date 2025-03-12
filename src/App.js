import logo from './logo.svg';
import './App.css';
import './index.css';
import NMSContextProvider from './context/NmsContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './Routes/AppRoutes';

function App() {
  return (
    <div>
      <NMSContextProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </NMSContextProvider>
    </div>
  );
}

export default App;
