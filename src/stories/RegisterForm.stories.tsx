import type { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "../components/register/form";
import { MemoryRouter } from "react-router-dom";

const meta = {
  title: "Example/RegisterForm",
  component: RegisterForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => (
  <MemoryRouter>
    <RegisterForm {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
