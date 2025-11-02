import React from 'react';

const DataTable = ({ facts, onRefresh, loading, animalType }) => {
  return (
    <div className="data-table-container">
      <div className="table-header">
        <h2>{animalType === 'dog' ? 'Dog' : 'Cat'} Facts</h2>
        <button onClick={onRefresh} className="refresh-button" disabled={loading}>
          {loading ? '⏳ Loading...' : 'Refresh Facts'}
        </button>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Fact</th>
            </tr>
          </thead>
          <tbody>
            {facts.length === 0 ? (
              <tr>
                <td colSpan="2" className="no-data">
                  No facts available. Click refresh to load facts!
                </td>
              </tr>
            ) : (
              facts.map((fact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{fact}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
