import React from 'react';
import logo from './logo.svg';
import './App.css';
import PropType from 'prop-types';
import papercss from 'papercss/dist/paper.css'

//import { tsPropertySignature } from '@babel/types';


class App extends React.Component{
  constructor()
  {
    super()
    this.state={}
    this.state.list=[]
    this.state.change="";
    this.state.selected=0;
    this.state.duedate="";
    this.state.total=0;
  }

  addToList(){
    if(this.state.change!=="")
    { 
      if(this.state.duedate!=="")
      {
      let l= this.state.list;
      let obj={
      val:this.state.change,
      title:this.state.change,
      status:false,
      time:new Date().toLocaleTimeString(),
      date:new Date().toDateString(),
      duedate:this.state.duedate
      }   
    l.push(obj);
    this.setState({
      list:l,
      change:"",
      total:this.state.total+1,
      duedate:""
    })
    }
    else alert("enter due date")
  }
}

  changeStatus(i)
  {
    console.log(i);
    let l=this.state.list;
    if(l[i].status===false)
    {
      l[i].status=!l[i].status
      this.setState({ 
      list:l,
      selected:this.state.selected+1,
     
        })
    }
    else
    if(l[i].status===true)
    {
      l[i].status=!l[i].status
      this.setState({ 
      list:l,
      selected:this.state.selected-1,
     
        })
    }
    console.log(this.state.list[i].status);
  }
  

  getInput(e)
  { 
    this.setState({
      change:e.target.value,
    })
  }
  dateChanged(e)
  {
    this.state.duedate=e.target.value
}

  throwInput(i){
    let l=this.state.list
    if(l[i].status===true){
    l.splice(i,1)
    this.setState({
      list:l,
      total:this.state.total-1,
      selected:this.state.selected-1,
    })
  }
  else if(l[i].status===false)
  {l.splice(i,1)
    this.setState({
      list:l,
      total:this.state.total-1,

    })
  }
  }


   upShift(i){
     let l= this.state.list;
     if(i===0)
          {return}
     let temp=0;
     temp=l[i];
     l[i]=l[i-1];
     l[i-1]=temp;
     this.setState({
      list:l
     })
     
    }

     downShift(i){
      let l= this.state.list;
       if(i===l.length-1)
        {return}
     else{
      let temp=0;
      temp=l[i];
      l[i]=l[i+1];
      l[i+1]=temp;
      this.setState({
       list:l
      })
     }
   }
   sortBy(e)
   {
      if(e.target.value==='by name'){
       let temp=this.state.list;
       let arr=temp.sort(function(a, b){
         var A=a.val.toLowerCase(),B=b.val.toLowerCase()
         if(A<B)
          return -1
         if(A>B)
          return 1  
       return 0
        }
       )
       
       this.setState({
         list:arr
       })
    }
    if(e.target.value==='by date')
    {
      let temp=this.state.list
      let arr=temp.sort(function(a,b){
      var dateA=new Date(a.duedate), dateB=new Date(b.duedate)
      return dateA-dateB
    })
    this.setState({
      list: arr
    })
    }
  } 

  
   getList=()=>{
    let arr=[];
    arr= this.state.list.map((item,i)=>{
      return(
        <div key={i} className="row">
         <button onClick={(e)=>{this.changeStatus(i)}} className={item.status?"paper-btn btn-success  animated slideInUp col-4 ":"  animated slideInUp btn-block col-4 "} >{item.title}<span> {item.time}</span><span> {item.date}</span></button>
         <button onClick={(e)=>{this.upShift(i)}} className="paper-btn btn-warning   animated slideInUp col-2">UP</button>
         <button onClick={(e)=>{this.downShift(i)}} className="paper-btn btn-secondary   animated slideInUp col-2">DOWN</button>
         <button onClick={(e)=>{this.throwInput(i)}} className="paper-btn btn-primary   animated slideInUp col-2">X</button>
         <p className="alert alert-danger animated slideInUp col-2">Due Date : {item.duedate}</p>
        </div>
      )
    })
    return arr;
  }
  
  render()
  {
    return(
      <div>
        <h1 className="texts animated bounceIn">TODO LIST!</h1>
        <div className="row">
           <input type="text" onChange={(e) => (this.getInput(e)) } value={this.state.change} placeholder="enter text"
           className='col-6'/>
           <button className="paper-btn btn-secondary col-6" onClick={(e) => (this.addToList())} >ADD</button>
        </div>
        
        <div className="row">
          
        <span className=" col-1"></span>
            <label htmlFor="sel" className="sort">Sort By: </label> 
              <select id="sel" onChange={(e)=>{this.sortBy(e)}} className="sort">
                  <option >Select</option>
                  <option value='by name'>By Name</option>
                  <option value='by date'>By Date</option>
              </select>
            <span className=" col-5"></span>
            <label  htmlFor="date col">Due Date:</label>
            <input id="date" type="date" className="col-2" onChange={(e)=>{this.dateChanged(e)}}></input> 
            <span className="col-2"></span>
          </div>
        
           <div>       
           <h4 className="tasks ">Completed Tasks/Total Tasks </h4>
           <h4 className="tasks ">{this.state.selected}/{this.state.total }</h4>
           {this.getList()}  
           </div>
   
   </div>

    )
  }

  }
 export default App;
