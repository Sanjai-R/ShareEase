import React, { useState } from 'react';
// import useAuth from '../../hooks/useAuth.js';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { Login, Signup } from '../../API/user';

export default function Auth({ isCheck = false, isLoginContainer = false }) {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  // const { fetchAuth } = useAuth();
  const [isLogin, setLogin] = useState(isLoginContainer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    mobile: '',
    location: '',
  });
  const handleLogin = () => setLogin(!isLogin);
  const alert = ({ type, title, message }) => {
    return toast({
      title: title,
      description: message,
      status: type,
      duration: 3000,
      position: 'top-right',
      isClosable: true,
    });
  };
  const LoginHandler = async () => {
    if (!data.email || !data.password) {
      alert({
        type: 'error',
        title: 'Check',
        message: `Please fill all the inputs`,
      });
    } else {
      const user = await Login({
        email: data.email,
        password: data.password,
      });

      if (user.status) {
        localStorage.setItem('profile', JSON.stringify(user.data));
        await alert({
          type: 'success',
          title: 'Login',
          message: `Successfully logged in as ${data.email}`,
        });
        onCloseHandler();
      } else {
        alert({
          type: 'error',
          title: 'Check',
          message: user.desc,
        });
      }
    }
  };

  const SignupHandler = async () => {
    const url = `https://ui-avatars.com/api/?name=${data.name}`;
    if (!data.username || !data.mobile || !data.email || !data.password) {
      alert({
        type: 'error',
        title: 'Check',
        message: `Please fill all the inputs`,
      });
    } else {
      const user = await Signup({ ...data, avatar: url });
      if (user.status) {
        localStorage.setItem('profile', JSON.stringify(user.data));
        await alert({
          type: 'success',
          title: 'Signup',
          message: `Successfully signed up as ${data.email}`,
        });
        onCloseHandler();
      } else {
        alert({
          type: 'error',
          title: 'Check',
          message: user.desc,
        });
      }
    }
  };
  const onSave = () => {
    if (isLogin) {
      LoginHandler();
    } else {
      SignupHandler();
    }
  };
  const onCloseHandler = () => {
    onClose();

    navigate('/');
    window.location.reload();
    setData({
      name: '',
      email: '',
      password: '',
      mobile: '',
    });
  };
  const handleInputChange = e => {
    const { id, value } = e.target;
    if (id === 'name') {
      setData({ ...data, username: value });
    } else if (id === 'email') {
      setData({ ...data, email: value });
    } else if (id === 'password') {
      setData({ ...data, password: value });
    } else if (id === 'mobile') {
      setData({ ...data, mobile: value });
    } else if (id === 'location') {
      setData({ ...data, location: value });
    }
  };
  return (
    <>
      {!isCheck && (
        <Button
          onClick={onOpen}
          colorScheme={isLoginContainer ? 'gray' : 'brand'}
        >
          {isLoginContainer ? 'Login' : 'Get Started'}
        </Button>
      )}

      <Modal
        isOpen={isCheck ? isCheck : isOpen}
        onClose={onClose}
        isCentered={true}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text size="md">{isLogin ? 'Login' : 'Signup'}</Text>
          </ModalHeader>

          <ModalBody>
            {isLogin ? (
              <Stack spacing={4}>
                <Input
                  placeholder="Enter email"
                  size="md"
                  value={data.email}
                  id="email"
                  onChange={e => {
                    handleInputChange(e);
                  }}
                />
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    id="password"
                    value={data.password}
                    onChange={e => {
                      handleInputChange(e);
                    }}
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>
            ) : (
              <Stack spacing={4}>
                <Input
                  placeholder="Enter email"
                  size="md"
                  id="email"
                  onChange={e => {
                    handleInputChange(e);
                  }}
                  value={data.email}
                />
                <Input
                  placeholder="Enter name"
                  size="md"
                  id="name"
                  onChange={e => {
                    handleInputChange(e);
                  }}
                  value={data.username}
                />
                <InputGroup size="md">
                  <InputLeftAddon children="+91" />
                  <Input
                    type="tel"
                    placeholder="phone number"
                    id="mobile"
                    onChange={e => {
                      handleInputChange(e);
                    }}
                    value={data.mobile}
                  />
                </InputGroup>

                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    id="password"
                    onChange={e => {
                      handleInputChange(e);
                    }}
                    value={data.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Input
                  placeholder="Enter location"
                  size="md"
                  id="location"
                  onChange={e => {
                    handleInputChange(e);
                  }}
                  value={data.location}
                />
              </Stack>
            )}
          </ModalBody>

          <ModalFooter
            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <Button colorScheme="brand" onClick={onSave} w="full">
              Save
            </Button>
            <Flex alignItems="center" gap="5px" w="full" mt={3}>
              <Text>
                {isLogin ? 'New to ShareEase?' : 'Already have an account?'}
              </Text>
              <Button colorScheme="brand" variant="link" onClick={handleLogin}>
                {isLogin ? 'create a account' : 'login here'}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
