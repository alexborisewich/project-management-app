export type SignUpPageProps = {
  dataTestId?: string;
};

export type SignUpPageState = Record<string, never>;

export type ErrorType = {
  data: {
    statusCode: number;
    message: string;
  };
  status: number;
};
