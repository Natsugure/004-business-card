import { Button, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchUser } from "../services/users";
import type { User } from "../types/user";
import { LoadingOverlay } from "../components/LoadingOverlay";

export function Card() {
  const { id } = useParams();
  const nav = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetch = async () => {
      if (!id) {
        console.error("idが指定されていません。");
        return;
      }

      try {
        const data = await fetchUser(id);
        setUser(data);
      } catch (e) {
        console.error("ユーザーの取得に失敗しました。", e);
      }
    };
    void fetch().then(() => setIsLoading(false));
  }, [id]);

  return (
    <>
      <Button onClick={() => nav(-1)}>戻る</Button>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <>
          <Text>名前: {user?.name}</Text>
          <Text>自己紹介: {user?.description}</Text>
          <Text>
            スキル: {user?.skills.map((skill) => skill.name).join(", ")}
          </Text>
          {user?.githubId && (
            <Link href={user.generateGithubUrl()} isExternal>Github</Link>
          )}
          <br />
          {user?.qiitaId && <Link href={user.generateQiitaUrl()} isExternal>Qiita</Link>}
          <br />
          {user?.xId && <Link href={user.generateXUrl()} isExternal>X</Link>}
        </>
      )}
    </>
  );
}
