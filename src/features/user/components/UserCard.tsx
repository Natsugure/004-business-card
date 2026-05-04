import { Box, Center, Flex, Heading, IconButton, Text, VStack } from "@chakra-ui/react"
import { SiGithub, SiQiita, SiX } from "react-icons/si";
import type { User } from "../../../shared/types/user"
import { InnerHTML } from "../../../shared/components/typography/InnerHtml";
import { generateGithubUrl, generateQiitaUrl, generateXUrl } from "../../../utils/user";

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
        <IconButton aria-label="GitHub Url" icon={<SiGithub />} onClick={() => onClickExternalLinkButton(generateGithubUrl(user))} />
        <IconButton aria-label="Qiita Url" icon={<SiQiita />} onClick={() => onClickExternalLinkButton(generateQiitaUrl(user))} />
        <IconButton aria-label="X Url" icon={<SiX />} onClick={() => onClickExternalLinkButton(generateXUrl(user))} />
      </Flex>
    </VStack>
  )
}