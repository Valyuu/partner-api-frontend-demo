import 'react-toastify/dist/ReactToastify.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { format, isAfter, isBefore, subYears } from 'date-fns'
import devtoolsDetect from 'devtools-detect'
import { omit, upperFirst } from 'lodash-es'
import { postcodeValidator } from 'postcode-validator'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TfiClose } from 'react-icons/tfi'
import ReactJson, { ThemeKeys } from 'react-json-view'
import { toast, ToastContainer } from 'react-toastify'
import { z } from 'zod'

import { Button } from '~/components'
import { useCreateTradeIn } from '~/queries'
import { CartStoreItemType } from '~/stores'
import { addMoney } from '~/utils'

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

const defaultFormData: Omit<Components.Schemas.V1CreateTradeInInput, 'items'> = {
  email: 'user@example.com',
  dateOfBirth: '1980-01-01',
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    country: 'NL',
    postalCode: '1011 AA',
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

// Define the Zod schema
const formSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    dateOfBirth: z.string().refine(
      (value) => {
        const date = new Date(value)
        const eighteenYearsAgo = subYears(new Date(), 18)
        const oldestAllowedDate = new Date('1920-01-01')
        return isAfter(date, oldestAllowedDate) && isBefore(date, eighteenYearsAgo)
      },
      { message: 'Must be at least 18 years old and a valid date' }
    ),
    shippingAddress: z.object({
      firstName: z.string().min(1, 'First Name is required').max(30, 'First Name must be 30 characters or less'),
      lastName: z.string().min(1, 'Last Name is required').max(30, 'Last Name must be 30 characters or less'),
      country: z.string().refine((value) => ['NL', 'BE', 'DE'].includes(value), {
        message: "Country must be either 'NL', 'BE', or 'DE'",
      }),
      postalCode: z.string(),
      houseNumber: z
        .string()
        .min(1, 'House Number is required')
        .refine((value) => /\d/.test(value), { message: 'House number must contain at least one digit' }),
      addition: z.string().optional(),
      street: z.string().min(3, 'Street must be at least 3 characters long'),
      city: z.string().min(1, 'City is required'),
      phoneAreaCode: z.string(),
      phoneNumber: z.string().min(4).max(15).regex(/^\d+$/, 'Phone Number must contain only digits'),
    }),
    bankAccount: z.object({
      accountNumber: z
        .string()
        .refine((value) => /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/.test(value.replace(/\s/g, '')), {
          message: 'Invalid IBAN number',
        }),
    }),
    paymentType: z.enum(['BANK_TRANSFER', 'DONATION', 'PARTNER_WEBHOOK']),
    sendCustomerEmail: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const postalCode = data.shippingAddress.postalCode
      const country = data.shippingAddress.country
      if (!country) {
        return true
      }
      return postcodeValidator(postalCode, country)
    },
    { message: 'Invalid postal code for the selected country', path: ['shippingAddress.postalCode'] }
  )
  .refine(
    (data) => {
      const fullName = `${data.shippingAddress.firstName} ${data.shippingAddress.lastName}`
      return fullName.length <= 35
    },
    { message: 'Combined name length must not exceed 35 characters', path: ['shippingAddress.firstName'] }
  )
  .refine(
    (data) => {
      const houseNumberWithAddition = `${data.shippingAddress.houseNumber}${data.shippingAddress.addition || ''}`
      return houseNumberWithAddition.length <= 8
    },
    {
      message: 'House number (including addition if present) must not exceed 8 characters',
      path: ['shippingAddress.houseNumber'],
    }
  )

type FormSchema = z.infer<typeof formSchema>

export const ContainerLayout = () => {
  const [showIframe, setShowIframe] = useState(false)
  const [cartItems, setCartItems] = useState<CartStoreItemType[]>([])
  const { control, handleSubmit, setValue, watch } = useForm<FormSchema>({
    defaultValues: defaultFormData,
    resolver: zodResolver(formSchema),
    mode: 'onChange', // Change this from 'onBlur' to 'onChange'
  })
  const { mutate: createTradeIn } = useCreateTradeIn()
  const [tradeInResult, setTradeInResult] = useState<Components.Schemas.V1CreateTradeInOutput | {}>({})
  const [activeTab, setActiveTab] = useState<'formData' | 'cartData' | 'tradeInResult'>('formData')

  // Add this effect to watch for form changes
  useEffect(() => {
    const subscription = watch((_, { name, type }) => {
      if (name && type === 'change') {
        setActiveTab('formData')
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  // Load cart items and form data from sessionStorage on component mount
  useEffect(() => {
    const storedCartItems = sessionStorage.getItem('cartItems')
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }

    const storedFormData = sessionStorage.getItem('formData')
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData)
      Object.keys(parsedFormData).forEach((key) => {
        if (typeof parsedFormData[key] === 'object' && parsedFormData[key] !== null) {
          Object.keys(parsedFormData[key]).forEach((nestedKey) => {
            setValue(`${key}.${nestedKey}` as any, parsedFormData[key][nestedKey])
          })
        } else {
          setValue(key as any, parsedFormData[key])
        }
      })
    } else {
      sessionStorage.setItem('formData', JSON.stringify(defaultFormData))
    }
  }, [setValue])

  // Update sessionStorage when cartItems change
  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const onSubmit = (data: Omit<Components.Schemas.V1CreateTradeInInput, 'items'>) => {
    console.log('Form data submitted:', data)

    createTradeIn(
      {
        ...(data.paymentType === 'BANK_TRANSFER' ? data : omit(data, 'bankAccount')),
        items: cartItems.map((item) => item.data),
      },
      {
        onSuccess: (result) => {
          console.log('Trade-In created successfully:', result)
          setTradeInResult(result)
          toast.success('Trade-In created successfully!')
          setActiveTab('tradeInResult')
        },
        onError: (error) => {
          console.error('Error creating Trade-In:', error)
          setTradeInResult({ error })
          toast.error(`Error creating Trade-In: ${error.message}`)
          setActiveTab('tradeInResult')
        },
      }
    )

    // Save form data to sessionStorage
    sessionStorage.setItem('formData', JSON.stringify(data))
  }

  const handleMessage = (event: MessageEvent) => {
    if (event?.data?.eventType === 'valyuuCancelTradeIn') {
      setShowIframe(false)
      console.log(event.data)
    } else if (event?.data?.eventType === 'valyuuCreateTradeIn') {
      setShowIframe(false)
      if (event?.data?.data?.length) {
        setCartItems((cart: CartStoreItemType[]) => {
          const updatedCart = [...cart, ...event.data.data]
          sessionStorage.setItem('cartItems', JSON.stringify(updatedCart))
          return updatedCart
        })
        toast.success('Items added to cart successfully!')
        setActiveTab('cartData')
      }
      console.log(event.data)
    }
  }

  const handleDevtoolsChange = () => {
    if (devtoolsDetect.isOpen) {
      console.clear()
      console.log(textArt)
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('message', handleMessage)
    window.addEventListener('devtoolschange', handleDevtoolsChange)
    return () => {
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('devtoolschange', handleDevtoolsChange)
    }
  }, [])

  const deleteCartItem = (itemId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId)
      sessionStorage.setItem('cartItems', JSON.stringify(updatedItems))
      return updatedItems
    })
    toast.success('Item removed from cart')
  }

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
        <div className="flex max-h-full w-[54rem] flex-col gap-8 overflow-y-auto">
          <Button onClick={() => setShowIframe(true)} className="self-center">
            Open Trade-In
          </Button>
          <div className="flex w-full gap-8">
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-8">
              <div className="flex w-[30rem] flex-none flex-col gap-4">
                <div className="rounded-lg bg-white p-6 text-black">
                  <h2 className="mb-4 text-xl font-bold">Customer Info</h2>
                  <div className="space-y-4">
                    {/* Email and Date of Birth */}
                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <div className="space-y-2">
                            <label htmlFor={field.name} className="block">
                              Email
                            </label>
                            <input
                              {...field}
                              type="email"
                              className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                            />
                            {error && <span className="text-sm text-red-500">{error.message}</span>}
                          </div>
                        )}
                      />
                      <Controller
                        name="dateOfBirth"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <div className="space-y-2">
                            <label htmlFor={field.name} className="block">
                              Date of Birth
                            </label>
                            <input
                              {...field}
                              type="date"
                              max={format(subYears(new Date(), 18), 'yyyy-MM-dd')}
                              min="1920-01-01"
                              className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                            />
                            {error && <span className="text-sm text-red-500">{error.message}</span>}
                          </div>
                        )}
                      />
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <Controller
                          name="shippingAddress.firstName"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <div className="space-y-1">
                              <label htmlFor={field.name} className="block">
                                First Name
                              </label>
                              <input
                                {...field}
                                type="text"
                                className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                              />
                              {error && <span className="text-sm text-red-500">{error.message}</span>}
                            </div>
                          )}
                        />
                        <Controller
                          name="shippingAddress.lastName"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <div className="space-y-1">
                              <label htmlFor={field.name} className="block">
                                Last Name
                              </label>
                              <input
                                {...field}
                                type="text"
                                className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                              />
                              {error && <span className="text-sm text-red-500">{error.message}</span>}
                            </div>
                          )}
                        />
                        <Controller
                          name="shippingAddress.country"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <div className="space-y-1">
                              <label htmlFor={field.name} className="block">
                                Country
                              </label>
                              <select
                                {...field}
                                className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                              >
                                <option value="NL">Netherlands</option>
                                <option value="BE">Belgium</option>
                                <option value="DE">Germany</option>
                              </select>
                              {error && <span className="text-sm text-red-500">{error.message}</span>}
                            </div>
                          )}
                        />
                        <Controller
                          name="shippingAddress.postalCode"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <div className="space-y-1">
                              <label htmlFor={field.name} className="block">
                                Postal Code
                              </label>
                              <input
                                {...field}
                                type="text"
                                className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                              />
                              {error && <span className="text-sm text-red-500">{error.message}</span>}
                            </div>
                          )}
                        />
                        <Controller
                          name="shippingAddress.houseNumber"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <div className="space-y-1">
                              <label htmlFor={field.name} className="block">
                                House Number
                              </label>
                              <input
                                {...field}
                                type="text"
                                className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                              />
                              {error && <span className="text-sm text-red-500">{error.message}</span>}
                            </div>
                          )}
                        />
                        <Controller
                          name="shippingAddress.addition"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <div className="space-y-1">
                              <label htmlFor={field.name} className="block">
                                Addition
                              </label>
                              <input
                                {...field}
                                type="text"
                                className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                              />
                              {error && <span className="text-sm text-red-500">{error.message}</span>}
                            </div>
                          )}
                        />
                        <Controller
                          name="shippingAddress.street"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <div className="space-y-1">
                              <label htmlFor={field.name} className="block">
                                Street
                              </label>
                              <input
                                {...field}
                                type="text"
                                className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                              />
                              {error && <span className="text-sm text-red-500">{error.message}</span>}
                            </div>
                          )}
                        />
                        <Controller
                          name="shippingAddress.city"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <div className="space-y-1">
                              <label htmlFor={field.name} className="block">
                                City
                              </label>
                              <input
                                {...field}
                                type="text"
                                className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                              />
                              {error && <span className="text-sm text-red-500">{error.message}</span>}
                            </div>
                          )}
                        />
                        <div className="col-span-2 space-y-1">
                          <label htmlFor="phoneNumber" className="block">
                            Phone Number
                          </label>
                          <div className="flex gap-4">
                            <Controller
                              name="shippingAddress.phoneAreaCode"
                              control={control}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  className="w-28 flex-none rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                >
                                  {phoneAreaCodes.map((option) => (
                                    <option key={option.code} value={option.code}>
                                      {option.country} ({option.code})
                                    </option>
                                  ))}
                                </select>
                              )}
                            />
                            <Controller
                              name="shippingAddress.phoneNumber"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <div className="flex-1">
                                  <input
                                    {...field}
                                    type="tel"
                                    className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                  />
                                  {error && <span className="text-sm text-red-500">{error.message}</span>}
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bank Account Number */}
                    <Controller
                      name="bankAccount.accountNumber"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <div className="space-y-2">
                          <label htmlFor={field.name} className="block">
                            IBAN Number
                          </label>
                          <input
                            {...field}
                            type="text"
                            className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300 disabled:bg-gray-100 disabled:text-gray-400"
                            disabled={watch('paymentType') !== 'BANK_TRANSFER'}
                          />
                          {error && <span className="text-sm text-red-500">{error.message}</span>}
                        </div>
                      )}
                    />

                    {/* Payment Type */}
                    <div className="space-y-2">
                      <label className="block">Payment Type</label>
                      <div className="flex gap-4">
                        {['BANK_TRANSFER', 'DONATION', 'PARTNER_WEBHOOK'].map((type) => (
                          <Controller
                            key={type}
                            name="paymentType"
                            control={control}
                            render={({ field }) => (
                              <label className="inline-flex select-none items-center">
                                <input
                                  type="radio"
                                  {...field}
                                  value={type}
                                  checked={field.value === type}
                                  className="mr-2"
                                />
                                {upperFirst(type.replace(/_/g, ' ').toLowerCase())}
                              </label>
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Send Customer Email */}
                    <div className="space-y-2">
                      <label className="inline-flex items-center">
                        <Controller
                          name="sendCustomerEmail"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={field.value ?? false}
                              onChange={({ target: { checked } }) => field.onChange(checked)}
                            />
                          )}
                        />
                        Send Customer Email
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col rounded-lg bg-white p-6 text-black">
                <h2 className="mb-4 text-xl font-bold">Cart</h2>
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li key={item.id} className="border-b pb-4">
                        <div className="flex items-center justify-between gap-4">
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
                          <button
                            onClick={() => deleteCartItem(item.id)}
                            className="self-start text-black hover:text-gray-900"
                            aria-label="Delete item"
                          >
                            <TfiClose size={12} />
                          </button>
                        </div>
                        <div className="mt-2 text-right text-lg font-medium">€{item.data.price.toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 text-right text-xl font-bold">
                  Total: €{cartItems.reduce((sum, item) => addMoney(sum, item.data.price), 0).toFixed(2)}
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

          {/* Updated block for displaying data with tabs */}
          <div className="w-full rounded-lg bg-white p-6 text-black">
            <h2 className="mb-4 text-xl font-bold">Data Inspector</h2>
            <div className="mb-4 flex border-b">
              {(['formData', 'cartData', 'tradeInResult'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 font-semibold'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'formData' ? 'Customer Info' : tab === 'cartData' ? 'Cart Data' : 'Trade-In Result'}
                </button>
              ))}
            </div>
            <div className="mt-4">
              {activeTab === 'formData' && (
                <div className="h-[300px] overflow-y-auto">
                  <ReactJson src={watch()} {...jsonViewerProps} theme={jsonViewerProps.theme} />
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
      <ToastContainer />
    </main>
  )
}
