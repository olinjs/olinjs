
var ToDoList = React.createClass({
  render: function() {
    var tasks = this.props.tasks;
    var taskList = tasks.map(function(individualTask){
      return(
        <ToDoListTask task={individualTask.text} srchBy={individualTask} active={individualTask.active} handleDeleteTask={this.props.handleDeleteTask} handleEditTask={this.props.handleEditTask} handleCompletedTask={this.props.handleCompletedTask} />
      )
    }, this);

    return (  
      <div>
         {taskList}
      </div>
    )
  }
});

var EditButton = React.createClass({
  onEditTask: function(){
    this.props.handleEditTask(this.props.srchBy);
  },

  render: function() {
    return (
      <button type='button' onClick={this.onEditTask}> Edit </button>
    );
  }
})

var DeleteButton = React.createClass({
  onDeleteTask: function(){
    this.props.handleDeleteTask(this.props.srchBy);
  },

  render: function() {
    return (
      <button type='button' onClick={this.onDeleteTask}> Delete </button>
    );
  }
})

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
  render: function(){
    return (
      <li>
        {this.props.task}
        <DeleteButton {...this.props} />
        <EditButton {...this.props} />
        <CompletedButton {...this.props}  />
      </li>
    );
  }
});



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
        <input type='text'  placeholder='Add a Task' ref='task' onChange={this.onChange} value={this.state.task}/>
        <input type='submit' value='Add'/>
      </form>
    );
  }
});   

var ToDoCount = React.createClass({
  render: function() {
    var count = this.props.tasks.length;
    return (
      <h3>{count} tasks left to do.</h3>
    );
  }
})

var ToDoApp = React.createClass({
  getInitialState: function() {
    return {tasks: []};
  },

  //handles a new task being added to the state
  updateTasks: function(newTask) {
    var updatedTasks = this.state.tasks.concat({text: newTask, active:true, key: Math.random().toString(36).substr(2, 9)});
    this.setState({tasks: updatedTasks});
  },

  handleEditTask: function(taskObj) {
    var index = this.state.tasks.indexOf(taskObj);
    this.state.tasks[index].active = false;
  },

  handleDeleteTask: function(taskObj){
    var index = this.state.tasks.indexOf(taskObj);
    this.setState(this.state.tasks.splice(index, 1));
  },

  handleCompletedTask: function(task) {
    this.setState({tasks: 'penis1'});
  },

  render: function() {
    return (
      <div>
        <h1>To Do List</h1>
        <ToDoList tasks={this.state.tasks} handleDeleteTask={this.handleDeleteTask} handleEditTask={this.handleEditTask} handleCompletedTask={this.handleCompletedTask}/>
        <ToDoForm onFormSubmit={this.updateTasks}/>
        <ToDoCount tasks={this.state.tasks}/>
      </div>
    );
  }
});


ReactDOM.render(
  <ToDoApp/>,
  document.getElementById('content')
);
