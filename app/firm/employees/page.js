'use client';
import React from 'react'
import EmployeesList from './employeesList'
import AddEmployee from './addEmployee'
import { useDisclosure } from '@chakra-ui/react';

function Employees() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
        <AddEmployee isOpen={isOpen} onClose={onClose} />
        <EmployeesList onOpen={onOpen} />
    </div>
  )
}

export default Employees