import React from 'react'

export const Checkbox = (props) => {
    const {obj,fnChange} =props
    const {lbl,errorMsg,isShowError,name,values,options,type,value}=obj
    const checkedValues=value.split(',')
  return (
    <div className="row mb-3">
            <div className="col-sm-5 text-end">
              <b>{lbl}:</b>
            </div>
            <div className="col-sm-3 text-start">
                {
                    options.map((val,index)=>{
                        return <React.Fragment key={index}><input checked={checkedValues.includes(values[index])} id={values[index]} className='ms-3' onChange={fnChange} type={type}  name={name} /> {val}</React.Fragment>
                    })
                }
             </div>
            <div className="col-sm-4 text-start">
                {isShowError && <b className="text-danger">{errorMsg}</b>}
            </div>
      </div>
  )
}
