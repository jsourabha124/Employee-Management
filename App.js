import React, { Component } from 'react';
import './App.css';

class App extends Component {

  //create a constructor and initilize action, title, index and datas
  constructor(props){
    //super(props) is refference to parent function
    super(props);
    this.state={
      title: 'Please Enter Name and Address',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.name.focus();
    this.refs.name.focus();
  }

  //when we press submit button, fsubmit function will exicute save the data and reset the name and address bock
  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;

    if(this.state.act === 0){   //action 0 is for new data
      let data = {
        name, address
      }
      datas.push(data);
    }else{                      //action is 1 or more for other data
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
    }    

    this.setState({
      datas: datas,
      act: 0
    });
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  //on change events for handler event instd of refs use functional handler

  //for remove, pass and index number and delete the row and reset index numbers
  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1); //splice used for delete data
    this.setState({
      datas: datas
    });
    
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  //foe edit, pass index and edit the data
  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;

    this.setState({
      act: 1,
      index: i
    });
    this.refs.name.focus();
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Name" className="formField" />
          <input type="text" ref="address" placeholder="Address" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">submit </button>
        </form>

        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.name}, {data.address}
              <button onClick={()=>this.fRemove(i)} className="myListButton">remove </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;