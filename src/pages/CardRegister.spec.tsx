import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { CardRegister } from "./CardRegister";

const mockedNavigator = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

describe("CardRegister Page", () => {
  it("タイトルが表示されていること", () => {
    render(
      <ChakraProvider>
        <CardRegister />
      </ChakraProvider>
    );

    expect(screen.getByText("名刺 新規登録")).toBeInTheDocument();
  })
})