import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f4f4f4;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

export default function Table({ data }) {
  return (
    <TableWrapper>
      <thead>
        <tr>
          <TableHeader>商品名稱</TableHeader>
          <TableHeader>類別</TableHeader>
          <TableHeader>價格</TableHeader>
          <TableHeader>有庫存</TableHeader>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.inStock ? '是' : '否'}</TableCell>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}
