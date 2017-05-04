//a component that displays the array of tasks as individual ToDoListTask components
var ToDoList = React.createClass({
  render: function() {
  var tasks = this.props.tasks;
  var taskList = tasks.map(function(individualTask){
    return(
      <ToDoListTask 
        task={individualTask.text}
        sortBy={this.props.sortBy}
        srchBy={individualTask}
        active={individualTask.active}
        handleDeleteTask={this.props.handleDeleteTask}
        handleEditTask={this.props.handleEditTask} 
        handleCompletedTask={this.props.handleCompletedTask}
      />
    )}, this);
    return (
      <div>
        {taskList}
      </div>
    )
  }
});

//a non-functional edit button
var EditButton = React.createClass({
  onEditTask: function(){
    this.props.handleEditTask(this.props.srchBy);
  },

  render: function() {
    return (
      <button type='button' onClick={this.onEditTask}> Edit </button>
    );
  }
});

//a button to completely delete an object from the state
var DeleteButton = React.createClass({
  onDeleteTask: function(){
    this.props.handleDeleteTask(this.props.srchBy);
  },
  
  render: function() {
    return (
      <button type='button' onClick={this.onDeleteTask}> Delete </button>
    );
  }
});

//a button to mark a task as completed
var CompletedButton = React.createClass({
  onCompleteTask: function(){
    this.props.handleCompletedTask(this.props.srchBy);
  },
  
  render: function() {
    return (
      <button type='button' onClick={this.onCompleteTask}> Finish </button>
    );
  }
})

var ToDoListTask = React.createClass({
  //renders tasks differently depending on whether or not they have been completed
  render: function(){
    if (this.props.active==true){
      return(
        <li>
          {this.props.task}
          <DeleteButton {...this.props} />
          <EditButton {...this.props} />
          <CompletedButton {...this.props} />
        </li>
      );
    }
    else if (this.props.active==false){
      return(
         <li>
         <del>{this.props.task}</del>
         <DeleteButton {...this.props} />
         <EditButton {...this.props} />
         <CompletedButton {...this.props} />
        </li>
      );
    } 
    else {
      return;
    }
  }
});

//The form to add new tasks
var ToDoForm = React.createClass({
  getInitialState: function() {
    return {task: ''};
  },

  handleSubmit: function(e){
    e.preventDefault();
    var inputText = this.state.task
    if(inputText == ''){
    //prevents the user from entering a blank task
      return;
    }
    this.props.onFormSubmit(inputText);
    this.setState({task: ''});
    React.findDOMNode(this.refs.task).focus();
    return;
},

  onChange: function(e){
    this.setState({task: e.target.value});
  },
 
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Add a Task' ref='task' onChange={this.onChange} value={this.state.task}/>
        <input type='submit' value='Add'/>
      </form>
    );
  }
});

//component to display a count of all active tasks
var ToDoCount = React.createClass({
  render: function() {
    var count = this.props.tasks.length;
    return (
      <h3>{count} tasks left to do.</h3>
    );
  }
})

//this component has radio inputs so that the user can filter the tasks being shown
var SortTasks = React.createClass({
  updateFilter: function(e){
    this.props.handleUpdateFilter(e.target.value);
  },
  render: function() {
    return (
      <form onChange={this.updateFilter}>
        <input type='radio' name='sortBy' value='all' defaultChecked={true}/> All
        <input type='radio' name='sortBy' value='active'/> Active
        <input type='radio' name='sortBy' value='completed'/> Completed
      </form>
    );
  }
})

//the major component of this app
var ToDoApp = React.createClass({
  getInitialState: function() {
    return {
      tasks: [],
      sortBy: 'all'
    };
  },

  //handles a new task being added to the state
  updateTasks: function(newTask) {
    var updatedTasks = this.state.tasks.concat({text: newTask, active:true, key: Math.random().toString(36).substr(2, 9)});
    this.setState({tasks: updatedTasks});
  },
  
  //when the user updates the filter, this saves that change to the state
  handleUpdateFilter: function(sort) {
    this.setState({sortBy:sort});
  },

  //This edit functionality isn't working yet
  handleEditTask: function(taskObj) {
    var index = this.state.tasks.indexOf(taskObj);
  },

  //deletes a task from the state
  handleDeleteTask: function(taskObj){
    var index = this.state.tasks.indexOf(taskObj);
    this.setState(this.state.tasks.splice(index, 1));
  },
  
  //saves a task as completed in the state
  handleCompletedTask: function(task) {
    var tasks = this.state.tasks;
    for (var i in tasks) {
      if (tasks[i].key == task.key) {
        tasks[i].active = false;
        break; //Ends the loop when the task is found
      }
    }
    this.setState({tasks: tasks})
  },
  
  render: function() {
    //variables to pass to components
    var tasks = [];
    var activeTasks = []

    //finds all active tasks for the ToDoCount component
    for (var i in this.state.tasks) {
      if (this.state.tasks[i].active == true) {
        activeTasks = activeTasks.concat(this.state.tasks[i]);
      }
    }

    //sorts tasks based on the filter applied by the user
    if (this.state.sortBy == 'all') {
      tasks = this.state.tasks;
    }
    else if (this.state.sortBy == 'active') {
      tasks = activeTasks;
    }
    else if (this.state.sortBy == 'completed') {
      for (var i in this.state.tasks) {
        if (this.state.tasks[i].active == false) {
          tasks = tasks.concat(this.state.tasks[i]);
        }   
      }
    }
    return (
      <div>
        <h1>To Do List</h1>
        <ToDoList tasks={tasks} sortBy={this.state.sortBy} handleDeleteTask={this.handleDeleteTask} handleEditTask={this.handleEditTask} handleCompletedTask={this.handleCompletedTask}/>
        <ToDoForm onFormSubmit={this.updateTasks}/>
        <ToDoCount tasks={activeTasks}/>
        <SortTasks handleUpdateFilter={this.handleUpdateFilter}/>
      </div>
    );
  }
});

ReactDOM.render(
  <ToDoApp/>,
  document.getElementById('content')
);