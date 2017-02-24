import React, { Component } from 'react';
import './App.css';
var ReactDOM = require('react-dom');

var TodoBox = React.createClass({
	getInitialState: function () {
		return {
			data: []
		};
	},
	generateId: function () {
		return Math.floor(Math.random()*90000) + 10000;
	},
  editItem: function(editedItem){
    var allItems = this.state.data.map(function(item){
      if (item.id !== editedItem.id){
        return item;
      }
      return editedItem;
    })
  },
  updateItems:function(items){
    this.setState({items:items})
  },
	handleNodeRemoval: function (nodeId) {
		var data = this.state.data;
		data = data.filter(function (el) {
			return el.id !== nodeId;
		});
		this.setState({data});
		return;
	},
	handleSubmit: function (task) {
		var data = this.state.data;
		var id = this.generateId().toString();
		var complete = 'false';
		data = data.concat([{id, task, complete}]);
		this.setState({data});
	},
	handleToggleComplete: function (nodeId) {
		var data = this.state.data;
		for (var i in data) {
			if (data[i].id == nodeId) {
				data[i].complete = data[i].complete === 'true' ? 'false' : 'true';
				break;
			}
		}
		this.setState({data});
		return;
	},
	render: function() {
		return (
			<div>
				<h1>ToDo List</h1>
        <TodoForm onTaskSubmit={this.handleSubmit} />
				<TodoList data={this.state.data} removeNode={this.handleNodeRemoval} toggleComplete={this.handleToggleComplete} onItemEdit= {this.editItem}/>
			</div>
		);
	}
});

var TodoList = React.createClass({
	removeNode: function (nodeId) {
		this.props.removeNode(nodeId);
		return;
	},
	toggleComplete: function (nodeId) {
		this.props.toggleComplete(nodeId);
		return;
	},
	render: function() {
		var listNodes = this.props.data.map(function (listItem) {
			return (
				<TodoItem key={listItem.id} nodeId={listItem.id} task={listItem.task} complete={listItem.complete} removeNode={this.removeNode} toggleComplete={this.toggleComplete} />
			);
		},this);
		return (
			<ul>
				{listNodes}
			</ul>
		);
	}
});

var TodoItem = React.createClass({
	removeNode: function (e) {
		e.preventDefault();
		this.props.removeNode(this.props.nodeId);
		return;
	},
	toggleComplete: function (e) {
		e.preventDefault();
		this.props.toggleComplete(this.props.nodeId);
		return;
	},
  handleEdit: function(e){
    e.preventDefault();
    this.props.handleEdit(this.props.nodeID);
    return;
  },
	render: function() {
		var classes = '';
		if (this.props.complete === 'true') {
			classes = classes + 'completed';
		}
		return (
			<li className={classes}>
        <label onDoubleClick={this.handleEdit}>
				    {this.props.task}
        </label>
				<div>
					<button type="button" onClick={this.toggleComplete}>&#x2713;</button> <button type="button" onClick={this.removeNode}>&#xff38;</button>
				</div>
			</li>
		);
	}
});

var TodoForm = React.createClass({
	doSubmit: function (e) {
		e.preventDefault();
		var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
		if (!task) {
			return;
		}
		this.props.onTaskSubmit(task);
		ReactDOM.findDOMNode(this.refs.task).value = '';
		return;
	},
	render: function() {
		return (
			<div>
				<hr />
				<div>
					<form onSubmit={this.doSubmit}>
						<div>
							<label htmlFor="task">Task</label>
							<div>
								<input type="text" id="task" ref="task" placeholder="Enter task here" />
							</div>
						</div>
						<div className="row">
							<div>
								<input type="submit" value="Add"/>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
});

export default TodoBox;
