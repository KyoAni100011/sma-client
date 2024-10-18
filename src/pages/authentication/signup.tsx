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

export default function SignUpForm() {
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
    { setSubmitting }: any
  ) => {
    try {
      const res = await register(values);
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
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  focusBorderColor="black"
                />
                <ErrorMessage
                  name="name"
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
}
