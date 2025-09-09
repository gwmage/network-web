import React from 'react';

function Error({ statusCode }) {
  return (
    <div>
      <h1>An error occurred.</h1>
      {statusCode ? (
        <p>
          An error {statusCode} occurred on server
        </p>
      ) : (
        <p>An error occurred on client</p>
      )}
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;