import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./screen/Home.css"
export default function SkeletonCard() {
    
  return (
    <>
    { Array(10).fill(1).map(()=>
      (<div className='contact-container'>
     
        <div>
        <p><Skeleton width={150}/></p>
        <p><Skeleton/></p>
        
        </div>
        <Skeleton width={70} height={70} borderRadius={35}/>

      </div>)
     )
    }
      </>
  )
}
