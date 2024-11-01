const { createTheme } = require("@mui/material");

const _ = {
  clr500: 'hsl(212, 24%, 26%)',
  clr400:'hsl(211, 10%, 45%)',
  clr300:'hsl(223, 19%, 93%)',
  clr200:'hsl(228, 33%, 97%)',
  clr100:'hsl(0, 0%, 100%)',
  primary: {
    main: 'hsl(238, 40%, 52%)',
    light: 'hsl(239, 57%, 85%)'
  },
  secondary: {
    main: 'hsl(358, 79%, 66%)',
    light: 'hsl(357, 100%, 86%)'
  },
}

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    ..._,
    background: {
      default: _.clr200,
      paper: _.clr100
    },
  },
  typography: {
    fontFamily: "Rubik",
    fontWeight: 400,
    color: _.clr500,

    body: {
      fontSize: "16px",
      color: _.clr400,
      lineHeight: 1.5
    },
    deleted: {
      fontSize: "16px",
      color: _.clr400,
      lineHeight: 1.5,
      fontStyle: 'italic',
    },
    scoreText: {
      fontSize: "16px",
      color: _.primary.main,
      fontWeight: 500
    },
    username: {
      fontWeight: 500,
      fontSize: '16px',
      color: _.clr500
    },
    you: {
      fontSize: '12px',
      fontWeight: 500,
      color: _.clr100
    },
    primaryAction: {
      fontSize: '16px',
      fontWeight: 500,
      color: _.primary.main,
    },
    secondaryAction: {
      fontSize: '16px',
      fontWeight: 500,
      color: _.secondary.main,
    },
    dialogHeader: {
      fontSize: '24px',
      fontWeight: 500,
    }
  }
})


export default theme;