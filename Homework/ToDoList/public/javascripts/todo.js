
var ToDoList = React.createClass({
  render: function() {
    var tasks = this.props.tasks;
    // if (this.props.sortBy == 'all'){
    //   var taskList = tasks.map(function(individualTask){
    //   return(
    //     <ActiveTask task={individualTask.text} sortBy={this.props.sortBy} srchBy={individualTask} active={individualTask.active} handleDeleteTask={this.props.handleDeleteTask} handleEditTask={this.props.handleEditTask} handleCompletedTask={this.props.handleCompletedTask} />
    //   )}, this);
    // }
    // else if (this.props.sortBy == 'active'){
    //   var taskList = tasks.map(function(individualTask){
    //   return(
    //     <ActiveTask task={individualTask.text} sortBy={this.props.sortBy} srchBy={individualTask} active={individualTask.active} handleDeleteTask={this.props.handleDeleteTask} handleEditTask={this.props.handleEditTask} handleCompletedTask={this.props.handleCompletedTask} />
    //   )}, this);
    // }
    // else if (this.props.sortBy == 'completed'){
    //   var taskList = tasks.map(function(individualTask){
    //   return(
    //     <CompletedTask task={individualTask.text} sortBy={this.props.sortBy} srchBy={individualTask} active={individualTask.active} handleDeleteTask={this.props.handleDeleteTask} handleEditTask={this.props.handleEditTask} handleCompletedTask={this.props.handleCompletedTask} />
    //   )}, this);
    // } 
    var taskList = tasks.map(function(individualTask){
      return(
        <ToDoListTask task={individualTask.text} sortBy={this.props.sortBy} srchBy={individualTask} active={individualTask.active} handleDeleteTask={this.props.handleDeleteTask} handleEditTask={this.props.handleEditTask} handleCompletedTask={this.props.handleCompletedTask} />
      )}, this);

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

var CompletedTask = React.createClass({
  render: function(){
    if (this.props.active==false) {
      return(
        <li>
        <del>{this.props.task}</del>
        <DeleteButton {...this.props} />
        <EditButton {...this.props} />
        <CompletedButton {...this.props}  />
      </li>
      );
    }
    else {
      return;
    }
  }
})

var ActiveTask = React.createClass({
  render: function(){
    if (this.props.active==true) {
      return(
        <li>
        {this.props.task}
        <DeleteButton {...this.props} />
        <EditButton {...this.props} />
        <CompletedButton {...this.props}  />
      </li>
      );
    };
  }
})

var ToDoListTask = React.createClass({
  render: function(){
    if (this.props.active==true){
      return(
        <li>
        {this.props.task}
        <DeleteButton {...this.props} />
        <EditButton {...this.props} />
        <CompletedButton {...this.props}  />
      </li>
      );
    }     
    else if (this.props.active==false){
      return(
      <li>
        <del>{this.props.task}</del>
        <DeleteButton {...this.props} />
        <EditButton {...this.props} />
        <CompletedButton {...this.props}  />
      </li>
      );
    } 
    else {
      return;
    }
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

  handleUpdateFilter: function(sort) {
    this.setState({sortBy:sort});
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
    var tasks = this.state.tasks;
    for (var i in tasks) {
      if (tasks[i].key == task.key) {
        tasks[i].active = false;
        break; //Stop this loop, we found it!
      }
    }
    this.setState({tasks: tasks})
  },

  render: function() {
    var tasks = [];
    if (this.state.sortBy == 'all') {
      tasks = this.state.tasks;
    }
    else if (this.state.sortBy == 'active') {
      tasks = this.state.tasks.filter(function(task){
        return task.active = true;
      });
    }
    else if (this.state.sortBy == 'completed') {
      tasks = this.state.tasks.filter(function(task){
        return task.active = false;
      });
    }
    return (
      <div>
        <h1>To Do List</h1>
        <ToDoList tasks={tasks} sortBy={this.state.sortBy} handleDeleteTask={this.handleDeleteTask} handleEditTask={this.handleEditTask} handleCompletedTask={this.handleCompletedTask}/>
        <ToDoForm onFormSubmit={this.updateTasks}/>
        <ToDoCount tasks={this.state.tasks}/>
        <SortTasks handleUpdateFilter={this.handleUpdateFilter}/>
      </div>
    );
  }
});


ReactDOM.render(
  <ToDoApp/>,
  document.getElementById('content')
);