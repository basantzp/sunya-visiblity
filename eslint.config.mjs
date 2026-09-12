import nextConfig from 'eslint-config-next';

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.tsbuildinfo',
      '.reticle/**',
      'next-env.d.ts',
    ],
  },
];

export default eslintConfig;
