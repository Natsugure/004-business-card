import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchUser } from "../services/users";
import type { User } from "../types/user";
import { LoadingOverlay } from "../components/organisms/LoadingOverlay";
import { UserCard } from "../components/organisms/UserCard";

export function Card() {
  const { id } = useParams();

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
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        user && <UserCard user={user} />
      )}
    </>
  );
}
