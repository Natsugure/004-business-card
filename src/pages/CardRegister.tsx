import { Heading, VStack } from "@chakra-ui/react";
import { CardForm } from "../features/user/components/UserCardForm";

export function CardRegister() {
  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Heading as="h2">名刺 新規登録</Heading>
      <CardForm />
    </VStack>
  )
}