import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BaseInput } from "@/components/ui/Input/BaseInput";

import { useCreateProject } from '@/features/products/api/create-product'

import { Product } from '../types'

const createProductSchema = z.object({
  title: z.string().min(3, 'Campo titulo precisa conter no mínimo 3 caracteres')
    .max(64, "A quantidade máxima de caracteres é 64 para o titulo"),
  price: z.number().positive().max(1000000, 'Preço máximo permitido é de R$ 1.000.000'),
  rate: z.number(),
  url: z.string().url('URL Inválida, ex.: https://example.com/img/someimg.png'),
  description: z.string().min(10, 'Campo descrição precisa conter no mínimo 10 caracteres'),
})

type ProductForm = Omit<Product, 'id' | 'image'> & {
  url: string
}

export function CreateProduct() {
  const { isPending, mutateAsync } = useCreateProject()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductForm>({
    resolver: zodResolver(createProductSchema)
  })

  async function handleSubmitProductForm(data: ProductForm) {
    await mutateAsync({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        rate: data.rate,
        image: data.url
      }
    }) 

    reset()   
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitProductForm)} className="w-full flex flex-col gap-y-5">
      <BaseInput
        register={register('title')}
        error={errors.title}
        className="flex-1"
        label="Titulo do produto"
        placeholder="Titulo do produto"
      />
      <BaseInput
        register={register('price', { valueAsNumber: true })}
        error={errors.price}
        className="flex-1 max-w-sm"
        label="Preço"
        placeholder="Preço do produto"
        type="number"
      />
      <BaseInput
        register={register('rate', { valueAsNumber: true })}
        error={errors.rate}
        className="flex-1 max-w-sm"
        label="Rate"
        placeholder="Avaliação do produto"
        type="number"
      />

      <BaseInput
        register={register('url')}
        error={errors.url}
        className="flex-1 max-w-sm"
        label="Url da imagem"
        placeholder="ex.: https://example.com/img/something.png"              
      />

      <div className="flex flex-col gap-y-4">
        <label htmlFor="description" className=" font-medium text-sm">
          Descrição
        </label>
        <Textarea
          placeholder="Digite uma descrição ao produto"
          id="description"
          className="rounded-md bg-border p-4 border-none placeholder:text-zinc-400"
          {...register('description')}
        />
        {errors.description && <p className="text-red-500 text-xs">Informe uma descrição para o produto</p>}
      </div>

      <div className="w-full flex items-center justify-between">
        <Button className="bg-foreground text-black">Cancelar</Button>
        
        {isPending ? (
          <Button disabled className="bg-primary">
            Loading...
          </Button>
        ) : (
          <Button className="bg-primary hover:bg-primary transition duration-150 hover:brightness-75">
            Registrar
          </Button>
        )}
      </div>
    </form>
  )
}