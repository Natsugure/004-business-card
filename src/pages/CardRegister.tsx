import { Heading, VStack } from "@chakra-ui/react";
import { CardForm } from "../components/organisms/CardForm";

export function CardRegister() {
  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Heading as="h1">名刺 新規登録</Heading>
      <CardForm />
    </VStack>
  )
}