import { useParams, useNavigate } from "react-router-dom";
import CardContentView from "../components/preview/cardContent";
import { Link, LinksState } from "../context/link";
import { useEffect, useState } from "react";
import LinkService from "../services/links";
import PreviewLayout from "../layout/preview";
import LoadingView from "../components/loadingView";
import _ from "lodash";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import ProfileNotFound from "../components/profileNotFound";
import SharedFooter from "../components/preview/sharedFooter";

const PreviewDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [linkData, setLinkData] = useState<LinksState>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    const fetchLink = async () => {
      setLoading(true);
      try {
        const linkData = await LinkService.getLinkById(id);
        setLinkData(linkData);
        if (!linkData) {
          setDataNotFound(true);
        }
      } catch (error) {
        setDataNotFound(true);
        console.error("Error fetching link:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [id, navigate]);

  return (
    <>
      {dataNotFound ? (
        <PreviewLayout>
          <ProfileNotFound />
        </PreviewLayout>
      ) : loading ? (
        <LoadingView />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <PreviewLayout>
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
                avatarUrl={_.get(linkData, "avatar", "") as string}
                name={`${_.get(linkData, "firstName", "")} ${_.get(
                  linkData,
                  "lastName",
                  ""
                )}`}
                email={_.get(linkData, "email", "")}
                links={_.get(linkData, "links", "") as Link[]}
              />
              <SharedFooter id={_.get(linkData, "id", "")} />
            </Box>
          </PreviewLayout>
        </motion.div>
      )}
    </>
  );
};

export default PreviewDetailsPage;
