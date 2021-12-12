import React from 'react';
import { useSecretQuery } from '../generated/graphql';

interface Props {}

const Secret = (props: Props) => {
  const { data, loading, error } = useSecretQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return <div>{data.secret}</div>;
};

export default Secret;
