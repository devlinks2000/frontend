import type { Meta, StoryObj } from "@storybook/react";
import ProfileDetails from "../components/profileDetails";
import { LinksProvider } from "../context/link";

const meta = {
  title: "Example/ProfileDetails",
  component: ProfileDetails,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => (
  <LinksProvider>
    <ProfileDetails {...args} />
  </LinksProvider>
);

export const Default = Template.bind({});
Default.args = {};
