import React from 'react';
import { Link } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

const Header = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = <div>loading...</div>;
  } else if (data && data.me) {
    body = <div>logged in as {data.me.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <header>
      <nav>
        <div>
          <Link to='/'>home</Link>
        </div>
        <div>
          <Link to='/register'>register</Link>
        </div>
        <div>
          <Link to='/login'>login</Link>
        </div>
        <div>
          <Link to='/secret'>some secret data</Link>
        </div>
      </nav>
      {!loading && data && data.me && (
        <button
          onClick={async () => {
            await logout();
            setAccessToken('');
            await client.resetStore();
          }}
        >
          logout
        </button>
      )}
      {body}
    </header>
  );
};

export default Header;
