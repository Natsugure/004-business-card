import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchUser } from "../services/users";
import type { User } from "../types/user";
import { LoadingOverlay } from "../components/organisms/LoadingOverlay";
import { UserCard } from "../components/organisms/UserCard";
import { UserNotFound } from "../components/organisms/UserNotFound";

export function Card() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
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
      } catch {
        setNotFound(true);
      }
    };
    void fetch().then(() => setIsLoading(false));
  }, [id]);

  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : notFound ? (
        <UserNotFound />
      ) : 
      (
        user && <UserCard user={user} />
      )}
    </>
  );
}
