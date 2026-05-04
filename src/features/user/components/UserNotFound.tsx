import { Heading, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router";

export function UserNotFound() {
  const { id } = useParams();

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Heading as="h2">ユーザーが見つかりません</Heading>
      <Text>ID「{id}」のユーザーは見つかりませんでした。</Text>
    </VStack>
  )
}