'use client';
import { Card, CardBody, CardHeader, Center, Container, Heading, Icon } from "@chakra-ui/react";
import { GiShop } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import ShopRegister from "./shopRegister";

const OptionRegisterPage = () => {
    const [role, setRole] = useState('');

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user'));
        console.log(user.role);
        if (user) {
            setRole(user.role);
        }
    }, [])

    return (
        <>
            <Container>
                {role === 'new' ? (
                    <Card>
                        <CardHeader bg={"transparent"}>
                            <Heading as="h1" size="lg">Register User As</Heading>
                        </CardHeader>
                        <CardBody>
                            <Center display={'flex'} spacing={4} templateColumns='repeat(auto-fill, minmax(100px, 2fr))'>
                                <Card mx={8} my={4} p={4} as="button" onClick={() => setRole('shop')}>
                                    <Center display={'inline'} as="button">
                                        <Icon color={'grey.100'} as={GiShop} w={20} h={20} />
                                        <Heading as="h3" size="md" color="#d97757">Shop</Heading>
                                    </Center>
                                </Card>
                                <Card mx={8} my={4} p={4} as="button" onClick={() => setRole('user')}>
                                    <Center display={'inline'}>
                                        <Icon color={'grey.100'} as={FaUserAlt} w={20} h={20} />
                                        <Heading as="h3" size="md" color="#d97757">Employee</Heading>
                                    </Center>
                                </Card>
                            </Center>
                        </CardBody>
                    </Card>
                ) : (
                    <>
                        {role === 'owner' || role === "shop" ? (
                            <ShopRegister role={role} setRole = {setRole} />
                        ) : (
                            <>
                                Employee
                            </>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}

export default OptionRegisterPage;