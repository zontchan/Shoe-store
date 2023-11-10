import Header from "./Header";
import Footer from "./Footer";

export default function Static(props) {
    return (
        <>
            <Header/>
            <main className={'container main'}>
                <div className="row">
                    <div className="col">
                        <div className="banner">
                            <img src={'/static/banner.jpg'} className="img-fluid" alt="К весне готовы!"/>
                                <h2 className="banner-header">К весне готовы!</h2>
                        </div>
                       {props.children}
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}