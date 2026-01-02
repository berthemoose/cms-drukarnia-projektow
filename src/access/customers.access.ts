import { Access } from "payload/config";
import Users from "../collections/Users";

export const selfOrAdmin: Access = ({req: { user }, id}) => {
    if (user?.collection === Users.slug) {
        return true;
    }
    return user?.id == id;
};