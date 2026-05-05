import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { CardRegister } from "./CardRegister";
import * as userService from "../services/database/users";
import * as skillService from "../services/database/skills";

const mockedNavigator = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

vi.mock("../services/database/users")
vi.mock("../services/database/skills")

describe("CardRegister Page", () => {
  it("タイトルが表示されていること", () => {
    vi.mocked(userService.addUser).mockResolvedValue(undefined);
    vi.mocked(skillService.fetchAllSkills).mockResolvedValue([]);

    render(
      <ChakraProvider>
        <CardRegister />
      </ChakraProvider>
    );

    expect(screen.getByText("名刺 新規登録")).toBeInTheDocument();
  })
})