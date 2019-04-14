import styled from 'styled-components';

export const TopControl = styled.div`
  display: flex;
  flex: 0 0 48px;
  box-sizing: border-box;
  height: 48px;
  padding: 8px;
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
