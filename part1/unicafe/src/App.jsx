import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = good / all;

  if(all==0){return <p>No feedback given</p>}

  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
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
      <button onClick={handleGoodClick()}>good</button>
      <button onClick={handleNeutralClick()}>neutral</button>
      <button onClick={handleBadClick()}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App