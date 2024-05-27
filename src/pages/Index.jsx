import React, { useState } from "react";
import { Container, VStack, Textarea, Button, Heading, Input, useToast } from "@chakra-ui/react";
import { FaFileWord } from "react-icons/fa";

const Index = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [content, setContent] = useState("");
  const toast = useToast();

  const handleDownload = () => {
    if (!title.trim() || !author.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields before downloading.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const documentContent = `
      Title: ${title}
      Author: ${author}
      Date: ${date}

      ${content}
    `;

    const blob = new Blob([documentContent], { type: "application/msword" });
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
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} size="lg" />
        <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} size="lg" />
        <Input placeholder="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} size="lg" />
        <Textarea placeholder="Write your document here..." value={content} onChange={(e) => setContent(e.target.value)} size="lg" height="300px" />
        <Button leftIcon={<FaFileWord />} colorScheme="blue" onClick={handleDownload}>
          Download as Word
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
