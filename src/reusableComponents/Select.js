import React from 'react'

export const Select = (props) => {
    const {obj,fnChange} =props
    const {lbl,errorMsg,isShowError,name,options,values,value}=obj
  return (
    <div className="row mb-3">
            <div className="col-sm-5 text-end">
              <b>{lbl}:</b>
            </div>
            <div className="col-sm-3">
              <select onChange={fnChange} name={name} className="form-control">
                  <option>Please Select</option>
                  {
                      options.map((val,index)=>{
                        return <option selected={value==values[index]} value={values[index]} key={index}>{val}</option>
                      })
                  }
              </select>
             </div>
            <div className="col-sm-4 text-start">
                {isShowError && <b className="text-danger">{errorMsg}</b>}
            </div>
      </div>
  )
}
