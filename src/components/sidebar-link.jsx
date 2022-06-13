import React from "react";
import { Link } from "react-router-dom";
function SidebarLink({ url, icon, pageName, onMenuItemClick }) {
    return (
        <>
            <Link
                to={url}
                onClick={() => (onMenuItemClick ? onMenuItemClick() : () => {})}
            >
                <i className={`menu-icon ${icon}`} aria-hidden="true"></i>
                &nbsp;{pageName}
            </Link>
        </>
    );
}

export default SidebarLink;
