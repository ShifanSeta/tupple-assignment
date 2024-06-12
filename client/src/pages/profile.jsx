import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setTimeout(() => {
            handleSubmit(event);
        }, 0);
    };
    const handleSubmit = async (event) => {
        if (!selectedFile) {
          alert("Please select a file first!");
          return;
        }
    
        const formData = new FormData();
        formData.append('profilePic', selectedFile);
    
        try {
            const id = localStorage.getItem('id')
            const response = axios.post(`http://localhost:3100/api/upload/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            }).then((res) => {
                console.log("res", res);
                getUserDetails();
                setUser(res.data);
            })
          console.log(response.data);
        } catch (error) {
          console.error("Error uploading the file:", error);
        }
      };
    
    function logoutUser(){
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        navigate('/login')
    }
    function deleteUser(){
        const id = localStorage.getItem('id');
        const body = {
            "userId": id,
            "token": localStorage.getItem('token')
        }
        axios.delete(`http://localhost:3100/api/users/${id}`, body, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
              }}).then((res) => {
            setUser(res.data);
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            navigate('/login')
        })
    }
    function getUserDetails(){
        const id = localStorage.getItem('id')
        axios.get(`http://localhost:3100/api/users/${id}`).then((res) => {
            console.log("res", res);
            setUser(res.data);
        })
    }
    useEffect(()=> {
        getUserDetails();
    }, [])
  return (
    <div>
<>
<nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      My Profile
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Profile
          </a>
        </li>
      </ul>
      <button type="button" class="btn btn-secondary" onClick={logoutUser}>Logout</button>

    </div>
  </div>
</nav>
    <div className="container">
    <div className="row">
    <div className="col-xl-4">
      <div className="card mb-4 mb-xl-0">
        <div className="card-header">Profile Picture</div>
        <div className="card-body text-center">
          <img
            className="img-account-profile rounded-circle mb-2"
            src={user.profilePic ? 'http://localhost:3100/public/profiles/66698bf505bd45f3b4e8e809/profile.jpg' : 'http://bootdey.com/img/Content/avatar/avatar1.png'}
            alt=""
          />
          <div className="small font-italic text-muted mb-4">
            JPG or PNG no larger than 5 MB
          </div>
          <div className="btnContainer">
          <button className="btn btn-primary uploadBtn" type="button">
            Upload new image <input type='file' onChange={handleFileChange} className='hiddenInput' />
          </button>
          
          </div>

        </div>
      </div>
    </div>
    <div className="col-xl-8">
      <div className="card mb-4">
        <div className="card-header">Account Details</div>
        <div className="card-body">
          <form>
            <div className="row gx-3 mb-3">
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputFirstName">
                  First name
                </label>
                <input
                  className="form-control"
                  id="inputFirstName"
                  type="text"
                  placeholder="Enter your first name"
                  defaultValue="Valerie"
                />
              </div>
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputLastName">
                  Last name
                </label>
                <input
                  className="form-control"
                  id="inputLastName"
                  type="text"
                  placeholder="Enter your last name"
                  defaultValue="Luna"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="small mb-1" htmlFor="inputEmailAddress">
                Email address
              </label>
              <input
                className="form-control"
                id="inputEmailAddress"
                type="email"
                placeholder="Enter your email address"
                value={user?.email}
                readOnly
              />
            </div>
            <button className="btn btn-primary mx-2" disabled type="button">
              Save changes
            </button>
            <button className="btn btn-danger" onClick={deleteUser} type="button">
              Delete User
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
    </div>
</>

    </div>
  )
}

export default Profile