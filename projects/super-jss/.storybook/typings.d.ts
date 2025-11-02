declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.mdx' {
  const MDXComponent: any;
  export default MDXComponent;
}
