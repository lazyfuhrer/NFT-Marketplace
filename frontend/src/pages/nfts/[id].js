import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'

export default function id() {

  const {query} = useRouter();

  return (
    <>
      <Box>{query.id}</Box>
    </>
  )
};