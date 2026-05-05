import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./Header";

describe("Header", () => {
  it("タイトルが表示されていること", () => {
    render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    );

    expect(screen.getByText("デジタル名刺アプリ")).toBeInTheDocument()
  })
})