import { render } from "@react-email/components";
import EmailVerification from "../../emails/email-verification";

export const renderVerificationEmail = async ({
    userFirstname,
    url,
    token,
}: {
    userFirstname: string;
    url: string;
    token: string;
}) => {
    return await render(
        EmailVerification({
            userFirstname,
            url,
            token,
        })
    );
};