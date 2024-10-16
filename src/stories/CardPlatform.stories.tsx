import type { Meta, StoryObj } from "@storybook/react";
import CardPlatform from "../components/cardPlatform";
import { Link } from "../context/link";

const meta = {
  title: "Example/CardPlatform",
  component: CardPlatform,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    link: { control: "object" },
  },
  args: {
    link: { platform: "Github", link: "https://github.com" } as Link,
  },
} satisfies Meta<typeof CardPlatform>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
