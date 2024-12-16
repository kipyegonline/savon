import { Box, Flex, TextInput, Text, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL, submitPayload } from "config";
import React from "react";
import { SavonNotification } from "./notification";
import { updatePhoto } from "api";

type Photo = { title: string; album_id: string };
type Props = {
  onClose: () => void;
  id: string;
  edit?: boolean;
  title?: string;
};

const defaultState = { success: "", error: "" };
export default function AddPhoto({
  onClose,
  id,
  edit = false,
  title = "",
}: Props) {
  const url = BASE_URL + "/photos";
  const editUrl = BASE_URL + `/photos/${id}`;

  const [status, setStatus] = React.useState(defaultState); // ui feedback
  const form = useForm<Photo>({
    mode: "uncontrolled",
    initialValues: {
      title: title,
      album_id: id,
    },

    validate: {
      title: (value) =>
        value.trim().length < 3 ? "Please add an image title." : null,
    },
  });

  // mutate to server

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (values: Photo) =>
      edit
        ? await updatePhoto(editUrl, values)
        : await submitPayload(url, values),
    onSuccess: () => {
      setStatus({
        ...status,
        success: edit
          ? "image updated successfully."
          : "image added  successfully.",
      });

      setTimeout(() => {
        setStatus(defaultState);
        onClose();
      }, 3000);
      form.reset(), form.clearErrors();
    },
    onError: () => {
      setStatus({ ...status, error: "something went wrong" });
      setTimeout(() => setStatus(defaultState), 3000);
    },
  });
  const handleSubmit = async (values: Photo) => {
    if (form.isValid()) {
      mutate(values);
    }
  };
  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction={"column"} gap="md">
          <Box p="md">
            <Text className="!bg-accent !text-white !p-4">
              {edit
                ? `This will change the title of the photo`
                : `Please note, this system willonly use one image whose title and
              other info can be updated in the backend.`}
            </Text>
          </Box>
          <TextInput
            withAsterisk
            label="Image title"
            placeholder="Picha yangu"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
          <Button loading={isLoading} type="submit" fullWidth>
            {edit ? "Update image title" : " Add Image"}
          </Button>

          {/** show user notifications */}
          {status.success && (
            <SavonNotification success={true} message={status.success} />
          )}
          {status.error && (
            <SavonNotification success={true} message={status.error} />
          )}
        </Flex>
      </form>
    </Box>
  );
}
