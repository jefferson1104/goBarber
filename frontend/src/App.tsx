import React from 'react';
import GlobalStyle from './styles/global';
// import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Jefferson' }}>
      <SignIn />
    </AuthContext.Provider>

    <GlobalStyle />
  </>
);

export default App;
