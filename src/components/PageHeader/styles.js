import styled from 'styled-components';

export const Container = styled.header`
  a {
    align-items: center;
    display: flex;
    text-decoration: none;

    span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
    }

    img {
      margin-right: 8px;
      transform: rotate(0.75turn);
    }

  }

  h1 {
    font-size: 24px;
  }
`;
