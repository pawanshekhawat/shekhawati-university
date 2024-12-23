"use client"
import { useState } from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, LogOut, Search, Globe } from "lucide-react"
import { logOut } from "@/apiCalls/allApiCalls";
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import { getuser } from '@/apiCalls/allApiCalls';
import { setUserdetails } from '../redux/allSlice';
import { useEffect } from 'react';


const Header = () => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const updateuser = useSelector((data) => data.Slice.data);
    const user = useSelector((data) => data.userSlice.data);
    const dispatch = useDispatch();
    const { picture } = user;

    const handlelogOut = async () => {
        const ans = await logOut();
        if (ans?.success) {
            window.location.reload();
        }
    }

    useEffect(() => {
        (async () => {
            const res = await getuser();
            if (res?.success) {
                dispatch(setUserdetails(res));
            } else {
                dispatch(setUserdetails({ ...user, picture: null }));
            }
        })();
    }, [updateuser]);

    return (
        <header className="sticky top-0 z-50 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <GraduationCap className="h-10 w-10 text-indigo-600 group-hover:text-pink-500 transition-colors" />
                        </motion.div>
                        <span className="md:text-2xl text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                            Shekhawati Hub
                        </span>
                    </Link>
                    <div className='flex justify-center items-center'>
                        <div className="items-center gap-4 hidden md:flex mr-7">
                            <div className=" rounded-md bg-gradient-to-r from-indigo-600 to-pink-500 p-0.5">
                                <Link href="/explore">
                                    <button className="flex gap-1 bg-white text-purple-800 font-bold py-2 px-4 rounded">Explore <Globe /> </button>
                                </Link>
                            </div>
                            <div>
                                <div>
                                    <Link href="/find">
                                        <Search
                                            data-tooltip-target="tooltip-default"
                                            onMouseEnter={() => setTooltipVisible(true)}
                                            onMouseLeave={() => setTooltipVisible(false)}
                                            className="w-7 h-7 text-pink-500 cursor-pointer"
                                        />
                                    </Link>
                                    <div
                                        id="tooltip-default"
                                        role="tooltip"
                                        className={`absolute my-2 z-10 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700 ${isTooltipVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
                                            }`}
                                    >
                                        Find students by name
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {picture && picture?.length > 9 ? (
                                <div className="relative group">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Avatar className="h-10 w-10 border-2 border-indigo-300 group-hover:border-pink-300 transition-colors cursor-pointer">
                                            <AvatarImage src={picture} alt="User" />
                                            <AvatarFallback></AvatarFallback>
                                        </Avatar>
                                    </motion.div>
                                    <motion.div
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Button
                                            variant="ghost"
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                                            onClick={() => handlelogOut()}
                                        >
                                            <LogOut className="h-4 w-4 mr-2 inline" />
                                            Logout
                                        </Button>
                                    </motion.div>
                                </div>
                            ) : (
                                picture != "Loading" && <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <>
                                        <div className="flex items-center">
                                            <Button variant="outline"><Link href={"/signup"}> Log In</Link></Button>
                                        </div>
                                    </>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header