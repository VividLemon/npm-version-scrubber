# Version scrubber

All this does is take in an object of `Projects` (types.ts), with devDependencies and dependencies and fetches their latest versions on `NPM`. It then pastes it into `updatedProjects.json`

Export default an object of `Projects` at `src/object.ts`. Example:

```ts
export default {
    versioner: {
        devDependencies: {
            'bun-types': 'latest',
            '@typescript-eslint/eslint-plugin': '^6.4.1',
            '@typescript-eslint/parser': '^6.4.1',
            'eslint': '^8.47.0',
            'eslint-config-prettier': '^9.0.0',
            'eslint-define-config': '^1.23.0',
            'eslint-plugin-prettier': '^5.0.0',
            'prettier': '^3.0.2',
            'typescript': '^5.1.6',
        },
        peerDependencies: {
            typescript: '^5.1.6',
        },
    },
} satisfies Projects
```
