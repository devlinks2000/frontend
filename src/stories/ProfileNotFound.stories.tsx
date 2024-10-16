import type { Meta, StoryObj } from "@storybook/react";
import ProfileNotFound from "../components/profileNotFound";
import { MemoryRouter } from "react-router-dom";

const meta = {
  title: "Example/ProfileNotFound",
  component: ProfileNotFound,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileNotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => (
  <MemoryRouter>
    <ProfileNotFound {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
