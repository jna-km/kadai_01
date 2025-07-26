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
});
