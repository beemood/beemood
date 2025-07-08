#!/usr/bin/env bash
npx beemood bundle-json -m ./model.schema.json -o ./model.json
npx beemood generate-types -m ./model.json -o ./../libs/types/src/lib/types.ts
