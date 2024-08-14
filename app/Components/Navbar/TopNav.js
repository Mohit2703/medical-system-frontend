// 'use client'

import { Box, Flex, Heading, Link, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { FaMicrophone } from "react-icons/fa";
import { Icon } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function TopNav() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkUserAndRedirect = () => {
            const userString = localStorage.getItem('user');
            if (!userString) {
                router.push('/auth/login');
                return;
            }

            try {
                const user = JSON.parse(userString);
                if (user) {
                    if (user.role === 'new') {
                        router.push('/auth/optionRegister');
                    } else if (user.role === '') {
                        router.push('/auth/login');
                    }
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        };

        // Delay the execution to ensure it runs after component mount
        const timeoutId = setTimeout(checkUserAndRedirect, 0);

        return () => clearTimeout(timeoutId);
    }, [pathname, router]);


    return (
        <>
            <Box py={4} id='topbar-nav'>
                <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
                    <Box>
                        <Link href="/" _hover={{ textDecoration: 'none' }}>
                            <Heading size="md">Appwrite</Heading>
                        </Link>
                    </Box>
                    <Flex align="center">
                        <InputGroup size="md" maxW="600px">
                            <Input
                                pr="4.5rem"
                                type="text"
                                placeholder="Search in Inventory"
                                bg="gray.700"
                                border="none"
                                _focus={{ borderColor: 'gray.600' }}
                            />
                            <InputRightElement width="4.5rem">
                                <Icon as={FaMicrophone} _hover={{ color: 'gray.400', cursor: 'pointer' }} />
                            </InputRightElement>
                        </InputGroup>
                        <Box ml={6}>
                            <Link href="/get-started">
                                <Button id="login-btn">
                                    Login / Signup
                                </Button>
                            </Link>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}