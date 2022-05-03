import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Categories from './Categories';
import Services from './Services';
import Service from './Service';
// import ServicesByCategory from './ServicesByCategory';

const ServicesDashboard = () => {
  return (
    <main>
        {/* <aside>
            <div className="toolbar">
                <p className="title">Servicios</p>
                <div className="options">
                    <ul>
                        <li>
                            <NavLink to="services">Servicios</NavLink>
                        </li>
                        <li>
                            <NavLink to="categories">Categorías</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </aside> */}
        <article>
            <div className="pages">
                <Routes>
                    <Route path="categories" exact element={<Categories />} />
                    <Route path="categories/:id" exact element={<Services />}>
                        <Route path=":id" element={<Service />} />
                    </Route>
                    <Route path="/" exact element={<Navigate to="categories" />} />
                </Routes>
            </div>
        </article>
    </main>
  );
}

export default ServicesDashboard;