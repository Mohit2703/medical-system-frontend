import { APICall } from '@/app/api/api';
import { Avatar, Box, Button, Card, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { memo, useState } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { useQRCode } from 'next-qrcode';

const FormField = memo(({ label, name, value, onChange, type = 'text' }) => (
    <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input type={type} value={value} onChange={onChange(name)} mb={2} />
    </FormControl>
));

FormField.displayName = 'FormField';

const fields = [
    { name: 'name', label: 'Name' },
    { name: 'brand', label: 'Brand' },
    { name: 'formulation', label: 'Formulation' },
    { name: 'power', label: 'Power' },
    { name: 'images', label: 'Images' },
    { name: 'pack_size', label: 'Pack Size', type: 'number' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'gst_rate', label: 'GST Rate', type: 'number' },
    { name: 'hsn_code', label: 'HSN Code' },
    { name: 'quantity', label: 'Quantity', type: 'number' },
    { name: 'mfg_date', label: 'MFG Date', type: 'date' },
    { name: 'exp_date', label: 'EXP Date', type: 'date' },
    { name: 'batch_number', label: 'Batch Number' },
];

function AddInventory({ setRefresh, refresh }) {
    const { Canvas } = useQRCode();
    const [addMed, setAddMed] = useState({
        name: '',
        brand: '',
        formulation: '',
        power: '',
        images: '',
        pack_size: '',
        price: '',
        gst_rate: '',
        hsn_code: '',
        quantity: '',
        mfg_date: '',
        exp_date: '',
        batch_number: '',
    });

    const [qrCode, setQrCode] = useState('');

    const handleInputChange = (field) => (e) => {
        const { value } = e.target;
        setAddMed(prev => ({ ...prev, [field]: value }));
    };

    const handleAddMed = () => {
        const addMedUrl = 'medicines/add_single_medicine/';
        console.log(addMed);
        APICall('POST', addMed, addMedUrl, true).then((res) => {
            console.log(res);
            setQrCode(res.data.data.qr_code);
        }).catch((err) => {
            console.log(err);
        });
    }

    const closeQRCode = () => {
        setRefresh(refresh + 1);
        onClose();
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div>
            <Card className="profileHead_card" my={'15px'} display={"flex"} justifyContent={"center"}>
                <Box maxW="600px" bg="gray.900" color="white" borderRadius="lg" my={"20px"} border={"1px solid #666666"} onClick={onOpen}>
                    <Icon as={IoMdAddCircleOutline} />
                    Inventory
                </Box>
            </Card>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Medicine</ModalHeader>
                    <ModalCloseButton />
                    {qrCode === '' ? (
                        <>
                            <ModalBody>
                                {fields.map(field => (
                                    <FormField
                                        key={field.name}
                                        label={field.label}
                                        name={field.name}
                                        value={addMed[field.name]}
                                        onChange={handleInputChange}
                                        type={field.type || 'text'}
                                    />
                                ))}
                            </ModalBody>
                            <ModalFooter>
                                <Button mx='3px' onClick={onClose}>Close</Button>
                                <Button bgColor='#d97757' color='#f2f2f2' mr={3} mx='3px' onClick={handleAddMed}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    ) : (
                        <>
                            <ModalBody>
                                <Canvas
                                    text={qrCode}
                                    options={{
                                        errorCorrectionLevel: 'M',
                                        margin: 3,
                                        scale: 4,
                                        width: 200,
                                        color: {
                                            dark: '#0d0d0d',
                                            light: '#ffffff',
                                        },
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button mx='3px' onClick={closeQRCode}>Close</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AddInventory