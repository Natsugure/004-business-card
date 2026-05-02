import { Box, Center, Flex, Heading, IconButton, Text, VStack } from "@chakra-ui/react"
import { SiGithub, SiQiita, SiX } from "react-icons/si";
import type { User } from "../../types/user"
import { InnerHTML } from "../atoms/InnerHtml";

interface Props {
  user: User
}

export function UserCard(props: Props) {
  const { user } = props;

  const onClickExternalLinkButton = (url: string) => {
    window.open(url, "_blank");
  }

  return (
    <VStack
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      m="4"
      align="start"
      spacing={4}
    >
      <Center mb={4} w="100%">
        <Text fontSize="3xl" as="b">
          {user?.name}
        </Text>
      </Center>

      <Box>
        <Heading as="h3" fontSize="xl">自己紹介</Heading>
        <InnerHTML>{user?.description}</InnerHTML>
      </Box>

      <Box>
        <Heading as="h3" fontSize="xl">好きな技術</Heading>
        <Text>
          {user?.skills.map((skill) => skill.name).join(", ")}
        </Text>
      </Box>

      <Flex w="100%" justifyContent="center" gap={2}>
        <IconButton aria-label="GitHub Url" icon={<SiGithub />} onClick={() => onClickExternalLinkButton(user.generateGithubUrl())} />
        <IconButton aria-label="Qiita Url" icon={<SiQiita />} onClick={() => onClickExternalLinkButton(user.generateQiitaUrl())} />
        <IconButton aria-label="X Url" icon={<SiX />} onClick={() => onClickExternalLinkButton(user.generateXUrl())} />
      </Flex>
    </VStack>
  )
}