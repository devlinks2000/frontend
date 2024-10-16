import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
import { linkFormSchema } from "../components/schemas/link";
import _ from "lodash";
import { Outlet } from "react-router-dom";
import LinkService from "../services/links";
import LoadingView from "../components/loadingView";
import { errorAlert, successAlert } from "../utils/alertMessage";

export interface Link {
  platform: string;
  link: string;
}

export interface LinksState {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?:
    | {
        filename: string;
        content: string;
        contentType: string;
      }
    | string;
  links: Link[]; // This should remain required
  id?: string;
}

const initialState: LinksState = {
  firstName: "",
  lastName: "",
  email: "",
  avatar: undefined,
  links: [],
  id: null,
};

const LinksContext = createContext<{
  control: Control<LinksState, any> | null;
  errors: FieldErrors<LinksState>;
  handleSubmit: UseFormHandleSubmit<LinksState, undefined> | null;
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<LinksState, "links">;
  fields: FieldArrayWithId<LinksState, "links", "id">[];
  setView: React.Dispatch<React.SetStateAction<"links" | "profile">>;
  view: "links" | "profile";
  setValue: UseFormSetValue<LinksState>;
  getValues: UseFormGetValues<LinksState>;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  avatar: string;
  onLinkSubmit: (data: LinksState) => Promise<void>;
  linkLoading: boolean;
}>({
  control: null,
  errors: {},
  handleSubmit: null,
  move: () => {},
  remove: () => {},
  append: () => {},
  fields: [],
  setView: () => {},
  view: "links",
  setValue: null,
  getValues: null,
  setAvatar: null,
  avatar: null,
  onLinkSubmit: async () => {},
  linkLoading: false,
});

interface LinksProviderProps {
  children?: ReactElement;
}

export function LinksProvider({ children }: LinksProviderProps) {
  const [view, setView] = useState<"links" | "profile">("links");
  const [avatar, setAvatar] = useState<string>(null);
  const [loading, setLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<LinksState>({
    resolver: yupResolver(linkFormSchema) as any,
    defaultValues: initialState,
  });

  useEffect(() => {
    if (_.get(errors, "links.root")) {
      const errorMessage = _.get(
        errors,
        "links.root.message",
        "Unexpected Error"
      );

      errorAlert(errorMessage);
    }
  }, [errors]);

  useEffect(() => {
    if (view === "profile" && errors.links) {
      errorAlert("Links have errors. Please correct them before submitting.");
    }
  }, [errors, view]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const linkData = await LinkService.getSecureLink();

      if (linkData.avatar) setAvatar(linkData.avatar);

      reset(linkData);
    } catch (error) {
      console.error(error);

      const errorMessage = _.get(
        error,
        "response.data.message",
        "Error to get the Link Data."
      );

      errorAlert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const { fields, append, remove, move } = useFieldArray<LinksState>({
    control: control!,
    name: "links",
  });

  const onLinkSubmit = async (data: LinksState) => {
    setLinkLoading(true);
    try {
      const result = await LinkService.createLink(data);
      setValue("id", _.get(result, "item.id"));
      const message = _.get(
        result,
        "item.message",
        "Link created successfully."
      );
      successAlert(message);
    } catch (error) {
      console.error(error);
      const messageError = _.get(
        error,
        "response.data.message",
        "Error creating link."
      );
      errorAlert(messageError);
    } finally {
      setLinkLoading(false);
    }
  };

  return (
    <LinksContext.Provider
      value={{
        control,
        errors,
        handleSubmit,
        fields,
        append,
        remove,
        move,
        view,
        setView,
        setValue,
        getValues,
        setAvatar,
        avatar,
        linkLoading,
        onLinkSubmit,
      }}
    >
      {loading ? <LoadingView /> : <>{children ?? <Outlet />}</>}
    </LinksContext.Provider>
  );
};

export const useLinks = () => useContext(LinksContext);
