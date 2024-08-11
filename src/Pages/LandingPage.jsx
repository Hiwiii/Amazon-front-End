import Banner from '../components/Banner';
import FooterOne from '../components/FooterOne';
import ShippableProducts from '../components/ShippableProducts';
import SharedLayout from '../components/SharedLayout';

const LandingPage = () => {
    return (
        <SharedLayout>
            <section className="relative">
                <Banner />
                <div className="relative z-10">
                    <ShippableProducts />
                </div>
                <FooterOne />
            </section>
        </SharedLayout>
    );
};

export default LandingPage;
