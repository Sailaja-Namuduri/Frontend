import React from 'react'

export const TextBox = (props) => {
    const {obj,fnChange} =props
    const {lbl,type,errorMsg,isShowError,value,name,isDisabled}=obj
  return (
    <div className="row mb-3">
            <div className="col-sm-5 text-end">
              <b>{lbl}:</b>
            </div>
            <div className="col-sm-3">
              <input disabled={isDisabled} onChange={fnChange} value={value}  type={type} name={name} className="form-control" />
            </div>
            <div className="col-sm-4 text-start">
                {isShowError && <b className="text-danger">{errorMsg}</b>}
            </div>
      </div>
  )
}
