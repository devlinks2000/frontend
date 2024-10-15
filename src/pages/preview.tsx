import PreviewHeader from "../components/preview/header";
import CardContentView from "../components/preview/cardContent";
import { useLinks } from "../context/link";
import { motion } from "framer-motion";
import PreviewLayout from "../layout/preview";
import { Box } from "@mui/material";
import SharedFooter from "../components/preview/sharedFooter";

const PreviewCardPage = () => {
  const { avatar, getValues } = useLinks();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PreviewLayout>
        <PreviewHeader />
        <Box
          height={"100vh"}
          width={"100vw"}
          position={"absolute"}
          left={0}
          top={0}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <CardContentView
            avatarUrl={avatar}
            name={`${getValues("firstName")} ${getValues("lastName")}`}
            email={getValues("email")}
            links={getValues("links")}
          />
          <SharedFooter />
        </Box>
      </PreviewLayout>
    </motion.div>
  );
};

export default PreviewCardPage;
