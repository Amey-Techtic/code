import React from 'react'
import CustomHeader from './CustomHeader'


const Dashboard = ({Children}) => {

  return (
    <div>
        <CustomHeader/>
        {Children}
        
    </div>
  )
}

export default Dashboard
