import { fade } from 'material-ui/styles/colorManipulator'
import { primaryColor, primaryColors, secondaryColor, secondaryColors, foregroundColor, backgroundColor } from 'config'
// import createPalette from 'material-ui/styles/createPalette'

export default {
  direction: 'ltr',
  palette: {
    type: 'dark',
    divider: fade(foregroundColor, 0.12),
    text: {
      primary: foregroundColor,
      secondary: fade(foregroundColor, 0.7),
      disabled: fade(foregroundColor, 0.5),
      hint: fade(foregroundColor, 0.5)
      // icon: fade(foregroundColor, 0.5),  // removed in beta.30
    },
    primary: primaryColors,
    secondary: secondaryColors
  },
  // typography: {
  //   fontFamily: 'Roboto, "Open Sans", sans-serif'
  // }
  overrides: {
    MuiCheckbox: {
      checked: {
        color: 'white'
      }
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: secondaryColor
        }
      }
    }
    // NOT WORKING
    // MuiInput: {
    //   inkbar: {
    //     '&:after': {
    //       backgroundColor: secondaryColor
    //     }
    //   }
    // }
  }
}
