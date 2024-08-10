'use client';
import './login.css';
import { Button, Card, CardBody, CardHeader, Center, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";

const LoginPage = () => {
    const [login, setLogin] = useState({ email: '', password: '' })

    const handleEmailInputChange = (e) => setLogin({ email: e.target.value, password: login.password })
    const handlePasswordInputChange = (e) => setLogin({ email: login.email, password: e.target.value })

    const [show, setShow] = useState(false)
    const handleShowClick = () => setShow(!show)


    return (
        <>
            <Container class="container-auth">
                <Card class="card-auth">
                    <CardHeader bg={"transparent"}>
                        <Heading as="h1" size="lg">Login</Heading>
                    </CardHeader>
                    <CardBody>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' value={login.email} onChange={handleEmailInputChange} mb={2} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size='md' mb={2}>
                                <Input
                                    pr='4.5rem'
                                    value={login.password}
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    onChange={handlePasswordInputChange}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button className={'auth-btn'} size='md' variant='solid' m={2}>
                            Login
                        </Button>
                        <Center>
                            Dont have an account? <a href='/auth/register'>Register</a>
                        </Center>
                    </CardBody>
                    {/* </div> */}
                </Card>
            </Container>
        </>
    );
}

export default LoginPage;
