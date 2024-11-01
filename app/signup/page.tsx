'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { sendOTP, verifyOTP } from '@/apiCalls/allApiCalls'
import { message } from 'react-message-popup'
import { avatarOptions } from '@/utils/mobileSignUtils'
import { onSubmitPhone, onSubmitOtp, onSubmitProfile } from '@/utils/mobileSignUtils'


export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('/avatar1.png')
  const [step, setStep] = useState(1)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 py-12 lg:py-24 overflow-hidden relative">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-purple-300/20 to-pink-300/20"
        style={{
          transform: `translate(${mousePosition.x / 100}px, ${mousePosition.y / 100}px)`,
        }}
      />
      <div className="absolute inset-0 backdrop-blur-3xl" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="container relative px-4">
        <motion.div
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col space-y-2 text-center">
            <motion.h1
              className="text-3xl font-bold tracking-tight text-gray-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Create an Account
            </motion.h1>
            <motion.p
              className="text-sm text-gray-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {step === 1 && "Enter your phone number to get started"}
              {step === 3 && "Enter the OTP sent to your Whatsapp number"}
              {step === 2 && "Complete your profile"}
            </motion.p>
          </div>
          <motion.div
            className="grid gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {step === 1 && (
              <form onSubmit={(e) => onSubmitPhone(e, phoneNumber, message, setIsLoading, sendOTP, setStep)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label className="text-gray-700" htmlFor="phone">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="8800800305"
                      type="tel"
                      autoCapitalize="none"
                      autoComplete="tel"
                      autoCorrect="off"
                      disabled={isLoading}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                  <Button disabled={isLoading} className="bg-indigo-600 text-white hover:bg-indigo-700">
                    Send OTP
                  </Button>
                </div>
              </form>
            )}
            {step === 3 && (
              <form onSubmit={(e) => onSubmitOtp(e, setIsLoading, otp, message, verifyOTP, phoneNumber, selectedAvatar, name)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label className="text-gray-700" htmlFor="otp">
                      OTP
                    </Label>
                    <Input
                      id="otp"
                      placeholder="Enter OTP"
                      type="text"
                      disabled={isLoading}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                  <Button disabled={isLoading} className="bg-indigo-600 text-white hover:bg-indigo-700">
                    Verify OTP
                  </Button>
                </div>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={(e) => onSubmitProfile(e, name, setStep, message)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label className="text-gray-700" htmlFor="name">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      type="text"
                      disabled={isLoading}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-gray-700">
                      Choose an Avatar
                    </Label>
                    <RadioGroup
                      value={selectedAvatar}
                      onValueChange={setSelectedAvatar}
                      className="flex justify-between"
                    >
                      {avatarOptions.map((avatar, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <RadioGroupItem
                            value={avatar}
                            id={`avatar-${index}`}
                            className="sr-only"
                          />
                          <Label
                            htmlFor={`avatar-${index}`}
                            className="cursor-pointer"
                          >
                            <Avatar className={`w-16 h-16 border-2 transition-all ${selectedAvatar === avatar ? 'border-indigo-600' : 'border-transparent'
                              }`}>
                              <AvatarImage src={avatar} alt={`Avatar option ${index + 1}`} />
                              <AvatarFallback>Avatar {index + 1}</AvatarFallback>
                            </Avatar>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <Button disabled={isLoading} className="bg-indigo-600 text-white hover:bg-indigo-700">
                    Create Profile
                  </Button>
                </div>
              </form>
            )}
            {step === 1 && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>
                <Button variant="outline" type="button" disabled={isLoading} className="bg-white/50 text-gray-900 border-gray-200 hover:bg-white/80">
                  Google
                </Button>
              </>
            )}
          </motion.div>
          <motion.p
            className="px-8 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            By clicking continue, you agree to our{' '}
            <Link href="" className="underline underline-offset-4 hover:text-gray-900">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="" className="underline underline-offset-4 hover:text-gray-900">
              Privacy Policy
            </Link>
            .
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}