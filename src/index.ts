const extractRegex = new RegExp(/\$\w+/, 'g');

type Variables = { [key: string]: string | number };
type Result = [string, (string | number)[]?];

export function buildQuery(queryText: string, variables: Variables): Result {
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

export const build = buildQuery;
