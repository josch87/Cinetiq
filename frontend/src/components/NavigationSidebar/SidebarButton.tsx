import { Button, ButtonProps } from "@chakra-ui/react";

type SidebarButtonProps = ButtonProps & {
  isCurrentPage?: boolean;
};

export default function SidebarButton({
  isCurrentPage = false,
  ...props
}: Readonly<SidebarButtonProps>) {
  return (
    <Button
      color={isCurrentPage ? "brand.500" : "inherit"}
      variant="tertiary"
      justifyContent="start"
      iconSpacing="3"
      {...props}
    />
  );
}
