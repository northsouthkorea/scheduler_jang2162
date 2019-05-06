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
`;

export const TopControl = styled.div`
  display: flex;
  flex: 0 0 48px;
  box-sizing: border-box;
  height: 48px;
  padding: 8px 0;
  margin: 0 8px;
  
  .item-left {
    
  }
  
  .item-right{
    margin-left: auto;
  }
`;

export const ScheduleViewer  = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  margin-bottom: 8px;
  overflow: hidden;
`;
