interface LogErrorParams {
  errorContent: string;
  errorTitle: string;
}

export const logError = ({ errorContent, errorTitle }: LogErrorParams) => {
  console.error(
    `\x1b[41m\x1b[37m[ERROR]\x1b[0m ${errorTitle}, check console for more details.`
  );
  console.debug(`${errorContent}\n---\n`);
};
