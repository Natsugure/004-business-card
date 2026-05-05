import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { CardForm } from "./UserCardForm";
import * as userService from "../../../services/database/users";
import * as skillService from "../../../services/database/skills";

const mockedNavigator = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

vi.mock("../../../services/database/users")
vi.mock("../../../services/database/skills")

describe("UserCardForm", () => {
  beforeEach(() => {
    vi.mocked(userService.addUser).mockResolvedValue(undefined);
    vi.mocked(skillService.fetchAllSkills).mockResolvedValue([
      { id: 1, name: "React" },
      { id: 2, name: "TypeScript" },
    ]);

    render(
      <ChakraProvider>
        <CardForm />
      </ChakraProvider>
    );
  });

  it("全項目を入力して登録ボタンを押すとHomeに遷移する", async () => {
    const user = userEvent.setup();

    await waitFor(() => expect(screen.queryByText("読み込み中…")).not.toBeInTheDocument());

    await user.type(screen.getByRole("textbox", { name: "名刺ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "名前" }), "テストユーザー1");
    await user.type(screen.getByRole("textbox", { name: "自己紹介" }), "テストユーザーの自己紹介");

    const skillInput = screen.getByRole("combobox", { name: "好きな技術" });
    await user.click(skillInput);
    await user.click(screen.getByText("React"));
    await user.click(skillInput);
    await user.click(screen.getByText("TypeScript"));

    await user.type(screen.getByRole("textbox", { name: "GitHub ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "Qiita ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "X ID" }), "testUser1");
    await user.click(screen.getByRole("button", { name: "登録" }));

    await user.click(await screen.findByRole("button", { name: "閉じる" }));

    expect(mockedNavigator).toHaveBeenCalledWith("/");
  })

  it("IDの入力がないときにエラーメッセージが表示される", async () => {
    const user = userEvent.setup();

    await waitFor(() => expect(screen.queryByText("読み込み中…")).not.toBeInTheDocument());

    await user.type(screen.getByRole("textbox", { name: "名刺ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "自己紹介" }), "テストユーザーの自己紹介");

    const skillInput = screen.getByRole("combobox", { name: "好きな技術" });
    await user.click(skillInput);
    await user.click(screen.getByText("React"));
    await user.click(skillInput);
    await user.click(screen.getByText("TypeScript"));

    await user.type(screen.getByRole("textbox", { name: "GitHub ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "Qiita ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "X ID" }), "testUser1");
    await user.click(screen.getByRole("button", { name: "登録" }));

    await waitFor(() => expect(screen.queryByText("名前は必須です")).toBeInTheDocument());
  })

    it("名前の入力がないときにエラーメッセージが表示される", async () => {
    const user = userEvent.setup();

    await waitFor(() => expect(screen.queryByText("読み込み中…")).not.toBeInTheDocument());

    await user.type(screen.getByRole("textbox", { name: "名前" }), "テストユーザー1");
    await user.type(screen.getByRole("textbox", { name: "自己紹介" }), "テストユーザーの自己紹介");

    const skillInput = screen.getByRole("combobox", { name: "好きな技術" });
    await user.click(skillInput);
    await user.click(screen.getByText("React"));
    await user.click(skillInput);
    await user.click(screen.getByText("TypeScript"));

    await user.type(screen.getByRole("textbox", { name: "GitHub ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "Qiita ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "X ID" }), "testUser1");
    await user.click(screen.getByRole("button", { name: "登録" }));

    await waitFor(() => expect(screen.queryByText("名刺IDは必須です")).toBeInTheDocument());
  })

  it("自己紹介の入力がないときにエラーメッセージが表示される", async () => {
    const user = userEvent.setup();

    await waitFor(() => expect(screen.queryByText("読み込み中…")).not.toBeInTheDocument());

    await user.type(screen.getByRole("textbox", { name: "名刺ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "名前" }), "テストユーザー1");

    const skillInput = screen.getByRole("combobox", { name: "好きな技術" });
    await user.click(skillInput);
    await user.click(screen.getByText("React"));
    await user.click(skillInput);
    await user.click(screen.getByText("TypeScript"));

    await user.type(screen.getByRole("textbox", { name: "GitHub ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "Qiita ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "X ID" }), "testUser1");
    await user.click(screen.getByRole("button", { name: "登録" }));

    await waitFor(() => expect(screen.queryByText("自己紹介は必須です")).toBeInTheDocument());
  })

  it("好きな技術の入力がないときにエラーメッセージが表示される", async () => {
    const user = userEvent.setup();

    await waitFor(() => expect(screen.queryByText("読み込み中…")).not.toBeInTheDocument());

    await user.type(screen.getByRole("textbox", { name: "名刺ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "名前" }), "テストユーザー1");
    await user.type(screen.getByRole("textbox", { name: "自己紹介" }), "テストユーザーの自己紹介");

    await user.type(screen.getByRole("textbox", { name: "GitHub ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "Qiita ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "X ID" }), "testUser1");
    await user.click(screen.getByRole("button", { name: "登録" }));

    await waitFor(() => expect(screen.queryByText("1つ以上技術を選択してください")).toBeInTheDocument());
  })

  it("オプション項目が未入力で登録できる", async () =>{
    const user = userEvent.setup();

    await waitFor(() => expect(screen.queryByText("読み込み中…")).not.toBeInTheDocument());

    await user.type(screen.getByRole("textbox", { name: "名刺ID" }), "testUser1");
    await user.type(screen.getByRole("textbox", { name: "名前" }), "テストユーザー1");
    await user.type(screen.getByRole("textbox", { name: "自己紹介" }), "テストユーザーの自己紹介");

    const skillInput = screen.getByRole("combobox", { name: "好きな技術" });
    await user.click(skillInput);
    await user.click(screen.getByText("React"));
    await user.click(skillInput);
    await user.click(screen.getByText("TypeScript"));
    
    await user.click(screen.getByRole("button", { name: "登録" }));

    await user.click(await screen.findByRole("button", { name: "閉じる" }));

    expect(mockedNavigator).toHaveBeenCalledWith("/");
  })
})
