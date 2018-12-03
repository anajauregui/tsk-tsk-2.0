import React, { Component } from 'react';
import { _editTask, _archiveCompletedTask, _deleteTask, _getTasks, _createTask } from '../../tasks.js';
import AddTaskButton from '../buttons/addTaskButton/AddTaskButton';
import AddTaskModal from '../../components/modals/AddTaskModal';
import EditTaskModal from '../../components/modals/EditTaskModal';
import DeleteTaskModal from '../../components/modals/DeleteTaskModal';
import TaskList from './taskList';
import storedTasks from '../../components/storedTasks';
import MediaQuery from 'react-responsive';
import _ from 'lodash';
const store = require('store');

class TaskContainer extends Component{
  constructor (props) {
    super(props);

    this.state = {
      editing: false,
      addModal: false,
      deleteModal: false,
      taskList: [],
      taskToDelete: '',
      taskIdToEdit: '',
      taskIndex: '',
      taskToEdit: {},
    };
    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.archiveCompletedTask = this.archiveCompletedTask.bind(this);
  };

  componentDidMount() {
    this.checkStorage();
  }

  checkStorage() {
    if (this.props.isLoggedIn === true) {
      _getTasks(this, this.props.location.pathname);
    } else {
      console.log('not able to bruh');
    }
  };

  createTask(task) {
    this.props.verify();
    _createTask(this, task);
  };

  deleteTask() {
    this.props.verify();
    _deleteTask(this);
  };

  archiveCompletedTask(id) {
    this.props.verify();
    _archiveCompletedTask(this, id);
  }

  editTask(taskEdits, id) {
    this.props.verify();
    _editTask(this, taskEdits, id);
  };

  toggleAdd() {
    this.props.verify();
    this.setState({ addModal: !this.state.addModal });
  };

  toggleDelete(id) {
    this.setState({ deleteModal: !this.state.deleteModal, taskToDelete: id });
  };

  toggleEditing() {
    this.setState({ editing: !this.state.editing }, () => {
      return this.state.editing;
    });
  }

  render() {
    return (
      <div>
        <TaskList taskList={this.state.taskList} editing={this.state.editing} handleEditing={this.toggleEditing} handleOnDelete={this.toggleDelete} handleEditfn={this.editTask} archiveCompletedTask={this.archiveCompletedTask}/>
        <MediaQuery maxWidth={915}>
          {(matches) => {
            if (matches) {
              let style = 'small-add-task-button';
              return <AddTaskButton handleOnClick={this.toggleAdd} buttonClass={style}/>;
            } else {
              let style = 'normal-add-task-button';
              return <AddTaskButton handleOnClick={this.toggleAdd} buttonClass={style}/>;
            }
          }}
        </MediaQuery>
        <AddTaskModal isOpen={this.state.addModal} handleOnClick={this.toggleAdd} createTask={this.createTask} />
        <DeleteTaskModal isOpen={this.state.deleteModal} handleOnClick={this.toggleDelete} handleDeleteTask={this.deleteTask}/>
      </div>
    );
  }
};

export default TaskContainer;
