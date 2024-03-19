import React, { useState, useEffect } from 'react';

const DataTable = ({ data }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const renderTableHeader = () => {
    const header = Object.keys(data[0]);
    return header.map((key, index) => <th key={index}>{key}</th>);
  };

  const renderTableBody = () => {
    return tableData.map((row, index) => {
      return (
        <tr key={index}>
          {Object.values(row).map((value, i) => (
            <td key={i}>{value}</td>
          ))}
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>
        <tr>{renderTableHeader()}</tr>
      </thead>
      <tbody>{renderTableBody()}</tbody>
    </table>
  );
};

export default DataTable;