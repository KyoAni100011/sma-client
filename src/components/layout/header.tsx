import {
  Box,
  Flex,
  IconButton,
  Text,
  Button,
  Stack,
  useColorMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  HStack,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { colorMode } = useColorMode();
  const user = useAuth();

  return (
    <Box
      bg={colorMode === "light" ? "white" : "transparent"}
      color={colorMode === "light" ? "black" : "white"}
      px={6}
      mb={4}
      boxShadow="md"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Logo />
        <Flex alignItems="center">
          {user.user ? <MenuSettings /> : <MenuItems />}
          <ThemeToggle />
        </Flex>
      </Flex>
    </Box>
  );
}

const Logo = () => {
  const { colorMode } = useColorMode();
  return (
    <Text
      fontSize="xl"
      fontWeight="bold"
      color={colorMode === "light" ? "black" : "white"}
    >
      MyLogo
    </Text>
  );
};

const MenuItems = () => {
  const { colorMode } = useColorMode();
  return (
    <Box display={"flex"} alignItems="center">
      <Stack direction="row" spacing={4} alignItems="center">
        <Button
          as={Link}
          to="/login"
          variant="outline"
          color={colorMode === "light" ? "black" : "white"}
          borderColor={colorMode === "light" ? "black" : "white"}
          _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.600" }}
        >
          Sign In
        </Button>
        <Button
          as={Link}
          to="/signup"
          bg={colorMode === "light" ? "black" : "white"}
          color={colorMode === "light" ? "white" : "black"}
          _hover={{ bg: colorMode === "light" ? "gray.800" : "gray.200" }}
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
};

const MenuSettings = () => {
  const user = useAuth();
  return (
    <Menu>
      <MenuButton as={HStack} border="1px solid" borderRadius="full">
        <Flex alignItems="center" p={1}>
          <Text mx={2} fontWeight={700}>
            {user.user?.name}
          </Text>
          <Avatar boxSize="30px" />
        </Flex>
      </MenuButton>

      <MenuList>
        <MenuItem color="red.700" fontWeight={700} onClick={user.logout}>
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      size="md"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      aria-label="Toggle Theme"
      onClick={toggleColorMode}
      bg="transparent"
      marginLeft={2}
      _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.600" }}
    />
  );
};
