import { render, screen, act } from "@testing-library/react";
import Notification from "../Notification";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { vi } from "vitest";

beforeEach(() => {
  vi.useFakeTimers();
  useNotificationStore.setState({ notifications: [] });
});

describe("Notification Component", () => {
  it("表示されるべき通知が表示される", async () => {
    render(<Notification />);
    act(() => {
      useNotificationStore.getState().addNotification({
        id: "1",
        type: "success",
        message: "ログイン成功",
      });
    });

    expect(await screen.findByText("ログイン成功")).toBeInTheDocument();
  });

  it("一定時間後に通知が消える", async () => {
    render(<Notification />);
    act(() => {
      useNotificationStore.getState().addNotification({
        id: "1",
        type: "success",
        message: "削除テスト",
      });
    });

    expect(await screen.findByText("削除テスト")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.queryByText("削除テスト")).toBeNull();
  });
});
