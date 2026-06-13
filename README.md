# OSAID Compatibility Matrix

A vendor-neutral, community-maintained knowledge base of **open-source automated insulin delivery (OSAID)** compatibility — which insulin pumps and CGM sensors can be driven by which open-source loop (Loop, Trio, AndroidAPS), plus per-country availability, funding and community.

It is plain TypeScript data with a tiny assembler. No build step, no runtime dependencies. Consume it as a git submodule, or (later) as an npm package.

## Data model

Two layers, deliberately separated:

1. **Catalog** (`catalog/`) — global, country-agnostic. Devices, their variants, and their open-source compatibility. *Whether AndroidAPS can drive a DANA-i is a software fact, true everywhere*, so it is stated once here.
2. **Country overlay** (`countries/`) — per-country. Which catalog devices are surfaced in a country, their local availability/subsidy/naming, plus the country's official position, funding schemes and community groups.

[`view.ts`](view.ts) joins the two into a `CountryView` — the flat shape a page renders.

```
catalog/algorithms.ts   the matrix columns (Loop, Trio, AndroidAPS)
catalog/pumps.ts        global pump catalog
catalog/sensors.ts      global CGM catalog
countries/au.ts …       per-country overlays
groups.ts               global community groups
rig.ts                  combine a pump + sensor into one status (the weaker of the two)
view.ts                 getCountryView(code) — the assembler
types.ts                the model
```

### Types are derived from the data

The id unions are computed from the catalog with `as const satisfies`, so the type system mirrors the data exactly:

- `AlgorithmId` is exactly the ids in `catalog/algorithms.ts`.
- `DeviceId` is exactly the ids in the pump + sensor catalogs.
- `Compat` is keyed by `AlgorithmId`, so a typo'd algorithm key is a **compile error**.
- A country listing `ref` is typed `DeviceId | \`${DeviceId}:${variant}\``, so a reference to a device that doesn't exist won't compile.

A `Device` and its `Variant`s share one base, `DeviceProfile` — the overridable facts (`specs`, `compat`, `commercialAid`, `pairsWith`, `blurb`, `sources`). A variant is a partial override of its parent over exactly those fields; the assembler merges variant over device over country, field by field.

### Vendor-neutral extension slot

Downstream products often want to attach their own per-device facts (for example, *which cloud connector imports this device's data*). Rather than baking that into the shared catalog, `DeviceProfile` carries a typed `ext` slot and `getCountryView` takes an optional enricher:

```ts
import { getCountryView } from 'osaid-compatibility-matrix';

interface MyExt { importRoute?: string }

const view = getCountryView<MyExt>('au', {
  enrich: (device) => ({ importRoute: lookupRoute(device.deviceId) })
});
// view.pumps[0].ext?.importRoute is typed
```

The shared catalog never sets `ext`; it stays neutral.

## Contributing

The data is the project. PRs that add a device, fix a compatibility status, or add a country are very welcome.

**Add or correct a device** — edit `catalog/pumps.ts` or `catalog/sensors.ts`. Give it a unique kebab-case `id`, fill in `compat` for each algorithm (omit an algorithm to mean "no"), and cite your sources with `sources: [{ label, url }]`. Use `variants` for sub-models that differ in specs or compatibility (sensor pairing, firmware, region).

**Add a country** — copy `countries/au.ts`, reference catalog devices by `ref` (`'omnipod-5'` or `'omnipod-5:g7'`), and register it in `countries/index.ts`. Compatibility is inherited from the catalog; the overlay only carries local availability, funding, official stance and community.

**Every claim should be sourced.** Statuses and notes carry `link`/`sources`; official positions carry a `source` and `asOf`.

### Checks

```bash
pnpm install
pnpm typecheck   # tsc — most reference errors fail here
pnpm test        # integrity: unique ids, known refs, every country resolves
```

CI runs both on every PR.

## License

MIT. See [LICENSE](LICENSE).
