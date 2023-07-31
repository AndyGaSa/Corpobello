module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: [],
  },
};
//    sonar: 'sonar-scanner \
// -Dsonar.projectKey=Corpobello \
// -Dsonar.sources=. \
// -Dsonar.host.url=http://localhost:9000/ \
// -Dsonar.login=562c913057c45250e9d230ec20bcd75e7b2b2b75',
