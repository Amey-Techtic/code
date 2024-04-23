import React from 'react'
const errorStyle = {
  color: "red",
};
const CustomInput = ({touched, accept, label, errors, name, type, placeholder, value, onBlur, onChange, onClick}) => {
  return (
    <div>
      <div className='text-left ml-[11.5%]'>
      {label}
      </div>
       <input name={name} type={type} accept={accept ?? accept} placeholder={placeholder} value={value} onBlur={onBlur} onChange={onChange} autoComplete='off' 
       className={`border-2 p-[2%] w-[77%] rounded-md my-1 hover: outline-none`} onClick={onClick}/> 
      {errors && <div className='text-left text-sm mb-1 ml-[11.5%]' style={errorStyle}>{touched ? errors : undefined}</div>}

    </div>
  )
}

export default CustomInput
