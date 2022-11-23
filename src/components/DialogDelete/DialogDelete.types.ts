export type DialogDeleteProps = {
  handleClose: () => void;
  // handleConfirmDelete: () => void;
  userId: string;
  openModalConfirm: boolean;
  dataTestId?: string;
};

export type DialogDeleteState = Record<string, never>;
