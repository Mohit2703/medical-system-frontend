import QrReader from '@/app/Components/QRReader'
import { Box, Card, Container, Flex, Heading, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaMicrophone, FaCamera } from 'react-icons/fa'

export default function SearchMedicine({ proudct, setProduct }) {
    const [searhOpt, setSearchOpt] = useState('');
    const [qrData, setQrData] = useState('');

    return (
        <div>
            <Container>
                <Card className="profileHead_card" my={'15px'}>
                    <Box w="800px" justify={"center"} bg="gray.900" color="white" borderRadius="lg" overflow="hidden">
                        <Flex py={"10px"} justify={"space-between"} px={"30px"} borderBottom={"1px solid #666666"}>
                            <InputGroup size="md" maxW="600px" mt={"10px"}>
                                <Input
                                    pr="4.5rem"
                                    type="text"
                                    placeholder="Search in Inventory"
                                    bg="gray.700"
                                    border="none"
                                    _focus={{ borderColor: 'gray.600' }}
                                />
                                <InputRightElement width="4.5rem">
                                    <Icon as={FaMicrophone} fontSize={"18px"} mx={"5px"} _hover={{ color: 'gray.400', cursor: 'pointer' }} />
                                    <Icon as={FaCamera} onClick={() => setSearchOpt("qr")} fontSize={"18px"} mx={"5px"} _hover={{ color: 'gray.400', cursor: 'pointer' }} />
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                    {searhOpt === 'qr' && qrData === "" && (
                        <QrReader qrData={qrData} setQrData={setQrData} proudct={proudct} setProduct={setProduct} />
                    )}
                    </Box>
                </Card>
            </Container>
        </div>
    )
}
