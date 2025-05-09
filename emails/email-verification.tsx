import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ActivationEmailProps {
  userFirstname?: string;
  url?: string;
  token?: string;
}

export const EmailVerification = ({
  userFirstname,
  token,
  url,
}: ActivationEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Activate your account</Preview>
        <Container style={container}>
          {/* Optional Logo */}
          <Img
            src={`/static/your-logo.png`}
            width="40"
            height="40"
            alt="Dev Outils"
          />

          <Section>
            <Text style={text}>Hi {userFirstname},</Text>

            <Text style={text}>
              Welcome to <strong>Dev Outils</strong>! To complete your
              registration, please activate your account by clicking the button
              below:
            </Text>

            <Button style={button} href={`${url}?token=${token}`}>
              Activate My Account
            </Button>

            <Text style={text}>
              If you didn't create an account, you can safely ignore this email.
            </Text>

            <Text style={text}>
              For help or support, visit our{" "}
              <Link style={anchor} href="https://www.yourproject.com/help ">
                Help Center
              </Link>
              .
            </Text>

            <Text style={text}>Best regards,</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Example preview props for testing
EmailVerification.PreviewProps = {
  userFirstname: "Alan",
  activationLink: "https://www.yourproject.com/activate?token=abc123 ",
} as ActivationEmailProps;

export default EmailVerification;

/* Styles */
const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "8px",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300" as const,
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
  marginTop: "20px",
};

const anchor = {
  textDecoration: "underline",
  color: "#007ee6",
};
