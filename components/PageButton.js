import styled from 'styled-components';

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #e60023;
    color: #fff;
    border-color: #e60023;
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default PageButton;