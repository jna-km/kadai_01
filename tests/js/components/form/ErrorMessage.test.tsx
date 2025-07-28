import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "@/components/form/ErrorMessage";
import React from "react";

describe("ErrorMessage", () => {
  it("エラーメッセージが表示される", () => {
    render(<ErrorMessage message="エラーです" />);
    expect(screen.getByText("エラーです")).toBeInTheDocument();
  });

  it("messageが空なら何も表示しない", () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
