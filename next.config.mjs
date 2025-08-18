import withTM from "next-transpile-modules";

const withTranspileModules = withTM(["mui-tel-input"]);
const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default withTranspileModules(nextConfig);
