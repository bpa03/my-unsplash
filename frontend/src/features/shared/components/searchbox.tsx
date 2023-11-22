'use client'
import {FC} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {IoSearchOutline} from 'react-icons/io5'
import {Box, Input, InputGroup, InputLeftElement} from '@chakra-ui/react'

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
    <InputGroup>
      <InputLeftElement top="50%" transform="translateY(-50%)" left="8px">
        <Box as="span" color="primary.gray">
          <IoSearchOutline size="1.5rem" color="inherit" />
        </Box>    
      </InputLeftElement>
      <Input {...register('query')} type="text" placeholder="Search by name" borderColor="primary.gray" pl={12} />
    </InputGroup>
   </form>
 )
}

export default Searchbox
