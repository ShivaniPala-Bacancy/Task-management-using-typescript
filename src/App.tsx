import './App.css';
import React, { Component} from 'react';
import Tasks from './components/TaskList/Tasks';
import Task from './components/TaskList/Task';

interface MyProps {}

interface MyState {
  tasks: Array<string>;
  disabled: Array<boolean>;
  edit: boolean;
  taskname: string;
  editIndex: number;
}

class App extends Component <MyProps , MyState> {
  constructor(props : MyProps){
    super(props);
    this.state={
      tasks: [],
      disabled: [],
      edit: false,
      taskname: "",
      editIndex: 0
    };
  }
  addTask = () =>{
    if(!this.state.taskname){
      alert("Please enter a valid task name " + this.state.taskname);
    }
    else{
      let task = [
        ...this.state.tasks
      ]
      if(task.includes(this.state.taskname)){
        alert("Already There!!")
        return;
      }
      task.push(this.state.taskname)
      let disabledArr= [
        ...this.state.disabled
      ]
      disabledArr.push(false)
      this.setState({tasks: task, disabled: disabledArr, taskname: ""})
    }  
  }
  editTask=()=>{
    let task = [
      ...this.state.tasks
    ]
    task[this.state.editIndex] = this.state.taskname;
    this.setState({tasks: task, taskname: ""} , () => this.setState({edit: false}))
    
  }
  deleteTask=(task: string)=>{
    if(window.confirm(`Do u want to delete ?`)){

      let taskArr= [
        ...this.state.tasks
      ]
      taskArr = taskArr.filter((t) => t !== task);
      this.setState({tasks: taskArr})
    }
  }
  editTaskName=(task: string, index: number)=>{
    this.setState({taskname: task, editIndex: index, edit: true});
    let obj = document.getElementById("taskInput");
    obj?.focus();
  }
  addTaskName=(event : React.ChangeEvent<HTMLInputElement>) => {
    this.setState({taskname: event.target.value});
  }
  checked=(task: string) =>{
    
    let taskArr= [
      ...this.state.tasks
    ]
     const i= taskArr.findIndex(t => t===task)
    let disabledArr= [
      ...this.state.disabled
    ]
    disabledArr[i]= !disabledArr[i]
    this.setState({disabled: disabledArr})
  }
  
  render(){
    let taskList= null;
    if(this.state.tasks.length){
      taskList = this.state.tasks.map((task, index) => {
        
        return (<Task 
          checkedFunction={this.checked.bind(this, task)} 
          disabled={this.state.disabled[index]} 
          tName={task} editFunction={this.editTaskName.bind(this, task, index)} 
          key={index} deleteFunction={this.deleteTask.bind(this, task)} />)
      })
    }

  return (
    <div className="App">
      <p style={{fontSize : "60px", color: "violet"}}>Add New Task</p>
      <input style={{width : "40%", height: "40px", fontSize: "20px"}} 
        type="text" 
        id="taskInput"
        value={this.state.taskname}
        onChange={this.addTaskName} />
      {!this.state.edit ? 
        <button  style={{fontSize : "20px", color: "red", height: "40px"}} 
        onClick={this.addTask}>ADD</button>
      : <button style={{fontSize : "20px", color: "red", height: "40px"}} 
        onClick={this.editTask}>EDIT</button>
      }
      {this.state.tasks.length && 
      <Tasks>
        {taskList}
      </Tasks>
  }
    </div>
  );
}
}

export default App;
