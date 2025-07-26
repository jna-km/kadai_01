import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";
import { useNotificationStore } from "@/stores/useNotificationStore";

describe("useNotificationStore", () => {
  beforeEach(() => {
    useNotificationStore.setState({ notifications: [] });
  });

  it("通知を追加できる", () => {
    const { addNotification } = useNotificationStore.getState();
    act(() => {
      addNotification({ type: "success", message: "成功" });
    });
    expect(useNotificationStore.getState().notifications.length).toBeGreaterThan(0);
    expect(useNotificationStore.getState().notifications[0].message).toBe("成功");
  });

  it("通知を削除できる", () => {
    const { addNotification, removeNotification } = useNotificationStore.getState();
    act(() => {
      addNotification({ type: "error", message: "エラー" });
    });
    const id = useNotificationStore.getState().notifications[0].id;
    act(() => {
      removeNotification(id);
    });
    expect(useNotificationStore.getState().notifications.length).toBe(0);
  });
});
