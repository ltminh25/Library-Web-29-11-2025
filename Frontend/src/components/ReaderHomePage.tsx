import React from "react";
import { useParams } from "react-router-dom";

const ReaderHomePage: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>📖 Reader Details</h1>
      <p>Details for reader with ID: {id}</p>
    </div>
  );
};

export default ReaderHomePage;