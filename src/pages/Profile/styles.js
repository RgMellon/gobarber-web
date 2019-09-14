import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 8px 15px;
      color: #fff;
      margin: 0 0 10px;
      /* padding: 8px 15px; */

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;
      color: red;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.7);
      margin: 10px 0 15px 0;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }
  }

  > button {
    margin: 5px 0 0;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    width: 100%;
    margin-top: 20px;

    &:hover {
      background: ${darken(0.03, '#3b9eff')};
    }
  }
`;
