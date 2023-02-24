import React,{useEffect, useState} from 'react'
import {User} from "../Model/Usermodel"//user interface
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonCard from "../SkeletonCard"
import "./Home.css"

interface IState {
  loading:boolean,
  users: User[],
  error:unknown
}

interface Props{
  setLogin:React.Dispatch<React.SetStateAction<boolean>>
}

const Home : React.FC<Props>= ({setLogin}) => {

    const [details,setUsers]=useState<IState>({loading:false,users:[] as User[], error:""})
    const [limit,setLimit]=useState(20)
    const [hasMore,setHasMore]=useState(true)
   
    /*fetch more data after reach bottom of window*/ 
    const fetchMoreData = () => {
      if (details?.users?.length>=500){
        setHasMore(false)
        return
    }
     
      setTimeout(() => {
        setLimit(prev=>prev+10)
        }, 1000);
      };
      
    /* fetch contact data */
    useEffect(()=>{
           setUsers(prev=>({...prev,loading:true}))
           fetch(`https://randomuser.me/api/?results=${limit}`)
           .then((res)=>res.json())
           .then((data)=>setUsers(prev=>({...prev,users:data.results,loading:false})))
           .catch((err)=>setUsers(prev=>({...prev,error:err,loading:false})))
          
           
    },[limit])

  /* logout handler */
  const logoutHandler=()=>{
    localStorage.removeItem("login")
    setLogin(false)}
  
  return (
    <div className='home-container'>
     <button onClick={logoutHandler}>logout</button>
     <h1>Contact List</h1>
     <InfiniteScroll
          dataLength={details?.users?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
      { !details.loading ?  
          (details?.users?.length>0 && details.users.map(user =>(
          <div className='contact-container'>
        
            <div>
            <p>{`${user.name.first} ${user.name.last}`  }</p>
            <p>{user.cell }</p>
            </div>
          <img src={user.picture.large } alt="user-pic" />
          </div>
          
          )) )  
          : 
          <SkeletonCard/>  
      }
      </InfiniteScroll>
    </div>
  )
}


export default  Home