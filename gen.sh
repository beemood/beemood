#!/usr/bin/env bash
npx nx g @bmod/gen:resource category controller @bmod/api-inventory
npx nx g @bmod/gen:resource department controller @bmod/api-inventory
npx nx g @bmod/gen:resource price controller @bmod/api-inventory
npx nx g @bmod/gen:resource price-level controller @bmod/api-inventory
npx nx g @bmod/gen:resource product controller @bmod/api-inventory
npx nx g @bmod/gen:resource product-variant controller @bmod/api-inventory
npx nx g @bmod/gen:resource quantity controller @bmod/api-inventory
npx nx g @bmod/gen:resource store controller @bmod/api-inventory
npx nx g @bmod/gen:resource tag controller @bmod/api-inventory