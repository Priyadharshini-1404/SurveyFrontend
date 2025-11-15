import { CommonActions } from "@react-navigation/native";

let navigator;

export const setNavigator = (navRef) => {
  navigator = navRef;
};

export const resetTo = (screenName) => {
  if (navigator) {
    navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screenName }],
      })
    );
  }
};
