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

  it("variantとsizeに応じたクラスが適用される", () => {
    const { rerender } = render(<Button variant="primary" size="lg">Primary</Button>);
    const button = screen.getByText("Primary");

    expect(button.className).toContain("bg-blue-500"); // primary
    expect(button.className).toContain("text-white");
    expect(button.className).toContain("px-6"); // lgサイズ
    expect(button.className).toContain("py-3");
    expect(button.className).toContain("text-lg");


    rerender(<Button variant="secondary" size="sm">Secondary</Button>);
    const buttonSecondary = screen.getByText("Secondary");

    expect(buttonSecondary.className).toContain("bg-gray-500"); // secondary
    expect(buttonSecondary.className).toContain("text-white");
    expect(buttonSecondary.className).toContain("px-2"); // smサイズ
    expect(buttonSecondary.className).toContain("py-1");
    expect(buttonSecondary.className).toContain("text-sm");
  });
});
