import React from 'react';
import ExpandableTable from 'react-exp-table';


type DataRow = {
  des: string;
  child: [];
};

type ExtableProps = {
  data: DataRow[];
};

function Extable({ data }: any) {
  const columns = [
    {
      title: "Level information",
      key: "des",
      render: (text: string) => <span className="custom-table-data">{text}</span>,
      
    },
  ];

  return (
    <div className="container">
      <h1>Coding Level</h1>
      <div style={{ fontStyle: 'italic', fontSize: '16px',fontWeight: 'bold' }}><ExpandableTable columns={columns} data={data} ></ExpandableTable></div>
    </div>
  );
}

export default Extable;