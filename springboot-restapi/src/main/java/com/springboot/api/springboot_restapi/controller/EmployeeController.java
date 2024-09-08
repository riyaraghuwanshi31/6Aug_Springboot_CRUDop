package com.springboot.api.springboot_restapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springboot.api.springboot_restapi.model.Employee;
import com.springboot.api.springboot_restapi.service.EmployeeService;
// import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
// @CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @PostMapping
    public ResponseEntity<String> createEmployee(@RequestBody Employee employee) {
        return service.addEmployee(employee);
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getEmployees() {
        return service.findAllEmployees();
    }

    @GetMapping("{employeeId}")
    public ResponseEntity<Object> getEmployee(@PathVariable String employeeId) {
        return service.getEmployeeByEmployeeId(employeeId);
    }

    
    @PutMapping("/{employeeId}")
    public ResponseEntity<String> modifyEmployee(@PathVariable String employeeId, @RequestBody Employee employee) {
        employee.setEmployeeId(employeeId);
        return service.updateEmployee(employee);
    }

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String employeeId) {
        return service.deleteEmployee(employeeId);
    }
}
