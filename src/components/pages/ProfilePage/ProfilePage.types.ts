export type ProfilePageProps = {
  dataTestId?: string;
};

export type ErrorApi = {
  data: {
    statusCode: number;
    message: string;
  };
  status: number;
};

export type ProfilePageState = Record<string, never>;
