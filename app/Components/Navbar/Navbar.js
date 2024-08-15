import SideNav from "./SideNav";
import TopNav from "./TopNav";
import './Navbar.css'
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
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
            <TopNav />
            <SideNav />
        </>
    );
}