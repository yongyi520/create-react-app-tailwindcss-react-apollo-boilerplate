import React from 'react'
import PropTypes from 'prop-types'

const Dashboard = () => {

  const onChange = async (e) => {
    const files = e.target.files
    console.log('file', files[0])
    let formData = new FormData()
    formData.append("file", files[0]);
    const response = await fetch("http://localhost:3000/api/upload-image", {method: 'POST', body: formData}).then(res => res.json())
    console.log('response', response)
  }

  return (
    <div id="Dashboard">
      <input type='file' accept="image/*" onChange={onChange}/>
    </div>
  )
}

Dashboard.propTypes = {

}

export default Dashboard