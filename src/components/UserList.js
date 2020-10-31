
import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import baseInstance from '../api'
import './User.css'

function UserList() {
    const [UserData, SetUserData] = useState([])
    const [UserName, SetUserName] = useState('')
    const [UserRole, SetUserRole] = useState('')

    function GetAllUSers() {
        axios.get('https://reqres.in/api/users?page=2')
            .then(response => {
                console.log(response.data)
                const { data } = response.data
                SetUserData(data)
            }).catch(error => {
                console.log(error);
            })

        // baseInstance.get('api/users?page=2')
        // .then(response => {
        //     console.log(response.data)
        //     const { data } = response.data
        //     SetUserData(data)
        // }).catch(error => {
        //     console.log(error);
        // })
    }

    useEffect(() => {
        GetAllUSers();
    }, [])


    function onUserNameChange(event) {
        SetUserName(event.target.value);
    }

    function onUserRoleChange(event) {
        SetUserRole(event.target.value);
    }

    const AddUser = async (event) => {
        event.preventDefault();
        await baseInstance.post('api/users', {
            name: UserName,
            job: UserRole
        }).then(res => {
            alert(`Data saved successfully. 
                ID = ${res.data.id}
                First name = ${res.data.name}
                Role = ${res.data.job}
                Created At = ${res.data.createdAt}`
            )
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Fragment>
            <div className="container">
                <h1 className="header">User List</h1>

                <table id='tblUser' className="Users">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>

                        {UserData.map((user) => (
                            <tr key={user.id}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div>
                <form onSubmit={AddUser}>
                    <label htmlFor="name">First name:</label><br />
                    <input type="text" id="name" name="fname" value={UserName} onChange={onUserNameChange} /><br />
                    <label htmlFor="role">Role:</label><br />
                    <input type="text" id="role" name="role" value={UserRole} onChange={onUserRoleChange} /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </Fragment>
    )



}
export default UserList
