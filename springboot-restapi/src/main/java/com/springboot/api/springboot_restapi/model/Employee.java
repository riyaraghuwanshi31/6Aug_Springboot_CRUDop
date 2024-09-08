package com.springboot.api.springboot_restapi.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "employees")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    private String employeeId;
    private String employeeName;
    private LocalDate dateOfJoining;
    private String mobile;
    private String email;
    private double salary;
    private String designation;
    private String alternativeMobile;
}  