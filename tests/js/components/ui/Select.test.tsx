import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "@/components/ui/Select";
import React from "react";

describe("Select", () => {
  it("ラベルが表示される", () => {
    render(<Select id="test" name="test" label="セレクトラベル" options={[{ value: "1", label: "一" }]} />);
    expect(screen.getByText("セレクトラベル")).toBeInTheDocument();
  });

  it("optionsが正しく表示される", () => {
    render(<Select id="test" name="test" options={[{ value: "1", label: "一" }, { value: "2", label: "二" }]} />);
    expect(screen.getByText("一")).toBeInTheDocument();
    expect(screen.getByText("二")).toBeInTheDocument();
  });

  it("選択値変更でonChangeが呼ばれる", () => {
    const handleChange = vi.fn();
    render(<Select id="test" name="test" options={[{ value: "1", label: "一" }]} onChange={handleChange} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("disabled時は選択不可", () => {
    render(<Select id="test" name="test" options={[{ value: "1", label: "一" }]} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("エラー時は赤枠とエラーメッセージが表示される", () => {
    render(<Select id="test" name="test" error="必須です" options={[{ value: "1", label: "一" }]} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("border-red-500");
    expect(screen.getByText("必須です")).toBeInTheDocument(); // エラーメッセージが表示される   
  });

  it("placeholderが表示される", () => {
    render(<Select id="test" name="test" placeholder="選択してください" options={[{ value: "1", label: "一" }]} />);
    expect(screen.getByText("選択してください")).toBeInTheDocument();
  });

  it("valueが設定されている場合、選択肢が正しく表示される", () => {
    render(<Select id="test" name="test" value="1" onChange={() => {}} options={[{ value: "1", label: "一" }, { value: "2", label: "二" }]} />);
    expect(screen.getByRole("combobox")).toHaveValue("1");
    expect(screen.getByText("一")).toBeInTheDocument();
  });

  it("valueが空文字の場合、placeholderが表示される", () => {
    render(<Select id="test" name="test" value="" placeholder="選択してください" onChange={() => {}} options={[{ value: "1", label: "一" }]} />);
    expect(screen.getByText("選択してください")).toBeInTheDocument();
  });

  it("aria-labelが設定されている場合、正しく表示される", () => {
    render(<Select id="test" name="test" aria-label="テストセレクト" options={[{ value: "1", label: "一" }]} />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-label", "テストセレクト");
  });

  it("success時は緑枠が表示される", () => {
    render(<Select id="test" name="test" success options={[{ value: "1", label: "一" }]} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("border-green-500");
  });

  it("helperTextが表示される", () => {
    render(<Select id="test" name="test" helperText="補助テキスト" options={[{ value: "1", label: "一" }]} />);
    expect(screen.getByText("補助テキスト")).toBeInTheDocument();
  });

  it("errorとhelperTextが両方ある場合、両方表示される", () => {
    render(
      <Select
        id="test"
        name="test"
        error="エラー"
        helperText="補助"
        options={[{ value: "1", label: "一" }]}
      />
    );
    expect(screen.getByText("エラー")).toBeInTheDocument();
    expect(screen.getByText("補助")).toBeInTheDocument();
  });

  it("classNameが追加される", () => {
    render(<Select id="test" name="test" className="custom-class" options={[{ value: "1", label: "一" }]} />);
    expect(screen.getByRole("combobox")).toHaveClass("custom-class");
  });

  it("propsがselectに渡される", () => {
    render(<Select id="test" name="test" data-testid="my-select" options={[{ value: "1", label: "一" }]} />);
    expect(screen.getByTestId("my-select")).toBeInTheDocument();
  });

  it("自動生成idが使われる場合、labelのhtmlForとselectのidが一致する", () => {
    render(<Select name="test" label="ラベル" options={[{ value: "1", label: "一" }]} />);
    const label = screen.getByText("ラベル");
    const select = screen.getByRole("combobox");
    expect(label).toHaveAttribute("for", select.getAttribute("id"));
  });

  it("aria-describedbyがhelperTextとerror両方の場合に両方含む", () => {
    render(
      <Select
        id="test"
        name="test"
        error="エラー"
        helperText="補助"
        options={[{ value: "1", label: "一" }]}
      />
    );
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-describedby");
    const describedBy = select.getAttribute("aria-describedby");
    expect(describedBy).toMatch(/test-helper/);
    expect(describedBy).toMatch(/test-error/);
  });

  it("optionsが空配列の場合、placeholderのみ表示される", () => {
    render(<Select id="test" name="test" placeholder="選択してください" options={[]} />);
    expect(screen.getByText("選択してください")).toBeInTheDocument();
    expect(screen.queryAllByRole("option")).toHaveLength(1);
  });
  
});
