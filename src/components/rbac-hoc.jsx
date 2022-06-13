import React, { useContext } from "react";
import { UserContext } from "../App";

const staffRoles = [
    "Admin",
    "Senior Admin",
    "Staff Lead",
    "Management",
    "Owner",
];

export const withMinumumStaffRole =
    (role) =>
    (Component) =>
    ({ ...props }) => {
        let staffRoleIndex = staffRoles.indexOf(role);
        let allowedRoles = staffRoles.slice(staffRoleIndex);
        const context = useContext(UserContext);
        if (context.checkRoles(allowedRoles)) {
            return <Component {...props} />;
        }
        if (props.showIfNotAuthorized) {
            return (
                <p className="alert">
                    You are not authorised to view this content
                </p>
            );
        }
        return null;
    };

export const withRoles =
    (roles) =>
    (Component) =>
    ({ ...props }) => {
        const context = useContext(UserContext);
        if (context.checkRoles(roles)) {
            return <Component {...props} />;
        }
        if (props.showIfNotAuthorized) {
            return (
                <p className="alert">
                    You are not authorised to view this content
                </p>
            );
        }
        return null;
    };

// export const withRoles;
// export const withMinumumStaffRole;

// export const withAdminRole = withRole([
//     "Admin",
//     "Senior Admin",
//     "Staff Lead",
//     "Management",
//     "Owner",
// ]);
// export const withSeniorAdminRole = withRole([
//     "Senior Admin",
//     "Staff Lead",
//     "Management",
//     "Owner",
// ]);
// export const withStaffLeadRole = withRole([
//     "Staff Lead",
//     "Management",
//     "Owner",
// ]);
// export const withManagementRole = withRole(["Management", "Owner"]);
// export const withOwnerRole = withRole(["Owner"]);
