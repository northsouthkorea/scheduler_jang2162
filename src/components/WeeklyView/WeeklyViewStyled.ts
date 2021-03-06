import {rgba} from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 8px 8px 8px;
  border:1px solid ${rgba('#000', 0.1)};
  background-color: #ffffff;
`;

export const Top = styled.div`
  margin-left: 70px;
  margin-right: 17px;
  padding-left: 8px;
  flex-grow: 0;
  display: flex;
  border-bottom: 1px solid ${rgba('#000', 0.1)};

  &>div {
    flex-grow: 1;
    text-align: center;
  }
`;

export const TopHeader = styled.div`
  
`;

export const AllDayEventsWrapper = styled.div`
  & > div {
    border-left: 1px solid ${rgba('#000', 0.1)};
    min-height: 12px;
  }
`;

export const Bottom = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const TimeEventsWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const TimeText = styled.div`
  box-sizing: border-box;
  flex-basis: 70px;
  flex-shrink: 0;
  text-align: right;
  padding-right: 8px;
  span {
    display: inline-block;
    font-size: 12px;
    line-height: 20px;
    transform: translateY(-10px);
  }
`;

export const Item = styled.div`
    flex-grow: 1;
    border-top:1px solid ${rgba('#000', 0.1)};
    
    &>div {
      border-left:1px solid ${rgba('#000', 0.1)};
      height: 48px;
    }
    
    &:nth-child(2) {
      padding-left: 8px;
    }
`;

export const Row = styled.div`
  display: flex;
  height: 49px;
  &:first-child ${Item} {
      border-top: none;
    }
`;
