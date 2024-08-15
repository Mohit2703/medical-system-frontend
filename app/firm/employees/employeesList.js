'use client';
import { APICall } from '@/app/api/api'
import { Box, Button, Card, CardBody, CardHeader, Center, Container, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdAddBox } from "react-icons/md";

function EmployeesList({ onOpen }) {
    const [employees, setEmployees] = useState([])
    const columns = [
        { title: 'Name', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Phone', key: 'phone' },
        { title: 'Role', key: 'role' }
    ];

    useEffect(() => {
        const employeesUrl = "users/get_all_shop_staff/"
        APICall("GET", {}, employeesUrl, true).then((res) => {
            setEmployees(res.data.data.staff)
        }).catch((err) => {
            console.log(err.response);
        })
    }, [])
    return (
        <>
            <Container>
                <Card my={'15px'} maxW="800px" minW={"600px"} bg="gray.900" color="white" borderRadius="lg" overflow="hidden" m={"10px"}>
                    <CardHeader bg={"transparent"}>
                        <Flex justify="space-between" align="center" px={"30px"} borderBottom={"1px solid #666666"}>
                            <Box flex="1" />
                            <Heading as="h3" size="lg" py={"10px"} textAlign="center" flex="2">Shop Staff</Heading>
                            <Flex flex="1" justify="flex-end">
                                <Button size="sm"><Icon fontSize={"20px"} as={MdAddBox} onClick={onOpen} /></Button>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex justify="space-between" px="50px" pt="10px" pb="5px">
                            {columns.map(({ title, key }) => (
                                <Box key={key} textAlign="start">
                                    <Box py="4px" borderBottom="1px solid" borderColor="gray.200" mb="2px">
                                        <Heading as="b" fontSize="x-medium">{title}</Heading>
                                    </Box>
                                    {employees?.map((employee, index) => (
                                        <Box py="1px" key={index}>
                                            <Text>{employee[key] || '--------'}</Text>
                                        </Box>
                                    ))}
                                </Box>
                            ))}
                        </Flex>

                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default EmployeesList