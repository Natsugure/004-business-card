import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { UserCard } from "./UserCard";
import type { User } from "../../../shared/types/user";

describe("UserCard", () => {
  const user: User = {
    id: "testUser1",
    name: "テストユーザー1",
    description: "テストユーザーの自己紹介",
    skills: [
      { id: 1, name: "React" },
      { id: 2, name: "TypeScript" },
    ],
    githubId: "testUser1",
    qiitaId: "testUser1",
    xId: "testUser1",
    createdAt: new Date().toISOString(),
  }

  beforeEach(() => {
    render(
        <ChakraProvider>
          <UserCard user={user} />
        </ChakraProvider>
    )
  })

  it("ユーザー名が表示される", () => {
    expect(screen.getByText("テストユーザー1")).toBeInTheDocument()
  })

  it("自己紹介が表示される", () => {
    expect(screen.getByText("テストユーザーの自己紹介")).toBeInTheDocument()
  })

  it("好きな技術が表示される", () => {
    expect(screen.getByText("React, TypeScript")).toBeInTheDocument()
  })

  it("GitHubのリンクボタンが正しく設定されている", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    const button = screen.getByRole("button", { name: "GitHub Url" });
    button.click();

    expect(openSpy).toHaveBeenCalledWith("https://github.com/testUser1", "_blank");
  })

  it("Qiitaのリンクボタンが正しく設定されている", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    const button = screen.getByRole("button", { name: "Qiita Url" });
    button.click();

    expect(openSpy).toHaveBeenCalledWith("https://qiita.com/testUser1", "_blank");
  })

  it("Qiitaのリンクボタンが正しく設定されている", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    const button = screen.getByRole("button", { name: "X Url" });
    button.click();

    expect(openSpy).toHaveBeenCalledWith("https://x.com/testUser1", "_blank");
  })
})