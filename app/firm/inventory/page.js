'use client';
import React, { useState } from 'react'
import InventoryTable from './InventoryTable'
import EditInventory from './editInventory'
import { useDisclosure } from '@chakra-ui/react';
import AddInventory from './addInventory';

function Inventory() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMed, setEditMed] = useState({});
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
    <AddInventory setRefresh={setRefresh} refresh={refresh} />
    <EditInventory isOpen={isOpen} onClose={onClose} editMed={editMed} setEditMed={setEditMed} setRefresh={setRefresh} refresh={refresh} />
    Inventory
    <InventoryTable onOpen={onOpen} setEditMed={setEditMed} refresh={refresh} />
    </div>
  )
}

export default Inventory