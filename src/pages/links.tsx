import LinksLayout from "../layout/links";
import LinkForm from "../components/link";
import ProfileDetails from "../components/profileDetails";
import { motion } from "framer-motion";
import { useLinks } from "../context/link";

export default function LinksPage() {
  const { view } = useLinks();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LinksLayout>
        <>
          {view === "profile" && <ProfileDetails />}
          {view === "links" && <LinkForm />}
        </>
      </LinksLayout>
    </motion.div>
  );
}
