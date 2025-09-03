"import React from 'react';

const MatchingResultsDisplay = ({ results, explanations }) => {
  if (!results) {
    return <p>No results available.</p>;
  }

  return (
    <div>
      <h3>Matching Results</h3>
      <ul>
        {results.map((group, index) => (
          <li key={index}>
            <h4>Group {index + 1}</h4>
            <ul>
              {group.users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
            {explanations && explanations[index] && (
              <p>Explanation: {explanations[index]}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchingResultsDisplay;"