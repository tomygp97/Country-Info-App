'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CountryData = {
    commonName: string
    officialName: string
    countryCode:string
    region: string
    borders: {
        commonName: string 
        officialName: string
        countryCode: string
        region: string
    }[] | []
    population: {
        year: number
        value: number
    }[] | []
    flag: string
}


const CountryInfo = ({ params }: { params: { countrycode: string }}) => {
    const router = useRouter();
    const [countryData, setCountryData] = useState<CountryData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const getCountryData = async (countryCode: string) => {
            try {
                const response = await axios.get(`${apiUrl}/countries/${countryCode}`);
                setCountryData(response.data)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        getCountryData(params.countrycode)
    }, [params.countrycode])

    const handleNavigate = (countryCode: string) => {
        router.push(`/countries/${countryCode}`);
    }

    const latestPopulation = countryData?.population?.length
    ? countryData.population[countryData.population.length - 1]
    : null;

    return (
        <div className="container mx-auto max-w-4xl p-4">
            {
                isLoading ? (
                    <div className="flex items-center justify-center h-screen">
                        <div className="animate-spin inline-block w-8 h-8 border-4 rounded-full">
                            <span className="sr-only">Loading...</span>
                            <LoaderCircle />
                        </div>
                    </div>
                ) : (
                    <div>
                        {countryData && (
                            <>
                                <div className="flex items-start justify-between mb-4 flex-col sm:flex-ro">
                                    <Link href="/countries">
                                        <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500">
                                            Back to Countries
                                        </button>
                                    </Link>
                                </div>
                                    <div className="flex items-center justify-center mb-8 flex-col">
                                        <div className="text-center">
                                            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{countryData.commonName}</h1>
                                            <p className="text-lg sm:text-xl text-gray-600 mb-4">{countryData.officialName}</p>
                                            
                                            {typeof countryData.flag === 'string' && countryData.flag && (
                                                    <Image src={countryData.flag} alt={`Flag of ${countryData.commonName}`} width={120} height={80} className="rounded shadow-md mx-auto" />
                                                )
                                            }
                                        </div>
                                    </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Country Information</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p><strong>Country Code:</strong> {countryData.countryCode}</p>
                                            <p><strong>Region:</strong> {countryData.region}</p>
                                            <p><strong>Latest Population (Year {latestPopulation?.year}):</strong> {latestPopulation?.value.toLocaleString()}</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Bordering Countries</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                            <TableHeader>
                                                <TableRow>
                                                <TableHead>Country</TableHead>
                                                <TableHead>Region</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {countryData?.borders?.length > 0 ? (
                                                    countryData.borders.map((border) => (
                                                        <TableRow key={border.countryCode} className="cursor-pointer hover:bg-gray-100" onClick={() =>handleNavigate(border.countryCode)}>
                                                                <TableCell>{border.commonName}</TableCell>
                                                                <TableCell>{border.region}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={2}>No bordering countries available</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                    <Card className="md:col-span-2">
                                        <CardHeader>
                                            <CardTitle>Population History</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {countryData?.population?.length > 0 ? (
                                                <ChartContainer
                                            config={{
                                                population: {
                                                label: "Population",
                                                color: "hsl(var(--chart-1))",
                                                },
                                            }}
                                            className="h-[300px]"
                                            >
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={countryData.population}>
                                                <XAxis
                                                    dataKey="year"
                                                    tickFormatter={(value) => value.toString()}
                                                    type="number"
                                                    domain={['auto', 'auto']}
                                                />
                                                <YAxis
                                                    tickFormatter={(value) => (value / 1000000).toFixed(1) + 'M'}
                                                />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke="var(--color-population)"
                                                    name="Population"
                                                    strokeWidth={2}
                                                    dot={false}
                                                />
                                                </LineChart>
                                            </ResponsiveContainer>
                                            </ChartContainer>
                                            ) : (
                                                <p>No population data available</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            </>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default CountryInfo