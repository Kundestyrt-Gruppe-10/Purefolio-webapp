import '@testing-library/jest-dom/extend-expect';
declare const __BUILD_INFO__: {
  appBuildTime: string;
  appName: string;
  commitHash: string;
};

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
