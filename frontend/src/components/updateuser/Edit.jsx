import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

    const initialEmployeeState = {
        employeeId: "",
        employeeName: "",
        dateOfJoining: "",
        mobile: "",
        alternativeMobile: "",
        email: "",
        salary: "",
        designation: ""
    };    

    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(initialEmployeeState);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
        console.log(employee);
    }; 

    const formatDateForServer = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        axios.get(`https://6augspringbootcrudop-production.up.railway.app/employee/${id}`)
            .then((response) => {
                setEmployee(response.data); 
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(`Error: ${error.response.status} - ${error.response.data}`, { position: "top-right" });
                } else {
                    toast.error("An error occurred while fetching the employee", { position: "top-right" });
                }
                console.log(error);
            });
    }, [id]);  
 
    const validateMobile = (mobile) => {
        const mobileRegex = /^[9876]\d{9}$/;
        return mobileRegex.test(mobile);
    }; 

    const submitForm = async (e) => {
        e.preventDefault();
        if (!validateMobile(employee.mobile)) {
            toast.error("Mobile number must start with 9, 8, or 7 and contain exactly 10 digits.");
            console.log("Bad request (400 Bad Request): Mobile number must start with 9, 8, or 7 and contain exactly 10 digits.");
            return;
        }

        const formattedDate = formatDateForServer(employee.dateOfJoining);
        const employeeWithFormattedDate = { ...employee, dateOfJoining: formattedDate };

        await axios.put(`https://6augspringbootcrudop-production.up.railway.app/employee/${id}`, employeeWithFormattedDate)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" });
                console.log(`Request succeeded (200 OK)`);
                navigate("/");
            })
            .catch(error => {
                if (error.response) {
                    const errorMessage = error.response.data.msg || error.response.data.error || 'An error occurred';
                    toast.error(`Error: ${error.response.status} - ${errorMessage}`, { position: "top-right" });
                } else {
                    toast.error("An error occurred while updating the employee", { position: "top-right" });
                }
                console.log(error);
            });
    };

    return (
        <div className='addEmployee'>
            <Link to={"/"}>Back</Link>

            <h3>Update Employee Data</h3>
            <form className='addEmployeeForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="employeeId">Employee ID</label>
                    <input type="text" value={employee.employeeId} onChange={inputChangeHandler} id="employeeId" name="employeeId" autoComplete='off' placeholder='Employee ID' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="employeeName">Employee Name</label>
                    <input type="text" value={employee.employeeName} onChange={inputChangeHandler} id="employeeName" name="employeeName" autoComplete='off' placeholder='Employee Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="dateOfJoining">Date of Joining</label>
                    <input type="date" value={employee.dateOfJoining} onChange={inputChangeHandler} id="dateOfJoining" name="dateOfJoining" autoComplete='off' placeholder='Date of Joining' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input type="text" value={employee.mobile} onChange={inputChangeHandler} id="mobile" name="mobile" autoComplete='off' maxLength="10" minLength="10" placeholder='Mobile Number' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="alternativeMobile">Alternative Mobile</label>
                    <input type="text" value={employee.alternativeMobile} onChange={inputChangeHandler} id="alternativeMobile" name="alternativeMobile" autoComplete='off' placeholder='Alternative Mobile' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={employee.email} onChange={inputChangeHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
                </div> 
                <div className="inputGroup">
                    <label htmlFor="salary">Salary</label>
                    <input type="text" value={employee.salary} onChange={inputChangeHandler} id="salary" name="salary" autoComplete='off' placeholder='Salary' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="designation">Designation</label>
                    <input type="text" value={employee.designation} onChange={inputChangeHandler} id="designation" name="designation" autoComplete='off' placeholder='Designation' />
                </div>          
                <div className="inputGroup">
                    <button type="submit">UPDATE EMPLOYEE</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
