import {Container, Box} from '@chakra-ui/react'
import Header from '@/features/shared/components/header'

export default async function Layout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <main>
      <Container maxW="container.xl" pt={8} pb={9}>
        <Header />
        <Box mt={10}>
          {children}
        </Box>
      </Container>
    </main>
  )
}
