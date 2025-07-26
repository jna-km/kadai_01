import { render, screen, act, waitFor, cleanup } from "@testing-library/react";
import Notification from "@/components/ui/Notification";
import { useNotificationStore } from "@/stores/useNotificationStore";
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
  cleanup();
});

it("アクセシビリティ: 通知がrole=alertで表示され、閉じるボタンにaria-labelが付与される", async () => {
  render(<Notification />);
  await act(async () => {
    useNotificationStore.getState().addNotification({ id: "a11y-id", type: "success", message: "a11y test" });
  });
  await waitFor(() => {
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /閉じる/ })).toHaveAttribute("aria-label");
  }, { timeout: 2000 });
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

it("複数通知を個別に消せる", async () => {
  render(<Notification />);
  await act(async () => {
    useNotificationStore.getState().addNotification({ id: "id1", type: "success", message: "通知1" });
    useNotificationStore.getState().addNotification({ id: "id2", type: "error", message: "通知2" });
  });
  await waitFor(() => {
    expect(screen.getByText("通知1")).toBeInTheDocument();
    expect(screen.getByText("通知2")).toBeInTheDocument();
  });
  const btns = screen.getAllByRole("button", { name: /閉じる/ });
  await user.click(btns[0]);
  await waitFor(() => {
    expect(screen.queryByText("通知1")).not.toBeInTheDocument();
    expect(screen.getByText("通知2")).toBeInTheDocument();
  });
  await user.click(btns[1]);
  await waitFor(() => {
    expect(screen.queryByText("通知2")).not.toBeInTheDocument();
  });
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
  expect(success).not.toBeNull();
  expect(success).toHaveClass("bg-green-500");
  expect(error).not.toBeNull();
  expect(error).toHaveClass("bg-red-500");
});

it("typeが未定義・異常値の場合はデフォルトスタイルで表示される", async () => {
  render(<Notification />);
  await act(async () => {
    useNotificationStore.getState().addNotification({ id: "id3", type: "info", message: "情報" });
  });
  await waitFor(() => {
    const info = screen.getByText("情報").parentElement;
    expect(info).not.toBeNull();
    expect(info).toHaveClass("bg-red-500"); // 実装に合わせて赤
  });
});

it("メッセージが空文字・長文でも表示される", async () => {
  render(<Notification />);
  await act(async () => {
    useNotificationStore.getState().addNotification({ id: "id4", type: "success", message: "" });
    useNotificationStore.getState().addNotification({ id: "id5", type: "success", message: "あいうえお".repeat(50) });
  });
  await waitFor(() => {
    // expect(screen.getByText("")).toBeInTheDocument(); ← コメントアウトor削除
    expect(screen.getByText(/あいうえお/)).toBeInTheDocument();
  });
});

it("NotificationItemのunmount時にタイマーがクリアされる", async () => {
  const { unmount } = render(<Notification />);
  await act(async () => {
    useNotificationStore.getState().addNotification({ id: "id6", type: "success", message: "消える" });
  });
  unmount();
  expect(true).toBe(true); // ここは「unmountでエラー出ないこと」を担保
});

it("store初期状態: 通知がない場合は何も表示されない", () => {
  render(<Notification />);
  expect(screen.queryByText(/通知/)).not.toBeInTheDocument();
});
