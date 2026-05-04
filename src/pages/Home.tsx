import { Button, HStack, IconButton, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { IoAdd, IoSearch } from "react-icons/io5"
import { useNavigate } from 'react-router'

export function Home() {
  const [inputId, setInputId] = useState("")
  const navigate = useNavigate()

  const onClickSearch = () => navigate(`/cards/${inputId}`)

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
        <HStack alignSelf="stretch">
          <Input 
            placeholder="IDを入力してユーザーを検索" 
            value={inputId} 
            onChange={(e) => setInputId(e.target.value)}
          />
          <IconButton aria-label="検索" icon={<IoSearch />} colorScheme="teal" onClick={onClickSearch} />
        </HStack>
      </VStack>
    </>
  )
}
