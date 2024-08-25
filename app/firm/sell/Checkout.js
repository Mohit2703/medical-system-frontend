import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { Box, Button, Card, Container, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { APICall } from '@/app/api/api';

export default function Checkout({cart, setCart}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cust, setCust] = useState({name: '', phone: '', email: '', address: '', gstin: '', pan: ''});
    const [payment, setPayment] = useState({mode: '', amount: 0, description: ''});
    const [checkout, SetCheckout] = useState('');

    useEffect(() => {
        let total = 0;
        cart.forEach((product) => {
            total += product.price;
        });
        setPayment({...payment, amount: total});
    }, [cart]);

    const generateBill = () => {
        console.log("Customer: ", cust);
        console.log("Payment: ", payment);
        console.log("Cart: ", cart);

        // API Call to generate bill
        let body = {
            "customer": cust,
            "payment": payment,
            "cart": cart,
            "total_price": payment.amount,
            "total_tax": 0,
            "total_discount": 0,
        } 

        console.log("Body: ", body);
        const url = 'medicines/create_generate_bill/';

        APICall("POST", body, url, true).then((res) => {
            if (res.status === 201) {
                console.log(res.data.data);
                setCart([]);
                setCust({name: '', phone: '', email: '', address: '', gstin: '', pan: ''});
                setPayment({mode: '', amount: 0, description: ''});
                SetCheckout('');
                alert("Bill generated");
            } else {
                alert("Bill not generated");
            }
        });
        SetCheckout('');
        onClose();
    }

    return (
        <div className='checkout'>
            <Container>
                <Card className="profileHead_card" my={'15px'}>
                    <Box w="800px" justify={"center"} bg="gray.900" color="white" borderRadius="lg" overflow="hidden">
                        <Flex py={"10px"} justify={"space-between"} px={"30px"} borderBottom={"1px solid #666666"}>
                            <Button onClick={onOpen}>
                                Checkout
                            </Button>
                        </Flex>
                    </Box>
                </Card>
            </Container>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {checkout === '' ? 'Checkout' : (checkout === 'customer' ? 'Customer Details' : 'Payment')}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    {checkout === '' ? (
                        <>
                        {cart.length > 0 && cart.map((product, index) => (
                            <Flex key={index} py={"10px"} justify={"space-between"} px={"30px"} borderBottom={"1px solid #666666"}>
                                <Box textAlign={'start'}>
                                        <Text>Name: {product.product.name}; Brand: {product.product.brand}; Formulation: {product.product.formulation}; Power: {product.product.power}</Text>
                                </Box>
                                <Box textAlign={'start'}>
                                    <Text>QTY: {product.quantity}; GST: {product.product.gst_rate}; Price: {product.price}</Text>
                                </Box>
                            </Flex>
                        ))}
                        </>
                    ) : (checkout === 'customer' ? (
                        <>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input type="text" value={cust.name} onChange={(e) => setCust({...cust, name: e.target.value})} />
                        </FormControl>
                        <FormControl id="phone">
                            <FormLabel>Phone</FormLabel>
                            <Input type="text" value={cust.phone} onChange={(e) => setCust({...cust, phone: e.target.value})} />
                        </FormControl>
                        <FormControl id="address">
                            <FormLabel>Address</FormLabel>
                            <Input type="text" value={cust.address} onChange={(e) => setCust({...cust, address: e.target.value})} />
                        </FormControl>
                        </>
                    ) : (
                        <>
                        <FormControl id="mode">
                            <FormLabel>Mode</FormLabel>
                            <Input type="text" value={payment.mode} onChange={(e) => setPayment({...payment, mode: e.target.value})} />
                        </FormControl>
                        <FormControl id="amount">
                            <FormLabel>Amount</FormLabel>
                            <Input type="number" value={payment.amount}/>
                        </FormControl>
                        <FormControl id="description">
                            <FormLabel>Description</FormLabel>
                            <Input type="text" value={payment.description}  onChange={(e) => setPayment({...payment, description: e.target.value})} />
                        </FormControl>
                        </>
                    ))}
                    </ModalBody>

                    <ModalFooter>
                        <Button mx={'3px'} onClick={onClose}>Close</Button>
                        {checkout === '' ? (
                            <Button bgColor='#d97757' color={'#f2f2f2'} mr={3} mx={'3px'} onClick={() => SetCheckout('customer')}>
                                Next
                            </Button>
                        ) : (checkout === 'customer' ? (
                            <Button bgColor='#d97757' color={'#f2f2f2'} mr={3} mx={'3px'} onClick={() => SetCheckout('payment')}>
                                Next
                            </Button>
                        ) : (
                            <Button bgColor='#d97757' color={'#f2f2f2'} mr={3} mx={'3px'} onClick={generateBill}>
                                Generate Bill
                            </Button>
                        ))}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
