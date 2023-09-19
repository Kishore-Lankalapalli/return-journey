import {Component} from 'react'
import {
  MainContainer,
  GameBox,
  RestartButton,
  ResultText,
  Scoretext,
  GameContainer,
  TimerText,
  ResultTable,
} from './styledComponents'

import './index.css'

class GreenlightRedlight extends Component {
  state = {
    count: 0,
    gameStatus: 'playing',
    colorStatus: 'red',
    result: '',
    time: 0,
    playerDetails: JSON.parse(localStorage.getItem('user')) || [],
  }

  componentDidMount() {
    this.changeBoxColor()
  }

  changeBoxColor = () => {
    this.gameInterval = setInterval(() => {
      this.setState(prevState => ({time: prevState.time + 1}))
      this.colorChange()
    }, 1200)
  }

  isPlayerWins = () => {
    const {count, playerDetails} = this.state

    let player = null

    if (playerDetails.length !== 0) {
      player = playerDetails[playerDetails.length - 1]
    }

    const {difficultyLevel} = player

    if (
      (difficultyLevel === 'easy' && count === 10) ||
      (difficultyLevel === 'medium' && count === 15) ||
      (difficultyLevel === 'hard' && count === 25)
    ) {
      return true
    }
    return false
  }

  colorChange = () => {
    const {gameStatus, count, colorStatus, time, playerDetails} = this.state

    console.log(time)

    const status = this.isPlayerWins()

    const player = playerDetails[playerDetails.length - 1]

    if (status) {
      clearInterval(this.gameInterval)

      this.setState({
        gameStatus: 'over',
        result: 'You Have Won The Match',
        time: 0,
      })

      const updatedPlayerDetails = playerDetails.map(person => {
        if (person.id === player.id) {
          return {...person, won: person.won + 1}
        }
        return person
      })

      localStorage.setItem('user', JSON.stringify(updatedPlayerDetails))
    }
    if (time === 40 && gameStatus === 'playing') {
      clearInterval(this.gameInterval)
      this.setState({gameStatus: 'over', result: 'Game Over', time: 0})

      const updatedPlayerDetails = playerDetails.map(person => {
        if (person.id === player.id) {
          return {...person, loss: person.loss + 1}
        }
        return person
      })

      localStorage.setItem('user', JSON.stringify(updatedPlayerDetails))
    } else if (gameStatus === 'over') {
      clearInterval(this.gameInterval)

      const updatedPlayerDetails = playerDetails.map(person => {
        if (person.id === player.id) {
          return {...person, loss: person.loss + 1}
        }
        return person
      })

      localStorage.setItem('user', JSON.stringify(updatedPlayerDetails))
    }
    console.log('timer starts')
    const random = Math.ceil(Math.random() * 2)

    const color = random === 1 ? 'green' : 'red'

    this.setState({colorStatus: color})
  }

  checkPlay = () => {
    const {colorStatus, playerDetails, gameStatus} = this.state

    const player = playerDetails[playerDetails.length - 1]

    if (gameStatus === 'playing' && colorStatus === 'red') {
      this.setState({
        gameStatus: 'over',
        result: 'You Lost',
      })

      const updatedPlayerDetails = playerDetails.map(person => {
        if (person.id === player.id) {
          return {...person, loss: person.loss + 1}
        }
        return person
      })

      localStorage.setItem('user', JSON.stringify(updatedPlayerDetails))
    } else if (gameStatus === 'playing' && colorStatus === 'green') {
      this.setState(prevState => ({
        count: prevState.count + 1,
      }))
    }
  }

  restartGame = () => {
    console.log('restart game is called')
    this.setState(
      {gameStatus: 'playing', result: '', count: 0, time: 0},
      this.changeBoxColor,
    )
  }

  resultsView = () => {
    const {playerDetails} = this.state

    return (
      <ResultTable cellSpacing="30">
        <tr>
          <th>Name</th>
          <th>Difficulty Level</th>
          <th>Won</th>
          <th>Loss</th>
        </tr>
        {playerDetails.map(player => (
          <tr cellSpacing="60">
            <td>{player.name}</td>
            <td>{player.difficultyLevel}</td>
            <td>{player.won}</td>
            <td>{player.loss}</td>
          </tr>
        ))}
      </ResultTable>
    )
  }

  render() {
    const {colorStatus, result, time, count} = this.state

    return (
      <MainContainer>
        <TimerText>{time}</TimerText>
        <GameContainer>
          <GameBox onClick={this.checkPlay} bgColor={colorStatus}>
            CLICK ME!!
          </GameBox>
        </GameContainer>

        <ResultText>{result}</ResultText>
        <Scoretext>Score: {count}</Scoretext>

        <RestartButton onClick={this.restartGame}>Restart</RestartButton>

        {this.resultsView()}
      </MainContainer>
    )
  }
}

export default GreenlightRedlight
