import React from 'react';
import Dashboard from './Dashboard';
import { Image, Typography } from 'antd';
import { useSelector } from 'react-redux';

const Profile = () => {

  const checkoutItems = useSelector((state)=> state.checkOutCartItems)

  return (
    <div>
      <Dashboard>
       <Typography.Paragraph className='mt-10 text-2xl font-bold text-slate-600 text-center'>
        Checkout Items
       </ Typography.Paragraph>
       <div className='flex flex-col justify-center mt-[4rem] '>
        {checkoutItems?.map((item)=>(
          <div className='flex flex-row align-middle justify-around p-4 shadow-lg w-[75rem] mx-auto     mb-2'>
            <Image 
              className='flex flex-col justify-center'
              src={`${item.image}`}
              preview={false}
              height={200}
              width={200}
            />
            <div className='flex flex-col justify-center'>
              <Typography.Paragraph className='text-lg w-[37rem] font-bold'>
                {item.title}
              </Typography.Paragraph>
              <Typography.Paragraph className='text-xl font-bold text-slate-500'>
              &#8377;{item.totalPrice ?? item.price}
              </Typography.Paragraph>
            </div>

            <Typography.Paragraph className='flex flex-col justify-center text-lg font-bold'>
              Quantity: {item.selectedQuantity}
            </Typography.Paragraph>
          </div>
        ))}
          
       </div>
       {checkoutItems.length == 0 && 
       <Typography.Paragraph className='text-red-500 text-2xl font-bold text-center mt-[10rem]'>
          No Checkout Items Found...
        </Typography.Paragraph>}
      </Dashboard>
    </div>
  )
}

export default Profile
