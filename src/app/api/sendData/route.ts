import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
 
export async function POST(
  req: Request
) {
  const players = await req.json()
  players.forEach(async (player:any) => {
      await prisma.players.upsert({
          where: {
              id: player["id"],
          },
          update: {
              smashfactor: player["smashfactor"],
              games_played: player["games_played"], 
              updatedAt: new Date()
          },
          create: {
              name: player["name"],
              smashfactor: player["smashfactor"],
              games_played: player["games_played"],
              createdAt: new Date(),
              updatedAt: new Date()
          }
        })
  })
  await prisma.general.update({
    where: {"id": 1},
    data: {
      count: {
        increment: 1
      }
    }
  })
  return NextResponse.json({"status":"successfully posted"})
}