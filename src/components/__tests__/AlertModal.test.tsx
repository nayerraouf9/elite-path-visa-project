import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AlertModal from "../AlertModal";

describe("AlertModal", () => {
  it("renders title and message and calls onClose when Ok clicked", () => {
    const onClose = vi.fn();
    render(
      <AlertModal
        title="Warning"
        message="Please Select Country Going To."
        onClose={onClose}
      />,
    );

    expect(screen.getByText("Warning")).toBeTruthy();
    expect(screen.getByText("Please Select Country Going To.")).toBeTruthy();

    const ok = screen.getByRole("button", { name: /ok/i });
    fireEvent.click(ok);
    expect(onClose).toHaveBeenCalled();
  });
});
