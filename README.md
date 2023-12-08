
# pg-named-params

Simple query builder function for pg that let's you use named parameters instead of positional arguments to enhance readability.

## Installation

```bash
npm i @badrequest400/pg-named-params
```

## Usage

```js
import { build } from 'pg-named-params';

const query = build(
  `SELECT * FROM users
    WHERE name = $name
    AND age > $age
    AND status = $status
    AND type = $type
    AND created_at > NOW() - INTERVAL '$daysAgo day'
    AND organisation_id = $organisationId
  `,
  { name: 'John', age: 23, status: 'active', type: 'user', daysAgo: 7, organisationId: 1 }
);

pg.query(query);
```

Easier on the eyes than:

```js
pg.query(
  `SELECT * FROM users
    WHERE name = $1
    AND age > $2
    AND status = $3
    AND type = $4
    AND created_at > NOW() - INTERVAL '$5 day'
    AND organisation_id = $6
  `,
  [ 'John', 23, 'active', 'user', 7, 1 ]
);
```
