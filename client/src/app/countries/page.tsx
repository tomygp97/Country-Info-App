'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Country = {
    countryCode: string
    name: string
};


const CountriesList = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    
    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const getCountries = async () => {
            try {
                const response = await axios.get(`${apiUrl}/countries`);
                setCountries(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getCountries();
    }, [])

    return (
        <main className='container mx-auto p-4'>
            <h1 className='text-3xl font-extrabold mb-6 text-center'>Countries List</h1>
            <hr className='mb-4' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {countries.map((country) => (
                    <Card key={country.countryCode} className="overflow-hidden transition-all hover:shadow-lg">
                        <CardContent className="p-0">
                            <Link 
                                href={`/countries/${country.countryCode}`}
                                className='block p-4'    
                            >
                                <div className='flex items-center p-4 gap-6'>
                                    <div className='text-4xl'>{country.countryCode}</div>
                                    <h2 className='text-xl'>{country.name}</h2>
                                    <ChevronRight className='text-gray-400 ml-auto' />
                                </div>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    )
}

export default CountriesList