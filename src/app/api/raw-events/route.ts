// https://www.youtube.com/watch?v=-MFiza7ZRzs the guide i followed


import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://run.mocky.io/v3/61ce86a9-040b-4830-b3dc-5de6d7f78536" //inserire l'url della chiamata che ci interessa.

const API_KEY:string = process.env.DATA_API_KEY as string


export async function GET(){
    const res = await fetch(DATA_SOURCE_URL)

    const rawEvents: RawEvents[] = await res.json()

    return NextResponse.json(rawEvents)
}


export async function DELETE(request: Request){
    const {id}: Partial<RawEvents> = await request.json()


    if (!id) return NextResponse.json({"message": "Todo id required"})

    await fetch(`${DATA_SOURCE_URL}/${id}` ,{
        method:' DELETE',
        headers: {
            'Content-Type': 'applicaiton/json',
            'API-Key': API_KEY
        }
    })

    return NextResponse.json({"message": `Todo ${id} deleted` })
}