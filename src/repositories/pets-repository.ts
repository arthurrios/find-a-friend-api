import type { Pet, Prisma } from '@prisma/client'

export interface FindAllParams {
  city: string
  age?: string
  size?: string
  energy_level?: string
  independency_level?: string
  environment?: string
}

export interface PetsRepository {
  findAllInCity(params: FindAllParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
