import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  Text,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { login } from "../../../apis/user.api";
import localStorageUtils from "../../util/localStorageUtils";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const toast = useToast();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: any
  ) => {
    try {
      const res = await login(values);
      toast({
        title: res.message,
        description: "Welcome back!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      localStorageUtils.setItem("user", res.data)
      setTimeout(() => {window.location.href="/"}, 2500)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message,
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
      height={"100vh"}
      bg="white"
      color="black"
      px={4}
    >
      <Flex flexDirection="column" justifyContent="center" height="100%">
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Login
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
                <ErrorMessage
                  name="email"
                  render={(msg) => <Text color="red.500">{msg}</Text>}
                />
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
                <ErrorMessage
                  name="password"
                  render={(msg) => <Text color="red.500">{msg}</Text>}
                />
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
                Login
              </Button>
              <Text textAlign="center" mt={5}>
                You don't have an account?{" "}
                <ChakraLink as={RouterLink} to="/signup" fontWeight={800}>
                  Sign up
                </ChakraLink>
              </Text>
            </Form>
          )}
        </Formik>
      </Flex>
    </Box>
  );
};

export default LoginForm;
