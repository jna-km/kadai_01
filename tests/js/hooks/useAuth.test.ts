import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAuth } from "@/hooks/useAuth";

describe("useAuth", () => {
  it("初期状態で未認証", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.role).toBe(null);
  });

  it("setUserAndRoleで認証状態になる", () => {
    const { result } = renderHook(() => useAuth());
    act(() => {
      result.current.setUserAndRole({ id: 1, name: "user" }, "user");
    });
    expect(result.current.role).toBe("user");
  });

  it("setUserAndRole(null, null)で未認証状態になる", () => {
    const { result } = renderHook(() => useAuth());
    act(() => {
      result.current.setUserAndRole({ id: 1, name: "user" }, "user");
      result.current.setUserAndRole(null, null);
    });
    expect(result.current.role).toBe(null);
  });
});
