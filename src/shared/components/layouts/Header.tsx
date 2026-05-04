import { Box, Center, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import { SlArrowLeft } from "react-icons/sl";

interface Props {
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({ showBack, onBack }: Props) {
  return (
    <Flex bg="teal" w="100%" h="48px" color="white" alignItems="center">
      <Box w="48px" display="flex" alignItems="center" justifyContent="center">
      {showBack && (
        <IconButton
          aria-label="Back"
          colorScheme="white"
          variant="ghost"
          icon={<SlArrowLeft />}
          onClick={onBack}
        />
      )}
      </Box>
      <Spacer />
      <Center>
        <Text as="b">デジタル名刺アプリ</Text>
      </Center>
      <Spacer />
      <Box w="48px" />
    </Flex>
  );
}
