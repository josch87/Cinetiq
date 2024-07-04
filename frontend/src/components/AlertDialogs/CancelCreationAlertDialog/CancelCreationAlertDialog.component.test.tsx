import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CancelCreationAlertDialog, {
  CancelAlertDialogDisclosureType,
} from "./CancelCreationAlertDialog.tsx";

test("CancelContentCreationAlertDialog renders a heading", () => {
  const mockedHandleConfirmedCancel = jest.fn();
  const mockedCancelAlertDialogDisclosure: CancelAlertDialogDisclosureType = {
    isOpen: true,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  };

  render(
    <CancelCreationAlertDialog
      cancelAlertDialogDisclosure={mockedCancelAlertDialogDisclosure}
      handleConfirmedCancel={mockedHandleConfirmedCancel}
      entity="CONTENT"
    />
  );

  const heading = screen.getByText(/cancel content creation/i);
  expect(heading).toBeInTheDocument();
});

test("CancelContentCreationAlertDialog renders a description", () => {
  const mockedHandleConfirmedCancel = jest.fn();
  const mockedCancelAlertDialogDisclosure: CancelAlertDialogDisclosureType = {
    isOpen: true,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  };

  render(
    <CancelCreationAlertDialog
      cancelAlertDialogDisclosure={mockedCancelAlertDialogDisclosure}
      handleConfirmedCancel={mockedHandleConfirmedCancel}
      entity="CONTENT"
    />
  );

  const description = screen.getByText(
    "Are you sure you want to cancel creating new content? All entered data will be lost."
  );
  expect(description).toBeInTheDocument();
});

test("CancelContentCreationAlertDialog renders a 'No' button which closes the AlertDialog", () => {
  const mockedHandleConfirmedCancel = jest.fn();
  const mockedCancelAlertDialogDisclosure: CancelAlertDialogDisclosureType = {
    isOpen: true,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  };

  render(
    <CancelCreationAlertDialog
      cancelAlertDialogDisclosure={mockedCancelAlertDialogDisclosure}
      handleConfirmedCancel={mockedHandleConfirmedCancel}
      entity="CONTENT"
    />
  );

  const noButton = screen.getByRole("button", {
    name: /no/i,
  });
  expect(noButton).toBeInTheDocument();

  fireEvent.click(noButton);
  expect(mockedHandleConfirmedCancel).not.toHaveBeenCalled();
  expect(mockedCancelAlertDialogDisclosure.onClose).toHaveBeenCalled();
});

test("CancelContentCreationAlertDialog renders a 'Yes, Cancel' button which confirmes the cancel action", () => {
  const mockedHandleConfirmedCancel = jest.fn();
  const mockedCancelAlertDialogDisclosure: CancelAlertDialogDisclosureType = {
    isOpen: true,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  };

  render(
    <CancelCreationAlertDialog
      cancelAlertDialogDisclosure={mockedCancelAlertDialogDisclosure}
      handleConfirmedCancel={mockedHandleConfirmedCancel}
      entity="CONTENT"
    />
  );

  const yesButton = screen.getByRole("button", {
    name: /yes, cancel/i,
  });
  expect(yesButton).toBeInTheDocument();

  fireEvent.click(yesButton);
  expect(mockedHandleConfirmedCancel).toHaveBeenCalled();
});
