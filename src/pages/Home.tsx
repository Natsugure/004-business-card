import { Button, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

export function Home() {
  const nav = useNavigate()

  return (
    <>
      <Heading as="h1">ホーム</Heading>
      <Button onClick={() => nav('/cards/sample_id')}>サンプル</Button>
      <Button onClick={() => nav('/cards/register')}>新規登録</Button>
    </>
  )
}
