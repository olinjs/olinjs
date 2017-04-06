// the wrapper for everything
var HelloWorld = React.createClass({
  
  getInitialState: function() {
    return {
      h1Text: 'To Do:',
      tasks: [],
      status: 'all'
    };
  },

  findIndexById: function(list, obj) {
    for (var i = 0; i < list.length; i++) {
      if (list[i]._id ==  obj._id) {
        return i
      }
    }
    return -1;
  },

  deleteTaskHandler: function(data) {
    var temp = this.state.tasks;
    var i = this.findIndexById(temp, data.data);
    temp.splice(i, 1);
    this.setState({
      tasks: temp
    });
  },

  changeStatusHandler: function(data) {
    var temp = this.state.tasks;
    var newStatus;
    console.log(temp, data);
    var i = this.findIndexById(temp, data);
    if (temp[i].status == "active") {
      newStatus = "completed";
    } else {
      newStatus = "active";
    }
    temp[i].status = newStatus;

    this.setState({
      tasks: temp
    });
  },

  editTextHandler: function(data) {
    var temp = this.state.tasks;
    var newStatus;
    var i = this.findIndexById(temp, data);
    temp[i] = data;

    this.setState({
      tasks: temp
    });

    console.log(this.state.tasks)
  },

  newTaskHandler: function(data) {
    var temp = this.state.tasks;
    temp.unshift(data.data);
    this.setState({
      tasks: temp
    });
  },

  displaySubset: function(event) {
    this.setState({
      status: event.target.value
    })
  },

  componentDidMount: function() {
    $.ajax({
              url: '/home/',
              dataType: 'json',
              cache: false,
              type: 'GET',
              success: function(data) {
          //data from res.json in routes/index.js is {text: "HelloWorld"}, so we want to access the text field of data
                  this.setState({
                      tasks: data.todos
                  });
              }.bind(this),
              failure: function(xhr, status, err) {
                  console.error('GET /home', status, err.toString());
              }.bind(this)
          });
  },

  render: function() {
    return (
      <div>
        <h1>{this.state.h1Text}</h1>
        <input type="button" value="all" onClick={this.displaySubset}/>
        <input type="button" value="active" onClick={this.displaySubset}/>
        <input type="button" value="completed" onClick={this.displaySubset}/>
        <TaskList tasks={this.state.tasks} status={this.state.status} delete={this.deleteTaskHandler}
          update={this.changeStatusHandler} edit={this.editTextHandler}/>
        <AddTask add={this.newTaskHandler}/>
      </div>
    );
  }
});


// for creating and editing the list of current tasks
var TaskList = React.createClass({
   getInitialState: function() {
    return {
      newTask: ''
    };
  },
  onError: function(xhr, status, err) {
    console.error('GET /home', status, err.toString());
  },
  changeStatus: function(event) {
    event.preventDefault();
    var newStatus;

    if (event.target.value == "active") {
      newStatus = "completed";
    } else {
      newStatus = "active";
    }
    event.target.value = newStatus

    var formData = {
      id: (event.target.id).slice(1),
      status: newStatus
    }
    $.post('/status/', formData)
      .done(this.props.update)
      .error(this.onError);
  },
  editTask: function(event) {
    event.preventDefault();
    var $target = $(event.target);
    $target.parent().find('form').show();
  },
  submitEdit: function(event) {
    event.preventDefault();
    var $target = $(event.target);

    var formData = {
      id: $target.parent().attr('id').slice(1),
      task: $target.find('[name=edit-text]').val()
    };

    $target.hide();
    $.post('/edit/', formData)
      .done(this.props.edit)
      .error(this.onError);
  },
  removeTask: function(event) {
    event.preventDefault();
    // $(event.target).parent().hide();
    var formData = {
      id: (event.target.id).slice(1)
    }
    $.post('/remove/', formData)
      .done(this.props.delete)
      .error(this.onError);
  },
	render: function() {
    var changeStatus = this.changeStatus;
    var removeTask = this.removeTask;
    var editTask = this.editTask;
    var submitEdit = this.submitEdit;
    var updateTextField = this.updateTextField;
    var status = this.props.status;
    var listItems = this.props.tasks.map(function(task) {
      if (status == 'all') {
        return <li key={task._id} id={'t' + task._id}>
          <input
            type="button"
            className="status-button"
            value={task.status}
            id={'s' + task._id}
            onClick={changeStatus}
          />
          <div onDoubleClick={editTask}>{task.task}</div>
          <form onSubmit={submitEdit} className="edit" style={{display:'none'}}>
            <input type="text" name="edit-text"/>
            <input type="submit" value="edit"/>'
          </form>
          <input
            type="button"
            className="delete-button"
            value="delete"
            id={'d' + task._id}
            onClick={removeTask}
          />
        </li>;
      } else {
        if (status == task.status) {
          return <li key={task._id} id={'t' + task._id}>
          <input
            type="button"
            className="status-button"
            value={task.status}
            id={'s' + task._id}
            onClick={changeStatus}
          />
          <div onDoubleClick={editTask}>{task.task}</div>
          <form onSubmit={submitEdit} className="edit" style={{display:'none'}}>
            <input type="text" name="edit-text"/>
            <input type="submit" value="edit"/>'
          </form>
          <input
            type="button"
            className="delete-button"
            value="delete"
            id={'d' + task._id}
            onClick={removeTask}
          />
        </li>;
        }
      };
    });
		return (
			<div>
        <ul>
          {listItems}
        </ul>
			</div>
		);
	}
});

// for creating new tasks
var AddTask = React.createClass({
  getInitialState: function() {
    return {
      newTask: ''
    };
  },
  updateNewTask: function(event){
    this.setState({
      newTask: event.target.value
    });
  },
  onError: function(xhr, status, err) {
    console.error('GET /home', status, err.toString());
  },
  onSuccess: function(data) {
    console.log("put something here!")
  },
  newTask: function(event) {
    event.preventDefault();
    var time = new Date();
    var formData = {
      task: this.state.newTask,
      time: time.getTime()
    }

    this.setState({
      newTask: ''
    })

    console.log("formData", formData);
    $.post("/add/", formData)
      .done(this.props.add)
      .error(this.onError);
  }, 
  render: function(){
    // form to create a new task
    return (
      <div>
        <form onSubmit={this.newTask}>
          <input
            type="text"
            value={this.state.newTask}
            onChange={this.updateNewTask}
          />
          <input
            type="submit"
            name="new-task-submit"
          />
        </form>
      </div>
    );
  }
});

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('content')
);
