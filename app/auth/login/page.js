'use client';
import { Button, Card, CardBody, CardHeader, Center, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { APICall } from '@/app/api/api';
import { LOGIN } from '@/app/GlobalRedux/Features/auth/authSlice';

const LoginPage = () => {
    const [login, setLogin] = useState({ email: '', password: '' })

    const handleEmailInputChange = (e) => setLogin({ email: e.target.value, password: login.password })
    const handlePasswordInputChange = (e) => setLogin({ email: login.email, password: e.target.value })

    const [show, setShow] = useState(false)
    const handleShowClick = () => setShow(!show)

    const dispatch = useDispatch();

    const handleLoginClick = async () => {
        console.log("API Login");
        APICall('POST', login, 'users/login_user/', false).then((res) => {
            console.log("ghjkl;");
            const loginData = res;

            if (loginData.status === 201) {
                try {
                    console.log('Login success');
                    console.log(loginData.data.token);
                    console.log(loginData.data.user);
                    const payload = {
                        token: loginData.data.token,
                        user: loginData.data.user,
                    }
                    window.localStorage.setItem('token', loginData.data.token);
                    window.localStorage.setItem('user', JSON.stringify(loginData.data.user));
                    dispatch(LOGIN(payload));
                    window.location.reload();
                } catch (err) {
                    console.log(err);
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <Container>
                <Card>
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
                        <Button bgColor={"#d97757"} color={"#f2f2f2"} size='md' variant='solid' m={2} onClick={handleLoginClick}>
                            Login
                        </Button>
                        <Center>
                            Dont have an account? <Link color='#d97757' href='/auth/register'>Register</Link>
                        </Center>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default LoginPage;
