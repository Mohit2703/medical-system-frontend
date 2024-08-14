import { APICall } from "@/app/api/api"
import { LOGIN } from "@/app/GlobalRedux/Features/auth/authSlice"
import { Button, Card, CardBody, CardHeader, Center, FormControl, FormLabel, Heading, InputGroup, InputRightElement, Text, Input } from "@chakra-ui/react"
import Link from "next/link"
import { useState } from "react"
import { useDispatch } from "react-redux"

const ShopRegister = ({ role, setRole }) => {
    const [shopData, setShopData] = useState({ shop_name: '', address1: '', address2: '', city: '', state: '', email: '', phone: '', gstin: '', pan: '', logo: '' })
    const [bankData, setBankData] = useState({ bank_name: '', account_number: '', ifsc: '', branch: '' })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShopData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleInputChangeBankData = (e) => {
        const { name, value } = e.target;
        setBankData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const dispatch = useDispatch();

    const handleShopRegisterClick = async () => {
        const shopDataKeys = {
            shop_name: shopData.shop_name,
            address: shopData.address1 + ', ' + shopData.address2 + ', ' + shopData.city + ', ' + shopData.state,
            email: shopData.email,
            phone: shopData.phone,
            gstin: shopData.gstin,
            pan: shopData.pan,
            logo: shopData.logo,
        }

        console.log(shopDataKeys);

        APICall('POST', shopDataKeys, 'users/create_shop/', true).then((res) => {
            const shopData = res;

            if (shopData.status === 201) {
                try {
                    console.log('Shop Register success');
                    console.log(shopData.data.token);
                    console.log(shopData.data.user);
                    const payload = {
                        token: shopData.data.token,
                        user: shopData.data.user,
                    }
                    window.localStorage.setItem('token', shopData.data.token);
                    window.localStorage.setItem('user', JSON.stringify(shopData.data.user));
                    dispatch(LOGIN(payload));
                    // window.location.reload();
                } catch (err) {
                    console.log(err);
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleBankRegisterClick = async () => {
        const bankDataKeys = {
            bank_name: bankData.bank_name,
            account_number: bankData.account_number,
            ifsc: bankData.ifsc,
            branch: bankData.branch,
        }

        console.log(bankDataKeys);

        APICall('POST', bankDataKeys, 'users/add_shop_account_details/', true).then((res) => {
            const bankData = res;

            if (bankData.status === 201) {
                console.log(bankData);
                console.log('Bank Register success');
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <>
            {role === 'shop' ? (
                <Card>
                    <CardHeader bg={"transparent"}>
                        <Heading as="h1" size="lg">Shop Registration</Heading>
                    </CardHeader>
                    <CardBody>
                        {Object.entries(shopData).map(([key, value]) => (
                            <FormControl key={key} isRequired={key !== 'address2' || key !== 'pan'}>
                                <FormLabel>{key.replace('_', ' ').toUpperCase()}</FormLabel>
                                <Input
                                    type={key === 'email' ? 'email' : 'text'}
                                    name={key}
                                    value={value}
                                    onChange={handleInputChange}
                                    mb={2}
                                />
                            </FormControl>
                        ))}
                        <Button bgColor={"#d97757"} color={"#f2f2f2"} size='md' variant='solid' m={2} onClick={handleShopRegisterClick}>
                            Register
                        </Button>
                    </CardBody>
                </Card>
            ) : (
                <Card>
                    <CardHeader bg={"transparent"}>
                        <Heading as="h1" size="lg">Bank Account Details</Heading>
                    </CardHeader>
                    <CardBody>
                        {Object.entries(bankData).map(([key, value]) => (
                            <FormControl key={key} isRequired={key !== 'branch'}>
                                <FormLabel>{key.replace('_', ' ').toUpperCase()}</FormLabel>
                                <Input
                                    type={key === 'account_number' ? 'number' : 'text'}
                                    name={key}
                                    value={value}
                                    onChange={handleInputChangeBankData}
                                    mb={2}
                                />
                            </FormControl>
                        ))}
                        <Center>
                            <Button bgColor={"#808080"} color={"#f2f2f2"} size='md' variant='solid' m={2} onClick={() => window.location.reload()}>
                                Skip
                            </Button>
                            <Button bgColor={"#d97757"} color={"#f2f2f2"} size='md' variant='solid' m={2} onClick={handleBankRegisterClick}>
                                Register
                            </Button>
                        </Center>
                    </CardBody>
                </Card>
            )}
        </>
    )
}

export default ShopRegister;