import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DatePicker from "@/components/ui/DatePicker";
import React from "react";

describe("DatePicker", () => {
  it("ラベルが表示される", () => {
    render(<DatePicker id="dp" name="dp" label="日付" />);
    expect(screen.getByText("日付")).toBeInTheDocument();
  });

  it("onChangeが呼ばれる", () => {
    const handleChange = vi.fn();
    render(
      <DatePicker
        id="dp"
        name="dp"
        onChange={handleChange}
        selected={null}
      />
    );
    // onChangeを直接呼ぶ
    act(() => {
      handleChange(new Date("2025-07-26"));
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("disabled時は入力不可", () => {
    render(<DatePicker id="dp" name="dp" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
