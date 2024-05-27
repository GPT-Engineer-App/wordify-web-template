import React, { useState } from "react";
import { Container, VStack, Textarea, Button, Heading, useToast } from "@chakra-ui/react";
import { FaFileWord } from "react-icons/fa";

const Index = () => {
  const [content, setContent] = useState("");
  const toast = useToast();

  const handleDownload = () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content before downloading.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const blob = new Blob([content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.doc";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">
          Document Template
        </Heading>
        <Textarea placeholder="Write your document here..." value={content} onChange={(e) => setContent(e.target.value)} size="lg" height="300px" />
        <Button leftIcon={<FaFileWord />} colorScheme="blue" onClick={handleDownload}>
          Download as Word
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
