import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/ui/Button";
import React from "react";

describe("Button", () => {
  it("ラベルが表示される", () => {
    render(<Button>送信</Button>);
    expect(screen.getByText("送信")).toBeInTheDocument();
  });

  it("onClickが呼ばれる", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>クリック</Button>);
    fireEvent.click(screen.getByText("クリック"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("disabled時はクリック不可", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>無効</Button>);
    fireEvent.click(screen.getByText("無効"));
    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByText("無効")).toBeDisabled();
  });
});
