import React from 'react';
import styled from 'styled-components';

const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const Card = styled.div`
  width: calc(50% - 16px);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const CardText = styled.p`
  font-size: 14px;
  margin-top: 8px;
  color: #555;
`;

const CardPrice = styled(CardText)`
  font-weight: bold;
  color: #e60023;
`;

const CardStock = styled(CardText)`
  color: #008000;
`;

export default function Cards({ items }) {
  return (
    <CardsGrid>
      {items.map((item, index) => (
        <Card key={index}>
          <CardTitle>[商品名稱 name] {item.name}</CardTitle>
          <CardText>[類別 category] {item.category}</CardText>
          <CardPrice>[價格 price] ${item.price}</CardPrice>
          <CardStock>[庫存 inStock] {item.inStock ? '有庫存' : '無庫存'}</CardStock>
        </Card>
      ))}
    </CardsGrid>
  );
}
