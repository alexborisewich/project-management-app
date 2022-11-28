export type ConfirmationModalProps = {
  handleClose: () => void;
  handleConfirm: (event: React.SyntheticEvent) => void;
  openModalConfirm: boolean;
  text: string;
  dataTestId?: string;
};

export type ConfirmationModalState = Record<string, never>;
