import React from 'react';
import { useUsersQuery } from '../generated/graphql';

// interface Props {}

const Home = () => {
  const { data } = useUsersQuery({ fetchPolicy: 'network-only' });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>users:</div>
      <ul>
        {data.users.map(x => (
          <li key={x.id}>
            {x.email}, {x.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
