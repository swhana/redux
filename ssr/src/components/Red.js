import { styled } from "styled-components";

const Red = styled.div`
  background: red;
  font-size: 1.5rem;
  color: white;
  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RedComponent = () => {
  return <Red>red</Red>;
}

export default RedComponent;