import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import { withMinumumStaffRole } from "./rbac-hoc";
import SectionTitle from "./section-title";
import SidebarLink from "./sidebar-link";

function NavMenu({ onMenuItemClick }) {
    const [baseUrl] = useState("/");
    const [sections] = useState([
        {
            title: "Sub Section",
            role: "Admin",
            pages: [
                {
                    url: "/page-one",
                    pageName: "Page 1",
                    icon: "fa fa-users",
                    active: false,
                    role: "Admin",
                },
                {
                    url: "/page-one",
                    pageName: "Page 1",
                    icon: "fa fa-users",
                    active: false,
                    role: "Senior Admin",
                },
            ],
        },
        {
            title: "Sub Section",
            role: "Management",
            pages: [
                {
                    url: "/page-two",
                    pageName: "Page 2",
                    icon: "fa fa-address-card",
                    active: false,
                    role: "Management",
                },
                {
                    url: "/page-two",
                    pageName: "Page 4",
                    icon: "fa fa-address-card",
                    active: false,
                    role: "Owner",
                },
            ],
        },
    ]);

    const getRestrictedLink = (page) => {
        let RestrictedLink = withMinumumStaffRole(page.role)(SidebarLink);
        return (
            <RestrictedLink
                url={page.url}
                pageName={page.pageName}
                onMenuItemClick={onMenuItemClick}
                icon={page.icon}
            />
        );
    };

    const getRestrictedSectionTitle = (section) => {
        let RestrictedSectionTitle = withMinumumStaffRole(section.role)(
            SectionTitle
        );
        return <RestrictedSectionTitle title={section.title} />;
    };

    return (
        <>
            <div className="row  menu-roller">
                <div className="col-12 col-lg-4"></div>
            </div>
            <ul>
                <HashRouter basename={baseUrl}>
                    {sections.map((section, i) => {
                        return (
                            <li key={"section_" + i} className="sidebarGroup">
                                {getRestrictedSectionTitle(section)}
                                <ul className="navbar-nav mr-auto">
                                    {section.pages.map((page, j) => (
                                        <li
                                            key={"page_" + j}
                                            className={`${
                                                page.active ? "active" : ""
                                            }`}
                                        >
                                            {page.title}
                                            {getRestrictedLink(page)}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </HashRouter>
            </ul>
        </>
    );
}

export default NavMenu;
