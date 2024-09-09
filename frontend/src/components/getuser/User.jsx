import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from 'react-router-dom';

const User = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://6augspringbootcrudop-production.up.railway.app/employee");
                const employeeData = Array.isArray(response.data) ? response.data : []; // Ensure it's an array
                setEmployees(employeeData);
            } catch (error) {
                if (error.response) {
                    toast.error(`Error ${error.response.status}: ${error.response.data.msg}`, { position: "top-right" });
                } else {
                    toast.error("An error occurred while fetching employees.", { position: "top-right" });
                }
            }
        };
        fetchData();
    }, []);

    const deleteEmployee = async (id) => {
        console.log(`Deleting employee ${id}`);
        if (window.confirm("Are you sure to delete this record?")) {
            try {
                console.log(`id: ${id}`);
                const response = await axios.delete(`https://6augspringbootcrudop-production.up.railway.app/employee/${id}`);
                toast.success(response.data.msg, { position: "top-right" });
                setEmployees(employees.filter((employee) => employee.employeeId !== id));
            } catch (error) {
                if (error.response) {
                    toast.error(`Error ${error.response.status}: ${error.response.data.msg}`, { position: "top-right" });
                } else {
                    toast.error("An error occurred while deleting the employee.", { position: "top-right" });
                }
            }
        }
    };

    return (
        <div className='employeeTable'>
            <Link to={"/add"} className='addButton'>Add Employee</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Date of Joining</th>
                        <th>Mobile Number</th>
                        <th>Alternative Mobile</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Designation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.employeeId}>
                            <td>{index + 1}</td>
                            <td>{employee.employeeId}</td>
                            <td>{employee.employeeName}</td>
                            <td>{employee.dateOfJoining}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.alternativeMobile}</td>
                            <td>{employee.email}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.designation}</td>
                            <td className='actionButtons'>
                                <button onClick={() => deleteEmployee(employee.employeeId)}><i className="fa-solid fa-trash"></i></button>
                                <Link to={`/edit/` + employee.employeeId}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
