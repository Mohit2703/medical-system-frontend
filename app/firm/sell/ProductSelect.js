import { Box, Button, Card, Container, Flex, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function ProductSelect({ product, setCart, cart }) {
    console.log("Product: ", product);
    const [cartItem, setCartItem] = useState({
        "product": product,
        "quantity": 0,
        "price": 0
    })

    const handleQtyChange = (e) => {
        setCartItem({
            ...cartItem,
            quantity: e.target.value,
            price: e.target.value * product.price
        })
    }

    const addCart = () => {
        setCart([...cart, cartItem])
    }

    return (
        <div>
            <Container>
                <Card className="profileHead_card" my={'15px'}>
                    <Box w="800px" justify={"center"} bg="gray.900" color="white" borderRadius="lg" overflow="hidden">
                        <Flex py={"10px"} justify={"space-between"} px={"30px"} borderBottom={"1px solid #666666"}>
                            <Box textAlign={'start'}>
                                <div>
                                    <Text>Name : {product.name}</Text>
                                </div>
                                <div>
                                    <Text>Brand : {product.brand}</Text>
                                </div>
                                <div>
                                    <Text>Formulation : {product.formulation}</Text>
                                </div>
                                <div>
                                    <Text>GST : {product.gst_rate}</Text>
                                </div>
                                <div>
                                    <Text>MFG_DATE : {product.mfg_date}</Text>
                                </div>
                            </Box>
                            <Box textAlign={'start'}>
                                <div>
                                    <Text>Power : {product.power}</Text>
                                </div>
                                <div>
                                    <Text>Pack Size : {product.pack_size}</Text>
                                </div>
                                <div>
                                    <Text>Price : {product.price}</Text>
                                </div>
                                <div>
                                    <Text>Quantity : {product.quantity}</Text>
                                </div>
                                <div>
                                    <Text>EXP_DATE : {product.exp_date}</Text>
                                </div>
                                <div>
                                    <Text>QR Code : {product.qr_code}</Text>
                                </div>
                            </Box>
                        </Flex>
                        <Flex py={"10px"} justify={"space-between"} px={"30px"} borderBottom={"1px solid #666666"}>
                            <Box>
                                <FormControl as={Flex} isRequired>
                                    <FormLabel>QTY: </FormLabel>
                                    <Input type='name' value={cartItem.quantity} onChange={handleQtyChange} />
                                </FormControl>
                            </Box>
                            <Box>
                                <Text>Price : {cartItem.price}</Text>
                            </Box>
                            <Box>
                                <Button onClick={addCart}>Add To Cart</Button>
                            </Box>
                        </Flex>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}
