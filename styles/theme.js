import { extendTheme } from '@chakra-ui/react';
// #0084CA
// #0070BA
const theme = {
   fonts: {
       heading: '"Open Sans", sans-serif',
       body: '"Open Sans", sans-serif',
   },
   colors: {
       brand: {
           bg: '#0081B8',
           text: '#0081B8',
           card: '#0A99FF',
       },
       cityOption: { // used as highlight color for city option dropdown
        bg: '#f0f0f0',
      },
   },
   sizes: {
       xl: {
           h: '56px',
           fontSize: 'lg',
           px: '32px',
           bg: '#9747FF'
       },
   },
  components: {

    Button: {
      baseStyle: {
        borderRadius: '5px',
        color: 'white',
        backgroundColor: '#0081B8', // use the custom loginButton color
        _hover: {
          backgroundColor: '#005A80', // use the custom loginButtonHover color
        },
      },
      Link: {
        baseStyle: {
          color: '#0081B8', // use the custom brand text color
          _hover: {
            textDecoration: 'underline', // underline the link on hover
          },
        },
      },
    },
    Input: {
      baseStyle: {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: 'px',
        border: 'none',
      },
    },
    Form: {
      baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        border: '3px solid',
        borderColor: 'brand.loginFormBorder', // use the custom loginFormBorder color
        padding: '20px',
        borderRadius: '5px',
      },
    },
  },
}



export default extendTheme(theme);