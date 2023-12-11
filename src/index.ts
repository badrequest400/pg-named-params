const extractRegex = new RegExp(/\$\w+/, 'g');

type Variables = { [key: string]: string | number };

type Result = {
  text: string;
  values: (string | number)[] | null;
}

export function buildQuery(queryText: string, variables: Variables): Result {
  if (!variables || Object.keys(variables).length === 0) {
    return { text: queryText, values: null };
  }

  const matches = queryText.match(extractRegex)
    ?.map(x => x.substr(1));
  if (!matches || matches.length === 0) {
    return { text: queryText, values: null };
  }

  const params = matches.reduce((acc: (string | number)[], k) => {
    if (!variables[k]) throw new Error(`Key ${k} missing from arguments`);
    return [...acc, variables[k]];
  }, []) ?? [];

  let idx = 1;
  const sanitisedQuery = queryText.replace(extractRegex, () => `$${idx++}`);

  return {
    text: sanitisedQuery,
    values: params,
  };
};

export default buildQuery;

export const build = buildQuery;
