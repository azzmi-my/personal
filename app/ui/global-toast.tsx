import { Group, Notification, Text, ThemeIcon } from "@mantine/core";

import { useFetcher, useLoaderData } from "@remix-run/react";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { IconX } from "@tabler/icons-react";

const Provider = ToastPrimitive.Provider;
const Root = ToastPrimitive.Root;
const Title = ToastPrimitive.Title;
const Description = ToastPrimitive.Description;
// const Action = ToastPrimitive.Action;
const Close = ToastPrimitive.Close;
const Viewport = ToastPrimitive.Viewport;

interface ToastProps {
  description: string;
  status: "success" | "error";
}
const Toast = ({ description, status }: ToastProps) => {
  const fetcher = useFetcher();

  function handleClose() {
    fetcher.submit(
      {
        actionId: "closeToast",
      },
      {
        action: `/`,
        method: "post",
        replace: true,
      }
    );
  }
  return (
    <Provider duration={100000}>
      <Root className="ToastRoot" onOpenChange={handleClose}>
        <Title className="ToastTitle" />
        {/* <Action altText="" className="ToastAction" /> */}
        <Notification
          withCloseButton={false}
          color={status === "success" ? "teal" : "red"}
        >
          <Group>
            <Description>
              <Text sx={{ maxWidth: 250 }} lineClamp={3}>
                {description}
              </Text>
            </Description>
            <Close className="ToastClose">
              <ThemeIcon
                variant="light"
                color="gray"
                size="xs"
                aria-label="Close Modal"
                w="100%"
              >
                <IconX size={12} />
              </ThemeIcon>
              {/* <CloseButton w="100%" aria-label="Close modal" /> */}
            </Close>
          </Group>
        </Notification>
      </Root>
      <Viewport className="ToastViewport" />
    </Provider>
  );
};

export const GlobalToast = () => {
  const data = useLoaderData();
  if (!data?.toastMessage) return null;
  const { message, type } = data?.toastMessage;
  return (
    <Toast
      description={message}
      status={type === "success" ? "success" : "error"}
    />
  );
};
