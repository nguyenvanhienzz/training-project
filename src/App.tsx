import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRouter } from 'routers';
import { DefaultLayout } from 'Layouts';
import { Fragment, useEffect } from 'react';
import { useAppDispatch } from 'redux/hook';
import { fetchVendor } from 'pages/redux/vendorsSlice';
import { fetchBrand } from 'pages/redux/brandsSlice';
import { fetchCategoty } from 'pages/redux/categorySlice';
import { fetchShipping } from 'pages/redux/shippingSlice';
import { fetchRoles } from 'pages/redux/roleSlice';
import { fetchCountry } from 'pages/redux/countrySlice';

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategoty());
        dispatch(fetchVendor());
        dispatch(fetchBrand());
        dispatch(fetchShipping());
        dispatch(fetchRoles());
        dispatch(fetchCountry());
    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRouter.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : DefaultLayout;
                        const Pages = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Pages />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
