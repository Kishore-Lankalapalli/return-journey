import {useState} from 'react'
import {v4} from 'uuid'

import './index.css'

const Registration = props => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    number: '',
    difficultyLevel: 'easy',
  })

  const [errorText, setError] = useState('')

  const submitCredentials = e => {
    e.preventDefault()

    const playersDetails = JSON.parse(localStorage.getItem('user')) || []

    const {name, email, number, difficultyLevel} = userDetails

    const findNumber = playersDetails.find(person => person.number === number)

    const findEmail = playersDetails.find(person => person.email === email)

    if (name === '' && email === '' && number === '') {
      setError('Please Enter All Credentials')
    } else if (findNumber !== undefined && findEmail !== undefined) {
      setError('Entered Number and Email Already Exists Try New')
    } else if (findEmail !== undefined && findNumber === undefined) {
      setError('Entered Email Already Exists Try New')
    } else if (findNumber !== undefined && findEmail === undefined) {
      setError('Entered Number Already Exists Try New')
    } else {
      const newUser = {
        ...userDetails,
        id: v4(),
        won: 0,
        loss: 0,
      }
      localStorage.setItem('user', JSON.stringify([...playersDetails, newUser]))

      setUserDetails({
        name: '',
        email: '',
        number: '',
        difficultyLevel: 'easy',
      })
      const {history} = props

      history.replace('/game')
    }
  }

  return (
    <div className="registration-main-container">
      <h1 className="green-light-red-light-heading">
        Green Light Red Light Game
      </h1>

      <div className="registration-banner-container">
        <h1 className="return-journey-heading">return Journey's </h1>
        <p className="green-light-game-text">Green Light Red Light Game</p>
      </div>
      <div className="registration-page-container">
        <div className="registration-credentials-container">
          <form onSubmit={submitCredentials} className="form-container">
            <div className="input-container">
              <label className="name-label-text" htmlFor="name">
                Enter Your Name
              </label>
              <input
                placeholder="Enter Your Name"
                id="name"
                className="user-name-input"
                type="text"
                onChange={e =>
                  setUserDetails({...userDetails, name: e.target.value})
                }
              />
            </div>

            <div className="input-container">
              <label className="name-label-text" htmlFor="email">
                Enter Your Email
              </label>
              <input
                placeholder="Enter Your Email"
                id="email"
                className="user-name-input"
                type="email"
                onChange={e =>
                  setUserDetails({...userDetails, email: e.target.value})
                }
              />
            </div>

            <div className="input-container">
              <label className="name-label-text" htmlFor="number">
                Enter Your Phone Number
              </label>
              <input
                placeholder="Enter Your Number"
                id="number"
                className="user-name-input"
                type="number"
                onChange={e =>
                  setUserDetails({...userDetails, number: e.target.value})
                }
              />
            </div>

            <div className="input-container">
              <label className="name-label-text" htmlFor="name">
                Enter Level Of Difficulty
              </label>
              <select
                onChange={e =>
                  setUserDetails({
                    ...userDetails,
                    difficultyLevel: e.target.value,
                  })
                }
                placeholder="Enter Your Name"
                className="select-element"
              >
                <option selected value="easy">
                  Easy
                </option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <button type="submit" className="start-game-button">
              Start Game
            </button>
            {errorText !== '' && <p className="error-text">*{errorText}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registration
