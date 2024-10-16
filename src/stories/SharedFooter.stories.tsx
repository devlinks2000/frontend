import type { Meta, StoryObj } from "@storybook/react";
import SharedFooter from "../components/preview/sharedFooter";

const meta = {
  title: "Example/SharedFooter",
  component: SharedFooter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
  },
  args: {
    id: "12345",
  },
} satisfies Meta<typeof SharedFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
