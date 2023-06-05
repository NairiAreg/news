import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Tag: {
      variants: {
        "news.am": {
          container: {
            bg: "#e90606",
            color: "#fff",
          },
        },
        "armenpress.am": {
          container: {
            bg: "#212161",
            color: "#fff",
          },
        },
      },
    },
  },
  fonts: {
    body: "MontserratArm, Montserrat",
    heading: "MontserratArm, Montserrat",
  },
  styles: {
    global: {
      "*:focus": {
        boxShadow: "none !important",
      },
      "*[data-focus]": {
        boxShadow: "none !important",
      },
      "html, body": {
        color: "#343434",
        fontWeight: 400,
        fontSize: "1rem",
      },
      a: {
        textDecoration: "none !important",
      },
      input: {
        "&::placeholder": {
          color: "placeholder.100",
        },
      },
      textarea: {
        "&::placeholder": {
          color: "placeholder.100",
        },
      },
      button: {
        _focus: {
          boxShadow: "none !important",
        },
      },
    },
  },
  fontSizes: {
    xs: "0.625rem", // 10px
    sm: "0.75rem", // 12px
    md: "0.875rem", // 14px
    lg: "1rem", // 16px
    xl: "1.125rem", // 18px
    "2xl": "1.25rem", //20px
    "3xl": "1.375rem", // 22px
    "4xl": "1.5rem", // 24px
    "5xl": "1.75rem", // 28px
    "6xl": "2rem", // 32px
    "7xl": "2.5rem", // 40px
  },
  colors: {
    placeholder: {
      // 100: "#6d6d6d",
    },
    blue: {
      // 200: "#1D6ECF",
      100: "#c8eafa",
      300: "#219ebc",
      400: "#023047",
    },
    orange: {
      // 100: "#FEEBCB",
      300: "#ffb703",
      400: "#fb8500",
    },
    // green: {
    //   200: "#3EC997",
    //   300: "#2EC974",
    //   400: "#22BE68",
    //   500: "#00C35D",
    // },
    // gray: {
    //   200: "#FAFAFA",
    //   300: "#F5F4F7",
    //   400: "#EAECEF",
    //   500: "#DDDDDD",
    //   600: "#CDCDCD",
    //   700: "#737373",
    //   800: "#272727",
    //   900: "#1A1A1A",
    // },
    // border: {
    //   100: "#DDDDDD",
    //   200: "#BCC3CC",
    //   300: "#B6B6B6",
    //   400: "#CDCDCD",
    //   500: "#EAECEF",
    // },
    // red: {
    //   400: "#DB4151",
    // },
    social: {
      facebook: "#1877F2",
      twitter: "#1FA1F1",
      linkedin: "#2867B2",
      vkontakte: "#5181B8",
    },
  },
});

export default theme;
