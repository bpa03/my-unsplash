'use client'
import {FC, PropsWithChildren} from 'react'
import Masonry from 'react-responsive-masonry'

const ListOfPhotos: FC<PropsWithChildren<object>> = ({children}) => {
  return (
    <Masonry columnsCount={3} gutter="1.5rem">
      {children}
    </Masonry>
  )
}

export default ListOfPhotos
