import type { Meta, StoryObj } from "@storybook/react";
import LoadingView from "../components/loadingView";

const meta = {
  title: "Example/LoadingView",
  component: LoadingView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
