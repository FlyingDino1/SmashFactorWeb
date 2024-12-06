import '../../index.css'
import { ClientOnly } from './client'
 
export function generateStaticParams() {
  return [{ slug: [''] }]
}

// console.log(await prisma.players.count())
 
export default function Page() {
  return <ClientOnly />
}