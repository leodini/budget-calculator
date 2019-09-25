import React from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'

const Item = (props) => {
    const { id, charge, amount } = props.expense;
    return (
        <li className="item">
            <div className="info">
                <span className="expense">{charge}</span>
                <span className="amount">${amount}</span>
            </div>
            <div>
                <button className="edit-btn" arial-label="edit button" onClick={() => props.handleEdit(id)}><MdEdit/></button>
                <button className="clear-btn" arial-label="delete button" onClick={() => props.handleDelete(id)}><MdDelete/></button>
            </div>
        </li>
    )
}

export default Item
