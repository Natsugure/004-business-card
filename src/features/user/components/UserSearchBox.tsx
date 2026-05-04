import { HStack, IconButton, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'

type Props = {
  onSearch: (inputId: string) => void
}

export function SearchBox({ onSearch }: Props) {
  const [inputId, setInputId] = useState('')

  return (
    <HStack alignSelf="stretch">
      <Input
        placeholder="IDを入力してユーザーを検索"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
      />
      <IconButton
        aria-label="検索"
        icon={<IoSearch />}
        colorScheme="teal"
        disabled={!inputId}
        onClick={() => onSearch(inputId)}
      />
    </HStack>
  )
}
