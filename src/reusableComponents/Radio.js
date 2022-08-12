import React from 'react'

export const Radio = (props) => {
    const {obj,fnChange} =props
    const {lbl,errorMsg,isShowError,name,options,values,type,value}=obj
  return (
    <div className="row mb-3">
            <div className="col-sm-5 text-end">
              <b>{lbl}:</b>
            </div>
            <div className="col-sm-3 text-start">
                {
                    options.map((val,index)=>{
                        return <React.Fragment key={index}><input className='ms-3' checked={value==values[index]} onChange={fnChange} type={type} value={values[index]} name={name} /> {val}</React.Fragment>
                    })
                }
             </div>
            <div className="col-sm-4 text-start">
                {isShowError && <b className="text-danger">{errorMsg}</b>}
            </div>
      </div>
  )
}
