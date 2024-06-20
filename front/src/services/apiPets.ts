import { type LostCats } from '@/types/pets'
import { get } from '@/helpers/http'

export async function fetchLostCats(): Promise<LostCats[]> {
  return get<LostCats[]>('http://localhost:3000/lost/cats')
}
