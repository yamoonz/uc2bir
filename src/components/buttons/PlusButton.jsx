import styled from 'styled-components/macro';

const Plus = styled.button`
  flex: 0 0 27px;
  width: 27px;
  height: 27px;
  background-color: ${(p) => p.theme.colors.blue2};
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Plus;
