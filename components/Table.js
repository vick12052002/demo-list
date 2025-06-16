import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: #f9fafb;
`;

const TableHeader = styled.th`
  border: 1px solid #e5e7eb;
  padding: 8px;
  text-align: left;
  background-color: #f3f4f6;
  color: #374151;
`;

const TableCell = styled.td`
  border-bottom: 1px solid #e5e7eb;
  padding: 8px;
  text-align: left;
  color: #4b5563;
`;

const TableCellTextRight = styled(TableCell)`
  text-align: right;
`;

const Tag = styled.div`
  background: #10b981;
  color: white;
  border-radius: 5px;
  text-align: center;
  width: 80px;
`;

const WarnTag = styled(Tag)`
  background: #ef4444;
`;

export default function Table({ data }) {
  return (
    <TableWrapper>
      <thead>
        <tr>
          <TableHeader>商品名稱</TableHeader>
          <TableHeader>類別</TableHeader>
          <TableHeader>價格</TableHeader>
          <TableHeader>庫存</TableHeader>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCellTextRight>${item.price}</TableCellTextRight>
            <TableCell>
              {item.inStock ? <Tag>有庫存</Tag> : <WarnTag>無庫存</WarnTag>}
            </TableCell>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}
