import buildQuery from '..';

describe('DB module', () => {
  describe('buildQuery()', () => {
    it('converts parameterised queries from named attributes to pg format', () => {
      const query = 'SELECT * FROM myTable WHERE id = $id AND name = $name AND colour = $colour';
      const params = { id: 'foo', name: 'bar', colour: 'baz' };

      expect(buildQuery(query, params)).toEqual([
        'SELECT * FROM myTable WHERE id = $1 AND name = $2 AND colour = $3',
        ['foo', 'bar', 'baz']
      ]);
    });

    it('returns the original query if parameters are not supplied', () => {
      const query = 'SELECT * FROM myTable WHERE id = $id AND name = $name AND colour = $colour';
      expect(buildQuery(query, {})).toEqual([query]);
    });

    it('returns the original query if there are no params in it', () => {
      const query = 'SELECT * FROM myTable WHERE id = 1';
      expect(buildQuery(query, { foo: 'bar' })).toEqual([query]);
      expect(buildQuery(query, {})).toEqual([query]);
    });

    it('throws if a named param is not supplied', () => {
      const query = 'SELECT * FROM myTable WHERE id = $id';
      expect(() => buildQuery(query, { foo: 'bar' })).toThrow();
    });
  });
});
