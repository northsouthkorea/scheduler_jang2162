import {FlexContainer} from "@/common/Styled";
import {rgba} from "polished";
import styled from "styled-components";

const Item = styled.div<{notCurrent?:boolean}>`
  text-align: center;
  flex-basis: 100%;
  border-right: 1px solid ${rgba("#000", 0.1)};
  padding-top: 4px;
  
  span {
    opacity: ${props => props.notCurrent ? 0.5 : 1};
  }
`;

const Row = styled(FlexContainer)`
margin: 0 8px;
border-color: ${rgba("#000", 0.1)};
border-width: 0 0 1px 1px;
border-style: solid;

`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
  ${Row} {
    flex-grow: 1;
    flex-shrink: 1;
    &:first-child {
      flex: 0 0 24px;
    }
    
    ${Item} {
      flex-grow: 1;
      flex-shrink: 1;
    }
  }

`;
export {Row, Item, Wrapper};
