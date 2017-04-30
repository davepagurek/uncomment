#!/usr/bin/env node
const fs = require('fs');

const json = require('comment-json');
const cli = require('cli');

cli.setApp(__dirname+'/package.json');

const options = cli.parse({
  in: ['i', 'A JSON file to remove comments from', 'file', null],
  out: ['o', 'A file to output JSON to', 'file', null]
});

if (!options.in) {
  return cli.error('An input file must be provided!');
}
if (!fs.existsSync(options.in)) {
  return cli.error('Could not read input file');
}

// `true` strips comments
const parsed = json.parse(fs.readFileSync(options.in).toString(), null, true);

fs.writeFileSync(
  options.out || `${options.in}.stripped.json`,
  json.stringify(parsed, null, 2) // 2 spaces
);
