import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {
  const employeeData = {

    employeeName: "",
    dateOfJoining: "",
    mobile: "",
    email: "",
    salary: "",
    designation: "",
    alternativeMobile: ""
  };

  const [employee, setEmployee] = useState(employeeData);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[9876]\d{9}$/;
    return mobileRegex.test(mobile);
  };



  const formatDateForServer = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateMobile(employee.mobile) || !validateMobile(employee.alternativeMobile)) {
      toast.error("Mobile number must start with 9, 8, or 7 and contain exactly 10 digits.");
      console.log("Bad request (400 Bad Request): Mobile number must start with 9, 8, or 7 and contain exactly 10 digits.");
      return;
    }

    const formattedDate = formatDateForServer(employee.dateOfJoining);
    const employeeWithFormattedDate = { ...employee, dateOfJoining: formattedDate };

    try {

      const response = await axios.post("https://6augspringbootcrudop-production.up.railway.app/employee", employeeWithFormattedDate);
      toast.success(response.data.msg, { position: "top-right" });
      console.log(`Request succeeded (201 Created)`);
      navigate("/");
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg || error.response.data.error || 'An error occurred';
        toast.error(`Error: ${error.response.status} - ${errorMessage}`, { position: "top-right" });
        console.log(`Error: ${error.response.status} - ${errorMessage}`);
      } else {
        toast.error("An error occurred while creating the employee record", { position: "top-right" });

      }
    }
  };

  return (
    <div className='addEmployee'>
      <Link to={"/"}>Back</Link>
      <h3>Add New Employee</h3>
      <form className='addEmployeeForm' onSubmit={submitForm}>

        <div className="inputGroup">
          <label htmlFor="employeeName">Employee Name</label>
          <input type="text" onChange={inputHandler} id="employeeName" name="employeeName" autoComplete='off' placeholder='Employee Name' />
        </div>
        <div className="inputGroup">
          <label htmlFor="dateOfJoining">Date of Joining</label>
          <input type="date" onChange={inputHandler} id="dateOfJoining" name="dateOfJoining" autoComplete='off' placeholder='Date of Joining' />
        </div>
        <div className="inputGroup">
          <label htmlFor="mobile">Mobile no.</label>
          <input type="text" onChange={inputHandler} id="mobile" name="mobile" autoComplete='off' maxLength="10" minLength="10" placeholder='Mobile number' />
        </div>
        <div className="inputGroup">
          <label htmlFor="alternativeMobile">Alternative Mobile no.</label>
          <input type="text" onChange={inputHandler} id="alternativeMobile" name="alternativeMobile" autoComplete='off' maxLength="10" minLength="10" placeholder='Alternative Mobile number' />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
        </div>
        <div className="inputGroup">
          <label htmlFor="salary">Salary</label>
          <input type="text" onChange={inputHandler} id="salary" name="salary" autoComplete='off' placeholder='Salary' />
        </div>
        <div className="inputGroup">
          <label htmlFor="designation">Designation</label>
          <input type="text" onChange={inputHandler} id="designation" name="designation" autoComplete='off' placeholder='Designation' />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD EMPLOYEE</button>
        </div>
      </form>
    </div>
  );
};

export default Add;