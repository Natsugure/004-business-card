import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Select, type GroupBase, type OptionBase } from "chakra-react-select";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { fetchAllSkills } from "../../../services/database/skills";
import { LoadingOverlay } from "../../../shared/components/overlay/LoadingOverlay";
import { addUser } from "../../../services/database/users";
import type { User, Skill } from "../../../shared/types/user";
import { useNavigate } from "react-router";

interface FormValues {
  id: string;
  name: string;
  description: string;
  skills: number[];
  githubId: string;
  qiitaId: string;
  xId: string;
}

interface SkillGroup extends OptionBase {
  value: number;
  label: string;
  skill: Skill;
}

export function CardForm() {
  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { skills: [] },
  });

  const onSubmit = async (data: FormValues) => {
    const values: Omit<User, "createdAt"> = {
      id: data.id,
      name: data.name,
      description: data.description,
      githubId: data.githubId,
      qiitaId: data.qiitaId,
      xId: data.xId,
      skills: skills.map((skill) => skill.skill),
    };

    try {
      await addUser(values);
      onOpen();
    } catch (e) {
      console.error("ユーザーの登録に失敗しました。", e);
    }
  };

  const handleOnClose = () => {
    onClose();
    void navigate("/");
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchAllSkills();

        setSkills(
          data.map((skill) => ({
            value: skill.id,
            label: skill.name,
            skill: skill,
          })),
        );
      } catch (e) {
        console.error("好きな技術の選択肢の取得に失敗しました", e);
      }
    };

    void fetch().then(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.id} isRequired>
            <FormLabel>名刺ID</FormLabel>
            <Input
              {...register("id", {
                required: true,
                pattern: /^[a-zA-Z0-9]+$/i,
              })}
              type="text"
            />
            <FormErrorMessage>
              {errors.id?.type === "required" && "名刺IDは必須です"}
              {errors.id?.type === "pattern" && "IDには英数字のみ使用できます"}
            </FormErrorMessage>
            <FormHelperText>
              名刺をアプリ内で共有・検索する際に使用するIDです。英数字のみで任意のIDを設定できます。
            </FormHelperText>
          </FormControl>

          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel>名前</FormLabel>
            <Input
              {...register("name", { required: "名前は必須です" })}
              type="text"
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.description} isRequired>
            <FormLabel>自己紹介</FormLabel>
            <Textarea
              placeholder="<h1>HTMLタグも使えます</h1>"
              {...register("description", { required: "自己紹介は必須です" })}
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.skills} isRequired>
            <FormLabel>好きな技術</FormLabel>
            <Controller
              name="skills"
              control={control}
              rules={{ required: "1つ以上技術を選択してください" }}
              render={({ field: { onChange, value, ref } }) => (
                <Select<SkillGroup, true, GroupBase<SkillGroup>>
                  isMulti
                  placeholder="好きな技術を選択してください"
                  onChange={(selected) =>
                    onChange(selected ? selected.map((opt) => opt.value) : [])
                  }
                  value={skills.filter((skill) => value.includes(skill.value))}
                  options={skills}
                  ref={ref}
                />
              )}
            />
            <FormErrorMessage>{errors.skills?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.githubId}>
            <FormLabel>GitHub ID</FormLabel>
            <Input {...register("githubId")} type="text" />
          </FormControl>

          <FormControl isInvalid={!!errors.qiitaId}>
            <FormLabel>Qiita ID</FormLabel>
            <Input {...register("qiitaId")} type="text" />
          </FormControl>

          <FormControl isInvalid={!!errors.xId}>
            <FormLabel>X ID</FormLabel>
            <Input {...register("xId")} type="text" />
          </FormControl>

          <Button type="submit" mt={8} colorScheme="teal">
            登録
          </Button>
        </VStack>
      </form>

      <AlertDialog
        isOpen={isOpen}
        onClose={handleOnClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              登録完了
            </AlertDialogHeader>
            <AlertDialogBody>登録が完了しました。</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleOnClose}>
                閉じる
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
