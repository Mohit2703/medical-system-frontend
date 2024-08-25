import React, { memo } from 'react';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { APICall } from '@/app/api/api';

const FormField = memo(({ label, name, value, onChange, type = 'text' }) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Input type={type} value={value} onChange={onChange(name)} mb={2} />
  </FormControl>
));

FormField.displayName = 'FormField';

const EditInventory = memo(({ isOpen, onClose, editMed, setEditMed, setRefresh, refresh }) => {
  const handleInputChange = (field) => (e) => {
    const { value } = e.target;
    setEditMed(prev => ({ ...prev, [field]: value }));
  };

  
  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'brand', label: 'Brand' },
    { name: 'formulation', label: 'Formulation' },
    { name: 'power', label: 'Power' },
    { name: 'pack_size', label: 'Pack Size', type: 'number' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'gst_rate', label: 'GST Rate', type: 'number' },
  ];
  const handleSave = () => {
    const editMedUrl = 'medicines/edit_medicine/';
    console.log(editMed);
    APICall('POST', editMed, editMedUrl, true).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
    setRefresh(refresh + 1);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Medicine</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {fields.map(field => (
            <FormField
              key={field.name}
              label={field.label}
              name={field.name}
              value={editMed[field.name]}
              onChange={handleInputChange}
              type={field.type || 'text'}
            />
          ))}
        </ModalBody>
        <ModalFooter>
          <Button mx='3px' onClick={onClose}>Close</Button>
          <Button bgColor='#d97757' color='#f2f2f2' mr={3} mx='3px' onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

EditInventory.displayName = 'EditInventory';

export default EditInventory;