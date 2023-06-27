import { styled } from "styled-components";

const Blue = styled.div`
  background: blue;
  font-size: 1.5rem;
  color: white;
  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BlueComponent = () => {
  return <Blue>blue</Blue>
}

export default BlueComponent;