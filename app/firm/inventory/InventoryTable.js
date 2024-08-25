'use client';
import { APICall } from '@/app/api/api';
import { Icon, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";

function InventoryTable({onOpen, setEditMed, refresh}) {
    const columns = [
        { title: 'Images', key: 'images' },
        { title: 'Brand', key: 'brand' },
        { title: 'Name', key: 'name' },
        { title: 'Formulation', key: 'formulation' },
        { title: 'Power', key: 'power' },
        { title: 'Pack Size', key: 'pack_size' },
        { title: 'Price', key: 'price' },
        { title: 'Qty', key: 'quantity' },
    ];

    const [medicines, setMedicines] = useState([])

    useEffect(() => {
        APICall("GET", {}, "medicines/find_medicines/", true).then((res) => {
            console.log(res.data.data)
            setMedicines(res.data.data)
        }).catch((err) => {
            console.log(err.response);
        })
    }, [refresh])

    const editMedicine = (data) => {
        setEditMed(data)
        onOpen()
    }

    return (
        <>
            <TableContainer>
                <Table>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            {columns.map(({ title, key }) => (
                                <Th key={key}>{title}</Th>
                            ))}
                            <Th>
                                Edit
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {medicines.map((medicine, index) => (
                            <Tr key={index}>
                                {columns.map(({ key }) => (
                                    <Td key={key}>
                                        {key === 'images' ? <Image boxSize='30px' src={medicine[key]} alt={key} /> : medicine[key]}
                                    </Td>
                                ))}
                                <Td onClick={() => editMedicine(medicine)}>
                                    <Icon as={FaEdit} />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default InventoryTable