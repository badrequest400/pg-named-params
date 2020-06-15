const extractRegex = new RegExp(/\$\w+/, 'g');

export const buildQuery = (queryText: string, variables: { [key: string]: string | number }): [string, (string | number)[]?] => {
  if (!variables || Object.keys(variables).length === 0) return [queryText];

  const matches = queryText.match(extractRegex)
    ?.map(x => x.substr(1));
  if (!matches || matches.length === 0) return [queryText];

  const params = matches.reduce((acc: (string | number)[], k) => {
    if (!variables[k]) throw new Error(`Key ${k} missing from arguments`);
    return [...acc, variables[k]];
  }, []);

  let idx = 1;
  const sanitisedQuery = queryText.replace(extractRegex, () => `$${idx++}`);

  return [sanitisedQuery, params];
};

export default buildQuery;
