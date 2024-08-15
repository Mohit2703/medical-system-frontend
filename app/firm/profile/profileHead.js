'use client';
import { Card, Center, Container, Heading, background } from "@chakra-ui/react";
import './profileHead.css';
import { Box, Flex, Image, Text, Button, VStack, HStack, Badge, Avatar, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { APICall } from "@/app/api/api";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
//   import { EditIcon, CheckIcon } from "@chakra-ui/icons";
const ProfileHead = () => {
    const [shopBasic, setShopBasic] = useState({})
    const [shopBank, setShopBank] = useState({})
    useEffect(() => {
        const shopBasicUrl = "users/get_shop_details/"
        const shopBankUrl = "users/get_shop_account_details/"
        APICall("GET", {}, shopBasicUrl, true).then((res) => {
            setShopBasic(res.data)
        }).catch((err) => {
            console.log(err.response);
        })

        APICall("GET", {}, shopBankUrl, true).then((res) => {
            setShopBank(res.data)
        }).catch((err) => {
            console.log(err.response);
        })

    }, [])

    return (
        <>
            <Container>
                <Card className="profileHead_card" my={'15px'}>
                    <Box maxW="800px" bg="gray.900" color="white" borderRadius="lg" overflow="hidden">
                        <Box position="relative">
                            <Box bg={`url("https://media.licdn.com/dms/image/D563DAQGT2cIISadIlw/image-scale_191_1128/0/1714387548075/d_e_shaw_india_private_limited_cover?e=1724310000&v=beta&t=0g38iu7yO5WGiYC7cqqwr6M01bfCy1cppmqYXo7GTPU")`} h="200px" position="absolute" top={0} right={0} left="0%" />
                            <Flex justify="space-between" pt={"120px"} px={30} position="relative">
                                <Avatar
                                    size="xl"
                                    width={"150px"}
                                    height={"150px"}
                                    src="https://media.licdn.com/dms/image/v2/D4D35AQGkKL9ODmEbZA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1713079175777?e=1724313600&v=beta&t=0JfJY_qPB_b2oevIK-sRAq07AX9uxvilUXdbeTp3Jk0"
                                    border="1px solid"
                                    borderColor="green.500"
                                />
                            </Flex>
                            <Flex justify={"space-between"} px={'50px'} pt={'10px'} pb={'5px'}>
                                <Box textAlign={'start'}>
                                    <Box py={'2px'}>
                                        <Text as='b' fontSize={'x-large'}>{shopBasic.name}</Text>
                                    </Box>
                                    <Box py={'1px'}>
                                        <Text >Medical Store</Text>
                                    </Box>
                                    <Box py={'1px'}>
                                        <Text ><Icon as={FaShop} /> : {shopBasic.address}</Text>
                                    </Box >
                                </Box>
                                <Box textAlign={'start'}>
                                    <div>
                                        <Text><Icon as={IoIosMail} /> : {shopBasic.email}</Text>
                                    </div>
                                    <div>
                                        <Text><Icon as={FaPhoneAlt} /> : {shopBasic.phone}</Text>
                                    </div>
                                    <div>
                                        <Text>GST: {shopBasic.gstin}</Text>
                                    </div>
                                    <div>
                                        <Text>PAN: {shopBasic.pan === "" ? "------" : shopBasic.pan}</Text>
                                    </div>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Card>

                <Card className="profileHead_card" my={'15px'}>
                    <Box maxW="800px" bg="gray.900" color="white" borderRadius="lg" overflow="hidden" m={"10px"}>
                        <Flex justify={"space-between"} px={"30px"} borderBottom={"1px solid #666666"}>
                            <Heading as="h3" size="lg" py={"10px"}>Bank Details</Heading>
                            <Center>
                                <Button size="sm"><Icon fontSize={"20px"} as={MdModeEdit} /></Button>
                            </Center>
                        </Flex>
                        <Flex justify={"space-between"} px={'50px'} pt={'10px'} pb={'5px'}>
                            <Box textAlign={'start'}>
                                <Box py={'2px'}>
                                    <Text>Bank Name: {!shopBank.bank_name || shopBank.bank_name === '' ? "----------" : shopBank.bank_name}</Text>
                                </Box>
                                <Box py={'1px'}>
                                    <Text>A/c No.: {!shopBank.account_number || shopBank.account_number === '' ? "----------" : shopBank.account_number}</Text>
                                </Box>
                                <Box py={'1px'}>
                                    <Text>IFSC: {!shopBank.ifsc || shopBank.ifsc === '' ? "----------" : shopBank.ifsc}</Text>
                                </Box >
                                <Box py={'1px'}>
                                    <Text>Branch: {!shopBank.branch || shopBank.branch === '' ? "----------" : shopBank.branch}</Text>
                                </Box >
                                <Box py={'1px'}>
                                    <Text >UPI ID: {!shopBank.upiId || shopBank.upiId === '' ? "----------" : shopBank.upiId}</Text>
                                </Box >
                            </Box>
                        </Flex>
                    </Box>
                </Card>
            </Container>
        </>
    );
}

export default ProfileHead;