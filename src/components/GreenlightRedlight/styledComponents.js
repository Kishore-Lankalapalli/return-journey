import styled from 'styled-components'

export const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: Center;
  background-color: #000;
`

export const GameContainer = styled.div`
  display: flex;
`

export const TimerText = styled.h1`
  font-family: 'Roboto';
  font-size: 60px;
  color: #fff;
`

export const GameBox = styled.button`
  height: 250px;
  width: 250px;
  border-radius: 9px;

  background-color: ${props => props.bgColor};
  cursor: pointer;
  outline: none;
  border-width: 0px;
  font-family: 'Roboto';
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`
export const Scoretext = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`

export const ResultText = styled.p`
  font-family: 'Roboto';
  font-size: 30px;
  color: #e8685f;
  font-weigh: bold;
`

export const RestartButton = styled.button`
  height: 35px;
  width: 90px;
  border-width: 0px;
  background-color: #253345;
  color: #fff;
  font-family: 'Roboto';
  border-radius: 8px;
  cursor: pointer;
  outline: none;
`

export const ResultTable = styled.table`
  background-color: transparent;
  border: 1px solid red;
  border-radius: 8px;

  width: 90%;
  margin-top: 50px;
  color: #fff;

  @media screen and (min-width: 768px) {
    width: 40%;
    margin-top: 70px;
  }
`
