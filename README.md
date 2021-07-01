# React JSON Analyse

A React component for performing analysis on data structures in JSON format. This component is useful for anyone who wants to easily add lightweight business intelligence to their React app.

### Features

- Calculate totals and averages
- Perform dataset grouping
- Specify where clauses

### Usage

```sh
npm install --save react-json-analyse
```

```js
import JsonAnalyse from 'react-json-analyse';
```

```js
// Sample data. Can be an array or an object.
const data = {};

const onSubmit = (data) => {
    // Do something with your data
};

<JsonAnalyse json={data} onSubmit={onSubmit} />
```

### Contributing

Pull requests are welcome.

### License

MIT