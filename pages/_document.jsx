import Document, { Head, Html, Main, NextScript } from 'next/document';
class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    {/* Thêm các meta tags, CSS, JS, và các thiết lập khác */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;