import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./Home";

const mockedNavigator = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

describe("Home Page", () => {
  beforeEach(() => {
    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );
  });

  it("新規登録ボタンを押すとCardRegisterに遷移する", async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole("button", { name: "新規登録" }));

    expect(mockedNavigator).toHaveBeenCalledWith("/cards/register");
  });

  it("IDを入力して検索ボタンを押すとCardに遷移する", async () => {
    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText("IDを入力してユーザーを検索"), "testUser1");
    await user.click(screen.getByRole("button", { name: "検索" }));

    expect(mockedNavigator).toHaveBeenCalledWith("/cards/testUser1");
  });

  it("IDが未入力だと検索ボタンがdisabledになっている", async () => {
    expect(screen.queryByRole("button", { name: "検索" })).toBeDisabled()
  })
})