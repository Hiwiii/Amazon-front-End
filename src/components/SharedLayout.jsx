import Header from './Header'
import HorizontalMenu from './HorizontalMenu'
import Footer from './Footer'

const SharedLayout = ({children}) => {
    return (
        <div>
            <Header />
            <HorizontalMenu />
            {children}
            <Footer/>
        </div>
    )
}

export default SharedLayout