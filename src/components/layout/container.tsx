import { upperFirst } from 'lodash-es'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TfiClose } from 'react-icons/tfi'
import ReactJson, { ThemeKeys } from 'react-json-view'

import { Button } from '~/components'
import { useCreateTradeIn } from '~/queries'
import { CartStoreItemType } from '~/stores'

const textArt = `\x1b[38;2;50;50;251m
  ██╗   ██╗ █████╗ ██╗  ██╗   ██╗██╗   ██╗██╗   ██╗
  ██║   ██║██╔══██╗██║  ╚██╗ ██╔╝██║   ██║██║   ██║
  ██║   ██║███████║██║   ╚████╔╝ ██║   ██║██║   ██║
  ╚██╗ ██╔╝██╔══██║██║    ╚██╔╝  ██║   ██║██║   ██║
   ╚████╔╝ ██║  ██║███████╗██║   ╚██████╔╝╚██████╔╝
    ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝    ╚═════╝  ╚═════╝ 

  Empowering businesses with seamless electronics trade-in solutions
  https://valyuu.com
  © ${new Date().getFullYear()} Valyuu. All rights reserved.
\x1b[0m`

const defaultFormData: Components.Schemas.V1CreateTradeInInput = {
  email: 'hello@valyuu.com',
  dateOfBirth: '1980-01-01',
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    country: 'NL',
    postalCode: '1234 AB',
    houseNumber: '42',
    addition: 'A',
    street: 'Main Street',
    city: 'Amsterdam',
    phoneAreaCode: '+31',
    phoneNumber: '612345678',
  },
  bankAccount: {
    accountNumber: 'NL39RABO0300065264',
  },
  items: [],
  paymentType: 'BANK_TRANSFER',
}

const phoneAreaCodes = [
  { code: '+31', country: '🇳🇱' },
  { code: '+32', country: '🇧🇪' },
  { code: '+49', country: '🇩🇪' },
  // Add more countries as needed
]

const jsonViewerProps = {
  theme: 'monokai' as ThemeKeys,
  collapsed: 2,
  name: null,
  style: {
    borderRadius: '0.375rem', // This matches the default Tailwind 'rounded' class
    overflow: 'hidden',
  },
}

export const ContainerLayout = () => {
  const [showIframe, setShowIframe] = useState(false)
  const [cartItems, setCartItems] = useState<CartStoreItemType[]>([])
  const formRef = useRef<HTMLFormElement>(null)
  const [paymentType, setPaymentType] = useState('BANK_TRANSFER')
  const [formData, setFormData] = useState<Components.Schemas.V1CreateTradeInInput>(defaultFormData)
  const { mutate: createTradeIn } = useCreateTradeIn()
  const [tradeInResult, setTradeInResult] = useState<Components.Schemas.V1CreateTradeInOutput | {}>({})
  const [activeTab, setActiveTab] = useState('formData')
  // Load cart items and form data from sessionStorage on component mount
  useEffect(() => {
    const storedCartItems = sessionStorage.getItem('cartItems')
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }

    const storedFormData = sessionStorage.getItem('formData')
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData)
      setFormData(parsedFormData)
      setPaymentType(parsedFormData.paymentType)
    } else {
      sessionStorage.setItem('formData', JSON.stringify(defaultFormData))
      setFormData(defaultFormData)
    }
  }, [])

  // Update sessionStorage when cartItems change
  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())

    // Restructure the data to match the original format
    const formattedData: Components.Schemas.V1CreateTradeInInput = {
      email: data.email as string,
      dateOfBirth: data.dateOfBirth as string,
      shippingAddress: {
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        country: data.country as string,
        postalCode: data.postalCode as string,
        houseNumber: data.houseNumber as string,
        addition: data.addition as string,
        street: data.street as string,
        city: data.city as string,
        phoneAreaCode: data.phoneAreaCode as string,
        phoneNumber: data.phoneNumber as string,
      },
      bankAccount:
        data.paymentType === 'BANK_TRANSFER'
          ? {
              accountNumber: data.accountNumber as string,
            }
          : undefined,
      items: cartItems.map((item) => item.data),
      paymentType: data.paymentType as Components.Schemas.SalePaymentType,
    }

    // Log the formatted data to the console
    console.log('Form data submitted:', formattedData)

    createTradeIn(formattedData, {
      onSuccess: (data) => {
        console.log('Trade-In created successfully:', data)
        setTradeInResult(data)
      },
      onError: (error) => {
        console.error('Error creating Trade-In:', error)
        setTradeInResult({ error: error.message })
      },
    })

    // Save form data to sessionStorage
    sessionStorage.setItem('formData', JSON.stringify(formattedData))
  }

  const handleMessage = (event: MessageEvent) => {
    if (event?.data?.eventType === 'valyuuCancelTradeIn') {
      setShowIframe(false)
      console.log(textArt)
      console.log(event.data)
    } else if (event?.data?.eventType === 'valyuuCreateTradeIn') {
      setShowIframe(false)
      console.log(textArt)
      if (event?.data?.data?.length) {
        setCartItems((cart: CartStoreItemType[]) => {
          const updatedCart = [...cart, ...event.data.data]
          sessionStorage.setItem('cartItems', JSON.stringify(updatedCart))
          return updatedCart
        })
      }
      console.log(event.data)
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <main className="relative flex h-screen w-screen items-center justify-center bg-[#4C4C4C] p-6 text-base text-white">
      {showIframe ? (
        <div className="relative h-[40.9375rem] w-[47.5rem] overflow-hidden rounded-3xl bg-white">
          <iframe key={showIframe ? 'show' : 'hide'} src="/" className="size-full bg-transparent" />
          <Button
            size="icon"
            className="group absolute right-7 top-7 z-50 size-8 rounded-sm bg-[#e6f5fd] hover:bg-[#e6f5fd]"
            onClick={() => setShowIframe(false)}
          >
            <TfiClose className="fill-black text-black group-hover:stroke-[0.2px]" size={14} />
          </Button>
        </div>
      ) : (
        <div className="flex max-h-full flex-col gap-8 overflow-y-auto">
          <Button onClick={() => setShowIframe(true)} className="self-center">
            Open Trade-In
          </Button>
          <div className="flex max-w-[918px] gap-8">
            <form ref={formRef} onSubmit={handleSubmit} className="flex gap-8">
              <div className="flex flex-col gap-4">
                <div className="rounded-lg bg-white p-6 text-black">
                  <div className="space-y-4">
                    {/* Email and Date of Birth */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="block">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          defaultValue={formData?.email || 'hello@valyuu.com'}
                          className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="dateOfBirth" className="block">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          defaultValue={formData?.dateOfBirth || '1980-01-01'}
                          className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                        />
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Update all input fields with the new focus styles */}
                        <div className="space-y-1">
                          <label htmlFor="firstName" className="block">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            defaultValue={formData.shippingAddress.firstName}
                            className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="lastName" className="block">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            defaultValue={formData.shippingAddress.lastName}
                            className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="country" className="block">
                            Country
                          </label>
                          <select
                            name="country"
                            defaultValue={formData.shippingAddress.country}
                            className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                          >
                            <option value="NL">Netherlands</option>
                            <option value="BE">Belgium</option>
                            <option value="DE">Germany</option>
                            {/* Add more countries as needed */}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="postalCode" className="block">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            defaultValue={formData.shippingAddress.postalCode}
                            className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="houseNumber" className="block">
                            House Number
                          </label>
                          <input
                            type="text"
                            name="houseNumber"
                            defaultValue={formData.shippingAddress.houseNumber}
                            className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="addition" className="block">
                            Addition
                          </label>
                          <input
                            type="text"
                            name="addition"
                            defaultValue={formData.shippingAddress.addition}
                            className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="street" className="block">
                            Street
                          </label>
                          <input
                            type="text"
                            name="street"
                            defaultValue={formData.shippingAddress.street}
                            className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="city" className="block">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            defaultValue={formData.shippingAddress.city}
                            className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                          />
                        </div>
                        <div className="col-span-2 space-y-1">
                          <label htmlFor="phoneNumber" className="block">
                            Phone Number
                          </label>
                          <div className="flex gap-4">
                            <select
                              name="phoneAreaCode"
                              defaultValue={formData.shippingAddress.phoneAreaCode}
                              className="w-24 flex-none rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                            >
                              {phoneAreaCodes.map((option) => (
                                <option key={option.code} value={option.code}>
                                  {option.country} ({option.code})
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              name="phoneNumber"
                              defaultValue={formData.shippingAddress.phoneNumber}
                              className="flex-1 rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bank Account Number */}
                    <div className="space-y-2">
                      <label htmlFor="accountNumber" className="block">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        defaultValue={formData?.bankAccount?.accountNumber || 'NL39RABO0300065264'}
                        className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300 disabled:bg-gray-100 disabled:text-gray-400"
                        disabled={paymentType !== 'BANK_TRANSFER'}
                      />
                    </div>

                    {/* Payment Type */}
                    <div className="space-y-2">
                      <label className="block">Payment Type</label>
                      <div className="flex gap-4">
                        {['BANK_TRANSFER', 'DONATION', 'PARTNER_WEBHOOK'].map((type) => (
                          <label key={type} className="inline-flex select-none items-center">
                            <input
                              type="radio"
                              name="paymentType"
                              value={type}
                              defaultChecked={type === (formData?.paymentType || 'BANK_TRANSFER')}
                              className="mr-2"
                              onChange={() => setPaymentType(type)}
                            />
                            {upperFirst(type.replace(/_/g, ' ').toLowerCase())}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-96 flex-col rounded-lg bg-white p-6 text-black">
                <h2 className="mb-4 text-xl font-bold">Cart</h2>
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li key={item.id} className="border-b pb-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.display.image}
                            alt={item.display.name}
                            className="h-auto max-w-24 rounded-md object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{item.display.name}</h3>
                            <ul className="mt-1 text-xs text-gray-600">
                              {item.display.attributes.map((attr, index) => (
                                <li key={index}>{attr}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-2 text-right text-lg font-medium">€{item.data.price.toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 text-right text-xl font-bold">
                  Total: €{(cartItems.reduce((sum, item) => sum * 100 + item.data.price * 100, 0) / 100).toFixed(2)}
                </div>
                <div className="mt-auto pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                    disabled={cartItems.length === 0}
                  >
                    Create Trade-In
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* New block for displaying data with tabs */}
          <div className="max-w-[918px] rounded-lg bg-white p-6 text-black">
            <h2 className="mb-4 text-xl font-bold">Application Data</h2>
            <div className="mb-4 flex border-b">
              {['formData', 'cartData', 'tradeInResult'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 font-semibold text-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'formData' ? 'Form Data' : tab === 'cartData' ? 'Cart Data' : 'Trade-In Result'}
                </button>
              ))}
            </div>
            <div className="mt-4">
              {activeTab === 'formData' && (
                <div className="h-[300px] overflow-y-auto">
                  <ReactJson src={formData} {...jsonViewerProps} theme={jsonViewerProps.theme} />
                </div>
              )}
              {activeTab === 'cartData' && (
                <div className="h-[300px] overflow-y-auto">
                  <ReactJson src={cartItems} {...jsonViewerProps} theme={jsonViewerProps.theme} />
                </div>
              )}
              {activeTab === 'tradeInResult' && (
                <div className="h-[300px] overflow-y-auto">
                  <ReactJson src={tradeInResult} {...jsonViewerProps} theme={jsonViewerProps.theme} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
