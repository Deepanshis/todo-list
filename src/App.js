import React from 'react';
import logo from './logo.svg';
import './App.css';
import papercss from 'papercss/dist/paper.css'

//import { tsPropertySignature } from '@babel/types';

// function App(props) {
//   return (
//     <div>
//     <h1>{props.msg1}</h1>
//     <h1>{props.msg2}</h1>
//     <Othercomponent text="h"></Othercomponent>
    
//     </div>
//     );
// }


// function Othercomponent(props){
//     let a=" "
//     if(props.text)
//     { a="prop there"}
//     else
//     {a="No prop there"}
//      return(
//     <h2 p className="styled">{a}</h2>
//      )
  
// }


// class App extends React.Component{
//   constructor()
//   {
//     var id;
//     super()
//     this.state={
//       counter:0
//     }
//   }
 
// getInc()
// {
//   let a=(this.state.counter+1);
//   this.setState({
//     counter:a
  // })
  // this.setState({
  //   counter:this.state.counter+1
  // })
// }
// getDec(){
// this.setState({
//   counter:this.state.counter-1
// })
// }
// render()
// {
//   return(
//     <div>
//        <h1>{this.state.counter}</h1>
//        <button onClick={() => {this.getInc()}}>Increment</button>
//        <button onClick={() => {this.getDec()}}>Decrement</button>
//     </div>

//   )
// }
// }

class App extends React.Component{
  constructor()
  {
    super()
    this.state={}
    this.state.list=[]
    this.state.change="";
    this.state.selected=0;
    this.state.total=0;
  }

  addToList(){
    let l= this.state.list;
    if(this.state.change==="")
    {return}
    let obj={title:this.state.change,status:false,time:new Date().toLocaleTimeString(),date:new Date().toDateString()}   
    l.push(obj);
    this.setState({
      list:l,
      change:"",
      total:this.state.total+1,
    }
    )
    
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
    this.state.duedate({
      change:e.target.value
  })
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
      if(e.target.value=='by name'){
       let temp=this.state.list
       let arr=temp.sort(function(a,b){
         var A=a.val.toLowerCase(), B=b.val.toLowerCase()
         if(A<B)
          return -1
         if(A>B)
          return 1 
        return 0  
       })
       this.setState({
         list:arr
       })
    }
  } 

  
   getList=()=>{
    let arr=[];
    arr= this.state.list.map((item,i)=>{
      return(
        <div key={i} className="row">
         <button onClick={(e)=>{this.changeStatus(i)}} className={item.status?"paper-btn btn-success col-4 ":" btn-block col-4 animated slideInUp"} >{item.title}<span> {item.time}</span><span> {item.date}</span></button>
         <button onClick={(e)=>{this.upShift(i)}} className="paper-btn btn-warning   animated slideInUp col-2">UP</button>
         <button onClick={(e)=>{this.downShift(i)}} className="paper-btn btn-secondary   animated slideInUp col-2">DOWN</button>
         <button onClick={(e)=>{this.throwInput(i)}} className="paper-btn btn-danger   animated slideInUp col-2">X</button>
         <button className="paper-btn btn-danger animated slideInUp col-2" onClick={(e)=>{this.dateChanged(i)}}>{item.duedate}DUE</button> 
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
        
        <div>
           <select name="SORT BY">
             <option value='by name'>BY NAME </option>
             <option value='by date'>BY DATE </option>
           </select>
           <label htmlFor="date">Due Date</label>
           <input id="date" type="date"  onChange={(e)=>{this.dateChanged(e)}}></input>
        </div>
        
        <div>
           <p className="tasks ">Completed Tasks/Total Tasks </p>
           <p className="tasks ">{this.state.selected}/{this.state.total }</p>
           {this.getList()}  
         </div>
   
   </div>

    )
  }

  }
 export default App;
