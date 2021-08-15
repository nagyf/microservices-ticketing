import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div className="container-fluid">
            <Header currentUser={currentUser} />
            <Component {...{ ...pageProps, currentUser }} />
        </div>
    );
};

AppComponent.getInitialProps = async (context) => {
    const client = buildClient(context.ctx);
    const data = await client
        .get('/api/users/currentuser')
        .then((res) => res.data || {})
        .catch((err) => {
            return {};
        });

    let pageProps = {};
    if (!!context.Component.getInitialProps) {
        pageProps = await context.Component.getInitialProps(context.ctx);
    }

    return {
        pageProps,
        ...data,
    };
};

export default AppComponent;
