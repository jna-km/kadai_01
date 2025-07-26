import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/ui/Input";
import React from "react";

describe("Input", () => {
  it("ラベルが表示される", () => {
    render(<Input id="test" name="test" label="テストラベル" />);
    expect(screen.getByText("テストラベル")).toBeInTheDocument();
  });

  it("エラー時は赤枠とエラーメッセージが表示される", () => {
    render(<Input id="test" name="test" error="必須です" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-red-500");
    expect(screen.getByText("必須です")).toBeInTheDocument();
  });

  it("入力値変更でonChangeが呼ばれる", () => {
    const handleChange = vi.fn();
    render(<Input id="test" name="test" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "abc" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("disabled時は入力不可", () => {
    render(<Input id="test" name="test" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("textareaとしても表示できる", () => {
    render(<Input id="test" name="test" as="textarea" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
