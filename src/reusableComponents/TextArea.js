import React from 'react'

export const TextArea = (props) => {
    const {obj,fnChange} =props
    const {lbl,errorMsg,isShowError,name,value}=obj
  return (
    <div className="row mb-3">
            <div className="col-sm-5 text-end">
              <b>{lbl}:</b>
            </div>
            <div className="col-sm-3">
              <textarea value={value} onChange={fnChange} name={name} className="form-control"></textarea>
            </div>
            <div className="col-sm-4 text-start">
                {isShowError && <b className="text-danger">{errorMsg}</b>}
            </div>
      </div>
  )
}
