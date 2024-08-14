'use client';
import { APICall } from "@/app/api/api";
import { LOGIN } from "@/app/GlobalRedux/Features/auth/authSlice";
// import './login.css';
import { Button, Card, CardBody, CardHeader, Center, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
    const [register, setRegister] = useState({ email: '', password: '', phone: '', name: '' })

    const handleEmailInputChange = (e) => setRegister({ email: e.target.value, password: register.password, phone: register.phone, name: register.name })
    const handlePasswordInputChange = (e) => setRegister({ email: register.email, password: e.target.value, phone: register.phone, name: register.name })
    const handlePhoneInputChange = (e) => setRegister({ email: register.email, password: register.password, phone: e.target.value, name: register.name })
    const handleNameInputChange = (e) => setRegister({ email: register.email, password: register.password, phone: register.phone, name: e.target.value })

    const [show, setShow] = useState(false)
    const handleShowClick = () => setShow(!show)

    const dispatch = useDispatch();

    const handleRegisterClick = async () => {
        console.log("API Register");
        APICall('POST', register, 'users/register_user/', false).then((res) => {
            console.log("ghjkl;");
            const registerData = res;

            if (registerData.status === 201) {
                try {
                    console.log('Register success');
                    console.log(registerData.data.token);
                    console.log(registerData.data.user);
                    const payload = {
                        token: registerData.data.token,
                        user: registerData.data.user,
                    }
                    window.localStorage.setItem('token', registerData.data.token);
                    window.localStorage.setItem('user', JSON.stringify(registerData.data.user));
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
            <Container class="container-auth">
                <Card class="card-auth">
                    <CardHeader bg={"transparent"}>
                        <Heading as="h1" size="lg">Register</Heading>
                    </CardHeader>
                    <CardBody>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' value={register.email} onChange={handleEmailInputChange} mb={2} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Phone</FormLabel>
                            <Input type='phone' value={register.phone} onChange={handlePhoneInputChange} mb={2} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input type='name' value={register.name} onChange={handleNameInputChange} mb={2} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size='md' mb={2}>
                                <Input
                                    pr='4.5rem'
                                    value={register.password}
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
                        <Button bgColor={"#d97757"} color={"#f2f2f2"} size='md' variant='solid' m={2} onClick={handleRegisterClick}>
                            Register
                        </Button>
                        <Center>
                            Do have an account? <Link color='#d97757' href='/auth/login'> Login </Link>
                        </Center>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default RegisterPage;