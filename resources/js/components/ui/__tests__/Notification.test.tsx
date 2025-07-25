import { render, screen, act, waitFor } from "@testing-library/react";
import Notification from "../Notification";
import { useNotificationStore } from "../../../stores/useNotificationStore";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

beforeEach(() => {
  (globalThis as any).jest = {
    advanceTimersByTime: vi.advanceTimersByTime.bind(vi)
  };
  useNotificationStore.setState({ notifications: [] });
  vi.useFakeTimers();
  vi.setSystemTime('2024-01-01T00:00:00');
});
afterEach(() => {
  vi.useRealTimers();
});

it("通知が表示される", async () => {
  render(<Notification />);
  await act(async () => {
    useNotificationStore.getState().addNotification({
      id: "test-id",
      type: "success",
      message: "テスト通知",
    });
  });
  await act(async () => {
    vi.advanceTimersByTime(0);
  });
  await waitFor(() => {
    expect(screen.getByText("テスト通知")).toBeInTheDocument();
  });
});

it("一定時間後に通知が自動で消える", async () => {
  render(<Notification />);
  await act(async () => {
    useNotificationStore.getState().addNotification({
      id: "auto-id",
      type: "success",
      message: "自動消去",
    });
  });
  await act(async () => {
    vi.advanceTimersByTime(0);
  });
  await waitFor(() => {
    expect(screen.getByText("自動消去")).toBeInTheDocument();
  });
  await act(async () => {
    vi.runOnlyPendingTimers();
  });
  await waitFor(() => {
    expect(screen.queryByText("自動消去")).not.toBeInTheDocument();
  });
});

it("複数通知が同時に表示される", async () => {
  render(<Notification />);
  await act(async () => {
    useNotificationStore.getState().addNotification({ id: "id1", type: "success", message: "通知1" });
    useNotificationStore.getState().addNotification({ id: "id2", type: "error", message: "通知2" });
  });
  expect(screen.getByText("通知1")).toBeInTheDocument();
  expect(screen.getByText("通知2")).toBeInTheDocument();
});

it("閉じるボタンで通知が消える", async () => {
  render(<Notification />);
  await act(async () => {
    useNotificationStore.getState().addNotification({ id: "close-id", type: "success", message: "閉じるテスト" });
  });
  await act(async () => {
    vi.advanceTimersByTime(0);
  });
  const closeBtn = screen.getByRole("button", { name: /閉じる/ });
  await user.click(closeBtn);
  await waitFor(() => {
    expect(screen.queryByText("閉じるテスト")).not.toBeInTheDocument();
  });
});

it("typeごとにスタイルが変わる", async () => {
  render(<Notification />);
  await act(async () => {
    useNotificationStore.getState().addNotification({ id: "success-id", type: "success", message: "成功" });
    useNotificationStore.getState().addNotification({ id: "error-id", type: "error", message: "失敗" });
  });
  const success = screen.getByText("成功").parentElement;
  const error = screen.getByText("失敗").parentElement;
  expect(success).toHaveClass("bg-green-500");
  expect(error).toHaveClass("bg-red-500");
});


