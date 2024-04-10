export const configAsyncLoader = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          DB_HOST: 'localhost-im-from-async-loader',
          DB_PORT: '3306',
          DB_USERNAME: 'test',
          DB_PASSWORD: 'test',
          DB_NAME: 'test',
        }),
      5000,
    ),
  );
