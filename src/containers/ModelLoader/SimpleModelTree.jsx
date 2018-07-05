import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const transformValuesToTreeData = (variables, parameters) => {
  var data = [
    {
      name: 'parameters',
      toggled: 'true',
      children: []
    }, {
      name: 'variables',
      toggled: 'false',
      children: []
    }
  ]

  Object.keys(parameters).forEach((el) => {
    data[0].children.push({
      name: parameters[el].name
    })
  })

  Object.keys(variables).forEach((el) => {
    data[1].children.push({
      name: variables[el].name
    })
  })

  return data
}

const SimpleModelTree = ({variables, parameters}) => {
  return (
    <aside>
    </aside>
  )
}

export default SimpleModelTree
