package com.springboot.api.springboot_restapi.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.springboot.api.springboot_restapi.model.Employee;

public interface EmployeeRepository extends MongoRepository<Employee, String> {

   
}
