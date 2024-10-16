import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "../components/login/form";
import { MemoryRouter } from "react-router-dom";

const meta = {
  title: "Example/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => (
  <MemoryRouter>
    <LoginForm {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
