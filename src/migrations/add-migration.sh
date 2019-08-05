#!/bin/bash

function print_usage() {
  echo 'USAGE: npm run add-migration "Name of the migration"'
}

function migration_template() {
  local VERSION=$1
  local NAME=$2

  echo "import update from 'immutability-helper'
export default function (state) {
  // TODO FIXME: Write migration $NAME

  state = update(state, { version: {\$set: '$VERSION'} })
  return state
}"
}

function parse_filedate() {
    echo `echo $NAME |
    awk '{
      printf "%d-%02d-%02dT%02d:%02d:%02d+00:00",
      substr($1,0,4),
      substr($1,5,2),
      substr($1,7,2),
      substr($1,10,2),
      substr($1,12,2),
      substr($1,14,2)
    }'`
}

function recreate_migrations() {
  local DIR="src/migrations/migrations"
  local MIGRATIONS=`ls -1 $DIR`

  for FILE in $MIGRATIONS; do
    local NAME=${FILE:0:15}
    local DATE=`parse_filedate $NAME`

    echo "import migration$NAME from './migrations/$FILE'"
  done

  echo ""
  echo "export default ["

  for FILE in $MIGRATIONS; do
    local NAME=${FILE:0:15}
    local DATE=`parse_filedate $NAME`

    echo "  { 'version': '$DATE', migration: migration$NAME },"
  done

  echo "]"
}

function process() {
  if [ -z "$1" ]; then
    echo 'error: no name provided'
    print_usage
    exit 1
  fi

  local NAME=$1; NAME="${NAME// /-}"; NAME="${NAME,,}"
  local VERSION=`date -u -Iseconds`
  local DATE=`date -u "+%Y%m%dT%H%M%S"`
  local FILENAME="src/migrations/migrations/$DATE-$NAME.js"

  migration_template $VERSION $NAME > $FILENAME

  if [ -f $FILENAME ]; then
    echo "Created a new migration template $FILENAME"
  else
    echo "error: could not create a migration template $FILENAME"
    exit 2
  fi

  local MIGRATIONS_FILE="src/migrations/migrations.js"
  rm -r $MIGRATIONS_FILE
  recreate_migrations > $MIGRATIONS_FILE
}

process "$@"
