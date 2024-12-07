import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
 
export async function POST(
) {
  return NextResponse.json(await prisma.general.findFirst({where: {id: 1}, select: {count:true}}))
}