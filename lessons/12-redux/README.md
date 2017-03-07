## Table of Contents

<!-- MarkdownTOC -->

- [Lesson 12 - Redux](#lesson-12---redux)
  - [History](#history)
  - [Overview](#overview)
  - [Integrate into React](#integrate-into-react)
  - [Dev Tools](#dev-tools)

<!-- /MarkdownTOC -->


#Lesson 12 - Redux
![Redux Logo](https://raw.githubusercontent.com/reactjs/redux/master/logo/logo-title-dark.png)
[Redux](http://redux.js.org/) is a state management tool meant to be used on top of React.
## History
While Facebook was making React, they also came out with [Flux](https://github.com/facebook/flux).  Flux is a pattern for managing state and data flow in React applications.  It is not a strict framework, but more of an idea for a pattern that Facebook think developers should use.

Since Flux is not its own framework, many different frameworks have come out to try and implement the Flux pattern.  Redux is not a strict implementation of Flux ([depending on who you ask](http://redux.js.org/docs/introduction/PriorArt.html#flux)), but it is heavily inspired by the Flux architecture.  We'll be using Redux for our apps in this class.  Unless you're curious, there's no need to learn Flux itself.

## Overview
### Three Core Principles
1) The whole state of your app is contained in a single state object in a **store**.
2) When the user does something that should change the state, an **action** is dispatched.
3) The action is sent through a **reducer** function, which specifies how to change the state.

### Todo Example
If you're making a Todo app, the state of your app might look like this:
```javascript
{
  filter: 'COMPLETED',
  todos: [
    {
      text: 'brush teeth',
      completed: true,
    },
    {
      text: 'do my JS homework',
      completed: false
    }
  ]
}
```
We have two todos, one completed and one not, and the filter is set so that the user only sees the "completed" todos.

Say the user changes the filter by pressing the "active" button.  The React/Redux app then dispatches an **action** that looks like this:
```javascript
var actionObj = {
  type: 'CHANGE_FILTER',
  payload: 'ACTIVE'
};
```
This is the **action object**.  It says that a `'CHANGE_FILTER'` action was performed and also gives some relevant data in the `payload` property (in this case, what the new filter is).

The action object will then be passed into a **dispatcher** to be dispatched:
```javascript
dispatch(actionObj);
```

The **reducer** then receives the current state and the action object as we defined above, and returns the new state:
```javascript
var todoReducer = function(state, action) {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return Object.assign({}, state, {
        filter: action.payload
      });

    default:
      return state;
  }
}
```
Normally a reducer has multiple `case`s in its `switch` statement to handle all the different action types. (The "reducer" name comes from the Javascript [Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) function)

The [`Object.assign()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) merges multiple objects together.  In reducers, this is often used to merge the old state with the new properties that we change. In this case, the new property is that `filter` is now set to `'ACTIVE'`.  This new `{filter: 'ACTIVE'}` object is merged with the old state and overrides the previous filter while still containing all our todos.

It is important to understand why we use `Object.assign()` here.  The philosophy of Redux is that your state is *immutable*, meaning that you shouldn't modify it directly.  Instead, when you need to change state, you copy the old state, modify the copy, and return this new state object.  This means that your reducer functions are *pure*; each time a reducer function is called with the same parameters (same state and action), the same exact new state is returned.  Developers often use packages like [Immutable.js](https://facebook.github.io/immutable-js/) to make it actually impossible to directly modify state.

## Integrate into React
Redux by itself has no relation to React.  So far, we've talked about Redux in general without React.  Now, you'll learn how to implement Redux into a React app with multiple components.  Read [this official guide](http://redux.js.org/docs/basics/UsageWithReact.html) on react-redux from the Redux docs.

## Dev Tools
There is a very very powerful development environment of Redux called [Redux DevTools](https://github.com/gaearon/redux-devtools).  It lets you easily inspect every action and state change and allows you to "time travel" by undoing actions.
