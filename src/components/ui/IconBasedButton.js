import styled from 'styled-components'

export default styled.span`
  position: absolute;
  color: rgba(255, 255, 255, 0.4);
  width: 5vw;
  height: 5vw;
  text-align: center;
  line-height: 5vw;
  font-size: 4vw;
  text-shadow: 0 0 1px #000, 0 0 1px rgba(255, 255, 255, 0.2), 0 0 2px rgba(255, 255, 255, 0.2),
    0 0 4px rgba(255, 255, 255, 0.2), 0 0 7px rgba(255, 255, 255, 0.2),
    0 0 8px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 255, 255, 0.2),
    0 0 15px rgba(255, 255, 255, 0.2);

  &:hover {
    color: #fff;
  }
  z-index: 10000;
`
