'use client'
import React, { useState } from "react";
import { useQRCode } from "next-qrcode";

type FormDataType = {
  name: string
  phone: string
  email: string
  address: string
}

export default function Home() {
  const { Canvas } = useQRCode()
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    phone: '',
    email: '',
    address: ''
  })
  const [showQRCode, setShowQRCode] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowQRCode(true)
    // Implement your QR code generation logic here
    // You can use a third-party library or a server-side API
  };

  const vCard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${formData.name}`, // Structured name
    `FN:${formData.name}`,   // Full name
    `ORG:IT Dev`,
    `TITLE:Mr.`,
    `ADR;TYPE=home:${formData.address}`,
    `TEL;WORK:(021)11223344`,
    `TEL;CELL:${formData.phone}`, // Assuming mobile phone number exists
    `EMAIL:${formData.email}`,
    `URL:sample.com`,
    'END:VCARD',
  ]


  console.log('form data...', formData)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        showQRCode ?
        <Canvas
          text={vCard.join('\n')}
          options={{
            errorCorrectionLevel: 'M',
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: '#010599FF',
              light: '#FFBF60FF',
            },
          }}
        /> 
        :
        null
      }
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="phone" className="text-sm font-medium mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="address" className="text-sm font-medium mb-2">
          Home Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      >
        Generate QR Code
      </button>
    </form>
    </main>
  );
}
