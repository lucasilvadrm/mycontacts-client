import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  .details {
    span {
      font-size: 22px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
      margin-bottom: 8px;
    }

    button {
      width: 181px;
    }

  }
`;
