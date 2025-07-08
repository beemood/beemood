#!/usr/bin/env bash
npx beemood bundle-json -m .schemas/model.schema.json -o .schemas/model.json
npx beemood generate-types -m .schemas/model.json -o libs/types/src/lib/types.ts
