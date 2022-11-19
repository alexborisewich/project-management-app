export type SignInPageProps = {
  dataTestId?: string;
};

export type ErrorType = {
  data: {
    statusCode: number;
    message: string;
  };
  status: number;
};

export type SignInPageState = Record<string, never>;
