import React, { useEffect, useState } from 'react'
import List from './List'
import Alert from './Alert'

function getLocalStorage(){
  let list = localStorage.getItem('list')
  if(list){
    return ( list = JSON.parse(localStorage.getItem('list')) )
  } else {
    return []
  }
}

export default function App() {
  
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: ""
  })

  const [editID, setEditID] = useState(null)

  function handleSubmit(e){
    e.preventDefault()
    
    if(!name) {
      showAlert(true, 'enter a value', 'danger')
      // setAlert({ show: true, msg: "enter a value", type: "danger"})
    } 
    
    else if(name && isEditing){
      setList(list.map((item)=>{
        if(item.id === editID){
          return {...item, title: name}
        }
        return item
      }))
      showAlert(true, 'value changed', 'success')
      setIsEditing(false)
      setName('')
      setEditID(null)
    }
    
    else {
      showAlert(true, 'item was added to list', 'success')
      // setAlert({ show: true, msg: "item was added to list", type: "success"})
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }

  function showAlert(show = false, msg = '', type = ''){
    setAlert({show, msg, type})
  }

  function clearItems(){
    setList([])
    setAlert({show: true, msg: 'items were cleared', type: 'danger'})
  }

  function deleteItem(id){
    showAlert(true, 'item was removed', 'danger')
    setList(list.filter((item)=> item.id !== id))
  }

  function editItem(id){
    const specificItem = list.find((item)=> item.id === id)
    setEditID(id)
    setIsEditing(true)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input 
            type="text"
            className="grocery"
            placeholder='e.g. eggs'
            value={name}
            onChange={(e)=> setName(e.target.value)}
           />
           <button 
           type="submit"
           className="submit-btn"
           >{isEditing ? 'edit' : 'submit'}</button>
        </div>
      </form>
      
      { list.length > 0 &&
        <div className="grocery-container">
        <List items={list} editItem={editItem} deleteItem = {deleteItem}/>
        <button className="clear-btn" onClick={clearItems}>clear items</button>
      </div> }
      
    </section>
  )
}
