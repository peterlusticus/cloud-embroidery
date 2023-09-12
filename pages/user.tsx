import Head from "next/head";
import Container from "../components/container/container";
import { suffix } from "../components/data/data";
import UserDescription from "../components/user/userDescription";

const LoginPage = () => {
    return (
        <div>
            <Head>
                <title>Profil {suffix}</title>
                <meta property="og:title" content="Profil" key="title" />
            </Head>
            <Container>
                <div className="flex justify-center w-screen">
                    <div className="flex flex-col px-6 max-w-4xl w-screen">
                        <UserDescription></UserDescription>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;