import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { setAccessToken } from './accessToken';
import Header from './components/Header';
import Secret from './pages/Secret';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(res =>
      res.json().then(data => {
        setAccessToken(data.accessToken);
        setLoading(false);
      })
    );
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/secret' element={<Secret />} />
        </Routes>
      </main>
    </>
  );
};

export default App;

// const { data, loading } = useQuery(gql`
//    {
//       hello
//    }
// `);
