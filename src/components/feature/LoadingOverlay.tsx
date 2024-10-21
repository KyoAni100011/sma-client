import { Flex, Spinner } from "@chakra-ui/react";

interface LoadingOverlayProps {
  isLoading: Boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <Flex
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex={1}
      justifyContent="center"
      alignItems="center"
      bg="rgba(255, 255, 255, 0.8)" 
      width="100%"
      height="100%"
    >
      <Spinner size="xl" color="red.500" />
    </Flex>
  );
};

export default LoadingOverlay;
