import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { register } from "../../apis/user.api";
import localStorageUtils from "../../util/localStorageUtils";

interface SignUpFormValues {
  email: string;
  name: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const toast = useToast();

  const initialValues: SignUpFormValues = {
    email: "",
    name: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: SignUpFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const res = await register(values);
      localStorageUtils.setItem("user", res.data);
      toast({
        title: res.message,
        description: "Welcome to the platform!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      maxWidth="500px"
      mx="auto"
      height="100vh"
      bg="white"
      color="black"
      px={4}
    >
      <Flex flexDirection="column" justifyContent="center" height="100%">
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Sign Up
        </Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormControl mb={4}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  focusBorderColor="black"
                />
                <ErrorMessage name="email">
                  {(msg) => <Text color="red.500">{msg}</Text>}
                </ErrorMessage>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  focusBorderColor="black"
                />
                <ErrorMessage name="name">
                  {(msg) => <Text color="red.500">{msg}</Text>}
                </ErrorMessage>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  focusBorderColor="black"
                />
                <ErrorMessage name="password">
                  {(msg) => <Text color="red.500">{msg}</Text>}
                </ErrorMessage>
              </FormControl>

              <Button
                colorScheme="blackAlpha"
                variant="solid"
                color="white"
                bg="black"
                _hover={{ bg: "gray.700" }}
                type="submit"
                isLoading={isSubmitting}
                width="full"
              >
                Sign up
              </Button>
              <Text textAlign="center" mt={5}>
                You already have an account?{" "}
                <ChakraLink as={RouterLink} to="/login" fontWeight={800}>
                  Login
                </ChakraLink>
              </Text>
            </Form>
          )}
        </Formik>
      </Flex>
    </Box>
  );
};

export default SignUpForm;
