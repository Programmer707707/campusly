'use client'
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { sendMessage } from '@/utils/actions';
import { useTheme } from 'next-themes';

const ContactForm = () => {
    const [state, formAction] = useFormState(sendMessage, {
        message: "",
    })
    
    const {theme} = useTheme();
    const isDarkMode = theme === 'dark';
      return (
        <div>
            <h1 className='capitalize text-center mb-6 text-4xl font-bold leading-none tracking-wide sm:text-6xl'>Contact Us</h1>
             <form action={formAction} className='p-6 w-[600px] mx-auto shadow-lg text-black space-y-4 rounded-lg'>
            <div className='space-y-2'>
                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Name
                </p>
                <input placeholder='John Doe' type="text" name='name' required className='w-full border border-black p-3 bg-lightGray rounded-sm' />
            </div>
    
            <div className='space-y-2'>
                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    University
                </p>
                <input placeholder='ELTE, BME, Corvinus, Budapest Business School' type="text" name='university' required className='w-full border border-black p-3 bg-lightGray rounded-sm' />
            </div>
    
            <div className='space-y-2'>
                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Email
                </p>
                <input placeholder='johndoe@gmail.com' type="email" name='email' required className='w-full border border-black p-3 bg-lightGray rounded-sm' />
            </div>
    
            <div className='space-y-2'>
                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Message
                </p>
                <textarea placeholder='Write your message' name='message' required className='w-full p-3 border border-black bg-lightGray rounded-lg h-40' />
            </div>
    
            {state.message && (<p aria-live='polite' className='not-sr-only text-green-500 text-end'>{state.message}</p>)}
    
            <div className='flex justify-center'>
                <Button className='bg-Blue bg-primary w-full md:w-auto text-white px-4 py-4 rounded-sm  disabled:bg-gray-300 undefined'>Contact Us</Button>
            </div>
        </form>
        </div>
    
        )
}

export default ContactForm;