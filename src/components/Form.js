import React from 'react'
import { MdSend } from 'react-icons/md'

const Form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge">charge</label>
                    <input type="text" placeholder="e.g. rent" className="form-control" id="charge" name="charge" value={props.charge} onChange={props.handleCharge}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">amount</label>
                    <input type="number" placeholder="e.g. 100" className="form-control" id="amount" name="amount" value={props.amount} onChange={props.handleAmount}></input>
                </div>
            </div>
            <button type="submit" className="btn" >{props.edit ? 'edit' : 'submit'}<MdSend className="btn-icon"/></button>
        </form>
    )
}

export default Form
