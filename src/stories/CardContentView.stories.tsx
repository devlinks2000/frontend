import type { Meta, StoryObj } from "@storybook/react";
import CardContentView from "../components/preview/cardContent";
import { Link } from "../context/link";

const meta = {
  title: "Example/CardContentView",
  component: CardContentView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    avatarUrl: { control: "text" },
    name: { control: "text" },
    email: { control: "text" },
    links: { control: "object" },
  },
  args: {
    avatarUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    links: [{ platform: "Github", link: "https://github.com" }] as Link[],
  },
} satisfies Meta<typeof CardContentView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
