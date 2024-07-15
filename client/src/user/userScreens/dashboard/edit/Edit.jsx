import React from 'react'
import './Edit.scss'

const Edit = () => {
  return (
    <div className="editMain">
      <h1>EDIT PROFILE</h1>
      <div className='editMainContainer'>

        <div className="updateContainer">
          <div className="updateform">
          <form>
              <div className="smallForm">
                <input className="smallInputField" type="text" name="firstname" placeholder="First Name*" required />
                <input className="smallInputField" type="text" name="lastname" placeholder="Last Name*" required />
              </div>
              <input className="inputField" type="email" name="email" placeholder="Email*" required />
              <div className="smallForm">
                <input className="smallInputField" type="text" name="course" placeholder="Course*" required />
                <input className="smallInputField" type="text" name="branch" placeholder="Branch*" required />
              </div>
              <input className="inputField" type="text" name="university" placeholder="University*" required />
              <input className="inputField" type="text" name="college" placeholder="College*" required />
              <input className="inputField" type="text" name="enrollment" placeholder="Enrollment*" required />
            </form>
          </div>
          <button>UPDATE</button>
        </div>

        <div className="changeContainer">
          <div className="changeform">
            <form>
              <div className="passwordField">
                <input
                  className="inputField"
                  type="password"
                  name="password"
                  placeholder="Old Password*"
                  required
                />
                </div>
                <div className="passwordField">
                <input
                  className="inputField"
                  type="password"
                  name="password"
                  placeholder="New Password*"
                  required
                />
                </div>
                <div className="passwordField">
                <input
                  className="inputField"
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password*"
                  required
                />
              </div>
            </form>
            <button>CHANGE</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Edit