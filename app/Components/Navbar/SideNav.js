import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

const SideLinkItems = [
    { name: 'Dashboard', path: '/firm/dashboard', type: 'dashboard' },
    { name: 'Inventory', path: '/firm/inventory', type: 'inventory' },
    { name: 'Sell', path: '/firm/sell', type: 'sell' },
    { name: 'Purchase', path: '/firm/purchase', type: 'purchase' },
    { name: 'Employees', path: '/firm/employees', type: 'employees' },
    { name: 'Profile', path: '/firm/profile', type: 'profile' },
    { name: 'Settings', path: '/firm/settings', type: 'settings' }
]

export default function SideNav() {
    return (
        <>
            <Box id="sidebar-nav">
                {SideLinkItems.map((link, index) => (
                    <Link key={index} href={link.path} >
                        <Box className={'sidebar-option '}>
                            <Text className='sidebar-option-text'>
                                {link.name}
                            </Text>
                        </Box>
                    </Link>
                ))}
            </Box>
        </>
    );
}