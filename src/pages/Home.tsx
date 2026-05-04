import { Button, VStack } from '@chakra-ui/react'
import { IoAdd } from "react-icons/io5"
import { useNavigate } from 'react-router'
import { SearchBox } from '../features/user/components/UserSearchBox'

export function Home() {
  const navigate = useNavigate()

  return (
    <>
      <VStack spacing={8} align="start" p={4}>
        <Button
          leftIcon={<IoAdd />}
          colorScheme='teal'
          alignSelf="end"
          onClick={() => navigate('/cards/register')}
        >
          新規登録
        </Button>
        <SearchBox onSearch={(inputId) => navigate(`/cards/${inputId}`)} />
      </VStack>
    </>
  )
}
