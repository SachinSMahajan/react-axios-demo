
import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import baseInstance from '../api'
import './Employee.css'

function EmployeeList() {
    const [EmployeeData, SetEmployee] = useState([])
    const [EmpName, SetEmployeeName] = useState('')
    const [EmpRole, SetEmployeeRole] = useState('')
    function GetEmployees() {
        // axios.get('https://reqres.in/api/users?page=2')
        //     .then(response => {
        //         console.log(response.data)
        //         const { data } = response.data
        //         SetEmployee(data)
        //     }).catch(error => {
        //         console.log(error);
        //     })

        baseInstance.get('api/users?page=2')
        .then(response => {
            console.log(response.data)
            const { data } = response.data
            SetEmployee(data)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        GetEmployees();
    }, [])


    function onEmpNameChange(event){
        SetEmployeeName(event.target.value);
    }
    
    function onEmpRoleChange(event){
        SetEmployeeRole(event.target.value);
    }

    const AddEmployee = async (event) => {
        event.preventDefault();
        await axios.post('https://reqres.in/api/users', {
            name: EmpName,
            job : EmpRole,
           
          }).then(res => {
            
            alert(`Data saved succesfully. 
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
            <h1 className="header">Employee List</h1>

            <table id='tblEmployee' className="Employees">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>

                    {EmployeeData.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.first_name}</td>
                            <td>{emp.last_name}</td>
                            <td>{emp.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
        <div>
        <form onSubmit={AddEmployee}>
            <label htmlFor="name">First name:</label><br />
            <input type="text" id="name" name="fname" value={EmpName} onChange={onEmpNameChange}/><br />
            <label htmlFor="role">Role:</label><br />
            <input type="text" id="role" name="role" value={EmpRole} onChange={onEmpRoleChange}/><br />
            <input type="submit" value="Submit" />
        </form>
    </div>
    </Fragment>
    )



}
export default EmployeeList
