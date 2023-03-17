import React, { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticsLine = ({ text, value }) => {
  return <tr><td>{text}</td> <td>{value}</td></tr>
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = good / all;

  if (all == 0) { return <p>No feedback given</p> }

  return (
    <>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive} />
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give Feeback</h1>
      <Button text="good" onClick={handleGoodClick()} />
      <Button text="neutral" onClick={handleNeutralClick()} />
      <Button text="bad" onClick={handleBadClick()} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App