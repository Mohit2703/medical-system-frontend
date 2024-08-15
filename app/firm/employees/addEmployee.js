'use client';
import { APICall } from '@/app/api/api';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'

function AddEmployee({ isOpen, onClose }) {
    const [addEmployee, setAddEmployee] = useState({ email: '', phone: '', name: '' })
    const handleEmailInputChange = (e) => setAddEmployee({ email: e.target.value, phone: addEmployee.phone, name: addEmployee.name })
    const handlePhoneInputChange = (e) => setAddEmployee({ email: addEmployee.email, phone: e.target.value, name: addEmployee.name })
    const handleNameInputChange = (e) => setAddEmployee({ email: addEmployee.email, phone: addEmployee.phone, name: e.target.value })

    const handleAddEmployee = () => {
        const addEmployeeUrl = "users/send_invite_staff/"

        console.log(addEmployee);

        APICall('POST', addEmployee, addEmployeeUrl, true).then((res) => {
            console.log(res)
            onClose()
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Staff</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' value={addEmployee.email} onChange={handleEmailInputChange} mb={2} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Phone</FormLabel>
                            <Input type='phone' value={addEmployee.phone} onChange={handlePhoneInputChange} mb={2} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input type='name' value={addEmployee.name} onChange={handleNameInputChange} mb={2} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mx={'3px'} onClick={onClose}>Close</Button>
                        <Button bgColor='#d97757' color={'#f2f2f2'} mr={3} mx={'3px'} onClick={handleAddEmployee}>
                            Add Staff
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddEmployee