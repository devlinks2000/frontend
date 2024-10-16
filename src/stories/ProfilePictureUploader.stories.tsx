import type { Meta, StoryObj } from "@storybook/react";
import ProfilePictureUploader from "../components/profileDetails/profilePictureUploader";
import { LinksProvider } from "../context/link";

const meta = {
  title: "Example/ProfilePictureUploader",
  component: ProfilePictureUploader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProfilePictureUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => (
  <LinksProvider>
    <ProfilePictureUploader {...args} />
  </LinksProvider>
);

export const Default = Template.bind({});
Default.args = {};
