import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device=width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf=8" />
      <link re="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
    title: 'EP Next JS Demo',
    keywords: 'Elastic Path Next.js',
    description: 'Demo using Next.js to power the Elastic Patch Commerce Cloud'
}
export default Meta;
