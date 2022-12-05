export type ConfirmationModalProps = {
  handleConfirm: (id: string) => void;
  id: string;
  text: string;
  btnAgr: string;
  btnDisAgr: string;
  tooltip: string;
  dataTestId?: string;
};

export type ConfirmationModalState = Record<string, never>;
