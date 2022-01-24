import React, { useEffect } from 'react'

export default function Alert({show, msg, type, showAlert, list}) {

  useEffect(() => {
    const timeout = setTimeout(() => { showAlert()}, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [list])

  return (
    <p className={`alert alert-${type}`}>
      {msg}
    </p>
  )
}
