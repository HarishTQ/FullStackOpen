import React from 'react'

const Header = ({courseName}) => {
  return <h1>{courseName}</h1>
}

const Part = ({data}) => {
  return <p>{data.name} {data.exercises}</p>
}

const Content = ({parts}) => {
  return (
    <>
      <Part data={parts[0]} />
      <Part data={parts[1]} />
      <Part data={parts[2]} />
    </>
  )
}

const Total = ({parts}) => {
  return <p>Number of exercises {parts[0].exercises+parts[1].exercises+parts[2].exercises}</p>
}

  const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }

  return (
    <div>
      <Header courseName={course}/>
      <Content parts={[part1,part2,part3]}/>
      <Total parts={[part1,part2,part3]}/>
    </div>
  )
}

export default App