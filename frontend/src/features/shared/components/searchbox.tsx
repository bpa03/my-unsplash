'use client'
import {FC} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {Input} from '@chakra-ui/react'

const Searchbox: FC<object> = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const {register, handleSubmit} = useForm({
    defaultValues: {
      query
    }
  })

 return (
   <form onSubmit={handleSubmit(({query}) => {
    router.push(`/photos/search?query=${query}`)
   })}>
    <Input {...register('query')} type="text" />
   </form>
 )
}

export default Searchbox
