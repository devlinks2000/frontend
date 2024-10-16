import React from "react";
import { render, screen } from "@testing-library/react";
import LinkForm from "../../../components/link";

jest.mock("react-beautiful-dnd", () => ({
  DragDropContext: ({ children }: any) => <div>{children}</div>,
  Droppable: ({ children }: any) => (
    <div>{children({ droppableProps: {}, innerRef: jest.fn() })}</div>
  ),
  Draggable: ({ children }: any) => (
    <div>
      {children({
        draggableProps: {},
        dragHandleProps: {},
        innerRef: jest.fn(),
      })}
    </div>
  ),
}));

describe("LinkForm", () => {
  it("renders the header", () => {
    render(<LinkForm />);
    expect(screen.getByText(/customize your links/i)).toBeInTheDocument();
  });

  it("renders the add link button", () => {
    render(<LinkForm />);
    expect(
      screen.getByRole("button", { name: /\+ add new link/i })
    ).toBeInTheDocument();
  });
});
