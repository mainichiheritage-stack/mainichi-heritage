"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { log } from "@/utils/logger";

interface User {
  id: string;
  email: string;
  nickname: string;
  created_at: string;
}

export default function MyPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.ok) {
          const data: User = await res.json();
          setUser(data);
        } else {
          log.warn("Failed to fetch profile, status:", { status: res.status });
          localStorage.removeItem("access");
          router.push("/login");
        }
      } catch (error) {
        log.error("通信エラー:", { error });
        router.push("/");
      }
    };
    fetchProfile();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">マイページ</h1>
      <div className="mt-4 p-4 border rounded shadow-sm">
        <p className="mb-2">
          <strong>ニックネーム:</strong> {user.nickname}
        </p>
        <p>
          <strong>メールアドレス:</strong> {user.email}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">学習ステータス</h2>
        <p className="text-gray-600">tmp</p>
      </div>
    </div>
  );
}
