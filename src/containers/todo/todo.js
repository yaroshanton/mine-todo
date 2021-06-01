import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';

import { addTask, removeTask, completeTask, changeFilter } from '../../redux/todo/todo-actions';

import ToDoInput from '../../components/todo-input/todo-input';
import ToDoList from '../../components/todo-list/todo-list';
import Footer from '../../components/footer/footer';

import './todo.css';

class ToDo extends Component {

  state = {
    taskText: '',
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      taskText: value,
    });
  };

  addTask = ({ key }) => {
    const { taskText } = this.state;

    if (taskText.length >= 1 && key === 'Enter') {
      const { addTask } = this.props;
      addTask(uuidv4(), taskText, false);
      this.setState({
        taskText: '',
      });
    }
  };

  filterTasks = (tasks, activeFilter) => {
    switch (activeFilter) {
      case 'completed':
        return tasks.filter(task => task.isCompleted);
      case 'active':
        return tasks.filter(task => !task.isCompleted);
      default:
        return tasks;
    }
  };

  render() {
    const { taskText } = this.state;
    const { tasks, removeTask, completeTask, filters, changeFilter } = this.props;
    const isTasksExist = tasks && tasks.length > 0;
    const filteredTasks = this.filterTasks(tasks, filters);

    return (
      <div className="todo-wrapper">
        <ToDoInput onKeyPress={this.addTask} onChange={this.handleInputChange} value={taskText} />
        {isTasksExist && <ToDoList completeTask={completeTask} tasksList={filteredTasks} removeTask={removeTask} />}
        {isTasksExist && <Footer changeFilter={changeFilter} activeFilter={filters} />}
      </div>
    );
  }
}

export default connect(({ tasks, filters }) => ({
  tasks,
  filters,
}), { addTask, removeTask, completeTask, changeFilter })(ToDo);












//
