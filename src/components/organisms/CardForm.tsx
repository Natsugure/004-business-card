import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Textarea, VStack } from "@chakra-ui/react";
import { Select, type GroupBase, type OptionBase } from "chakra-react-select";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetchAllSkills } from "../../services/skills";
import { LoadingOverlay } from "./LoadingOverlay";
import { addUser } from "../../services/users";
import type { User } from "../../types/user";

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
}

export function CardForm() {
  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { skills: [] },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);

    // TODO: 登録関数に渡すが、Skillの値をどのように取り扱うか決めなくてはならない
    // const values: Omit<User, "createdAt"> = {
    //   id: data.id,
    //   name: data.name,
    //   description: data.description,
    //   githubId: data.githubId,
    //   qiitaId: data.qiitaId,
    //   xId: data.xId
    // }

    // try {
    //   await addUser(values)
    // }

    reset();
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchAllSkills();

        setSkills(data.map((skill) => ({
          value: skill.id,
          label: skill.name,
        })));
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
              {...register(
                "id",
                { 
                  required: true,
                  pattern: /^[a-zA-Z0-9]+$/i
                }
              )}
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
                  onChange={(selected) => onChange(selected ? selected.map((opt) => opt.value) : [])}
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
            <Input
              {...register("githubId")}
              type="text"
            />
          </FormControl>
          
          <FormControl isInvalid={!!errors.qiitaId}>
            <FormLabel>Qiita ID</FormLabel>
            <Input
              {...register("qiitaId")}
              type="text"
            />
          </FormControl>

          <FormControl isInvalid={!!errors.xId}>
            <FormLabel>X ID</FormLabel>
            <Input
              {...register("xId")}
              type="text"
            />
          </FormControl>

          <Button type="submit" mt={8} colorScheme="teal">登録</Button>
        </VStack>
      </form>
    </>
  )
};