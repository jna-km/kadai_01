import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/ui/Input";
import userEvent from "@testing-library/user-event";
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

  it("ヘルパーテキストが表示される", () => {
    render(<Input id="test" name="test" helperText="ヘルパーテキスト" />);
    expect(screen.getByText("ヘルパーテキスト")).toBeInTheDocument();
  });
  it("required属性がtrueのとき、アスタリスクが表示される", () => {
    render(<Input id="test" name="test" label="必須フィールド" required />);
    expect(screen.getByText("必須フィールド")).toHaveTextContent("必須フィールド *");
  });
  it("idが指定されている場合、aria-describedbyが正しく設定される", () => {
    render(<Input id="test" name="test" helperText="ヘルパーテキスト" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "test-helper");
  });
  it("エラーがある場合、aria-describedbyにエラーIDが設定される", () => {
    render(<Input id="test" name="test" error="エラーが発生しました" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "test-error");
  });
  it("asがtextareaの場合、rows属性が適用される", () => {
    render(<Input id="test" name="test" as="textarea" rows={5} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "5");
  });
  it("asがinputの場合、type属性が適用される", () => {
    render(<Input id="test" name="test" type="email" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
  });
  it("クラス名が正しく適用される", () => {
    const { container } = render(<Input id="test" name="test" className="custom-class" />);
    const input = container.querySelector("input, textarea");
    expect(input).toHaveClass("custom-class");
  });
  it("sizeがsmの場合、クラスが適用される", () => {
    render(<Input id="test" name="test" size="sm" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("text-sm", "p-2");
  });
  it("sizeがmdの場合、クラスが適用される", () => {
    render(<Input id="test" name="test" size="md" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("text-base", "p-3");
  });
  it("sizeがlgの場合、クラスが適用される", () => {
    render(<Input id="test" name="test" size="lg" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("text-lg", "p-4");
  });

  it("sizeが指定されていない場合、デフォルトのクラスが適用される", () => {
    render(<Input id="test" name="test" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("text-base", "p-3");
  });
  it("typeがtextの場合、input要素がレンダリングされる", () => {
    render(<Input id="test" name="test" type="text" />);
    const input = screen.getByRole("textbox");
    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveAttribute("type", "text"); 
  });

  it("typeがpasswordの場合、input要素がレンダリングされる", () => {
    render(<Input id="test" name="test" type="password" label="クリックラベル" />);
    // password型はrole="textbox"にならないため、ラベルで取得
    const input = screen.getByLabelText("クリックラベル", { selector: "input" });
    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveAttribute("type", "password");
  });
  it("typeがemailの場合、input要素がレンダリングされる", () => {
    render(<Input id="test" name="test" type="email" />);
    const input = screen.getByRole("textbox");
    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveAttribute("type", "email");
  });

});

  it("エラー時にaria-invalidがtrueになる", () => {
    render(<Input id="test" name="test" error="必須です" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("ラベルをクリックすると入力にフォーカスが当たる", async () => {
    const user = userEvent.setup();
    render(<Input id="test" name="test" label="クリックラベル" />);
    const label = screen.getByText("クリックラベル");
    const input = screen.getByRole("textbox");
    await user.click(label);
    expect(input).toHaveFocus();
  });

  it("readOnly属性が適用される", () => {
    render(<Input id="test" name="test" readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readonly");
  });

  it("defaultValueが適用される", () => {
    render(<Input id="test" name="test" defaultValue="デフォルト値" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("デフォルト値");
  });

  it("onFocusとonBlurイベントが呼ばれる", () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(<Input id="test" name="test" onFocus={handleFocus} onBlur={handleBlur} />);
    const input = screen.getByRole("textbox");
    input.focus();
    expect(handleFocus).toHaveBeenCalled();
    input.blur();
    expect(handleBlur).toHaveBeenCalled();
  });

  it("helperTextとerrorが両方ある場合、aria-describedbyが結合される", () => {
    render(<Input id="test" name="test" helperText="ヘルパー" error="エラー" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "test-helper test-error");
  });
