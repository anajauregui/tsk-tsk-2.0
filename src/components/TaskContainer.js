import React, { Component } from 'react';
import AddTaskButton from './AddTaskButton';
import AddTaskModal from '../components/modals/AddTaskModal';
import EditTaskModal from '../components/modals/EditTaskModal';
import DeleteTaskModal from '../components/modals/DeleteTaskModal';
import TaskList from './taskList';
import storedTasks from './storedTasks';
const store = require('store');

class TaskContainer extends Component{
  constructor (props) {
    super(props);
    this.state = {
      taskList: [],
      addModal: false,
      editModal: false,
      deleteModal: false,
    };

    store.set('storedTasks', storedTasks);

    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  createTask(task) {
    this.setState({
      taskList: this.state.taskList.concat(task),
    });
    console.log(this.state.taskList);
  };

  toggleAdd() {
    this.setState({
      addModal: !this.state.addModal,
    });
  }

  toggleEdit() {
    this.setState({
      editModal: !this.state.editModal,
    });
  }

  toggleDelete() {
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  }

  componentDidMount() {
    this.setState({
      taskList: storedTasks,
    });
  };

  render() {

    return (
      <div>
        <TaskList taskList={this.state.taskList} handleOnEdit={this.toggleEdit} handleOnDelete={this.toggleDelete}/>
        <AddTaskButton handleOnClick={this.toggleAdd} />
        <AddTaskModal isOpen={this.state.addModal} handleOnClick={this.toggleAdd} createTask={this.createTask} />
        <EditTaskModal isOpen={this.state.editModal} handleOnClick={this.toggleEdit} />
        <DeleteTaskModal isOpen={this.state.deleteModal} handleOnClick={this.toggleDelete}/>
      </div>
    );
  }
};

export default TaskContainer;
