import MainLayout from "@layouts/MainLayout";
import Head from "next/head";

const HomePage = () => {
    return (
        <div>
            <Head>
                <title>Home Page</title>
            </Head>
            <MainLayout />
        </div>
    );
}

export default HomePage;